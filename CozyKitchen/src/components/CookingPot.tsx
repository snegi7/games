import { useState, useMemo, useRef, useEffect } from 'react';
import { useGameStore, useSelectedRecipe } from '../store/gameStore';
import { getIngredientById } from '../data/ingredients';
import type { Ingredient } from '../types';
import { playIngredientDrop } from '../utils/sounds';
import { useTouchDrag } from '../contexts/TouchDragContext';

export const CookingPot: React.FC = () => {
  const cookingState = useGameStore((state) => state.cookingState);
  const droppedIngredients = useGameStore((state) => state.droppedIngredients);
  const dropIngredient = useGameStore((state) => state.dropIngredient);
  const selectedRecipe = useSelectedRecipe();
  const [isDragOver, setIsDragOver] = useState(false);
  
  const { registerPotRef, dragState } = useTouchDrag();
  const potRef = useRef<HTMLDivElement>(null);
  
  const isCooking = cookingState.phase === 'cooking';
  const isAddingIngredients = cookingState.phase === 'adding-ingredients';
  
  // Register pot ref with touch drag context
  useEffect(() => {
    registerPotRef(potRef.current);
    return () => registerPotRef(null);
  }, [registerPotRef]);
  
  // Visual feedback when touch dragging over pot
  const isTouchDragOver = useMemo(() => {
    if (!dragState.isDragging || !potRef.current) return false;
    const potRect = potRef.current.getBoundingClientRect();
    const padding = 30;
    return (
      dragState.position.x >= potRect.left - padding &&
      dragState.position.x <= potRect.right + padding &&
      dragState.position.y >= potRect.top - padding &&
      dragState.position.y <= potRect.bottom + padding
    );
  }, [dragState]);
  
  // Get remaining ingredients that haven't been dropped yet (for ghost placeholders)
  const remainingIngredients = useMemo(() => {
    if (!selectedRecipe) return [];
    return selectedRecipe.ingredients
      .filter(id => !droppedIngredients.includes(id))
      .map(id => getIngredientById(id))
      .filter((ing): ing is Ingredient => ing !== undefined);
  }, [selectedRecipe, droppedIngredients]);
  
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
      playIngredientDrop();
    }
  };
  
  const showGlow = isDragOver || isTouchDragOver;
  
  return (
    <div 
      ref={potRef}
      className={`
        cooking-pot relative flex flex-col items-center justify-center
        transition-all duration-300
        ${showGlow ? 'scale-110' : ''}
        ${isCooking ? 'animate-cooking-dramatic' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Fire/flames under pot when cooking - BIGGER */}
      {isCooking && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex">
          <span className="text-5xl md:text-7xl animate-flame" style={{ animationDelay: '0s' }}>🔥</span>
          <span className="text-4xl md:text-6xl animate-flame" style={{ animationDelay: '0.1s' }}>🔥</span>
          <span className="text-5xl md:text-7xl animate-flame" style={{ animationDelay: '0.2s' }}>🔥</span>
          <span className="text-4xl md:text-6xl animate-flame" style={{ animationDelay: '0.3s' }}>🔥</span>
          <span className="text-5xl md:text-7xl animate-flame" style={{ animationDelay: '0.4s' }}>🔥</span>
        </div>
      )}
      
      {/* Steam effect - more dramatic and bigger */}
      {isCooking && (
        <div className="absolute -top-20 md:-top-28 left-1/2 transform -translate-x-1/2 flex gap-3 md:gap-6">
          <span className="text-4xl md:text-6xl animate-steam-dramatic" style={{ animationDelay: '0s' }}>💨</span>
          <span className="text-5xl md:text-7xl animate-steam-dramatic" style={{ animationDelay: '0.2s' }}>💨</span>
          <span className="text-4xl md:text-6xl animate-steam-dramatic" style={{ animationDelay: '0.4s' }}>💨</span>
          <span className="text-5xl md:text-7xl animate-steam-dramatic" style={{ animationDelay: '0.6s' }}>💨</span>
          <span className="text-4xl md:text-6xl animate-steam-dramatic" style={{ animationDelay: '0.8s' }}>💨</span>
        </div>
      )}
      
      {/* Main pot SVG - MUCH LARGER */}
      <div className={`relative ${showGlow ? 'filter drop-shadow-[0_0_40px_rgba(34,197,94,0.9)]' : ''}`}>
        <svg 
          width="280" 
          height="220" 
          viewBox="0 0 280 220" 
          className="md:w-[420px] md:h-[340px]"
          style={{ filter: isCooking ? 'drop-shadow(0 0 30px rgba(255, 100, 0, 0.6))' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}
        >
          {/* Pot shadow */}
          <ellipse cx="140" cy="210" rx="100" ry="10" fill="rgba(0,0,0,0.3)" />
          
          {/* Pot body */}
          <path
            d="M40 80 Q40 200 140 200 Q240 200 240 80 L240 70 L40 70 Z"
            fill="url(#potGradient)"
            stroke="#2D2D2D"
            strokeWidth="4"
          />
          
          {/* Pot rim */}
          <ellipse cx="140" cy="70" rx="105" ry="20" fill="#5A5A5A" stroke="#2D2D2D" strokeWidth="3"/>
          <ellipse 
            cx="140" 
            cy="70" 
            rx="95" 
            ry="16" 
            fill="url(#potInterior)"
            className={isAddingIngredients && droppedIngredients.length === 0 ? 'animate-pot-interior-glow' : ''}
          />
          
          {/* Inner glow effect when waiting for ingredients */}
          {isAddingIngredients && droppedIngredients.length < (selectedRecipe?.ingredients.length ?? 0) && (
            <ellipse 
              cx="140" 
              cy="70" 
              rx="85" 
              ry="12" 
              fill="url(#innerGlow)"
              className="animate-inner-glow"
            />
          )}
          
          {/* Left handle */}
          <path
            d="M30 90 Q5 90 5 115 Q5 140 30 140"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M30 90 Q5 90 5 115 Q5 140 30 140"
            fill="none"
            stroke="#666"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Right handle */}
          <path
            d="M250 90 Q275 90 275 115 Q275 140 250 140"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M250 90 Q275 90 275 115 Q275 140 250 140"
            fill="none"
            stroke="#666"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Shine on pot */}
          <path
            d="M55 100 Q60 85 85 78"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6A6A6A"/>
              <stop offset="30%" stopColor="#5A5A5A"/>
              <stop offset="70%" stopColor="#4A4A4A"/>
              <stop offset="100%" stopColor="#3A3A3A"/>
            </linearGradient>
            <radialGradient id="potInterior" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isCooking ? "#CD7F32" : "#8B4513"}/>
              <stop offset="100%" stopColor={isCooking ? "#8B4513" : "#5D3A1A"}/>
            </radialGradient>
            <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 200, 100, 0.6)"/>
              <stop offset="60%" stopColor="rgba(255, 165, 0, 0.3)"/>
              <stop offset="100%" stopColor="rgba(255, 140, 0, 0)"/>
            </radialGradient>
          </defs>
        </svg>
        
        {/* Ghost ingredient placeholders - shows what's still needed */}
        {isAddingIngredients && remainingIngredients.length > 0 && !isCooking && (
          <div className="absolute top-8 md:top-16 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 w-36 md:w-56 pointer-events-none">
            {remainingIngredients.map((ingredient, index) => (
              <span 
                key={`ghost-${ingredient.id}`}
                className="text-2xl md:text-4xl animate-ghost-float"
                style={{ 
                  animationDelay: `${index * 0.5}s`,
                  opacity: 0.45,
                  filter: 'saturate(0.15) brightness(1.5) contrast(0.7)',
                  textShadow: '0 0 12px rgba(255, 220, 150, 0.9), 0 0 25px rgba(255, 180, 100, 0.5)',
                }}
              >
                {ingredient.emoji}
              </span>
            ))}
          </div>
        )}
        
        {/* Ingredients floating in pot - BIGGER */}
        <div className="absolute top-10 md:top-20 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-1 w-36 md:w-60">
          {droppedIngredients.map((ingredientId, index) => {
            const ingredient = getIngredientById(ingredientId);
            return (
              <span 
                key={ingredientId}
                className={`text-3xl md:text-5xl ${isCooking ? 'animate-ingredient-cook' : 'animate-ingredient-float'}`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {ingredient?.emoji}
              </span>
            );
          })}
        </div>
        
        {/* Bubbles when cooking - BIGGER */}
        {isCooking && (
          <div className="absolute top-20 md:top-28 left-1/2 transform -translate-x-1/2 flex gap-4">
            <span className="text-2xl md:text-3xl animate-bubble" style={{ animationDelay: '0s' }}>🫧</span>
            <span className="text-xl md:text-2xl animate-bubble" style={{ animationDelay: '0.3s' }}>🫧</span>
            <span className="text-2xl md:text-3xl animate-bubble" style={{ animationDelay: '0.6s' }}>🫧</span>
            <span className="text-xl md:text-2xl animate-bubble" style={{ animationDelay: '0.9s' }}>🫧</span>
          </div>
        )}
      </div>
      
      {/* Progress indicator */}
      {isAddingIngredients && selectedRecipe && (
        <div className="mt-4 md:mt-6 text-center">
          <div className={`
            inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-full border-2 shadow-lg transition-all duration-300
            ${droppedIngredients.length === 0 
              ? 'bg-amber-50 border-amber-200' 
              : 'bg-amber-100 border-amber-300'
            }
          `}>
            {droppedIngredients.length === 0 ? (
              <span className="text-xs md:text-base text-amber-600 flex items-center gap-2">
                <span className="text-base md:text-lg">✨</span>
                Drag ingredients from below
                <span className="text-base md:text-lg">✨</span>
              </span>
            ) : (
              <>
                <span className="text-lg md:text-2xl font-bold text-amber-700">
                  {droppedIngredients.length} / {selectedRecipe.ingredients.length}
                </span>
                <span className="text-xs md:text-base text-amber-600">ingredients added</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
