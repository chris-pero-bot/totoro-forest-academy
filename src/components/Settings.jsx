import { useState, useRef } from 'react'
import { useGame } from '../context/GameContext'
import { getTrailCount, getClearingCount } from '../utils/contentLoader'

export default function Settings() {
  const { state, dispatch } = useGame()
  const [showConfirm, setShowConfirm] = useState(false)
  const [showParentMode, setShowParentMode] = useState(false)
  const [parentTaps, setParentTaps] = useState(0)
  const tapTimerRef = useRef(null)

  // Parent mode jump state
  const [jumpRealm, setJumpRealm] = useState(1)
  const [jumpTrail, setJumpTrail] = useState(1)
  const [jumpClearing, setJumpClearing] = useState(0)

  function handleReset() {
    dispatch({ type: 'RESET_PROGRESS' })
    setShowConfirm(false)
  }

  function handleParentTap() {
    const newTaps = parentTaps + 1
    setParentTaps(newTaps)

    if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
    tapTimerRef.current = setTimeout(() => setParentTaps(0), 2000)

    if (newTaps >= 5) {
      setShowParentMode(true)
      setParentTaps(0)
    }
  }

  function handleJump() {
    dispatch({
      type: 'JUMP_TO_CLEARING',
      realm: jumpRealm,
      trail: jumpTrail,
      clearing: jumpClearing,
    })
  }

  const maxTrails = getTrailCount(jumpRealm)
  const maxClearings = getClearingCount(jumpRealm, jumpTrail)

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-dark to-forest p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: state.tutorialCompleted ? 'worldMap' : 'title' })}
          className="bg-white/20 text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-all"
        >
          Back
        </button>
      </div>

      <h1 className="font-heading text-3xl text-white text-center mb-8 text-shadow-dark">Settings</h1>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {/* Player name */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 shadow">
          <h3 className="font-heading text-lg text-white mb-2">Player</h3>
          <p className="text-white text-base">{state.playerName}</p>
        </div>

        {/* Replay tutorial */}
        <button
          onClick={() => dispatch({ type: 'START_TUTORIAL' })}
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all shadow"
        >
          <h3 className="font-heading text-lg text-white">Replay Tutorial</h3>
          <p className="text-white/80 text-sm">Watch the tutorial again.</p>
        </button>

        {/* Stats */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 shadow">
          <h3 className="font-heading text-lg text-white mb-3">Stats</h3>
          <div className="space-y-2 text-white text-base">
            <div className="flex justify-between"><span>Total acorns earned:</span><span className="font-bold text-acorn-glow">{state.totalAcornsEarned}</span></div>
            <div className="flex justify-between"><span>Questions answered:</span><span className="font-bold">{state.totalQuestionsAnswered}</span></div>
            <div className="flex justify-between"><span>Correct answers:</span><span className="font-bold">{state.totalCorrectAnswers}</span></div>
            <div className="flex justify-between"><span>Best streak:</span><span className="font-bold">{state.bestStreak}</span></div>
            <div className="flex justify-between"><span>Achievements:</span><span className="font-bold">{state.unlockedAchievements.length}</span></div>
          </div>
        </div>

        {/* Reset */}
        <div className="bg-error-soft/20 backdrop-blur-sm rounded-2xl p-5 shadow">
          <h3 className="font-heading text-lg text-white mb-2">Reset Progress</h3>
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-error-soft/60 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-error-soft transition-all shadow-lg"
            >
              Reset Everything
            </button>
          ) : (
            <div>
              <p className="text-white text-sm mb-3">Are you sure? This will delete all your progress!</p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="bg-error-soft text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Parent Mode (hidden) */}
        <div className="mt-4">
          <h3
            className="font-heading text-lg text-white/30 text-center cursor-pointer select-none"
            onClick={handleParentTap}
          >
            Parent Mode
          </h3>

          {showParentMode && (
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 mt-3 shadow animate-fadeIn">
              <p className="text-white text-sm mb-4">Jump to any clearing:</p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <label className="text-white text-sm w-20">Realm:</label>
                  <select
                    value={jumpRealm}
                    onChange={(e) => { setJumpRealm(Number(e.target.value)); setJumpTrail(1); setJumpClearing(0); }}
                    className="flex-1 bg-white/20 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    {[1, 2, 3].map(r => (
                      <option key={r} value={r} className="text-soot">Realm {r}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-white text-sm w-20">Trail:</label>
                  <select
                    value={jumpTrail}
                    onChange={(e) => { setJumpTrail(Number(e.target.value)); setJumpClearing(0); }}
                    className="flex-1 bg-white/20 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    {Array.from({ length: maxTrails }, (_, i) => (
                      <option key={i + 1} value={i + 1} className="text-soot">Trail {i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-white text-sm w-20">Clearing:</label>
                  <select
                    value={jumpClearing}
                    onChange={(e) => setJumpClearing(Number(e.target.value))}
                    className="flex-1 bg-white/20 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    {Array.from({ length: maxClearings }, (_, i) => (
                      <option key={i} value={i} className="text-soot">Clearing {i + 1}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleJump}
                  className="bg-gradient-to-r from-acorn to-acorn-light text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 mt-2"
                >
                  Go!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
