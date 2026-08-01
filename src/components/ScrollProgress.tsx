import React, { useState, useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      let progress = 0;
      if (scrollHeight > 0) {
        progress = Math.min(1, Math.max(0, scrollTop / scrollHeight));
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }

      const shouldBeVisible = scrollTop > 20;
      if (shouldBeVisible !== visibleRef.current) {
        visibleRef.current = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Translucent background track for depth */}
      <div className="absolute inset-0 bg-neutral-300/30 dark:bg-neutral-700/30 backdrop-blur-xs" />

      {/* GPU-accelerated filling progress bar */}
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-[#007AFF] via-[#5E5CE6] to-[#007AFF] shadow-[0_1px_8px_rgba(0,122,255,0.5)] relative transition-transform duration-75 ease-out overflow-hidden"
        style={{
          transform: 'scaleX(0)',
          transformOrigin: '0% 50%',
          willChange: 'transform',
        }}
      >
        {/* Glowing Apple-style leading edge tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[4px] h-[3px] bg-white rounded-full shadow-[0_0_8px_#ffffff,0_0_12px_#007AFF]" />
      </div>
    </div>
  );
};

