import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { SOUNDS, getPlotMusic } from '@/hooks/useSound';

export function BackgroundMusic() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const currentPlot = useGameStore((state) => state.currentPlot);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play during plot screen and gameplay
    if ((currentScreen === 'plot' || currentScreen === 'gameplay') && currentPlot) {
      // Stop any existing music first
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const musicKey = getPlotMusic(currentPlot.id);
      const musicSrc = SOUNDS[musicKey];
      
      // Try to load and play audio file
      const audio = new Audio(musicSrc);
      audio.loop = true;
      audio.volume = 0.25;
      audioRef.current = audio;
      
      // Only play if audio file exists - no fallback synthesized music
      audio.play().catch(() => {
        // Audio file not found or autoplay blocked - that's okay, just no music
        console.log('Background music not available. Add audio files to public/sounds/');
      });
      
    } else {
      // Stop music when not in gameplay
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [currentScreen, currentPlot]);

  return null;
}
