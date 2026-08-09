import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulseDir: number;
  color: string;
}

export const HeroParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const particleColors = [
      'rgba(0, 102, 255, ',    // Electric Blue #0066FF
      'rgba(10, 132, 255, ',   // Apple Light Blue
      'rgba(168, 85, 247, ',   // Purple
      'rgba(56, 189, 248, ',   // Sky Cyan
    ];

    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      // Scale count based on width, max 45 particles for optimal performance
      const count = Math.min(45, Math.floor((w * h) / 25000));
      particles = [];

      for (let i = 0; i < count; i++) {
        const maxAlpha = 0.12 + Math.random() * 0.28;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: 0.8 + Math.random() * 1.8,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.15 - Math.random() * 0.35, // Slow upward drift
          alpha: Math.random() * maxAlpha,
          maxAlpha,
          pulseSpeed: 0.003 + Math.random() * 0.008,
          pulseDir: Math.random() > 0.5 ? 1 : -1,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticles(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Pulse opacity
        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha >= p.maxAlpha) {
          p.alpha = p.maxAlpha;
          p.pulseDir = -1;
        } else if (p.alpha <= 0.03) {
          p.alpha = 0.03;
          p.pulseDir = 1;
        }

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.color + '0.5)';
        ctx.shadowBlur = p.radius * 2;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50 dark:opacity-60"
      aria-hidden="true"
    />
  );
};

export default HeroParticlesCanvas;
