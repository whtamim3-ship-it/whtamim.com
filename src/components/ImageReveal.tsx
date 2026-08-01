import React, { useEffect, useRef, useState } from 'react';

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number; // Delay in seconds (e.g. 0.1)
  duration?: number; // Duration in seconds (default 0.85s)
  scaleFrom?: number; // Initial scale (e.g. 1.04)
  yOffset?: number; // Upward offset in px (e.g. 24)
  blur?: boolean; // Enable soft backdrop blur reveal
  className?: string;
  style?: React.CSSProperties;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  scaleFrom = 1.04,
  yOffset = 24,
  blur = true,
  className = '',
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: NodeJS.Timeout;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true);
          observer.unobserve(el);

          timer = setTimeout(() => {
            setHasAnimated(true);
          }, (duration + delay) * 1000 + 100);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '20px 0px 20px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [duration, delay]);

  const getContainerStyle = (): React.CSSProperties => {
    if (hasAnimated) {
      return {
        ...style,
        opacity: 1,
        transform: 'none',
        filter: 'none',
      };
    }

    return {
      ...style,
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? 'scale(1) translateY(0px)'
        : `scale(${scaleFrom}) translateY(${yOffset}px)`,
      filter: blur ? (isVisible ? 'blur(0px)' : 'blur(8px)') : undefined,
      transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s${
        blur ? `, filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` : ''
      }`,
      willChange: 'opacity, transform, filter',
    };
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={getContainerStyle()}>
      {children}
    </div>
  );
};
