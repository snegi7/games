interface GoldCoinProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export const GoldCoin: React.FC<GoldCoinProps> = ({ 
  size = 'md', 
  className = '',
  animate = true 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} ${animate ? 'animate-coin-spin' : ''} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Outer ring - darker gold */}
        <circle cx="50" cy="50" r="48" fill="url(#coinGradient)" stroke="#B8860B" strokeWidth="3"/>
        
        {/* Inner ring */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#DAA520" strokeWidth="2" opacity="0.6"/>
        
        {/* Dollar sign or star */}
        <text 
          x="50" 
          y="65" 
          textAnchor="middle" 
          fontSize="40" 
          fontWeight="bold" 
          fill="#8B6914"
          fontFamily="serif"
        >
          $
        </text>
        
        {/* Shine effect */}
        <ellipse cx="35" cy="35" rx="12" ry="8" fill="white" opacity="0.4" transform="rotate(-30 35 35)"/>
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700"/>
            <stop offset="30%" stopColor="#FFEC8B"/>
            <stop offset="50%" stopColor="#FFD700"/>
            <stop offset="70%" stopColor="#DAA520"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Multiple stacked coins for display
export const GoldCoinStack: React.FC<{ count?: number; className?: string }> = ({ 
  count = 3, 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
        <div 
          key={i} 
          className="absolute"
          style={{ 
            top: `${i * -3}px`, 
            left: `${i * 2}px`,
            zIndex: count - i 
          }}
        >
          <GoldCoin size="md" animate={i === 0} />
        </div>
      ))}
    </div>
  );
};
