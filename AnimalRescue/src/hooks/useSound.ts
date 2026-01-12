import { useRef, useCallback, useEffect } from 'react';

// Sound URLs - using free sound effects
// In production, you'd host these locally or use a CDN
export const SOUNDS = {
  // Background music for plots
  forestFireMusic: '/sounds/forest-fire-suspense.mp3',
  oilSpillMusic: '/sounds/ocean-crisis-suspense.mp3',
  
  // Clock tick
  clockTick: '/sounds/clock-tick.mp3',
  
  // Success sounds
  successChime: '/sounds/success-chime.mp3',
  
  // Animal sounds
  lion: '/sounds/animals/lion-roar.mp3',
  elephant: '/sounds/animals/elephant-trumpet.mp3',
  zebra: '/sounds/animals/zebra-neigh.mp3',
  monkey: '/sounds/animals/monkey-chatter.mp3',
  giraffe: '/sounds/animals/giraffe-hum.mp3',
  clownfish: '/sounds/animals/bubbles.mp3',
  turtle: '/sounds/animals/splash.mp3',
  dolphin: '/sounds/animals/dolphin-click.mp3',
  octopus: '/sounds/animals/underwater-bubbles.mp3',
  whale: '/sounds/animals/whale-song.mp3',
  
  // Failure sound
  failure: '/sounds/failure-sad.mp3',
  wrongAnswer: '/sounds/wrong-buzzer.mp3',
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
    'leo': 'lion',
    'ella': 'elephant',
    'zara': 'zebra',
    'milo': 'monkey',
    'gigi': 'giraffe',
    'nemo': 'clownfish',
    'shelly': 'turtle',
    'dolly': 'dolphin',
    'oscar': 'octopus',
    'wally': 'whale',
  };
  
  return soundMap[creatureId] || 'successChime';
}

// Get background music for a plot
export function getPlotMusic(plotId: string): SoundName {
  const musicMap: Record<string, SoundName> = {
    'forest-fire': 'forestFireMusic',
    'oil-spill': 'oilSpillMusic',
  };
  
  return musicMap[plotId] || 'forestFireMusic';
}
