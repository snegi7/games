import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';

interface OnboardingArrowProps {
  targetTab: 'recipes' | 'cook' | 'ingredients';
  message: string;
}

// Thick mustard-colored arrow pointing down - shorter with fatter shaft
const MustardArrowDown = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" className="drop-shadow-xl">
    <defs>
      <linearGradient id="mustardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5C842"/>
        <stop offset="50%" stopColor="#D4A020"/>
        <stop offset="100%" stopColor="#C4901A"/>
      </linearGradient>
      <filter id="arrowShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Main arrow shape - shorter with fat shaft */}
    <path
      d="M35 2 L35 30 L10 30 L35 68 L60 30 L35 30 L35 2 Z"
      fill="url(#mustardGradient)"
      stroke="#A67C15"
      strokeWidth="3"
      strokeLinejoin="round"
      filter="url(#arrowShadow)"
    />
    
    {/* Fat shaft overlay for extra thickness */}
    <rect x="22" y="2" width="26" height="28" rx="4" fill="url(#mustardGradient)" />
    
    {/* Shine effect */}
    <path
      d="M28 8 L28 28 L18 28"
      fill="none"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Thick mustard-colored arrow pointing left - shorter with fatter shaft
const MustardArrowLeft = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" className="drop-shadow-xl">
    <defs>
      <linearGradient id="mustardGradientH" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5C842"/>
        <stop offset="50%" stopColor="#D4A020"/>
        <stop offset="100%" stopColor="#C4901A"/>
      </linearGradient>
      <filter id="arrowShadowH" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Main arrow shape pointing left - shorter with fat shaft */}
    <path
      d="M68 35 L40 35 L40 10 L2 35 L40 60 L40 35 L68 35 Z"
      fill="url(#mustardGradientH)"
      stroke="#A67C15"
      strokeWidth="3"
      strokeLinejoin="round"
      filter="url(#arrowShadowH)"
    />
    
    {/* Fat shaft overlay for extra thickness */}
    <rect x="40" y="22" width="28" height="26" rx="4" fill="url(#mustardGradientH)" />
    
    {/* Shine effect */}
    <path
      d="M62 28 L45 28 L45 18"
      fill="none"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const OnboardingArrow: React.FC<OnboardingArrowProps> = ({ message }) => {
  const [dismissed, setDismissed] = useState(false);
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  const cookingState = useGameStore((state) => state.cookingState);
  
  // Auto-dismiss when user selects a recipe
  useEffect(() => {
    if (selectedRecipeId || cookingState.phase !== 'idle') {
      setDismissed(true);
    }
  }, [selectedRecipeId, cookingState.phase]);
  
  // Check if this is a returning user
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('cozy-kitchen-onboarding');
    if (hasSeenOnboarding) {
      setDismissed(true);
    }
  }, []);
  
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('cozy-kitchen-onboarding', 'true');
  };
  
  if (dismissed) return null;
  
  return (
    <>
      {/* Mobile: Arrow pointing down to recipes tab */}
      <div 
        className="md:hidden fixed inset-0 z-40"
        onClick={handleDismiss}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Message bubble and arrow - positioned to point to LEFT side (Recipes tab) */}
        <div className="absolute bottom-36 left-[15%] flex flex-col items-center">
          {/* Message bubble */}
          <div className="bg-white rounded-3xl px-6 py-4 shadow-2xl border-4 border-amber-400 max-w-[300px] text-center mb-2">
            <p className="text-xl font-bold text-amber-800 font-game leading-tight">
              {message}
            </p>
            <p className="text-sm text-gray-500 mt-2">Tap anywhere to dismiss</p>
          </div>
          
          {/* Bouncing mustard arrow pointing down */}
          <div className="animate-bounce-arrow">
            <MustardArrowDown />
          </div>
        </div>
        
        {/* Spotlight on recipes tab - positioned on the LEFT */}
        <div className="absolute bottom-2 left-[8%] pointer-events-none">
          <div className="w-16 h-16 rounded-full border-4 border-amber-400 animate-pulse bg-amber-100/50" />
        </div>
      </div>
      
      {/* Desktop: Arrow pointing to recipe panel header */}
      <div 
        className="hidden md:block fixed inset-0 z-40"
        onClick={handleDismiss}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Arrow and message positioned near recipe panel header */}
        <div className="absolute top-20 left-72 lg:left-80 flex items-center gap-3">
          {/* Bouncing mustard arrow pointing left */}
          <div className="animate-bounce-arrow-horizontal">
            <MustardArrowLeft />
          </div>
          
          {/* Message bubble */}
          <div className="bg-white rounded-3xl px-8 py-5 shadow-2xl border-4 border-amber-400 max-w-sm">
            <p className="text-2xl font-bold text-amber-800 font-game leading-tight">
              {message}
            </p>
            <p className="text-base text-gray-500 mt-2">Click anywhere to dismiss</p>
          </div>
        </div>
        
      </div>
    </>
  );
};
