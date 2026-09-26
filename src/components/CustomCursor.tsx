import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  enabled?: boolean;
}

/**
 * True Apple macOS Water Drop Magnification Cursor
 * Features:
 * - Buttery-smooth physics interpolation (lerp) running at display refresh rate (60-120fps)
 * - Authentic 3D liquid lens optics with backdrop-filter: blur(8px) contrast(120%) saturate(140%)
 * - Curved meniscus border, dual-specular caustic glints, and spherical inner depth
 * - Dynamic scaling and morphing on interactive hover states
 * - Zero click interference (pointer-events: none)
 */
export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled = true }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef<boolean>(false);
  const mouseDownRef = useRef<boolean>(false);
  const visibleRef = useRef<boolean>(false);

  // High-performance physics refs
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const currentScale = useRef({ x: 1, y: 1 });
  const currentAngle = useRef<number>(0);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch pointers or coarse input devices (mobile/tablet)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Detect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReducedMotion(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      // Check if mouse is over clickable or interactive element
      const target = e.target as HTMLElement | null;
      const interactiveTarget = target?.closest(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-cursor], label, summary, [onClick], iframe, [data-interactive]'
      ) as HTMLElement | null;

      const nextHovered = !!interactiveTarget;
      if (nextHovered !== hoveredRef.current) {
        hoveredRef.current = nextHovered;
        setIsHovered(nextHovered);
      }
    };

    const handleMouseDown = () => {
      mouseDownRef.current = true;
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      mouseDownRef.current = false;
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60-120fps physics loop with butter-smooth linear interpolation (lerp)
    const loop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      const dx = targetX - followerPos.current.x;
      const dy = targetY - followerPos.current.y;

      // macOS liquid momentum ease - tight, responsive tracking right at pointer tip
      const ease = 0.22;
      followerPos.current.x += dx * ease;
      followerPos.current.y += dy * ease;

      // Velocity & direction angle calculation
      const vx = dx * ease;
      const vy = dy * ease;
      const speed = Math.sqrt(vx * vx + vy * vy);

      // Smooth angle tracking for directional teardrop deformation
      if (speed > 0.5) {
        currentAngle.current = Math.atan2(vy, vx) * (180 / Math.PI);
      }

      // Subtle, elegant surface tension stretch (compact micro-physics)
      let targetScaleX = 1;
      let targetScaleY = 1;

      if (!isReducedMotion) {
        const maxStretch = 0.16;
        const stretch = Math.min(speed * 0.01, maxStretch);
        targetScaleX = 1 + stretch;
        targetScaleY = Math.max(1 - stretch * 0.35, 0.84);
      }

      // Tactile liquid compression when mouse button is clicked (squash effect)
      if (mouseDownRef.current) {
        targetScaleX *= 0.88;
        targetScaleY *= 0.88;
      }

      // Interpolate scale smoothly for elastic water droplet bounce
      currentScale.current.x += (targetScaleX - currentScale.current.x) * 0.26;
      currentScale.current.y += (targetScaleY - currentScale.current.y) * 0.26;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) rotate(${currentAngle.current}deg) scale(${currentScale.current.x}, ${currentScale.current.y})`;
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
      }
    };
  }, [isReducedMotion]);

  if (!enabled || isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        willChange: 'transform, width, height, opacity',
        // High-Glassmorphism Apple macOS optical filters
        backdropFilter: isHovered
          ? 'blur(7px) saturate(190%) contrast(108%) brightness(105%)'
          : 'blur(6px) saturate(180%) contrast(105%) brightness(103%)',
        WebkitBackdropFilter: isHovered
          ? 'blur(7px) saturate(190%) contrast(108%) brightness(105%)'
          : 'blur(6px) saturate(180%) contrast(105%) brightness(103%)',
      }}
      className={`pointer-events-none fixed top-0 left-0 z-[99999] rounded-full transition-[width,height,opacity,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] select-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isHovered
          ? 'w-7 h-7 border border-white/40 dark:border-white/30 bg-gradient-to-br from-white/20 via-white/10 to-white/[0.04] dark:from-white/18 dark:via-white/[0.08] dark:to-white/[0.02] shadow-[inset_0_1.5px_2.5px_0_rgba(255,255,255,0.7),inset_0_-1px_2px_0_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.12),0_0_10px_1px_rgba(255,255,255,0.3),0_1px_4px_rgba(0,102,255,0.2)] dark:shadow-[inset_0_1.5px_2.5px_0_rgba(255,255,255,0.5),inset_0_-1px_2px_0_rgba(0,0,0,0.4),0_6px_20px_rgba(0,0,0,0.5),0_0_12px_1px_rgba(56,189,248,0.25)]'
          : 'w-[22px] h-[22px] border border-white/25 dark:border-white/20 bg-gradient-to-br from-white/15 via-white/[0.06] to-white/[0.02] dark:from-white/12 dark:via-white/[0.05] dark:to-white/[0.01] shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.6),inset_0_-1px_1.5px_0_rgba(0,0,0,0.1),0_3px_12px_rgba(0,0,0,0.08),0_0_6px_rgba(255,255,255,0.2),0_1px_3px_rgba(0,102,255,0.08)] dark:shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.4),inset_0_-1px_1.5px_0_rgba(0,0,0,0.35),0_4px_16px_rgba(0,0,0,0.45),0_0_8px_rgba(0,102,255,0.15)]'
      }`}
    >
      {/* Translucent Glass Top Sheen & Subtle Convex Curvature */}
      <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.08)_45%,transparent_80%)] dark:bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.05)_45%,transparent_80%)]" />

      {/* Glossy Diagonal Refraction Stripe */}
      <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.12] to-transparent opacity-80" />

      {/* Primary Specular Glint (Top-Left Light Highlight) */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-200 bg-gradient-to-br from-white via-white/80 to-transparent blur-[0.25px] ${
          isHovered
            ? 'top-1 left-1.5 w-2 h-1 -rotate-12 opacity-95'
            : 'top-0.5 left-1 w-1.5 h-0.5 -rotate-12 opacity-90'
        }`}
      />

      {/* Secondary Caustic Bounce Reflection (Bottom-Right) */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-200 bg-gradient-to-tl from-white/60 via-white/25 to-transparent blur-[0.3px] ${
          isHovered
            ? 'bottom-1 right-1.5 w-1.5 h-0.5 -rotate-12 opacity-80'
            : 'bottom-0.5 right-1 w-1 h-0.5 -rotate-12 opacity-70'
        }`}
      />

      {/* Refractive Focal Center Pinpoint */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-200 ${
          isHovered
            ? 'w-1.5 h-1.5 bg-[#0066FF] dark:bg-[#38bdf8] shadow-[0_0_5px_rgba(0,102,255,0.9)] dark:shadow-[0_0_6px_rgba(56,189,248,0.9)] opacity-90'
            : 'w-1 h-1 bg-[#0066FF]/80 dark:bg-[#38bdf8]/85 shadow-[0_0_3px_rgba(0,102,255,0.7)] dark:shadow-[0_0_4px_rgba(56,189,248,0.8)] opacity-75'
        }`}
      />
    </div>
  );
};



