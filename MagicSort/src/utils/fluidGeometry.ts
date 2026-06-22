import { TUBE_CAPACITY } from '../types';

export const PARTICLES_PER_SLOT = 12;
export const PARTICLE_RADIUS    = 3;
export const BLOB_RADIUS        = 14;
export const THRESHOLD          = 110;

export function slotCenterY(
  rect: Pick<DOMRect, 'top' | 'bottom'>,
  slotIndex: number,
  capacity: number = TUBE_CAPACITY,
): number {
  const slotH = (rect.bottom - rect.top) / capacity;
  return rect.bottom - slotH * slotIndex - slotH / 2;
}

export function spreadXPositions(
  rect: Pick<DOMRect, 'left' | 'right'>,
  count: number,
  margin: number,
): number[] {
  const innerLeft  = rect.left  + margin;
  const innerRight = rect.right - margin;
  const range      = innerRight - innerLeft;
  return Array.from({ length: count }, () => innerLeft + Math.random() * range);
}
