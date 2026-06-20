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
