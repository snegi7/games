import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isUnlocked: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isUnlocked,
  isSelected,
  onClick,
}) => {
  const difficultyColors = {
    easy: 'from-green-400 to-emerald-500',
    medium: 'from-yellow-400 to-orange-500',
    hard: 'from-red-400 to-pink-500',
  };
  
  const difficultyStars = {
    easy: '⭐',
    medium: '⭐⭐',
    hard: '⭐⭐⭐',
  };

  return (
    <button
      onClick={onClick}
      className={`
        recipe-card w-full p-3 rounded-2xl transition-all duration-200 text-left
        ${isSelected 
          ? 'bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg scale-[1.02] border-4 border-white' 
          : isUnlocked
            ? 'bg-gradient-to-r from-kitchen-cream to-white hover:shadow-md hover:scale-[1.01] border-4 border-orange-200'
            : 'bg-gray-200 opacity-70 border-4 border-gray-300'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Recipe emoji */}
        <div className={`
          text-4xl p-2 rounded-xl 
          ${isUnlocked ? 'bg-white/50' : 'grayscale'}
        `}>
          {recipe.emoji}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Recipe name */}
          <h4 className={`font-bold truncate ${isSelected ? 'text-white' : isUnlocked ? 'text-amber-800' : 'text-gray-500'}`}>
            {recipe.name}
          </h4>
          
          {/* Difficulty & Price */}
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${difficultyColors[recipe.difficulty]} text-white`}>
              {difficultyStars[recipe.difficulty]}
            </span>
            {isUnlocked ? (
              <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                🪙 +{recipe.sellPrice}
              </span>
            ) : (
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                🔒 {recipe.unlockPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
