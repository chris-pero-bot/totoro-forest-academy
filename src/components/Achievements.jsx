import { useGame } from '../context/GameContext'
import achievementsData from '../data/achievements.json'

export default function Achievements() {
  const { state, dispatch } = useGame()

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-dark to-forest p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'worldMap' })}
          className="bg-white/20 text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-all hover:scale-105 active:scale-95"
        >
          Back
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center mx-auto max-w-lg">
        <h1 className="font-heading text-3xl text-white text-shadow-dark mb-1">Achievements</h1>
        <p className="text-white text-base">
          {state.unlockedAchievements.length} / {achievementsData.length} unlocked
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
        {achievementsData.map((achievement) => {
          const unlocked = state.unlockedAchievements.includes(achievement.id)

          return (
            <div
              key={achievement.id}
              className={`rounded-2xl p-4 text-center transition-all shadow-lg ${
                unlocked
                  ? 'bg-white/90 backdrop-blur-sm border-2 border-acorn-glow'
                  : 'bg-white/10 backdrop-blur-sm border-2 border-white/10 opacity-60'
              }`}
            >
              <span className="text-4xl block mb-2">
                {unlocked ? achievement.icon : '❓'}
              </span>
              <h3 className={`font-heading text-sm mb-1 ${unlocked ? 'text-earth-dark' : 'text-white/40'}`}>
                {unlocked ? achievement.name : '???'}
              </h3>
              <p className={`text-xs ${unlocked ? 'text-soot/70' : 'text-white/30'}`}>
                {unlocked ? achievement.description : 'Keep playing to unlock!'}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
