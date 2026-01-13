// Game configuration constants
export const GAME_CONFIG = {
  MAX_INGREDIENTS: 10,
  STARTING_COINS: 20,
  COOKING_TIME_SECONDS: 5,
} as const;

// Ingredient type
export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  price: number;
  category: 'protein' | 'vegetable' | 'dairy' | 'grain' | 'spice' | 'fruit' | 'other';
}

// Recipe type
export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  ingredients: string[]; // Array of ingredient IDs
  sellPrice: number;
  unlockPrice: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

// Player's owned ingredient (with quantity tracking if needed later)
export interface OwnedIngredient {
  ingredientId: string;
  quantity: number;
}

// Game state
export interface GameState {
  coins: number;
  ownedIngredients: OwnedIngredient[];
  unlockedRecipeIds: string[];
  selectedRecipeId: string | null;
  cookingState: CookingState;
  droppedIngredients: string[]; // IDs of ingredients dropped into the pot
}

// Cooking state machine
export type CookingState = 
  | { phase: 'idle' }
  | { phase: 'selecting' }
  | { phase: 'adding-ingredients' }
  | { phase: 'cooking'; timeRemaining: number }
  | { phase: 'done'; recipeId: string }
  | { phase: 'sold' };
