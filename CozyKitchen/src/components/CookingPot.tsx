import { useState } from 'react';
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

  // Touch handlers for mobile drag
  const handleTouchEnd = (_e: React.TouchEvent) => {
    // Handle touch drop is done in the ingredient cards
  };
  
  return (
    <div 
      className={`
        cooking-pot relative flex flex-col items-center justify-center
        transition-all duration-300
        ${isDragOver ? 'scale-110' : ''}
        ${isCooking ? 'animate-cooking-dramatic' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fire/flames under pot when cooking */}
      {isCooking && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex">
          <span className="text-4xl md:text-5xl animate-flame" style={{ animationDelay: '0s' }}>🔥</span>
          <span className="text-3xl md:text-4xl animate-flame" style={{ animationDelay: '0.1s' }}>🔥</span>
          <span className="text-4xl md:text-5xl animate-flame" style={{ animationDelay: '0.2s' }}>🔥</span>
        </div>
      )}
      
      {/* Steam effect - more dramatic */}
      {isCooking && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-4">
          <span className="text-3xl md:text-4xl animate-steam-dramatic" style={{ animationDelay: '0s' }}>💨</span>
          <span className="text-4xl md:text-5xl animate-steam-dramatic" style={{ animationDelay: '0.2s' }}>💨</span>
          <span className="text-3xl md:text-4xl animate-steam-dramatic" style={{ animationDelay: '0.4s' }}>💨</span>
          <span className="text-4xl md:text-5xl animate-steam-dramatic" style={{ animationDelay: '0.6s' }}>💨</span>
          <span className="text-3xl md:text-4xl animate-steam-dramatic" style={{ animationDelay: '0.8s' }}>💨</span>
        </div>
      )}
      
      {/* Main pot SVG - larger and more detailed */}
      <div className={`relative ${isDragOver ? 'filter drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]' : ''}`}>
        <svg 
          width="280" 
          height="220" 
          viewBox="0 0 280 220" 
          className={`md:w-[320px] md:h-[260px] ${isCooking ? 'animate-pot-bubble' : ''}`}
        >
          {/* Pot shadow */}
          <ellipse cx="140" cy="210" rx="100" ry="10" fill="rgba(0,0,0,0.2)" />
          
          {/* Pot body */}
          <path
            d="M40 80 Q40 200 140 200 Q240 200 240 80 L240 70 L40 70 Z"
            fill="url(#potGradient)"
            stroke="#2D2D2D"
            strokeWidth="3"
          />
          
          {/* Pot rim */}
          <ellipse cx="140" cy="70" rx="105" ry="20" fill="#5A5A5A" stroke="#2D2D2D" strokeWidth="2"/>
          <ellipse cx="140" cy="70" rx="95" ry="16" fill="url(#potInterior)"/>
          
          {/* Left handle */}
          <path
            d="M30 90 Q10 90 10 110 Q10 130 30 130"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Right handle */}
          <path
            d="M250 90 Q270 90 270 110 Q270 130 250 130"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Shine on pot */}
          <path
            d="M60 100 Q65 90 80 85"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5A5A5A"/>
              <stop offset="30%" stopColor="#4A4A4A"/>
              <stop offset="70%" stopColor="#3A3A3A"/>
              <stop offset="100%" stopColor="#2D2D2D"/>
            </linearGradient>
            <radialGradient id="potInterior" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B4513"/>
              <stop offset="100%" stopColor="#5D3A1A"/>
            </radialGradient>
          </defs>
        </svg>
        
        {/* Ingredients floating in pot */}
        <div className="absolute top-12 md:top-14 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-1 w-40 md:w-48">
          {droppedIngredients.map((ingredientId, index) => {
            const ingredient = getIngredientById(ingredientId);
            return (
              <span 
                key={ingredientId}
                className={`text-3xl md:text-4xl ${isCooking ? 'animate-ingredient-cook' : 'animate-ingredient-float'}`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {ingredient?.emoji}
              </span>
            );
          })}
        </div>
        
        {/* Bubbles when cooking */}
        {isCooking && (
          <div className="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2 flex gap-3">
            <span className="text-xl md:text-2xl animate-bubble" style={{ animationDelay: '0s' }}>🫧</span>
            <span className="text-lg md:text-xl animate-bubble" style={{ animationDelay: '0.3s' }}>🫧</span>
            <span className="text-xl md:text-2xl animate-bubble" style={{ animationDelay: '0.6s' }}>🫧</span>
            <span className="text-lg md:text-xl animate-bubble" style={{ animationDelay: '0.9s' }}>🫧</span>
          </div>
        )}
      </div>
      
      {/* Drop hint */}
      {isAddingIngredients && droppedIngredients.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`
            text-center p-4 rounded-2xl
            ${isDragOver ? 'text-green-600' : 'text-amber-700'}
          `}>
            <span className="text-5xl md:text-6xl block mb-2 animate-bounce">👆</span>
            <span className="font-bold text-lg md:text-xl">Drag ingredients here!</span>
          </div>
        </div>
      )}
      
      {/* Progress indicator */}
      {isAddingIngredients && selectedRecipe && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border-2 border-amber-300">
            <span className="text-lg font-bold text-amber-700">
              {droppedIngredients.length} / {selectedRecipe.ingredients.length}
            </span>
            <span className="text-sm text-amber-600">ingredients added</span>
          </div>
        </div>
      )}
    </div>
  );
};
