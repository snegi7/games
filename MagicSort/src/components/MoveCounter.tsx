import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function MoveCounter() {
  const moveCount = useGameStore(s => s.moveCount);
  const moveLimit = useGameStore(s => s.moveLimit);

  if (moveLimit === null) return null;

  const remaining = moveLimit - moveCount;
  const isLow = remaining <= 10;
  const isCritical = remaining <= 5;

  return (
    <motion.div
      className="flex flex-col items-center px-3 py-1.5 rounded-xl border"
      style={{
        background: isCritical
          ? 'rgba(248,113,113,0.18)'
          : isLow
          ? 'rgba(250,204,21,0.12)'
          : 'rgba(255,255,255,0.06)',
        borderColor: isCritical
          ? 'rgba(248,113,113,0.5)'
          : isLow
          ? 'rgba(250,204,21,0.4)'
          : 'rgba(255,255,255,0.12)',
      }}
      animate={{ scale: [1, 1.08, 1] }}
      key={moveCount}
      transition={{ duration: 0.25 }}
    >
      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#6b7280', fontSize: 9 }}>
        Moves Left
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={remaining}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="font-bold text-lg leading-none"
          style={{
            color: isCritical ? '#f87171' : isLow ? '#facc15' : '#e2e8f0',
          }}
        >
          {remaining}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
