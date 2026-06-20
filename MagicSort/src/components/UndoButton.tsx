import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function UndoButton() {
  const undo = useGameStore(s => s.undo);
  const history = useGameStore(s => s.history);
  const isPouring = useGameStore(s => s.isPouring);
  const disabled = history.length === 0 || isPouring;

  return (
    <motion.button
      onClick={undo}
      disabled={disabled}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-semibold transition-opacity"
      style={{
        background: 'rgba(255,255,255,0.06)',
        borderColor: 'rgba(255,255,255,0.12)',
        color: disabled ? '#374151' : '#94a3b8',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
      }}
      whileTap={disabled ? {} : { scale: 0.94 }}
    >
      <span style={{ fontSize: 16 }}>↩</span>
      <span style={{ fontSize: 12 }}>Undo</span>
    </motion.button>
  );
}
