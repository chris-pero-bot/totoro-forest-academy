import { useGame } from '../context/GameContext'
import { POWER_UP_COSTS } from '../utils/scoring'
import Acorn from '../art/Acorn'

const POWER_UPS = [
  {
    id: 'meis_hint',
    name: "Mei's Hint",
    description: 'Shows you a clue!',
    cost: POWER_UP_COSTS.meis_hint,
    icon: '🍃',
  },
  {
    id: 'totoros_roar',
    name: "Totoro's Roar",
    description: 'Removes two wrong answers!',
    cost: POWER_UP_COSTS.totoros_roar,
    icon: '🌊',
  },
  {
    id: 'catbus_skip',
    name: 'Catbus Skip',
    description: 'Skip a hard question!',
    cost: POWER_UP_COSTS.catbus_skip,
    icon: '🚌',
  },
  {
    id: 'soot_sprite_rescue',
    name: 'Soot Sprite Rescue',
    description: 'Restore 1 lost life!',
    cost: POWER_UP_COSTS.soot_sprite_rescue,
    icon: '🖤',
  },
]

export default function Shop() {
  const { state, dispatch } = useGame()

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth to-acorn/80 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'worldMap' })}
          className="text-white font-bold text-sm"
        >
          Back
        </button>
        <div className="flex items-center gap-1 bg-white/20 px-4 py-2 rounded-full">
          <Acorn size={22} />
          <span className="font-bold text-white text-lg">{state.acorns}</span>
        </div>
      </div>

      <h1 className="font-heading text-3xl text-white text-center mb-2">Power-Up Shop</h1>
      <p className="text-center text-white/70 mb-8">These will help you on hard questions!</p>

      {/* Items */}
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {POWER_UPS.map((item) => {
          const canAfford = state.acorns >= item.cost
          const owned = state.powerUps[item.id] || 0

          return (
            <div key={item.id} className="bg-white/15 rounded-xl p-4 flex items-center gap-4">
              <span className="text-4xl">{item.icon}</span>
              <div className="flex-1">
                <h3 className="font-heading text-lg text-white">{item.name}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
                {owned > 0 && (
                  <p className="text-acorn text-xs font-bold mt-1">You have: {owned}</p>
                )}
              </div>
              <button
                onClick={() => dispatch({ type: 'BUY_POWER_UP', powerUp: item.id })}
                disabled={!canAfford}
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold text-sm ${
                  canAfford
                    ? 'bg-white text-earth hover:bg-cream hover:scale-105 transition-all'
                    : 'bg-white/20 text-white/40 cursor-not-allowed'
                }`}
              >
                <Acorn size={16} />
                {item.cost}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
