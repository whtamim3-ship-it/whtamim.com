import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';

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
    answer: 'Most SaaS commercial launch films and UI motion projects take between 2 to 4 weeks from discovery to final multi-format delivery. Rapid 7–10 day rush turnarounds are also available for time-sensitive product launches.',
    category: 'Timeline & Scope',
  },
  {
    id: 'required-assets',
    question: 'What assets do you need from my team to get started?',
    answer: 'All I need is access to your Figma design files, brand guidelines, and a short walkthrough of your software. If you already have a script or voiceover, fantastic — otherwise, I write the production script and craft visual storyboards from scratch.',
    category: 'Onboarding',
  },
  {
    id: 'revision-process',
    question: 'How do revisions work during the production process?',
    answer: 'Every project includes two dedicated revision rounds at key milestones (Script & Storyboard phase, and Motion Rough Cut) to guarantee total alignment. Feedback is collected seamlessly via Frame.io for frame-accurate time-coded notes.',
    category: 'Workflow',
  },
  {
    id: 'software-stack',
    question: 'What tools and software do you use for motion design?',
    answer: 'I construct and animate UI models primarily in Adobe After Effects, Cinema 4D, Figma, and Premiere Pro. Keyframe physics are driven by custom expression-based spring dynamics, Bezier velocity curves, and 3D depth maps.',
    category: 'Technical',
  },
  {
    id: 'delivery-formats',
    question: 'What video formats and aspect ratios are delivered?',
    answer: 'You will receive crisp 4K master files formatted for all channels: 16:9 for website hero embeds & YouTube, 9:16 vertical cuts for Instagram Reels & TikTok, and 1:1 square cuts for LinkedIn & X (Twitter) feeds.',
    category: 'Deliverables',
  },
  {
    id: 'pricing-structure',
    question: 'How is project pricing calculated?',
    answer: 'Pricing is fixed and transparent based on video duration, visual complexity (2D UI rigging vs. 3D spatial renders), and requested formats. You can use the Project Estimator tool on this site to calculate a tailored scope estimate instantly.',
    category: 'Pricing',
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
    <section
      id="faq"
      className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-neutral-200/80 bg-[#F5F5F7] text-[#1D1D1F]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Section Header */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] font-bold block">
            FREQUENTLY ASKED QUESTIONS
          </TextReveal>

          <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] leading-[1.1]">
            Everything You Need to Know.
          </TextReveal>

          <TextReveal as="p" delay={0.16} yOffset={20} className="text-15px text-[#86868B] leading-relaxed max-w-md">
            Clear details on production timelines, onboarding requirements, revision cycles, and multi-format deliverables.
          </TextReveal>

          <TextReveal delay={0.24} yOffset={20} className="pt-2">
            <div className="p-6 rounded-[24px] bg-white border border-neutral-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-14px font-bold text-[#1D1D1F]">Have a custom requirement?</h3>
                  <p className="text-12px text-[#86868B]">Get an instant project estimate in under 60 seconds.</p>
                </div>
              </div>

              {onOpenEstimator && (
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    onOpenEstimator();
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-[#1D1D1F] hover:bg-[#007AFF] text-white text-13px font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Launch Project Estimator</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
            </div>
          </TextReveal>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-7 space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <TextReveal key={item.id} delay={0.05 * idx} yOffset={20}>
                <div
                  className={`rounded-[20px] bg-white border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#007AFF] shadow-md'
                      : 'border-neutral-200/80 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1 pr-2">
                      {item.category && (
                        <span className="text-10px font-mono uppercase tracking-wider text-[#007AFF] font-bold block mb-1">
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-16px sm:text-18px font-bold text-[#1D1D1F] leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                        isOpen
                          ? 'bg-[#007AFF] text-white rotate-180'
                          : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-neutral-200/70'
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
                        <div className="px-6 pb-6 pt-0 text-14px sm:text-15px text-[#86868B] leading-relaxed border-t border-neutral-100/80 pt-4 mt-1">
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
    </section>
  );
};
