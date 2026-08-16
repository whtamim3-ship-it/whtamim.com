import React from 'react';
import { motion } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';
import { HeroParticlesCanvas } from './HeroParticlesCanvas';

interface HeroProps {
  onOpenShowreel?: () => void;
}

const headlineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

const wordRevealVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

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

          {/* Staggered Word Reveal Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={headlineContainerVariants}
            className="main-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.04] text-[#1D1D1F] dark:text-white max-w-4xl mb-3.5 relative"
          >
            <motion.span variants={wordRevealVariants} className="relative inline-block mr-[0.26em]">
              <span className="open-badge hero-pinned-badge" data-tooltip="Accepting New Projects">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] dark:bg-[#22c55e] open-badge-dot animate-pulse shrink-0" />
                <span>OPEN</span>
              </span>
              Motion
            </motion.span>
            <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">that</motion.span>
            <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">makes</motion.span>
            <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">products</motion.span>
            <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">feel</motion.span>
            <motion.span variants={wordRevealVariants} className="inline-block highlight-blue font-bold mr-[0.26em]">premium,</motion.span>
            <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">not</motion.span>
            <motion.span variants={wordRevealVariants} className="inline-block">advertised.</motion.span>
          </motion.h1>

          <TextReveal as="p" delay={0.32} yOffset={14} className="sub-tagline tagline text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-[#cccccc] max-w-2xl mb-8 text-center">
            I'm <strong className="font-bold text-neutral-900 dark:text-white">Tamim</strong>, a Video Editor &amp; Motion Designer creating premium commercials, SaaS product films, and cinematic brand stories designed to leave a lasting impression.
          </TextReveal>
          

          
          {/* CTA Buttons */}
          <TextReveal delay={0.4} yOffset={14} className="flex flex-wrap items-center justify-center gap-3.5">
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

        {/* Mobile Staggered Word Reveal Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={headlineContainerVariants}
          className="main-heading font-coolvetica text-[22px] sm:text-[24px] font-normal tracking-tight leading-[1.06] text-[#1D1D1F] dark:text-white w-[92%] max-w-xs mx-auto mb-2.5 text-center relative"
        >
          <motion.span variants={wordRevealVariants} className="relative inline-block mr-[0.26em]">
            <span className="open-badge hero-pinned-badge" data-tooltip="Accepting New Projects">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] dark:bg-[#22c55e] open-badge-dot animate-pulse shrink-0" />
              <span>OPEN</span>
            </span>
            Motion
          </motion.span>
          <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">that</motion.span>
          <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">makes</motion.span>
          <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">products</motion.span>
          <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">feel</motion.span>
          <motion.span variants={wordRevealVariants} className="inline-block highlight-blue font-coolvetica italic font-bold mr-[0.26em]">premium,</motion.span>
          <motion.span variants={wordRevealVariants} className="inline-block mr-[0.26em]">not</motion.span>
          <motion.span variants={wordRevealVariants} className="inline-block">advertised.</motion.span>
        </motion.h1>

        {/* Mobile Tagline */}
        <TextReveal as="p" delay={0.10} yOffset={10} className="sub-tagline tagline font-sans italic text-[13px] sm:text-[14px] leading-relaxed text-neutral-600 dark:text-[#cccccc] w-[92%] max-w-sm mx-auto mb-6 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          I'm <strong className="font-bold not-italic text-neutral-900 dark:text-white">Tamim</strong>, a Video Editor &amp; Motion Designer creating premium commercials, SaaS product films, and cinematic brand stories designed to leave a lasting impression.
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
