import { useEffect, useRef } from 'react';
import { COLOR_SOLID } from '../types';
import type { Color } from '../types';

import { LIFT_PX, TILT_DEG, TILT_DELAY, EMIT_DUR } from '../utils/pourConstants';
// Keep them as re-exports so Tube.tsx's existing import doesn't break yet:
export { LIFT_PX, TILT_DEG, TILT_DELAY, EMIT_DUR };

const GRAVITY   = 2200;
const MAX_TILT  = TILT_DEG * (Math.PI / 180);
const easeIn    = (t: number) => t * t;          // matches Framer Motion 'easeIn'

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  done: boolean;
}

interface Props {
  pivotX:     number;   // viewport x — dest tube center x (rim stays here throughout)
  pivotY:     number;   // viewport y — tube bottom-center after lift
  H:          number;   // tube outer height (tubeHeight + 14)
  destY:      number;   // viewport y — top of destination tube (absorption line)
  color:      Color;
  count:      number;   // color units being poured (1–4)
  onComplete: () => void;
}

export default function PourAnimation({
  pivotX, pivotY, H, destY, color, count, onComplete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const total    = Math.max(40, count * 30);
    const emitRate = total / EMIT_DUR;
    const hex      = COLOR_SOLID[color];

    // How long until we expect all particles to have been emitted AND fallen
    const TOTAL_DUR = TILT_DELAY + EMIT_DUR + 0.6;

    const particles: Particle[] = [];
    let totalElapsed = 0;
    let emitElapsed  = 0;
    let emitted      = 0;
    let rafId: number;
    let lastTs = performance.now();

    // Current rim position — x is always pivotX (= destCenterX) since TubeBoard's
    // keyframe animation compensates the tube's x translation to cancel out the
    // sin(θ) drift. Canvas just drops particles straight down from destCenterX.
    function rimAt(emitT: number): { x: number; y: number } {
      const tiltT   = easeIn(Math.min(emitT / EMIT_DUR, 1));
      const tiltRad = tiltT * MAX_TILT;
      return {
        x: pivotX,
        y: pivotY - H * Math.cos(tiltRad),
      };
    }

    function loop(ts: number) {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      totalElapsed += dt;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Wait for tube to travel before emitting
      if (totalElapsed >= TILT_DELAY) {
        emitElapsed += dt;
        const rim    = rimAt(emitElapsed);
        const target = Math.min(total, Math.round(emitElapsed * emitRate));

        while (emitted < target) {
          particles.push({
            x:  rim.x + (Math.random() - 0.5) * 12,
            y:  rim.y,
            vx: (Math.random() - 0.5) * 90,
            vy: 20 + Math.random() * 80,
            r:  3 + Math.random() * 3.5,
            done: false,
          });
          emitted++;
        }
      }

      // Physics + draw
      let alive = 0;
      ctx.shadowColor = hex;
      ctx.shadowBlur  = 12;

      for (const p of particles) {
        if (p.done) continue;
        p.vy += GRAVITY * dt;
        p.x  += p.vx   * dt;
        p.y  += p.vy   * dt;
        if (p.y >= destY) { p.done = true; continue; }

        alive++;
        const speed   = Math.hypot(p.vx, p.vy);
        const stretch = Math.min(3.5, 1 + speed / 450);
        const angle   = Math.atan2(p.vy, p.vx);

        ctx.save();
        ctx.globalAlpha = 0.93;
        ctx.fillStyle   = hex;
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r / stretch, p.r * stretch, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (totalElapsed >= TOTAL_DUR && alive === 0) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        onComplete();
        return;
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200 }}
    />
  );
}
