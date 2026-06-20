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
