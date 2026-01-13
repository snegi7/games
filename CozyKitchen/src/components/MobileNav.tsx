import { useGameStore } from '../store/gameStore';

type MobileTab = 'recipes' | 'cook' | 'ingredients';

interface MobileNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  glowRecipes?: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange, glowRecipes = false }) => {
  const ownedIngredients = useGameStore((state) => state.ownedIngredients);
  const unlockedRecipeIds = useGameStore((state) => state.unlockedRecipeIds);
  
  const ingredientCount = ownedIngredients.reduce((sum, oi) => sum + oi.quantity, 0);
  
  const tabs: { id: MobileTab; icon: string; label: string; badge?: number }[] = [
    { id: 'recipes', icon: '📖', label: 'Recipes', badge: unlockedRecipeIds.length },
    { id: 'cook', icon: '🍳', label: 'Cook' },
    { id: 'ingredients', icon: '🧺', label: 'Items', badge: ingredientCount },
  ];
  
  return (
    <nav className="md:hidden bg-white border-t-4 border-orange-300 safe-area-bottom">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const shouldGlow = tab.id === 'recipes' && glowRecipes;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all relative
                ${activeTab === tab.id 
                  ? 'bg-gradient-to-t from-orange-200 to-yellow-100 scale-110' 
                  : 'opacity-60'
                }
                ${shouldGlow ? 'animate-glow-pulse' : ''}
              `}
            >
              <span className={`text-2xl ${shouldGlow ? 'animate-bounce-slow' : ''}`}>
                {tab.icon}
              </span>
              <span className={`text-xs font-bold ${activeTab === tab.id ? 'text-orange-700' : 'text-gray-500'}`}>
                {tab.label}
              </span>
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
              
              {/* Glow ring when recipes should glow */}
              {shouldGlow && (
                <span className="absolute inset-0 rounded-xl border-4 border-amber-400 animate-ping opacity-75" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
