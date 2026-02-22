import { useGame, isTrailUnlocked, isClearingUnlocked, isTrailComplete, getTrailStars } from '../context/GameContext'
import { REALM_INFO, getClearingCount, getAllClearingsForTrail } from '../utils/contentLoader'
import Acorn from '../art/Acorn'

export default function TrailView() {
  const { state, dispatch } = useGame()
  const realmInfo = REALM_INFO[state.currentRealm - 1]

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
    <div className="min-h-screen bg-gradient-to-b from-forest-dark to-forest p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => dispatch({ type: 'BACK_TO_WORLD_MAP' })}
          className="text-cream font-bold text-sm"
        >
          Back to Map
        </button>
        <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
          <Acorn size={18} />
          <span className="font-bold text-acorn">{state.acorns}</span>
        </div>
      </div>

      <h1 className="font-heading text-2xl text-cream text-center mb-1">{realmInfo.name}</h1>
      <p className="text-cream/60 text-center text-sm mb-6">{realmInfo.description}</p>

      {/* Trails */}
      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        {realmInfo.trails.map((trail) => {
          const unlocked = isTrailUnlocked(state, state.currentRealm, trail.id)
          const completed = isTrailComplete(state, state.currentRealm, trail.id)
          const { total: stars, max: maxStars } = getTrailStars(state, state.currentRealm, trail.id)
          const clearings = getAllClearingsForTrail(state.currentRealm, trail.id)
          const clearingCount = clearings.length

          return (
            <div
              key={trail.id}
              className={`rounded-xl overflow-hidden transition-all ${
                unlocked ? 'bg-white/10' : 'bg-white/5 opacity-50'
              }`}
            >
              {/* Trail header */}
              <div className={`p-4 ${completed ? 'bg-success/20' : unlocked ? 'bg-forest-light/20' : 'bg-gray-500/20'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{unlocked ? (completed ? '✅' : '🔓') : '🔒'}</span>
                    <div>
                      <h3 className="font-heading text-lg text-cream">
                        Trail {trail.id}: {trail.name}
                      </h3>
                      <p className="text-cream/60 text-xs">
                        {clearingCount} clearings | {'⭐'.repeat(Math.min(stars, 9))} {stars}/{maxStars}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clearings */}
              {unlocked && (
                <div className="p-3 flex flex-wrap gap-2">
                  {clearings.map((clearing, idx) => {
                    const clearingUnlocked = isClearingUnlocked(state, state.currentRealm, trail.id, idx)
                    const key = `${state.currentRealm}-${trail.id}-${idx}`
                    const progress = state.clearingProgress[key]
                    const clearingStars = progress?.stars || 0

                    return (
                      <button
                        key={idx}
                        onClick={() => handleStartClearing(trail.id, idx)}
                        disabled={!clearingUnlocked}
                        className={`flex flex-col items-center p-2 rounded-lg min-w-[80px] transition-all ${
                          clearingUnlocked
                            ? progress?.completed
                              ? 'bg-success/30 hover:bg-success/40'
                              : 'bg-acorn/20 hover:bg-acorn/30 animate-glow'
                            : 'bg-white/5 opacity-40'
                        }`}
                      >
                        <span className="text-xs text-cream font-bold mb-1 truncate max-w-[70px]">
                          {clearing.name}
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map(s => (
                            <span key={s} className={`text-xs ${s <= clearingStars ? 'text-acorn' : 'text-white/20'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        {!clearingUnlocked && <span className="text-xs">🔒</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
