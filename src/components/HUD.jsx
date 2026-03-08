import { useGame } from '../context/GameContext'
import SootSprite from '../art/SootSprite'
import Acorn from '../art/Acorn'

export default function HUD({ showPause = true }) {
  const { state, dispatch } = useGame()

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-forest-dark/95 backdrop-blur-sm text-white rounded-b-xl shadow-lg">
      {/* Lives */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          const asleep = i >= state.lives
          return (
            <img
              key={i}
              src={asleep ? '/assets/characters/soot-sprite-asleep.png' : '/assets/characters/soot-sprite-alive.png'}
              alt={asleep ? 'Sleeping' : 'Alive'}
              className={`w-7 h-7 object-contain transition-all duration-500 ${asleep ? 'opacity-40 grayscale' : ''}`}
              onError={(e) => {
                e.target.style.display = 'none'
                // Fallback to SVG rendered nearby
              }}
            />
          )
        })}
      </div>

      {/* Acorns */}
      <div className="flex items-center gap-1 bg-forest/50 px-3 py-1.5 rounded-full">
        <img src="/assets/ui/acorn.png" alt="" className="w-5 h-5" onError={(e) => { e.target.style.display = 'none' }} />
        <span className="font-bold text-acorn-glow text-base">{state.acorns}</span>
      </div>

      {/* Pause */}
      {showPause && (
        <button
          onClick={() => dispatch({ type: 'BACK_TO_TRAIL' })}
          className="text-white bg-white/10 hover:bg-white/20 text-sm font-bold px-3 py-1.5 rounded-full transition-all"
        >
          Pause
        </button>
      )}
    </div>
  )
}
