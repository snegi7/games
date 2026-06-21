# Fluid Physics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace static CSS color segments with always-alive Matter.js fluid particles rendered as metaballs inside the tube glass shells, with a metaball pour stream replacing the existing PourAnimation.

**Architecture:** One Matter.js engine per tube, all stepped in a single `requestAnimationFrame` loop owned by `FluidCanvas`. The existing CSS glass shell stays for borders, rim, and click handling; its interior becomes transparent. A permanent full-screen canvas at z-index 1 renders metaball fluid behind the glass. Pour stream uses adapted PourAnimation particle logic but renders as metaballs.

**Tech Stack:** React 18 + Framer Motion (existing), Matter.js + @types/matter-js (new), Canvas 2D API.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/utils/pourConstants.ts` | Shared LIFT_PX, TILT_DEG, EMIT_DUR, TILT_DELAY |
| Create | `src/utils/fluidGeometry.ts` | Pure geometry: slot positions, spread, metaball ROI |
| Create | `src/hooks/useMatterWorld.ts` | Per-tube engine lifecycle, reconcile, step |
| Create | `src/components/FluidCanvas.tsx` | Permanent canvas: idle metaballs + pour stream |
| Modify | `src/components/Tube.tsx` | Strip color segments; interior transparent |
| Modify | `src/components/TubeBoard.tsx` | Mount FluidCanvas; remove PourAnimation; simplify Tube props |
| Delete | `src/components/PourAnimation.tsx` | Superseded by FluidCanvas |
| Test   | `src/__tests__/fluidGeometry.test.ts` | Unit tests for pure geometry |

---

## Task 1: Install Matter.js and extract pour constants

**Files:**
- Create: `src/utils/pourConstants.ts`
- Modify: `src/components/Tube.tsx` (import path only)
- Modify: `src/components/PourAnimation.tsx` (import path only)

- [ ] **Step 1: Install Matter.js**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm install matter-js @types/matter-js
```

Expected: matter-js and @types/matter-js appear in `package.json` dependencies.

- [ ] **Step 2: Create pourConstants.ts**

Create `src/utils/pourConstants.ts`:

```typescript
export const LIFT_PX    = 140;
export const TILT_DEG   = 42;
export const TILT_DELAY = 0.30;
export const EMIT_DUR   = 0.90;
```

- [ ] **Step 3: Update PourAnimation.tsx to import from pourConstants**

In `src/components/PourAnimation.tsx`, replace lines 5–8:

```typescript
// REMOVE these four lines:
export const LIFT_PX    = 140;
export const TILT_DEG   = 42;
export const TILT_DELAY = 0.30;
export const EMIT_DUR   = 0.90;

// ADD this import instead:
import { LIFT_PX, TILT_DEG, TILT_DELAY, EMIT_DUR } from '../utils/pourConstants';
// Keep them as re-exports so Tube.tsx's existing import doesn't break yet:
export { LIFT_PX, TILT_DEG, TILT_DELAY, EMIT_DUR };
```

- [ ] **Step 4: Build to verify no type errors**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run build 2>&1 | tail -20
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add MagicSort/src/utils/pourConstants.ts MagicSort/src/components/PourAnimation.tsx MagicSort/package.json MagicSort/package-lock.json
git commit -m "feat: install matter-js and extract pour animation constants"
```

---

## Task 2: fluidGeometry.ts — pure geometry utilities (TDD)

**Files:**
- Create: `src/utils/fluidGeometry.ts`
- Create: `src/__tests__/fluidGeometry.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/__tests__/fluidGeometry.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { slotCenterY, spreadXPositions, PARTICLES_PER_SLOT } from '../utils/fluidGeometry';

describe('slotCenterY', () => {
  // rect: top=100, bottom=300, height=200, TUBE_CAPACITY=4 → slotH=50
  const rect = { top: 100, bottom: 300 } as DOMRect;

  it('returns center of bottom slot (index 0)', () => {
    // 300 - 0*50 - 25 = 275
    expect(slotCenterY(rect, 0)).toBe(275);
  });

  it('returns center of second slot (index 1)', () => {
    // 300 - 1*50 - 25 = 225
    expect(slotCenterY(rect, 1)).toBe(225);
  });

  it('returns center of top slot (index 3)', () => {
    // 300 - 3*50 - 25 = 125
    expect(slotCenterY(rect, 3)).toBe(125);
  });
});

describe('spreadXPositions', () => {
  const rect = { left: 10, right: 70 } as DOMRect;
  const margin = 6; // inner bounds: [16, 64]

  it('returns the requested count of positions', () => {
    const result = spreadXPositions(rect, 12, margin);
    expect(result).toHaveLength(12);
  });

  it('keeps all x values within inner bounds', () => {
    const result = spreadXPositions(rect, 50, margin);
    expect(result.every(x => x >= 16 && x <= 64)).toBe(true);
  });
});

describe('PARTICLES_PER_SLOT', () => {
  it('is a positive integer', () => {
    expect(Number.isInteger(PARTICLES_PER_SLOT)).toBe(true);
    expect(PARTICLES_PER_SLOT).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm test -- fluidGeometry 2>&1 | tail -20
```

Expected: FAIL — "Cannot find module '../utils/fluidGeometry'"

- [ ] **Step 3: Implement fluidGeometry.ts**

Create `src/utils/fluidGeometry.ts`:

```typescript
import { TUBE_CAPACITY } from '../types';

export const PARTICLES_PER_SLOT = 12;
export const PARTICLE_RADIUS    = 3;
export const BLOB_RADIUS        = 14;
export const THRESHOLD          = 110;

export function slotCenterY(
  rect: Pick<DOMRect, 'top' | 'bottom'>,
  slotIndex: number,
): number {
  const slotH = (rect.bottom - rect.top) / TUBE_CAPACITY;
  return rect.bottom - slotH * slotIndex - slotH / 2;
}

export function spreadXPositions(
  rect: Pick<DOMRect, 'left' | 'right'>,
  count: number,
  margin: number,
): number[] {
  const innerLeft  = rect.left  + margin;
  const innerRight = rect.right - margin;
  const range      = innerRight - innerLeft;
  return Array.from({ length: count }, () => innerLeft + Math.random() * range);
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm test -- fluidGeometry 2>&1 | tail -20
```

Expected: PASS — all 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add MagicSort/src/utils/fluidGeometry.ts MagicSort/src/__tests__/fluidGeometry.test.ts
git commit -m "feat: add fluidGeometry utilities for particle placement"
```

---

## Task 3: useMatterWorld hook

**Files:**
- Create: `src/hooks/useMatterWorld.ts`

- [ ] **Step 1: Create the hook**

Create `src/hooks/useMatterWorld.ts`:

```typescript
import { useRef, useEffect, useCallback } from 'react';
import Matter from 'matter-js';
import type { Color } from '../types';
import {
  PARTICLES_PER_SLOT,
  PARTICLE_RADIUS,
  slotCenterY,
  spreadXPositions,
} from '../utils/fluidGeometry';

const WALL_T = 6;

export interface TubePhysics {
  engine:     Matter.Engine;
  leftWall:   Matter.Body;
  rightWall:  Matter.Body;
  bottomWall: Matter.Body;
  particles:  Matter.Body[];
}

export function useMatterWorld(tubeCount: number) {
  const physicsRef = useRef<TubePhysics[]>([]);

  useEffect(() => {
    physicsRef.current.forEach(p => Matter.Engine.clear(p.engine));
    physicsRef.current = [];

    for (let i = 0; i < tubeCount; i++) {
      const engine     = Matter.Engine.create();
      const leftWall   = Matter.Bodies.rectangle(0, 0, WALL_T, 400, { isStatic: true, label: 'wall' });
      const rightWall  = Matter.Bodies.rectangle(0, 0, WALL_T, 400, { isStatic: true, label: 'wall' });
      const bottomWall = Matter.Bodies.rectangle(0, 0, 200, WALL_T, { isStatic: true, label: 'wall' });
      Matter.Composite.add(engine.world, [leftWall, rightWall, bottomWall]);
      physicsRef.current.push({ engine, leftWall, rightWall, bottomWall, particles: [] });
    }

    return () => {
      physicsRef.current.forEach(p => Matter.Engine.clear(p.engine));
      physicsRef.current = [];
    };
  }, [tubeCount]);

  const reconcile = useCallback((
    tubes:     Color[][],
    tubeRects: (DOMRect | null)[],
  ) => {
    tubes.forEach((tube, i) => {
      const physics = physicsRef.current[i];
      const rect    = tubeRects[i];
      if (!physics || !rect) return;

      // Sync static wall positions
      const cy = (rect.top  + rect.bottom) / 2;
      const cx = (rect.left + rect.right)  / 2;
      Matter.Body.setPosition(physics.leftWall,   { x: rect.left  - WALL_T / 2, y: cy });
      Matter.Body.setPosition(physics.rightWall,  { x: rect.right + WALL_T / 2, y: cy });
      Matter.Body.setPosition(physics.bottomWall, { x: cx, y: rect.bottom + WALL_T / 2 });

      // Remove old particles (keep static walls)
      Matter.Composite.clear(physics.engine.world, true);
      physics.particles = [];

      // Spawn particles for each occupied slot
      tube.forEach((color, slotIdx) => {
        const py = slotCenterY(rect, slotIdx) - 6; // spawn slightly above to drop in
        const xs = spreadXPositions(rect, PARTICLES_PER_SLOT, PARTICLE_RADIUS + 2);
        xs.forEach(x => {
          const body = Matter.Bodies.circle(x, py, PARTICLE_RADIUS, {
            label:      color,
            restitution: 0.1,
            friction:    0.05,
            frictionAir: 0.08,
          });
          physics.particles.push(body);
          Matter.Composite.add(physics.engine.world, body);
        });
      });
    });
  }, []);

  const stepAll = useCallback((dt: number) => {
    physicsRef.current.forEach(p => Matter.Engine.update(p.engine, dt));
  }, []);

  // Apply brief impulse to all particles in a tube (tap/select feedback)
  const jiggle = useCallback((tubeIdx: number) => {
    const physics = physicsRef.current[tubeIdx];
    if (!physics) return;
    physics.particles.forEach(body => {
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.003,
        y: -0.0008,
      });
    });
  }, []);

  // Remove count particles of the given color from tubeIdx (top ones first)
  const drainParticles = useCallback((tubeIdx: number, color: Color, count: number) => {
    const physics = physicsRef.current[tubeIdx];
    if (!physics) return;
    const targets = physics.particles
      .filter(b => b.label === color)
      .sort((a, b) => a.position.y - b.position.y) // ascending y = highest on screen
      .slice(0, count);
    targets.forEach(body => {
      Matter.Composite.remove(physics.engine.world, body);
      const idx = physics.particles.indexOf(body);
      if (idx !== -1) physics.particles.splice(idx, 1);
    });
  }, []);

  return { physicsRef, reconcile, stepAll, jiggle, drainParticles };
}
```

- [ ] **Step 2: Build to verify no type errors**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run build 2>&1 | tail -20
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add MagicSort/src/hooks/useMatterWorld.ts
git commit -m "feat: add useMatterWorld hook for per-tube Matter.js engine management"
```

---

## Task 4: FluidCanvas component — idle metaball rendering

**Files:**
- Create: `src/components/FluidCanvas.tsx`

- [ ] **Step 1: Create FluidCanvas.tsx**

Create `src/components/FluidCanvas.tsx`:

```typescript
import { useRef, useEffect } from 'react';
import Matter from 'matter-js';
import { useGameStore } from '../store/gameStore';
import { useMatterWorld } from '../hooks/useMatterWorld';
import { COLOR_SOLID, TUBE_CAPACITY } from '../types';
import type { Color } from '../types';
import { BLOB_RADIUS, THRESHOLD, PARTICLES_PER_SLOT } from '../utils/fluidGeometry';
import { TILT_DELAY, EMIT_DUR, LIFT_PX } from '../utils/pourConstants';

// ─── helpers ──────────────────────────────────────────────────────────────────

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
  skipColor: Color | null,
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
    if (color === skipColor) continue;
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

    // Draw gaussian blobs
    for (const p of positions) {
      const g = offCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, BLOB_RADIUS);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      offCtx.fillStyle = g;
      offCtx.beginPath();
      offCtx.arc(p.x, p.y, BLOB_RADIUS, 0, Math.PI * 2);
      offCtx.fill();
    }

    // Threshold pass
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

    // Blit to main canvas at tube screen position
    ctx.drawImage(
      offCanvas,
      rxMin, ryMin, roiW, roiH,
      tubeRect.left + rxMin, tubeRect.top + ryMin, roiW, roiH,
    );
  }
}

// ─── stream particle type ──────────────────────────────────────────────────────

interface StreamParticle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  done: boolean;
}

const GRAVITY = 2200;

// ─── component ────────────────────────────────────────────────────────────────

interface Props {
  tubeRefs:   React.RefObject<(HTMLDivElement | null)[]>;
  tubeCount:  number;
  tubeHeight: number;
}

export default function FluidCanvas({ tubeRefs, tubeCount, tubeHeight }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const offCanvas  = useRef<HTMLCanvasElement | null>(null);

  const tubes        = useGameStore(s => s.tubes);
  const pendingPour  = useGameStore(s => s.pendingPour);
  const completePour = useGameStore(s => s.completePour);

  const { physicsRef, reconcile, stepAll, jiggle, drainParticles } = useMatterWorld(tubeCount);

  // ── canvas init ──────────────────────────────────────────────────────────────
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
  }, []);

  // ── reconcile when tubes state changes ───────────────────────────────────────
  useEffect(() => {
    if (tubes.length === 0) return;
    const id = requestAnimationFrame(() => {
      const rects = (tubeRefs.current ?? []).map(el => el?.getBoundingClientRect() ?? null);
      reconcile(tubes, rects);
    });
    return () => cancelAnimationFrame(id);
  }, [tubes, reconcile, tubeRefs]);

  // ── main render + physics loop ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr    = window.devicePixelRatio || 1;
    const ctx    = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    // Pour state (managed inside RAF loop to avoid stale closures)
    let pourActive    = false;
    let totalElapsed  = 0;
    let emitElapsed   = 0;
    let emitted       = 0;
    let drained       = 0;
    let pourComplete  = false;
    let streamParticles: StreamParticle[] = [];

    // Snapshot of pour info (refreshed when pendingPour changes)
    let pourSnapshot: {
      fromIdx:    number;
      toIdx:      number;
      color:      Color;
      count:      number;
      pivotX:     number;
      pivotY:     number;
      H:          number;
      destY:      number;
      emitRate:   number;
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

    // Store a ref to pendingPour that the loop can read
    let latestPendingPour = pendingPour;

    function syncPourSnapshot() {
      if (!latestPendingPour) { pourSnapshot = null; return; }
      if (pourSnapshot && pourSnapshot.fromIdx === latestPendingPour.fromIdx) return;

      const refs = tubeRefs.current ?? [];
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
        fromIdx:     latestPendingPour.fromIdx,
        toIdx:       latestPendingPour.toIdx,
        color:       latestPendingPour.color,
        count:       latestPendingPour.count,
        pivotX,
        pivotY,
        H,
        destY,
        emitRate:    total / EMIT_DUR,
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

      // Sync pour snapshot on first frame after pendingPour appears
      if (latestPendingPour && !pourSnapshot) syncPourSnapshot();

      stepAll(dt * 1000);

      // ── idle: render all tube fluids ─────────────────────────────────────────
      const refs     = tubeRefs.current ?? [];
      const physics  = physicsRef.current;
      const skipIdx  = pourActive && pourSnapshot ? pourSnapshot.fromIdx : -1;

      for (let i = 0; i < physics.length; i++) {
        if (i === skipIdx) continue; // source tube hidden during pour
        const el = refs[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        renderTubeFluid(ctx, offCanvas.current!, physics[i].particles, rect, null);
      }

      // ── pour: stream + drain ──────────────────────────────────────────────────
      if (pourActive && pourSnapshot) {
        const ps = pourSnapshot;
        totalElapsed += dt;

        if (totalElapsed >= TILT_DELAY) {
          emitElapsed += dt;

          // Drain source tube particles progressively
          const drainTarget = Math.min(
            ps.totalToDrain,
            Math.round((emitElapsed / EMIT_DUR) * ps.totalToDrain),
          );
          if (drainTarget > drained) {
            drainParticles(ps.fromIdx, ps.color, drainTarget - drained);
            drained = drainTarget;
          }

          // Emit stream particles
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

        // Update + render stream particles as metaballs
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

        // Render stream as metaballs (full-canvas offscreen pass)
        if (livePositions.length > 0) {
          renderStreamMetaballs(ctx, ps.color, livePositions);
        }

        // Pour complete when stream finishes
        if (totalElapsed >= TOTAL_DUR && alive === 0 && !pourComplete) {
          pourComplete = true;
          pourActive   = false;
          pourSnapshot = null;
          completePour();
        }
      }

      rafId = requestAnimationFrame(loop);
    }

    // Subscribe to pendingPour from store
    const unsubscribe = useGameStore.subscribe(state => {
      latestPendingPour = state.pendingPour;
      if (!state.pendingPour) {
        pourActive   = false;
        pourSnapshot = null;
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

// ─── stream metaball pass (full canvas, no clip) ──────────────────────────────

function renderStreamMetaballs(
  ctx:       CanvasRenderingContext2D,
  color:     Color,
  positions: { x: number; y: number }[],
) {
  const W = ctx.canvas.width  / (window.devicePixelRatio || 1);
  const H = ctx.canvas.height / (window.devicePixelRatio || 1);

  // Tiny offscreen canvas for this pass
  const off = document.createElement('canvas');
  off.width  = W;
  off.height = H;
  const oc = off.getContext('2d')!;

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
  const [r, g2, b] = [
    parseInt(COLOR_SOLID[color].slice(1, 3), 16),
    parseInt(COLOR_SOLID[color].slice(3, 5), 16),
    parseInt(COLOR_SOLID[color].slice(5, 7), 16),
  ];
  for (let j = 0; j < d.length; j += 4) {
    if (d[j] > THRESHOLD) {
      d[j] = r; d[j + 1] = g2; d[j + 2] = b; d[j + 3] = 215;
    } else {
      d[j + 3] = 0;
    }
  }
  oc.putImageData(imgData, 0, 0);
  ctx.drawImage(off, 0, 0);
}
```

> **Note:** `renderStreamMetaballs` creates a full-screen offscreen canvas per call. This is fine for the stream (one color, one call per frame). For idle tubes we use the ROI-optimized path. If stream performance is a concern, optimize by tracking a bounding box in Task 10.

- [ ] **Step 2: Build to verify no type errors**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run build 2>&1 | tail -20
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add MagicSort/src/components/FluidCanvas.tsx
git commit -m "feat: add FluidCanvas with idle metaball rendering and pour stream"
```

---

## Task 5: Wire FluidCanvas into TubeBoard

**Files:**
- Modify: `src/components/TubeBoard.tsx`

- [ ] **Step 1: Add FluidCanvas to TubeBoard**

In `src/components/TubeBoard.tsx`, add import at top:

```typescript
import FluidCanvas from './FluidCanvas';
```

In the JSX return, add `<FluidCanvas>` as the first child of the board div (before the `tubes.map`):

```tsx
return (
  <div ref={boardRef} style={{ /* existing styles */ }}>
    <FluidCanvas
      tubeRefs={tubeRefs}
      tubeCount={tubes.length}
      tubeHeight={tubeHeight}
    />
    {tubes.map((tube, i) => { /* existing tube rendering */ })}
    {animInfo && (
      <PourAnimation /* keep for now — removed in Task 8 */ ... />
    )}
  </div>
);
```

- [ ] **Step 2: Fix tubeRefs type**

`tubeRefs` is `useRef<(HTMLDivElement | null)[]>([])`. FluidCanvas expects `React.RefObject<(HTMLDivElement | null)[]>`. These are the same type — no change needed.

- [ ] **Step 3: Start dev server and verify FluidCanvas canvas is present**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run dev
```

Open http://localhost:5173 in browser. Open DevTools → Elements. Verify there is a `<canvas>` element with `position: fixed; z-index: 1`. The canvas should be present even before starting a game.

- [ ] **Step 4: Commit**

```bash
git add MagicSort/src/components/TubeBoard.tsx
git commit -m "feat: mount FluidCanvas in TubeBoard"
```

---

## Task 6: Strip color segments from Tube.tsx

**Files:**
- Modify: `src/components/Tube.tsx`

- [ ] **Step 1: Remove color segment divs and incoming liquid overlay**

In `src/components/Tube.tsx`, remove the following blocks from inside the glass body div:

**Remove** (lines ~146–176): the `{tube.map((color, i) => { ... })}` block that renders color segments.

**Remove** (lines ~179–192): the `{incomingColor !== undefined && incomingCount !== undefined && (...)}` block for the incoming liquid animation.

**Remove** (lines ~194–202): the `{empty && (...)}` empty-state glow div.

After removal, the glass body div's children should only contain the left-edge light reflection div.

- [ ] **Step 2: Remove unused imports and props**

In `src/components/Tube.tsx`:

Remove from props interface:
```typescript
// Remove these props (they'll be cleaned up fully in Task 8):
// isPouringFrom, pourToRight, pourOffsetX, incomingColor, incomingCount, leavingCount
// Keep them for now so TubeBoard doesn't break — just don't use them in JSX
```

Remove from the component body (no longer needed without segments):
```typescript
// Remove: const empty = tube.length === 0;
// Keep: const sorted (still used for border color)
```

- [ ] **Step 3: Dev server — verify glass tubes are transparent with visible borders**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run dev
```

Start a game. Tubes should show as transparent glass bodies. The canvas fluid (metaballs) should be visible inside the tubes once Matter.js reconciles (may take one frame after game start).

- [ ] **Step 4: Verify fluid appears inside tubes**

Start a game. Within 1–2 frames the FluidCanvas `reconcile` runs, spawning Matter.js particles. You should see colored blobs (metaballs) inside each tube interior matching the puzzle colors.

If no blobs appear: check browser console for errors. Most likely cause: `tubeRefs.current` entries are null at reconcile time. Fix: increase the `requestAnimationFrame` delay in the reconcile useEffect (add one more rAF nesting).

- [ ] **Step 5: Commit**

```bash
git add MagicSort/src/components/Tube.tsx
git commit -m "feat: strip color segments from Tube — interior now rendered by FluidCanvas"
```

---

## Task 7: Pour sequence integration

**Files:**
- Modify: `src/components/TubeBoard.tsx` — stop passing leavingCount/incomingColor/incomingCount

The FluidCanvas already handles the pour stream (Task 4 included the full pour logic). This task connects it to the actual game flow and verifies it works end-to-end.

- [ ] **Step 1: Remove visual pour props from Tube rendering in TubeBoard**

In `src/components/TubeBoard.tsx`, update the Tube rendering inside `tubes.map` — stop passing the visual pour props since Tube no longer uses them:

```tsx
<Tube
  key={i}
  ref={el => { tubeRefs.current[i] = el; }}
  tube={tube}
  index={i}
  isSelected={selectedTube === i}
  onClick={() => selectTube(i)}
  tubeWidth={tubeWidth}
  tubeHeight={tubeHeight}
  isPouringFrom={isFrom}
  pourToRight={animInfo?.pourToRight ?? false}
  pourOffsetX={isFrom ? (animInfo?.pourOffsetX ?? 0) : 0}
  // REMOVE: incomingColor, incomingCount, leavingCount
/>
```

- [ ] **Step 2: Dev server — test a pour**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run dev
```

Start an Easy game. Select a tube, then select a valid destination. You should see:
1. Source tube lifts and tilts (Framer Motion animation, unchanged)
2. A metaball stream flows from the source tube to the destination
3. Source tube interior shows remaining colors (poured color disappears progressively)
4. After stream completes, destination tube fills with the new color (via reconcile)
5. Game state updates correctly (undo works, win condition triggers)

Common issues to check:
- **Stream doesn't appear**: Check that `latestPendingPour` is updated by the store subscription in FluidCanvas. Add `console.log('pendingPour', latestPendingPour)` inside the loop temporarily.
- **completePour fires too early**: Verify `TOTAL_DUR = TILT_DELAY + EMIT_DUR + 0.6` constant is correct in FluidCanvas.
- **Particles in wrong position after pour**: The `reconcile` useEffect runs when `tubes` changes after `completePour`. Verify `tubes` state updates in the store.

- [ ] **Step 3: Commit**

```bash
git add MagicSort/src/components/TubeBoard.tsx
git commit -m "feat: connect FluidCanvas pour sequence to game flow"
```

---

## Task 8: Remove PourAnimation and clean up stale props

**Files:**
- Delete: `src/components/PourAnimation.tsx`
- Modify: `src/components/TubeBoard.tsx`
- Modify: `src/components/Tube.tsx`

- [ ] **Step 1: Remove PourAnimation and simplify TubeBoard**

In `src/components/TubeBoard.tsx`, replace the entire file with:

```typescript
import { useRef, useCallback, useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import Tube from './Tube';
import FluidCanvas, { type FluidCanvasHandle } from './FluidCanvas';
import { LIFT_PX } from '../utils/pourConstants';

function calcTubeWidth(n: number): number {
  if (n === 0) return 72;
  const gap       = 10;
  const available = window.innerWidth - 32;
  const natural   = Math.floor((available - (n - 1) * gap) / n);
  return Math.min(82, Math.max(42, natural));
}

export default function TubeBoard() {
  const tubes        = useGameStore(s => s.tubes);
  const selectedTube = useGameStore(s => s.selectedTube);
  const pendingPour  = useGameStore(s => s.pendingPour);
  const selectTubeBase = useGameStore(s => s.selectTube);

  const boardRef  = useRef<HTMLDivElement>(null);
  const tubeRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const fluidRef  = useRef<FluidCanvasHandle>(null);

  const [tubeWidth, setTubeWidth] = useState(() => calcTubeWidth(0));
  const tubeHeight = Math.round(tubeWidth * 3.2);

  useEffect(() => {
    setTubeWidth(calcTubeWidth(tubes.length));
  }, [tubes.length]);

  useEffect(() => {
    const onResize = () => setTubeWidth(calcTubeWidth(tubes.length));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [tubes.length]);

  // Pour info for Tube tilt animation (offsetX + direction)
  const [pourInfo, setPourInfo] = useState<{ offsetX: number; toRight: boolean } | null>(null);

  useEffect(() => {
    if (!pendingPour || !boardRef.current) { setPourInfo(null); return; }
    const fromEl    = tubeRefs.current[pendingPour.fromIdx];
    const toEl      = tubeRefs.current[pendingPour.toIdx];
    if (!fromEl || !toEl) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const fromRect  = fromEl.getBoundingClientRect();
    const toRect    = toEl.getBoundingClientRect();
    const fromCX    = fromRect.left + fromRect.width  / 2 - boardRect.left;
    const toCX      = toRect.left   + toRect.width    / 2 - boardRect.left;
    setPourInfo({ offsetX: toCX - fromCX, toRight: toRect.left >= fromRect.left });
  }, [pendingPour]);

  const selectTube = useCallback((idx: number) => {
    fluidRef.current?.jiggle(idx);
    selectTubeBase(idx);
  }, [selectTubeBase]);

  return (
    <div
      ref={boardRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 10,
        padding: `${LIFT_PX + 20}px 16px 32px`,
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'auto',
      }}
    >
      <FluidCanvas
        ref={fluidRef}
        tubeRefs={tubeRefs}
        tubeCount={tubes.length}
        tubeHeight={tubeHeight}
      />
      {tubes.map((tube, i) => {
        const isFrom = pendingPour !== null && pendingPour.fromIdx === i;
        return (
          <Tube
            key={i}
            ref={el => { tubeRefs.current[i] = el; }}
            tube={tube}
            index={i}
            isSelected={selectedTube === i}
            onClick={() => selectTube(i)}
            tubeWidth={tubeWidth}
            tubeHeight={tubeHeight}
            isPouringFrom={isFrom}
            pourToRight={pourInfo?.toRight ?? false}
            pourOffsetX={isFrom ? (pourInfo?.offsetX ?? 0) : 0}
          />
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Delete PourAnimation.tsx**

```bash
rm /Users/satyarthn/Workspace/games/MagicSort/src/components/PourAnimation.tsx
```

- [ ] **Step 3: Update Tube.tsx import**

In `src/components/Tube.tsx`, replace:
```typescript
import { LIFT_PX, TILT_DEG, EMIT_DUR, TILT_DELAY } from './PourAnimation';
```
With:
```typescript
import { LIFT_PX, TILT_DEG, EMIT_DUR, TILT_DELAY } from '../utils/pourConstants';
```

- [ ] **Step 4: Remove stale props from Tube.tsx**

In `src/components/Tube.tsx`, remove from the `TubeProps` interface:
- `incomingColor?: Color`
- `incomingCount?: number`
- `leavingCount?: number`

Remove them from the destructured props in the `forwardRef` call.

Keep `isPouringFrom`, `pourToRight`, `pourOffsetX` — these still drive the Framer Motion tilt animation.

- [ ] **Step 5: Build to verify no TypeScript errors**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run build 2>&1 | tail -30
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Run all tests**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm test 2>&1 | tail -20
```

Expected: All existing tests pass (pourLogic, winChecker, puzzleGenerator, fluidGeometry).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: remove PourAnimation — FluidCanvas handles all fluid rendering"
```

---

## Task 9: Jiggle on tube select

**Files:**
- Modify: `src/components/FluidCanvas.tsx`
- Modify: `src/components/TubeBoard.tsx`

- [ ] **Step 1: Expose jiggle via a ref in FluidCanvas**

In `src/components/FluidCanvas.tsx`, expose the `jiggle` function so TubeBoard can call it on tube select. Use `useImperativeHandle`:

Add to FluidCanvas props:
```typescript
interface Props {
  tubeRefs:   React.RefObject<(HTMLDivElement | null)[]>;
  tubeCount:  number;
  tubeHeight: number;
}

export interface FluidCanvasHandle {
  jiggle: (tubeIdx: number) => void;
}
```

Change the component to use `forwardRef`:
```typescript
import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

const FluidCanvas = forwardRef<FluidCanvasHandle, Props>(
  function FluidCanvas({ tubeRefs, tubeCount, tubeHeight }, ref) {
    const { physicsRef, reconcile, stepAll, jiggle, drainParticles } = useMatterWorld(tubeCount);

    useImperativeHandle(ref, () => ({ jiggle }), [jiggle]);

    // ... rest of component unchanged ...
  }
);

export default FluidCanvas;
```

- [ ] **Step 2: Call jiggle from TubeBoard on tube select**

In `src/components/TubeBoard.tsx`:

```typescript
import FluidCanvas, { type FluidCanvasHandle } from './FluidCanvas';
import { useRef } from 'react';

// Inside TubeBoard component:
const fluidRef = useRef<FluidCanvasHandle>(null);
```

In the `selectTube` wrapper (wrap the store's `selectTube`):
```typescript
const selectTubeBase = useGameStore(s => s.selectTube);

const selectTube = useCallback((idx: number) => {
  fluidRef.current?.jiggle(idx);
  selectTubeBase(idx);
}, [selectTubeBase]);
```

Pass `ref` to FluidCanvas:
```tsx
<FluidCanvas
  ref={fluidRef}
  tubeRefs={tubeRefs}
  tubeCount={tubes.length}
  tubeHeight={tubeHeight}
/>
```

- [ ] **Step 3: Dev server — verify jiggle on tap**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run dev
```

Tap any tube. The fluid inside should visibly slosh/bounce briefly.

- [ ] **Step 4: Commit**

```bash
git add MagicSort/src/components/FluidCanvas.tsx MagicSort/src/components/TubeBoard.tsx
git commit -m "feat: jiggle tube fluid on select via FluidCanvas handle"
```

---

## Task 10: Visual tuning

**Files:**
- Modify: `src/utils/fluidGeometry.ts` (constants only)
- Modify: `src/components/FluidCanvas.tsx` (constants only)

- [ ] **Step 1: Start dev server**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm run dev
```

Start a Hard game (11 tubes, most particles, best stress test).

- [ ] **Step 2: Tune PARTICLES_PER_SLOT**

In `src/utils/fluidGeometry.ts`, adjust `PARTICLES_PER_SLOT`:
- Too sparse (blobs don't merge into solid fill): increase (try 15)
- Too slow / laggy: decrease (try 10)
- Good default: 12

- [ ] **Step 3: Tune BLOB_RADIUS**

In `src/utils/fluidGeometry.ts`, adjust `BLOB_RADIUS`:
- Blobs too small (gaps between particles): increase (try 16)
- Blobs overflow tube walls: decrease (try 12)
- Good default: 14

- [ ] **Step 4: Tune THRESHOLD**

In `src/utils/fluidGeometry.ts`, adjust `THRESHOLD`:
- Blobs don't merge at distance (threshold too high): decrease (try 90)
- Blobs bleed outside tube (threshold too low): increase (try 130)
- Good default: 110

- [ ] **Step 5: Check physics settling speed**

If particles take too long to settle after a game starts:
In `src/hooks/useMatterWorld.ts`, increase `engine.gravity.scale` (default is 0.001):
```typescript
const engine = Matter.Engine.create({
  gravity: { x: 0, y: 1, scale: 0.002 }, // faster settling
});
```

If particles bounce too aggressively after settling:
Decrease `restitution` in particle options (try 0.05).

- [ ] **Step 6: Verify all game flows work**

Check the following manually:
- Start Easy / Medium / Hard — fluid appears in all tubes
- Select a tube — jiggle works
- Valid pour — stream appears, source drains, dest fills
- Undo — tubes reconcile to previous state, fluid updates
- Restart — fluid resets
- Win — modal appears correctly

- [ ] **Step 7: Run full test suite**

```bash
cd /Users/satyarthn/Workspace/games/MagicSort && npm test 2>&1 | tail -20
```

Expected: All tests pass.

- [ ] **Step 8: Final commit**

```bash
git add MagicSort/src/utils/fluidGeometry.ts MagicSort/src/hooks/useMatterWorld.ts
git commit -m "feat: tune fluid physics constants for visual quality"
```

---

## Implementation Notes

**Tilt gravity (deferred):** The spec describes rotating the Matter.js gravity vector to match the source tube's CSS tilt angle, so liquid visibly sloshes toward the opening. This plan skips it: the source tube interior is hidden during pour (to avoid rendering fluid at resting coordinates while the CSS shell has moved). Implementing it correctly requires embedding a `<canvas>` element *inside* each tube's glass body div so it transforms with the Framer Motion animation — a larger follow-on task.

**Performance**: The ROI-optimized metaball pass keeps pixel operations to ~3,000–6,000 pixels per color per tube. With 11 tubes × 4 colors × 6,000 pixels = 264,000 pixels/frame × 60fps = 15.8M ops/s — well within mobile GPU capability.

**Stream metaballs**: `renderStreamMetaballs` creates a full-screen offscreen canvas on each call. This is acceptable because there is only one stream at a time. If this causes GC pressure, cache the canvas in a ref.

**Physics scale**: Matter.js positions are in CSS pixels. `getBoundingClientRect()` returns CSS pixels. Both are consistent — no unit conversion needed.

**DPR**: The main canvas is scaled with `ctx.scale(dpr, dpr)`. All `ctx` draw calls use CSS pixel coordinates. The per-tube `offCanvas` is in CSS pixels (no DPR scaling) — this is correct because `drawImage` from unscaled canvas to scaled ctx works in CSS pixel space.
