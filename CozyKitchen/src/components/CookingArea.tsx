import { useState } from 'react';
import { useGameStore, useSelectedRecipe, useCanCookSelectedRecipe, useMissingIngredients } from '../store/gameStore';
import { CookingPot } from './CookingPot';
import { CookingTimer } from './CookingTimer';
import { DishDisplay } from './DishDisplay';
import { IngredientShopModal } from './IngredientShopModal';
import { MobileIngredientSelector } from './MobileIngredientSelector';
import { getIngredientById } from '../data/ingredients';

interface CookingAreaProps {
  isMobile?: boolean;
}

export const CookingArea: React.FC<CookingAreaProps> = ({ isMobile = false }) => {
  const cookingState = useGameStore((state) => state.cookingState);
  const startCooking = useGameStore((state) => state.startCooking);
  const cook = useGameStore((state) => state.cook);
  const resetCooking = useGameStore((state) => state.resetCooking);
  const selectedRecipe = useSelectedRecipe();
  const canCook = useCanCookSelectedRecipe();
  const missingIngredients = useMissingIngredients();
  const droppedIngredients = useGameStore((state) => state.droppedIngredients);
  
  const [showShop, setShowShop] = useState(false);
  
  // Check if user has dropped all available ingredients but still missing some
  const hasDroppedAllAvailable = selectedRecipe && 
    droppedIngredients.length > 0 && 
    missingIngredients.length > 0 &&
    droppedIngredients.length === selectedRecipe.ingredients.length - missingIngredients.length;
  
  const renderIdleState = () => (
    <div className="flex flex-col items-center justify-center h-full gap-4 md:gap-6 p-4 md:p-8">
      <div className="text-center max-w-md">
        <span className="text-6xl md:text-8xl block mb-4 animate-bounce-slow">👨‍🍳</span>
        <h2 className="text-xl md:text-3xl font-bold text-amber-800 font-game mb-2">
          Welcome to Cozy Kitchen!
        </h2>
        <p className="text-sm md:text-lg text-amber-600">
          {isMobile ? 'Tap "Recipes" below to pick a dish!' : 'Select a recipe from the cookbook to start cooking delicious dishes!'}
        </p>
      </div>
      
      {/* Quick tips */}
      <div className={`grid ${isMobile ? 'grid-cols-3 gap-2' : 'grid-cols-1 md:grid-cols-3 gap-4'} mt-4 md:mt-8`}>
        <div className="bg-white/50 rounded-2xl p-3 md:p-4 text-center">
          <span className="text-2xl md:text-3xl block mb-1 md:mb-2">📖</span>
          <p className="text-xs md:text-sm text-amber-700">Pick a recipe</p>
        </div>
        <div className="bg-white/50 rounded-2xl p-3 md:p-4 text-center">
          <span className="text-2xl md:text-3xl block mb-1 md:mb-2">🥘</span>
          <p className="text-xs md:text-sm text-amber-700">Add ingredients</p>
        </div>
        <div className="bg-white/50 rounded-2xl p-3 md:p-4 text-center">
          <span className="text-2xl md:text-3xl block mb-1 md:mb-2">💰</span>
          <p className="text-xs md:text-sm text-amber-700">Sell for coins!</p>
        </div>
      </div>
    </div>
  );
  
  const renderSelectingState = () => (
    <div className="flex flex-col items-center justify-center h-full gap-4 md:gap-6 p-4 md:p-8">
      {/* Selected recipe display */}
      <div className="text-center bg-white/70 rounded-3xl p-4 md:p-8 shadow-lg border-4 border-pink-200 max-w-sm md:max-w-md">
        <span className="text-5xl md:text-7xl block mb-2 md:mb-4">{selectedRecipe?.emoji}</span>
        <h2 className="text-xl md:text-2xl font-bold text-amber-800 font-game mb-1 md:mb-2">
          {selectedRecipe?.name}
        </h2>
        <p className="text-sm md:text-base text-amber-600 mb-3 md:mb-4">{selectedRecipe?.description}</p>
        
        {/* Ingredients needed */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4 md:mb-6">
          {selectedRecipe?.ingredients.map((id) => {
            const ingredient = getIngredientById(id);
            const isMissing = missingIngredients.includes(id);
            return (
              <span 
                key={id}
                className={`
                  text-xl md:text-2xl p-1.5 md:p-2 rounded-xl transition-all relative
                  ${isMissing 
                    ? 'bg-red-100 opacity-50 grayscale' 
                    : 'bg-green-100'
                  }
                `}
                title={ingredient?.name}
              >
                {ingredient?.emoji}
                {isMissing && <span className="text-xs absolute -top-1 -right-1">❌</span>}
              </span>
            );
          })}
        </div>
        
        {/* Warning about missing ingredients */}
        {missingIngredients.length > 0 && (
          <div className="bg-orange-100 text-orange-700 p-2 md:p-3 rounded-xl mb-3 md:mb-4 text-xs md:text-sm">
            ⚠️ Missing {missingIngredients.length} ingredient(s)!
            <button
              onClick={() => setShowShop(true)}
              className="ml-2 underline font-bold hover:text-orange-800"
            >
              Buy?
            </button>
          </div>
        )}
        
        {/* Start cooking button */}
        <button
          onClick={startCooking}
          className="
            px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-lg md:text-xl
            bg-gradient-to-r from-orange-400 to-pink-500 
            text-white shadow-lg hover:shadow-xl 
            hover:scale-105 active:scale-95
            transition-all duration-200
            font-game
          "
        >
          🍳 Start Cooking!
        </button>
      </div>
    </div>
  );
  
  const renderAddingIngredientsState = () => (
    <div className="flex flex-col items-center justify-center h-full gap-3 md:gap-6 p-3 md:p-8">
      {/* Recipe being made */}
      <div className="text-center">
        <span className="text-3xl md:text-4xl">{selectedRecipe?.emoji}</span>
        <h3 className="text-base md:text-xl font-bold text-amber-800 font-game mt-1 md:mt-2">
          Making: {selectedRecipe?.name}
        </h3>
      </div>
      
      {/* Cooking pot - smaller on mobile */}
      <div className={isMobile ? 'scale-75' : ''}>
        <CookingPot />
      </div>
      
      {/* Mobile ingredient selector */}
      {isMobile && (
        <MobileIngredientSelector onOpenShop={() => setShowShop(true)} />
      )}
      
      {/* Missing ingredients warning */}
      {hasDroppedAllAvailable && !isMobile && (
        <div className="bg-orange-100 text-orange-700 p-4 rounded-2xl text-center max-w-sm">
          <p className="font-bold mb-2">🛒 Missing ingredients!</p>
          <p className="text-sm mb-3">You need to buy more ingredients to complete this dish.</p>
          <button
            onClick={() => setShowShop(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            Open Shop
          </button>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex gap-3 md:gap-4 mt-2 md:mt-4">
        <button
          onClick={resetCooking}
          className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm md:text-base"
        >
          ← Cancel
        </button>
        
        {canCook && (
          <button
            onClick={cook}
            className="
              px-6 md:px-8 py-2 md:py-3 rounded-2xl font-bold text-base md:text-lg
              bg-gradient-to-r from-green-400 to-emerald-500 
              text-white shadow-lg hover:shadow-xl 
              hover:scale-105 active:scale-95
              transition-all duration-200
              animate-pulse-glow
              font-game
            "
          >
            🔥 Cook It!
          </button>
        )}
      </div>
    </div>
  );
  
  const renderCookingState = () => (
    <div className="flex flex-col items-center justify-center h-full gap-4 md:gap-6 p-4 md:p-8">
      <div className={isMobile ? 'scale-75' : ''}>
        <CookingPot />
      </div>
      <CookingTimer />
    </div>
  );
  
  const renderDoneState = () => (
    <div className="flex flex-col items-center justify-center h-full gap-4 md:gap-6 p-4 md:p-8">
      <DishDisplay />
    </div>
  );
  
  return (
    <>
      <div className="cooking-area flex-1 bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 overflow-auto h-full">
        {cookingState.phase === 'idle' && renderIdleState()}
        {cookingState.phase === 'selecting' && renderSelectingState()}
        {cookingState.phase === 'adding-ingredients' && renderAddingIngredientsState()}
        {cookingState.phase === 'cooking' && renderCookingState()}
        {(cookingState.phase === 'done' || cookingState.phase === 'sold') && renderDoneState()}
      </div>
      
      {showShop && <IngredientShopModal onClose={() => setShowShop(false)} />}
    </>
  );
};
