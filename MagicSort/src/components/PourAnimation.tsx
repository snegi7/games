import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { COLOR_SOLID } from '../types';
import type { Color } from '../types';

const DROPS = 9;
const STAGGER = 0.06;    // seconds between drops
const DROP_DUR = 0.38;   // seconds per drop to fall
const TILT_WAIT = 0.35;  // wait for tube to travel + tilt before first drop
export const LIFT_PX = 70; // must match Tube's lift

interface PourAnimProps {
  fromY: number;   // original source tube top (pre-animation)
  toX: number;     // destination tube center x
  toY: number;     // destination tube top
  color: Color;
  onComplete: () => void;
}

export default function PourAnimation({ fromY, toX, toY, color, onComplete }: PourAnimProps) {
  useEffect(() => {
    const totalMs = (TILT_WAIT + (DROPS - 1) * STAGGER + DROP_DUR) * 1000 + 100;
    const t = setTimeout(onComplete, totalMs);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Tube has moved to toX and lifted by LIFT_PX — drops fall from there straight down
  const startX = toX;
  const startY = fromY - LIFT_PX;
  const dy = toY - startY;

  return (
    <>
      {Array.from({ length: DROPS }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: startX - 5,
            top: startY,
            width: 10,
            height: 14,
            borderRadius: '40% 40% 60% 60%',
            background: COLOR_SOLID[color],
            boxShadow: `0 0 8px ${COLOR_SOLID[color]}bb`,
            pointerEvents: 'none',
            zIndex: 50,
          }}
          initial={{ y: 0, opacity: 0, scaleY: 0.5 }}
          animate={{
            y: dy,
            opacity: [0, 1, 1, 0],
            scaleY: [0.5, 1.6, 1.2, 0.8],
          }}
          transition={{
            delay: TILT_WAIT + i * STAGGER,
            duration: DROP_DUR,
            y: { ease: 'easeIn' },
            opacity: { ease: 'linear', times: [0, 0.08, 0.75, 1] },
            scaleY: { ease: 'easeOut', times: [0, 0.1, 0.5, 1] },
          }}
        />
      ))}
    </>
  );
}
