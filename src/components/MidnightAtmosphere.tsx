import React, { useEffect, useRef } from 'react';
import { parallaxEngine } from '../utils/parallaxEngine';

interface MidnightAtmosphereProps {
  theme: 'light' | 'dark';
}

interface Star {
  xPercent: number;
  yPercent: number;
  size: number;
  baseAlpha: number;
  motionType: 'static' | 'slow' | 'fast';
  layerSpeed: number;
  twinkles: boolean;
  twinkleOffset: number;
  twinkleSpeed: number;
  twinkleAmp: number;
}

export const MidnightAtmosphere: React.FC<MidnightAtmosphereProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Strictly destroy and do nothing when in Light Mode
    if (theme !== 'dark') {
      return;
    }

    let isDestroyed = false;
    let animFrameId: number | null = null;
    let initTimeoutId: NodeJS.Timeout | null = null;
    let cleanupEventListeners: (() => void) | null = null;

    // Loading strategy: Wait 400ms before initializing canvas and star system
    initTimeoutId = setTimeout(() => {
      if (isDestroyed) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      // Check user reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // Determine Star Count based on device width & performance tier
      const getStarCount = (): number => {
        const w = window.innerWidth;
        const isLowPerformance =
          typeof navigator !== 'undefined' &&
          navigator.hardwareConcurrency &&
          navigator.hardwareConcurrency <= 4;

        if (w < 768) return isLowPerformance ? 10 : 14; // Mobile: 12-15
        if (w < 1024) return isLowPerformance ? 16 : 20; // Tablet: 20
        if (w < 1280) return isLowPerformance ? 24 : 30; // Laptop: 30
        return isLowPerformance ? 32 : 42; // Desktop: 35-45
      };

      let width = (canvas.width = document.documentElement.clientWidth || window.innerWidth);
      let height = (canvas.height = document.documentElement.clientHeight || window.innerHeight);

      // Section distribution helper:
      // Hero (0 - 0.25 Y): ~45% density
      // Middle (0.25 - 0.75 Y): ~30% density
      // Footer (0.75 - 1.0 Y): ~25% density
      const generateYPercent = (): number => {
        const rand = Math.random();
        if (rand < 0.45) {
          return Math.random() * 0.25;
        } else if (rand < 0.75) {
          return 0.25 + Math.random() * 0.5;
        } else {
          return 0.75 + Math.random() * 0.25;
        }
      };

      // Generate Stars according to specifications
      const starCount = getStarCount();
      const stars: Star[] = [];

      // Distribution: 60% Static, 25% Slow parallax, 15% Faster parallax
      const staticCount = Math.round(starCount * 0.6);
      const slowCount = Math.round(starCount * 0.25);

      for (let i = 0; i < starCount; i++) {
        // Star size: 1px (60%), 1.5px (28%), 2px (12%)
        const sizeRand = Math.random();
        let size = 1;
        if (sizeRand > 0.88) size = 2;
        else if (sizeRand > 0.6) size = 1.5;

        let motionType: 'static' | 'slow' | 'fast' = 'static';
        let layerSpeed = 0;

        if (i < staticCount) {
          motionType = 'static';
          layerSpeed = 0;
        } else if (i < staticCount + slowCount) {
          motionType = 'slow';
          // Layer 1 (8%) or Layer 2 (16%)
          layerSpeed = Math.random() < 0.5 ? 0.08 : 0.16;
        } else {
          motionType = 'fast';
          // Layer 3 (28%)
          layerSpeed = 0.28;
        }

        // Twinkle: ~18% of stars
        const twinkles = Math.random() < 0.18;

        stars.push({
          xPercent: 0.02 + Math.random() * 0.96,
          yPercent: generateYPercent(),
          size,
          baseAlpha: 0.12 + Math.random() * 0.38, // Very subtle, low opacity
          motionType,
          layerSpeed: prefersReducedMotion ? 0 : layerSpeed,
          twinkles: prefersReducedMotion ? false : twinkles,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.0006 + Math.random() * 0.0012, // Slow, unsynchronized
          twinkleAmp: 0.06 + Math.random() * 0.12,
        });
      }

      // Resize handler
      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = document.documentElement.clientWidth || window.innerWidth;
        height = canvas.height = document.documentElement.clientHeight || window.innerHeight;
      };

      window.addEventListener('resize', handleResize, { passive: true });

      // Animation Loop State
      const startTime = performance.now();

      const render = (time: number) => {
        if (isDestroyed) return;

        const elapsed = time - startTime;
        const currentScrollY = parallaxEngine.getCurrentScrollY();

        // Ambient Depth: Extremely subtle background color shift over 20-30 seconds
        const cycle = prefersReducedMotion
          ? 0
          : Math.sin((elapsed / 25000) * Math.PI * 2);

        // Midnight gradient stops: Deep Black -> Very Deep Navy -> Almost Black -> Deep Midnight
        const r1 = Math.round(4 + cycle * 1.5);
        const g1 = Math.round(5 + cycle * 2.0);
        const b1 = Math.round(7 + cycle * 3.5);

        const r2 = Math.round(10 + cycle * 2.0);
        const g2 = Math.round(12 + cycle * 2.5);
        const b2 = Math.round(18 + cycle * 4.0);

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`);
        gradient.addColorStop(1, `rgb(${r2}, ${g2}, ${b2})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw Tiny Stars
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];

          // Calculate vertical position with parallax and wrapping
          let yPos = star.yPercent * height;
          if (!prefersReducedMotion && star.layerSpeed > 0) {
            const parallaxOffset = currentScrollY * star.layerSpeed;
            yPos = (yPos - parallaxOffset) % height;
            if (yPos < 0) yPos += height;
          }

          const xPos = star.xPercent * width;

          // Twinkle alpha calculation
          let alpha = star.baseAlpha;
          if (star.twinkles && !prefersReducedMotion) {
            const twinkleVal = Math.sin(
              elapsed * star.twinkleSpeed + star.twinkleOffset
            );
            alpha += twinkleVal * star.twinkleAmp;
          }

          // Strict clamp (subtle opacity only, max 0.55)
          alpha = Math.max(0.05, Math.min(0.55, alpha));

          ctx.fillStyle = `rgba(215, 225, 240, ${alpha.toFixed(3)})`;
          ctx.fillRect(
            Math.round(xPos),
            Math.round(yPos),
            star.size,
            star.size
          );
        }

        animFrameId = requestAnimationFrame(render);
      };

      // Visibility API Handler
      const handleVisibilityChange = () => {
        if (document.hidden) {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        } else {
          if (!animFrameId && !isDestroyed) {
            animFrameId = requestAnimationFrame(render);
          }
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Store cleanup function
      cleanupEventListeners = () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };

      // Start initial animation frame loop
      animFrameId = requestAnimationFrame(render);
    }, 400);

    return () => {
      isDestroyed = true;
      if (initTimeoutId) clearTimeout(initTimeoutId);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (cleanupEventListeners) cleanupEventListeners();
    };
  }, [theme]);

  // Completely omit DOM node when in Light Mode
  if (theme !== 'dark') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
};
