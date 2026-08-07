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
    <SectionReveal id="services" className="min-h-[100svh] md:min-h-[100dvh] w-full flex flex-col justify-center items-center py-20 sm:py-24 bg-[#F8F9FA] dark:bg-[#0A0A0C] text-[#111827] dark:text-[#F5F5F7]">
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 my-auto">
        {/* Services Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <TextReveal as="span" delay={0} yOffset={16} className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[2px] text-[#0066ff] dark:text-[#3B82F6] block mb-3">
              Services & Capabilities
            </TextReveal>
            <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-[-1px] text-[#0F172A] dark:text-white leading-[1.2]">
              Video Editing & Cinematography Services.
            </TextReveal>
          </div>
          <TextReveal delay={0.16} yOffset={16}>
            <button
              onClick={() => {
                playSubtleClickSound();
                onOpenEstimator();
              }}
              className="font-sans bg-[#0F172A] hover:bg-[#0066ff] dark:bg-white dark:text-[#0F172A] dark:hover:bg-[#3B82F6] dark:hover:text-white text-white text-[14px] font-medium px-7 py-3.5 rounded-full border border-white/10 cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(15,23,42,0.15)] hover:shadow-[0_8px_25px_rgba(0,102,255,0.3)] hover:-translate-y-0.5 inline-flex items-center gap-2.5"
            >
              <span>Calculate Scope</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </TextReveal>
        </div>

        {/* 4 Bento Grid Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
          {SERVICES.map((service, idx) => {
            const cardSpeeds = [-0.02, -0.03, -0.035, -0.025];
            return (
              <ParallaxLayer key={service.title} speed={cardSpeeds[idx % cardSpeeds.length]} maxOffset={12}>
                <TextReveal delay={0.06 * idx} yOffset={20}>
                  <div className="group bg-white dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] rounded-[24px] p-8 sm:p-10 relative flex flex-col justify-between h-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-2 hover:border-[#0066ff]/30 dark:hover:border-[#3B82F6]/50 hover:shadow-[0_20px_40px_rgba(0,102,255,0.08)]">
                    <div>
                      {/* Card Top Bar */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xl sm:text-[1.25rem] font-bold bg-gradient-to-br from-[#0066ff] to-[#60a5fa] bg-clip-text text-transparent font-mono">
                          0{idx + 1}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                      </div>

                      {/* Card Content */}
                      <h3 className="text-xl sm:text-[1.35rem] font-semibold text-[#0F172A] dark:text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-[0.95rem] font-normal text-[#64748B] dark:text-[#98989D] leading-[1.6] mb-8">
                        {service.description}
                      </p>
                    </div>

                    {/* Card Bottom Footer */}
                    <div className="flex items-center justify-between border-t border-[#f1f5f9] dark:border-neutral-800 pt-5 mt-auto">
                      <span className="text-[0.75rem] font-semibold tracking-[1px] text-[#475569] dark:text-[#A1A1AA] uppercase font-mono">
                        Production-Ready
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#f8fafc] dark:bg-neutral-800 flex items-center justify-center text-[#0F172A] dark:text-white transition-all duration-300 group-hover:bg-[#0066ff] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
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



