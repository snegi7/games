import { useRef, useCallback } from 'react';
import { Ingredient } from '../types';

interface IngredientCardProps {
  ingredient: Ingredient;
  quantity: number;
  isHighlighted?: boolean;
  isDisabled?: boolean;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onTouchDragStart?: (ingredientId: string, emoji: string, x: number, y: number) => void;
  onTouchDragMove?: (x: number, y: number) => void;
  onTouchDragEnd?: () => void;
  onDispose?: () => void;
  showDisposeButton?: boolean;
  compact?: boolean;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  quantity,
  isHighlighted = false,
  isDisabled = false,
  isDraggable = false,
  onDragStart,
  onTouchDragStart,
  onTouchDragMove,
  onTouchDragEnd,
  onDispose,
  showDisposeButton = false,
  compact = false,
}) => {
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isDraggable || isDisabled || !onTouchDragStart) return;
    
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    
    // Start drag immediately - no delay needed
    isDraggingRef.current = true;
    onTouchDragStart(ingredient.id, ingredient.emoji, touch.clientX, touch.clientY);
    
    // Prevent scrolling while dragging
    e.preventDefault();
  }, [isDraggable, isDisabled, onTouchDragStart, ingredient.id, ingredient.emoji]);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current || !onTouchDragMove) return;
    
    const touch = e.touches[0];
    onTouchDragMove(touch.clientX, touch.clientY);
    
    // Prevent scrolling
    e.preventDefault();
  }, [onTouchDragMove]);
  
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    onTouchDragEnd?.();
    
    e.preventDefault();
  }, [onTouchDragEnd]);
  
  return (
    <div
      className={`
        ingredient-card relative flex flex-col items-center justify-center 
        ${compact ? 'p-2' : 'p-3'} rounded-2xl transition-all duration-200 cursor-pointer
        ${isHighlighted 
          ? 'bg-gradient-to-br from-green-300 to-emerald-400 shadow-lg shadow-green-300/50 scale-105 animate-pulse-glow border-4 border-green-500' 
          : isDisabled
            ? 'bg-gray-200 opacity-50 cursor-not-allowed'
            : 'bg-gradient-to-br from-kitchen-cream to-kitchen-peach hover:scale-105 hover:shadow-lg border-4 border-orange-200'
        }
        ${isDraggable && !isDisabled ? 'cursor-grab active:cursor-grabbing touch-none' : ''}
      `}
      draggable={isDraggable && !isDisabled}
      onDragStart={onDragStart}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Quantity badge */}
      {quantity > 1 && (
        <div className={`absolute -top-1 -right-1 bg-kitchen-coral text-white text-xs font-bold ${compact ? 'w-5 h-5' : 'w-6 h-6'} rounded-full flex items-center justify-center shadow-md`}>
          {quantity}
        </div>
      )}
      
      {/* Dispose button */}
      {showDisposeButton && onDispose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDispose();
          }}
          className={`absolute -top-1 -left-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold ${compact ? 'w-5 h-5' : 'w-6 h-6'} rounded-full flex items-center justify-center shadow-md transition-colors`}
          title="Dispose ingredient"
        >
          ✕
        </button>
      )}
      
      {/* Emoji */}
      <span className={`${compact ? 'text-2xl' : 'text-4xl'} ${isDraggable && !isDisabled ? 'animate-wiggle' : ''}`}>
        {ingredient.emoji}
      </span>
      
      {/* Name */}
      <span className={`${compact ? 'text-[10px]' : 'text-xs'} font-bold mt-1 text-center ${isDisabled ? 'text-gray-500' : 'text-amber-800'} truncate w-full`}>
        {ingredient.name}
      </span>
    </div>
  );
};
