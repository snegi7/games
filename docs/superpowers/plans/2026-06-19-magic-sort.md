# Magic Sort Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Magic Sort — a color-tube sorting puzzle game — as a new sibling app under `/games/MagicSort/`.

**Architecture:** Zustand store owns all game state. A `pendingPour` field triggers the arc animation in `TubeBoard`; `completePour()` then mutates tubes and checks win/loss. Pure utility functions (`pourLogic`, `winChecker`, `puzzleGenerator`) are covered by Vitest unit tests.

**Tech Stack:** React 18, TypeScript, Vite, Framer Motion 11, Zustand 4, Tailwind CSS 3, Vitest, Web Audio API (no audio files).

---

## File Map

```
MagicSort/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.js
  postcss.config.js
  src/
    main.tsx
    App.tsx                        — renders HomeScreen or GameScreen based on gameStatus
    types/index.ts                 — Color, Difficulty, DifficultyConfig, GameStatus, PendingPour + constants
    store/gameStore.ts             — Zustand store: all state + actions
    components/
      Tube.tsx                     — glass body + metallic rim + colored segments; selected/sorted states
      TubeBoard.tsx                — responsive grid; manages tubeRefs; reads DOM positions for pour anim
      PourAnimation.tsx            — absolutely-positioned arc droplet overlay inside TubeBoard
      MoveCounter.tsx              — top-right badge; pulses on decrement; hidden on Easy
      UndoButton.tsx               — top-left; disabled when history empty or isPouring
      WinModal.tsx                 — confetti burst + stats + Play Again / Change Difficulty
      GameOverModal.tsx            — out-of-moves modal + Restart Same Puzzle
    screens/
      HomeScreen.tsx               — title + 3 difficulty buttons
      GameScreen.tsx               — HUD + TubeBoard + WinModal + GameOverModal
    utils/
      pourLogic.ts                 — getTopColor, getTopColorCount, isValidPour, executePour
      winChecker.ts                — isTubeSorted, checkWin
      puzzleGenerator.ts          — generatePuzzle (scrambles from solved state)
      sounds.ts                    — Web Audio API synth sounds
    styles/
      globals.css                  — Tailwind directives + body background
    __tests__/
      pourLogic.test.ts
      winChecker.test.ts
      puzzleGenerator.test.ts
```

---

### Task 1: Project scaffolding

**Files:**
- Create: `MagicSort/package.json`
- Create: `MagicSort/index.html`
- Create: `MagicSort/tsconfig.json`
- Create: `MagicSort/vite.config.ts`
- Create: `MagicSort/tailwind.config.js`
- Create: `MagicSort/postcss.config.js`
- Modify: `package.json` (root — add MagicSort workspace + scripts)

- [ ] **Step 1: Create `MagicSort/package.json`**

```json
{
  "name": "magic-sort",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.17.0",
    "globals": "^15.14.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.18.2",
    "vite": "^6.0.5",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create `MagicSort/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Magic Sort</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧪</text></svg>">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `MagicSort/tsconfig.json`**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

Create `MagicSort/tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

Create `MagicSort/tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Create `MagicSort/vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MagicSort/',
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 5: Create `MagicSort/tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
        },
        'confetti-burst': {
          '0%': { transform: 'translate(0,0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(var(--tx), var(--ty)) scale(0)', opacity: '0' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        'pulse-scale': 'pulse-scale 0.3s ease-in-out',
        'confetti-burst': 'confetti-burst 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 6: Create `MagicSort/postcss.config.js`**

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
}
```

- [ ] **Step 7: Add MagicSort to root workspace**

In root `package.json`, update `"workspaces"` to:
```json
"workspaces": ["packages/*", "AnimalRescue", "CozyKitchen", "MagicSort"]
```

And add scripts:
```json
"dev:magic": "npm run dev --workspace=magic-sort",
"build:magic": "npm run build --workspace=magic-sort"
```

- [ ] **Step 8: Install dependencies**

```bash
cd MagicSort && npm install
```

Expected: `node_modules/` populated, no errors.

- [ ] **Step 9: Commit**

```bash
git add MagicSort/package.json MagicSort/index.html MagicSort/tsconfig.json MagicSort/tsconfig.app.json MagicSort/tsconfig.node.json MagicSort/vite.config.ts MagicSort/tailwind.config.js MagicSort/postcss.config.js package.json
git commit -m "feat(magic-sort): scaffold project with Vite + React + Tailwind + Vitest"
```

---

### Task 2: Types and constants

**Files:**
- Create: `MagicSort/src/types/index.ts`

- [ ] **Step 1: Create `MagicSort/src/types/index.ts`**

```ts
export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'teal';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface DifficultyConfig {
  colors: number;
  emptyTubes: number;
  totalTubes: number;
  moveLimit: number | null;
  tubeCapacity: number;
}

export interface PendingPour {
  fromIdx: number;
  toIdx: number;
  color: Color;
  count: number;
}

export const TUBE_CAPACITY = 4;

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy:   { colors: 4, emptyTubes: 2, totalTubes: 6,  moveLimit: null, tubeCapacity: TUBE_CAPACITY },
  medium: { colors: 6, emptyTubes: 2, totalTubes: 8,  moveLimit: 40,  tubeCapacity: TUBE_CAPACITY },
  hard:   { colors: 8, emptyTubes: 3, totalTubes: 11, moveLimit: 60,  tubeCapacity: TUBE_CAPACITY },
};

export const ALL_COLORS: Color[] = [
  'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal',
];

export const COLOR_GRADIENTS: Record<Color, string> = {
  red:    'linear-gradient(135deg, #ff4d6d, #c9184a)',
  blue:   'linear-gradient(135deg, #4cc9f0, #4361ee)',
  green:  'linear-gradient(135deg, #06d6a0, #1b998b)',
  yellow: 'linear-gradient(135deg, #ffd60a, #f48c06)',
  purple: 'linear-gradient(135deg, #c77dff, #7b2d8b)',
  orange: 'linear-gradient(135deg, #ff6d00, #f4511e)',
  pink:   'linear-gradient(135deg, #ff70a6, #ff3c83)',
  teal:   'linear-gradient(135deg, #00b4d8, #0077b6)',
};

export const COLOR_SOLID: Record<Color, string> = {
  red:    '#ff4d6d',
  blue:   '#4cc9f0',
  green:  '#06d6a0',
  yellow: '#ffd60a',
  purple: '#c77dff',
  orange: '#ff6d00',
  pink:   '#ff70a6',
  teal:   '#00b4d8',
};
```

- [ ] **Step 2: Commit**

```bash
git add MagicSort/src/types/index.ts
git commit -m "feat(magic-sort): add types, difficulty configs, and color constants"
```

---

### Task 3: Pour logic utilities + tests

**Files:**
- Create: `MagicSort/src/utils/pourLogic.ts`
- Create: `MagicSort/src/__tests__/pourLogic.test.ts`

- [ ] **Step 1: Write failing tests — create `MagicSort/src/__tests__/pourLogic.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import {
  getTopColor, getTopColorCount, isValidPour, executePour,
} from '../utils/pourLogic';
import type { Color } from '../types';

const r = 'red' as Color;
const b = 'blue' as Color;
const g = 'green' as Color;

describe('getTopColor', () => {
  it('returns null for empty tube', () => {
    expect(getTopColor([])).toBe(null);
  });
  it('returns last element', () => {
    expect(getTopColor([r, b, g])).toBe(g);
  });
});

describe('getTopColorCount', () => {
  it('returns 0 for empty tube', () => {
    expect(getTopColorCount([])).toBe(0);
  });
  it('counts consecutive top-color segments', () => {
    expect(getTopColorCount([r, b, b, b])).toBe(3);
  });
  it('stops at color change', () => {
    expect(getTopColorCount([b, r, b])).toBe(1);
  });
  it('counts full single-color tube', () => {
    expect(getTopColorCount([r, r, r, r])).toBe(4);
  });
});

describe('isValidPour', () => {
  it('returns false for empty source', () => {
    expect(isValidPour([], [r], 4)).toBe(false);
  });
  it('returns false for full destination', () => {
    expect(isValidPour([r], [b, b, b, b], 4)).toBe(false);
  });
  it('returns false when top colors differ', () => {
    expect(isValidPour([r, b], [r], 4)).toBe(false);
  });
  it('returns true pouring into empty tube', () => {
    expect(isValidPour([r], [], 4)).toBe(true);
  });
  it('returns true when top colors match', () => {
    expect(isValidPour([r, b], [g, b], 4)).toBe(true);
  });
  it('returns false pouring same-color into itself', () => {
    expect(isValidPour([b], [b], 4)).toBe(true); // valid — same color, has space
  });
});

describe('executePour', () => {
  it('moves one matching segment', () => {
    const tubes: Color[][] = [[r, b], [g, b]];
    const result = executePour(tubes, 0, 1, 4);
    expect(result[0]).toEqual([r]);
    expect(result[1]).toEqual([g, b, b]);
  });
  it('moves multiple consecutive same-color segments', () => {
    const tubes: Color[][] = [[r, b, b], []];
    const result = executePour(tubes, 0, 1, 4);
    expect(result[0]).toEqual([r]);
    expect(result[1]).toEqual([b, b]);
  });
  it('respects capacity — does not overfill', () => {
    const tubes: Color[][] = [[b, b, b], [b, b, b]];
    const result = executePour(tubes, 0, 1, 4);
    expect(result[0]).toEqual([b, b]);
    expect(result[1]).toEqual([b, b, b, b]);
  });
  it('does not mutate input arrays', () => {
    const tubes: Color[][] = [[r], []];
    const orig0 = [...tubes[0]];
    const orig1 = [...tubes[1]];
    executePour(tubes, 0, 1, 4);
    expect(tubes[0]).toEqual(orig0);
    expect(tubes[1]).toEqual(orig1);
  });
});
```

- [ ] **Step 2: Run tests — expect failures**

```bash
cd MagicSort && npm test
```

Expected: errors like `Cannot find module '../utils/pourLogic'`.

- [ ] **Step 3: Create `MagicSort/src/utils/pourLogic.ts`**

```ts
import type { Color } from '../types';

export function getTopColor(tube: Color[]): Color | null {
  return tube.length === 0 ? null : tube[tube.length - 1];
}

export function getTopColorCount(tube: Color[]): number {
  if (tube.length === 0) return 0;
  const top = tube[tube.length - 1];
  let count = 0;
  for (let i = tube.length - 1; i >= 0; i--) {
    if (tube[i] === top) count++;
    else break;
  }
  return count;
}

export function isValidPour(from: Color[], to: Color[], capacity: number): boolean {
  if (from.length === 0) return false;
  if (to.length >= capacity) return false;
  const fromTop = getTopColor(from)!;
  const toTop = getTopColor(to);
  if (toTop !== null && toTop !== fromTop) return false;
  return true;
}

export function executePour(tubes: Color[][], fromIdx: number, toIdx: number, capacity: number): Color[][] {
  const next = tubes.map(t => [...t]);
  const fromTop = getTopColor(next[fromIdx])!;
  const count = getTopColorCount(next[fromIdx]);
  const space = capacity - next[toIdx].length;
  const moveAmt = Math.min(count, space);
  for (let i = 0; i < moveAmt; i++) {
    next[fromIdx].pop();
    next[toIdx].push(fromTop);
  }
  return next;
}
```

- [ ] **Step 4: Run tests — expect all pass**

```bash
cd MagicSort && npm test
```

Expected: `✓ pourLogic.test.ts (8 tests)`.

- [ ] **Step 5: Commit**

```bash
git add MagicSort/src/utils/pourLogic.ts MagicSort/src/__tests__/pourLogic.test.ts
git commit -m "feat(magic-sort): add pourLogic utilities with passing tests"
```

---

### Task 4: Win checker + tests

**Files:**
- Create: `MagicSort/src/utils/winChecker.ts`
- Create: `MagicSort/src/__tests__/winChecker.test.ts`

- [ ] **Step 1: Write failing tests — create `MagicSort/src/__tests__/winChecker.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { isTubeSorted, checkWin } from '../utils/winChecker';
import type { Color } from '../types';

const r = 'red' as Color;
const b = 'blue' as Color;

describe('isTubeSorted', () => {
  it('returns false for empty tube', () => {
    expect(isTubeSorted([], 4)).toBe(false);
  });
  it('returns false for partial tube', () => {
    expect(isTubeSorted([r, r], 4)).toBe(false);
  });
  it('returns false for mixed colors', () => {
    expect(isTubeSorted([r, b, r, r], 4)).toBe(false);
  });
  it('returns true for full same-color tube', () => {
    expect(isTubeSorted([r, r, r, r], 4)).toBe(true);
  });
});

describe('checkWin', () => {
  it('returns true when all non-empty tubes are sorted', () => {
    const tubes: Color[][] = [[r, r, r, r], [b, b, b, b], []];
    expect(checkWin(tubes, 4)).toBe(true);
  });
  it('returns false when any non-empty tube is unsorted', () => {
    const tubes: Color[][] = [[r, r, r, r], [b, r, b, b], []];
    expect(checkWin(tubes, 4)).toBe(false);
  });
  it('returns true for only empty tubes', () => {
    expect(checkWin([[], []], 4)).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests — expect failures**

```bash
cd MagicSort && npm test
```

Expected: `Cannot find module '../utils/winChecker'`.

- [ ] **Step 3: Create `MagicSort/src/utils/winChecker.ts`**

```ts
import type { Color } from '../types';

export function isTubeSorted(tube: Color[], capacity: number): boolean {
  if (tube.length !== capacity) return false;
  return tube.every(c => c === tube[0]);
}

export function checkWin(tubes: Color[][], capacity: number): boolean {
  return tubes.every(tube => tube.length === 0 || isTubeSorted(tube, capacity));
}
```

- [ ] **Step 4: Run tests — expect all pass**

```bash
cd MagicSort && npm test
```

Expected: `✓ winChecker.test.ts (7 tests)`.

- [ ] **Step 5: Commit**

```bash
git add MagicSort/src/utils/winChecker.ts MagicSort/src/__tests__/winChecker.test.ts
git commit -m "feat(magic-sort): add winChecker utilities with passing tests"
```

---

### Task 5: Puzzle generator + tests

**Files:**
- Create: `MagicSort/src/utils/puzzleGenerator.ts`
- Create: `MagicSort/src/__tests__/puzzleGenerator.test.ts`

- [ ] **Step 1: Write failing tests — create `MagicSort/src/__tests__/puzzleGenerator.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { generatePuzzle } from '../utils/puzzleGenerator';
import { checkWin } from '../utils/winChecker';
import { DIFFICULTY_CONFIGS, ALL_COLORS, TUBE_CAPACITY } from '../types';
import type { Difficulty } from '../types';

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

difficulties.forEach(diff => {
  describe(`generatePuzzle(${diff})`, () => {
    it('returns the correct number of tubes', () => {
      const tubes = generatePuzzle(diff);
      expect(tubes.length).toBe(DIFFICULTY_CONFIGS[diff].totalTubes);
    });

    it('contains exactly the right colors', () => {
      const tubes = generatePuzzle(diff);
      const colorsUsed = [...new Set(tubes.flat())].sort();
      const expected = ALL_COLORS.slice(0, DIFFICULTY_CONFIGS[diff].colors).sort();
      expect(colorsUsed).toEqual(expected);
    });

    it('has the correct total segment count', () => {
      const tubes = generatePuzzle(diff);
      const total = tubes.reduce((s, t) => s + t.length, 0);
      expect(total).toBe(DIFFICULTY_CONFIGS[diff].colors * TUBE_CAPACITY);
    });

    it('is not already solved', () => {
      const tubes = generatePuzzle(diff);
      expect(checkWin(tubes, TUBE_CAPACITY)).toBe(false);
    });
  });
});
```

- [ ] **Step 2: Run tests — expect failures**

```bash
cd MagicSort && npm test
```

Expected: `Cannot find module '../utils/puzzleGenerator'`.

- [ ] **Step 3: Create `MagicSort/src/utils/puzzleGenerator.ts`**

```ts
import type { Color, Difficulty } from '../types';
import { ALL_COLORS, DIFFICULTY_CONFIGS, TUBE_CAPACITY } from '../types';
import { isValidPour, checkWin } from './winChecker';
import { getTopColor } from './pourLogic';

// Re-export for test imports
export { checkWin };

export function generatePuzzle(difficulty: Difficulty): Color[][] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const colors = ALL_COLORS.slice(0, config.colors);

  // Build solved state
  let tubes: Color[][] = [
    ...colors.map(c => Array<Color>(TUBE_CAPACITY).fill(c)),
    ...Array.from({ length: config.emptyTubes }, () => [] as Color[]),
  ];

  // Scramble with random valid single-segment pours
  const iterations = config.colors * TUBE_CAPACITY * 20;
  for (let i = 0; i < iterations; i++) {
    const candidates: [number, number][] = [];
    for (let f = 0; f < tubes.length; f++) {
      for (let t = 0; t < tubes.length; t++) {
        if (f !== t && isValidPour(tubes[f], tubes[t], TUBE_CAPACITY)) {
          candidates.push([f, t]);
        }
      }
    }
    if (candidates.length === 0) break;
    const [f, t] = candidates[Math.floor(Math.random() * candidates.length)];
    const next = tubes.map(tube => [...tube]);
    next[t].push(next[f].pop()!);
    tubes = next;
  }

  if (checkWin(tubes, TUBE_CAPACITY)) return generatePuzzle(difficulty);
  return tubes;
}

function isValidPour(from: Color[], to: Color[], capacity: number): boolean {
  if (from.length === 0 || to.length >= capacity) return false;
  const fromTop = getTopColor(from);
  const toTop = getTopColor(to);
  if (toTop !== null && toTop !== fromTop) return false;
  return true;
}
```

> Note: `puzzleGenerator.ts` has a local `isValidPour` to avoid a circular dependency with `pourLogic.ts`. The implementation is identical.

- [ ] **Step 4: Run tests — expect all pass**

```bash
cd MagicSort && npm test
```

Expected: all 12 tests pass across the 3 test files.

- [ ] **Step 5: Commit**

```bash
git add MagicSort/src/utils/puzzleGenerator.ts MagicSort/src/__tests__/puzzleGenerator.test.ts
git commit -m "feat(magic-sort): add puzzle generator with passing tests"
```

---

### Task 6: Sounds

**Files:**
- Create: `MagicSort/src/utils/sounds.ts`

- [ ] **Step 1: Create `MagicSort/src/utils/sounds.ts`**

```ts
let audioContext: AudioContext | null = null;

function ctx(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

const VOL = 0.28;

export function playTubeSelect() {
  const c = ctx(); const now = c.currentTime;
  const osc = c.createOscillator(); const gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(650, now + 0.1);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(VOL * 0.5, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.start(now); osc.stop(now + 0.18);
}

export function playPour() {
  const c = ctx(); const now = c.currentTime;
  const bufSize = Math.floor(c.sampleRate * 0.45);
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
  const noise = c.createBufferSource(); noise.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass'; filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(200, now + 0.4); filter.Q.value = 3;
  const gain = c.createGain();
  gain.gain.setValueAtTime(VOL * 0.7, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  noise.connect(filter); filter.connect(gain); gain.connect(c.destination);
  noise.start(now);

  const osc = c.createOscillator(); const og = c.createGain();
  osc.connect(og); og.connect(c.destination);
  osc.type = 'sine'; osc.frequency.setValueAtTime(500, now);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);
  og.gain.setValueAtTime(VOL * 0.3, now);
  og.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
  osc.start(now); osc.stop(now + 0.38);
}

export function playTubeSorted() {
  const c = ctx(); const now = c.currentTime;
  [523, 659, 784].forEach((freq, i) => {
    const osc = c.createOscillator(); const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    const t = now + i * 0.1;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(VOL * 0.45, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.start(t); osc.stop(t + 0.35);
  });
}

export function playWin() {
  const c = ctx(); const now = c.currentTime;
  [523, 659, 784, 1047, 1319].forEach((freq, i) => {
    const osc = c.createOscillator(); const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    const t = now + i * 0.1;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(VOL * 0.55, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.start(t); osc.stop(t + 0.5);
  });
  for (let i = 0; i < 4; i++) {
    const osc = c.createOscillator(); const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine';
    const t = now + 0.5 + i * 0.06;
    osc.frequency.setValueAtTime(2000 + Math.random() * 800, t);
    gain.gain.setValueAtTime(VOL * 0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.start(t); osc.stop(t + 0.12);
  }
}

export function playGameOver() {
  const c = ctx(); const now = c.currentTime;
  [392, 330, 262].forEach((freq, i) => {
    const osc = c.createOscillator(); const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    const t = now + i * 0.18;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(VOL * 0.5, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.start(t); osc.stop(t + 0.4);
  });
}

export function playInvalidMove() {
  const c = ctx(); const now = c.currentTime;
  const osc = c.createOscillator(); const gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.type = 'square'; osc.frequency.value = 110;
  gain.gain.setValueAtTime(VOL * 0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.start(now); osc.stop(now + 0.12);
}

export function playUndo() {
  const c = ctx(); const now = c.currentTime;
  const osc = c.createOscillator(); const gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(380, now + 0.12);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(VOL * 0.4, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.start(now); osc.stop(now + 0.18);
}
```

- [ ] **Step 2: Commit**

```bash
git add MagicSort/src/utils/sounds.ts
git commit -m "feat(magic-sort): add Web Audio API synthesized sounds"
```

---

### Task 7: Zustand store

**Files:**
- Create: `MagicSort/src/store/gameStore.ts`

- [ ] **Step 1: Create `MagicSort/src/store/gameStore.ts`**

```ts
import { create } from 'zustand';
import type { Color, Difficulty, GameStatus, PendingPour } from '../types';
import { DIFFICULTY_CONFIGS, TUBE_CAPACITY } from '../types';
import { generatePuzzle } from '../utils/puzzleGenerator';
import { isValidPour, executePour, getTopColor, getTopColorCount } from '../utils/pourLogic';
import { checkWin, isTubeSorted } from '../utils/winChecker';
import {
  playTubeSelect, playPour, playTubeSorted,
  playWin, playGameOver, playInvalidMove, playUndo,
} from '../utils/sounds';

interface GameState {
  difficulty: Difficulty | null;
  tubes: Color[][];
  initialTubes: Color[][];
  selectedTube: number | null;
  moveCount: number;
  moveLimit: number | null;
  history: Color[][][];
  gameStatus: GameStatus;
  isPouring: boolean;
  pendingPour: PendingPour | null;
  // actions
  startGame: (difficulty: Difficulty) => void;
  selectTube: (index: number) => void;
  completePour: () => void;
  undo: () => void;
  restartPuzzle: () => void;
  goHome: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  difficulty: null,
  tubes: [],
  initialTubes: [],
  selectedTube: null,
  moveCount: 0,
  moveLimit: null,
  history: [],
  gameStatus: 'idle',
  isPouring: false,
  pendingPour: null,

  startGame: (difficulty) => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    const tubes = generatePuzzle(difficulty);
    set({
      difficulty,
      tubes,
      initialTubes: tubes.map(t => [...t]),
      selectedTube: null,
      moveCount: 0,
      moveLimit: config.moveLimit,
      history: [],
      gameStatus: 'playing',
      isPouring: false,
      pendingPour: null,
    });
  },

  selectTube: (index) => {
    const { selectedTube, tubes, difficulty, isPouring } = get();
    if (isPouring || !difficulty) return;
    const config = DIFFICULTY_CONFIGS[difficulty];

    // Deselect if clicking same tube
    if (selectedTube === index) {
      set({ selectedTube: null });
      return;
    }

    // No tube selected — try to select this one
    if (selectedTube === null) {
      if (tubes[index].length === 0) return;
      if (isTubeSorted(tubes[index], config.tubeCapacity)) return;
      set({ selectedTube: index });
      playTubeSelect();
      return;
    }

    // Try pour from selectedTube → index
    if (isValidPour(tubes[selectedTube], tubes[index], config.tubeCapacity)) {
      const fromTube = tubes[selectedTube];
      const color = getTopColor(fromTube)!;
      const count = Math.min(
        getTopColorCount(fromTube),
        config.tubeCapacity - tubes[index].length,
      );
      set({
        pendingPour: { fromIdx: selectedTube, toIdx: index, color, count },
        isPouring: true,
        selectedTube: null,
      });
      playPour();
    } else {
      // Invalid — deselect, then select the clicked tube if it has content
      playInvalidMove();
      if (tubes[index].length > 0 && !isTubeSorted(tubes[index], config.tubeCapacity)) {
        set({ selectedTube: index });
        playTubeSelect();
      } else {
        set({ selectedTube: null });
      }
    }
  },

  completePour: () => {
    const { pendingPour, tubes, history, moveCount, moveLimit, difficulty } = get();
    if (!pendingPour || !difficulty) return;
    const config = DIFFICULTY_CONFIGS[difficulty];

    const newHistory = [...history, tubes.map(t => [...t])];
    const newTubes = executePour(tubes, pendingPour.fromIdx, pendingPour.toIdx, config.tubeCapacity);
    const newMoveCount = moveCount + 1;

    // Play sorted sound if destination tube just completed
    if (isTubeSorted(newTubes[pendingPour.toIdx], config.tubeCapacity)) {
      playTubeSorted();
    }

    const won = checkWin(newTubes, config.tubeCapacity);
    const lost = !won && moveLimit !== null && newMoveCount >= moveLimit;

    let gameStatus: GameStatus = 'playing';
    if (won) { gameStatus = 'won'; playWin(); }
    else if (lost) { gameStatus = 'lost'; playGameOver(); }

    set({
      tubes: newTubes,
      history: newHistory,
      moveCount: newMoveCount,
      pendingPour: null,
      isPouring: false,
      gameStatus,
    });
  },

  undo: () => {
    const { history, moveCount, moveLimit, isPouring } = get();
    if (isPouring || history.length === 0) return;
    const prevTubes = history[history.length - 1];
    const newMoveCount = moveLimit !== null ? moveCount + 1 : moveCount;
    const lost = moveLimit !== null && newMoveCount >= moveLimit;
    set({
      tubes: prevTubes,
      history: history.slice(0, -1),
      moveCount: newMoveCount,
      selectedTube: null,
      gameStatus: lost ? 'lost' : 'playing',
    });
    playUndo();
  },

  restartPuzzle: () => {
    const { initialTubes, difficulty } = get();
    if (!difficulty) return;
    const config = DIFFICULTY_CONFIGS[difficulty];
    set({
      tubes: initialTubes.map(t => [...t]),
      selectedTube: null,
      moveCount: 0,
      moveLimit: config.moveLimit,
      history: [],
      gameStatus: 'playing',
      isPouring: false,
      pendingPour: null,
    });
  },

  goHome: () => {
    set({
      gameStatus: 'idle',
      difficulty: null,
      tubes: [],
      initialTubes: [],
      selectedTube: null,
      moveCount: 0,
      moveLimit: null,
      history: [],
      isPouring: false,
      pendingPour: null,
    });
  },
}));
```

- [ ] **Step 2: Commit**

```bash
git add MagicSort/src/store/gameStore.ts
git commit -m "feat(magic-sort): add Zustand game store with all actions"
```

---

### Task 8: Tube component

**Files:**
- Create: `MagicSort/src/components/Tube.tsx`

- [ ] **Step 1: Create `MagicSort/src/components/Tube.tsx`**

```tsx
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { Color } from '../types';
import { COLOR_GRADIENTS, TUBE_CAPACITY } from '../types';
import { isTubeSorted } from '../utils/winChecker';

interface TubeProps {
  tube: Color[];
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const Tube = forwardRef<HTMLDivElement, TubeProps>(
  ({ tube, isSelected, onClick }, ref) => {
    const sorted = isTubeSorted(tube, TUBE_CAPACITY);
    const empty = tube.length === 0;

    return (
      <motion.div
        className="relative flex flex-col items-center cursor-pointer select-none"
        animate={{
          y: isSelected ? -10 : 0,
          filter: isSelected
            ? 'drop-shadow(0 0 12px rgba(192,132,252,0.9))'
            : sorted
            ? 'drop-shadow(0 0 10px rgba(74,222,128,0.7))'
            : 'none',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        onClick={onClick}
        whileTap={{ scale: 0.96 }}
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
            height: '100%',
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
```

- [ ] **Step 2: Commit**

```bash
git add MagicSort/src/components/Tube.tsx
git commit -m "feat(magic-sort): add Tube component with glass+metallic styling and animations"
```

---

### Task 9: TubeBoard + PourAnimation

**Files:**
- Create: `MagicSort/src/components/PourAnimation.tsx`
- Create: `MagicSort/src/components/TubeBoard.tsx`

- [ ] **Step 1: Create `MagicSort/src/components/PourAnimation.tsx`**

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { COLOR_SOLID } from '../types';
import type { Color } from '../types';

interface PourAnimProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: Color;
  active: boolean;
  onComplete: () => void;
}

export default function PourAnimation({ fromX, fromY, toX, toY, color, active, onComplete }: PourAnimProps) {
  const midX = (fromX + toX) / 2;
  const midY = Math.min(fromY, toY) - 60;

  return (
    <AnimatePresence>
      {active && (
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
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create `MagicSort/src/components/TubeBoard.tsx`**

```tsx
import { useRef, useEffect, useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import Tube from './Tube';
import PourAnimation from './PourAnimation';
import type { Color } from '../types';

interface AnimInfo {
  fromX: number; fromY: number;
  toX: number; toY: number;
  color: Color;
}

export default function TubeBoard() {
  const tubes = useGameStore(s => s.tubes);
  const selectedTube = useGameStore(s => s.selectedTube);
  const pendingPour = useGameStore(s => s.pendingPour);
  const completePour = useGameStore(s => s.completePour);
  const selectTube = useGameStore(s => s.selectTube);

  const boardRef = useRef<HTMLDivElement>(null);
  const tubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animInfo, setAnimInfo] = useState<AnimInfo | null>(null);

  // Compute how many tubes per row based on viewport width
  const tubesPerRow = tubes.length <= 6 ? 3 : tubes.length <= 8 ? 4 : 4;

  useEffect(() => {
    if (!pendingPour || !boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const fromEl = tubeRefs.current[pendingPour.fromIdx];
    const toEl = tubeRefs.current[pendingPour.toIdx];
    if (!fromEl || !toEl) { completePour(); return; }
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    setAnimInfo({
      fromX: fromRect.left + fromRect.width / 2 - boardRect.left,
      fromY: fromRect.top - boardRect.top,
      toX: toRect.left + toRect.width / 2 - boardRect.left,
      toY: toRect.top - boardRect.top,
      color: pendingPour.color,
    });
  }, [pendingPour, completePour]);

  const handleAnimComplete = useCallback(() => {
    setAnimInfo(null);
    completePour();
  }, [completePour]);

  // Responsive tube sizing
  const tubeWidth = Math.min(52, Math.floor((Math.min(window.innerWidth, 480) - 40) / tubesPerRow - 12));
  const tubeHeight = Math.round(tubeWidth * 2.4);

  return (
    <div
      ref={boardRef}
      className="relative flex flex-wrap justify-center gap-3 md:gap-4 px-4 py-6"
      style={{ maxWidth: 560, margin: '0 auto' }}
    >
      {tubes.map((tube, i) => (
        <div
          key={i}
          style={{ width: tubeWidth, height: tubeHeight + 14 }}
          className="flex flex-col"
        >
          <Tube
            ref={el => { tubeRefs.current[i] = el; }}
            tube={tube}
            index={i}
            isSelected={selectedTube === i}
            onClick={() => selectTube(i)}
          />
        </div>
      ))}

      {animInfo && (
        <PourAnimation
          {...animInfo}
          active={true}
          onComplete={handleAnimComplete}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add MagicSort/src/components/PourAnimation.tsx MagicSort/src/components/TubeBoard.tsx
git commit -m "feat(magic-sort): add TubeBoard with responsive layout and PourAnimation"
```

---

### Task 10: HUD components

**Files:**
- Create: `MagicSort/src/components/MoveCounter.tsx`
- Create: `MagicSort/src/components/UndoButton.tsx`

- [ ] **Step 1: Create `MagicSort/src/components/MoveCounter.tsx`**

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function MoveCounter() {
  const moveCount = useGameStore(s => s.moveCount);
  const moveLimit = useGameStore(s => s.moveLimit);

  if (moveLimit === null) return null;

  const remaining = moveLimit - moveCount;
  const isLow = remaining <= 10;
  const isCritical = remaining <= 5;

  return (
    <motion.div
      className="flex flex-col items-center px-3 py-1.5 rounded-xl border"
      style={{
        background: isCritical
          ? 'rgba(248,113,113,0.18)'
          : isLow
          ? 'rgba(250,204,21,0.12)'
          : 'rgba(255,255,255,0.06)',
        borderColor: isCritical
          ? 'rgba(248,113,113,0.5)'
          : isLow
          ? 'rgba(250,204,21,0.4)'
          : 'rgba(255,255,255,0.12)',
      }}
      animate={{ scale: [1, 1.08, 1] }}
      key={moveCount}
      transition={{ duration: 0.25 }}
    >
      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#6b7280', fontSize: 9 }}>
        Moves Left
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={remaining}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="font-bold text-lg leading-none"
          style={{
            color: isCritical ? '#f87171' : isLow ? '#facc15' : '#e2e8f0',
          }}
        >
          {remaining}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `MagicSort/src/components/UndoButton.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function UndoButton() {
  const undo = useGameStore(s => s.undo);
  const history = useGameStore(s => s.history);
  const isPouring = useGameStore(s => s.isPouring);
  const disabled = history.length === 0 || isPouring;

  return (
    <motion.button
      onClick={undo}
      disabled={disabled}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-semibold transition-opacity"
      style={{
        background: 'rgba(255,255,255,0.06)',
        borderColor: 'rgba(255,255,255,0.12)',
        color: disabled ? '#374151' : '#94a3b8',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
      }}
      whileTap={disabled ? {} : { scale: 0.94 }}
    >
      <span style={{ fontSize: 16 }}>↩</span>
      <span style={{ fontSize: 12 }}>Undo</span>
    </motion.button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add MagicSort/src/components/MoveCounter.tsx MagicSort/src/components/UndoButton.tsx
git commit -m "feat(magic-sort): add MoveCounter and UndoButton HUD components"
```

---

### Task 11: Modal components

**Files:**
- Create: `MagicSort/src/components/WinModal.tsx`
- Create: `MagicSort/src/components/GameOverModal.tsx`

- [ ] **Step 1: Create `MagicSort/src/components/WinModal.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { DIFFICULTY_CONFIGS } from '../types';

const CONFETTI_COLORS = ['#ffd60a', '#c77dff', '#4cc9f0', '#06d6a0', '#ff4d6d', '#ff6d00', '#ff70a6', '#00b4d8'];

export default function WinModal() {
  const gameStatus = useGameStore(s => s.gameStatus);
  const moveCount = useGameStore(s => s.moveCount);
  const difficulty = useGameStore(s => s.difficulty);
  const startGame = useGameStore(s => s.startGame);
  const goHome = useGameStore(s => s.goHome);

  if (gameStatus !== 'won' || !difficulty) return null;

  const moveLimit = DIFFICULTY_CONFIGS[difficulty].moveLimit;

  return (
    <motion.div
      className="fixed inset-0 flex items-end justify-center z-50 px-4 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
    >
      {/* Confetti dots */}
      {CONFETTI_COLORS.map((color, i) => (
        <motion.div
          key={i}
          className="fixed rounded-full pointer-events-none"
          style={{
            width: 10, height: 10,
            background: color,
            left: '50%', top: '40%',
            '--tx': `${(Math.random() - 0.5) * 300}px`,
            '--ty': `${(Math.random() - 0.5) * 300}px`,
          } as React.CSSProperties}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.5, 0], x: [(Math.random() - 0.5) * 300], y: [(Math.random() - 0.5) * 300], opacity: [1, 1, 0] }}
          transition={{ duration: 0.9, delay: i * 0.06, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="w-full max-w-sm rounded-3xl p-8 text-center"
        style={{
          background: 'linear-gradient(160deg, #1a1035, #0d0a1a)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          boxShadow: '0 -20px 60px rgba(139,92,246,0.25)',
        }}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
      >
        <div className="text-5xl mb-3">🎉</div>
        <h2
          className="text-2xl font-black mb-2"
          style={{
            background: 'linear-gradient(135deg, #ffd60a, #c77dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Perfectly Sorted!
        </h2>
        <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
          Completed in{' '}
          <span style={{ color: '#c084fc', fontWeight: 700 }}>{moveCount} moves</span>
          {moveLimit && (
            <> out of <span style={{ color: '#94a3b8', fontWeight: 700 }}>{moveLimit}</span></>
          )}{' '}
          on <span style={{ color: '#e2e8f0', fontWeight: 700, textTransform: 'capitalize' }}>{difficulty}</span>
        </p>

        <button
          onClick={() => startGame(difficulty)}
          className="block w-full py-3 rounded-2xl font-bold text-white mb-3 transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #c084fc, #60a5fa)' }}
        >
          Play Again
        </button>
        <button
          onClick={goHome}
          className="block w-full py-3 rounded-2xl font-semibold transition-transform active:scale-95"
          style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Change Difficulty
        </button>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `MagicSort/src/components/GameOverModal.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { isTubeSorted } from '../utils/winChecker';
import { TUBE_CAPACITY } from '../types';

export default function GameOverModal() {
  const gameStatus = useGameStore(s => s.gameStatus);
  const tubes = useGameStore(s => s.tubes);
  const difficulty = useGameStore(s => s.difficulty);
  const restartPuzzle = useGameStore(s => s.restartPuzzle);
  const goHome = useGameStore(s => s.goHome);

  if (gameStatus !== 'lost' || !difficulty) return null;

  const sortedCount = tubes.filter(t => isTubeSorted(t, TUBE_CAPACITY)).length;
  const colorTubes = tubes.filter(t => t.length > 0 || isTubeSorted(t, TUBE_CAPACITY)).length;

  return (
    <motion.div
      className="fixed inset-0 flex items-end justify-center z-50 px-4 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl p-8 text-center"
        style={{
          background: 'linear-gradient(160deg, #1a0d0d, #0d0a1a)',
          border: '1.5px solid rgba(248,113,113,0.2)',
          boxShadow: '0 -20px 60px rgba(248,113,113,0.12)',
        }}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
      >
        <div className="text-5xl mb-3">💔</div>
        <h2 className="text-2xl font-black mb-1" style={{ color: '#f87171' }}>
          Out of Moves!
        </h2>
        <p className="text-sm mb-4" style={{ color: '#6b7280' }}>
          You ran out of moves before all colors were sorted.
        </p>

        <div
          className="flex justify-between items-center rounded-xl px-4 py-3 mb-6 text-sm"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <span style={{ color: '#9ca3af' }}>Tubes sorted</span>
          <span className="font-bold" style={{ color: '#e2e8f0' }}>
            {sortedCount} / {colorTubes}
          </span>
        </div>

        <button
          onClick={restartPuzzle}
          className="block w-full py-3 rounded-2xl font-bold text-white mb-3 transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #f87171, #dc2626)' }}
        >
          ↺ Restart Same Puzzle
        </button>
        <button
          onClick={goHome}
          className="block w-full py-3 rounded-2xl font-semibold transition-transform active:scale-95"
          style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Change Difficulty
        </button>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add MagicSort/src/components/WinModal.tsx MagicSort/src/components/GameOverModal.tsx
git commit -m "feat(magic-sort): add WinModal and GameOverModal components"
```

---

### Task 12: HomeScreen

**Files:**
- Create: `MagicSort/src/screens/HomeScreen.tsx`

- [ ] **Step 1: Create `MagicSort/src/screens/HomeScreen.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import type { Difficulty } from '../types';
import { DIFFICULTY_CONFIGS } from '../types';

const DIFF_STYLES = {
  easy:   { color: '#4ade80', border: 'rgba(74,222,128,0.35)',  bg: 'rgba(74,222,128,0.08)',  emoji: '🌱' },
  medium: { color: '#facc15', border: 'rgba(250,204,21,0.35)',  bg: 'rgba(250,204,21,0.08)',  emoji: '🔥' },
  hard:   { color: '#f87171', border: 'rgba(248,113,113,0.35)', bg: 'rgba(248,113,113,0.08)', emoji: '💀' },
};

export default function HomeScreen() {
  const startGame = useGameStore(s => s.startGame);
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="text-7xl mb-4"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          🧪
        </motion.div>
        <h1
          className="text-4xl font-black tracking-tight mb-2"
          style={{
            background: 'linear-gradient(135deg, #c084fc, #60a5fa, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Magic Sort
        </h1>
        <p className="text-sm tracking-widest uppercase" style={{ color: '#4b5563' }}>
          Color Puzzle
        </p>
      </motion.div>

      {/* Difficulty buttons */}
      <div className="w-full max-w-xs flex flex-col gap-4">
        {difficulties.map((diff, i) => {
          const config = DIFFICULTY_CONFIGS[diff];
          const style = DIFF_STYLES[diff];
          return (
            <motion.button
              key={diff}
              onClick={() => startGame(diff)}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl text-left"
              style={{
                background: style.bg,
                border: `1.5px solid ${style.border}`,
              }}
            >
              <span className="text-2xl">{style.emoji}</span>
              <div>
                <div className="font-bold text-base capitalize" style={{ color: style.color }}>
                  {diff}
                </div>
                <div className="text-xs" style={{ color: '#6b7280' }}>
                  {config.colors} colors · {config.totalTubes} tubes
                  {config.moveLimit ? ` · ${config.moveLimit} moves max` : ' · No move limit'}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add MagicSort/src/screens/HomeScreen.tsx
git commit -m "feat(magic-sort): add HomeScreen with animated difficulty buttons"
```

---

### Task 13: GameScreen

**Files:**
- Create: `MagicSort/src/screens/GameScreen.tsx`

- [ ] **Step 1: Create `MagicSort/src/screens/GameScreen.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import TubeBoard from '../components/TubeBoard';
import MoveCounter from '../components/MoveCounter';
import UndoButton from '../components/UndoButton';
import WinModal from '../components/WinModal';
import GameOverModal from '../components/GameOverModal';

export default function GameScreen() {
  const difficulty = useGameStore(s => s.difficulty);
  const goHome = useGameStore(s => s.goHome);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* HUD */}
      <motion.header
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <UndoButton />

        <button
          onClick={goHome}
          className="flex items-center gap-1.5 text-sm font-semibold capitalize transition-opacity hover:opacity-70"
          style={{ color: '#6b7280' }}
        >
          <span className="text-base">🧪</span>
          <span>{difficulty}</span>
        </button>

        <MoveCounter />
      </motion.header>

      {/* Board */}
      <main className="flex-1 flex items-center justify-center">
        <TubeBoard />
      </main>

      {/* Modals */}
      <WinModal />
      <GameOverModal />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add MagicSort/src/screens/GameScreen.tsx
git commit -m "feat(magic-sort): add GameScreen with HUD and modal wiring"
```

---

### Task 14: App, main, globals

**Files:**
- Create: `MagicSort/src/App.tsx`
- Create: `MagicSort/src/main.tsx`
- Create: `MagicSort/src/styles/globals.css`

- [ ] **Step 1: Create `MagicSort/src/styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

*, *::before, *::after { box-sizing: border-box; }

html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

body {
  background: #0d0a1a;
  background-image:
    radial-gradient(ellipse at 20% 15%, rgba(139,92,246,0.16) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 85%, rgba(59,130,246,0.12) 0%, transparent 55%);
  background-attachment: fixed;
  color: #fff;
  overscroll-behavior: none;
  -webkit-tap-highlight-color: transparent;
}
```

- [ ] **Step 2: Create `MagicSort/src/App.tsx`**

```tsx
import { useGameStore } from './store/gameStore';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const gameStatus = useGameStore(s => s.gameStatus);

  return gameStatus === 'idle' ? <HomeScreen /> : <GameScreen />;
}
```

- [ ] **Step 3: Create `MagicSort/src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 4: Run the dev server and verify the game loads**

```bash
cd MagicSort && npm run dev
```

Open `http://localhost:5173/MagicSort/`. Expected: HomeScreen appears with 3 difficulty buttons. Click Easy, play a few moves, verify pour animation runs and Undo works. Check Medium/Hard shows move counter top-right.

- [ ] **Step 5: Commit**

```bash
git add MagicSort/src/App.tsx MagicSort/src/main.tsx MagicSort/src/styles/globals.css
git commit -m "feat(magic-sort): wire up App, main entry, and global styles"
```

---

### Task 15: Wire up to workspace

**Files:**
- Modify: `vercel.json`
- Modify: `index.html` (root)

- [ ] **Step 1: Update `vercel.json`**

Replace the `buildCommand` value with:

```
mkdir -p dist && cp index.html styles.css dist/ && cp -r assets dist/ && cd AnimalRescue && npm run build && cp -r dist ../dist/AnimalRescue && cd ../CozyKitchen && npm run build && cp -r dist ../dist/CozyKitchen && cd ../MagicSort && npm run build && cp -r dist ../dist/MagicSort
```

Add to `rewrites` array:
```json
{ "source": "/MagicSort/(.*)", "destination": "/MagicSort/index.html" }
```

Add to `headers` array:
```json
{
  "source": "/MagicSort/assets/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
  ]
}
```

- [ ] **Step 2: Add MagicSort card to root `index.html`**

Replace the entire `<article class="game-card coming-soon">` block with:

```html
<article class="game-card" onclick="window.location.href='/MagicSort/'">
  <div class="game-card-inner">
    <div class="game-cover" style="background: linear-gradient(135deg, #1a0a2e, #0d1a2e); display:flex; align-items:center; justify-content:center; font-size: 80px;">
      🧪
    </div>
    <div class="game-info">
      <h2 class="game-title">Magic Sort</h2>
      <p class="game-credit">A Game by Satyarth</p>
      <p class="game-description">Sort vibrant colored liquids into tubes! Choose your difficulty and race against the move limit.</p>
      <div class="game-meta">
        <span class="game-tag">🧪 Puzzle</span>
        <span class="game-tag">🎨 Colors</span>
        <span class="game-tag">🧠 Strategy</span>
      </div>
      <button class="play-button">
        <span class="play-icon">▶</span>
        PLAY NOW
      </button>
    </div>
  </div>
</article>
```

- [ ] **Step 3: Run a full build to verify**

```bash
cd /Users/satyarthn/Workspace/games && npm run build:magic
```

Expected: `MagicSort/dist/` created with `index.html` and `assets/` folder.

- [ ] **Step 4: Commit**

```bash
git add vercel.json index.html
git commit -m "feat(magic-sort): add to workspace index and Vercel config"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Easy/Medium/Hard difficulty with tube counts | Task 2 (types), Task 7 (store) |
| Move limit on Medium (40) and Hard (60) | Task 2, Task 7 |
| Hard has 3 empty tubes | Task 2 |
| Undo counts as move on Medium/Hard | Task 7 `undo()` |
| Game over → restart same puzzle | Task 11 (GameOverModal), Task 7 `restartPuzzle()` |
| Pour animation (arc droplet) | Task 9 (PourAnimation) |
| Sound on pour | Task 6, Task 7 `selectTube()` |
| Move counter top-right, hidden on Easy | Task 10 (MoveCounter) |
| Crystal glass + metallic rim tube style | Task 8 (Tube) |
| Vibrant color gradients | Task 2 (COLOR_GRADIENTS) |
| Sorted tube green glow | Task 8 |
| Selected tube lifts + purple glow | Task 8 |
| Win modal with confetti | Task 11 (WinModal) |
| Responsive layout | Task 9 (TubeBoard, tubeWidth calculation) |
| Puzzle generator — solvable | Task 5 |
| All synthesized sounds | Task 6 |

**No spec gaps found.**

**Type consistency:** `Color[][]`, `PendingPour`, `Difficulty`, `GameStatus` defined in Task 2 and used consistently in Tasks 3–13. `completePour` is defined in Task 7 store and called in Task 9 TubeBoard. `isTubeSorted` imported from `winChecker` in Tasks 7, 11, 13 — consistent.

**No placeholders in plan.**
