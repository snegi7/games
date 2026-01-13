import { useEffect, useState, useRef } from 'react';

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
  const [walletPosition, setWalletPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Find the wallet element position
    const walletElement = document.getElementById('wallet-display');
    if (walletElement) {
      const rect = walletElement.getBoundingClientRect();
      setWalletPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    
    // Start position is center of viewport (where dish is displayed)
    setStartPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.4,
    });
    
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
  
  // Calculate the delta for animation
  const deltaX = walletPosition.x - startPosition.x;
  const deltaY = walletPosition.y - startPosition.y;
  
  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute text-4xl"
          style={{
            left: startPosition.x,
            top: startPosition.y,
            transform: 'translate(-50%, -50%)',
            animation: `coinFlyToWallet-${coin.id} 0.8s ease-out ${coin.delay}ms forwards`,
          }}
        >
          🪙
        </div>
      ))}
      
      <style>{`
        ${coins.map((coin) => `
          @keyframes coinFlyToWallet-${coin.id} {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            40% {
              transform: translate(
                calc(-50% + ${deltaX * 0.3}px), 
                calc(-50% + ${deltaY * 0.5 - 50}px)
              ) scale(1.3);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50% + ${deltaX}px), 
                calc(-50% + ${deltaY}px)
              ) scale(0.3);
              opacity: 0;
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};
