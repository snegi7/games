// Web Audio API Sound Generator
// Generates procedural sounds as fallbacks when audio files aren't available

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

function resumeAudioContext() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
}

// Generate a clock tick sound
export function playTickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  resumeAudioContext();
  
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
  
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
}

// Generate a success chime
export function playSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  resumeAudioContext();
  
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - major chord
  
  notes.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    
    const startTime = ctx.currentTime + i * 0.1;
    gainNode.gain.setValueAtTime(0.2, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.4);
  });
}

// Generate a failure/sad sound
export function playFailureSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  resumeAudioContext();
  
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(400, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);
  
  gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.6);
}

// Generate a wrong answer buzzer
export function playWrongSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  resumeAudioContext();
  
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(150, ctx.currentTime);
  
  gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.3);
}

// Generate animal-like sounds using synthesis
export function playAnimalSound(animalType: string) {
  const ctx = getAudioContext();
  if (!ctx) return;
  resumeAudioContext();
  
  switch (animalType) {
    case 'lion':
      playRoar();
      break;
    case 'elephant':
      playTrumpet();
      break;
    case 'dolphin':
      playDolphinClick();
      break;
    case 'whale':
      playWhaleSound();
      break;
    case 'monkey':
      playMonkeySound();
      break;
    default:
      playSuccessSound();
  }
}

function playRoar() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = 'sawtooth';
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(500, ctx.currentTime);
  
  oscillator.frequency.setValueAtTime(150, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.8);
  
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 1);
}

function playTrumpet() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(200, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2);
  oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.8);
  
  gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 1);
}

function playDolphinClick() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  for (let i = 0; i < 5; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    const startTime = ctx.currentTime + i * 0.1;
    oscillator.frequency.setValueAtTime(2000 + Math.random() * 1000, startTime);
    
    gainNode.gain.setValueAtTime(0.15, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.05);
  }
}

function playWhaleSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(100, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.5);
  oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 1.5);
  
  gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 2);
}

function playMonkeySound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  for (let i = 0; i < 4; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    const startTime = ctx.currentTime + i * 0.15;
    oscillator.frequency.setValueAtTime(800, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, startTime + 0.05);
    oscillator.frequency.exponentialRampToValueAtTime(600, startTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.15, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.12);
  }
}

// ============================================
// BACKGROUND MUSIC LOOPS
// ============================================

interface MusicLoopState {
  isPlaying: boolean;
  oscillators: OscillatorNode[];
  gainNodes: GainNode[];
  intervalId: number | null;
}

// Forest Fire Suspense Music Loop
export function createForestFireMusic(): () => void {
  const ctx = getAudioContext();
  if (!ctx) return () => {};
  resumeAudioContext();
  
  const state: MusicLoopState = {
    isPlaying: true,
    oscillators: [],
    gainNodes: [],
    intervalId: null,
  };

  // Master gain for overall volume
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // Deep bass drone (ominous)
  const bassDrone = ctx.createOscillator();
  const bassGain = ctx.createGain();
  const bassFilter = ctx.createBiquadFilter();
  
  bassDrone.type = 'sawtooth';
  bassDrone.frequency.setValueAtTime(55, ctx.currentTime); // A1
  
  bassFilter.type = 'lowpass';
  bassFilter.frequency.setValueAtTime(200, ctx.currentTime);
  
  bassGain.gain.setValueAtTime(0.4, ctx.currentTime);
  
  bassDrone.connect(bassFilter);
  bassFilter.connect(bassGain);
  bassGain.connect(masterGain);
  bassDrone.start();
  
  state.oscillators.push(bassDrone);
  state.gainNodes.push(bassGain);

  // Pulsing tension pad
  const tensionOsc = ctx.createOscillator();
  const tensionGain = ctx.createGain();
  const tensionFilter = ctx.createBiquadFilter();
  
  tensionOsc.type = 'triangle';
  tensionOsc.frequency.setValueAtTime(110, ctx.currentTime); // A2
  
  tensionFilter.type = 'lowpass';
  tensionFilter.frequency.setValueAtTime(400, ctx.currentTime);
  
  tensionGain.gain.setValueAtTime(0.2, ctx.currentTime);
  
  tensionOsc.connect(tensionFilter);
  tensionFilter.connect(tensionGain);
  tensionGain.connect(masterGain);
  tensionOsc.start();
  
  state.oscillators.push(tensionOsc);
  state.gainNodes.push(tensionGain);

  // Rhythmic pulse (heartbeat-like)
  let beatPhase = 0;
  const playBeat = () => {
    if (!state.isPlaying || !ctx) return;
    
    const beatOsc = ctx.createOscillator();
    const beatGain = ctx.createGain();
    
    beatOsc.type = 'sine';
    beatOsc.frequency.setValueAtTime(60, ctx.currentTime);
    
    beatGain.gain.setValueAtTime(0.3, ctx.currentTime);
    beatGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    beatOsc.connect(beatGain);
    beatGain.connect(masterGain);
    
    beatOsc.start(ctx.currentTime);
    beatOsc.stop(ctx.currentTime + 0.3);
    
    beatPhase = (beatPhase + 1) % 2;
  };

  // Play beat every 500ms (120 BPM feel)
  playBeat();
  state.intervalId = window.setInterval(playBeat, 500);

  // Occasional crackling fire sounds
  const playCrackle = () => {
    if (!state.isPlaying || !ctx) return;
    
    const noise = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    
    noise.type = 'sawtooth';
    noise.frequency.setValueAtTime(Math.random() * 2000 + 1000, ctx.currentTime);
    
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);
    
    noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + 0.15);
    
    // Schedule next crackle
    if (state.isPlaying) {
      setTimeout(playCrackle, Math.random() * 300 + 100);
    }
  };
  
  setTimeout(playCrackle, 200);

  // Return stop function
  return () => {
    state.isPlaying = false;
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }
    state.oscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    state.gainNodes.forEach(gain => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      } catch {}
    });
    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  };
}

// Ocean Crisis Suspense Music Loop
export function createOceanMusic(): () => void {
  const ctx = getAudioContext();
  if (!ctx) return () => {};
  resumeAudioContext();
  
  const state: MusicLoopState = {
    isPlaying: true,
    oscillators: [],
    gainNodes: [],
    intervalId: null,
  };

  // Master gain
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // Deep ocean drone
  const oceanDrone = ctx.createOscillator();
  const oceanGain = ctx.createGain();
  const oceanFilter = ctx.createBiquadFilter();
  
  oceanDrone.type = 'sine';
  oceanDrone.frequency.setValueAtTime(45, ctx.currentTime); // Very low
  
  oceanFilter.type = 'lowpass';
  oceanFilter.frequency.setValueAtTime(150, ctx.currentTime);
  
  oceanGain.gain.setValueAtTime(0.5, ctx.currentTime);
  
  oceanDrone.connect(oceanFilter);
  oceanFilter.connect(oceanGain);
  oceanGain.connect(masterGain);
  oceanDrone.start();
  
  state.oscillators.push(oceanDrone);
  state.gainNodes.push(oceanGain);

  // Eerie underwater pad (minor chord feel)
  const padFreqs = [82.41, 98, 123.47]; // E2, G2 (minor), B2
  
  padFreqs.forEach((freq, i) => {
    const padOsc = ctx.createOscillator();
    const padGain = ctx.createGain();
    const padFilter = ctx.createBiquadFilter();
    
    padOsc.type = 'triangle';
    padOsc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(300, ctx.currentTime);
    
    padGain.gain.setValueAtTime(0.15, ctx.currentTime);
    
    padOsc.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(masterGain);
    padOsc.start();
    
    state.oscillators.push(padOsc);
    state.gainNodes.push(padGain);
  });

  // Slow wave-like LFO on filter
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // Very slow
  lfoGain.gain.setValueAtTime(50, ctx.currentTime);
  
  lfo.connect(lfoGain);
  // Would connect to filter frequency for wobble effect
  lfo.start();
  
  state.oscillators.push(lfo);

  // Bubble sounds occasionally
  const playBubble = () => {
    if (!state.isPlaying || !ctx) return;
    
    const bubbleOsc = ctx.createOscillator();
    const bubbleGain = ctx.createGain();
    
    bubbleOsc.type = 'sine';
    const startFreq = Math.random() * 500 + 300;
    bubbleOsc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    bubbleOsc.frequency.exponentialRampToValueAtTime(startFreq * 2, ctx.currentTime + 0.1);
    
    bubbleGain.gain.setValueAtTime(0.08, ctx.currentTime);
    bubbleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    bubbleOsc.connect(bubbleGain);
    bubbleGain.connect(masterGain);
    
    bubbleOsc.start(ctx.currentTime);
    bubbleOsc.stop(ctx.currentTime + 0.2);
    
    // Schedule next bubble
    if (state.isPlaying) {
      setTimeout(playBubble, Math.random() * 800 + 400);
    }
  };
  
  setTimeout(playBubble, 500);

  // Sonar-like ping every few seconds
  const playSonar = () => {
    if (!state.isPlaying || !ctx) return;
    
    const sonarOsc = ctx.createOscillator();
    const sonarGain = ctx.createGain();
    
    sonarOsc.type = 'sine';
    sonarOsc.frequency.setValueAtTime(1200, ctx.currentTime);
    sonarOsc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.5);
    
    sonarGain.gain.setValueAtTime(0.1, ctx.currentTime);
    sonarGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    
    sonarOsc.connect(sonarGain);
    sonarGain.connect(masterGain);
    
    sonarOsc.start(ctx.currentTime);
    sonarOsc.stop(ctx.currentTime + 1);
    
    // Schedule next sonar
    if (state.isPlaying) {
      setTimeout(playSonar, Math.random() * 3000 + 2000);
    }
  };
  
  setTimeout(playSonar, 1000);

  // Return stop function
  return () => {
    state.isPlaying = false;
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }
    state.oscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    state.gainNodes.forEach(gain => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      } catch {}
    });
    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  };
}

// Factory function to create the right music for a plot
export function createSuspenseMusic(type: 'forest' | 'ocean'): () => void {
  if (type === 'ocean') {
    return createOceanMusic();
  }
  return createForestFireMusic();
}
