import { useState, useEffect } from 'react'
import { useGame, isRealmUnlocked } from '../context/GameContext'
import { REALM_INFO, getTrailCount, getClearingCount } from '../utils/contentLoader'
import { isTrailComplete, getTrailStars } from '../context/GameContext'
import Totoro from '../art/Totoro'
import Acorn from '../art/Acorn'

const REALM_ICONS = ['🌲', '🍽️', '🚌']
const REALM_BGS = [
  '/assets/backgrounds/realm1-bg.png',
  '/assets/backgrounds/realm2-bg.png',
  '/assets/backgrounds/realm3-bg.png',
]

export default function WorldMap() {
  const { state, dispatch } = useGame()
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    if (!state.shownTips.includes('worldmap')) {
      setShowTip(true)
    }
  }, [state.shownTips])

  function dismissTip() {
    setShowTip(false)
    dispatch({ type: 'MARK_TIP_SHOWN', tip: 'worldmap' })
  }

  function handleRealmClick(realmId) {
    if (isRealmUnlocked(state, realmId)) {
      dispatch({ type: 'SELECT_REALM', realm: realmId })
    }
  }

  function getRealmProgress(realmId) {
    const trailCount = getTrailCount(realmId)
    let completedTrails = 0
    let totalStars = 0
    let maxStars = 0
    for (let t = 1; t <= trailCount; t++) {
      if (isTrailComplete(state, realmId, t)) completedTrails++
      const s = getTrailStars(state, realmId, t)
      totalStars += s.total
      maxStars += s.max
    }
    return { completedTrails, trailCount, totalStars, maxStars }
  }

  return (
    <div
      className="min-h-screen p-4 bg-gradient-to-b from-sky via-sky/80 to-forest-light"
      style={{ backgroundImage: 'url(/assets/backgrounds/worldmap-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" style={{ position: 'fixed' }} />

      <div className="relative z-10">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: 'title' })}
            className="bg-white/80 text-forest-dark font-bold px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] hover:scale-105 active:scale-95"
          >
            Back
          </button>
          <div className="flex items-center gap-1 bg-white/85 backdrop-blur-sm px-4 py-2 rounded-full shadow">
            <img src="/assets/ui/acorn.png" alt="" className="w-5 h-5" onError={(e) => { e.target.style.display = 'none' }} />
            <span className="font-bold text-earth text-lg">{state.acorns}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', screen: 'shop' })}
              className="bg-white/80 text-earth font-bold text-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] hover:scale-105 active:scale-95"
            >
              Shop
            </button>
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', screen: 'achievements' })}
              className="bg-white/80 text-earth font-bold text-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] hover:scale-105 active:scale-95"
            >
              Badges
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center mx-auto max-w-md">
          <h1 className="font-heading text-3xl text-white text-shadow-dark mb-1">
            Totoro's Forest
          </h1>
          <p className="text-white text-base font-body">
            Choose a realm to explore!
          </p>
        </div>

        {/* Realms */}
        <div className="flex flex-col gap-5 max-w-md mx-auto">
          {REALM_INFO.map((realm, i) => {
            const unlocked = isRealmUnlocked(state, realm.id)
            const completed = !!state.realmsCompleted[realm.id]
            const progress = getRealmProgress(realm.id)

            return (
              <button
                key={realm.id}
                onClick={() => handleRealmClick(realm.id)}
                disabled={!unlocked}
                className={`relative h-44 rounded-2xl shadow-lg hover:shadow-xl transition-[transform,box-shadow] duration-200 text-left overflow-hidden ${
                  unlocked ? 'hover:scale-[1.02] active:scale-[0.98]' : 'opacity-60'
                } ${completed ? 'ring-4 ring-acorn-glow' : ''}`}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${REALM_BGS[i]})`,
                    filter: unlocked ? 'none' : 'grayscale(100%)',
                  }}
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-4xl" aria-hidden="true">{unlocked ? REALM_ICONS[i] : '🔒'}</span>
                    <div className="flex-1">
                      <h2 className="font-heading text-2xl text-white text-shadow-dark mb-1">{realm.name}</h2>
                      <p className="text-white text-sm text-shadow-dark">{realm.description}</p>
                      {unlocked && (
                        <p className="text-white/90 text-xs mt-2 font-bold">
                          {progress.completedTrails}/{progress.trailCount} Trails | <span aria-hidden="true">{'⭐'.repeat(Math.min(progress.totalStars, 9))}</span> {progress.totalStars}/{progress.maxStars}
                        </p>
                      )}
                      {completed && (
                        <span className="inline-block mt-1 text-xs bg-acorn-glow/30 px-3 py-1 rounded-full font-bold text-white">
                          Complete!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Totoro at bottom */}
        <div className="flex justify-center mt-6 animate-float">
          <img
            src="/assets/characters/totoro-umbrella.png"
            alt="Totoro"
            className="w-24 h-24 object-contain drop-shadow-xl"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <div style={{ display: 'none' }}><Totoro size={80} /></div>
        </div>
      </div>

      {/* First-time tip overlay */}
      {showTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true" onClick={dismissTip}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 text-center">
            <img src="/assets/characters/totoro-happy.png" alt="Totoro" className="w-20 h-20 object-contain mx-auto mb-4" />
            <p className="text-xl font-bold text-soot mb-4 font-body">This is the forest! Tap a place to explore it.</p>
            <button onClick={dismissTip} className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-lg px-8 py-3 rounded-full shadow-lg">
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
