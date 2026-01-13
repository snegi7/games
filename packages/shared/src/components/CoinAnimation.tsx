import React, { useEffect, useState } from 'react';

interface Coin {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface CoinAnimationProps {
  coins: Coin[];
  onComplete?: () => void;
}

export const CoinAnimation: React.FC<CoinAnimationProps> = ({ coins, onComplete }) => {
  const [visibleCoins, setVisibleCoins] = useState<Coin[]>(coins);

  useEffect(() => {
    if (coins.length === 0) return;
    
    const timer = setTimeout(() => {
      setVisibleCoins([]);
      onComplete?.();
    }, 800);

    return () => clearTimeout(timer);
  }, [coins, onComplete]);

  return (
    <div className="coin-animation-container fixed inset-0 pointer-events-none z-50">
      {visibleCoins.map((coin) => (
        <div
          key={coin.id}
          className="absolute text-3xl animate-coin-fly"
          style={{
            '--start-x': `${coin.startX}px`,
            '--start-y': `${coin.startY}px`,
            '--end-x': `${coin.endX}px`,
            '--end-y': `${coin.endY}px`,
          } as React.CSSProperties}
        >
          🪙
        </div>
      ))}
    </div>
  );
};
