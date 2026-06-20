import type { Color } from '../types';

export function isTubeSorted(tube: Color[], capacity: number): boolean {
  if (tube.length !== capacity) return false;
  return tube.every(c => c === tube[0]);
}

export function checkWin(tubes: Color[][], capacity: number): boolean {
  return tubes.every(tube => tube.length === 0 || isTubeSorted(tube, capacity));
}
