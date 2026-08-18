import React, { useEffect, useRef, useState } from 'react';
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
  const [isDarkActive, setIsDarkActive] = useState(theme === 'dark');

  useEffect(() => {
    setIsDarkActive(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    let isDestroyed = false;
    let animFrameId: number | null = null;
    let initTimeoutId: NodeJS.Timeout | null = null;
    let cleanupEventListeners: (() => void) | null = null;

    if (theme !== 'dark') {
      return;
    }

    initTimeoutId = setTimeout(() => {
      if (isDestroyed) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: true });
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

        if (w < 768) return isLowPerformance ? 10 : 14;
        if (w < 1024) return isLowPerformance ? 16 : 20;
        if (w < 1280) return isLowPerformance ? 24 : 30;
        return isLowPerformance ? 32 : 42;
      };

      let width = (canvas.width = document.documentElement.clientWidth || window.innerWidth);
      let height = (canvas.height = document.documentElement.clientHeight || window.innerHeight);

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

      const starCount = getStarCount();
      const stars: Star[] = [];

      const staticCount = Math.round(starCount * 0.6);
      const slowCount = Math.round(starCount * 0.25);

      for (let i = 0; i < starCount; i++) {
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
          layerSpeed = Math.random() < 0.5 ? 0.08 : 0.16;
        } else {
          motionType = 'fast';
          layerSpeed = 0.28;
        }

        const twinkles = Math.random() < 0.18;

        stars.push({
          xPercent: 0.02 + Math.random() * 0.96,
          yPercent: generateYPercent(),
          size,
          baseAlpha: 0.14 + Math.random() * 0.36,
          motionType,
          layerSpeed: prefersReducedMotion ? 0 : layerSpeed,
          twinkles: prefersReducedMotion ? false : twinkles,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.0006 + Math.random() * 0.0012,
          twinkleAmp: 0.06 + Math.random() * 0.12,
        });
      }

      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = document.documentElement.clientWidth || window.innerWidth;
        height = canvas.height = document.documentElement.clientHeight || window.innerHeight;
      };

      window.addEventListener('resize', handleResize, { passive: true });

      const startTime = performance.now();

      const render = (time: number) => {
        if (isDestroyed) return;

        const elapsed = time - startTime;
        const currentScrollY = parallaxEngine.getCurrentScrollY();

        // Clear canvas with transparent clearRect so underlying CSS gradient shines through smoothly
        ctx.clearRect(0, 0, width, height);

        // Ambient Depth: Extremely subtle background color shift
        const cycle = prefersReducedMotion
          ? 0
          : Math.sin((elapsed / 25000) * Math.PI * 2);

        const r1 = Math.round(4 + cycle * 1.5);
        const g1 = Math.round(5 + cycle * 2.0);
        const b1 = Math.round(7 + cycle * 3.5);

        const r2 = Math.round(10 + cycle * 2.0);
        const g2 = Math.round(12 + cycle * 2.5);
        const b2 = Math.round(18 + cycle * 4.0);

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.85)`);
        gradient.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, 0.95)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw Tiny Stars
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];

          let yPos = star.yPercent * height;
          if (!prefersReducedMotion && star.layerSpeed > 0) {
            const parallaxOffset = currentScrollY * star.layerSpeed;
            yPos = (yPos - parallaxOffset) % height;
            if (yPos < 0) yPos += height;
          }

          const xPos = star.xPercent * width;

          let alpha = star.baseAlpha;
          if (star.twinkles && !prefersReducedMotion) {
            const twinkleVal = Math.sin(
              elapsed * star.twinkleSpeed + star.twinkleOffset
            );
            alpha += twinkleVal * star.twinkleAmp;
          }

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

      const handleVisibilityChange = () => {
        if (document.hidden) {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        } else {
          if (!animFrameId && !isDestroyed && theme === 'dark') {
            animFrameId = requestAnimationFrame(render);
          }
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      cleanupEventListeners = () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };

      animFrameId = requestAnimationFrame(render);
    }, 250);

    return () => {
      isDestroyed = true;
      if (initTimeoutId) clearTimeout(initTimeoutId);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (cleanupEventListeners) cleanupEventListeners();
    };
  }, [theme]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden transition-all duration-700 ease-in-out"
      aria-hidden="true"
    >
      {/* Light Mode Atmosphere Gradient Layer */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
          isDarkActive ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(238, 242, 255, 0.85) 0%, rgba(248, 249, 250, 0.6) 50%, rgba(245, 245, 247, 1) 100%)',
        }}
      >
        {/* Subtle Light Mode Ambient Vignette & Highlights */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'radial-gradient(circle at 85% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 60%), radial-gradient(circle at 15% 75%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Dark Mode Midnight Atmosphere Canvas & Gradient Layer */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
          isDarkActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 0%, #0D1117 0%, #0A0A0C 60%, #060709 100%)',
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
};
