import { useEffect, useState, useRef } from 'react';
import { GoldCoin } from './GoldCoin';

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
        delay: i * 100, // Slightly longer delay for better visual
      });
    }
    
    setCoins(newCoins);
    
    // Complete animation after all coins have flown
    const timer = setTimeout(() => {
      setCompleted(true);
      onComplete();
    }, numCoins * 100 + 1000);
    
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
          className="absolute"
          style={{
            left: startPosition.x,
            top: startPosition.y,
            transform: 'translate(-50%, -50%)',
            animation: `coinFlyToWallet-${coin.id} 1s ease-out ${coin.delay}ms forwards`,
          }}
        >
          <div className="relative">
            <GoldCoin size="lg" animate={false} />
            {/* Sparkle effect */}
            <div className="absolute inset-0 animate-ping opacity-50">
              <GoldCoin size="lg" animate={false} />
            </div>
          </div>
        </div>
      ))}
      
      <style>{`
        ${coins.map((coin) => `
          @keyframes coinFlyToWallet-${coin.id} {
            0% {
              transform: translate(-50%, -50%) scale(1) rotate(0deg);
              opacity: 1;
            }
            30% {
              transform: translate(
                calc(-50% + ${deltaX * 0.2}px), 
                calc(-50% + ${deltaY * 0.4 - 80}px)
              ) scale(1.5) rotate(180deg);
              opacity: 1;
            }
            70% {
              transform: translate(
                calc(-50% + ${deltaX * 0.7}px), 
                calc(-50% + ${deltaY * 0.8}px)
              ) scale(1) rotate(360deg);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50% + ${deltaX}px), 
                calc(-50% + ${deltaY}px)
              ) scale(0.5) rotate(540deg);
              opacity: 0;
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};
