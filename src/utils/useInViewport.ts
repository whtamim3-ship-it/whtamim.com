import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseInViewportOptions {
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  initialInView?: boolean;
}

/**
 * Custom React hook that monitors when an HTML element enters or leaves the viewport.
 * Used for deferring the rendering or playback of heavy media (videos, iframes).
 */
export function useInViewport<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewportOptions = {}
): [RefObject<T>, boolean] {
  const {
    rootMargin = '250px 0px',
    threshold = 0.01,
    triggerOnce = true,
    initialInView = false,
  } = options;

  const elementRef = useRef<T>(null);
  const [isInViewport, setIsInViewport] = useState<boolean>(initialInView);

  useEffect(() => {
    if (initialInView) {
      setIsInViewport(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsInViewport(false);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, triggerOnce, initialInView]);

  return [elementRef, isInViewport];
}
