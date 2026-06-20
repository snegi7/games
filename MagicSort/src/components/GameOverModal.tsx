import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { isTubeSorted } from '../utils/winChecker';
import { TUBE_CAPACITY } from '../types';

export default function GameOverModal() {
  const gameStatus = useGameStore(s => s.gameStatus);
  const tubes = useGameStore(s => s.tubes);
  const difficulty = useGameStore(s => s.difficulty);
  const restartPuzzle = useGameStore(s => s.restartPuzzle);
  const goHome = useGameStore(s => s.goHome);

  if (gameStatus !== 'lost' || !difficulty) return null;

  const sortedCount = tubes.filter(t => isTubeSorted(t, TUBE_CAPACITY)).length;
  const colorTubes = tubes.filter(t => t.length > 0).length;

  return (
    <motion.div
      className="fixed inset-0 flex items-end justify-center z-50 px-4 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl p-8 text-center"
        style={{
          background: 'linear-gradient(160deg, #1a0d0d, #0d0a1a)',
          border: '1.5px solid rgba(248,113,113,0.2)',
          boxShadow: '0 -20px 60px rgba(248,113,113,0.12)',
        }}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
      >
        <div className="text-5xl mb-3">💔</div>
        <h2 className="text-2xl font-black mb-1" style={{ color: '#f87171' }}>
          Out of Moves!
        </h2>
        <p className="text-sm mb-4" style={{ color: '#6b7280' }}>
          You ran out of moves before all colors were sorted.
        </p>

        <div
          className="flex justify-between items-center rounded-xl px-4 py-3 mb-6 text-sm"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <span style={{ color: '#9ca3af' }}>Tubes sorted</span>
          <span className="font-bold" style={{ color: '#e2e8f0' }}>
            {sortedCount} / {colorTubes}
          </span>
        </div>

        <button
          onClick={restartPuzzle}
          className="block w-full py-3 rounded-2xl font-bold text-white mb-3 transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #f87171, #dc2626)' }}
        >
          ↺ Restart Same Puzzle
        </button>
        <button
          onClick={goHome}
          className="block w-full py-3 rounded-2xl font-semibold transition-transform active:scale-95"
          style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Change Difficulty
        </button>
      </motion.div>
    </motion.div>
  );
}
