import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { Color } from '../types';
import { COLOR_GRADIENTS, TUBE_CAPACITY } from '../types';
import { isTubeSorted } from '../utils/winChecker';
import { LIFT_PX, TILT_DEG, EMIT_DUR, TILT_DELAY } from './PourAnimation';

interface TubeProps {
  tube: Color[];
  index: number;
  isSelected: boolean;
  onClick: () => void;
  tubeWidth: number;
  tubeHeight: number;
  isPouringFrom?: boolean;
  pourToRight?: boolean;
  pourOffsetX?: number;
  incomingColor?: Color;
  incomingCount?: number;
}

const Tube = forwardRef<HTMLDivElement, TubeProps>(
  ({ tube, index, isSelected, onClick, tubeWidth, tubeHeight, isPouringFrom, pourToRight, pourOffsetX, incomingColor, incomingCount }, ref) => {
    const sorted = isTubeSorted(tube, TUBE_CAPACITY);
    const empty = tube.length === 0;

    // Two-phase pour animation:
    //   Phase 1 (0 → TILT_DELAY): slide center-to-center, lift — spring-like (easeOut)
    //   Phase 2 (TILT_DELAY → end): x slides back by H·sinT·dir, rotate tilts — both easeIn
    // This keeps the rim approximately above destCenterX throughout the tilt.
    const H      = tubeHeight + 14;
    const sinT   = Math.sin(TILT_DEG * Math.PI / 180);
    const dirVal = (pourToRight ?? false) ? 1 : -1;
    const cx     = pourOffsetX ?? 0;
    const fx     = cx - H * sinT * dirVal;
    const dur    = TILT_DELAY + EMIT_DUR;
    const t1     = TILT_DELAY / dur;

    const filterVal = isSelected
      ? 'drop-shadow(0 0 12px rgba(192,132,252,0.9))'
      : sorted
      ? 'drop-shadow(0 0 10px rgba(74,222,128,0.7))'
      : 'drop-shadow(0 0 0px transparent)';

    return (
      <motion.div
        className="relative flex flex-col items-center cursor-pointer select-none"
        style={{
          width: tubeWidth,
          height: tubeHeight + 14,
          transformOrigin: 'center bottom',
          zIndex: isPouringFrom ? 100 : undefined,
        }}
        animate={isPouringFrom ? {
          x:      [0, cx, fx],
          y:      -LIFT_PX,
          rotate: [0, 0, pourToRight ? TILT_DEG : -TILT_DEG],
          filter: filterVal,
        } : {
          x: 0,
          y: isSelected ? -10 : 0,
          rotate: 0,
          filter: filterVal,
        }}
        transition={isPouringFrom ? {
          x:      { duration: dur, times: [0, t1, 1], ease: ['easeOut', 'easeIn'] },
          y:      { type: 'spring', stiffness: 200, damping: 22 },
          rotate: { duration: dur, times: [0, t1, 1], ease: ['linear', 'easeIn'] },
          filter: { duration: 0 },
        } : { type: 'spring', stiffness: 200, damping: 22 }}
        whileTap={{ scale: 0.96 }}
        role="button"
        aria-label={`Tube ${index + 1}`}
        onClick={onClick}
      >
        {/* Metallic rim */}
        <div
          style={{
            width: 'calc(100% + 6px)',
            height: 14,
            background: 'linear-gradient(180deg, rgba(220,220,255,0.65) 0%, rgba(140,140,190,0.35) 100%)',
            border: '1.5px solid rgba(255,255,255,0.38)',
            borderBottom: 'none',
            borderRadius: '5px 5px 0 0',
            boxShadow: '0 -3px 8px rgba(0,0,0,0.22), inset 0 2px 3px rgba(255,255,255,0.35)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Rim highlight */}
          <div
            style={{
              position: 'absolute',
              top: 3,
              left: 6,
              right: 6,
              height: 2,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Glass body */}
        <div
          ref={ref}
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column-reverse', // index 0 = visual bottom
            borderRadius: '0 0 50% 50% / 0 0 20px 20px',
            overflow: 'hidden',
            background: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.07) 100%)',
            border: `1.5px solid ${
              sorted
                ? 'rgba(74,222,128,0.6)'
                : isSelected
                ? 'rgba(192,132,252,0.7)'
                : 'rgba(255,255,255,0.18)'
            }`,
            borderTop: 'none',
            boxShadow: `inset 2px 0 6px rgba(255,255,255,0.12), inset -2px 0 6px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.32)${
              sorted ? ', 0 0 0 1px rgba(74,222,128,0.4)' : ''
            }${isSelected ? ', 0 0 0 1px rgba(192,132,252,0.5)' : ''}`,
            position: 'relative',
          }}
        >
          {/* Left-edge light reflection */}
          <div
            style={{
              position: 'absolute',
              top: 6,
              left: 6,
              width: 5,
              height: '65%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.45), transparent)',
              borderRadius: 3,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Color segments (bottom → top order via column-reverse) */}
          {tube.map((color, i) => (
            <motion.div
              key={`${i}-${color}`}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.22, ease: 'easeOut', delay: i * 0.03 }}
              style={{
                flex: `0 0 ${100 / TUBE_CAPACITY}%`,
                background: COLOR_GRADIENTS[color],
                position: 'relative',
              }}
            >
              {/* Sheen line between segments */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '18%',
                  right: 0,
                  height: 2,
                  background: 'rgba(255,255,255,0.22)',
                  borderRadius: '0 1px 1px 0',
                }}
              />
            </motion.div>
          ))}

          {/* Incoming liquid — rises from top of existing content during pour */}
          {incomingColor !== undefined && incomingCount !== undefined && (
            <motion.div
              style={{
                position: 'absolute',
                bottom: `${(tube.length / TUBE_CAPACITY) * 100}%`,
                left: 0, right: 0,
                background: COLOR_GRADIENTS[incomingColor],
                zIndex: 1,
              }}
              initial={{ height: 0 }}
              animate={{ height: `${(incomingCount / TUBE_CAPACITY) * 100}%` }}
              transition={{ duration: EMIT_DUR, ease: 'easeIn', delay: TILT_DELAY }}
            />
          )}

          {/* Empty state subtle glow */}
          {empty && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.04), transparent)',
              }}
            />
          )}
        </div>
      </motion.div>
    );
  },
);

Tube.displayName = 'Tube';
export default Tube;
