import React from 'react';

interface CoinDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CoinDisplay: React.FC<CoinDisplayProps> = ({ 
  amount, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-lg px-3 py-2',
    lg: 'text-2xl px-4 py-3'
  };

  return (
    <div 
      className={`coin-display inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full font-bold text-amber-900 shadow-lg ${sizeClasses[size]} ${className}`}
    >
      <span className="coin-icon">🪙</span>
      <span>{amount.toLocaleString()}</span>
    </div>
  );
};
