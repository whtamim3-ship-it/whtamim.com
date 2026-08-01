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

// Web Audio API click handler (disabled)
export function playSubtleClickSound(_enabled: boolean = true) {
  // Audio disabled
}

// Check prefers-reduced-motion
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
