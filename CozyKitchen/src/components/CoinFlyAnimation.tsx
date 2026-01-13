import React, { useEffect, useState } from 'react';

interface CoinFlyAnimationProps {
  amount: number;
  onComplete: () => void;
}

interface FlyingCoin {
  id: number;
  delay: number;
}

export const CoinFlyAnimation: React.FC<CoinFlyAnimationProps> = ({ amount, onComplete }) => {
  const [coins, setCoins] = useState<FlyingCoin[]>([]);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    // Create coins based on amount (max 10 coins)
    const numCoins = Math.min(Math.ceil(amount / 5), 10);
    const newCoins: FlyingCoin[] = [];
    
    for (let i = 0; i < numCoins; i++) {
      newCoins.push({
        id: i,
        delay: i * 80,
      });
    }
    
    setCoins(newCoins);
    
    // Complete animation after all coins have flown
    const timer = setTimeout(() => {
      setCompleted(true);
      onComplete();
    }, numCoins * 80 + 800);
    
    return () => clearTimeout(timer);
  }, [amount, onComplete]);
  
  if (completed) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute text-4xl"
          style={{
            left: '50%',
            top: '40%',
            animation: `coinFlyToWallet 0.8s ease-out ${coin.delay}ms forwards`,
          }}
        >
          🪙
        </div>
      ))}
      
      <style>{`
        @keyframes coinFlyToWallet {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(calc(50vw - 100px), -30vh) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translate(calc(50vw - 50px), -45vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
