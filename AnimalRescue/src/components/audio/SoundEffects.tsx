import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { SOUNDS, getAnimalSoundName } from '@/hooks/useSound';
import { AudioManager } from '@/utils/AudioManager';
import { playSuccessSound, playFailureSound, playAnimalSound } from '@/utils/soundGenerator';

export function SoundEffects() {
  const { currentScreen, savedCreatures, lostCreatures } = useGameStore();
  const prevSavedCountRef = useRef(0);
  const prevScreenRef = useRef(currentScreen);

  // Play animal rescue sound when a new animal is saved
  useEffect(() => {
    if (savedCreatures.length > prevSavedCountRef.current) {
      // A new animal was saved!
      const newlySaved = savedCreatures[savedCreatures.length - 1];
      
      // Try to play audio file via AudioManager
      const sfx = AudioManager.playSfx(SOUNDS.successChime, 0.6);
      
      if (!sfx) {
        // Fallback to synthesized success sound if audio not unlocked
        playSuccessSound();
      }

      // Play animal-specific sound after a short delay
      setTimeout(() => {
        const animalSoundKey = getAnimalSoundName(newlySaved.id);
        const animalSfx = AudioManager.playSfx(SOUNDS[animalSoundKey], 0.7);
        
        if (!animalSfx) {
          // Fallback to synthesized animal sound
          playAnimalSound(animalSoundKey);
        }
      }, 300);
    }
    prevSavedCountRef.current = savedCreatures.length;
  }, [savedCreatures]);

  // Play failure sound when game ends with lost animals
  useEffect(() => {
    if (
      currentScreen === 'result' && 
      prevScreenRef.current === 'gameplay' &&
      lostCreatures.length > 0
    ) {
      // Game ended with failure
      const sfx = AudioManager.playSfx(SOUNDS.failure, 0.5);
      
      if (!sfx) {
        // Fallback to synthesized failure sound
        playFailureSound();
      }
    }
    
    prevScreenRef.current = currentScreen;
  }, [currentScreen, lostCreatures]);

  return null;
}
