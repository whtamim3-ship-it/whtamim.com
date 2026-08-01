import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'a' | 'section' | 'li' | 'button';
  delay?: number; // delay in seconds (e.g. 0.08)
  duration?: number; // duration in seconds (0.6 - 0.8s)
  yOffset?: number; // upward translation (16 - 24px)
  className?: string;
  style?: React.CSSProperties;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  as: Component = 'div',
  delay = 0,
  duration = 0.7,
  yOffset = 20,
  className = '',
  style,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: any;

    // Fallback if IntersectionObserver is not supported
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

          // Clean up inline transition/transform after animation completes
          timer = setTimeout(() => {
            setHasAnimated(true);
          }, (duration + delay) * 1000 + 100);
        }
      },
      {
        threshold: 0.01,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [duration, delay]);

  const getStyles = (): React.CSSProperties => {
    if (hasAnimated) {
      return {
        ...style,
        opacity: 1,
      };
    }

    return {
      ...style,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0px)' : `translateY(${yOffset}px)`,
      transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      willChange: 'opacity, transform',
    };
  };

  return React.createElement(
    Component,
    {
      ref,
      className,
      style: getStyles(),
    },
    children
  );
};

