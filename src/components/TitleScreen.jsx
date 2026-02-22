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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-forest-dark via-forest to-forest-light relative overflow-hidden"
      style={{ backgroundImage: 'url(/assets/backgrounds/title-bg.png.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Floating leaves */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-40 animate-float"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + (i % 2)}s`,
          }}
        >
          {i % 2 === 0 ? '🍃' : '🌰'}
        </div>
      ))}

      {/* Title */}
      <h1 className="font-heading text-4xl md:text-5xl text-cream text-center mb-4 animate-fadeIn drop-shadow-lg">
        Totoro's Forest Academy
      </h1>

      <p className="text-cream/80 text-lg mb-8 animate-fadeIn font-body">
        Learn English with Totoro!
      </p>

      {/* Totoro */}
      <div className="animate-float mb-8">
        <img
          src="/assets/characters/totoro-happy.png.png"
          alt="Totoro"
          className="w-44 h-44 object-contain drop-shadow-2xl"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <div style={{ display: 'none' }}><Totoro size={180} /></div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 animate-slideUp">
        <button
          onClick={handlePlay}
          className="bg-acorn hover:bg-yellow-600 text-white font-heading text-2xl px-12 py-4 rounded-full shadow-lg transition-all hover:scale-105"
        >
          {hasSave ? 'Continue' : 'Play'}
        </button>

        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'settings' })}
          className="text-cream/60 hover:text-cream font-body text-sm transition-colors"
        >
          Settings
        </button>
      </div>
    </div>
  )
}
