import { useState } from 'react'
import { useGame } from '../context/GameContext'
import cutsceneData from '../data/cutscenes.json'
import Totoro from '../art/Totoro'

const CUTSCENE_BGS = {
  'realm-1': '/assets/cutscenes/cutscene-realm1-done.png',
  'realm-2': '/assets/cutscenes/cutscene-realm2-done.png',
  'realm-3': '/assets/cutscenes/cutscene-realm3-done.png',
}

const sceneEmojis = {
  animals_celebrating: '🎉🦁🐧🦅',
  totoro_dancing: '💃🌿',
  map_restored: '🗺️✨',
  path_clear: '🛤️🌟',
  clocks_ticking: '⏰🕐',
  totoro_nodding: '😊🌿',
  animals_happy: '🐬🦜🐨',
  almost_done: '🌟🌟🌟',
  museum_restored: '🏛️✨',
  fog_cleared: '☀️🌲',
  totoro_jumping: '🎊🌿',
  spirits_family: '👨‍👩‍👧‍👦✨',
  feast_prep: '🍳🥘',
  table_set: '🍽️✨',
  kitchen_cooking: '👩‍🍳🔥',
  polite_spirits: '🙏✨',
  feast_almost: '🍗🥧',
  recipes_found: '📖✨',
  almost_feast: '🎉',
  feast_served: '🍽️🎊',
  spirits_thankful: '🙏💚',
  totoro_eating: '😋🌿',
  catbus_ready: '🚌✨',
  city_waking: '🌅🏙️',
  signs_fixed: '🪧✨',
  route_clear: '🗺️🚌',
  things_returned: '📦✨',
  city_beautiful: '🏙️🌟',
  calendar_fixed: '📅✨',
  almost_saved: '🌟',
  tour_complete: '🎉🏙️',
  catbus_purring: '🚌💚',
  big_celebration: '🎊🎉🎊',
  final_celebration: '💚🌲✨',
  museum_bright: '🏛️☀️',
  creatures_normal: '🦁🐧🐬',
  new_path: '🛤️✨',
  realm1_complete: '🎊',
  spirits_full: '😊🍽️',
  to_city: '🚌🏙️',
  new_adventure: '🌟',
  realm2_complete: '🎊',
  city_saved: '🏙️✨',
  uncle_happy: '😊👨',
  forest_restored: '🌲☀️🌲',
  game_complete: '🎊🎉🎊🎉',
  totoro_farewell: '💚🌿',
}

export default function Cutscene() {
  const { state, dispatch } = useGame()
  const [panelIndex, setPanelIndex] = useState(0)

  let panels = []
  if (state.cutsceneType === 'trail') {
    const realmKey = `realm-${state.cutsceneRealm}`
    const trailKey = `trail-${state.cutsceneTrail}`
    panels = cutsceneData.trail_completions?.[realmKey]?.[trailKey]?.panels || []
  } else if (state.cutsceneType === 'realm') {
    const realmKey = `realm-${state.cutsceneRealm}`
    panels = cutsceneData.realm_completions?.[realmKey]?.panels || []
  }

  const currentPanel = panels[panelIndex]
  const isLast = panelIndex >= panels.length - 1

  function handleNext() {
    if (isLast) {
      dispatch({ type: 'BACK_TO_TRAIL' })
      if (state.cutsceneType === 'realm') {
        dispatch({ type: 'BACK_TO_WORLD_MAP' })
      }
    } else {
      setPanelIndex(panelIndex + 1)
    }
  }

  if (!currentPanel) {
    return (
      <div className="min-h-screen bg-forest-dark flex items-center justify-center">
        <button
          onClick={() => dispatch({ type: 'BACK_TO_WORLD_MAP' })}
          className="bg-gradient-to-r from-acorn to-acorn-light text-white font-heading text-xl px-10 py-4 rounded-full shadow-lg"
        >
          Continue
        </button>
      </div>
    )
  }

  const realmKey = `realm-${state.cutsceneRealm}`
  const bgImage = CUTSCENE_BGS[realmKey] || '/assets/cutscenes/cutscene-fog.png'

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 cursor-pointer relative"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={handleNext}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Panel counter */}
        <div className="flex gap-2 mb-8">
          {panels.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${i === panelIndex ? 'bg-acorn-glow scale-125' : i < panelIndex ? 'bg-white/60' : 'bg-white/20'}`}
            />
          ))}
        </div>

        {/* Scene emoji */}
        <div className="text-6xl mb-6 animate-bounceIn">
          {sceneEmojis[currentPanel.scene] || '✨'}
        </div>

        {/* Totoro */}
        <div className="mb-6 animate-float">
          <img
            src="/assets/characters/totoro-celebrate.png"
            alt="Totoro"
            className="w-28 h-28 object-contain drop-shadow-2xl"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <div style={{ display: 'none' }}><Totoro size={120} /></div>
        </div>

        {/* Text */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 max-w-md animate-fadeIn shadow-2xl">
          <p className="text-soot text-center text-xl font-bold">{currentPanel.text}</p>
        </div>

        {/* Tap to continue */}
        <p className="text-white/60 text-sm mt-8 animate-pulse font-bold">
          {isLast ? 'Tap to continue' : 'Tap for next'}
        </p>
      </div>
    </div>
  )
}
