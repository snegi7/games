import type { Color, Difficulty } from '../types';
import { ALL_COLORS, DIFFICULTY_CONFIGS, TUBE_CAPACITY } from '../types';
import { getTopColor } from './pourLogic';
import { checkWin } from './winChecker';

export function generatePuzzle(difficulty: Difficulty): Color[][] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const colors = ALL_COLORS.slice(0, config.colors);

  for (let attempt = 0; attempt < 10; attempt++) {
    // Build solved state
    let tubes: Color[][] = [
      ...colors.map(c => Array<Color>(TUBE_CAPACITY).fill(c)),
      ...Array.from({ length: config.emptyTubes }, () => [] as Color[]),
    ];

    // Scramble with random valid single-segment pours
    // Single-segment moves (not batch) give finer-grained shuffling
    const iterations = config.colors * TUBE_CAPACITY * 20;
    for (let i = 0; i < iterations; i++) {
      const candidates: [number, number][] = [];
      for (let f = 0; f < tubes.length; f++) {
        for (let t = 0; t < tubes.length; t++) {
          if (f !== t && localIsValidPour(tubes[f], tubes[t], TUBE_CAPACITY)) {
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

    if (!checkWin(tubes, TUBE_CAPACITY)) return tubes;
  }

  throw new Error(`generatePuzzle: failed to produce unsolved state after 10 attempts (difficulty: ${difficulty})`);
}

function localIsValidPour(from: Color[], to: Color[], capacity: number): boolean {
  if (from.length === 0 || to.length >= capacity) return false;
  const fromTop = getTopColor(from);
  const toTop = getTopColor(to);
  if (toTop !== null && toTop !== fromTop) return false;
  return true;
}
