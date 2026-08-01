import React from 'react';
import { Play, ArrowDown } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { ImageReveal } from './ImageReveal';
import { SectionReveal } from './SectionReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';

interface HeroProps {
  onOpenShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenShowreel,
}) => {
  return (
    <SectionReveal className="relative min-h-screen w-full flex flex-col justify-between pt-16 sm:pt-28 md:pt-32 pb-8 sm:pb-12 bg-[#F5F5F7] dark:bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 overflow-hidden">
      {/* =================================================== */}
      {/* DESKTOP & TABLET HERO (>= 768px / md:)              */}
      {/* Completely unchanged layout, spacing, and controls   */}
      {/* =================================================== */}
      <div className="hidden md:flex flex-col justify-between flex-1 w-full max-w-7xl mx-auto px-8 lg:px-12 my-auto">
        <div className="flex-1 flex flex-col justify-center items-center text-center my-auto">
          {/* Layer 1: Headline */}
          <ParallaxLayer speed={-0.015} maxOffset={6} className="w-full flex flex-col items-center">
            <TextReveal as="h1" delay={0.08} yOffset={20} className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05] text-[#1D1D1F] dark:text-white max-w-5xl mb-6">
              Real Footage. Real Stories. Real Results.
            </TextReveal>
          </ParallaxLayer>

          {/* Layer 2: Supporting Paragraph & CTAs */}
          <ParallaxLayer speed={-0.025} maxOffset={10} className="w-full flex flex-col items-center">
            <TextReveal as="p" delay={0.16} yOffset={20} className="text-18px md:text-20px text-[#86868B] dark:text-[#98989D] font-normal leading-relaxed max-w-2xl mb-10">
              Video editing and cinematography for brands, weddings, and creators.
            </TextReveal>

            {/* Primary CTAs */}
            <TextReveal delay={0.24} yOffset={20} className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playSubtleClickSound();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] font-semibold text-14px tracking-wide hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all shadow-md hover:shadow-lg"
              >
                Start a Project
              </a>

              <button
                onClick={() => {
                  playSubtleClickSound();
                  onOpenShowreel();
                }}
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 text-[#1D1D1F] dark:text-white font-semibold text-14px hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#007AFF]/10 dark:bg-[#0A84FF]/20 text-[#007AFF] dark:text-[#0A84FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Showreel</span>
                <span className="text-11px font-mono text-[#86868B] dark:text-[#98989D] font-normal ml-1">
                  1:15
                </span>
              </button>
            </TextReveal>
          </ParallaxLayer>

          {/* Layer 3: Muted Autoplay Showreel Card Container */}
          <ParallaxLayer speed={-0.06} maxOffset={20} className="w-full flex justify-center">
            <ImageReveal delay={0.28} yOffset={28} scaleFrom={1.03} className="w-full max-w-4xl relative rounded-[24px] overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-2xl bg-black aspect-video group">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              >
                <source
                  src="https://vjs.zencdn.net/v/oceans.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Video Overlay Label */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-12px font-mono z-10">
                <span className="opacity-80 truncate pr-2">2026 Showreel Preview</span>
              </div>
            </ImageReveal>
          </ParallaxLayer>
        </div>

        {/* Bottom Scroll Indicator */}
        <TextReveal delay={0.4} yOffset={16} className="w-full pt-8 flex items-center justify-center text-12px font-mono text-[#86868B] dark:text-[#98989D]">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              playSubtleClickSound();
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
          >
            <span>Scroll to Selected Work</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </TextReveal>
      </div>

      {/* =================================================== */}
      {/* BRAND-NEW NATIVE MOBILE HERO (< 768px / md:hidden)   */}
      {/* Minimal, compact, single-screen experience          */}
      {/* =================================================== */}
      <div className="flex md:hidden flex-col justify-between flex-1 w-full px-4 pt-4 pb-2 my-auto">
        <div className="flex-1 flex flex-col justify-center items-center text-center my-auto">
          {/* Mobile Headline (~80-85% width) */}
          <TextReveal as="h1" delay={0.06} yOffset={14} className="text-[27px] sm:text-[30px] font-extrabold tracking-tighter leading-[1.08] text-[#1D1D1F] dark:text-white w-[86%] max-w-xs mx-auto mb-2 text-center">
            Real Footage. Real Stories. Real Results.
          </TextReveal>

          {/* Short Concise Supporting Description (Max 2 lines) */}
          <TextReveal as="p" delay={0.12} yOffset={14} className="text-[13px] text-[#86868B] dark:text-[#98989D] font-normal leading-snug w-[85%] max-w-xs mx-auto mb-4 text-center">
            Video editing and cinematography for brands, weddings, and creators.
          </TextReveal>

          {/* Primary CTA = Clickable Video Preview Card (No duplicate buttons) */}
          <TextReveal delay={0.18} yOffset={18} className="w-full flex justify-center">
            <div
              onClick={() => {
                playSubtleClickSound();
                onOpenShowreel();
              }}
              className="w-[92%] max-w-sm relative rounded-[20px] overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-xl bg-black aspect-video group cursor-pointer active:scale-[1.015] transition-transform duration-[180ms] ease-out"
              role="button"
              aria-label="Open 2026 Showreel video"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playSubtleClickSound();
                  onOpenShowreel();
                }
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-500 group-active:scale-[1.02]"
              >
                <source
                  src="https://vjs.zencdn.net/v/oceans.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Glass Center Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-12 h-12 rounded-full border border-white/30 bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg group-active:scale-105 transition-transform duration-180">
                  <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                </div>
              </div>

              {/* Minimal Bottom Label Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white text-[11px] font-mono z-10 pointer-events-none">
                <span className="font-medium text-white/95">2026 Showreel</span>
                <span className="text-white/70 font-mono text-[10px]">1:15</span>
              </div>
            </div>
          </TextReveal>
        </div>

        {/* Minimal Mobile Scroll Indicator */}
        <TextReveal delay={0.24} yOffset={10} className="w-full pt-3 flex items-center justify-center text-[11px] font-mono text-[#86868B] dark:text-[#98989D]">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              playSubtleClickSound();
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
          >
            <span>Scroll to Selected Work</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </a>
        </TextReveal>
      </div>
    </SectionReveal>
  );
};
