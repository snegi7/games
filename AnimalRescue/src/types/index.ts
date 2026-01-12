// ============================================
// CORE TYPES FOR ANIMAL RESCUE GAME
// ============================================

// User types - structured for future backend integration
export interface User {
  id?: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Question types - extensible for different categories
export type QuestionCategory = 'math' | 'geography' | 'science' | 'history';

export interface Question {
  id: string;
  category: QuestionCategory;
  ageLevel: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
  bonusTime?: number; // Extra seconds for word problems
}

// Creature types for plots
export interface Creature {
  id: string;
  name: string;
  emoji: string;
  description: string;
  savedState: 'pending' | 'saved' | 'lost';
  trivia: [string, string, string]; // 3 cool facts about the animal
}

// Plot types - extensible for adding more plots
export interface Plot {
  id: string;
  title: string;
  description: string;
  backgroundType: 'forest-fire' | 'oil-spill' | 'flood' | 'storm' | 'earthquake' | 'zoo-breakout' | 'drought' | 'volcano' | 'pollution' | 'arctic';
  musicFile: string; // Background music file name (in public/sounds/)
  creatures: Creature[];
  questionsPerCreature: number;
  timePerQuestion: number; // in seconds
}

// Game state types
export type GameScreen = 'age-selection' | 'plot' | 'gameplay' | 'result' | 'animal-trivia';

export interface GameProgress {
  currentPlot: Plot | null;
  currentCreatureIndex: number;
  currentQuestionIndex: number;
  savedCreatures: Creature[];
  lostCreatures: Creature[];
  questionsAnswered: number;
  correctAnswers: number;
}

export interface GameSession {
  id?: string;
  userId?: string;
  plotId: string;
  startedAt: Date;
  completedAt?: Date;
  score: number;
  savedCount: number;
  totalCreatures: number;
}

// API Response types - for future backend integration
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Game configuration - easily modifiable
export interface GameConfig {
  minAge: number;
  maxAge: number;
  defaultTimePerQuestion: number;
  defaultQuestionsPerCreature: number;
}

export const DEFAULT_GAME_CONFIG: GameConfig = {
  minAge: 6,
  maxAge: 14,
  defaultTimePerQuestion: 10,
  defaultQuestionsPerCreature: 3,
};
