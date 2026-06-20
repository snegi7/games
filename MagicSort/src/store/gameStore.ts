import { create } from 'zustand';
import type { Color, Difficulty, GameStatus, PendingPour } from '../types';
import { DIFFICULTY_CONFIGS } from '../types';
import { generatePuzzle } from '../utils/puzzleGenerator';
import { isValidPour, executePour, getTopColor, getTopColorCount } from '../utils/pourLogic';
import { checkWin, isTubeSorted } from '../utils/winChecker';
import {
  playTubeSelect, playPour, playTubeSorted,
  playWin, playGameOver, playInvalidMove, playUndo,
} from '../utils/sounds';

interface GameState {
  difficulty: Difficulty | null;
  tubes: Color[][];
  initialTubes: Color[][];
  selectedTube: number | null;
  moveCount: number;
  moveLimit: number | null;
  history: Color[][][];
  gameStatus: GameStatus;
  isPouring: boolean;
  pendingPour: PendingPour | null;
  // actions
  startGame: (difficulty: Difficulty) => void;
  selectTube: (index: number) => void;
  completePour: () => void;
  undo: () => void;
  restartPuzzle: () => void;
  goHome: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  difficulty: null,
  tubes: [],
  initialTubes: [],
  selectedTube: null,
  moveCount: 0,
  moveLimit: null,
  history: [],
  gameStatus: 'idle',
  isPouring: false,
  pendingPour: null,

  startGame: (difficulty) => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    const tubes = generatePuzzle(difficulty);
    set({
      difficulty,
      tubes,
      initialTubes: tubes.map(t => [...t]),
      selectedTube: null,
      moveCount: 0,
      moveLimit: config.moveLimit,
      history: [],
      gameStatus: 'playing',
      isPouring: false,
      pendingPour: null,
    });
  },

  selectTube: (index) => {
    const { selectedTube, tubes, difficulty, isPouring } = get();
    if (isPouring || !difficulty) return;
    const config = DIFFICULTY_CONFIGS[difficulty];

    // Deselect if clicking same tube
    if (selectedTube === index) {
      set({ selectedTube: null });
      return;
    }

    // No tube selected — try to select this one
    if (selectedTube === null) {
      if (tubes[index].length === 0) return;
      if (isTubeSorted(tubes[index], config.tubeCapacity)) return;
      set({ selectedTube: index });
      playTubeSelect();
      return;
    }

    // Try pour from selectedTube → index
    if (isValidPour(tubes[selectedTube], tubes[index], config.tubeCapacity)) {
      const fromTube = tubes[selectedTube];
      const color = getTopColor(fromTube)!;
      const count = Math.min(
        getTopColorCount(fromTube),
        config.tubeCapacity - tubes[index].length,
      );
      set({
        pendingPour: { fromIdx: selectedTube, toIdx: index, color, count },
        isPouring: true,
        selectedTube: null,
      });
      playPour();
    } else {
      // Invalid — deselect, then select the clicked tube if it has content
      playInvalidMove();
      if (tubes[index].length > 0 && !isTubeSorted(tubes[index], config.tubeCapacity)) {
        set({ selectedTube: index });
        playTubeSelect();
      } else {
        set({ selectedTube: null });
      }
    }
  },

  completePour: () => {
    const { pendingPour, tubes, history, moveCount, moveLimit, difficulty } = get();
    if (!pendingPour || !difficulty) return;
    const config = DIFFICULTY_CONFIGS[difficulty];

    const newHistory = [...history, tubes.map(t => [...t])];
    const newTubes = executePour(tubes, pendingPour.fromIdx, pendingPour.toIdx, config.tubeCapacity);
    const newMoveCount = moveCount + 1;

    // Play sorted sound if destination tube just completed
    if (isTubeSorted(newTubes[pendingPour.toIdx], config.tubeCapacity)) {
      playTubeSorted();
    }

    const won = checkWin(newTubes, config.tubeCapacity);
    const lost = !won && moveLimit !== null && newMoveCount >= moveLimit;

    let gameStatus: GameStatus = 'playing';
    if (won) { gameStatus = 'won'; playWin(); }
    else if (lost) { gameStatus = 'lost'; playGameOver(); }

    set({
      tubes: newTubes,
      history: newHistory,
      moveCount: newMoveCount,
      pendingPour: null,
      isPouring: false,
      gameStatus,
    });
  },

  undo: () => {
    const { history, moveCount, moveLimit, isPouring, gameStatus } = get();
    if (isPouring || history.length === 0 || gameStatus !== 'playing') return;
    const prevTubes = history[history.length - 1];
    const newMoveCount = moveLimit !== null ? moveCount + 1 : moveCount;
    const lost = moveLimit !== null && newMoveCount >= moveLimit;
    set({
      tubes: prevTubes,
      history: history.slice(0, -1),
      moveCount: newMoveCount,
      selectedTube: null,
      gameStatus: lost ? 'lost' : 'playing',
    });
    playUndo();
  },

  restartPuzzle: () => {
    const { initialTubes, difficulty } = get();
    if (!difficulty) return;
    const config = DIFFICULTY_CONFIGS[difficulty];
    set({
      tubes: initialTubes.map(t => [...t]),
      selectedTube: null,
      moveCount: 0,
      moveLimit: config.moveLimit,
      history: [],
      gameStatus: 'playing',
      isPouring: false,
      pendingPour: null,
    });
  },

  goHome: () => {
    set({
      gameStatus: 'idle',
      difficulty: null,
      tubes: [],
      initialTubes: [],
      selectedTube: null,
      moveCount: 0,
      moveLimit: null,
      history: [],
      isPouring: false,
      pendingPour: null,
    });
  },
}));
