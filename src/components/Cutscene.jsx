import { useState } from 'react'
import { useGame } from '../context/GameContext'
import cutsceneData from '../data/cutscenes.json'
import Totoro from '../art/Totoro'

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
          className="text-cream font-heading text-xl"
        >
          Continue
        </button>
      </div>
    )
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

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-forest-dark via-forest to-forest-light flex flex-col items-center justify-center p-6 cursor-pointer"
      onClick={handleNext}
    >
      {/* Panel counter */}
      <div className="flex gap-2 mb-8">
        {panels.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i === panelIndex ? 'bg-acorn' : i < panelIndex ? 'bg-cream/60' : 'bg-white/20'}`}
          />
        ))}
      </div>

      {/* Scene emoji */}
      <div className="text-6xl mb-6 animate-bounceIn">
        {sceneEmojis[currentPanel.scene] || '✨'}
      </div>

      {/* Totoro */}
      <div className="mb-6 animate-float">
        <Totoro size={120} />
      </div>

      {/* Text */}
      <div className="bg-white/15 rounded-2xl p-6 max-w-md animate-fadeIn">
        <p className="text-cream text-center text-xl font-bold">{currentPanel.text}</p>
      </div>

      {/* Tap to continue */}
      <p className="text-cream/40 text-sm mt-8 animate-pulse">
        {isLast ? 'Tap to continue' : 'Tap for next'}
      </p>
    </div>
  )
}
