import { motion } from 'framer-motion';
import { COLOR_SOLID } from '../types';
import type { Color } from '../types';

interface PourAnimProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: Color;
  onComplete: () => void;
}

export default function PourAnimation({ fromX, fromY, toX, toY, color, onComplete }: PourAnimProps) {
  const midX = (fromX + toX) / 2;
  const midY = Math.min(fromY, toY) - 60;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: fromX - 10,
        top: fromY - 10,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: COLOR_SOLID[color],
        boxShadow: `0 0 12px ${COLOR_SOLID[color]}, 0 0 24px ${COLOR_SOLID[color]}80`,
        pointerEvents: 'none',
        zIndex: 50,
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        x: [0, midX - fromX, toX - fromX],
        y: [0, midY - fromY, toY - fromY],
        scale: [1, 1.3, 0.8],
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
    />
  );
}
