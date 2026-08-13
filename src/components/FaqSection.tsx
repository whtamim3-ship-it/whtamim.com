import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'turnaround-time',
    question: 'What is your typical turnaround time for a video project?',
    answer: 'Most projects take 1-2 weeks depending on scope.',
    category: 'Timeline & Scope',
  },
  {
    id: 'required-assets',
    question: 'What assets do you need from my team to get started?',
    answer: 'Raw footage, brand references, and a short brief.',
    category: 'Onboarding',
  },
  {
    id: 'pricing-structure',
    question: 'How is project pricing calculated?',
    answer: 'Project-based, depending on scope and length.',
    category: 'Pricing',
  },
  {
    id: 'revision-process',
    question: 'How do revisions work during the production process?',
    answer: 'Every project includes dedicated revision rounds at key milestones to guarantee total satisfaction.',
    category: 'Workflow',
  },
  {
    id: 'delivery-formats',
    question: 'What video formats and aspect ratios are delivered?',
    answer: 'You will receive 4K master files formatted for all platforms: 16:9 for web/YouTube, 9:16 for Reels/TikTok, and 1:1 for social feeds.',
    category: 'Deliverables',
  },
];

interface FaqSectionProps {
  onOpenEstimator?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenEstimator }) => {
  // Allow multiple or single open accordion item
  const [openId, setOpenId] = useState<string | null>('turnaround-time');

  const toggleItem = (id: string) => {
    playSubtleClickSound();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionReveal
      id="faq"
      className="min-h-[100svh] md:min-h-[100dvh] w-full flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20 border-t border-neutral-200/80 dark:border-neutral-800 bg-[#F5F5F7] dark:bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* Left Section Header */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 sm:space-y-8">
          <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block">
            FREQUENTLY ASKED QUESTIONS
          </TextReveal>

          <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-[1.1]">
            Everything You Need to Know.
          </TextReveal>

          <TextReveal as="p" delay={0.16} yOffset={20} className="text-15px text-[#86868B] dark:text-[#98989D] leading-relaxed max-w-md">
            Clear details on production timelines, onboarding requirements, revision cycles, and multi-format deliverables.
          </TextReveal>

          <TextReveal delay={0.24} yOffset={20} className="pt-2">
            <div className="p-6 sm:p-7 rounded-[24px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-full bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 text-[#007AFF] dark:text-[#0A84FF] shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-14px font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">Have a custom requirement?</h3>
                  <p className="text-12px text-[#86868B] dark:text-[#98989D] mt-0.5">Reach out directly for tailored scope discussions.</p>
                </div>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playSubtleClickSound();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 px-5 rounded-full bg-[#1D1D1F] dark:bg-white hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] text-white dark:text-[#0A0A0C] dark:hover:text-white text-13px font-semibold transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </TextReveal>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <TextReveal key={item.id} delay={0.05 * idx} yOffset={20}>
                <div
                  className={`rounded-[20px] bg-white dark:bg-[#161618] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#007AFF] dark:border-[#0A84FF] shadow-md'
                      : 'border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1 pr-2">
                      {item.category && (
                        <span className="text-10px font-mono uppercase tracking-wider text-[#007AFF] dark:text-[#0A84FF] font-bold block mb-1">
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-16px sm:text-18px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                        isOpen
                          ? 'bg-[#007AFF] dark:bg-[#0A84FF] text-white rotate-180'
                          : 'bg-[#F5F5F7] dark:bg-neutral-800 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-neutral-200/70 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 text-14px sm:text-15px text-[#86868B] dark:text-[#98989D] leading-relaxed border-t border-neutral-100/80 dark:border-neutral-800 pt-4 mt-1">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TextReveal>
            );
          })}
        </div>
      </div>
      </div>
    </SectionReveal>
  );
};
