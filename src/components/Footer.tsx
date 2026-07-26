import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, Calculator } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';

interface FooterProps {
  onOpenEstimator?: () => void;
  onOpenAIStoryboard?: () => void;
}


export const Footer: React.FC<FooterProps> = ({
  onOpenEstimator,
  onOpenAIStoryboard,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playSubtleClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 sm:px-8 max-w-7xl mx-auto border-t border-neutral-900 text-neutral-400 bg-black">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
        <TextReveal delay={0} yOffset={20}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white block hover:opacity-80 transition-opacity font-mono"
          >
            whtamim
          </a>
          <p className="text-14px text-neutral-400 mt-2 max-w-md">
            SaaS Video Editor & Motion Designer. Crafting product launch films that elevate digital software brands.
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <Calculator className="w-3 h-3 text-white" />
                <span>Project Estimator</span>
              </button>
            )}
          </div>

          <div className="text-neutral-500">
            Studio Local Time: <strong className="text-white">{time || '12:00:00 PM'}</strong>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-12px font-mono text-neutral-500">
        <div>
          © {new Date().getFullYear()} whtamim. All rights reserved.
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 hover:text-white transition-colors p-2.5 px-4 rounded-full bg-neutral-950 border border-neutral-900 text-neutral-300"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};


