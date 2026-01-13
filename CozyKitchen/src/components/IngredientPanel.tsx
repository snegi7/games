import React from 'react';
import { useGameStore, useSelectedRecipe } from '../store/gameStore';
import { getIngredientById } from '../data/ingredients';
import { IngredientCard } from './IngredientCard';
import { GAME_CONFIG } from '../types';

export const IngredientPanel: React.FC = () => {
  const ownedIngredients = useGameStore((state) => state.ownedIngredients);
  const cookingState = useGameStore((state) => state.cookingState);
  const droppedIngredients = useGameStore((state) => state.droppedIngredients);
  const disposeIngredient = useGameStore((state) => state.disposeIngredient);
  const selectedRecipe = useSelectedRecipe();
  
  const totalIngredients = ownedIngredients.reduce((sum, oi) => sum + oi.quantity, 0);
  const isCooking = cookingState.phase === 'adding-ingredients';
  
  const handleDragStart = (e: React.DragEvent, ingredientId: string) => {
    e.dataTransfer.setData('ingredientId', ingredientId);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  return (
    <div className="ingredient-panel bg-gradient-to-t from-amber-100 to-orange-50 border-t-4 border-orange-300 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-amber-800 font-game flex items-center gap-2">
          🧺 My Ingredients
        </h3>
        <span className="text-sm font-medium text-amber-600 bg-amber-200 px-3 py-1 rounded-full">
          {totalIngredients} / {GAME_CONFIG.MAX_INGREDIENTS}
        </span>
      </div>
      
      {ownedIngredients.length === 0 ? (
        <div className="text-center text-amber-600 py-8">
          <span className="text-4xl block mb-2">📦</span>
          <p className="font-medium">No ingredients yet!</p>
          <p className="text-sm">Select a recipe to see what you need.</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {ownedIngredients.map((owned) => {
            const ingredient = getIngredientById(owned.ingredientId);
            if (!ingredient) return null;
            
            const isNeededForRecipe = selectedRecipe?.ingredients.includes(owned.ingredientId);
            const alreadyDropped = droppedIngredients.includes(owned.ingredientId);
            const isHighlighted = isCooking && isNeededForRecipe && !alreadyDropped;
            const isDisabled = isCooking && (!isNeededForRecipe || alreadyDropped);
            
            return (
              <IngredientCard
                key={owned.ingredientId}
                ingredient={ingredient}
                quantity={owned.quantity}
                isHighlighted={isHighlighted}
                isDisabled={isDisabled}
                isDraggable={isCooking && isNeededForRecipe && !alreadyDropped}
                onDragStart={(e) => handleDragStart(e, owned.ingredientId)}
                onDispose={() => disposeIngredient(owned.ingredientId)}
                showDisposeButton={!isCooking}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
