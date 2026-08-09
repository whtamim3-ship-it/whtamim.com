import React from 'react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';
import { HeroParticlesCanvas } from './HeroParticlesCanvas';
import { WeatherStatus } from './WeatherStatus';

interface HeroProps {
  onOpenShowreel?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative min-h-[70dvh] w-full flex justify-center items-center py-12 bg-[#F5F5F7] dark:bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 overflow-hidden">
      {/* Background Subtle Particle Canvas for Cinematic Feel */}
      <HeroParticlesCanvas />

      {/* =================================================== */}
      {/* DESKTOP & TABLET HERO (>= 768px / md:)              */}
      {/* =================================================== */}
      <div className="relative z-10 hidden md:flex flex-col items-center justify-center text-center gap-5 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Layer 1: Headline & Tagline */}
        <ParallaxLayer speed={-0.015} maxOffset={6} className="w-full flex flex-col items-center">


          <TextReveal as="h1" delay={0.08} yOffset={18} className="main-heading font-coolvetica text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-[#1D1D1F] dark:text-white max-w-4xl mb-4">
            Motion that makes products feel <span className="highlight-blue font-coolvetica italic font-bold inline-block">premium</span>, not advertised.
          </TextReveal>
          <TextReveal as="p" delay={0.14} yOffset={14} className="sub-tagline tagline font-sans italic text-sm sm:text-base text-neutral-600 dark:text-[#cccccc] max-w-2xl mb-6 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
            I'm <strong className="font-bold not-italic text-neutral-900 dark:text-white">Tamim</strong>, a Video Editor &amp; Motion Designer creating premium commercials, SaaS product films, and cinematic brand stories designed to leave a lasting impression.
          </TextReveal>
          
          {/* Status Row: Available Status Pill & Live Weather Status */}
          <TextReveal delay={0.18} yOffset={12} className="flex flex-wrap items-center justify-center gap-2.5 mb-[25px]">
            <div className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-[#0066FF]/8 dark:bg-[#0066FF]/12 border border-[#0066FF]/30 text-[#4da6ff] text-13px font-light tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="w-[7px] h-[7px] rounded-full bg-[#0066ff] shadow-[0_0_8px_#0066ff] animate-pulse" />
              <span>Available for new projects</span>
            </div>
            <WeatherStatus />
          </TextReveal>
          
          {/* CTA Buttons */}
          <TextReveal delay={0.22} yOffset={14} className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                playSubtleClickSound();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-14px tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Start Project
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                playSubtleClickSound();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold text-14px hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs active:scale-95"
            >
              See Work
            </a>
          </TextReveal>
        </ParallaxLayer>
      </div>

      {/* =================================================== */}
      {/* BRAND-NEW NATIVE MOBILE HERO (< 768px / md:hidden)   */}
      {/* Minimal, compact, single-screen experience          */}
      {/* =================================================== */}
      <div className="relative z-10 flex md:hidden flex-col items-center justify-center w-full px-5 -mt-2 text-center">


        {/* Mobile Headline (~80-85% width) */}
        <TextReveal as="h1" delay={0.06} yOffset={12} className="main-heading font-coolvetica text-[22px] sm:text-[24px] font-normal tracking-tight leading-[1.12] text-[#1D1D1F] dark:text-white w-[92%] max-w-xs mx-auto mb-3 text-center">
          Motion that makes products feel <span className="highlight-blue font-coolvetica italic font-bold inline-block">premium</span>, not advertised.
        </TextReveal>

        {/* Mobile Tagline */}
        <TextReveal as="p" delay={0.10} yOffset={10} className="sub-tagline tagline font-sans italic text-[13px] sm:text-[14px] text-neutral-600 dark:text-[#cccccc] w-[90%] max-w-xs mx-auto mb-[22px] text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          I'm <strong className="font-bold not-italic text-neutral-900 dark:text-white">Tamim</strong>, a Video Editor &amp; Motion Designer creating premium commercials, SaaS product films, and cinematic brand stories designed to leave a lasting impression.
        </TextReveal>

        {/* Mobile Status Row */}
        <TextReveal delay={0.12} yOffset={10} className="flex flex-col items-center gap-2 mb-[22px]">
          <div className="inline-flex w-fit items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0066FF]/8 dark:bg-[#0066FF]/12 border border-[#0066FF]/30 text-[#4da6ff] text-[12px] font-light tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="w-[7px] h-[7px] rounded-full bg-[#0066ff] shadow-[0_0_8px_#0066ff] animate-pulse" />
            <span>Available for new projects</span>
          </div>
          <WeatherStatus />
        </TextReveal>

        {/* Mobile CTA Buttons */}
        <TextReveal delay={0.16} yOffset={12} className="flex items-center justify-center gap-2.5">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              playSubtleClickSound();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-13px tracking-wide transition-all shadow-md active:scale-95"
          >
            Start Project
          </a>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              playSubtleClickSound();
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-full bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 text-[#1D1D1F] dark:text-white font-semibold text-13px hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs active:scale-95"
          >
            See Work
          </a>
        </TextReveal>
      </div>
    </section>
  );
};
