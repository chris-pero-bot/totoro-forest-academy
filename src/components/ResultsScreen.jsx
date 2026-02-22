import { useGame, isTrailComplete, isRealmComplete } from '../context/GameContext'
import { getClearing, getClearingCount } from '../utils/contentLoader'
import { calculateStars } from '../utils/scoring'
import Acorn from '../art/Acorn'
import Totoro from '../art/Totoro'

export default function ResultsScreen() {
  const { state, dispatch } = useGame()

  const clearing = getClearing(state.currentRealm, state.currentTrail, state.currentClearing)
  const key = `${state.currentRealm}-${state.currentTrail}-${state.currentClearing}`
  const progress = state.clearingProgress[key]
  const stars = progress?.stars || 1

  const trailComplete = isTrailComplete(state, state.currentRealm, state.currentTrail)
  const realmComplete = isRealmComplete(state, state.currentRealm)

  const clearingCount = getClearingCount(state.currentRealm, state.currentTrail)
  const hasNextClearing = state.currentClearing + 1 < clearingCount

  function handleNext() {
    if (trailComplete) {
      if (realmComplete) {
        dispatch({ type: 'COMPLETE_REALM' })
      } else {
        dispatch({ type: 'COMPLETE_TRAIL' })
      }
    } else if (hasNextClearing) {
      dispatch({ type: 'GO_TO_NEXT_CLEARING' })
    } else {
      dispatch({ type: 'BACK_TO_TRAIL' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest to-forest-dark flex flex-col items-center justify-center p-6">
      {/* Celebration Totoro */}
      <div className="animate-bounceIn mb-4">
        <Totoro size={100} />
      </div>

      {/* Story outro */}
      <div className="bg-white/10 rounded-xl p-4 max-w-md mb-6">
        <p className="text-cream text-center">{clearing?.storyOutro}</p>
      </div>

      {/* Stars */}
      <div className="flex gap-3 mb-6">
        {[1, 2, 3].map(s => (
          <span
            key={s}
            className={`text-5xl transition-all ${
              s <= stars ? 'text-acorn animate-pop' : 'text-white/20'
            }`}
            style={{ animationDelay: `${s * 0.2}s` }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-white/10 rounded-xl p-4 w-full max-w-sm mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-cream/80">Acorns earned:</span>
          <div className="flex items-center gap-1">
            <Acorn size={20} />
            <span className="font-bold text-acorn text-lg">{state.acornsEarnedThisClearing}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-cream/80">Correct first try:</span>
          <span className="font-bold text-cream">{state.correctFirstTry} / {clearing?.tasks?.length || 0}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-cream/80">Best streak:</span>
          <span className="font-bold text-cream">{state.bestStreak}</span>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="bg-acorn hover:bg-yellow-600 text-white font-heading text-xl px-10 py-3 rounded-full shadow-lg transition-all hover:scale-105 mb-3"
      >
        {trailComplete ? (realmComplete ? 'Celebrate!' : 'Trail Complete!') : hasNextClearing ? 'Next Clearing' : 'Back to Trail'}
      </button>

      <button
        onClick={() => dispatch({ type: 'BACK_TO_TRAIL' })}
        className="text-cream/50 hover:text-cream text-sm"
      >
        Back to Trail
      </button>
    </div>
  )
}
