import { useEffect, useRef } from 'react';
import { COLOR_SOLID } from '../types';
import type { Color } from '../types';

export const LIFT_PX = 80;

const GRAVITY    = 2200;   // px/s²
const TILT_DELAY = 0.32;   // seconds before first drop (tube is traveling)

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  done: boolean;
}

interface Props {
  emitX:  number;   // viewport x — center of dest tube (source tube moved here)
  emitY:  number;   // viewport y — tube opening after lift
  destY:  number;   // viewport y — top of destination tube glass body
  color:  Color;
  count:  number;   // color units being poured (1–4)
  onComplete: () => void;
}

export default function PourAnimation({ emitX, emitY, destY, color, count, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    // Match device pixels exactly so particles are crisp
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const total     = Math.max(35, count * 28);
    const emitDur   = 0.95;                  // seconds to emit all drops
    const emitRate  = total / emitDur;

    const particles: Particle[] = [];
    let emitted     = 0;
    let emitElapsed = 0;
    let tiltElapsed = 0;
    let rafId: number;
    let lastTs      = performance.now();

    const hex = COLOR_SOLID[color];

    function loop(ts: number) {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Wait for tube to travel and tilt before emitting
      if (tiltElapsed < TILT_DELAY) {
        tiltElapsed += dt;
        rafId = requestAnimationFrame(loop);
        return;
      }

      // Emit drops gradually
      emitElapsed += dt;
      const target = Math.min(total, Math.round(emitElapsed * emitRate));
      while (emitted < target) {
        particles.push({
          x:  emitX + (Math.random() - 0.5) * 14,
          y:  emitY,
          vx: (Math.random() - 0.5) * 120,
          vy: 30 + Math.random() * 80,
          r:  3 + Math.random() * 3,
          done: false,
        });
        emitted++;
      }

      // Physics update + draw
      let alive = 0;
      ctx.shadowColor = hex;
      ctx.shadowBlur  = 10;

      for (const p of particles) {
        if (p.done) continue;

        p.vy += GRAVITY * dt;
        p.x  += p.vx * dt;
        p.y  += p.vy * dt;

        if (p.y >= destY) { p.done = true; continue; }

        alive++;

        // Stretch drop in direction of travel (teardrop at speed)
        const speed   = Math.hypot(p.vx, p.vy);
        const stretch = Math.min(3.2, 1 + speed / 480);
        const angle   = Math.atan2(p.vy, p.vx);

        ctx.save();
        ctx.globalAlpha = 0.92;
        ctx.fillStyle   = hex;
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r / stretch, p.r * stretch, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (emitted >= total && alive === 0) {
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
