import React from 'react';
import { CLIENT_LOGOS } from '../data/portfolioData';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';

export const ClientTrust: React.FC = () => {
  return (
    <SectionReveal className="w-full py-16 border-y border-neutral-200/80 dark:border-neutral-800 bg-[#F5F5F7] dark:bg-transparent text-[#1D1D1F] dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <TextReveal as="p" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] text-center mb-10 font-medium">
          Where Storytelling Meets Motion Precision
        </TextReveal>

        {/* Clean Minimalist Logo Grid */}
        <TextReveal delay={0.08} yOffset={20}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center max-w-3xl mx-auto">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.name}
                className="text-center group cursor-default p-4 rounded-xl bg-white dark:bg-[#161618] border border-neutral-200/60 dark:border-neutral-800 w-full shadow-xs hover:border-[#007AFF] transition-all"
              >
                <span className="font-extrabold text-18px tracking-tight text-[#1D1D1F] dark:text-white group-hover:text-[#007AFF] transition-colors font-mono block">
                  {client.logoText}
                </span>
                <span className="text-[10px] text-[#86868B] dark:text-[#98989D] font-mono block mt-1">
                  {client.industry}
                </span>
              </div>
            ))}
          </div>
        </TextReveal>
      </div>
    </SectionReveal>
  );
};



