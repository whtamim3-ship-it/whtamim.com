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

// Web Audio API sound handlers
export function playSubtleClickSound(_enabled: boolean = true) {
  if (!_enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // ignore audio errors
  }
}

// Check prefers-reduced-motion
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
