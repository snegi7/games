import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { GAME_CONFIG } from '../types';
import { playDishReady } from '../utils/sounds';

export const CookingTimer: React.FC = () => {
  const cookingState = useGameStore((state) => state.cookingState);
  const updateCookingTimer = useGameStore((state) => state.updateCookingTimer);
  const finishCooking = useGameStore((state) => state.finishCooking);
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (cookingState.phase !== 'cooking') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    intervalRef.current = window.setInterval(() => {
      if (cookingState.phase === 'cooking') {
        const newTime = cookingState.timeRemaining - 1;
        if (newTime <= 0) {
          playDishReady();
          finishCooking();
        } else {
          updateCookingTimer(newTime);
        }
      }
    }, 1000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cookingState, updateCookingTimer, finishCooking]);
  
  if (cookingState.phase !== 'cooking') return null;
  
  const timeRemaining = cookingState.timeRemaining;
  const progress = ((GAME_CONFIG.COOKING_TIME_SECONDS - timeRemaining) / GAME_CONFIG.COOKING_TIME_SECONDS) * 100;
  
  return (
    <div className="cooking-timer flex flex-col items-center gap-4 animate-pop">
      {/* Clock display */}
      <div className="relative">
        <div className="text-8xl animate-pulse">⏱️</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-white drop-shadow-lg font-game mt-2">
            {timeRemaining}
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Cooking message */}
      <p className="text-lg font-bold text-orange-600 animate-bounce font-game">
        🍳 Cooking... 🍳
      </p>
    </div>
  );
};
