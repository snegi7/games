# Fluid Physics Design — MagicSort

**Date:** 2026-06-20  
**Status:** Approved  

## Problem

The current tube animation has two weaknesses:
1. The tube tilt (42°) doesn't look convincing — the liquid doesn't visually respond to gravity as the tube rotates.
2. The pour stream is individual canvas particles, not a continuous fluid.

## Goals

- Liquid inside tubes is always alive — it sloshes and responds to tilt/tap in real time.
- The pour stream looks like a continuous, merging fluid blob (metaball effect).
- The tube glass shell, click handling, and selection UX are unchanged.

## Chosen Approach

**Matter.js + Metaball rendering, Hybrid CSS Shell + Canvas Interior.**

- Matter.js (well-maintained, 47 kB gzipped) handles particle physics.
- Metaball rendering (gaussian blur + threshold pass) makes particles merge into a smooth liquid.
- The existing HTML/CSS tube shells are kept for glass effects, borders, reflections, and Framer Motion tilt. Their interiors become transparent. A permanent canvas paints the fluid behind them.

## Architecture

```
┌─ React tree (existing) ──────────────────────────────┐
│  TubeBoard → Tube (CSS shell, click, Framer tilt)    │
│              └─ interior: transparent                 │
└──────────────────────────────────────────────────────┘
        ↓ getBoundingClientRect() each frame
┌─ FluidCanvas (new, full-screen, z=1) ────────────────┐
│  Matter.js Engine                                     │
│    ├─ Tube composite[0..10]: static walls + floor     │
│    └─ Fluid particles (label = color)                 │
│  Metaball render: 1 pass per color → threshold → draw │
└──────────────────────────────────────────────────────┘
```

One shared Matter.js engine runs the whole game. All tube bodies live in one virtual coordinate space synced to screen positions each frame via `getBoundingClientRect()`.

`FluidCanvas` sits at z-index 1 — **behind** the CSS tube shells. The glass border, rim, and reflection divs render on top naturally. Each tube's fluid is clipped on-canvas to that tube's interior bounding rect, so fluid never bleeds outside the glass walls.

## Particle System

- **Count:** 10 particles per color slot. Max: 11 tubes × 4 slots × 10 = 440 particles on hard.
- **Initialization:** On puzzle load, particles spawn at their color slot's vertical position inside the tube composite and settle under gravity.
- **Tilt response:** When Framer Motion tilts the source tube, `FluidCanvas` reads the tube element's current CSS `rotate` transform each frame and rotates the Matter.js gravity vector for those particles. The liquid sloshes toward the opening naturally.

## Metaball Render Loop

Runs every animation frame inside `FluidCanvas`:

```
for each color (up to 8):
  1. Draw white radial gradient blobs on offscreen canvas
     for each particle of that color
  2. Read pixel data; threshold: brightness > 128 → solid, else transparent
  3. Replace solid pixels with that color's hex value
  4. Composite result onto main canvas
```

Particles within ~1 radius of each other fuse into a continuous blob — the liquid merge effect.

## Pour Sequence

Replaces `PourAnimation.tsx` entirely:

1. **Lift & travel** — Framer Motion drives the CSS tube movement (unchanged).
2. **Tilt begins** — gravity vector rotates for source tube particles; they flow toward the rim.
3. **Particles exit** — particles crossing the rim are moved from the tube composite into a shared "in-flight" pool in the Matter.js world (real gravity, no walls).
4. **Metaball stream** — in-flight particles render as a continuous blob falling toward the destination.
5. **Landing** — particles crossing the destination tube's rim are inserted into that tube's composite.
6. **onComplete** — fires at the same point as today; game state updates normally.

## State Integration

- `gameStore`, `pourLogic`, `winChecker`, `puzzleGenerator` are **unchanged**.
- `FluidCanvas` subscribes to the store's `tubes` array.
- On state change (undo, new game, win): destroy all particles, re-spawn from current `tubes` state (reconcile).

## File Changes

### New
| File | Purpose |
|------|---------|
| `src/hooks/useMatterWorld.ts` | Creates/destroys the Matter.js engine; exposes tube composites and `reconcile(tubes)` |
| `src/components/FluidCanvas.tsx` | Permanent full-screen canvas; render loop; metaball pass; pour sequence |

### Modified
| File | Change |
|------|--------|
| `src/components/Tube.tsx` | Remove color segment `<motion.div>` blocks and incoming liquid overlay; interior transparent |
| `src/components/TubeBoard.tsx` | Mount `<FluidCanvas>` once; remove `<PourAnimation>`; pass pour events to `FluidCanvas` |

### Deleted
| File | Reason |
|------|--------|
| `src/components/PourAnimation.tsx` | Superseded by `FluidCanvas` |

### New Dependency
```
matter-js  @types/matter-js
```

## Performance Budget

| Difficulty | Tubes | Max particles | Metaball passes/frame |
|-----------|-------|--------------|----------------------|
| Easy      | 6     | 240          | up to 4              |
| Medium    | 8     | 320          | up to 6              |
| Hard      | 11    | 440          | up to 8              |

All passes operate on small offscreen canvases (~tube width). Expected to run at 60 fps on modern mobile.

## Out of Scope

- Changing game logic, difficulty configs, or move rules.
- Adding new colors or tube sizes.
- Sound changes.
