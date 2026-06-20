import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const gameStatus = useGameStore(s => s.gameStatus);
  const isPlaying = gameStatus !== 'idle';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isPlaying ? 'game' : 'home'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ minHeight: '100%' }}
      >
        {isPlaying ? <GameScreen /> : <HomeScreen />}
      </motion.div>
    </AnimatePresence>
  );
}
