import React from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';

interface AboutSectionProps {
  onOpenEstimator: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEstimator }) => {
  const tools = [
    { name: 'Adobe After Effects', role: 'Motion Graphics & UI Rigging' },
    { name: 'Adobe Premiere Pro', role: 'Cinematic Editing & Pacing' },
    { name: 'Cinema 4D', role: '3D Depth & Spatial Views' },
    { name: 'Figma', role: 'UI Component Extraction' },
    { name: 'Lottie & Rive', role: 'Interactive Vector Animations' },
    { name: 'DaVinci Resolve', role: 'Master Color Grading' },
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-neutral-200/80 bg-[#F5F5F7] text-[#1D1D1F]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Image & Portrait Badge */}
        <div className="lg:col-span-5 relative">
          <TextReveal delay={0} yOffset={24}>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden border border-neutral-200/90 shadow-xl bg-white group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                alt="whtamim - SaaS Motion Designer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Bottom Overlay Label */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200 text-[#1D1D1F] shadow-lg">
                <h3 className="text-18px font-bold">whtamim</h3>
                <p className="text-12px font-mono text-[#86868B]">SaaS Video Editor & Motion Designer</p>
              </div>
            </div>
          </TextReveal>
        </div>

        {/* Right Story & Philosophy */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <TextReveal as="span" delay={0.05} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] font-bold block mb-3">
              ABOUT & CREATIVE PHILOSOPHY
            </TextReveal>
            <TextReveal as="h2" delay={0.1} yOffset={20} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F] leading-tight">
              Craftsmanship, Precision, & Clear Communication.
            </TextReveal>
          </div>

          <div className="space-y-6">
            {/* How I Think */}
            <TextReveal delay={0.15} yOffset={20}>
              <div className="p-6 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs">
                <h3 className="text-14px font-mono uppercase tracking-wider text-[#007AFF] font-bold mb-2">
                  • How I Think
                </h3>
                <p className="text-15px text-[#1D1D1F] leading-relaxed">
                  I don't just edit video files — I think like a product designer. Every keyframe, Bezier curve easing, and typographic hierarchy is mathematically aligned to communicate function and quality.
                </p>
              </div>
            </TextReveal>

            {/* How I Solve Communication Problems */}
            <TextReveal delay={0.2} yOffset={20}>
              <div className="p-6 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs">
                <h3 className="text-14px font-mono uppercase tracking-wider text-[#007AFF] font-bold mb-2">
                  • How I Solve Communication Problems
                </h3>
                <p className="text-15px text-[#1D1D1F] leading-relaxed">
                  Complex SaaS software often fails to communicate its true power through text or static screenshots. I translate intricate developer workflows, neural AI models, and abstract data pipelines into effortless visual narratives.
                </p>
              </div>
            </TextReveal>

            {/* Why I Focus on SaaS */}
            <TextReveal delay={0.25} yOffset={20}>
              <div className="p-6 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs">
                <h3 className="text-14px font-mono uppercase tracking-wider text-[#007AFF] font-bold mb-2">
                  • Why I Focus on SaaS
                </h3>
                <p className="text-15px text-[#1D1D1F] leading-relaxed">
                  Software is the defining product craft of our generation. Focusing exclusively on SaaS and AI startups allows me to master the exact UI micro-interactions and pacing that turn casual viewers into paying customers.
                </p>
              </div>
            </TextReveal>
          </div>

          {/* Software Stack Grid */}
          <div className="pt-2">
            <TextReveal as="h3" delay={0.28} yOffset={16} className="text-12px font-mono uppercase tracking-wider text-[#86868B] mb-3 font-semibold">
              Primary Software & Stack
            </TextReveal>
            <TextReveal delay={0.32} yOffset={20}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {tools.map((t) => (
                  <div
                    key={t.name}
                    className="p-3 rounded-xl bg-white border border-neutral-200/80 text-12px font-mono text-[#1D1D1F]"
                  >
                    <div className="font-bold">{t.name}</div>
                    <div className="text-[10px] text-[#86868B]">{t.role}</div>
                  </div>
                ))}
              </div>
            </TextReveal>
          </div>

          {/* Target Client Focus */}
          <TextReveal delay={0.36} yOffset={20} className="pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-13px text-[#86868B]">
              <Globe className="w-4 h-4 text-[#007AFF]" />
              <span>Partnering with SaaS & AI pioneers globally (USA, Europe, Nordics).</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                playSubtleClickSound();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-[#1D1D1F] text-white text-13px font-semibold tracking-wide hover:bg-[#007AFF] transition-all"
            >
              Start a Project
            </a>
          </TextReveal>
        </div>
      </div>
    </section>
  );
};



