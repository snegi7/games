import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import Matter from 'matter-js';
import { useGameStore } from '../store/gameStore';
import { useMatterWorld } from '../hooks/useMatterWorld';
import { COLOR_SOLID } from '../types';
import type { Color } from '../types';
import { BLOB_RADIUS, THRESHOLD, PARTICLES_PER_SLOT } from '../utils/fluidGeometry';
import { TILT_DELAY, EMIT_DUR, LIFT_PX } from '../utils/pourConstants';

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function renderTubeFluid(
  ctx:       CanvasRenderingContext2D,
  offCanvas: HTMLCanvasElement,
  particles: Matter.Body[],
  tubeRect:  DOMRect,
) {
  const w = Math.ceil(tubeRect.width);
  const h = Math.ceil(tubeRect.height);
  if (w <= 0 || h <= 0) return;

  if (offCanvas.width < w || offCanvas.height < h) {
    offCanvas.width  = Math.max(offCanvas.width,  w);
    offCanvas.height = Math.max(offCanvas.height, h);
  }
  const offCtx = offCanvas.getContext('2d')!;

  // Group particles by color in tube-local coords
  const byColor = new Map<Color, { x: number; y: number }[]>();
  for (const body of particles) {
    const color = body.label as Color;
    const lx = body.position.x - tubeRect.left;
    const ly = body.position.y - tubeRect.top;
    if (!byColor.has(color)) byColor.set(color, []);
    byColor.get(color)!.push({ x: lx, y: ly });
  }

  for (const [color, positions] of byColor) {
    // ROI bounds
    let rxMin = w, ryMin = h, rxMax = 0, ryMax = 0;
    for (const p of positions) {
      rxMin = Math.min(rxMin, p.x - BLOB_RADIUS);
      ryMin = Math.min(ryMin, p.y - BLOB_RADIUS);
      rxMax = Math.max(rxMax, p.x + BLOB_RADIUS);
      ryMax = Math.max(ryMax, p.y + BLOB_RADIUS);
    }
    rxMin = Math.max(0, Math.floor(rxMin));
    ryMin = Math.max(0, Math.floor(ryMin));
    rxMax = Math.min(w, Math.ceil(rxMax));
    ryMax = Math.min(h, Math.ceil(ryMax));
    const roiW = rxMax - rxMin;
    const roiH = ryMax - ryMin;
    if (roiW <= 0 || roiH <= 0) continue;

    offCtx.clearRect(rxMin, ryMin, roiW, roiH);

    for (const p of positions) {
      const g = offCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, BLOB_RADIUS);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      offCtx.fillStyle = g;
      offCtx.beginPath();
      offCtx.arc(p.x, p.y, BLOB_RADIUS, 0, Math.PI * 2);
      offCtx.fill();
    }

    const imgData = offCtx.getImageData(rxMin, ryMin, roiW, roiH);
    const d       = imgData.data;
    const [r, g2, b] = hexToRgb(COLOR_SOLID[color]);
    for (let j = 0; j < d.length; j += 4) {
      if (d[j] > THRESHOLD) {
        d[j] = r; d[j + 1] = g2; d[j + 2] = b; d[j + 3] = 215;
      } else {
        d[j + 3] = 0;
      }
    }
    offCtx.putImageData(imgData, rxMin, ryMin);

    ctx.drawImage(
      offCanvas,
      rxMin, ryMin, roiW, roiH,
      tubeRect.left + rxMin, tubeRect.top + ryMin, roiW, roiH,
    );
  }
}

interface StreamParticle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  done: boolean;
}

const GRAVITY = 2200;

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
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const offCanvas   = useRef<HTMLCanvasElement | null>(null);
  const streamCanvas = useRef<HTMLCanvasElement | null>(null);

  const tubes        = useGameStore(s => s.tubes);
  const completePour = useGameStore(s => s.completePour);

  const { physicsRef, reconcile, stepAll, jiggle, drainParticles } = useMatterWorld(tubeCount);

  useImperativeHandle(ref, () => ({ jiggle }), [jiggle]);

  // canvas init
  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr    = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    offCanvas.current = document.createElement('canvas');
    offCanvas.current.width  = 120;
    offCanvas.current.height = 240;
    streamCanvas.current = document.createElement('canvas');
    streamCanvas.current.width  = window.innerWidth;
    streamCanvas.current.height = window.innerHeight;
  }, []);

  // reconcile when tubes state changes
  useEffect(() => {
    if (tubes.length === 0) return;
    const id = requestAnimationFrame(() => {
      const rects = (tubeRefs.current ?? []).map(el => el?.getBoundingClientRect() ?? null);
      reconcile(tubes, rects);
    });
    return () => cancelAnimationFrame(id);
  }, [tubes, reconcile, tubeRefs]);

  // main render + physics loop
  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr    = window.devicePixelRatio || 1;
    const ctx    = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let pourActive    = false;
    let totalElapsed  = 0;
    let emitElapsed   = 0;
    let emitted       = 0;
    let drained       = 0;
    let pourComplete  = false;
    let streamParticles: StreamParticle[] = [];

    let pourSnapshot: {
      fromIdx:      number;
      toIdx:        number;
      color:        Color;
      count:        number;
      pivotX:       number;
      pivotY:       number;
      H:            number;
      destY:        number;
      emitRate:     number;
      totalToDrain: number;
    } | null = null;

    const H = tubeHeight + 14;
    const easeIn = (t: number) => t * t;
    const MAX_TILT = 42 * (Math.PI / 180);
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
        fromIdx:      latestPendingPour.fromIdx,
        toIdx:        latestPendingPour.toIdx,
        color:        latestPendingPour.color,
        count:        latestPendingPour.count,
        pivotX,
        pivotY,
        H,
        destY,
        emitRate:     total / EMIT_DUR,
        totalToDrain: latestPendingPour.count * PARTICLES_PER_SLOT,
      };
      pourActive   = true;
      totalElapsed = 0;
      emitElapsed  = 0;
      emitted      = 0;
      drained      = 0;
      pourComplete = false;
      streamParticles = [];
    }

    let lastTs = performance.now();
    let rafId: number;

    function loop(ts: number) {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (latestPendingPour && !pourSnapshot) syncPourSnapshot();

      stepAll(dt * 1000);

      const refs    = tubeRefs.current ?? [];
      const physics = physicsRef.current;
      const skipIdx = pourActive && pourSnapshot ? pourSnapshot.fromIdx : -1;

      for (let i = 0; i < physics.length; i++) {
        if (i === skipIdx) continue;
        const el = refs[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        renderTubeFluid(ctx, offCanvas.current!, physics[i].particles, rect);
      }

      if (pourActive && pourSnapshot) {
        const ps = pourSnapshot;
        totalElapsed += dt;

        if (totalElapsed >= TILT_DELAY) {
          emitElapsed += dt;

          const drainTarget = Math.min(
            ps.totalToDrain,
            Math.round((emitElapsed / EMIT_DUR) * ps.totalToDrain),
          );
          if (drainTarget > drained) {
            drainParticles(ps.fromIdx, ps.color, drainTarget - drained);
            drained = drainTarget;
          }

          const rim    = rimAt(emitElapsed, ps.pivotX, ps.pivotY);
          const target = Math.min(Math.max(40, ps.count * 30), Math.round(emitElapsed * ps.emitRate));
          while (emitted < target) {
            streamParticles.push({
              x:  rim.x + (Math.random() - 0.5) * 10,
              y:  rim.y,
              vx: (Math.random() - 0.5) * 80,
              vy: 20 + Math.random() * 60,
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
  }, [physicsRef, stepAll, drainParticles, tubeRefs, tubeHeight]);

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
    const g = oc.createRadialGradient(p.x, p.y, 0, p.x, p.y, BLOB_RADIUS * 1.2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    oc.fillStyle = g;
    oc.beginPath();
    oc.arc(p.x, p.y, BLOB_RADIUS * 1.2, 0, Math.PI * 2);
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
