import { useCallback } from 'react';
import { useGameStore, useSelectedRecipe } from '../store/gameStore';
import { getIngredientById } from '../data/ingredients';
import { IngredientCard } from './IngredientCard';
import { GAME_CONFIG } from '../types';
import { playIngredientPickup } from '../utils/sounds';
import { useTouchDrag } from '../contexts/TouchDragContext';

interface IngredientPanelProps {
  isMobile?: boolean;
}

export const IngredientPanel: React.FC<IngredientPanelProps> = ({ isMobile = false }) => {
  const ownedIngredients = useGameStore((state) => state.ownedIngredients);
  const cookingState = useGameStore((state) => state.cookingState);
  const droppedIngredients = useGameStore((state) => state.droppedIngredients);
  const disposeIngredient = useGameStore((state) => state.disposeIngredient);
  const dropIngredient = useGameStore((state) => state.dropIngredient);
  const selectedRecipe = useSelectedRecipe();
  
  const { startDrag, updateDrag, endDrag } = useTouchDrag();
  
  const totalIngredients = ownedIngredients.reduce((sum, oi) => sum + oi.quantity, 0);
  const isCooking = cookingState.phase === 'adding-ingredients';
  
  const handleDragStart = (e: React.DragEvent, ingredientId: string) => {
    e.dataTransfer.setData('ingredientId', ingredientId);
    e.dataTransfer.effectAllowed = 'move';
    playIngredientPickup();
  };
  
  // Touch drag handlers
  const handleTouchDragStart = useCallback((ingredientId: string, emoji: string, x: number, y: number) => {
    startDrag(ingredientId, emoji, x, y);
  }, [startDrag]);
  
  const handleTouchDragMove = useCallback((x: number, y: number) => {
    updateDrag(x, y);
  }, [updateDrag]);
  
  const handleTouchDragEnd = useCallback(() => {
    const { ingredientId, droppedOnPot } = endDrag();
    
    if (droppedOnPot && ingredientId) {
      dropIngredient(ingredientId);
    }
  }, [endDrag, dropIngredient]);
  
  return (
    <div className={`ingredient-panel bg-gradient-to-t from-amber-100 to-orange-50 ${isMobile ? 'pb-safe' : 'border-t-4 border-orange-300 h-full'} p-3 md:p-4`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base md:text-lg font-bold text-amber-800 font-game flex items-center gap-2">
          🧺 My Ingredients
        </h3>
        <span className="text-xs md:text-sm font-medium text-amber-600 bg-amber-200 px-2 md:px-3 py-1 rounded-full">
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
        <div className={`grid ${isMobile ? 'grid-cols-4 sm:grid-cols-5' : 'grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10'} gap-2 md:gap-3`}>
          {ownedIngredients.map((owned) => {
            const ingredient = getIngredientById(owned.ingredientId);
            if (!ingredient) return null;
            
            const isNeededForRecipe = selectedRecipe?.ingredients.includes(owned.ingredientId);
            const alreadyDropped = droppedIngredients.includes(owned.ingredientId);
            const isHighlighted = isCooking && isNeededForRecipe && !alreadyDropped;
            const isDisabled = isCooking && (!isNeededForRecipe || alreadyDropped);
            const canDrag = isCooking && isNeededForRecipe && !alreadyDropped;
            
            return (
              <IngredientCard
                key={owned.ingredientId}
                ingredient={ingredient}
                quantity={owned.quantity}
                isHighlighted={isHighlighted}
                isDisabled={isDisabled}
                isDraggable={canDrag}
                onDragStart={(e) => handleDragStart(e, owned.ingredientId)}
                onTouchDragStart={handleTouchDragStart}
                onTouchDragMove={handleTouchDragMove}
                onTouchDragEnd={handleTouchDragEnd}
                onDispose={() => disposeIngredient(owned.ingredientId)}
                showDisposeButton={!isCooking}
                compact={isMobile}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
