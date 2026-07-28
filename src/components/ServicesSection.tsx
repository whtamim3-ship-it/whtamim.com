import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onOpenEstimator: () => void;
  onOpenAIStoryboard?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenEstimator,
}) => {
  return (
    <SectionReveal id="services" className="py-24 w-full border-t border-neutral-200/80 bg-[#F5F5F7] text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] font-bold block mb-3">
            SERVICES & CAPABILITIES
          </TextReveal>
          <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1D1F]">
            Video Editing & Cinematography Services.
          </TextReveal>
        </div>
        <TextReveal delay={0.16} yOffset={16} className="flex items-center gap-3">
          <button
            onClick={() => {
              playSubtleClickSound();
              onOpenEstimator();
            }}
            className="px-6 py-3 rounded-full bg-[#1D1D1F] text-white text-13px font-semibold tracking-wide hover:bg-[#007AFF] transition-all"
          >
            Calculate Scope
          </button>
        </TextReveal>
      </div>

      {/* Services Grid - 4 Core Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SERVICES.map((service, idx) => (
          <TextReveal key={service.title} delay={0.05 * idx} yOffset={20}>
            <div className="group p-5 sm:p-8 rounded-[24px] bg-white border border-neutral-200/80 hover:border-[#007AFF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-12px font-mono text-[#86868B]">
                    0{idx + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#007AFF]/20 group-hover:bg-[#007AFF] transition-colors" />
                </div>

                <h3 className="text-20px font-bold text-[#1D1D1F] mb-3 group-hover:text-[#007AFF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-14px text-[#86868B] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-12px font-mono text-[#86868B] group-hover:text-[#1D1D1F]">
                <span>Production-Ready</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#007AFF] transition-colors" />
              </div>
            </div>
          </TextReveal>
        ))}
      </div>
      </div>
    </SectionReveal>
  );
};


