import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { AudioManager } from '@/utils/AudioManager';

// Base URL for assets
const BASE_URL = import.meta.env.BASE_URL;

export function BackgroundMusic() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const currentPlot = useGameStore((state) => state.currentPlot);

  useEffect(() => {
    // Play during plot screen and gameplay
    if ((currentScreen === 'plot' || currentScreen === 'gameplay') && currentPlot) {
      const musicSrc = `${BASE_URL}sounds/${currentPlot.musicFile}`;
      AudioManager.playBgMusic(musicSrc);
    } else {
      // Stop music when not in gameplay
      AudioManager.stopBgMusic();
    }

    // Cleanup on unmount
    return () => {
      AudioManager.stopBgMusic();
    };
  }, [currentScreen, currentPlot]);

  return null;
}
