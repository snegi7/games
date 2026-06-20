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
  it('returns true same color into same color with space', () => {
    expect(isValidPour([b], [b], 4)).toBe(true);
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
