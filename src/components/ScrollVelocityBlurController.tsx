import React, { useEffect, useRef } from 'react';

/**
 * Implements a scroll-triggered blur effect using the defined 'motion-blur-filter'
 * that increases intensity based on scroll velocity, giving the app a premium, high-speed aesthetic.
 */
export const ScrollVelocityBlurController: React.FC = () => {
  const lastScrollY = useRef(window.scrollY);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let timeoutId: any;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = currentTime - lastTime.current;
      const dy = Math.abs(currentScrollY - lastScrollY.current);

      if (dt > 0) {
        const velocity = (dy / dt) * 10;
        const blurIntensity = Math.min(Math.max(velocity - 0.4, 0), 12);

        const feBlur = document.querySelector('#motion-blur-filter feGaussianBlur');
        if (feBlur) {
          feBlur.setAttribute('stdDeviation', `${blurIntensity},0.8`);
        }
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const feBlur = document.querySelector('#motion-blur-filter feGaussianBlur');
        if (feBlur) {
          feBlur.setAttribute('stdDeviation', '0,0');
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
};
