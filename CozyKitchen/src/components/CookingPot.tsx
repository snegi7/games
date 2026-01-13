import React, { useState } from 'react';
import { useGameStore, useSelectedRecipe } from '../store/gameStore';
import { getIngredientById } from '../data/ingredients';

export const CookingPot: React.FC = () => {
  const cookingState = useGameStore((state) => state.cookingState);
  const droppedIngredients = useGameStore((state) => state.droppedIngredients);
  const dropIngredient = useGameStore((state) => state.dropIngredient);
  const selectedRecipe = useSelectedRecipe();
  const [isDragOver, setIsDragOver] = useState(false);
  
  const isCooking = cookingState.phase === 'cooking';
  const isAddingIngredients = cookingState.phase === 'adding-ingredients';
  
  const handleDragOver = (e: React.DragEvent) => {
    if (!isAddingIngredients) return;
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!isAddingIngredients) return;
    
    const ingredientId = e.dataTransfer.getData('ingredientId');
    if (ingredientId) {
      dropIngredient(ingredientId);
    }
  };
  
  return (
    <div 
      className={`
        cooking-pot relative flex flex-col items-center justify-center
        w-64 h-64 mx-auto transition-all duration-300
        ${isDragOver ? 'scale-110' : ''}
        ${isCooking ? 'animate-cooking' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Steam effect when cooking */}
      {isCooking && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          <span className="text-2xl animate-steam" style={{ animationDelay: '0s' }}>💨</span>
          <span className="text-2xl animate-steam" style={{ animationDelay: '0.3s' }}>💨</span>
          <span className="text-2xl animate-steam" style={{ animationDelay: '0.6s' }}>💨</span>
        </div>
      )}
      
      {/* Pot body */}
      <div 
        className={`
          relative w-48 h-40 rounded-b-full 
          bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800
          shadow-2xl border-t-8 
          ${isDragOver ? 'border-green-400 shadow-green-400/50' : 'border-gray-500'}
          ${isCooking ? 'shadow-orange-500/50' : ''}
          transition-all duration-300
        `}
      >
        {/* Pot interior / content */}
        <div className="absolute inset-4 top-0 rounded-b-full bg-gradient-to-b from-amber-800 to-amber-900 overflow-hidden">
          {/* Dropped ingredients floating in pot */}
          <div className="absolute inset-0 flex flex-wrap items-center justify-center p-2 gap-1">
            {droppedIngredients.map((ingredientId, index) => {
              const ingredient = getIngredientById(ingredientId);
              return (
                <span 
                  key={ingredientId}
                  className="text-2xl animate-bounce"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '1s'
                  }}
                >
                  {ingredient?.emoji}
                </span>
              );
            })}
          </div>
          
          {/* Bubbles when cooking */}
          {isCooking && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              <span className="text-lg animate-bounce" style={{ animationDelay: '0s' }}>🫧</span>
              <span className="text-lg animate-bounce" style={{ animationDelay: '0.2s' }}>🫧</span>
              <span className="text-lg animate-bounce" style={{ animationDelay: '0.4s' }}>🫧</span>
            </div>
          )}
        </div>
        
        {/* Pot handles */}
        <div className="absolute -left-6 top-4 w-6 h-8 bg-gray-600 rounded-l-full"></div>
        <div className="absolute -right-6 top-4 w-6 h-8 bg-gray-600 rounded-r-full"></div>
      </div>
      
      {/* Drop hint */}
      {isAddingIngredients && droppedIngredients.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`
            text-center p-4 rounded-2xl
            ${isDragOver ? 'text-green-600' : 'text-amber-700'}
          `}>
            <span className="text-4xl block mb-2">👆</span>
            <span className="font-bold">Drag ingredients here!</span>
          </div>
        </div>
      )}
      
      {/* Progress indicator */}
      {isAddingIngredients && selectedRecipe && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-sm font-medium text-amber-700 bg-amber-100 px-4 py-1 rounded-full">
            {droppedIngredients.length} / {selectedRecipe.ingredients.length} ingredients
          </span>
        </div>
      )}
    </div>
  );
};
