import React from 'react';
import { WalletDisplay } from './components/WalletDisplay';
import { RecipePanel } from './components/RecipePanel';
import { CookingArea } from './components/CookingArea';
import { IngredientPanel } from './components/IngredientPanel';
import { useGameStore } from './store/gameStore';

function App() {
  const resetGame = useGameStore((state) => state.resetGame);
  
  return (
    <div className="app h-screen w-screen flex flex-col overflow-hidden bg-kitchen-cream font-game">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🍳</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-display drop-shadow-lg">
            Cozy Kitchen
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <WalletDisplay />
          <button
            onClick={() => {
              if (confirm('Reset all progress? This cannot be undone!')) {
                resetGame();
              }
            }}
            className="text-white/70 hover:text-white text-sm underline"
            title="Reset Game"
          >
            🔄 Reset
          </button>
        </div>
      </header>
      
      {/* Main game area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Recipe book */}
        <aside className="w-64 lg:w-72 flex-shrink-0 overflow-hidden">
          <RecipePanel />
        </aside>
        
        {/* Center - Cooking area */}
        <main className="flex-1 overflow-hidden">
          <CookingArea />
        </main>
      </div>
      
      {/* Bottom panel - Ingredients */}
      <footer className="flex-shrink-0">
        <IngredientPanel />
      </footer>
    </div>
  );
}

export default App;
