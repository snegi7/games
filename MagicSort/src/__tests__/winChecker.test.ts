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
