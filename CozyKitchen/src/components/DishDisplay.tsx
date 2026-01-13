import React, { useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { getRecipeById } from '../data/recipes';
import { CoinFlyAnimation } from './CoinFlyAnimation';

export const DishDisplay: React.FC = () => {
  const cookingState = useGameStore((state) => state.cookingState);
  const sellDish = useGameStore((state) => state.sellDish);
  const resetCooking = useGameStore((state) => state.resetCooking);
  const [showCoins, setShowCoins] = useState(false);
  const [earnedAmount, setEarnedAmount] = useState(0);
  
  if (cookingState.phase !== 'done' && cookingState.phase !== 'sold') return null;
  
  const recipe = cookingState.phase === 'done' 
    ? getRecipeById(cookingState.recipeId) 
    : null;
  
  const handleSell = useCallback(() => {
    const earned = sellDish();
    if (earned > 0) {
      setEarnedAmount(earned);
      setShowCoins(true);
    }
  }, [sellDish]);
  
  const handleCoinAnimationComplete = useCallback(() => {
    setShowCoins(false);
    setEarnedAmount(0);
    resetCooking();
  }, [resetCooking]);
  
  if (cookingState.phase === 'sold') {
    return (
      <>
        {showCoins && (
          <CoinFlyAnimation 
            amount={earnedAmount} 
            onComplete={handleCoinAnimationComplete}
          />
        )}
        <div className="dish-display flex flex-col items-center gap-6 animate-pop">
          <div className="text-6xl animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 font-game">
            Sold! +🪙{earnedAmount}
          </h2>
        </div>
      </>
    );
  }
  
  if (!recipe) return null;
  
  return (
    <div className="dish-display flex flex-col items-center gap-6 animate-pop">
      {/* Dish presentation */}
      <div className="relative">
        {/* Plate */}
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-2xl flex items-center justify-center border-8 border-gray-300">
          {/* Dish emoji */}
          <span className="text-7xl animate-wiggle">{recipe.emoji}</span>
        </div>
        
        {/* Sparkles */}
        <span className="absolute -top-4 -left-4 text-3xl animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
        <span className="absolute -top-4 -right-4 text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
        <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
      </div>
      
      {/* Dish name */}
      <h2 className="text-2xl font-bold text-amber-800 font-game text-center">
        {recipe.name} is ready!
      </h2>
      
      {/* Sell button */}
      <button
        onClick={handleSell}
        className="
          px-8 py-4 rounded-2xl font-bold text-xl
          bg-gradient-to-r from-green-400 to-emerald-500 
          text-white shadow-lg hover:shadow-xl 
          hover:scale-105 active:scale-95
          transition-all duration-200
          animate-pulse-glow
          font-game
        "
      >
        <span className="flex items-center gap-2">
          💰 Sell for 🪙 {recipe.sellPrice}
        </span>
      </button>
    </div>
  );
};
