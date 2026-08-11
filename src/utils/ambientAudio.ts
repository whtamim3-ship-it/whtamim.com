// Web Audio API Ambient Loop Generator for whtamim studio
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let activeOscillators: OscillatorNode[] = [];
let activeGains: GainNode[] = [];
let activeFilters: BiquadFilterNode[] = [];
let isPlaying = false;
let stopTimeoutId: ReturnType<typeof setTimeout> | null = null;

export function initAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function startAmbientAudio(): void {
  const ctx = initAudioContext();
  if (!ctx) return;

  if (stopTimeoutId) {
    clearTimeout(stopTimeoutId);
    stopTimeoutId = null;
  }

  if (isPlaying) return;
  isPlaying = true;

  // Master gain node
  masterGain = ctx.createGain();
  const now = ctx.currentTime;
  masterGain.gain.setValueAtTime(0.0001, now);
  // Target subtle background volume of 0.08
  masterGain.gain.exponentialRampToValueAtTime(0.08, now + 1.8);

  // Warm master lowpass filter
  const masterFilter = ctx.createBiquadFilter();
  masterFilter.type = 'lowpass';
  masterFilter.frequency.setValueAtTime(360, now);

  masterFilter.connect(masterGain);
  masterGain.connect(ctx.destination);
  activeFilters.push(masterFilter);

  // Cinematic warm ambient chord notes (D Major9 / D Sus2 - D2, A2, E3, A3, C#4)
  const frequencies = [73.42, 110.0, 164.81, 220.0, 277.18];

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle detune chorus effect
    const detuneAmount = (idx - 2) * 2.5;
    osc.detune.setValueAtTime(detuneAmount, now);

    const vGain = ctx.createGain();
    const targetVol = idx === 0 ? 0.35 : 0.18 / (idx + 0.8);
    vGain.gain.setValueAtTime(targetVol, now);

    // Soft breathing LFO for realistic ambient movement
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.06 + idx * 0.02, now);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(targetVol * 0.25, now);

    lfo.connect(lfoGain);
    lfoGain.connect(vGain.gain);

    osc.connect(vGain);
    vGain.connect(masterFilter);

    osc.start(now);
    lfo.start(now);

    activeOscillators.push(osc, lfo);
    activeGains.push(vGain, lfoGain);
  });
}

export function stopAmbientAudio(): void {
  if (!isPlaying || !audioCtx || !masterGain) {
    isPlaying = false;
    return;
  }

  const ctx = audioCtx;
  const now = ctx.currentTime;
  const currentVal = Math.max(masterGain.gain.value, 0.0001);
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(currentVal, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

  isPlaying = false;

  stopTimeoutId = setTimeout(() => {
    activeOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch (_) {}
      try {
        osc.disconnect();
      } catch (_) {}
    });
    activeGains.forEach((g) => {
      try {
        g.disconnect();
      } catch (_) {}
    });
    activeFilters.forEach((f) => {
      try {
        f.disconnect();
      } catch (_) {}
    });
    if (masterGain) {
      try {
        masterGain.disconnect();
      } catch (_) {}
    }
    activeOscillators = [];
    activeGains = [];
    activeFilters = [];
    masterGain = null;
  }, 1300);
}

export function getAmbientAudioStatus(): boolean {
  return isPlaying;
}
