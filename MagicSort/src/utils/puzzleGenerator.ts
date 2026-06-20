import type { Color, Difficulty } from '../types';
import { ALL_COLORS, DIFFICULTY_CONFIGS, TUBE_CAPACITY } from '../types';
import { checkWin } from './winChecker';

export function generatePuzzle(difficulty: Difficulty): Color[][] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const colors = ALL_COLORS.slice(0, config.colors);

  for (let attempt = 0; attempt < 50; attempt++) {
    // Pool of all color units, then Fisher-Yates shuffle for thorough mixing
    const pool: Color[] = [];
    for (const c of colors) {
      for (let i = 0; i < TUBE_CAPACITY; i++) pool.push(c);
    }
    fisherYates(pool);

    // Fill colored tubes from shuffled pool, add empty tubes
    const tubes: Color[][] = [];
    for (let i = 0; i < colors.length; i++) {
      tubes.push(pool.slice(i * TUBE_CAPACITY, (i + 1) * TUBE_CAPACITY));
    }
    for (let i = 0; i < config.emptyTubes; i++) {
      tubes.push([]);
    }

    // Reject if accidentally solved or any tube is already fully sorted
    if (!checkWin(tubes, TUBE_CAPACITY) && !hasPresortedTube(tubes)) return tubes;
  }

  throw new Error(`generatePuzzle: failed after 50 attempts (difficulty: ${difficulty})`);
}

function fisherYates<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function hasPresortedTube(tubes: Color[][]): boolean {
  return tubes.some(tube => tube.length === TUBE_CAPACITY && tube.every(c => c === tube[0]));
}
