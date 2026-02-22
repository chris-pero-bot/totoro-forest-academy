import { useGame } from '../context/GameContext'
import achievementsData from '../data/achievements.json'

export default function Achievements() {
  const { state, dispatch } = useGame()

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-dark to-forest p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'worldMap' })}
          className="text-cream font-bold text-sm"
        >
          Back
        </button>
      </div>

      <h1 className="font-heading text-3xl text-cream text-center mb-2">Achievements</h1>
      <p className="text-center text-cream/60 mb-8">
        {state.unlockedAchievements.length} / {achievementsData.length} unlocked
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
        {achievementsData.map((achievement) => {
          const unlocked = state.unlockedAchievements.includes(achievement.id)

          return (
            <div
              key={achievement.id}
              className={`rounded-xl p-4 text-center transition-all ${
                unlocked
                  ? 'bg-acorn/20 border-2 border-acorn'
                  : 'bg-white/5 border-2 border-white/10 opacity-60'
              }`}
            >
              <span className="text-3xl block mb-2">
                {unlocked ? achievement.icon : '❓'}
              </span>
              <h3 className={`font-heading text-sm mb-1 ${unlocked ? 'text-acorn' : 'text-cream/40'}`}>
                {unlocked ? achievement.name : '???'}
              </h3>
              <p className={`text-xs ${unlocked ? 'text-cream/80' : 'text-cream/30'}`}>
                {unlocked ? achievement.description : 'Keep playing to unlock!'}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
