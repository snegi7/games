/**
 * Cozy Kitchen Sound Effects
 * Uses Web Audio API to generate synthesized sounds
 * No external audio files needed - perfect for a web game!
 */

// Audio context singleton - initialized on first user interaction
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Resume if suspended (browsers require user gesture to play audio)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
};

// Master volume (0 to 1)
const MASTER_VOLUME = 0.3;

/**
 * Play a pleasant "pop" sound for recipe selection
 */
export const playRecipeSelect = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Create oscillator for the "pop"
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  // Pleasant rising tone
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
  
  // Quick fade in and out
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.6, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
  
  osc.start(now);
  osc.stop(now + 0.2);
};

/**
 * Play a light "pick up" sound when starting to drag an ingredient
 */
export const playIngredientPickup = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  // Bright, short sound
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(523, now); // C5
  osc.frequency.exponentialRampToValueAtTime(784, now + 0.05); // G5
  
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.4, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  
  osc.start(now);
  osc.stop(now + 0.1);
};

/**
 * Play a satisfying "plop" sound when dropping ingredient into pot
 */
export const playIngredientDrop = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Main plop sound
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  // Descending "plop"
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
  
  gain.gain.setValueAtTime(MASTER_VOLUME * 0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
  
  osc.start(now);
  osc.stop(now + 0.2);
  
  // Add a subtle "bubble" overtone
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(800, now + 0.05);
  osc2.frequency.exponentialRampToValueAtTime(400, now + 0.12);
  
  gain2.gain.setValueAtTime(0, now);
  gain2.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.2, now + 0.06);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
  
  osc2.start(now + 0.05);
  osc2.stop(now + 0.15);
};

/**
 * Play a warm "fire ignite" sound when cooking starts
 */
export const playCookingStart = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Create noise for the "whoosh"
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
  }
  
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  // Filter to make it more "fire-like"
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(200, now + 0.3);
  filter.Q.value = 2;
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(MASTER_VOLUME * 0.8, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  noise.start(now);
  
  // Add a rising tone
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(100, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
  
  oscGain.gain.setValueAtTime(0, now);
  oscGain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.15, now + 0.05);
  oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
  
  osc.start(now);
  osc.stop(now + 0.35);
};

/**
 * Play a cheerful "ding ding ding" when dish is ready
 */
export const playDishReady = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6 - major chord arpeggio
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    const startTime = now + i * 0.1;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.5, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
    
    osc.start(startTime);
    osc.stop(startTime + 0.4);
  });
  
  // Add a sparkle overlay
  setTimeout(() => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(MASTER_VOLUME * 0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }, 350);
};

/**
 * Play coin collection sound with multiple chimes
 */
export const playCoinCollect = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Coin "clink" sound - metallic
  const notes = [1319, 1568, 2093]; // E6, G6, C7
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Add slight metallic quality with overtones
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    osc2.type = 'triangle';
    osc2.frequency.value = freq * 2.5; // Overtone
    
    const startTime = now + i * 0.08;
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.4, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
    
    gain2.gain.setValueAtTime(0, startTime);
    gain2.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.1, startTime + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
    
    osc.start(startTime);
    osc.stop(startTime + 0.25);
    osc2.start(startTime);
    osc2.stop(startTime + 0.15);
  });
};

/**
 * Play a single coin sound (for each flying coin)
 */
export const playSingleCoin = (delay: number = 0) => {
  const ctx = getAudioContext();
  const now = ctx.currentTime + delay / 1000;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  // High-pitched metallic "ting"
  osc.type = 'sine';
  osc.frequency.setValueAtTime(2400 + Math.random() * 400, now);
  osc.frequency.exponentialRampToValueAtTime(1800, now + 0.08);
  
  gain.gain.setValueAtTime(MASTER_VOLUME * 0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
  
  osc.start(now);
  osc.stop(now + 0.12);
};

/**
 * Play button click sound (generic UI)
 */
export const playButtonClick = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
  
  gain.gain.setValueAtTime(MASTER_VOLUME * 0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
  
  osc.start(now);
  osc.stop(now + 0.08);
};

/**
 * Play unlock sound (for unlocking recipes)
 */
export const playUnlock = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Ascending magical sound
  const notes = [392, 494, 587, 784]; // G4, B4, D5, G5
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    const startTime = now + i * 0.08;
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.45, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
    
    osc.start(startTime);
    osc.stop(startTime + 0.3);
  });
  
  // Add shimmer effect
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    const startTime = now + 0.3 + i * 0.05;
    osc.frequency.setValueAtTime(2000 + Math.random() * 1000, startTime);
    
    gain.gain.setValueAtTime(MASTER_VOLUME * 0.1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
    
    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }
};

/**
 * Play purchase sound (buying ingredients)
 */
export const playPurchase = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Cash register "cha-ching"
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.setValueAtTime(1000, now + 0.05);
  osc.frequency.setValueAtTime(1200, now + 0.1);
  
  gain.gain.setValueAtTime(MASTER_VOLUME * 0.15, now);
  gain.gain.setValueAtTime(MASTER_VOLUME * 0.2, now + 0.05);
  gain.gain.setValueAtTime(MASTER_VOLUME * 0.25, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
  
  osc.start(now);
  osc.stop(now + 0.25);
  
  // Add bell
  const bell = ctx.createOscillator();
  const bellGain = ctx.createGain();
  
  bell.connect(bellGain);
  bellGain.connect(ctx.destination);
  
  bell.type = 'sine';
  bell.frequency.value = 1500;
  
  bellGain.gain.setValueAtTime(0, now + 0.12);
  bellGain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.3, now + 0.14);
  bellGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
  
  bell.start(now + 0.12);
  bell.stop(now + 0.4);
};
