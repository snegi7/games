import React from 'react';
import { useGameStore } from '../store/gameStore';

export const WalletDisplay: React.FC = () => {
  const coins = useGameStore((state) => state.coins);
  
  return (
    <div 
      id="wallet-display"
      className="wallet-display flex items-center gap-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-6 py-3 rounded-full shadow-lg border-4 border-amber-600"
    >
      <span className="text-3xl animate-bounce-slow">🪙</span>
      <span className="text-2xl font-bold text-amber-900 font-game">
        {coins.toLocaleString()}
      </span>
    </div>
  );
};
