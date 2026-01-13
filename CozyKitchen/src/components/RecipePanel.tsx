import { useState } from 'react';
import { useGameStore, useAllRecipesSorted } from '../store/gameStore';
import { RecipeCard } from './RecipeCard';
import { RecipeModal } from './RecipeModal';
import { Recipe } from '../types';

interface RecipePanelProps {
  onRecipeSelect?: () => void;
}

export const RecipePanel: React.FC<RecipePanelProps> = ({ onRecipeSelect }) => {
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  const unlockedRecipeIds = useGameStore((state) => state.unlockedRecipeIds);
  const selectRecipe = useGameStore((state) => state.selectRecipe);
  const cookingState = useGameStore((state) => state.cookingState);
  const recipes = useAllRecipesSorted();
  
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);
  
  const handleRecipeClick = (recipe: Recipe) => {
    const isUnlocked = unlockedRecipeIds.includes(recipe.id);
    
    if (!isUnlocked) {
      // Show purchase modal
      setModalRecipe(recipe);
    } else if (cookingState.phase === 'idle' || cookingState.phase === 'selecting') {
      // Select the recipe
      if (selectedRecipeId === recipe.id) {
        selectRecipe(null);
      } else {
        selectRecipe(recipe.id);
        onRecipeSelect?.();
      }
    }
  };
  
  return (
    <>
      <div className="recipe-panel bg-gradient-to-b from-purple-100 to-pink-50 md:border-r-4 border-purple-300 h-full flex flex-col">
        <div className="p-3 md:p-4 border-b-2 border-purple-200 bg-gradient-to-r from-purple-200 to-pink-200">
          <h2 className="text-lg md:text-xl font-bold text-purple-800 font-game flex items-center gap-2">
            📖 Recipe Book
          </h2>
          <p className="text-xs text-purple-600 mt-1">
            {unlockedRecipeIds.length} / {recipes.length} unlocked
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-2">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isUnlocked={unlockedRecipeIds.includes(recipe.id)}
              isSelected={selectedRecipeId === recipe.id}
              onClick={() => handleRecipeClick(recipe)}
            />
          ))}
        </div>
      </div>
      
      {modalRecipe && (
        <RecipeModal
          recipe={modalRecipe}
          onClose={() => setModalRecipe(null)}
        />
      )}
    </>
  );
};
