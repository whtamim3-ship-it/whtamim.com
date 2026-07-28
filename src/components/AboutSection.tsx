import React from 'react';
import { Sparkles, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';

interface AboutSectionProps {
  onOpenEstimator: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEstimator }) => {
  const principles = [
    {
      num: '01',
      title: 'How I Think',
      desc: 'I think about the story before I touch the timeline. Every cut has a intentional reason.',
    },
    {
      num: '02',
      title: 'How I Solve Problems',
      desc: 'Raw footage hides its best narrative. I find the golden moments and build around them.',
    },
    {
      num: '03',
      title: 'Why Real Stories',
      desc: 'Authentic footage moves audiences far deeper than artificial scripts or staged hype.',
    },
  ];

  const tools = [
    { name: 'Adobe Premiere Pro', category: 'Editing & Rhythm', badge: 'Core' },
    { name: 'Adobe After Effects', category: 'Motion & FX', badge: 'VFX' },
    { name: 'CapCut', category: 'Short-Form Social', badge: 'Speed' },
  ];

  return (
    <SectionReveal
      id="about"
      className="py-16 sm:py-20 lg:py-24 w-full border-t border-neutral-200/80 bg-[#F5F5F7] text-[#1D1D1F]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      {/* Section Header */}
      <div className="mb-8 sm:mb-12 max-w-3xl">
        <TextReveal
          as="span"
          delay={0}
          yOffset={12}
          className="text-11px font-mono uppercase tracking-widest text-[#007AFF] font-bold block mb-2"
        >
          About & Creative Philosophy
        </TextReveal>
        <TextReveal
          as="h2"
          delay={0.06}
          yOffset={16}
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] leading-[1.15]"
        >
          Craftsmanship, Precision, & Real Storytelling.
        </TextReveal>
      </div>

      {/* Main Content Grid: Left Portrait + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
        {/* Left Profile Column */}
        <div className="lg:col-span-4 xl:col-span-4">
          <TextReveal delay={0.1} yOffset={20}>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 bg-white shadow-sm group aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] max-h-[420px] lg:max-h-[480px] w-full">
              <img
                src="/about_portrait.png"
                alt="whtamim - Video Editor & Cinematographer"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              {/* Compact Bottom Overlay Card */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/80 text-[#1D1D1F] shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-14px sm:text-15px font-bold text-[#1D1D1F] leading-tight">whtamim</h3>
                  <p className="text-11px font-mono text-[#86868B] mt-0.5">Video Editor & Cinematographer</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-10px font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          </TextReveal>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-6 sm:space-y-8">
          {/* Creative Principles Cards (3-column on desktop/tablet, stacked on mobile) */}
          <div className="space-y-3">
            <TextReveal
              as="h3"
              delay={0.12}
              yOffset={12}
              className="text-11px font-mono uppercase tracking-widest text-[#86868B] font-bold block"
            >
              Core Principles
            </TextReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
              {principles.map((p, idx) => (
                <TextReveal key={p.title} delay={0.15 + idx * 0.05} yOffset={16}>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs hover:border-[#007AFF]/40 transition-all h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-11px font-mono font-bold text-[#007AFF] bg-[#007AFF]/10 px-2 py-0.5 rounded-md">
                          {p.num}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#007AFF] transition-colors" />
                      </div>
                      <h4 className="text-14px sm:text-15px font-bold text-[#1D1D1F] mb-1.5">
                        {p.title}
                      </h4>
                      <p className="text-12px sm:text-13px text-[#6E6E73] leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </TextReveal>
              ))}
            </div>
          </div>

          {/* Software & Tools Stack */}
          <div className="space-y-3 pt-2 border-t border-neutral-200/60">
            <TextReveal
              as="h3"
              delay={0.25}
              yOffset={12}
              className="text-11px font-mono uppercase tracking-widest text-[#86868B] font-bold block"
            >
              Primary Software & Tools
            </TextReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tools.map((t, idx) => (
                <TextReveal key={t.name} delay={0.28 + idx * 0.04} yOffset={16}>
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                      <div className="text-13px sm:text-14px font-bold text-[#1D1D1F]">{t.name}</div>
                      <div className="text-11px text-[#86868B] font-mono mt-0.5">{t.category}</div>
                    </div>
                    <span className="text-10px font-mono px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[#6E6E73]">
                      {t.badge}
                    </span>
                  </div>
                </TextReveal>
              ))}
            </div>
          </div>

          {/* Action Row / Primary CTA */}
          <TextReveal delay={0.35} yOffset={16} className="pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playSubtleClickSound();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-[#1D1D1F] text-white text-13px sm:text-14px font-semibold tracking-wide hover:bg-[#007AFF] transition-all flex items-center justify-center gap-2 shadow-2xs group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  playSubtleClickSound();
                  onOpenEstimator();
                }}
                className="px-5 py-3 rounded-full bg-white border border-neutral-200/90 text-[#1D1D1F] text-13px font-medium hover:border-[#007AFF] hover:text-[#007AFF] transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#007AFF]" />
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




