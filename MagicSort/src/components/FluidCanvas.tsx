import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLOR_SOLID, TUBE_CAPACITY } from '../types';
import type { Color } from '../types';
import { BLOB_RADIUS, THRESHOLD } from '../utils/fluidGeometry';
import { TILT_DEG, TILT_DELAY, EMIT_DUR, LIFT_PX } from '../utils/pourConstants';

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function renderTubeSlots(
  ctx:       CanvasRenderingContext2D,
  tube:      Color[],
  rect:      DOMRect,
  time:      number,
  waveBoost: number,
) {
  if (tube.length === 0) return;
  const tubeH  = rect.bottom - rect.top;
  const slotH  = tubeH / TUBE_CAPACITY;
  const margin = 3;
  const left   = rect.left   + margin;
  const right  = rect.right  - margin;
  const width  = right - left;

  ctx.save();
  ctx.beginPath();
  ctx.rect(left, rect.top, width, tubeH);
  ctx.clip();

  const baseAmp = 2 + waveBoost;

  for (let slotIdx = 0; slotIdx < tube.length; slotIdx++) {
    const color      = tube[slotIdx];
    const slotBottom = rect.bottom - slotIdx * slotH;
    const slotTop    = slotBottom - slotH;
    const isTopSlot  = slotIdx === tube.length - 1;
    const amp        = isTopSlot ? baseAmp : 1;

    ctx.beginPath();
    ctx.moveTo(left, slotBottom);
    ctx.lineTo(right, slotBottom);

    const steps = 32;
    for (let s = steps; s >= 0; s--) {
      const x  = left + (s / steps) * width;
      const p1 = (x / width) * Math.PI * 4 + time * 1.8 + slotIdx * 1.3;
      const p2 = (x / width) * Math.PI * 7 + time * 2.5 + slotIdx * 0.9;
      const y  = slotTop + amp * Math.sin(p1) + amp * 0.35 * Math.sin(p2);
      ctx.lineTo(x, y);
    }

    ctx.closePath();
    const [r, g, b] = hexToRgb(COLOR_SOLID[color]);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.92)`;
    ctx.fill();
  }

  ctx.restore();
}

interface StreamParticle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  done: boolean;
}

const GRAVITY = 800;

export interface FluidCanvasHandle {
  jiggle: (tubeIdx: number) => void;
}

interface Props {
  tubeRefs:   React.RefObject<(HTMLDivElement | null)[]>;
  tubeCount:  number;
  tubeHeight: number;
}

const FluidCanvas = forwardRef<FluidCanvasHandle, Props>(
  function FluidCanvas({ tubeRefs, tubeCount, tubeHeight }, ref) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const streamCanvas = useRef<HTMLCanvasElement | null>(null);
  const waveBoosts   = useRef<number[]>([]);
  const tubesRef     = useRef<Color[][]>([]);

  const tubes        = useGameStore(s => s.tubes);
  const completePour = useGameStore(s => s.completePour);

  useEffect(() => { tubesRef.current = tubes; }, [tubes]);

  const jiggle = (tubeIdx: number) => {
    waveBoosts.current[tubeIdx] = 8;
  };

  useImperativeHandle(ref, () => ({ jiggle }), []);

  // canvas init
  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr    = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    streamCanvas.current = document.createElement('canvas');
    streamCanvas.current.width  = window.innerWidth;
    streamCanvas.current.height = window.innerHeight;
  }, []);

  // main render loop
  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr    = window.devicePixelRatio || 1;
    const ctx    = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let pourActive    = false;
    let totalElapsed  = 0;
    let emitElapsed   = 0;
    let emitted       = 0;
    let pourComplete  = false;
    let streamParticles: StreamParticle[] = [];

    let pourSnapshot: {
      fromIdx:  number;
      toIdx:    number;
      color:    Color;
      count:    number;
      pivotX:   number;
      pivotY:   number;
      H:        number;
      destY:    number;
      emitRate: number;
    } | null = null;

    const H = tubeHeight + 14;
    const easeIn = (t: number) => t * t;
    const MAX_TILT = TILT_DEG * (Math.PI / 180);
    const TOTAL_DUR = TILT_DELAY + EMIT_DUR + 0.6;

    function rimAt(emitT: number, pivotX: number, pivotY: number): { x: number; y: number } {
      const tiltT   = easeIn(Math.min(emitT / EMIT_DUR, 1));
      const tiltRad = tiltT * MAX_TILT;
      return { x: pivotX, y: pivotY - H * Math.cos(tiltRad) };
    }

    let latestPendingPour = useGameStore.getState().pendingPour;

    function syncPourSnapshot() {
      if (!latestPendingPour) { pourSnapshot = null; return; }
      if (pourSnapshot &&
          pourSnapshot.fromIdx === latestPendingPour.fromIdx &&
          pourSnapshot.toIdx   === latestPendingPour.toIdx   &&
          pourSnapshot.color   === latestPendingPour.color) return;

      const refs   = tubeRefs.current ?? [];
      const fromEl = refs[latestPendingPour.fromIdx];
      const toEl   = refs[latestPendingPour.toIdx];
      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect   = toEl.getBoundingClientRect();

      const pivotX = (fromRect.left + fromRect.right) / 2;
      const pivotY = fromRect.bottom - LIFT_PX;
      const destY  = toRect.top;

      const total = Math.max(40, latestPendingPour.count * 30);

      pourSnapshot = {
        fromIdx:  latestPendingPour.fromIdx,
        toIdx:    latestPendingPour.toIdx,
        color:    latestPendingPour.color,
        count:    latestPendingPour.count,
        pivotX,
        pivotY,
        H,
        destY,
        emitRate: total / EMIT_DUR,
      };
      pourActive   = true;
      totalElapsed = 0;
      emitElapsed  = 0;
      emitted      = 0;
      pourComplete = false;
      streamParticles = [];
    }

    let lastTs = performance.now();
    let rafId: number;
    let time = 0;

    function loop(ts: number) {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      time  += dt;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (latestPendingPour && !pourSnapshot) syncPourSnapshot();

      const refs    = tubeRefs.current ?? [];
      const currentTubes = tubesRef.current;
      const skipIdx = pourActive && pourSnapshot ? pourSnapshot.fromIdx : -1;

      for (let i = 0; i < currentTubes.length; i++) {
        if (i === skipIdx) continue;
        const el = refs[i];
        if (!el) continue;
        const rect  = el.getBoundingClientRect();
        const boost = waveBoosts.current[i] ?? 0;
        renderTubeSlots(ctx, currentTubes[i], rect, time, boost);
        if (boost > 0) {
          waveBoosts.current[i] = Math.max(0, boost - dt * 12);
        }
      }

      if (pourActive && pourSnapshot) {
        const ps = pourSnapshot;
        totalElapsed += dt;

        if (totalElapsed >= TILT_DELAY) {
          emitElapsed += dt;

          const rim    = rimAt(emitElapsed, ps.pivotX, ps.pivotY);
          const target = Math.min(Math.max(40, ps.count * 30), Math.round(emitElapsed * ps.emitRate));
          while (emitted < target) {
            streamParticles.push({
              x:  rim.x + (Math.random() - 0.5) * 6,
              y:  rim.y,
              vx: (Math.random() - 0.5) * 15,
              vy: 80 + Math.random() * 40,
              r:  3 + Math.random() * 3,
              done: false,
            });
            emitted++;
          }
        }

        let alive = 0;
        const livePositions: { x: number; y: number }[] = [];

        for (const p of streamParticles) {
          if (p.done) continue;
          p.vy += GRAVITY * dt;
          p.x  += p.vx * dt;
          p.y  += p.vy * dt;
          if (p.y >= ps.destY) { p.done = true; continue; }
          alive++;
          livePositions.push({ x: p.x, y: p.y });
        }

        if (livePositions.length > 0) {
          renderStreamMetaballs(ctx, streamCanvas.current!, ps.color, livePositions);
        }

        if (totalElapsed >= TOTAL_DUR && alive === 0 && !pourComplete) {
          pourComplete = true;
          pourActive   = false;
          pourSnapshot = null;
          completePour();
        }
      }

      rafId = requestAnimationFrame(loop);
    }

    const unsubscribe = useGameStore.subscribe(state => {
      latestPendingPour = state.pendingPour;
      if (!state.pendingPour) {
        pourActive      = false;
        pourSnapshot    = null;
        streamParticles = [];
      }
    });

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tubeRefs, tubeHeight, completePour]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}
    />
  );
  }
);

export default FluidCanvas;

function renderStreamMetaballs(
  ctx:       CanvasRenderingContext2D,
  offScreen: HTMLCanvasElement,
  color:     Color,
  positions: { x: number; y: number }[],
) {
  const W = ctx.canvas.width  / (window.devicePixelRatio || 1);
  const H = ctx.canvas.height / (window.devicePixelRatio || 1);

  if (offScreen.width < W || offScreen.height < H) {
    offScreen.width  = Math.max(offScreen.width,  W);
    offScreen.height = Math.max(offScreen.height, H);
  }
  const oc = offScreen.getContext('2d')!;
  oc.clearRect(0, 0, W, H);

  for (const p of positions) {
    const g = oc.createRadialGradient(p.x, p.y, 0, p.x, p.y, BLOB_RADIUS * 2.0);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    oc.fillStyle = g;
    oc.beginPath();
    oc.arc(p.x, p.y, BLOB_RADIUS * 2.0, 0, Math.PI * 2);
    oc.fill();
  }

  const imgData = oc.getImageData(0, 0, W, H);
  const d = imgData.data;
  const [r, g2, b] = hexToRgb(COLOR_SOLID[color]);
  for (let j = 0; j < d.length; j += 4) {
    if (d[j] > THRESHOLD) {
      d[j] = r; d[j + 1] = g2; d[j + 2] = b; d[j + 3] = 215;
    } else {
      d[j + 3] = 0;
    }
  }
  oc.putImageData(imgData, 0, 0);
  ctx.drawImage(offScreen, 0, 0);
}
