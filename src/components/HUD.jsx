import { useGame } from '../context/GameContext'
import SootSprite from '../art/SootSprite'
import Acorn from '../art/Acorn'

export default function HUD({ showPause = true }) {
  const { state, dispatch } = useGame()

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-forest-dark/90 text-white rounded-b-xl">
      {/* Lives */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <SootSprite key={i} size={24} asleep={i >= state.lives} />
        ))}
      </div>

      {/* Acorns */}
      <div className="flex items-center gap-1 bg-forest/50 px-3 py-1 rounded-full">
        <Acorn size={20} />
        <span className="font-bold text-acorn">{state.acorns}</span>
      </div>

      {/* Power-ups */}
      <div className="flex items-center gap-2">
        {state.powerUps.meis_hint > 0 && (
          <button
            onClick={() => dispatch({ type: 'USE_POWER_UP', powerUp: 'meis_hint' })}
            className="text-sm bg-forest-light/30 px-2 py-1 rounded"
            title="Mei's Hint"
          >
            Hint ({state.powerUps.meis_hint})
          </button>
        )}
      </div>

      {/* Pause */}
      {showPause && (
        <button
          onClick={() => dispatch({ type: 'BACK_TO_TRAIL' })}
          className="text-white/80 hover:text-white text-sm font-bold px-2 py-1"
        >
          Pause
        </button>
      )}
    </div>
  )
}
