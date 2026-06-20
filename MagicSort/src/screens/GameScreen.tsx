import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import TubeBoard from '../components/TubeBoard';
import MoveCounter from '../components/MoveCounter';
import UndoButton from '../components/UndoButton';
import WinModal from '../components/WinModal';
import GameOverModal from '../components/GameOverModal';

export default function GameScreen() {
  const difficulty = useGameStore(s => s.difficulty);
  const goHome = useGameStore(s => s.goHome);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* HUD */}
      <motion.header
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <UndoButton />

        <button
          onClick={goHome}
          className="flex items-center gap-1.5 text-sm font-semibold capitalize transition-opacity hover:opacity-70"
          style={{ color: '#6b7280' }}
        >
          <span className="text-base">🧪</span>
          <span>{difficulty}</span>
        </button>

        <MoveCounter />
      </motion.header>

      {/* Board */}
      <main className="flex-1 flex items-center justify-center">
        <TubeBoard />
      </main>

      {/* Modals */}
      <WinModal />
      <GameOverModal />
    </div>
  );
}
