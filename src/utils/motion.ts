// Motion, Physics & Cursor Utility Functions
import React from 'react';

export function calculateTilt(
  e: React.MouseEvent<HTMLElement>,
  maxDegrees: number = 4
): { rotateX: number; rotateY: number; glossX: number; glossY: number } {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const percentX = (x - centerX) / centerX;
  const percentY = (y - centerY) / centerY;
  
  const rotateX = -percentY * maxDegrees;
  const rotateY = percentX * maxDegrees;
  
  const glossX = (x / rect.width) * 100;
  const glossY = (y / rect.height) * 100;
  
  return { rotateX, rotateY, glossX, glossY };
}

// Web Audio API subtle click sound FX generator for high-touch interactions
let audioCtx: AudioContext | null = null;

export function playSubtleClickSound(enabled: boolean = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (err) {
    // Ignore audio context errors gracefully
  }
}

// Check prefers-reduced-motion
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
