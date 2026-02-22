import { useGame, isRealmUnlocked } from '../context/GameContext'
import { REALM_INFO } from '../utils/contentLoader'
import Totoro from '../art/Totoro'
import Acorn from '../art/Acorn'

const REALM_ICONS = ['🌲', '🍽️', '🚌']
const REALM_COLORS = [
  'from-green-700 to-green-500',
  'from-amber-700 to-amber-500',
  'from-blue-700 to-blue-500',
]

export default function WorldMap() {
  const { state, dispatch } = useGame()

  function handleRealmClick(realmId) {
    if (isRealmUnlocked(state, realmId)) {
      dispatch({ type: 'SELECT_REALM', realm: realmId })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky via-sky/80 to-forest-light p-4"
      style={{ backgroundImage: 'url(/assets/backgrounds/worldmap-bg.png.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'title' })}
          className="text-forest-dark font-bold text-sm"
        >
          Back
        </button>
        <div className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full">
          <Acorn size={18} />
          <span className="font-bold text-earth">{state.acorns}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: 'shop' })}
            className="bg-acorn/20 text-earth font-bold text-sm px-3 py-1 rounded-full"
          >
            Shop
          </button>
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: 'achievements' })}
            className="bg-acorn/20 text-earth font-bold text-sm px-3 py-1 rounded-full"
          >
            Badges
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-heading text-3xl text-forest-dark text-center mb-2">
        Totoro's Forest
      </h1>
      <p className="text-center text-forest/80 mb-8 font-body">
        Choose a realm to explore!
      </p>

      {/* Realms */}
      <div className="flex flex-col gap-6 max-w-md mx-auto">
        {REALM_INFO.map((realm, i) => {
          const unlocked = isRealmUnlocked(state, realm.id)
          const completed = !!state.realmsCompleted[realm.id]

          return (
            <button
              key={realm.id}
              onClick={() => handleRealmClick(realm.id)}
              disabled={!unlocked}
              className={`relative p-6 rounded-2xl shadow-lg transition-all text-left ${
                unlocked
                  ? `bg-gradient-to-r ${REALM_COLORS[i]} text-white hover:scale-[1.02] hover:shadow-xl`
                  : 'bg-gray-300 text-gray-500 opacity-60'
              } ${completed ? 'ring-4 ring-acorn' : ''}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{unlocked ? REALM_ICONS[i] : '🌫️'}</span>
                <div className="flex-1">
                  <h2 className="font-heading text-xl mb-1">{realm.name}</h2>
                  <p className="text-sm opacity-90">{realm.description}</p>
                  {completed && (
                    <span className="inline-block mt-2 text-xs bg-white/30 px-2 py-1 rounded-full font-bold">
                      Complete!
                    </span>
                  )}
                </div>
              </div>
              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">🔒</span>
                </div>
              )}
              {unlocked && state.currentRealm === realm.id && (
                <div className="absolute -top-2 -right-2 animate-glow">
                  <div className="w-4 h-4 bg-acorn rounded-full" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Totoro at bottom */}
      <div className="flex justify-center mt-8 animate-float">
        <Totoro size={80} />
      </div>
    </div>
  )
}
