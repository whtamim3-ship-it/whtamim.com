import React from 'react';
import { Calculator, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { ImageReveal } from './ImageReveal';
import { SectionReveal } from './SectionReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';
import { BlurUpImage } from './BlurUpImage';

interface AboutSectionProps {
  onOpenEstimator: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEstimator }) => {
  const principles = [
    {
      num: '01',
      title: 'Intentional Edit',
      desc: 'I structure the narrative before touching the timeline. Every cut serves a specific visual purpose.',
    },
    {
      num: '02',
      title: 'Problem Solving',
      desc: 'Raw footage holds hidden potential. I refine unpolished takes into powerful cinematic moments.',
    },
    {
      num: '03',
      title: 'Genuine Emotion',
      desc: 'Authentic stories connect deeply with audiences—far beyond artificial hype or staged scripts.',
    },
  ];

  const tools = [
    { name: 'Adobe Premiere Pro', category: 'NLE Editing & Rhythm', badge: 'Core' },
    { name: 'Adobe After Effects', category: 'Motion Design & Compositing', badge: 'VFX' },
    { name: 'CapCut Desktop', category: 'Short-Form & Social Content', badge: 'Speed' },
  ];

  return (
    <SectionReveal
      id="about"
      className="min-h-[100svh] md:min-h-[100dvh] w-full flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20 border-t border-neutral-200/80 dark:border-neutral-800 bg-[#F5F5F7] dark:bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 my-auto">
      {/* Section Header with Narration Controls */}
      <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <TextReveal
            as="span"
            delay={0}
            yOffset={12}
            className="text-11px font-mono uppercase tracking-widest text-[#007AFF] dark:text-[#0A84FF] font-bold block mb-3"
          >
            ABOUT &amp; CREATIVE PHILOSOPHY
          </TextReveal>
          <TextReveal
            as="h2"
            delay={0.06}
            yOffset={16}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-[1.15]"
          >
            Craftsmanship, Precision, &amp; Authentic Storytelling.
          </TextReveal>
        </div>
      </div>

      {/* Main Content Grid: Left Portrait + Right Content */}
      <div className="about-section-grid grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
        {/* Left Profile Column with Portrait Parallax Depth */}
        <div className="lg:col-span-4 xl:col-span-4 w-full">
          <ParallaxLayer speed={-0.12} maxOffset={18}>
            <ImageReveal delay={0.1} yOffset={20} scaleFrom={1.05} className="rounded-2xl sm:rounded-3xl overflow-hidden mx-auto max-w-[320px] sm:max-w-[420px] lg:max-w-none">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#161618] shadow-sm group aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] max-h-[320px] sm:max-h-[420px] lg:max-h-[480px] w-full">
                <BlurUpImage
                  src="https://lh3.googleusercontent.com/d/1h6d88oXny8Tuxfz1OCF4eLJrm8bileM6"
                  alt="whtamim - Video Editor & Cinematographer"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to Google Drive uc export view URL if lh3 fails
                    const target = e.currentTarget as unknown as HTMLImageElement;
                    if (target && target.src !== 'https://drive.google.com/uc?export=view&id=1h6d88oXny8Tuxfz1OCF4eLJrm8bileM6') {
                      target.src = 'https://drive.google.com/uc?export=view&id=1h6d88oXny8Tuxfz1OCF4eLJrm8bileM6';
                    }
                  }}
                  className="w-full h-full"
                  imgClassName="group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                {/* Floating Frosted Glass Identity Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-xl sm:rounded-2xl bg-white/15 dark:bg-black/25 backdrop-blur-xl border border-white/30 dark:border-white/15 shadow-lg shadow-black/15 flex flex-col justify-center">
                  <h3 className="text-14px sm:text-15px font-bold text-white leading-tight tracking-tight">whtamim</h3>
                  <p className="text-[11px] sm:text-[12px] font-mono text-white/80 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">Video Editor &amp; Cinematographer</p>
                </div>
              </div>
            </ImageReveal>
          </ParallaxLayer>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-8 sm:space-y-10">
          {/* Creative Principles Cards (3-column on desktop/tablet, 1-column stack on mobile with 12px gap) */}
          <div className="space-y-4">
            <TextReveal
              as="h3"
              delay={0.12}
              yOffset={12}
              className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block"
            >
              Core Principles
            </TextReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {principles.map((p, idx) => (
                <TextReveal key={p.title} delay={0.15 + idx * 0.05} yOffset={16} className="h-full w-full">
                  <div className="p-[18px] sm:p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.08] shadow-2xs hover:border-[#007AFF]/40 dark:hover:border-[#0A84FF]/40 transition-all h-full min-h-[160px] flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-11px font-mono font-bold text-[#007AFF] dark:text-[#0A84FF] bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 px-2 py-0.5 rounded-md">
                          {p.num}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors" />
                      </div>
                      <h4 className="text-15px sm:text-16px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">
                        {p.title}
                      </h4>
                      <p className="text-12px sm:text-13px text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </TextReveal>
              ))}
            </div>
          </div>

          {/* Software & Tools Stack */}
          <div className="space-y-4 pt-6 sm:pt-8 border-t border-neutral-200/60 dark:border-neutral-800">
            <TextReveal
              as="h3"
              delay={0.25}
              yOffset={12}
              className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block"
            >
              Primary Software &amp; Tools
            </TextReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {tools.map((t, idx) => (
                <TextReveal key={t.name} delay={0.28 + idx * 0.04} yOffset={16} className="h-full w-full">
                  <div className="h-[64px] px-4 py-3 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.08] shadow-2xs flex items-center justify-between group">
                    <div className="pr-2 min-w-0">
                      <div className="text-13px sm:text-14px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight truncate">{t.name}</div>
                      <div className="text-11px text-[#86868B] dark:text-[#98989D] font-mono mt-0.5 leading-none truncate">{t.category}</div>
                    </div>
                    <span className="text-10px font-mono px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-[#6E6E73] dark:text-[#A1A1A6] font-semibold shrink-0">
                      {t.badge}
                    </span>
                  </div>
                </TextReveal>
              ))}
            </div>
          </div>

          {/* Action Row / Primary CTA */}
          <TextReveal delay={0.35} yOffset={16} className="pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playSubtleClickSound();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] text-13px sm:text-14px font-semibold tracking-wide hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all flex items-center justify-center gap-2 shadow-2xs group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  playSubtleClickSound();
                  onOpenEstimator();
                }}
                className="px-5 py-3.5 rounded-full bg-white dark:bg-[#161618] border border-neutral-200/90 dark:border-neutral-800 text-[#1D1D1F] dark:text-[#F5F5F7] text-13px font-medium hover:border-[#007AFF] dark:hover:border-[#0A84FF] hover:text-[#007AFF] dark:hover:text-[#0A84FF] transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#007AFF] dark:text-[#0A84FF]" />
                <span>Estimate Scope & Budget</span>
              </button>
            </div>
          </TextReveal>
        </div>
      </div>
      </div>
    </SectionReveal>
  );
};




