import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';

interface ServicesSectionProps {
  onOpenEstimator: () => void;
  onOpenAIStoryboard: () => void;
}

const ALL_SERVICES = [
  { title: 'SaaS Commercial Videos', desc: 'High-converting launch trailers and feature films designed for modern software brands.' },
  { title: 'Product Videos', desc: 'Cinematic visual showcases highlighting core product features and value propositions.' },
  { title: 'Motion Design', desc: 'Custom kinetic typography, 2D/3D visual effects, and fluid brand identities.' },
  { title: 'UI Animation', desc: 'Precision 2D/3D UI rigging that makes complex software feel effortless.' },
  { title: 'Product Demo Videos', desc: 'Clear, engaging video walkthroughs that shorten sales cycles.' },
  { title: 'Explainer Videos', desc: 'Punchy narrative videos breaking down complex technical architectures.' },
  { title: 'Promotional Videos', desc: 'High-energy social and ad campaign cuts optimized for high conversion.' },
  { title: 'Brand Videos', desc: 'Refined brand films communicating company vision and market positioning.' },
  { title: 'Documentary Editing', desc: 'Long-form narrative editing for founder stories and deep customer case studies.' },
  { title: 'Talking Head Editing', desc: 'Clean, broadcast-grade interview cuts with subtle motion graphics.' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenEstimator,
}) => {
  return (
    <section id="services" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-neutral-200/80 bg-[#F5F5F7] text-[#1D1D1F]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] font-bold block mb-3">
            SERVICES & CAPABILITIES
          </TextReveal>
          <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1D1F]">
            Built for Modern SaaS & AI Products.
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_SERVICES.map((service, idx) => (
          <TextReveal key={service.title} delay={0.05 * idx} yOffset={20}>
            <div className="group p-8 rounded-[24px] bg-white border border-neutral-200/80 hover:border-[#007AFF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
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
                  {service.desc}
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
    </section>
  );
};


