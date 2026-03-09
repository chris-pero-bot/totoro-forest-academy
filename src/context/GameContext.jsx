import { createContext, useContext, useReducer, useEffect } from 'react'
import { SCORING, POWER_UP_COSTS, INITIAL_LIVES, calculateStars } from '../utils/scoring'
import { getClearingCount, getTrailCount } from '../utils/contentLoader'

const GameContext = createContext()

const SAVE_KEY = 'totoro-forest-academy-save'

const initialState = {
  // Navigation
  screen: 'title', // title, tutorial, worldMap, trailView, clearing, results, cutscene, shop, achievements, settings
  currentRealm: null,
  currentTrail: null,
  currentClearing: null,

  // Player
  playerName: 'Adam',
  acorns: 0,
  totalAcornsEarned: 0,

  // Lives
  lives: INITIAL_LIVES,

  // Progress: { "1-1-0": { stars: 2, completed: true }, ... }
  clearingProgress: {},

  // Trail completion tracking
  trailsCompleted: {},  // "1-1": true
  realmsCompleted: {},   // "1": true

  // Current clearing session
  currentTaskIndex: 0,
  correctFirstTry: 0,
  totalCorrectInClearing: 0,
  streak: 0,
  bestStreak: 0,
  acornsEarnedThisClearing: 0,
  taskAttempts: {}, // { taskIndex: attemptCount }
  clearingStartTime: null,

  // Power-ups inventory
  powerUps: {
    meis_hint: 0,
    totoros_roar: 0,
    catbus_skip: 0,
    soot_sprite_rescue: 0,
  },

  // Achievements
  unlockedAchievements: [],

  // Tutorial
  tutorialCompleted: false,

  // Stats
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  uniqueWordsEncountered: [],
  grammarStreak: 0,
  bestGrammarStreak: 0,

  // Cutscene
  cutsceneType: null, // 'trail' or 'realm'
  cutsceneRealm: null,
  cutsceneTrail: null,

  // Instructions shown (challenge types user has seen)
  shownInstructions: [],
  // Contextual tips shown
  shownTips: [],
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'LOAD_SAVE':
      return { ...initialState, ...action.payload }

    case 'NAVIGATE':
      return { ...state, screen: action.screen }

    case 'START_TUTORIAL':
      return { ...state, screen: 'tutorial' }

    case 'COMPLETE_TUTORIAL':
      return { ...state, tutorialCompleted: true, screen: 'worldMap' }

    case 'SKIP_TUTORIAL':
      return { ...state, tutorialCompleted: true, screen: 'worldMap' }

    case 'SELECT_REALM':
      return { ...state, currentRealm: action.realm, screen: 'trailView' }

    case 'SELECT_TRAIL':
      return { ...state, currentTrail: action.trail, screen: 'trailView' }

    case 'START_CLEARING': {
      return {
        ...state,
        currentRealm: action.realm,
        currentTrail: action.trail,
        currentClearing: action.clearing,
        currentTaskIndex: 0,
        correctFirstTry: 0,
        totalCorrectInClearing: 0,
        acornsEarnedThisClearing: 0,
        taskAttempts: {},
        clearingStartTime: Date.now(),
        lives: state.lives <= 0 ? INITIAL_LIVES : state.lives,
        screen: 'clearing',
      }
    }

    case 'ANSWER_CORRECT': {
      const taskIdx = state.currentTaskIndex
      const attempts = (state.taskAttempts[taskIdx] || 0)
      const isFirstTry = attempts === 0
      const acornsEarned = isFirstTry ? SCORING.CORRECT_FIRST_TRY : SCORING.CORRECT_SECOND_TRY
      const newStreak = state.streak + 1
      let streakBonus = 0
      if (newStreak === 5) streakBonus = SCORING.STREAK_5_BONUS
      if (newStreak === 10) streakBonus = SCORING.STREAK_10_BONUS

      // Track unique words encountered
      const newWords = action.words || []
      const updatedUniqueWords = [...state.uniqueWordsEncountered]
      for (const w of newWords) {
        const lower = w.toLowerCase()
        if (!updatedUniqueWords.includes(lower)) {
          updatedUniqueWords.push(lower)
        }
      }

      // Track grammar streak
      const newGrammarStreak = action.isGrammar ? state.grammarStreak + 1 : state.grammarStreak
      const newBestGrammarStreak = Math.max(state.bestGrammarStreak, newGrammarStreak)

      // Check word_collector and grammar_guardian achievements
      const newAchievements = [...state.unlockedAchievements]
      if (updatedUniqueWords.length >= 100 && !newAchievements.includes('word_collector')) {
        newAchievements.push('word_collector')
      }
      if (newBestGrammarStreak >= 50 && !newAchievements.includes('grammar_guardian')) {
        newAchievements.push('grammar_guardian')
      }

      return {
        ...state,
        acorns: state.acorns + acornsEarned + streakBonus,
        totalAcornsEarned: state.totalAcornsEarned + acornsEarned + streakBonus,
        acornsEarnedThisClearing: state.acornsEarnedThisClearing + acornsEarned + streakBonus,
        correctFirstTry: isFirstTry ? state.correctFirstTry + 1 : state.correctFirstTry,
        totalCorrectInClearing: state.totalCorrectInClearing + 1,
        streak: newStreak,
        bestStreak: Math.max(state.bestStreak, newStreak),
        totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
        totalCorrectAnswers: state.totalCorrectAnswers + 1,
        uniqueWordsEncountered: updatedUniqueWords,
        grammarStreak: newGrammarStreak,
        bestGrammarStreak: newBestGrammarStreak,
        unlockedAchievements: newAchievements,
      }
    }

    case 'ANSWER_WRONG': {
      const taskIdx = state.currentTaskIndex
      const newAttempts = { ...state.taskAttempts, [taskIdx]: (state.taskAttempts[taskIdx] || 0) + 1 }
      return {
        ...state,
        lives: Math.max(0, state.lives - 1),
        streak: 0,
        grammarStreak: action.isGrammar ? 0 : state.grammarStreak,
        taskAttempts: newAttempts,
        totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
      }
    }

    case 'NEXT_TASK':
      return { ...state, currentTaskIndex: state.currentTaskIndex + 1 }

    case 'COMPLETE_CLEARING': {
      const key = `${state.currentRealm}-${state.currentTrail}-${state.currentClearing}`
      const stars = calculateStars(action.totalTasks, state.correctFirstTry)
      const existingStars = state.clearingProgress[key]?.stars || 0
      const acornBonus = SCORING.CLEARING_COMPLETE
      const newLives = Math.min(state.lives + 1, INITIAL_LIVES + 2) // bonus life, cap at 7

      const elapsed = Date.now() - (state.clearingStartTime || Date.now())
      const newAchievements = [...state.unlockedAchievements]
      if (elapsed < 180000 && !newAchievements.includes('speed_runner')) {
        newAchievements.push('speed_runner')
      }
      if (state.totalAcornsEarned + acornBonus >= 500 && !newAchievements.includes('acorn_millionaire')) {
        newAchievements.push('acorn_millionaire')
      }
      if (state.bestStreak >= 15 && !newAchievements.includes('streak_legend')) {
        newAchievements.push('streak_legend')
      }

      // Build updated clearing progress to check perfectionist
      const updatedClearingProgress = {
        ...state.clearingProgress,
        [key]: { stars: Math.max(stars, existingStars), completed: true },
      }

      // Check perfectionist: all clearings across all realms have 3 stars
      if (!newAchievements.includes('perfectionist')) {
        let allThreeStars = true
        for (let r = 1; r <= 3; r++) {
          const trailCount = getTrailCount(r)
          for (let t = 1; t <= trailCount; t++) {
            const cc = getClearingCount(r, t)
            for (let c = 0; c < cc; c++) {
              const ck = `${r}-${t}-${c}`
              if ((updatedClearingProgress[ck]?.stars || 0) < 3) {
                allThreeStars = false
                break
              }
            }
            if (!allThreeStars) break
          }
          if (!allThreeStars) break
        }
        if (allThreeStars) newAchievements.push('perfectionist')
      }

      return {
        ...state,
        clearingProgress: updatedClearingProgress,
        acorns: state.acorns + acornBonus,
        totalAcornsEarned: state.totalAcornsEarned + acornBonus,
        acornsEarnedThisClearing: state.acornsEarnedThisClearing + acornBonus,
        lives: newLives,
        screen: 'results',
        unlockedAchievements: newAchievements,
      }
    }

    case 'GAME_OVER':
      return {
        ...state,
        lives: INITIAL_LIVES,
        currentTaskIndex: 0,
        correctFirstTry: 0,
        totalCorrectInClearing: 0,
        acornsEarnedThisClearing: 0,
        taskAttempts: {},
        clearingStartTime: Date.now(),
      }

    case 'GO_TO_NEXT_CLEARING': {
      const realm = state.currentRealm
      const trail = state.currentTrail
      const clearing = state.currentClearing
      const clearingCount = getClearingCount(realm, trail)

      if (clearing + 1 < clearingCount) {
        // Next clearing in same trail
        return {
          ...state,
          currentClearing: clearing + 1,
          currentTaskIndex: 0,
          correctFirstTry: 0,
          totalCorrectInClearing: 0,
          acornsEarnedThisClearing: 0,
          taskAttempts: {},
          clearingStartTime: Date.now(),
          screen: 'clearing',
        }
      } else {
        // Trail completed
        return state
      }
    }

    case 'COMPLETE_TRAIL': {
      const trailKey = `${state.currentRealm}-${state.currentTrail}`
      const acornBonus = SCORING.TRAIL_COMPLETE
      const newAchievements = [...state.unlockedAchievements]

      // Check perfect_trail: all clearings in this trail have 3 stars
      if (!newAchievements.includes('perfect_trail')) {
        const clearingCount = getClearingCount(state.currentRealm, state.currentTrail)
        let allPerfect = clearingCount > 0
        for (let i = 0; i < clearingCount; i++) {
          const key = `${state.currentRealm}-${state.currentTrail}-${i}`
          if ((state.clearingProgress[key]?.stars || 0) < 3) {
            allPerfect = false
            break
          }
        }
        if (allPerfect) newAchievements.push('perfect_trail')
      }

      return {
        ...state,
        trailsCompleted: { ...state.trailsCompleted, [trailKey]: true },
        acorns: state.acorns + acornBonus,
        totalAcornsEarned: state.totalAcornsEarned + acornBonus,
        cutsceneType: 'trail',
        cutsceneRealm: state.currentRealm,
        cutsceneTrail: state.currentTrail,
        screen: 'cutscene',
        unlockedAchievements: newAchievements,
      }
    }

    case 'COMPLETE_REALM': {
      const acornBonus = SCORING.REALM_COMPLETE
      const newAchievements = [...state.unlockedAchievements]
      const realmId = state.currentRealm

      if (realmId === 1 && !newAchievements.includes('forest_scholar')) newAchievements.push('forest_scholar')
      if (realmId === 2 && !newAchievements.includes('feast_helper')) newAchievements.push('feast_helper')
      if (realmId === 3 && !newAchievements.includes('city_guide')) newAchievements.push('city_guide')

      const allRealmsComplete = realmId === 3 && state.realmsCompleted[1] && state.realmsCompleted[2]
      if (allRealmsComplete && !newAchievements.includes('totoros_friend')) {
        newAchievements.push('totoros_friend')
      }

      return {
        ...state,
        realmsCompleted: { ...state.realmsCompleted, [realmId]: true },
        acorns: state.acorns + acornBonus,
        totalAcornsEarned: state.totalAcornsEarned + acornBonus,
        cutsceneType: 'realm',
        cutsceneRealm: realmId,
        cutsceneTrail: null,
        screen: 'cutscene',
        unlockedAchievements: newAchievements,
      }
    }

    case 'BACK_TO_TRAIL':
      return { ...state, screen: 'trailView' }

    case 'BACK_TO_WORLD_MAP':
      return { ...state, screen: 'worldMap', currentTrail: null }

    case 'BUY_POWER_UP': {
      const cost = POWER_UP_COSTS[action.powerUp]
      if (state.acorns < cost) return state
      return {
        ...state,
        acorns: state.acorns - cost,
        powerUps: {
          ...state.powerUps,
          [action.powerUp]: state.powerUps[action.powerUp] + 1,
        },
      }
    }

    case 'USE_POWER_UP': {
      if (state.powerUps[action.powerUp] <= 0) return state
      return {
        ...state,
        powerUps: {
          ...state.powerUps,
          [action.powerUp]: state.powerUps[action.powerUp] - 1,
        },
      }
    }

    case 'RESTORE_LIFE': {
      if (state.powerUps.soot_sprite_rescue <= 0) return state
      return {
        ...state,
        lives: Math.min(state.lives + 1, INITIAL_LIVES + 2),
        powerUps: {
          ...state.powerUps,
          soot_sprite_rescue: state.powerUps.soot_sprite_rescue - 1,
        },
      }
    }

    case 'RESET_PROGRESS':
      localStorage.removeItem(SAVE_KEY)
      return { ...initialState }

    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.name }

    case 'MARK_INSTRUCTION_SHOWN':
      if (state.shownInstructions.includes(action.challengeType)) return state
      return {
        ...state,
        shownInstructions: [...state.shownInstructions, action.challengeType],
      }

    case 'MARK_TIP_SHOWN':
      if (state.shownTips.includes(action.tip)) return state
      return {
        ...state,
        shownTips: [...state.shownTips, action.tip],
      }

    case 'JUMP_TO_CLEARING':
      return {
        ...state,
        currentRealm: action.realm,
        currentTrail: action.trail,
        currentClearing: action.clearing,
        currentTaskIndex: 0,
        correctFirstTry: 0,
        totalCorrectInClearing: 0,
        acornsEarnedThisClearing: 0,
        taskAttempts: {},
        clearingStartTime: Date.now(),
        lives: INITIAL_LIVES,
        screen: 'clearing',
      }

    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(SAVE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...init, ...parsed }
      }
    } catch (e) {
      console.warn('Failed to load save:', e)
    }
    return init
  })

  // Auto-save on state changes
  useEffect(() => {
    const saveData = { ...state }
    // Don't save transient state
    delete saveData.clearingStartTime
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
    } catch (e) {
      console.warn('Failed to save:', e)
    }
  }, [state])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

// Helper: check if a realm is unlocked
export function isRealmUnlocked(state, realmId) {
  if (realmId === 1) return true
  return !!state.realmsCompleted[realmId - 1]
}

// Helper: check if a trail is unlocked
export function isTrailUnlocked(state, realmId, trailId) {
  if (trailId === 1) return true
  const prevKey = `${realmId}-${trailId - 1}`
  return !!state.trailsCompleted[prevKey]
}

// Helper: check if a clearing is unlocked
export function isClearingUnlocked(state, realmId, trailId, clearingIndex) {
  if (clearingIndex === 0) return isTrailUnlocked(state, realmId, trailId)
  const prevKey = `${realmId}-${trailId}-${clearingIndex - 1}`
  return !!state.clearingProgress[prevKey]?.completed
}

// Helper: check if all clearings in a trail are complete
export function isTrailComplete(state, realmId, trailId) {
  const count = getClearingCount(realmId, trailId)
  for (let i = 0; i < count; i++) {
    const key = `${realmId}-${trailId}-${i}`
    if (!state.clearingProgress[key]?.completed) return false
  }
  return count > 0
}

// Helper: check if all trails in a realm are complete
export function isRealmComplete(state, realmId) {
  const trailCount = getTrailCount(realmId)
  for (let t = 1; t <= trailCount; t++) {
    if (!isTrailComplete(state, realmId, t)) return false
  }
  return trailCount > 0
}

// Helper: get star count for a trail
export function getTrailStars(state, realmId, trailId) {
  const count = getClearingCount(realmId, trailId)
  let total = 0
  let max = 0
  for (let i = 0; i < count; i++) {
    const key = `${realmId}-${trailId}-${i}`
    total += state.clearingProgress[key]?.stars || 0
    max += 3
  }
  return { total, max }
}
