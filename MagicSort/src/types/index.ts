export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'teal';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface DifficultyConfig {
  colors: number;
  emptyTubes: number;
  totalTubes: number;
  moveLimit: number | null;
  tubeCapacity: number;
}

export interface PendingPour {
  fromIdx: number;
  toIdx: number;
  color: Color;
  count: number;
}

export const TUBE_CAPACITY = 4;

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy:   { colors: 4, emptyTubes: 2, totalTubes: 6,  moveLimit: null, tubeCapacity: TUBE_CAPACITY },
  medium: { colors: 6, emptyTubes: 2, totalTubes: 8,  moveLimit: 40,  tubeCapacity: TUBE_CAPACITY },
  hard:   { colors: 8, emptyTubes: 3, totalTubes: 11, moveLimit: 60,  tubeCapacity: TUBE_CAPACITY },
};

export const ALL_COLORS: Color[] = [
  'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal',
];

export const COLOR_GRADIENTS: Record<Color, string> = {
  red:    'linear-gradient(135deg, #ff4d6d, #c9184a)',
  blue:   'linear-gradient(135deg, #4cc9f0, #4361ee)',
  green:  'linear-gradient(135deg, #06d6a0, #1b998b)',
  yellow: 'linear-gradient(135deg, #ffd60a, #f48c06)',
  purple: 'linear-gradient(135deg, #c77dff, #7b2d8b)',
  orange: 'linear-gradient(135deg, #ff6d00, #f4511e)',
  pink:   'linear-gradient(135deg, #ff70a6, #ff3c83)',
  teal:   'linear-gradient(135deg, #00b4d8, #0077b6)',
};

export const COLOR_SOLID: Record<Color, string> = {
  red:    '#ff4d6d',
  blue:   '#4cc9f0',
  green:  '#06d6a0',
  yellow: '#ffd60a',
  purple: '#c77dff',
  orange: '#ff6d00',
  pink:   '#ff70a6',
  teal:   '#00b4d8',
};
