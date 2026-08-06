import React, { useEffect, useRef } from 'react';

type ParallaxCallback = (scrollY: number, targetY: number, responsiveMultiplier: number) => void;

class ParallaxEngine {
  private targetScrollY = 0;
  private currentScrollY = 0;
  private subscribers = new Set<ParallaxCallback>();
  private animFrameId: number | null = null;
  private isListening = false;
  private lerpFactor = 0.22; // Snappy 120fps Apple inertia response without input lag
  private responsiveMultiplier = 1.0;
  private prefersReducedMotion = false;

  constructor() {
    this.updateDeviceCapabilities();
  }

  private updateDeviceCapabilities() {
    if (typeof window === 'undefined') return;

    // Check reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.prefersReducedMotion) {
      this.responsiveMultiplier = 0;
      return;
    }

    const width = window.innerWidth;
    const isLowPerf =
      typeof navigator !== 'undefined' &&
      navigator.hardwareConcurrency &&
      navigator.hardwareConcurrency <= 4;

    if (width < 768) {
      // Mobile: minimal 0.15 multiplier (or 0.1 if low perf)
      this.responsiveMultiplier = isLowPerf ? 0.08 : 0.15;
    } else if (width < 1024) {
      // Tablet: 0.45 multiplier
      this.responsiveMultiplier = isLowPerf ? 0.3 : 0.45;
    } else if (width < 1280) {
      // Laptop: 0.75 multiplier
      this.responsiveMultiplier = isLowPerf ? 0.55 : 0.75;
    } else {
      // Desktop: 1.0 multiplier
      this.responsiveMultiplier = isLowPerf ? 0.75 : 1.0;
    }
  }

  private cleanupFn: (() => void) | null = null;

  private start() {
    if (this.isListening || typeof window === 'undefined') return;

    this.isListening = true;
    this.targetScrollY = window.scrollY;
    this.currentScrollY = window.scrollY;

    const notify = () => {
      this.subscribers.forEach((cb) => {
        try {
          cb(this.currentScrollY, this.targetScrollY, this.responsiveMultiplier);
        } catch {
          // Ignore subscriber errors
        }
      });
    };

    const handleScroll = () => {
      this.targetScrollY = window.scrollY;
      this.currentScrollY = window.scrollY;
      notify();
    };

    const handleResize = () => {
      this.updateDeviceCapabilities();
      this.targetScrollY = window.scrollY;
      this.currentScrollY = window.scrollY;
      notify();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    this.cleanupFn = () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }

  private stop() {
    this.isListening = false;
    if (this.cleanupFn) {
      this.cleanupFn();
      this.cleanupFn = null;
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  public subscribe(callback: ParallaxCallback): () => void {
    this.subscribers.add(callback);

    if (this.subscribers.size === 1) {
      this.start();
    }

    // Immediately trigger with current values
    callback(this.currentScrollY, this.targetScrollY, this.responsiveMultiplier);

    return () => {
      this.subscribers.delete(callback);
      if (this.subscribers.size === 0) {
        this.stop();
      }
    };
  }

  public getCurrentScrollY(): number {
    return this.currentScrollY;
  }

  public getMultiplier(): number {
    return this.responsiveMultiplier;
  }
}

export const parallaxEngine = new ParallaxEngine();

/**
 * Custom React hook for attaching zero-rerender GPU parallax transforms to a DOM element.
 */
export function useParallaxRef<T extends HTMLElement = HTMLDivElement>(
  speed = -0.05,
  options: { maxOffset?: number; relativeToViewport?: boolean } = {}
) {
  const elementRef = useRef<T | null>(null);
  const initialTopRef = useRef<number | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const { maxOffset = 24, relativeToViewport = true } = options;

    const unsubscribe = parallaxEngine.subscribe((scrollY, _targetY, multiplier) => {
      if (!el) return;

      if (multiplier === 0) {
        el.style.transform = '';
        return;
      }

      if (relativeToViewport) {
        // Calculate static document layout position without transform pollution
        if (initialTopRef.current === null) {
          let top = 0;
          let curr: HTMLElement | null = el;
          while (curr && curr !== document.body) {
            top += curr.offsetTop || 0;
            curr = curr.offsetParent as HTMLElement | null;
          }
          initialTopRef.current = top;
        }

        const relativeScroll = scrollY - (initialTopRef.current - window.innerHeight * 0.5);
        let yOffset = relativeScroll * speed * multiplier;

        if (maxOffset > 0) {
          yOffset = Math.max(-maxOffset, Math.min(maxOffset, yOffset));
        }

        el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
      } else {
        let yOffset = scrollY * speed * multiplier;
        if (maxOffset > 0) {
          yOffset = Math.max(-maxOffset, Math.min(maxOffset, yOffset));
        }

        el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
      }
    });

    return () => {
      unsubscribe();
      if (el) {
        el.style.transform = '';
      }
    };
  }, [speed, options.maxOffset, options.relativeToViewport]);

  return elementRef;
}

/**
 * Reusable Parallax Component Wrapper
 */
export const ParallaxLayer: React.FC<{
  speed?: number;
  maxOffset?: number;
  relativeToViewport?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({
  speed = -0.05,
  maxOffset = 24,
  relativeToViewport = true,
  className = '',
  style,
  children,
}) => {
  const ref = useParallaxRef<HTMLDivElement>(speed, { maxOffset, relativeToViewport });

  return (
    <div ref={ref} className={`will-change-transform ${className}`} style={style}>
      {children}
    </div>
  );
};
