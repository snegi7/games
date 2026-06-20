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

  const calcTubeWidth = (perRow: number) => {
    const available = Math.min(window.innerWidth, 700) - 40;
    const natural = Math.floor(available / perRow - 16);
    return Math.min(100, Math.max(44, natural));
  };

  const [tubeWidth, setTubeWidth] = useState(() => calcTubeWidth(tubesPerRow));
  const tubeHeight = Math.round(tubeWidth * 3);

  useEffect(() => {
    const onResize = () => setTubeWidth(calcTubeWidth(tubesPerRow));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [tubesPerRow]);

  return (
    <div
      ref={boardRef}
      className="relative flex flex-wrap justify-center gap-4 md:gap-5 px-4 py-6"
      style={{ maxWidth: 720, margin: '0 auto' }}
    >
      {tubes.map((tube, i) => (
        <Tube
          key={i}
          ref={el => { tubeRefs.current[i] = el; }}
          tube={tube}
          index={i}
          isSelected={selectedTube === i}
          onClick={() => selectTube(i)}
          tubeWidth={tubeWidth}
          tubeHeight={tubeHeight}
        />
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
