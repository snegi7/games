let audioContext: AudioContext | null = null;

function ctx(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

const VOL = 0.28;

export function playTubeSelect() {
  const c = ctx(); const now = c.currentTime;
  const osc = c.createOscillator(); const gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(650, now + 0.1);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(VOL * 0.5, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.start(now); osc.stop(now + 0.18);
}

export function playPour() {
  const c = ctx(); const now = c.currentTime;
  const bufSize = Math.floor(c.sampleRate * 0.45);
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
  const noise = c.createBufferSource(); noise.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass'; filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(200, now + 0.4); filter.Q.value = 3;
  const gain = c.createGain();
  gain.gain.setValueAtTime(VOL * 0.7, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  noise.connect(filter); filter.connect(gain); gain.connect(c.destination);
  noise.start(now);

  const osc = c.createOscillator(); const og = c.createGain();
  osc.connect(og); og.connect(c.destination);
  osc.type = 'sine'; osc.frequency.setValueAtTime(500, now);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);
  og.gain.setValueAtTime(VOL * 0.3, now);
  og.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
  osc.start(now); osc.stop(now + 0.38);
}

export function playTubeSorted() {
  const c = ctx(); const now = c.currentTime;
  [523, 659, 784].forEach((freq, i) => {
    const osc = c.createOscillator(); const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    const t = now + i * 0.1;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(VOL * 0.45, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.start(t); osc.stop(t + 0.35);
  });
}

export function playWin() {
  const c = ctx(); const now = c.currentTime;
  [523, 659, 784, 1047, 1319].forEach((freq, i) => {
    const osc = c.createOscillator(); const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    const t = now + i * 0.1;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(VOL * 0.55, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.start(t); osc.stop(t + 0.5);
  });
  for (let i = 0; i < 4; i++) {
    const osc = c.createOscillator(); const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine';
    const t = now + 0.5 + i * 0.06;
    osc.frequency.setValueAtTime(2000 + Math.random() * 800, t);
    gain.gain.setValueAtTime(VOL * 0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.start(t); osc.stop(t + 0.12);
  }
}

export function playGameOver() {
  const c = ctx(); const now = c.currentTime;
  [392, 330, 262].forEach((freq, i) => {
    const osc = c.createOscillator(); const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    const t = now + i * 0.18;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(VOL * 0.5, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.start(t); osc.stop(t + 0.4);
  });
}

export function playInvalidMove() {
  const c = ctx(); const now = c.currentTime;
  const osc = c.createOscillator(); const gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.type = 'square'; osc.frequency.value = 110;
  gain.gain.setValueAtTime(VOL * 0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.start(now); osc.stop(now + 0.12);
}

export function playUndo() {
  const c = ctx(); const now = c.currentTime;
  const osc = c.createOscillator(); const gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(380, now + 0.12);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(VOL * 0.4, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.start(now); osc.stop(now + 0.18);
}
