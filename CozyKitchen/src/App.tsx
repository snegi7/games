import { useState } from 'react';
import { WalletDisplay } from './components/WalletDisplay';
import { RecipePanel } from './components/RecipePanel';
import { CookingArea } from './components/CookingArea';
import { IngredientPanel } from './components/IngredientPanel';
import { MobileNav } from './components/MobileNav';
import { useGameStore } from './store/gameStore';

type MobileTab = 'recipes' | 'cook' | 'ingredients';

function App() {
  const resetGame = useGameStore((state) => state.resetGame);
  const [activeTab, setActiveTab] = useState<MobileTab>('cook');
  
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
          <RecipePanel />
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
      
      {/* Mobile Layout */}
      <div className="flex-1 md:hidden overflow-hidden">
        {activeTab === 'recipes' && (
          <div className="h-full overflow-auto">
            <RecipePanel onRecipeSelect={() => setActiveTab('cook')} />
          </div>
        )}
        {activeTab === 'cook' && (
          <div className="h-full overflow-auto">
            <CookingArea isMobile />
          </div>
        )}
        {activeTab === 'ingredients' && (
          <div className="h-full overflow-auto p-2">
            <IngredientPanel isMobile />
          </div>
        )}
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
