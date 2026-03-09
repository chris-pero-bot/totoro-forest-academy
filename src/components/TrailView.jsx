import { useState, useEffect } from 'react'
import { useGame, isTrailUnlocked, isClearingUnlocked, isTrailComplete, getTrailStars } from '../context/GameContext'
import { REALM_INFO, getClearingCount, getAllClearingsForTrail } from '../utils/contentLoader'

const REALM_BGS = [
  '/assets/backgrounds/realm1-bg.png',
  '/assets/backgrounds/realm2-bg.png',
  '/assets/backgrounds/realm3-bg.png',
]

export default function TrailView() {
  const { state, dispatch } = useGame()
  const [showTip, setShowTip] = useState(false)
  const realmInfo = REALM_INFO[state.currentRealm - 1]

  useEffect(() => {
    if (!state.shownTips.includes('trailview')) {
      setShowTip(true)
    }
  }, [state.shownTips])

  function dismissTip() {
    setShowTip(false)
    dispatch({ type: 'MARK_TIP_SHOWN', tip: 'trailview' })
  }

  if (!realmInfo) return null

  function handleStartClearing(trailId, clearingIndex) {
    if (isClearingUnlocked(state, state.currentRealm, trailId, clearingIndex)) {
      dispatch({
        type: 'START_CLEARING',
        realm: state.currentRealm,
        trail: trailId,
        clearing: clearingIndex,
      })
    }
  }

  return (
    <div
      className="min-h-screen p-4 relative"
      style={{ backgroundImage: `url(${REALM_BGS[state.currentRealm - 1]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => dispatch({ type: 'BACK_TO_WORLD_MAP' })}
            className="bg-white/80 text-forest-dark font-bold px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] hover:scale-105 active:scale-95"
          >
            Back to Map
          </button>
          <div className="flex items-center gap-1 bg-white/85 backdrop-blur-sm px-4 py-2 rounded-full shadow">
            <span aria-hidden="true">🌰</span>
            <span className="font-bold text-earth text-lg">{state.acorns}</span>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center mx-auto max-w-lg">
          <h1 className="font-heading text-2xl text-white text-shadow-dark mb-1">{realmInfo.name}</h1>
          <p className="text-white text-sm">{realmInfo.description}</p>
        </div>

        {/* Trails as winding path */}
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          {realmInfo.trails.map((trail, trailIdx) => {
            const unlocked = isTrailUnlocked(state, state.currentRealm, trail.id)
            const completed = isTrailComplete(state, state.currentRealm, trail.id)
            const { total: stars, max: maxStars } = getTrailStars(state, state.currentRealm, trail.id)
            const clearings = getAllClearingsForTrail(state.currentRealm, trail.id)

            return (
              <div
                key={trail.id}
                className={`rounded-2xl overflow-hidden transition-[box-shadow,opacity] shadow-xl ${
                  unlocked ? 'bg-white/15 backdrop-blur-sm' : 'bg-white/5 opacity-50'
                }`}
              >
                {/* Trail header */}
                <div className={`p-4 ${completed ? 'bg-success/30' : unlocked ? 'bg-forest-light/30' : 'bg-gray-500/20'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">{unlocked ? (completed ? '✅' : '🔓') : '🔒'}</span>
                    <div>
                      <h3 className="font-heading text-lg text-white text-shadow-dark">
                        Trail {trail.id}: {trail.name}
                      </h3>
                      <p className="text-white/80 text-xs">
                        {clearings.length} clearings | <span aria-hidden="true">{'⭐'.repeat(Math.min(stars, 6))}</span> {stars}/{maxStars}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Clearings as path nodes */}
                {unlocked && (
                  <div className="p-4">
                    {/* Winding path visualization */}
                    <div className="flex flex-col items-center gap-1">
                      {clearings.map((clearing, idx) => {
                        const clearingUnlocked = isClearingUnlocked(state, state.currentRealm, trail.id, idx)
                        const key = `${state.currentRealm}-${trail.id}-${idx}`
                        const progress = state.clearingProgress[key]
                        const clearingStars = progress?.stars || 0
                        const isCurrent = clearingUnlocked && !progress?.completed

                        return (
                          <div key={idx} className="flex items-center gap-4 w-full" style={{ paddingLeft: idx % 2 === 0 ? '0' : '40px' }}>
                            {/* Connector line */}
                            {idx > 0 && (
                              <div className="absolute w-0.5 h-4 bg-white/20" style={{ marginTop: '-12px' }} />
                            )}

                            <button
                              onClick={() => handleStartClearing(trail.id, idx)}
                              disabled={!clearingUnlocked}
                              className={`flex items-center gap-3 py-3 px-4 rounded-2xl w-full transition-[transform,border-color,background-color,box-shadow] duration-200 ${
                                clearingUnlocked
                                  ? progress?.completed
                                    ? 'bg-success/30 hover:bg-success/40 border-2 border-success/50'
                                    : 'bg-acorn/20 hover:bg-acorn/30 border-2 border-acorn/50 animate-pulseGlow'
                                  : 'bg-white/5 border-2 border-white/10'
                              } ${clearingUnlocked ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}`}
                            >
                              {/* Circle node */}
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow ${
                                progress?.completed
                                  ? 'bg-success text-white border-2 border-acorn-glow'
                                  : isCurrent
                                    ? 'bg-acorn text-white animate-pulseGlow'
                                    : clearingUnlocked
                                      ? 'bg-white/30 text-white'
                                      : 'bg-gray-500/30 text-gray-400'
                              }`}>
                                {!clearingUnlocked ? '🔒' : progress?.completed ? '✓' : idx + 1}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="text-white font-bold text-sm truncate text-shadow-dark">
                                  {clearing.name}
                                </p>
                                <div className="flex gap-1 mt-0.5">
                                  {[1, 2, 3].map(s => (
                                    <span key={s} className={`text-sm ${s <= clearingStars ? 'text-acorn-glow' : 'text-white/20'}`}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* First-time tip */}
      {showTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true" onClick={dismissTip}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 text-center">
            <div className="text-5xl mb-4" aria-hidden="true">🗺️</div>
            <p className="text-xl font-bold text-soot mb-4 font-body">Each dot is a Clearing. Complete them all to finish the Trail!</p>
            <button onClick={dismissTip} className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-lg px-8 py-3 rounded-full shadow-lg">
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
