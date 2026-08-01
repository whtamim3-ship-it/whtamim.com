import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Sparkles, Calculator, Shield } from 'lucide-react';
import { SectionReveal } from './SectionReveal';
import { BrandLogo } from './BrandLogo';
import { StudioTimeWidget } from './StudioTimeWidget';
import { playSubtleClickSound } from '../utils/motion';

interface FooterProps {
  onOpenEstimator?: () => void;
  onOpenAIStoryboard?: () => void;
}

/**
 * Subtle fade-in animation wrapper using Tailwind CSS transitions
 * that triggers when the element appears on scroll.
 */
const TailwindFadeIn: React.FC<{
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}> = ({ children, delayMs = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delayMs);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const Footer: React.FC<FooterProps> = ({
  onOpenEstimator,
  onOpenAIStoryboard,
}) => {
  const scrollToTop = () => {
    playSubtleClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <SectionReveal
      as="footer"
      className="py-16 w-full border-t border-neutral-800 text-neutral-400 bg-[#0E0E10] dark:bg-[#0E0E10]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Live Studio Time Experience Banner */}
        <TailwindFadeIn delayMs={0} className="mb-12">
          <StudioTimeWidget
            variant="full"
            onContactClick={scrollToContact}
          />
        </TailwindFadeIn>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <TailwindFadeIn delayMs={100}>
            <BrandLogo
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="mb-2"
            />
            <p className="text-14px text-neutral-400 dark:text-neutral-300 mt-2 max-w-md leading-relaxed">
              Video Editor &amp; Cinematographer. Turning raw footage into stories that stick.
            </p>
          </TailwindFadeIn>

          <TailwindFadeIn delayMs={200} className="flex flex-col items-start md:items-end gap-3 font-mono text-12px">
            {/* Studio Tools Footer Shortcuts */}
            <div className="flex flex-wrap items-center gap-2">
              {onOpenAIStoryboard && (
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    onOpenAIStoryboard();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span className="font-medium">AI Storyboard</span>
                </button>
              )}
              {onOpenEstimator && (
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    onOpenEstimator();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-white" />
                  <span className="font-medium">Project Estimator</span>
                </button>
              )}
            </div>
          </TailwindFadeIn>
        </div>

        {/* Bottom Bar: Dynamic Copyright & Privacy Policy */}
        <TailwindFadeIn delayMs={300}>
          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-12px font-mono text-neutral-400 dark:text-neutral-300">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-left">
              <span>© {currentYear} whtamim. All rights reserved.</span>
              <span className="hidden sm:inline text-neutral-700">•</span>
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Privacy Policy: All studio inquiries and project calculations are processed with strict confidentiality.');
                }}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-300 cursor-pointer"
              >
                <Shield className="w-3 h-3 text-neutral-400" />
                <span>Privacy Policy</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors p-2.5 px-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 cursor-pointer"
            >
              <span className="font-medium">Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </TailwindFadeIn>
      </div>
    </SectionReveal>
  );
};





