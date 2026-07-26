import React from 'react';
import { CLIENT_LOGOS } from '../data/portfolioData';
import { TextReveal } from './TextReveal';

export const ClientTrust: React.FC = () => {
  return (
    <section className="py-16 border-y border-neutral-200/80 bg-[#F5F5F7] text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <TextReveal as="p" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] text-center mb-10 font-medium">
          Selected Partnerships & Client Roster
        </TextReveal>

        {/* Clean Minimalist Logo Grid */}
        <TextReveal delay={0.08} yOffset={20}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.name}
                className="text-center group cursor-default"
              >
                <span className="font-extrabold text-18px tracking-tight text-[#1D1D1F]/50 group-hover:text-[#1D1D1F] transition-colors font-mono">
                  {client.logoText}
                </span>
                <span className="text-[10px] text-[#86868B] font-mono block mt-0.5">
                  {client.industry}
                </span>
              </div>
            ))}
          </div>
        </TextReveal>
      </div>
    </section>
  );
};



