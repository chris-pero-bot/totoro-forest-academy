import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { getClearing } from '../utils/contentLoader'
import HUD from './HUD'
import Confetti from './Confetti'
import InstructionOverlay from './InstructionOverlay'
import PickOne from './challenges/PickOne'
import FillTheGap from './challenges/FillTheGap'
import MatchUp from './challenges/MatchUp'
import FixIt from './challenges/FixIt'
import SortIt from './challenges/SortIt'
import OrderIt from './challenges/OrderIt'
import SnapChoice from './challenges/SnapChoice'
import WordBuild from './challenges/WordBuild'
import Totoro from '../art/Totoro'

const CHALLENGE_COMPONENTS = {
  pick_one: PickOne,
  fill_the_gap: FillTheGap,
  match_up: MatchUp,
  fix_it: FixIt,
  sort_it: SortIt,
  order_it: OrderIt,
  snap_choice: SnapChoice,
  word_build: WordBuild,
}

export default function ClearingScreen() {
  const { state, dispatch } = useGame()
  const [showIntro, setShowIntro] = useState(true)
  const [showHint, setShowHint] = useState(false)
  const [taskKey, setTaskKey] = useState(0)
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [showAcornFly, setShowAcornFly] = useState(false)
  const [showInstruction, setShowInstruction] = useState(false)
  const [introText, setIntroText] = useState('')
  const [gameOverMessage, setGameOverMessage] = useState(false)

  const clearing = getClearing(state.currentRealm, state.currentTrail, state.currentClearing)

  useEffect(() => {
    setShowIntro(true)
    setShowHint(false)
    setTaskKey(0)
    setIntroText('')
    setGameOverMessage(false)
  }, [state.currentRealm, state.currentTrail, state.currentClearing])

  // Typewriter effect for story intro
  useEffect(() => {
    if (!showIntro || !clearing) return
    const text = clearing.storyIntro
    if (gameOverMessage) return
    let i = 0
    setIntroText('')
    const interval = setInterval(() => {
      if (i < text.length) {
        setIntroText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [showIntro, clearing, gameOverMessage])

  if (!clearing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-xl font-heading text-forest-dark">Loading...</p>
      </div>
    )
  }

  const tasks = clearing.tasks
  const currentTask = tasks[state.currentTaskIndex]
  const isLastTask = state.currentTaskIndex >= tasks.length - 1

  // Determine if this clearing focuses on grammar (for grammar_guardian achievement)
  const isGrammarClearing = /grammar|tense|pronoun|verb|possessive|adjective|preposition|sentence|ordinal|adverb/i.test(clearing.focus || '')

  // Extract vocabulary words from a task for word_collector achievement
  function extractWords(task) {
    const words = []
    if (task.options) words.push(...task.options)
    if (task.pairs) {
      for (const p of task.pairs) { words.push(p.left, p.right) }
    }
    if (task.items) {
      for (const item of task.items) { words.push(item.text) }
    }
    if (task.answer) words.push(task.answer)
    return words.filter(w => w && typeof w === 'string' && w.length > 1)
  }

  function handleStartClearing() {
    // Check if we need to show instruction for this challenge type
    const firstTaskType = tasks[0]?.type
    if (firstTaskType && !state.shownInstructions.includes(firstTaskType)) {
      setShowInstruction(true)
      dispatch({ type: 'MARK_INSTRUCTION_SHOWN', challengeType: firstTaskType })
    }
    setShowIntro(false)
  }

  function handleCorrect() {
    dispatch({ type: 'ANSWER_CORRECT', words: extractWords(currentTask), isGrammar: isGrammarClearing })
    setShowHint(false)
    setConfettiTrigger(t => t + 1)
    setShowAcornFly(true)
    setTimeout(() => setShowAcornFly(false), 900)

    setTimeout(() => {
      if (isLastTask) {
        dispatch({ type: 'COMPLETE_CLEARING', totalTasks: tasks.length })
      } else {
        dispatch({ type: 'NEXT_TASK' })
        setTaskKey(k => k + 1)
        // Check if next task type needs instruction
        const nextTask = tasks[state.currentTaskIndex + 1]
        if (nextTask && !state.shownInstructions.includes(nextTask.type)) {
          setShowInstruction(true)
          dispatch({ type: 'MARK_INSTRUCTION_SHOWN', challengeType: nextTask.type })
        }
      }
    }, 100)
  }

  function handleWrong() {
    dispatch({ type: 'ANSWER_WRONG', isGrammar: isGrammarClearing })

    if (state.lives <= 1) {
      dispatch({ type: 'GAME_OVER' })
      setGameOverMessage(true)
      setShowIntro(true)
      setTaskKey(k => k + 1)
      return
    }

    if (isLastTask) {
      dispatch({ type: 'COMPLETE_CLEARING', totalTasks: tasks.length })
    } else {
      dispatch({ type: 'NEXT_TASK' })
      setTaskKey(k => k + 1)
    }
    setShowHint(false)
  }

  function handleUseHint() {
    if (state.powerUps.meis_hint > 0) {
      dispatch({ type: 'USE_POWER_UP', powerUp: 'meis_hint' })
      setShowHint(true)
    }
  }

  // Intro screen
  if (showIntro) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-b from-forest-dark to-forest"
        style={{ backgroundImage: 'url(/assets/backgrounds/gameplay-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center">
          {/* Totoro peeking */}
          <img
            src="/assets/characters/totoro-happy.png"
            alt=""
            className="w-20 h-20 object-contain mb-4 animate-float"
            onError={(e) => { e.target.style.display = 'none' }}
          />

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md text-center">
            <h2 className="font-heading text-3xl text-forest-dark mb-2">{clearing.name}</h2>
            <p className="text-forest-mid text-base mb-4 font-bold">{clearing.focus}</p>

            {gameOverMessage ? (
              <div className="bg-error-bg rounded-xl p-4 mb-4">
                <img src="/assets/characters/soot-sprite-asleep.png" alt="" className="w-12 h-12 object-contain mx-auto mb-2" onError={(e) => { e.target.style.display = 'none' }} />
                <p className="text-soot text-lg font-bold">Oh no! Your Soot Sprites fell asleep.</p>
                <p className="text-soot text-base">Let's try this Clearing again!</p>
              </div>
            ) : (
              <div className="bg-forest-pale rounded-xl p-4 mb-4">
                <p className="text-soot text-lg min-h-[3rem]">{introText}<span className="animate-pulse">|</span></p>
              </div>
            )}

            <p className="text-forest-mid/60 text-sm mb-4">{tasks.length} tasks</p>
            <button
              onClick={handleStartClearing}
              className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {gameOverMessage ? 'Try Again!' : 'Start!'}
            </button>
          </div>

          <button
            onClick={() => dispatch({ type: 'BACK_TO_TRAIL' })}
            className="mt-4 bg-white/20 text-white font-bold px-6 py-2 rounded-full transition-all hover:bg-white/30"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  const ChallengeComponent = CHALLENGE_COMPONENTS[currentTask?.type]

  if (!currentTask || !ChallengeComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-xl text-forest-dark">Unknown task type</p>
      </div>
    )
  }

  const roundLabel = currentTask.round === 'warmup'
    ? 'Warm Up'
    : currentTask.round === 'core'
      ? 'Core'
      : 'Challenge'

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ backgroundImage: 'url(/assets/backgrounds/gameplay-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-cream/80" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <HUD />

        {/* Progress bar */}
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-forest-dark/60 bg-white/60 px-2 py-0.5 rounded-full">{roundLabel}</span>
            <span className="text-xs text-forest-dark/60 font-bold">
              {state.currentTaskIndex + 1} / {tasks.length}
            </span>
            {state.streak >= 3 && (
              <span className={`text-xs font-bold text-acorn px-2 py-0.5 rounded-full bg-acorn/10 ${state.streak >= 5 ? 'animate-streakGlow' : 'animate-glow'}`}>
                {state.streak} streak!
              </span>
            )}
          </div>
          <div className={`flex gap-1 ${state.streak >= 5 ? 'animate-streakGlow rounded-full' : ''}`}>
            {tasks.map((_, i) => (
              <div
                key={i}
                className={`h-2.5 flex-1 rounded-full transition-all ${
                  i < state.currentTaskIndex
                    ? 'bg-success'
                    : i === state.currentTaskIndex
                      ? 'bg-acorn'
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Challenge area */}
        <div className="flex-1 p-4 flex flex-col justify-center max-w-lg mx-auto w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
            <ChallengeComponent
              key={taskKey}
              task={currentTask}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              showHint={showHint}
            />
          </div>
        </div>

        {/* Acorn fly animation */}
        {showAcornFly && (
          <div className="fixed top-1/2 left-1/2 z-40 pointer-events-none">
            <div className="animate-acornFly text-2xl">🌰 +3</div>
          </div>
        )}

        {/* Power-up bar */}
        <div className="p-4 flex justify-center gap-3">
          {state.powerUps.meis_hint > 0 && !showHint && (
            <button
              onClick={handleUseHint}
              className="text-sm bg-forest-light/30 text-forest-dark px-5 py-2.5 rounded-full font-bold hover:bg-forest-light/40 shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              🍃 Hint ({state.powerUps.meis_hint})
            </button>
          )}
          {state.powerUps.catbus_skip > 0 && (
            <button
              onClick={() => {
                dispatch({ type: 'USE_POWER_UP', powerUp: 'catbus_skip' })
                if (isLastTask) {
                  dispatch({ type: 'COMPLETE_CLEARING', totalTasks: tasks.length })
                } else {
                  dispatch({ type: 'NEXT_TASK' })
                  setTaskKey(k => k + 1)
                }
              }}
              className="text-sm bg-sky/40 text-blue-800 px-5 py-2.5 rounded-full font-bold hover:bg-sky/50 shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              🚌 Skip ({state.powerUps.catbus_skip})
            </button>
          )}
        </div>
      </div>

      {/* Confetti */}
      <Confetti trigger={confettiTrigger} />

      {/* Instruction overlay */}
      {showInstruction && (
        <InstructionOverlay
          challengeType={currentTask?.type}
          onDismiss={() => setShowInstruction(false)}
        />
      )}
    </div>
  )
}
