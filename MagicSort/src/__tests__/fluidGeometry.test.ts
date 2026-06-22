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
