import { useGame } from '../context/GameContext'
import Totoro from '../art/Totoro'

export default function TitleScreen() {
  const { state, dispatch } = useGame()

  const hasSave = state.tutorialCompleted || Object.keys(state.clearingProgress).length > 0

  function handlePlay() {
    if (hasSave) {
      dispatch({ type: 'NAVIGATE', screen: 'worldMap' })
    } else {
      dispatch({ type: 'START_TUTORIAL' })
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-forest-light"
      style={{ backgroundImage: 'url(/assets/backgrounds/title-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating leaves */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-30 animate-float z-0"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + (i % 2)}s`,
          }}
        >
          <span aria-hidden="true">{i % 2 === 0 ? '🍃' : '🌰'}</span>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 mb-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl text-white text-center mb-3 animate-fadeIn text-shadow-lg">
            Totoro's Forest Academy
          </h1>
          <p className="text-white text-lg animate-fadeIn font-body">
            Learn English with Totoro!
          </p>
        </div>

        {/* Totoro */}
        <div className="animate-float mb-8">
          <img
            src="/assets/characters/totoro-happy.png"
            alt="Totoro"
            className="w-56 h-56 object-contain drop-shadow-2xl"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <div style={{ display: 'none' }}><Totoro size={200} /></div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 animate-slideUp items-center">
          <button
            onClick={handlePlay}
            className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] duration-200 hover:scale-105 active:scale-95"
          >
            {hasSave ? 'Continue' : 'Play'}
          </button>

          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: 'settings' })}
            className="bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors hover:bg-white/30 text-base"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}
