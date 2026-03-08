import { useState, useEffect } from 'react'
import { useGame, isTrailComplete, isRealmComplete } from '../context/GameContext'
import { getClearing, getClearingCount } from '../utils/contentLoader'
import Totoro from '../art/Totoro'
import Confetti from './Confetti'

export default function ResultsScreen() {
  const { state, dispatch } = useGame()
  const [displayedAcorns, setDisplayedAcorns] = useState(0)
  const [starsShown, setStarsShown] = useState(0)

  const clearing = getClearing(state.currentRealm, state.currentTrail, state.currentClearing)
  const key = `${state.currentRealm}-${state.currentTrail}-${state.currentClearing}`
  const progress = state.clearingProgress[key]
  const stars = progress?.stars || 1

  const trailComplete = isTrailComplete(state, state.currentRealm, state.currentTrail)
  const realmComplete = isRealmComplete(state, state.currentRealm)

  const clearingCount = getClearingCount(state.currentRealm, state.currentTrail)
  const hasNextClearing = state.currentClearing + 1 < clearingCount

  // Animate stars appearing one by one
  useEffect(() => {
    const timers = [1, 2, 3].map(s => {
      if (s <= stars) {
        return setTimeout(() => setStarsShown(s), s * 400)
      }
      return null
    })
    return () => timers.forEach(t => t && clearTimeout(t))
  }, [stars])

  // Animate acorn count
  useEffect(() => {
    const target = state.acornsEarnedThisClearing
    if (target <= 0) return
    const step = Math.max(1, Math.ceil(target / 20))
    const interval = setInterval(() => {
      setDisplayedAcorns(prev => {
        if (prev + step >= target) {
          clearInterval(interval)
          return target
        }
        return prev + step
      })
    }, 50)
    return () => clearInterval(interval)
  }, [state.acornsEarnedThisClearing])

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
    <div className="min-h-screen bg-gradient-to-b from-forest to-forest-dark flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Celebration Totoro */}
        <div className="animate-bounceIn mb-4">
          <img
            src="/assets/characters/totoro-celebrate.png"
            alt="Totoro celebrating"
            className="w-32 h-32 object-contain drop-shadow-2xl"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <div style={{ display: 'none' }}><Totoro size={120} /></div>
        </div>

        {/* Story outro */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 mb-6 shadow-xl w-full">
          <p className="text-soot text-center text-lg font-body">{clearing?.storyOutro}</p>
        </div>

        {/* Stars */}
        <div className="flex gap-4 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className="relative">
              <img
                src={s <= starsShown ? '/assets/ui/star-filled.png' : '/assets/ui/star-empty.png'}
                alt={s <= starsShown ? 'Star' : 'Empty star'}
                className={`w-16 h-16 object-contain transition-all duration-300 ${s <= starsShown ? 'animate-bounceIn' : 'opacity-30'}`}
                style={{ animationDelay: `${s * 0.3}s` }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <span
                className={`text-5xl hidden ${s <= starsShown ? 'text-acorn-glow animate-bounceIn' : 'text-white/20'}`}
                style={{ animationDelay: `${s * 0.3}s` }}
              >
                ★
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 w-full mb-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-soot text-base">Acorns earned:</span>
            <div className="flex items-center gap-1">
              <span className="text-2xl">🌰</span>
              <span className="font-bold text-acorn text-xl">{displayedAcorns}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-soot text-base">Correct first try:</span>
            <span className="font-bold text-forest-dark text-lg">{state.correctFirstTry} / {clearing?.tasks?.length || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-soot text-base">Best streak:</span>
            <span className="font-bold text-forest-dark text-lg">{state.bestStreak}</span>
          </div>
        </div>

        {trailComplete && (
          <p className="text-acorn-glow font-heading text-xl mb-4 animate-bounceIn text-shadow-dark">
            {realmComplete ? 'Realm Complete!' : 'Trail Complete!'}
          </p>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 mb-3"
        >
          {trailComplete ? (realmComplete ? 'Celebrate!' : 'Trail Complete!') : hasNextClearing ? 'Next Clearing' : 'Back to Trail'}
        </button>

        <button
          onClick={() => dispatch({ type: 'BACK_TO_TRAIL' })}
          className="bg-white/20 text-white font-bold px-6 py-2 rounded-full transition-all hover:bg-white/30"
        >
          Back to Trail
        </button>
      </div>

      <Confetti trigger={1} />
    </div>
  )
}
