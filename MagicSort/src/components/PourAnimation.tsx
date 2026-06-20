import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { COLOR_SOLID } from '../types';
import type { Color } from '../types';

const DROPS = 8;
const STAGGER = 0.07;    // seconds between drops
const DROP_DUR = 0.42;   // seconds per drop
const TILT_WAIT = 0.22;  // wait for tube to tilt before first drop

interface PourAnimProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: Color;
  tubeHeight: number;
  pourToRight: boolean;
  onComplete: () => void;
}

export default function PourAnimation({
  fromX, fromY, toX, toY,
  color, tubeHeight, pourToRight, onComplete,
}: PourAnimProps) {
  useEffect(() => {
    const totalMs = (TILT_WAIT + (DROPS - 1) * STAGGER + DROP_DUR) * 1000 + 80;
    const t = setTimeout(onComplete, totalMs);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Approximate where the rim ends up after tilt (tube pivots from its bottom)
  const liftPx = 28;
  const tiltDeg = 28 * (Math.PI / 180);
  const H = tubeHeight + 14;
  const rimX = fromX + (pourToRight ? 1 : -1) * H * Math.sin(tiltDeg);
  const rimY = fromY - liftPx - H * (1 - Math.cos(tiltDeg));

  const dx = toX - rimX;
  const dy = toY - rimY;

  return (
    <>
      {Array.from({ length: DROPS }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: rimX - 5,
            top: rimY - 6,
            width: 10,
            height: 14,
            borderRadius: '40% 40% 60% 60%',
            background: COLOR_SOLID[color],
            boxShadow: `0 0 8px ${COLOR_SOLID[color]}bb`,
            pointerEvents: 'none',
            zIndex: 50,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scaleY: 0.4 }}
          animate={{
            x: dx,
            y: dy,
            opacity: [0, 1, 1, 0],
            scaleY: [0.4, 1.5, 1.2, 0.9],
          }}
          transition={{
            delay: TILT_WAIT + i * STAGGER,
            duration: DROP_DUR,
            x: { ease: 'linear' },
            y: { ease: 'easeIn' },
            opacity: { ease: 'linear', times: [0, 0.08, 0.75, 1] },
            scaleY: { ease: 'easeOut', times: [0, 0.1, 0.5, 1] },
          }}
        />
      ))}
    </>
  );
}
