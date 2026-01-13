import { useState } from 'react';
import { useGameStore, useAllRecipesSorted } from '../store/gameStore';
import { RecipeCard } from './RecipeCard';
import { RecipeModal } from './RecipeModal';
import { Recipe } from '../types';
import { playRecipeSelect, playButtonClick } from '../utils/sounds';

interface MobileRecipeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  showGlow?: boolean;
}

export const MobileRecipeDrawer: React.FC<MobileRecipeDrawerProps> = ({ 
  isOpen, 
  onClose,
  showGlow = false 
}) => {
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  const unlockedRecipeIds = useGameStore((state) => state.unlockedRecipeIds);
  const selectRecipe = useGameStore((state) => state.selectRecipe);
  const cookingState = useGameStore((state) => state.cookingState);
  const recipes = useAllRecipesSorted();
  
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);
  
  const handleRecipeClick = (recipe: Recipe) => {
    const isUnlocked = unlockedRecipeIds.includes(recipe.id);
    
    if (!isUnlocked) {
      playButtonClick();
      setModalRecipe(recipe);
    } else if (cookingState.phase === 'idle' || cookingState.phase === 'selecting') {
      if (selectedRecipeId === recipe.id) {
        playButtonClick();
        selectRecipe(null);
      } else {
        playRecipeSelect();
        selectRecipe(recipe.id);
        onClose(); // Close drawer after selecting
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-gradient-to-b from-purple-100 to-pink-50 z-50 md:hidden shadow-2xl animate-slide-in-left flex flex-col">
        {/* Header */}
        <div className={`
          p-4 border-b-2 border-purple-200 bg-gradient-to-r from-purple-200 to-pink-200
          flex items-center justify-between
          ${showGlow ? 'animate-header-glow' : ''}
        `}>
          <div>
            <h2 className="text-xl font-bold text-purple-800 font-game flex items-center gap-2">
              📖 Recipe Book
            </h2>
            <p className="text-xs text-purple-600 mt-1">
              {unlockedRecipeIds.length} / {recipes.length} unlocked
            </p>
          </div>
          <button
            onClick={() => {
              playButtonClick();
              onClose();
            }}
            className="text-2xl text-purple-600 hover:text-purple-800 p-2"
          >
            ✕
          </button>
        </div>
        
        {/* Recipe list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
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
      
      {/* Recipe unlock modal */}
      {modalRecipe && (
        <RecipeModal
          recipe={modalRecipe}
          onClose={() => setModalRecipe(null)}
        />
      )}
      
      {/* Slide-in animation */}
      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
};
