import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { DIFFICULTY_CONFIGS } from '../types';

const CONFETTI_COLORS = ['#ffd60a', '#c77dff', '#4cc9f0', '#06d6a0', '#ff4d6d', '#ff6d00', '#ff70a6', '#00b4d8'];

export default function WinModal() {
  const gameStatus = useGameStore(s => s.gameStatus);
  const moveCount = useGameStore(s => s.moveCount);
  const difficulty = useGameStore(s => s.difficulty);
  const startGame = useGameStore(s => s.startGame);
  const goHome = useGameStore(s => s.goHome);

  if (gameStatus !== 'won' || !difficulty) return null;

  const confettiOffsets = useRef(
    CONFETTI_COLORS.map(() => ({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
    }))
  );

  const moveLimit = DIFFICULTY_CONFIGS[difficulty].moveLimit;

  return (
    <motion.div
      className="fixed inset-0 flex items-end justify-center z-50 px-4 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
    >
      {/* Confetti dots */}
      {CONFETTI_COLORS.map((color, i) => (
        <motion.div
          key={i}
          className="fixed rounded-full pointer-events-none"
          style={{
            width: 10, height: 10,
            background: color,
            left: '50%', top: '40%',
          } as React.CSSProperties}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.5, 0], x: [confettiOffsets.current[i].x], y: [confettiOffsets.current[i].y], opacity: [1, 1, 0] }}
          transition={{ duration: 0.9, delay: i * 0.06, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="w-full max-w-sm rounded-3xl p-8 text-center"
        style={{
          background: 'linear-gradient(160deg, #1a1035, #0d0a1a)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          boxShadow: '0 -20px 60px rgba(139,92,246,0.25)',
        }}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
      >
        <div className="text-5xl mb-3">🎉</div>
        <h2
          className="text-2xl font-black mb-2"
          style={{
            background: 'linear-gradient(135deg, #ffd60a, #c77dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Perfectly Sorted!
        </h2>
        <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
          Completed in{' '}
          <span style={{ color: '#c084fc', fontWeight: 700 }}>{moveCount} moves</span>
          {moveLimit !== null && (
            <> out of <span style={{ color: '#94a3b8', fontWeight: 700 }}>{moveLimit}</span></>
          )}{' '}
          on <span style={{ color: '#e2e8f0', fontWeight: 700, textTransform: 'capitalize' }}>{difficulty}</span>
        </p>

        <button
          onClick={() => startGame(difficulty)}
          className="block w-full py-3 rounded-2xl font-bold text-white mb-3 transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #c084fc, #60a5fa)' }}
        >
          Play Again
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
