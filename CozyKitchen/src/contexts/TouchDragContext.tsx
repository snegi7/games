import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { playIngredientPickup, playIngredientDrop } from '../utils/sounds';

interface DragState {
  isDragging: boolean;
  ingredientId: string | null;
  emoji: string | null;
  position: { x: number; y: number };
}

interface TouchDragContextType {
  dragState: DragState;
  startDrag: (ingredientId: string, emoji: string, x: number, y: number) => void;
  updateDrag: (x: number, y: number) => void;
  endDrag: () => { ingredientId: string | null; droppedOnPot: boolean };
  registerPotRef: (ref: HTMLElement | null) => void;
}

const TouchDragContext = createContext<TouchDragContextType | null>(null);

export const useTouchDrag = () => {
  const context = useContext(TouchDragContext);
  if (!context) {
    throw new Error('useTouchDrag must be used within TouchDragProvider');
  }
  return context;
};

export const TouchDragProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    ingredientId: null,
    emoji: null,
    position: { x: 0, y: 0 },
  });
  
  const potRef = useRef<HTMLElement | null>(null);
  
  const registerPotRef = useCallback((ref: HTMLElement | null) => {
    potRef.current = ref;
  }, []);
  
  const startDrag = useCallback((ingredientId: string, emoji: string, x: number, y: number) => {
    playIngredientPickup();
    setDragState({
      isDragging: true,
      ingredientId,
      emoji,
      position: { x, y },
    });
  }, []);
  
  const updateDrag = useCallback((x: number, y: number) => {
    setDragState(prev => ({
      ...prev,
      position: { x, y },
    }));
  }, []);
  
  const endDrag = useCallback(() => {
    const { ingredientId, position } = dragState;
    let droppedOnPot = false;
    
    // Check if dropped on the pot
    if (potRef.current && ingredientId) {
      const potRect = potRef.current.getBoundingClientRect();
      // Add some padding for easier drop target
      const padding = 30;
      if (
        position.x >= potRect.left - padding &&
        position.x <= potRect.right + padding &&
        position.y >= potRect.top - padding &&
        position.y <= potRect.bottom + padding
      ) {
        droppedOnPot = true;
        playIngredientDrop();
      }
    }
    
    setDragState({
      isDragging: false,
      ingredientId: null,
      emoji: null,
      position: { x: 0, y: 0 },
    });
    
    return { ingredientId, droppedOnPot };
  }, [dragState]);
  
  return (
    <TouchDragContext.Provider value={{ dragState, startDrag, updateDrag, endDrag, registerPotRef }}>
      {children}
      
      {/* Floating drag ghost */}
      {dragState.isDragging && dragState.emoji && (
        <div
          className="fixed pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: dragState.position.x,
            top: dragState.position.y,
          }}
        >
          <div className="text-6xl animate-bounce-subtle drop-shadow-2xl">
            {dragState.emoji}
          </div>
          {/* Glow effect under the emoji */}
          <div 
            className="absolute inset-0 rounded-full bg-green-400/40 blur-xl -z-10 scale-150"
          />
        </div>
      )}
      
      {/* Add animation keyframes */}
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 0.3s ease-in-out infinite;
        }
      `}</style>
    </TouchDragContext.Provider>
  );
};
