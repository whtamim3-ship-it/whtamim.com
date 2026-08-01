import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  enabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef<boolean>(false);
  const visibleRef = useRef<boolean>(false);

  // Positions and velocity refs for 60fps smooth physics loop
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch pointers or coarse input devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Detect prefers-reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReducedMotion(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      const interactiveTarget = target?.closest(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer'
      ) as HTMLElement | null;

      const nextHovered = !!interactiveTarget;
      if (nextHovered !== hoveredRef.current) {
        hoveredRef.current = nextHovered;
        setIsHovered(nextHovered);
      }
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
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60FPS Physics animation loop
    const loop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      const dx = targetX - followerPos.current.x;
      const dy = targetY - followerPos.current.y;

      // Smooth liquid interpolation delay (Apple feel)
      const ease = 0.22;
      followerPos.current.x += dx * ease;
      followerPos.current.y += dy * ease;

      // Velocity & direction angle calculation
      const vx = dx * ease;
      const vy = dy * ease;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      // Subtle water-drop stretch deformation based on cursor speed
      const maxStretch = 0.25;
      const stretch = Math.min(speed * 0.02, maxStretch);
      const scaleX = 1 + stretch;
      const scaleY = Math.max(1 - stretch * 0.35, 0.75);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
      }
    };
  }, []); // Run once on mount

  if (!enabled || isTouchDevice || isReducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{ willChange: 'transform, opacity' }}
      className={`pointer-events-none fixed top-0 left-0 z-[200] rounded-full transition-opacity duration-200 ease-out backdrop-blur-[2px] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isHovered
          ? 'w-6 h-6 bg-[#007AFF]/15 dark:bg-[#0A84FF]/25 border border-[#007AFF]/40 dark:border-[#0A84FF]/50 shadow-xs'
          : 'w-5 h-5 bg-[#1D1D1F]/[0.10] dark:bg-white/[0.15] border border-[#1D1D1F]/20 dark:border-white/30 shadow-2xs'
      }`}
    />
  );
};

