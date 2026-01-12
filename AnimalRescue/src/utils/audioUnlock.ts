// Audio unlock utility for mobile browsers
// Mobile browsers require user interaction before playing audio

let audioContext: AudioContext | null = null;
let isUnlocked = false;
let pendingAudio: HTMLAudioElement | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

export function isAudioUnlocked(): boolean {
  return isUnlocked;
}

// Call this on any user interaction to unlock audio
export async function unlockAudio(): Promise<void> {
  if (isUnlocked) return;

  try {
    const ctx = getAudioContext();
    
    // Resume the audio context if it's suspended
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    // Create and play a silent buffer to unlock audio
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    
    isUnlocked = true;
    
    // If there's pending audio, play it now
    if (pendingAudio) {
      const audio = pendingAudio;
      pendingAudio = null;
      await playAudioElement(audio);
    }
  } catch (error) {
    console.log('Audio unlock failed:', error);
  }
}

// Play an audio element with mobile support
export async function playAudioElement(audio: HTMLAudioElement): Promise<void> {
  // If not unlocked yet, store as pending and wait for user interaction
  if (!isUnlocked) {
    pendingAudio = audio;
    console.log('Audio queued, waiting for user interaction...');
    return;
  }
  
  try {
    // Make sure audio context is running
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    // Load the audio if needed
    if (audio.readyState < 2) {
      await new Promise<void>((resolve, reject) => {
        const onCanPlay = () => {
          audio.removeEventListener('canplay', onCanPlay);
          audio.removeEventListener('error', onError);
          resolve();
        };
        const onError = () => {
          audio.removeEventListener('canplay', onCanPlay);
          audio.removeEventListener('error', onError);
          reject(new Error('Audio load failed'));
        };
        audio.addEventListener('canplay', onCanPlay);
        audio.addEventListener('error', onError);
        audio.load();
      });
    }
    
    // Reset and play
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise) {
      await playPromise;
    }
  } catch (error) {
    console.log('Audio playback failed:', error);
  }
}

// Set pending audio to be played on next unlock
export function setPendingAudio(audio: HTMLAudioElement): void {
  pendingAudio = audio;
}
