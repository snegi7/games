import { useRef, useEffect, useCallback } from 'react';
import Matter from 'matter-js';
import type { Color } from '../types';
import {
  PARTICLES_PER_SLOT,
  PARTICLE_RADIUS,
  slotCenterY,
  spreadXPositions,
} from '../utils/fluidGeometry';

const WALL_T = 6;

export interface TubePhysics {
  engine:     Matter.Engine;
  leftWall:   Matter.Body;
  rightWall:  Matter.Body;
  bottomWall: Matter.Body;
  particles:  Matter.Body[];
}

export function useMatterWorld(tubeCount: number) {
  const physicsRef = useRef<TubePhysics[]>([]);

  useEffect(() => {
    physicsRef.current.forEach(p => Matter.Engine.clear(p.engine));
    physicsRef.current = [];

    for (let i = 0; i < tubeCount; i++) {
      const engine     = Matter.Engine.create();
      const leftWall   = Matter.Bodies.rectangle(0, 0, WALL_T, 400, { isStatic: true, label: 'wall' });
      const rightWall  = Matter.Bodies.rectangle(0, 0, WALL_T, 400, { isStatic: true, label: 'wall' });
      const bottomWall = Matter.Bodies.rectangle(0, 0, 200, WALL_T, { isStatic: true, label: 'wall' });
      Matter.Composite.add(engine.world, [leftWall, rightWall, bottomWall]);
      physicsRef.current.push({ engine, leftWall, rightWall, bottomWall, particles: [] });
    }

    return () => {
      physicsRef.current.forEach(p => Matter.Engine.clear(p.engine));
      physicsRef.current = [];
    };
  }, [tubeCount]);

  const reconcile = useCallback((
    tubes:     Color[][],
    tubeRects: (DOMRect | null)[],
  ) => {
    tubes.forEach((tube, i) => {
      const physics = physicsRef.current[i];
      const rect    = tubeRects[i];
      if (!physics || !rect) return;

      // Sync static wall positions
      const cy = (rect.top  + rect.bottom) / 2;
      const cx = (rect.left + rect.right)  / 2;
      Matter.Body.setPosition(physics.leftWall,   { x: rect.left  - WALL_T / 2, y: cy });
      Matter.Body.setPosition(physics.rightWall,  { x: rect.right + WALL_T / 2, y: cy });
      Matter.Body.setPosition(physics.bottomWall, { x: cx, y: rect.bottom + WALL_T / 2 });

      // Remove old particles (keep static walls)
      Matter.Composite.clear(physics.engine.world, true);
      physics.particles = [];

      // Spawn particles for each occupied slot
      tube.forEach((color, slotIdx) => {
        const py = slotCenterY(rect, slotIdx) - 6; // spawn slightly above to drop in
        const xs = spreadXPositions(rect, PARTICLES_PER_SLOT, PARTICLE_RADIUS + 2);
        xs.forEach(x => {
          const body = Matter.Bodies.circle(x, py, PARTICLE_RADIUS, {
            label:      color,
            restitution: 0.1,
            friction:    0.05,
            frictionAir: 0.08,
          });
          physics.particles.push(body);
          Matter.Composite.add(physics.engine.world, body);
        });
      });
    });
  }, []);

  const stepAll = useCallback((dt: number) => {
    physicsRef.current.forEach(p => Matter.Engine.update(p.engine, dt));
  }, []);

  // Apply brief impulse to all particles in a tube (tap/select feedback)
  const jiggle = useCallback((tubeIdx: number) => {
    const physics = physicsRef.current[tubeIdx];
    if (!physics) return;
    physics.particles.forEach(body => {
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.003,
        y: -0.0008,
      });
    });
  }, []);

  // Remove count particles of the given color from tubeIdx (top ones first)
  const drainParticles = useCallback((tubeIdx: number, color: Color, count: number) => {
    const physics = physicsRef.current[tubeIdx];
    if (!physics) return;
    const targets = physics.particles
      .filter(b => b.label === color)
      .sort((a, b) => a.position.y - b.position.y) // ascending y = highest on screen
      .slice(0, count);
    targets.forEach(body => {
      Matter.Composite.remove(physics.engine.world, body);
      const idx = physics.particles.indexOf(body);
      if (idx !== -1) physics.particles.splice(idx, 1);
    });
  }, []);

  return { physicsRef, reconcile, stepAll, jiggle, drainParticles };
}
