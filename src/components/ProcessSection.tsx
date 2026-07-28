import React from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';

export const ProcessSection: React.FC = () => {
  return (
    <SectionReveal id="process" className="py-24 w-full border-t border-neutral-200/80 bg-[#F5F5F7] text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
      <div className="mb-16">
        <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] font-bold block mb-3">
          PRODUCTION PROCESS
        </TextReveal>
        <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1D1F] mb-4">
          Structured Precision From Script to Render.
        </TextReveal>
        <TextReveal as="p" delay={0.16} yOffset={20} className="text-16px text-[#86868B] max-w-2xl">
          A predictable, battle-tested 6-step workflow that eliminates guesswork and delivers studio-grade commercial films.
        </TextReveal>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROCESS_STEPS.map((step, idx) => (
          <TextReveal key={step.step} delay={0.06 * idx} yOffset={20}>
            <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-[#007AFF] transition-all flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-28px font-mono font-extrabold text-[#86868B]">
                    {step.step}
                  </span>
                  <span className="text-10px font-mono uppercase px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[#86868B] font-semibold">
                    PHASE
                  </span>
                </div>
                <h3 className="text-18px font-bold text-[#1D1D1F] mb-1">{step.title}</h3>
                <p className="text-12px font-mono text-[#007AFF] font-medium mb-3">{step.subtitle}</p>
                <p className="text-13px text-[#86868B] leading-relaxed mb-6">{step.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-100 text-11px font-mono text-[#86868B]">
                <span className="font-semibold text-[#1D1D1F]">Deliverable: </span>
                {step.deliverable}
              </div>
            </div>
          </TextReveal>
        ))}
      </div>
      </div>
    </SectionReveal>
  );
};


