import { useState } from 'react'
import { useGame } from '../context/GameContext'

export default function Settings() {
  const { state, dispatch } = useGame()
  const [showConfirm, setShowConfirm] = useState(false)

  function handleReset() {
    dispatch({ type: 'RESET_PROGRESS' })
    setShowConfirm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-dark to-forest p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: state.tutorialCompleted ? 'worldMap' : 'title' })}
          className="text-cream font-bold text-sm"
        >
          Back
        </button>
      </div>

      <h1 className="font-heading text-3xl text-cream text-center mb-8">Settings</h1>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {/* Player name */}
        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-heading text-lg text-cream mb-2">Player</h3>
          <p className="text-cream/80">{state.playerName}</p>
        </div>

        {/* Replay tutorial */}
        <button
          onClick={() => dispatch({ type: 'START_TUTORIAL' })}
          className="bg-white/10 rounded-xl p-4 text-left hover:bg-white/20 transition-all"
        >
          <h3 className="font-heading text-lg text-cream">Replay Tutorial</h3>
          <p className="text-cream/60 text-sm">Watch the tutorial again.</p>
        </button>

        {/* Stats */}
        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-heading text-lg text-cream mb-2">Stats</h3>
          <div className="space-y-1 text-cream/80 text-sm">
            <p>Total acorns earned: {state.totalAcornsEarned}</p>
            <p>Questions answered: {state.totalQuestionsAnswered}</p>
            <p>Correct answers: {state.totalCorrectAnswers}</p>
            <p>Best streak: {state.bestStreak}</p>
            <p>Achievements: {state.unlockedAchievements.length}</p>
          </div>
        </div>

        {/* Reset */}
        <div className="bg-error-soft/20 rounded-xl p-4">
          <h3 className="font-heading text-lg text-cream mb-2">Reset Progress</h3>
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-error-soft/50 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-error-soft"
            >
              Reset Everything
            </button>
          ) : (
            <div>
              <p className="text-cream/80 text-sm mb-3">Are you sure? This will delete all your progress!</p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="bg-error-soft text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-white/20 text-cream px-4 py-2 rounded-lg text-sm font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
