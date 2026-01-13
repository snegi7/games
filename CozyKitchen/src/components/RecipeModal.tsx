import React from 'react';
import { Recipe } from '../types';
import { useGameStore } from '../store/gameStore';
import { getIngredientById } from '../data/ingredients';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const coins = useGameStore((state) => state.coins);
  const unlockRecipe = useGameStore((state) => state.unlockRecipe);
  
  const canAfford = coins >= recipe.unlockPrice;
  
  const handleUnlock = () => {
    if (unlockRecipe(recipe.id)) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-pop border-4 border-purple-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
          >
            ✕
          </button>
          <span className="text-6xl block mb-2">{recipe.emoji}</span>
          <h2 className="text-2xl font-bold text-white font-game">{recipe.name}</h2>
          <p className="text-purple-100 text-sm mt-1">{recipe.description}</p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Ingredients needed */}
          <h3 className="text-sm font-bold text-purple-600 mb-3">Ingredients needed:</h3>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {recipe.ingredients.map((ingredientId) => {
              const ingredient = getIngredientById(ingredientId);
              if (!ingredient) return null;
              return (
                <div 
                  key={ingredientId}
                  className="bg-white rounded-xl p-2 text-center shadow-sm border-2 border-purple-100"
                >
                  <span className="text-2xl block">{ingredient.emoji}</span>
                  <span className="text-xs text-gray-600">{ingredient.name}</span>
                </div>
              );
            })}
          </div>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <span className="text-sm text-gray-500">Sells for</span>
              <div className="text-xl font-bold text-green-600 flex items-center justify-center gap-1">
                🪙 +{recipe.sellPrice}
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-500">Difficulty</span>
              <div className="text-lg capitalize font-medium text-purple-600">
                {recipe.difficulty}
              </div>
            </div>
          </div>
          
          {/* Purchase button */}
          <button
            onClick={handleUnlock}
            disabled={!canAfford}
            className={`
              w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200
              ${canAfford
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {canAfford ? (
              <span className="flex items-center justify-center gap-2">
                🔓 Unlock for 🪙 {recipe.unlockPrice}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Need 🪙 {recipe.unlockPrice - coins} more
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
