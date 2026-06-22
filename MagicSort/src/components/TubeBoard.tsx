import { useRef, useEffect, useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import Tube from './Tube';
import FluidCanvas, { type FluidCanvasHandle } from './FluidCanvas';
import { LIFT_PX } from '../utils/pourConstants';

interface AnimInfo {
  pourOffsetX: number;   // how far the source tube must slide (board-relative)
  pourToRight: boolean;
}

function calcTubeWidth(n: number): number {
  if (n === 0) return 72;
  const gap       = 10;
  const available = window.innerWidth - 32;            // 16 px each side
  const natural   = Math.floor((available - (n - 1) * gap) / n);
  return Math.min(82, Math.max(42, natural));
}

export default function TubeBoard() {
  const tubes        = useGameStore(s => s.tubes);
  const selectedTube = useGameStore(s => s.selectedTube);
  const pendingPour  = useGameStore(s => s.pendingPour);
  const completePour = useGameStore(s => s.completePour);
  const selectTubeBase = useGameStore(s => s.selectTube);

  const boardRef  = useRef<HTMLDivElement>(null);
  const tubeRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const fluidRef  = useRef<FluidCanvasHandle>(null);
  const [animInfo, setAnimInfo] = useState<AnimInfo | null>(null);

  const selectTube = useCallback((idx: number) => {
    fluidRef.current?.jiggle(idx);
    selectTubeBase(idx);
  }, [selectTubeBase]);

  const [tubeWidth, setTubeWidth] = useState(() => calcTubeWidth(0));
  const tubeHeight = Math.round(tubeWidth * 3.2);

  // Recalculate width when tube count or window size changes
  useEffect(() => {
    setTubeWidth(calcTubeWidth(tubes.length));
  }, [tubes.length]);

  useEffect(() => {
    const onResize = () => setTubeWidth(calcTubeWidth(tubes.length));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [tubes.length]);

  // When a pour is queued, measure DOM positions and drive the Tube tilt animation.
  // FluidCanvas handles all fluid rendering; we just call completePour when done.
  useEffect(() => {
    if (!pendingPour || !boardRef.current) return;

    const fromEl = tubeRefs.current[pendingPour.fromIdx];
    const toEl   = tubeRefs.current[pendingPour.toIdx];
    if (!fromEl || !toEl) { completePour(); return; }

    const boardRect = boardRef.current.getBoundingClientRect();
    const fromRect  = fromEl.getBoundingClientRect();
    const toRect    = toEl.getBoundingClientRect();

    const fromCX = fromRect.left + fromRect.width  / 2 - boardRect.left;
    const toCX   = toRect.left   + toRect.width    / 2 - boardRect.left;

    const pourToRight = toRect.left >= fromRect.left;
    const pourOffsetX = toCX - fromCX;  // center-to-center; rim offset handled by Tube

    setAnimInfo({ pourOffsetX, pourToRight });
  }, [pendingPour, completePour]);

  return (
    <div
      ref={boardRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 10,
        padding: `${LIFT_PX + 20}px 16px 32px`,
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'auto',
      }}
    >
      <FluidCanvas
        ref={fluidRef}
        tubeRefs={tubeRefs}
        tubeCount={tubes.length}
        tubeHeight={tubeHeight}
      />

      {tubes.map((tube, i) => {
        const isFrom = animInfo !== null && pendingPour?.fromIdx === i;
        return (
          <Tube
            key={i}
            ref={el => { tubeRefs.current[i] = el; }}
            tube={tube}
            index={i}
            isSelected={selectedTube === i}
            onClick={() => selectTube(i)}
            tubeWidth={tubeWidth}
            tubeHeight={tubeHeight}
            isPouringFrom={isFrom}
            pourToRight={animInfo?.pourToRight ?? false}
            pourOffsetX={isFrom ? (animInfo?.pourOffsetX ?? 0) : 0}
          />
        );
      })}
    </div>
  );
}
