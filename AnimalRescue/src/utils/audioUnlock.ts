// Audio unlock utility for mobile browsers
// Mobile browsers require user interaction before playing audio

let audioContext: AudioContext | null = null;
let isUnlocked = false;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

export function isAudioUnlocked(): boolean {
  return isUnlocked;
}

// Call this on any user interaction to unlock audio
export async function unlockAudio(): Promise<void> {
  if (isUnlocked) return;

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
}

// Play an audio element with mobile support
export async function playAudioElement(audio: HTMLAudioElement): Promise<void> {
  await unlockAudio();
  
  try {
    // Reset to start
    audio.currentTime = 0;
    await audio.play();
  } catch (error) {
    console.log('Audio playback failed:', error);
  }
}
