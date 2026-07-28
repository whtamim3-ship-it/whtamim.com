import React from 'react';
import { ArrowUp, Sparkles, Calculator } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { StudioTimeWidget } from './StudioTimeWidget';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenEstimator?: () => void;
  onOpenAIStoryboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEstimator,
  onOpenAIStoryboard,
}) => {
  const scrollToTop = () => {
    playSubtleClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionReveal as="footer" className="py-16 w-full border-t border-neutral-800 text-neutral-400 bg-[#0E0E10] dark:bg-[#0E0E10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Live Studio Time Experience Banner */}
        <div className="mb-12">
          <StudioTimeWidget
            variant="full"
            onContactClick={scrollToContact}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <TextReveal delay={0} yOffset={20}>
            <BrandLogo
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="mb-2"
            />
            <p className="text-14px text-neutral-400 mt-2 max-w-md">
              Video Editor & Cinematographer. Turning raw footage into stories that stick.
            </p>
          </TextReveal>

          <div className="flex flex-col items-start md:items-end gap-3 font-mono text-12px">
            {/* Studio Tools Footer Shortcuts */}
            <div className="flex flex-wrap items-center gap-2">
              {onOpenAIStoryboard && (
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    onOpenAIStoryboard();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>AI Storyboard</span>
                </button>
              )}
              {onOpenEstimator && (
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    onOpenEstimator();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  <Calculator className="w-3 h-3 text-white" />
                  <span>Project Estimator</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-12px font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} whtamim. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors p-2.5 px-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </SectionReveal>
  );
};



