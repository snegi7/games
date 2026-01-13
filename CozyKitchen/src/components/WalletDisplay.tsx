import { useGameStore } from '../store/gameStore';
import { GoldCoin } from './GoldCoin';

export const WalletDisplay: React.FC = () => {
  const coins = useGameStore((state) => state.coins);
  
  return (
    <div 
      id="wallet-display"
      className="wallet-display flex items-center gap-1.5 md:gap-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-lg border-2 md:border-4 border-amber-700"
      style={{
        boxShadow: '0 4px 15px rgba(218, 165, 32, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
      }}
    >
      <GoldCoin size="sm" className="md:hidden" />
      <GoldCoin size="md" className="hidden md:block" />
      <span className="text-lg md:text-2xl font-bold text-amber-900 font-game drop-shadow-sm">
        {coins.toLocaleString()}
      </span>
    </div>
  );
};
