import { useRef, useEffect, useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import Tube from './Tube';
import PourAnimation from './PourAnimation';
import type { Color } from '../types';

interface AnimInfo {
  fromX: number; fromY: number;
  toX: number; toY: number;
  color: Color;
}

export default function TubeBoard() {
  const tubes = useGameStore(s => s.tubes);
  const selectedTube = useGameStore(s => s.selectedTube);
  const pendingPour = useGameStore(s => s.pendingPour);
  const completePour = useGameStore(s => s.completePour);
  const selectTube = useGameStore(s => s.selectTube);

  const boardRef = useRef<HTMLDivElement>(null);
  const tubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animInfo, setAnimInfo] = useState<AnimInfo | null>(null);

  // Compute how many tubes per row based on viewport width
  const tubesPerRow = tubes.length <= 6 ? 3 : tubes.length <= 8 ? 4 : 5;

  useEffect(() => {
    if (!pendingPour || !boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const fromEl = tubeRefs.current[pendingPour.fromIdx];
    const toEl = tubeRefs.current[pendingPour.toIdx];
    if (!fromEl || !toEl) { completePour(); return; }
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    setAnimInfo({
      fromX: fromRect.left + fromRect.width / 2 - boardRect.left,
      fromY: fromRect.top - boardRect.top,
      toX: toRect.left + toRect.width / 2 - boardRect.left,
      toY: toRect.top - boardRect.top,
      color: pendingPour.color,
    });
  }, [pendingPour, completePour]);

  const handleAnimComplete = useCallback(() => {
    setAnimInfo(null);
    completePour();
  }, [completePour]);

  const calcTubeWidth = (perRow: number) =>
    Math.min(52, Math.floor((Math.min(window.innerWidth, 480) - 40) / perRow - 12));

  const [tubeWidth, setTubeWidth] = useState(() => calcTubeWidth(tubesPerRow));
  const tubeHeight = Math.round(tubeWidth * 2.4);

  useEffect(() => {
    const onResize = () => setTubeWidth(calcTubeWidth(tubesPerRow));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [tubesPerRow]);

  return (
    <div
      ref={boardRef}
      className="relative flex flex-wrap justify-center gap-3 md:gap-4 px-4 py-6"
      style={{ maxWidth: 560, margin: '0 auto' }}
    >
      {tubes.map((tube, i) => (
        <div
          key={i}
          style={{ width: tubeWidth, height: tubeHeight + 14 }}
          className="flex flex-col"
        >
          <Tube
            ref={el => { tubeRefs.current[i] = el; }}
            tube={tube}
            index={i}
            isSelected={selectedTube === i}
            onClick={() => selectTube(i)}
          />
        </div>
      ))}

      {animInfo && (
        <PourAnimation
          {...animInfo}
          onComplete={handleAnimComplete}
        />
      )}
    </div>
  );
}
