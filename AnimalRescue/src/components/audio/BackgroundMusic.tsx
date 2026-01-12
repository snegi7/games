import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import { SOUNDS, getPlotMusic } from '@/hooks/useSound';
import { playAudioElement, unlockAudio, isAudioUnlocked, setPendingAudio } from '@/utils/audioUnlock';

export function BackgroundMusic() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const currentPlot = useGameStore((state) => state.currentPlot);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Unlock audio on any user interaction
  const handleUserInteraction = useCallback(async () => {
    await unlockAudio();
      
    // If we should be playing music and have audio ready, start it now
    if ((currentScreen === 'plot' || currentScreen === 'gameplay') && audioRef.current) {
      playAudioElement(audioRef.current);
    }
  }, [currentScreen]);

  // Listen for user interaction to unlock audio
  useEffect(() => {
    const events = ['touchstart', 'touchend', 'click', 'keydown', 'pointerdown'];
    
    const handler = () => handleUserInteraction();
    
    events.forEach(event => {
      document.addEventListener(event, handler, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handler);
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
      
      // Create audio element
      const audio = new Audio(musicSrc);
      audio.loop = true;
      audio.volume = 0.25;
      audio.preload = 'auto';
      audioRef.current = audio;
      
      // If already unlocked, play immediately
      if (isAudioUnlocked()) {
        playAudioElement(audio);
      } else {
        // Otherwise, set as pending to play when unlocked
        setPendingAudio(audio);
        console.log('Background music queued, waiting for user interaction...');
      }
      
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
