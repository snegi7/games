import { useGameStore, useSelectedRecipe, useMissingIngredients } from '../store/gameStore';
import { getIngredientById } from '../data/ingredients';

interface MobileIngredientSelectorProps {
  onOpenShop: () => void;
}

export const MobileIngredientSelector: React.FC<MobileIngredientSelectorProps> = ({ onOpenShop }) => {
  const selectedRecipe = useSelectedRecipe();
  const droppedIngredients = useGameStore((state) => state.droppedIngredients);
  const dropIngredient = useGameStore((state) => state.dropIngredient);
  const ownedIngredients = useGameStore((state) => state.ownedIngredients);
  const missingIngredients = useMissingIngredients();
  
  if (!selectedRecipe) return null;
  
  const handleIngredientTap = (ingredientId: string) => {
    dropIngredient(ingredientId);
  };
  
  return (
    <div className="w-full max-w-sm bg-white/80 rounded-2xl p-3 shadow-lg">
      <p className="text-xs text-amber-700 text-center mb-2 font-bold">
        Tap ingredients to add them:
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {selectedRecipe.ingredients.map((ingredientId) => {
          const ingredient = getIngredientById(ingredientId);
          if (!ingredient) return null;
          
          const isDropped = droppedIngredients.includes(ingredientId);
          const isMissing = missingIngredients.includes(ingredientId);
          const owned = ownedIngredients.find(oi => oi.ingredientId === ingredientId);
          const hasIngredient = owned && owned.quantity > 0;
          
          return (
            <button
              key={ingredientId}
              onClick={() => {
                if (isMissing) {
                  onOpenShop();
                } else if (!isDropped && hasIngredient) {
                  handleIngredientTap(ingredientId);
                }
              }}
              disabled={isDropped}
              className={`
                flex flex-col items-center p-2 rounded-xl transition-all
                ${isDropped 
                  ? 'bg-green-200 opacity-50' 
                  : isMissing
                    ? 'bg-red-100 border-2 border-red-300'
                    : 'bg-gradient-to-br from-kitchen-cream to-kitchen-peach border-2 border-orange-200 active:scale-95'
                }
              `}
            >
              <span className="text-2xl">{ingredient.emoji}</span>
              <span className="text-xs mt-1">
                {isDropped ? '✓' : isMissing ? '🛒' : ingredient.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {missingIngredients.length > 0 && (
        <p className="text-xs text-orange-600 text-center mt-2">
          🛒 = Tap to buy missing ingredients
        </p>
      )}
    </div>
  );
};
