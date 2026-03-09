import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { POWER_UP_COSTS } from '../utils/scoring'

const POWER_UPS = [
  {
    id: 'meis_hint',
    name: "Mei's Hint",
    description: 'Shows you a clue!',
    cost: POWER_UP_COSTS.meis_hint,
    icon: '🍃',
    image: '/assets/characters/mei.png',
  },
  {
    id: 'totoros_roar',
    name: "Totoro's Roar",
    description: 'Removes two wrong answers!',
    cost: POWER_UP_COSTS.totoros_roar,
    icon: '🌊',
    image: '/assets/characters/totoro-happy.png',
  },
  {
    id: 'catbus_skip',
    name: 'Catbus Skip',
    description: 'Skip a hard question!',
    cost: POWER_UP_COSTS.catbus_skip,
    icon: '🚌',
    image: '/assets/characters/catbus.png',
  },
  {
    id: 'soot_sprite_rescue',
    name: 'Soot Sprite Rescue',
    description: 'Restore 1 lost life!',
    cost: POWER_UP_COSTS.soot_sprite_rescue,
    icon: '🖤',
    image: '/assets/characters/soot-sprite-alive.png',
  },
]

export default function Shop() {
  const { state, dispatch } = useGame()
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    if (!state.shownTips.includes('shop')) {
      setShowTip(true)
    }
  }, [state.shownTips])

  function dismissTip() {
    setShowTip(false)
    dispatch({ type: 'MARK_TIP_SHOWN', tip: 'shop' })
  }

  return (
    <div
      className="min-h-screen p-4 relative bg-gradient-to-b from-earth to-acorn/80"
      style={{ backgroundImage: 'url(/assets/backgrounds/shop-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: 'worldMap' })}
            className="bg-white/80 text-forest-dark font-bold px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] hover:scale-105 active:scale-95"
          >
            Back
          </button>
          <div className="flex items-center gap-1 bg-white/85 backdrop-blur-sm px-4 py-2 rounded-full shadow">
            <span className="text-lg" aria-hidden="true">🌰</span>
            <span className="font-bold text-earth text-lg">{state.acorns}</span>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center mx-auto max-w-md">
          <h1 className="font-heading text-3xl text-white text-shadow-dark mb-1">Power-Up Shop</h1>
          <p className="text-white text-base">These will help you on hard questions!</p>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {POWER_UPS.map((item) => {
            const canAfford = state.acorns >= item.cost
            const owned = state.powerUps[item.id] || 0

            return (
              <div key={item.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 shadow-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
                <span className="text-4xl hidden">{item.icon}</span>
                <div className="flex-1">
                  <h3 className="font-heading text-lg text-soot">{item.name}</h3>
                  <p className="text-soot/70 text-sm">{item.description}</p>
                  {owned > 0 && (
                    <p className="text-forest font-bold text-xs mt-1">You have: {owned}</p>
                  )}
                </div>
                <button
                  onClick={() => dispatch({ type: 'BUY_POWER_UP', powerUp: item.id })}
                  disabled={!canAfford}
                  className={`flex items-center gap-1 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg transition-[transform,box-shadow,background-color] duration-200 ${
                    canAfford
                      ? 'bg-gradient-to-r from-acorn to-acorn-light text-white hover:shadow-xl hover:scale-105 active:scale-95'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span aria-hidden="true">🌰</span> {item.cost}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* First-time tip */}
      {showTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true" onClick={dismissTip}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 text-center">
            <div className="text-5xl mb-4" aria-hidden="true">🛍️</div>
            <p className="text-xl font-bold text-soot mb-4 font-body">Spend your acorns here! Power-ups help you in tough spots.</p>
            <button onClick={dismissTip} className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-lg px-8 py-3 rounded-full shadow-lg">
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
