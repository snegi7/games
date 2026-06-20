import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import type { Difficulty } from '../types';
import { DIFFICULTY_CONFIGS } from '../types';

const DIFF_STYLES = {
  easy:   { color: '#4ade80', border: 'rgba(74,222,128,0.35)',  bg: 'rgba(74,222,128,0.08)',  emoji: '🌱' },
  medium: { color: '#facc15', border: 'rgba(250,204,21,0.35)',  bg: 'rgba(250,204,21,0.08)',  emoji: '🔥' },
  hard:   { color: '#f87171', border: 'rgba(248,113,113,0.35)', bg: 'rgba(248,113,113,0.08)', emoji: '💀' },
};

export default function HomeScreen() {
  const startGame = useGameStore(s => s.startGame);
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="text-7xl mb-4"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          🧪
        </motion.div>
        <h1
          className="text-4xl font-black tracking-tight mb-2"
          style={{
            background: 'linear-gradient(135deg, #c084fc, #60a5fa, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Magic Sort
        </h1>
        <p className="text-sm tracking-widest uppercase" style={{ color: '#4b5563' }}>
          Color Puzzle
        </p>
      </motion.div>

      {/* Difficulty buttons */}
      <div className="w-full max-w-xs flex flex-col gap-4">
        {difficulties.map((diff, i) => {
          const config = DIFFICULTY_CONFIGS[diff];
          const style = DIFF_STYLES[diff];
          return (
            <motion.button
              key={diff}
              onClick={() => startGame(diff)}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl text-left"
              style={{
                background: style.bg,
                border: `1.5px solid ${style.border}`,
              }}
            >
              <span className="text-2xl">{style.emoji}</span>
              <div>
                <div className="font-bold text-base capitalize" style={{ color: style.color }}>
                  {diff}
                </div>
                <div className="text-xs" style={{ color: '#6b7280' }}>
                  {config.colors} colors · {config.totalTubes} tubes
                  {config.moveLimit ? ` · ${config.moveLimit} moves max` : ' · No move limit'}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
