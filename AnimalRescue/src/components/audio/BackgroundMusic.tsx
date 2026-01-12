import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import { SOUNDS, getPlotMusic } from '@/hooks/useSound';
import { playAudioElement, unlockAudio } from '@/utils/audioUnlock';

export function BackgroundMusic() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const currentPlot = useGameStore((state) => state.currentPlot);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasUserInteracted = useRef(false);

  // Unlock audio on any user interaction
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted.current) {
      hasUserInteracted.current = true;
      unlockAudio();
      
      // If we should be playing music, start it now
      if ((currentScreen === 'plot' || currentScreen === 'gameplay') && audioRef.current) {
        playAudioElement(audioRef.current);
      }
    }
  }, [currentScreen]);

  // Listen for user interaction to unlock audio
  useEffect(() => {
    const events = ['touchstart', 'touchend', 'click', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [handleUserInteraction]);

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
      
      // Try to play - will work if user has already interacted
      playAudioElement(audio).catch(() => {
        console.log('Background music waiting for user interaction...');
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
