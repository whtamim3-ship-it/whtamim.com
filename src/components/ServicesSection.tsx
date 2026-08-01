import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { SERVICES } from '../data/portfolioData';
import { ParallaxLayer } from '../utils/parallaxEngine';

interface ServicesSectionProps {
  onOpenEstimator: () => void;
  onOpenAIStoryboard?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenEstimator,
}) => {
  return (
    <SectionReveal id="services" className="py-24 w-full border-t border-neutral-200/80 dark:border-neutral-800 bg-[#F5F5F7] dark:bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block mb-3">
            SERVICES & CAPABILITIES
          </TextReveal>
          <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
            Video Editing & Cinematography Services.
          </TextReveal>
        </div>
        <TextReveal delay={0.16} yOffset={16} className="flex items-center gap-3">
          <button
            onClick={() => {
              playSubtleClickSound();
              onOpenEstimator();
            }}
            className="px-6 py-3 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] text-13px font-semibold tracking-wide hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all"
          >
            Calculate Scope
          </button>
        </TextReveal>
      </div>

      {/* Services Grid - 4 Core Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SERVICES.map((service, idx) => {
          const cardSpeeds = [-0.03, -0.04, -0.045, -0.035];
          return (
            <ParallaxLayer key={service.title} speed={cardSpeeds[idx % cardSpeeds.length]} maxOffset={12}>
              <TextReveal delay={0.05 * idx} yOffset={20}>
                <div className="group p-5 sm:p-8 rounded-[24px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 hover:border-[#007AFF] dark:hover:border-[#0A84FF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-12px font-mono text-[#86868B] dark:text-[#98989D]">
                        0{idx + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#007AFF]/20 dark:bg-[#0A84FF]/20 group-hover:bg-[#007AFF] dark:group-hover:bg-[#0A84FF] transition-colors" />
                    </div>

                    <h3 className="text-20px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3 group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-14px text-[#86868B] dark:text-[#98989D] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-12px font-mono text-[#86868B] dark:text-[#98989D] group-hover:text-[#1D1D1F] dark:group-hover:text-[#F5F5F7]">
                    <span>Production-Ready</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors" />
                  </div>
                </div>
              </TextReveal>
            </ParallaxLayer>
          );
        })}
      </div>
      </div>
    </SectionReveal>
  );
};


