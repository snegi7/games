import { create } from 'zustand';
import { GameState, OwnedIngredient, GAME_CONFIG } from '../types';
import { STARTING_RECIPE_IDS, getRecipeById, RECIPES } from '../data/recipes';
import { getIngredientById } from '../data/ingredients';

interface GameActions {
  // Coin management
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  
  // Ingredient management
  buyIngredient: (ingredientId: string) => boolean;
  useIngredient: (ingredientId: string) => boolean;
  disposeIngredient: (ingredientId: string) => void;
  hasIngredient: (ingredientId: string) => boolean;
  canAddIngredient: () => boolean;
  
  // Recipe management
  unlockRecipe: (recipeId: string) => boolean;
  isRecipeUnlocked: (recipeId: string) => boolean;
  selectRecipe: (recipeId: string | null) => void;
  
  // Cooking
  startCooking: () => void;
  dropIngredient: (ingredientId: string) => void;
  removeDroppedIngredient: (ingredientId: string) => void;
  cook: () => void;
  updateCookingTimer: (timeRemaining: number) => void;
  finishCooking: () => void;
  sellDish: () => number;
  resetCooking: () => void;
  
  // Game state
  resetGame: () => void;
}

type GameStore = GameState & GameActions;

// Initial ingredients player starts with
const STARTING_INGREDIENTS: OwnedIngredient[] = [
  { ingredientId: 'egg', quantity: 2 },
  { ingredientId: 'butter', quantity: 1 },
  { ingredientId: 'salt', quantity: 1 },
  { ingredientId: 'bread', quantity: 1 },
];

const initialState: GameState = {
  coins: GAME_CONFIG.STARTING_COINS,
  ownedIngredients: STARTING_INGREDIENTS,
  unlockedRecipeIds: STARTING_RECIPE_IDS,
  selectedRecipeId: null,
  cookingState: { phase: 'idle' },
  droppedIngredients: [],
};

export const useGameStore = create<GameStore>()(
  (set, get) => ({
    ...initialState,
      
      // Coin management
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      
      spendCoins: (amount) => {
        const { coins } = get();
        if (coins >= amount) {
          set({ coins: coins - amount });
          return true;
        }
        return false;
      },
      
      // Ingredient management
      buyIngredient: (ingredientId) => {
        const ingredient = getIngredientById(ingredientId);
        if (!ingredient) return false;
        
        const { coins, ownedIngredients } = get();
        
        // Check if we can add more ingredients
        const totalIngredients = ownedIngredients.reduce((sum, oi) => sum + oi.quantity, 0);
        if (totalIngredients >= GAME_CONFIG.MAX_INGREDIENTS) return false;
        
        // Check if we have enough coins
        if (coins < ingredient.price) return false;
        
        // Buy the ingredient
        set((state) => {
          const existing = state.ownedIngredients.find(oi => oi.ingredientId === ingredientId);
          if (existing) {
            return {
              coins: state.coins - ingredient.price,
              ownedIngredients: state.ownedIngredients.map(oi =>
                oi.ingredientId === ingredientId
                  ? { ...oi, quantity: oi.quantity + 1 }
                  : oi
              ),
            };
          } else {
            return {
              coins: state.coins - ingredient.price,
              ownedIngredients: [...state.ownedIngredients, { ingredientId, quantity: 1 }],
            };
          }
        });
        return true;
      },
      
      useIngredient: (ingredientId) => {
        const { ownedIngredients } = get();
        const owned = ownedIngredients.find(oi => oi.ingredientId === ingredientId);
        if (!owned || owned.quantity <= 0) return false;
        
        set((state) => ({
          ownedIngredients: state.ownedIngredients
            .map(oi =>
              oi.ingredientId === ingredientId
                ? { ...oi, quantity: oi.quantity - 1 }
                : oi
            )
            .filter(oi => oi.quantity > 0),
        }));
        return true;
      },
      
      disposeIngredient: (ingredientId) => {
        set((state) => ({
          ownedIngredients: state.ownedIngredients
            .map(oi =>
              oi.ingredientId === ingredientId
                ? { ...oi, quantity: oi.quantity - 1 }
                : oi
            )
            .filter(oi => oi.quantity > 0),
        }));
      },
      
      hasIngredient: (ingredientId) => {
        const { ownedIngredients } = get();
        const owned = ownedIngredients.find(oi => oi.ingredientId === ingredientId);
        return owned !== undefined && owned.quantity > 0;
      },
      
      canAddIngredient: () => {
        const { ownedIngredients } = get();
        const totalIngredients = ownedIngredients.reduce((sum, oi) => sum + oi.quantity, 0);
        return totalIngredients < GAME_CONFIG.MAX_INGREDIENTS;
      },
      
      // Recipe management
      unlockRecipe: (recipeId) => {
        const recipe = getRecipeById(recipeId);
        if (!recipe) return false;
        
        const { coins, unlockedRecipeIds } = get();
        if (unlockedRecipeIds.includes(recipeId)) return false;
        if (coins < recipe.unlockPrice) return false;
        
        set((state) => ({
          coins: state.coins - recipe.unlockPrice,
          unlockedRecipeIds: [...state.unlockedRecipeIds, recipeId],
        }));
        return true;
      },
      
      isRecipeUnlocked: (recipeId) => {
        return get().unlockedRecipeIds.includes(recipeId);
      },
      
      selectRecipe: (recipeId) => {
        set({ 
          selectedRecipeId: recipeId,
          cookingState: recipeId ? { phase: 'selecting' } : { phase: 'idle' },
          droppedIngredients: [],
        });
      },
      
      // Cooking
      startCooking: () => {
        set({ cookingState: { phase: 'adding-ingredients' }, droppedIngredients: [] });
      },
      
      dropIngredient: (ingredientId) => {
        const { droppedIngredients, selectedRecipeId } = get();
        if (droppedIngredients.includes(ingredientId)) return;
        
        const recipe = getRecipeById(selectedRecipeId || '');
        if (!recipe) return;
        
        // Only allow dropping ingredients that are in the recipe
        if (!recipe.ingredients.includes(ingredientId)) return;
        
        // Use the ingredient from inventory
        const used = get().useIngredient(ingredientId);
        if (!used) return;
        
        set((state) => ({
          droppedIngredients: [...state.droppedIngredients, ingredientId],
        }));
      },
      
      removeDroppedIngredient: (ingredientId) => {
        set((state) => ({
          droppedIngredients: state.droppedIngredients.filter(id => id !== ingredientId),
        }));
        // Return ingredient to inventory
        const ingredient = getIngredientById(ingredientId);
        if (ingredient) {
          set((state) => {
            const existing = state.ownedIngredients.find(oi => oi.ingredientId === ingredientId);
            if (existing) {
              return {
                ownedIngredients: state.ownedIngredients.map(oi =>
                  oi.ingredientId === ingredientId
                    ? { ...oi, quantity: oi.quantity + 1 }
                    : oi
                ),
              };
            } else {
              return {
                ownedIngredients: [...state.ownedIngredients, { ingredientId, quantity: 1 }],
              };
            }
          });
        }
      },
      
      cook: () => {
        set({ cookingState: { phase: 'cooking', timeRemaining: GAME_CONFIG.COOKING_TIME_SECONDS } });
      },
      
      updateCookingTimer: (timeRemaining) => {
        set({ cookingState: { phase: 'cooking', timeRemaining } });
      },
      
      finishCooking: () => {
        const { selectedRecipeId } = get();
        if (selectedRecipeId) {
          set({ cookingState: { phase: 'done', recipeId: selectedRecipeId } });
        }
      },
      
      sellDish: () => {
        const { cookingState } = get();
        if (cookingState.phase !== 'done') return 0;
        
        const recipe = getRecipeById(cookingState.recipeId);
        if (!recipe) return 0;
        
        const earnedCoins = recipe.sellPrice;
        set((state) => ({
          coins: state.coins + earnedCoins,
          cookingState: { phase: 'sold' },
        }));
        
        return earnedCoins;
      },
      
      resetCooking: () => {
        set({
          cookingState: { phase: 'idle' },
          selectedRecipeId: null,
          droppedIngredients: [],
        });
      },
      
    // Game state
    resetGame: () => {
      set(initialState);
    },
  })
);

// Selector hooks for derived state
export const useSelectedRecipe = () => {
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  return selectedRecipeId ? getRecipeById(selectedRecipeId) : null;
};

export const useCanCookSelectedRecipe = () => {
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  const droppedIngredients = useGameStore((state) => state.droppedIngredients);
  
  if (!selectedRecipeId) return false;
  
  const recipe = getRecipeById(selectedRecipeId);
  if (!recipe) return false;
  
  // Check if all ingredients have been dropped
  return recipe.ingredients.every(id => droppedIngredients.includes(id));
};

export const useMissingIngredients = () => {
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  const ownedIngredients = useGameStore((state) => state.ownedIngredients);
  const droppedIngredients = useGameStore((state) => state.droppedIngredients);
  
  if (!selectedRecipeId) return [];
  
  const recipe = getRecipeById(selectedRecipeId);
  if (!recipe) return [];
  
  // Get ingredients that aren't owned and haven't been dropped
  return recipe.ingredients.filter(id => {
    if (droppedIngredients.includes(id)) return false;
    const owned = ownedIngredients.find(oi => oi.ingredientId === id);
    return !owned || owned.quantity <= 0;
  });
};

export const useAllRecipesSorted = () => {
  const unlockedRecipeIds = useGameStore((state) => state.unlockedRecipeIds);
  
  return [...RECIPES].sort((a, b) => {
    const aUnlocked = unlockedRecipeIds.includes(a.id);
    const bUnlocked = unlockedRecipeIds.includes(b.id);
    
    if (aUnlocked && !bUnlocked) return -1;
    if (!aUnlocked && bUnlocked) return 1;
    return a.unlockPrice - b.unlockPrice;
  });
};
