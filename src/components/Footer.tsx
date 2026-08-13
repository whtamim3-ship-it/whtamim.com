import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Shield, Mail, X, Lock, ShieldCheck } from 'lucide-react';
import { SectionReveal } from './SectionReveal';
import { BrandLogo } from './BrandLogo';
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
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPrivacyModal) {
        setShowPrivacyModal(false);
      }
    };
    if (showPrivacyModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPrivacyModal]);

  const openPrivacyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    playSubtleClickSound();
    setShowPrivacyModal(true);
  };

  const closePrivacyModal = () => {
    playSubtleClickSound();
    setShowPrivacyModal(false);
  };

  const scrollToTop = () => {
    playSubtleClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <SectionReveal
        as="footer"
        className="w-full min-w-full flex flex-col py-10 sm:py-14 md:py-16 border-t border-neutral-800 text-neutral-400 bg-[#0E0E10] dark:bg-[#0E0E10] overflow-clip relative"
        data-is-footer="true"
      >
        {/* Outer Container with clean flex-column layout & gap of 20px */}
        <div className="w-full min-w-full px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 flex flex-col gap-[20px]">
          
          {/* 1. Main Heading Statement & Status Badge */}
          <TailwindFadeIn delayMs={0} className="w-full py-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[12px] font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Available for new projects</span>
            </div>
            <h2
              className="text-[26px] md:text-[42px] font-bold text-white leading-tight tracking-tight max-w-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Have a project worth doing right? Let's tell a story worth remembering.
            </h2>
          </TailwindFadeIn>

          {/* 3. Action Buttons & Studio Info */}
          <TailwindFadeIn delayMs={100} className="w-full pt-4 border-t border-neutral-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="max-w-xl">
              <BrandLogo
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="mb-2"
              />
              <p className="text-[12px] sm:text-[13px] text-neutral-400 dark:text-neutral-300 mt-2 leading-relaxed">
                Video Editor &amp; Motion Designer. Turning raw footage into stories that stick with craft and precision.
              </p>
            </div>

            {/* Action Buttons: Full width on mobile, aligned sm:w-auto */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {onOpenAIStoryboard && (
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    onOpenAIStoryboard();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-700 transition-all text-[12px] sm:text-[13px] font-medium cursor-pointer w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-3.5 text-amber-400" />
                  <span>AI Storyboard</span>
                </button>
              )}

              <button
                onClick={() => {
                  playSubtleClickSound();
                  scrollToContact();
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold transition-all text-[12px] sm:text-[13px] cursor-pointer shadow-md w-full sm:w-auto"
              >
                <Mail className="w-4 h-3.5 text-white" />
                <span>Start Project</span>
              </button>
            </div>
          </TailwindFadeIn>

          {/* 4. Sub-Footer Bar */}
          <TailwindFadeIn delayMs={150} className="w-full">
            <div className="pt-5 border-t border-neutral-800/80 w-full">
              {/* Mobile View (< md) - Stacked centered with subtle borders */}
              <div className="flex flex-col md:hidden items-center text-center gap-3 text-[12px] font-mono text-neutral-400">
                <div className="w-full pb-3 border-b border-neutral-800/60">
                  <span>© {currentYear} whtamim. All rights reserved.</span>
                </div>
                <div>
                  <a
                    href="#privacy"
                    onClick={openPrivacyModal}
                    className="inline-flex items-center justify-center gap-1.5 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-300 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Privacy Policy</span>
                  </a>
                </div>
              </div>

              {/* Desktop View (>= md) - Left & Right Alignment */}
              <div className="hidden md:flex items-center justify-between text-[12px] font-mono text-neutral-400">
                <div className="text-left">
                  <span>© {currentYear} whtamim. All rights reserved.</span>
                </div>

                <div className="text-right">
                  <a
                    href="#privacy"
                    onClick={openPrivacyModal}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-300 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Privacy Policy</span>
                  </a>
                </div>
              </div>
            </div>
          </TailwindFadeIn>

        </div>
      </SectionReveal>

      {/* Privacy Policy Glassmorphic Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={closePrivacyModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#161618]/90 border border-white/10 shadow-2xl backdrop-blur-xl p-6 sm:p-8 text-neutral-200 transition-all transform scale-100 animate-in zoom-in-95 duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Title */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#007AFF]/15 text-[#0A84FF] border border-[#007AFF]/20 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
                    Studio Policy
                  </span>
                  <h3
                    id="privacy-modal-title"
                    className="text-18px sm:text-20px font-bold text-white tracking-tight leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Privacy &amp; Confidentiality Commitment
                  </h3>
                </div>
              </div>
              <button
                onClick={closePrivacyModal}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Close Privacy Policy Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Points */}
            <div className="py-5 space-y-4 text-13px sm:text-14px leading-relaxed text-neutral-300">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-0.5">Strict Asset Protection</p>
                  <p className="text-neutral-400 text-12px sm:text-13px">
                    Raw footage, project files, and storyboards shared via inquiries are strictly confidential.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-0.5">Inquiry Data</p>
                  <p className="text-neutral-400 text-12px sm:text-13px">
                    Information provided through the contact form is only used to prepare project estimates and communicate directly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-0.5">Portfolio Usage</p>
                  <p className="text-neutral-400 text-12px sm:text-13px">
                    Client work is displayed only upon approval or according to signed NDA agreements.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer / Action */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={closePrivacyModal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-13px transition-colors cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};





