interface GoldCoinProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
  inline?: boolean;
}

export const GoldCoin: React.FC<GoldCoinProps> = ({ 
  size = 'md', 
  className = '',
  animate = true,
  inline = false
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  // Generate unique ID to avoid gradient conflicts when multiple coins are rendered
  const gradientId = `coinGradient-${Math.random().toString(36).substr(2, 9)}`;
  const glowId = `coinGlow-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div 
      className={`${sizeClasses[size]} ${animate ? 'animate-coin-spin' : ''} ${inline ? 'inline-flex align-middle' : ''} ${className}`}
      style={inline ? { display: 'inline-flex', verticalAlign: 'middle' } : undefined}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(218, 165, 32, 0.6)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))' }}>
        {/* Gradient definitions */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8DC"/>
            <stop offset="15%" stopColor="#FFE55C"/>
            <stop offset="35%" stopColor="#FFD700"/>
            <stop offset="50%" stopColor="#FFEC8B"/>
            <stop offset="65%" stopColor="#FFD700"/>
            <stop offset="85%" stopColor="#DAA520"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
          <radialGradient id={glowId} cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FFFACD" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#B8860B" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Outer glow ring */}
        <circle cx="50" cy="50" r="49" fill={`url(#${glowId})`} opacity="0.6"/>
        
        {/* Main coin body */}
        <circle cx="50" cy="50" r="46" fill={`url(#${gradientId})`} stroke="#8B6914" strokeWidth="2"/>
        
        {/* Raised edge effect */}
        <circle cx="50" cy="50" r="44" fill="none" stroke="#FFE55C" strokeWidth="1.5" opacity="0.8"/>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#DAA520" strokeWidth="1" opacity="0.4"/>
        
        {/* Inner decorative ring */}
        <circle cx="50" cy="50" r="36" fill="none" stroke="#8B6914" strokeWidth="1.5" opacity="0.5"/>
        
        {/* Kitchen coin symbol - fork & knife */}
        <text 
          x="50" 
          y="62" 
          textAnchor="middle" 
          fontSize="32" 
          fill="#7B5F14"
        >
          🍴
        </text>
        
        {/* Primary shine - top left */}
        <ellipse cx="32" cy="32" rx="14" ry="10" fill="white" opacity="0.7" transform="rotate(-35 32 32)"/>
        
        {/* Secondary shine - smaller */}
        <ellipse cx="25" cy="40" rx="5" ry="3" fill="white" opacity="0.4" transform="rotate(-35 25 40)"/>
        
        {/* Bottom highlight for 3D effect */}
        <ellipse cx="65" cy="70" rx="10" ry="6" fill="#FFFACD" opacity="0.3" transform="rotate(30 65 70)"/>
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
