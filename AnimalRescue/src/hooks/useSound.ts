import { useRef, useCallback, useEffect } from 'react';

// Base URL for assets
const BASE_URL = import.meta.env.BASE_URL;

// Sound URLs - using free sound effects
// In production, you'd host these locally or use a CDN
export const SOUNDS = {
  // Clock tick
  clockTick: `${BASE_URL}sounds/clock-tick.mp3`,
  
  // Success sounds
  successChime: `${BASE_URL}sounds/success-chime.mp3`,
  
  // Animal sounds
  lion: `${BASE_URL}sounds/animals/lion-roar.mp3`,
  elephant: `${BASE_URL}sounds/animals/elephant-trumpet.mp3`,
  zebra: `${BASE_URL}sounds/animals/zebra-neigh.mp3`,
  monkey: `${BASE_URL}sounds/animals/monkey-chatter.mp3`,
  giraffe: `${BASE_URL}sounds/animals/giraffe-hum.mp3`,
  clownfish: `${BASE_URL}sounds/animals/bubbles.mp3`,
  turtle: `${BASE_URL}sounds/animals/splash.mp3`,
  dolphin: `${BASE_URL}sounds/animals/dolphin-click.mp3`,
  octopus: `${BASE_URL}sounds/animals/underwater-bubbles.mp3`,
  whale: `${BASE_URL}sounds/animals/whale-song.mp3`,
  
  // Failure sound
  failure: `${BASE_URL}sounds/failure-sad.mp3`,
  wrongAnswer: `${BASE_URL}sounds/wrong-buzzer.mp3`,
} as const;

export type SoundName = keyof typeof SOUNDS;

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
}

// Audio cache to avoid reloading
const audioCache: Map<string, HTMLAudioElement> = new Map();

function getAudio(src: string): HTMLAudioElement {
  if (!audioCache.has(src)) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audioCache.set(src, audio);
  }
  return audioCache.get(src)!;
}

export function useSound(soundName: SoundName, options: UseSoundOptions = {}) {
  const { volume = 1, loop = false } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = getAudio(SOUNDS[soundName]);
    audio.volume = volume;
    audio.loop = loop;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [soundName, volume, loop]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, ignore error
      });
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, vol));
    }
  }, []);

  return { play, stop, pause, setVolume };
}

// Hook for playing sounds dynamically by name
export function useSoundPlayer() {
  const play = useCallback((soundName: SoundName, options: UseSoundOptions = {}) => {
    const { volume = 1, loop = false } = options;
    const audio = getAudio(SOUNDS[soundName]);
    audio.volume = volume;
    audio.loop = loop;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Autoplay might be blocked
    });
    return audio;
  }, []);

  const stop = useCallback((soundName: SoundName) => {
    const audio = audioCache.get(SOUNDS[soundName]);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const stopAll = useCallback(() => {
    audioCache.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  return { play, stop, stopAll };
}

// Map creature IDs to their sound names
export function getAnimalSoundName(creatureId: string): SoundName {
  const soundMap: Record<string, SoundName> = {
    // Forest Fire
    'ff-1': 'lion',
    'ff-2': 'elephant',
    'ff-3': 'zebra',
    'ff-4': 'monkey',
    'ff-5': 'giraffe',
    // Oil Spill
    'os-1': 'clownfish',
    'os-2': 'turtle',
    'os-3': 'dolphin',
    'os-4': 'octopus',
    'os-5': 'whale',
    // Farm Flood (Mapping to similar sounds or default)
    'ffl-1': 'elephant', // Cow (similar trumpet)
    'ffl-2': 'monkey',   // Pig (playful)
    'ffl-3': 'zebra',    // Sheep (herbivore)
    'ffl-4': 'zebra',    // Horse
    'ffl-5': 'successChime', // Chicken
    // Zoo Escape
    'ze-1': 'successChime', // Panda
    'ze-2': 'lion',        // Tiger
    'ze-3': 'monkey',      // Gorilla
    'ze-4': 'zebra',       // Kangaroo
    'ze-5': 'successChime', // Peacock
    // Arctic Melt
    'am-1': 'successChime', // Penguin
    'am-2': 'successChime', // Polar Bear
    'am-3': 'dolphin',      // Seal
    'am-4': 'successChime', // Arctic Fox
    'am-5': 'successChime', // Snowy Owl
  };
  
  return soundMap[creatureId] || 'successChime';
}

