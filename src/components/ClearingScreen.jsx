import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { getClearing } from '../utils/contentLoader'
import HUD from './HUD'
import PickOne from './challenges/PickOne'
import FillTheGap from './challenges/FillTheGap'
import MatchUp from './challenges/MatchUp'
import FixIt from './challenges/FixIt'
import SortIt from './challenges/SortIt'
import OrderIt from './challenges/OrderIt'
import SnapChoice from './challenges/SnapChoice'
import WordBuild from './challenges/WordBuild'

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
  const [taskKey, setTaskKey] = useState(0) // Force re-mount of challenge components

  const clearing = getClearing(state.currentRealm, state.currentTrail, state.currentClearing)

  useEffect(() => {
    setShowIntro(true)
    setShowHint(false)
    setTaskKey(0)
  }, [state.currentRealm, state.currentTrail, state.currentClearing])

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

  function handleStartClearing() {
    setShowIntro(false)
  }

  function handleCorrect() {
    dispatch({ type: 'ANSWER_CORRECT' })
    setShowHint(false)

    if (isLastTask) {
      dispatch({ type: 'COMPLETE_CLEARING', totalTasks: tasks.length })
    } else {
      dispatch({ type: 'NEXT_TASK' })
      setTaskKey(k => k + 1)
    }
  }

  function handleWrong() {
    dispatch({ type: 'ANSWER_WRONG' })

    if (state.lives <= 1) {
      // Game over for this clearing
      dispatch({ type: 'GAME_OVER' })
      setShowIntro(true)
      setTaskKey(k => k + 1)
      return
    }

    // Move to next task (no retry on same task to keep flow moving)
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
      <div className="min-h-screen bg-gradient-to-b from-forest-dark to-forest flex flex-col items-center justify-center p-6">
        <h2 className="font-heading text-3xl text-cream mb-4">{clearing.name}</h2>
        <p className="text-cream/80 text-center text-lg mb-2">{clearing.focus}</p>
        <div className="bg-white/10 rounded-xl p-6 max-w-md mb-8">
          <p className="text-cream text-center text-lg">{clearing.storyIntro}</p>
        </div>
        <p className="text-cream/60 text-sm mb-4">{tasks.length} tasks</p>
        <button
          onClick={handleStartClearing}
          className="bg-acorn hover:bg-yellow-600 text-white font-heading text-xl px-10 py-3 rounded-full shadow-lg transition-all hover:scale-105"
        >
          Start!
        </button>
        <button
          onClick={() => dispatch({ type: 'BACK_TO_TRAIL' })}
          className="mt-4 text-cream/50 hover:text-cream text-sm"
        >
          Go back
        </button>
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
    <div className="min-h-screen bg-cream flex flex-col">
      <HUD />

      {/* Progress bar */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-forest-dark/60">{roundLabel}</span>
          <span className="text-xs text-forest-dark/40">
            {state.currentTaskIndex + 1} / {tasks.length}
          </span>
          {state.streak >= 3 && (
            <span className="text-xs font-bold text-acorn animate-glow px-2 py-0.5 rounded-full bg-acorn/10">
              {state.streak} streak!
            </span>
          )}
        </div>
        <div className="flex gap-1">
          {tasks.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
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
        <ChallengeComponent
          key={taskKey}
          task={currentTask}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          showHint={showHint}
        />
      </div>

      {/* Power-up bar */}
      <div className="p-4 flex justify-center gap-3">
        {state.powerUps.meis_hint > 0 && !showHint && (
          <button
            onClick={handleUseHint}
            className="text-sm bg-forest-light/20 text-forest-dark px-4 py-2 rounded-full font-bold hover:bg-forest-light/30"
          >
            Hint ({state.powerUps.meis_hint})
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
            className="text-sm bg-sky/30 text-blue-800 px-4 py-2 rounded-full font-bold hover:bg-sky/40"
          >
            Skip ({state.powerUps.catbus_skip})
          </button>
        )}
      </div>
    </div>
  )
}
