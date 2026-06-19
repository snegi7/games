# Magic Sort — Game Design Spec

Date: 2026-06-19  
Status: Approved

---

## Overview

Magic Sort is a color-sorting puzzle game. The player sorts colored liquid segments into tubes so that each tube contains exactly one color. It follows the same tech stack and project structure as AnimalRescue and CozyKitchen.

---

## Tech Stack

Matches existing games exactly:

- **React 18 + TypeScript** — component framework
- **Vite** — build tool
- **Framer Motion** — all animations
- **Zustand** — game state
- **Tailwind CSS** — styling (following CozyKitchen)
- **Web Audio API** — synthesized sounds, no audio files

Located at `/games/MagicSort/` as a sibling to AnimalRescue and CozyKitchen.

---

## Game Rules

- Each tube holds exactly **4 color segments**.
- A valid pour: top color of source tube matches top color of destination tube (or destination is empty), and destination has space.
- When multiple consecutive segments of the same color sit at the top of a tube, they all pour together in one move.
- A tube is **sorted** when all 4 segments are the same color.
- The game is **won** when every non-empty tube contains exactly one color filling all 4 slots (i.e. all color tubes are fully sorted).
- **Undo** restores the previous tube state. On Medium and Hard it counts as a move.

---

## Difficulty Levels

| Difficulty | Colors | Empty tubes | Total tubes | Move limit |
|---|---|---|---|---|
| Easy | 4 | 2 | 6 | None |
| Medium | 6 | 2 | 8 | 40 moves |
| Hard | 8 | 3 | 11 | 60 moves |

On Medium and Hard, a move counter is shown in the top-right. When moves reach 0 the game ends immediately.

---

## Puzzle Generation

1. Start from the solved state: N tubes each filled with 4 of the same color, plus empty buffer tubes.
2. Apply many random valid reverse-moves to scramble (guarantees solvability).
3. Validate the scrambled state is not trivially solved before presenting it to the player.
4. The same scrambled puzzle is stored in state so "Restart Same Puzzle" can replay it.

---

## Screens

### Home Screen
- Game title + subtitle.
- Three difficulty buttons (Easy / Medium / Hard), each showing color count, tube count, and move limit (or "No limit" for Easy).
- Buttons use green / yellow / red color coding.

### Game Screen
- **HUD top bar**: Undo button (left) · difficulty label (center) · move counter (right, hidden on Easy).
- **Tube board**: responsive grid of tubes, scales to fill available viewport.
- Sorted tubes glow green. Selected tube lifts upward with a purple glow ring.
- Move counter badge pulses on each decrement.

### Win Screen (modal overlay)
- Confetti burst animation.
- "Perfectly Sorted!" heading.
- Stats: moves used, difficulty.
- Buttons: Play Again (new puzzle, same difficulty) · Change Difficulty.

### Game Over Screen (modal overlay, Medium/Hard only)
- "Out of Moves!" heading.
- Shows how many tubes were sorted out of total.
- Buttons: Restart Same Puzzle · Change Difficulty.

---

## Visual Design

### Tube Style (A + B hybrid)
- **Body**: clear glass — `rgba` background with left-edge highlight stripe (::after pseudo-element).
- **Rim**: metallic cap at the tube opening — gradient from light silver to mid-grey, inset highlight, shadow below.
- **Liquid segments**: vibrant gradients (two-stop, 135°). Each segment has a subtle sheen line at its top edge.
- Sorted tube: green glow border + box-shadow.
- Selected tube: purple glow border + `translateY(-8px)` lift.

### Color Palette (8 vibrant colors)
| Name | Gradient |
|---|---|
| Red | `#ff4d6d → #c9184a` |
| Blue | `#4cc9f0 → #4361ee` |
| Green | `#06d6a0 → #1b998b` |
| Yellow | `#ffd60a → #f48c06` |
| Purple | `#c77dff → #7b2d8b` |
| Orange | `#ff6d00 → #f4511e` |
| Pink | `#ff70a6 → #ff3c83` |
| Teal | `#00b4d8 → #0077b6` |

Easy uses colors 1–4. Medium uses 1–6. Hard uses all 8.

### Background
Deep dark purple (`#0d0a1a`) with two subtle radial gradient blobs (purple + blue) matching the magical theme.

---

## Animations (Framer Motion)

| Event | Animation |
|---|---|
| Tube selected | `y: -8px`, purple glow ring, spring physics |
| Tube deselected | Spring back to `y: 0` |
| Pour (droplet arc) | Framer Motion keyframes: floating color block arcs from source tube rim to destination tube, fades into fill |
| Segment fill | Destination segments animate `height: 0 → 24px` from bottom up |
| Tube sorted | Scale pulse + green glow intensifies |
| Win | Modal slides up + confetti dots burst outward with staggered spring |
| Game over | Board shakes (`x` oscillation) + modal slides up |
| Move counter decrement | Badge scale pulse + color shift toward red as limit approaches |
| Invalid move | Source tube `x` shake (short) |

---

## Sounds (Web Audio API — synthesized)

| Event | Sound |
|---|---|
| Tube select | Soft rising chime (sine, 400→600 Hz) |
| Pour | Liquid gurgle (filtered noise + descending oscillator, ~0.4s) |
| Tube sorted | Ascending 3-note arpeggio (C5–E5–G5) |
| Win | Full major chord fanfare with shimmer |
| Game over | Descending minor triad |
| Invalid move | Short buzz (square wave, 120 Hz) |
| Undo | Reverse chime (descending sine, 600→400 Hz) |

---

## Responsiveness

- Tube size and count per row computed from `Math.min(window.innerWidth, window.innerHeight)`.
- Mobile portrait: 3–4 tubes per row.
- Tablet / desktop: all tubes in 1–2 rows, never overflowing.
- All interactive tap targets ≥ 44px wide.
- HUD text scales with `clamp()`.

---

## Project Structure

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
    App.tsx
    types/index.ts
    store/gameStore.ts
    components/
      TubeBoard.tsx
      Tube.tsx
      PourAnimation.tsx
      MoveCounter.tsx
      UndoButton.tsx
      WinModal.tsx
      GameOverModal.tsx
      DifficultyButton.tsx
    screens/
      HomeScreen.tsx
      GameScreen.tsx
    utils/
      puzzleGenerator.ts
      pourLogic.ts
      winChecker.ts
      sounds.ts
    styles/
      globals.css
```

---

## State Shape (Zustand)

```ts
interface GameState {
  difficulty: 'easy' | 'medium' | 'hard' | null;
  tubes: Color[][];          // each inner array is bottom→top
  initialTubes: Color[][];   // saved for restart
  selectedTube: number | null;
  moveCount: number;
  moveLimit: number | null;  // null on Easy
  history: Color[][][];      // stack of previous tube states for undo
  gameStatus: 'idle' | 'playing' | 'won' | 'lost';
  isPouring: boolean;        // animation lock
}
```

---

## Out of Scope

- Hint system
- Persistent high scores
- Multiple puzzle packs / themes
- Timer-based mode
- Multiplayer
