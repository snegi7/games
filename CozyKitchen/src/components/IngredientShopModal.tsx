import React from 'react';
import { useGameStore, useMissingIngredients } from '../store/gameStore';
import { getIngredientById } from '../data/ingredients';

interface IngredientShopModalProps {
  onClose: () => void;
}

export const IngredientShopModal: React.FC<IngredientShopModalProps> = ({ onClose }) => {
  const coins = useGameStore((state) => state.coins);
  const buyIngredient = useGameStore((state) => state.buyIngredient);
  const canAddIngredient = useGameStore((state) => state.canAddIngredient);
  const missingIngredients = useMissingIngredients();
  
  const handleBuy = (ingredientId: string) => {
    buyIngredient(ingredientId);
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-pop border-4 border-green-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
          >
            ✕
          </button>
          <span className="text-5xl block mb-2">🛒</span>
          <h2 className="text-2xl font-bold text-white font-game">Ingredient Shop</h2>
          <p className="text-green-100 text-sm mt-1">Buy the missing ingredients!</p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Wallet display */}
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-xl">🪙</span>
              <span className="font-bold text-amber-800">{coins}</span>
            </div>
          </div>
          
          {!canAddIngredient() && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-center text-sm">
              ⚠️ Your ingredient storage is full! Dispose some ingredients first.
            </div>
          )}
          
          {/* Missing ingredients list */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {missingIngredients.map((ingredientId) => {
              const ingredient = getIngredientById(ingredientId);
              if (!ingredient) return null;
              
              const canAfford = coins >= ingredient.price;
              const canBuy = canAfford && canAddIngredient();
              
              return (
                <div 
                  key={ingredientId}
                  className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border-2 border-green-100"
                >
                  <span className="text-3xl">{ingredient.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{ingredient.name}</h4>
                    <span className="text-sm text-gray-500">🪙 {ingredient.price}</span>
                  </div>
                  <button
                    onClick={() => handleBuy(ingredientId)}
                    disabled={!canBuy}
                    className={`
                      px-4 py-2 rounded-xl font-bold text-sm transition-all
                      ${canBuy
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:scale-105 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    Buy
                  </button>
                </div>
              );
            })}
          </div>
          
          {missingIngredients.length === 0 && (
            <div className="text-center py-8 text-green-600">
              <span className="text-4xl block mb-2">✅</span>
              <p className="font-bold">You have all ingredients!</p>
              <p className="text-sm">Close this and start cooking!</p>
            </div>
          )}
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full mt-4 py-3 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
