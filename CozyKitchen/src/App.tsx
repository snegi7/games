import { useState } from 'react';
import { WalletDisplay } from './components/WalletDisplay';
import { RecipePanel } from './components/RecipePanel';
import { CookingArea } from './components/CookingArea';
import { IngredientPanel } from './components/IngredientPanel';
import { MobileRecipeDrawer } from './components/MobileRecipeDrawer';
import { useGameStore } from './store/gameStore';
import { playButtonClick } from './utils/sounds';

function App() {
  const resetGame = useGameStore((state) => state.resetGame);
  const cookingState = useGameStore((state) => state.cookingState);
  const unlockedRecipeIds = useGameStore((state) => state.unlockedRecipeIds);
  const [isRecipeDrawerOpen, setIsRecipeDrawerOpen] = useState(false);
  
  // Show glowing recipe icon when idle (no recipe selected)
  const showRecipeGlow = cookingState.phase === 'idle';
  
  return (
    <div className="app h-screen w-screen flex flex-col overflow-hidden bg-kitchen-cream font-game">
      {/* Header */}
      <header className="flex items-center justify-between px-3 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 shadow-lg">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-2xl md:text-4xl">🍳</span>
          <h1 className="text-lg md:text-3xl font-bold text-white font-display drop-shadow-lg">
            Cozy Kitchen
          </h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <WalletDisplay />
          <button
            onClick={() => {
              if (confirm('Reset all progress? This cannot be undone!')) {
                resetGame();
              }
            }}
            className="text-white/70 hover:text-white text-xs md:text-sm underline hidden md:block"
            title="Reset Game"
          >
            🔄 Reset
          </button>
        </div>
      </header>
      
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Left panel - Recipe book */}
        <aside className="w-64 lg:w-72 flex-shrink-0 overflow-hidden">
          <RecipePanel showGlow={showRecipeGlow} />
        </aside>
        
        {/* Center - Cooking area */}
        <main className="flex-1 overflow-hidden">
          <CookingArea />
        </main>
      </div>
      
      {/* Desktop Bottom panel - Ingredients */}
      <footer className="hidden md:block flex-shrink-0">
        <IngredientPanel />
      </footer>
      
      {/* Mobile Layout - New Design */}
      <div className="flex-1 md:hidden flex flex-col overflow-hidden">
        {/* Recipe Button - Top Left */}
        <div className="p-2 flex-shrink-0">
          <button
            onClick={() => {
              playButtonClick();
              setIsRecipeDrawerOpen(true);
            }}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl
              bg-gradient-to-r from-purple-400 to-pink-400
              text-white font-bold shadow-lg
              hover:scale-105 active:scale-95 transition-all
              ${showRecipeGlow ? 'animate-pulse ring-4 ring-amber-300 ring-opacity-75' : ''}
            `}
          >
            <span className="text-xl">📖</span>
            <span className="text-sm">Recipes</span>
            <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs">
              {unlockedRecipeIds.length}
            </span>
            {showRecipeGlow && (
              <span className="text-xs animate-bounce">👆</span>
            )}
          </button>
        </div>
        
        {/* Cooking Area - Takes remaining space */}
        <div className="flex-1 overflow-auto min-h-0">
          <CookingArea isMobile />
        </div>
        
        {/* Ingredient Panel - Always visible at bottom */}
        <div className="flex-shrink-0 border-t-4 border-orange-300 max-h-[35vh] overflow-auto">
          <IngredientPanel isMobile />
        </div>
      </div>
      
      {/* Mobile Recipe Drawer */}
      <MobileRecipeDrawer 
        isOpen={isRecipeDrawerOpen}
        onClose={() => setIsRecipeDrawerOpen(false)}
        showGlow={showRecipeGlow}
      />
    </div>
  );
}

export default App;
