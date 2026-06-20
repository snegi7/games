import { useGameStore } from './store/gameStore';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const gameStatus = useGameStore(s => s.gameStatus);

  return gameStatus === 'idle' ? <HomeScreen /> : <GameScreen />;
}
