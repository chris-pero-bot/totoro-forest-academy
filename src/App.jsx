import { GameProvider, useGame } from './context/GameContext'
import TitleScreen from './components/TitleScreen'
import Tutorial from './components/Tutorial'
import WorldMap from './components/WorldMap'
import TrailView from './components/TrailView'
import ClearingScreen from './components/ClearingScreen'
import ResultsScreen from './components/ResultsScreen'
import Cutscene from './components/Cutscene'
import Shop from './components/Shop'
import Achievements from './components/Achievements'
import Settings from './components/Settings'

function GameRouter() {
  const { state } = useGame()

  const screens = {
    title: TitleScreen,
    tutorial: Tutorial,
    worldMap: WorldMap,
    trailView: TrailView,
    clearing: ClearingScreen,
    results: ResultsScreen,
    cutscene: Cutscene,
    shop: Shop,
    achievements: Achievements,
    settings: Settings,
  }

  const Screen = screens[state.screen] || TitleScreen

  return (
    <div className="game-container">
      <Screen />
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  )
}
