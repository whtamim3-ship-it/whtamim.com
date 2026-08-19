import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSubtleClickSound } from '../utils/motion';

export type PlanType = 'free' | 'premium';
export type BillingCycle = 'monthly' | 'annual';

export interface PlanToggleProps {
  initialPlan?: PlanType;
  initialBilling?: BillingCycle;
  onChange?: (plan: PlanType, billing: BillingCycle) => void;
  className?: string;
  showDiscountBadge?: boolean;
}

export const PlanToggle: React.FC<PlanToggleProps> = ({
  initialPlan = 'free',
  initialBilling = 'monthly',
  onChange,
  className = '',
  showDiscountBadge = true,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(initialPlan);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBilling);

  // Exact spring physics specified for high-performance fluid motion
  const springTransition = {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
  };

  const handleSelectPlan = (plan: PlanType) => {
    if (plan !== selectedPlan) {
      playSubtleClickSound();
      setSelectedPlan(plan);
      onChange?.(plan, billingCycle);
    }
  };

  const handleSelectBilling = (e: React.MouseEvent, cycle: BillingCycle) => {
    e.stopPropagation();
    if (cycle !== billingCycle) {
      playSubtleClickSound();
      setBillingCycle(cycle);
      onChange?.(selectedPlan, cycle);
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {/* Outer Container with automatic layout expansion and spring physics */}
      <motion.div
        layout
        transition={springTransition}
        className="relative flex items-center p-1.5 rounded-[22px] bg-neutral-200/90 dark:bg-neutral-900 border border-neutral-300/80 dark:border-neutral-800 shadow-inner select-none overflow-hidden"
      >
        {/* FREE PLAN TAB */}
        <button
          type="button"
          id="toggle-plan-free"
          onClick={() => handleSelectPlan('free')}
          className="relative z-10 px-6 py-2.5 rounded-[18px] text-sm font-medium transition-colors duration-200 cursor-pointer focus:outline-none flex items-center justify-center min-w-[84px]"
        >
          {/* Sliding Black Active Background for Free Tab */}
          {selectedPlan === 'free' && (
            <motion.div
              layoutId="activePillBackground"
              layout
              transition={springTransition}
              className="absolute inset-0 bg-neutral-950 dark:bg-black rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.25)] border border-neutral-800/80"
            />
          )}

          <motion.span
            layout
            transition={springTransition}
            className={`relative z-20 font-semibold tracking-tight transition-colors duration-200 ${
              selectedPlan === 'free'
                ? 'text-white'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
            }`}
          >
            Free
          </motion.span>
        </button>

        {/* PREMIUM PLAN TAB (EXPANDABLE) */}
        <button
          type="button"
          id="toggle-plan-premium"
          onClick={() => handleSelectPlan('premium')}
          className="relative z-10 px-6 py-2 rounded-[18px] text-sm font-medium transition-colors duration-200 cursor-pointer focus:outline-none flex flex-col items-center justify-center min-w-[110px]"
        >
          {/* Sliding Black Active Background for Premium Tab */}
          {selectedPlan === 'premium' && (
            <motion.div
              layoutId="activePillBackground"
              layout
              transition={springTransition}
              className="absolute inset-0 bg-neutral-950 dark:bg-black rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-neutral-800/80"
            />
          )}

          {/* Premium Header Label */}
          <motion.div
            layout
            transition={springTransition}
            className="relative z-20 flex items-center gap-1.5"
          >
            <span
              className={`font-semibold tracking-tight transition-colors duration-200 ${
                selectedPlan === 'premium'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
            >
              Premium
            </span>
          </motion.div>

          {/* Sub-options: 'Monthly • Annual' fading in below the 'Premium' text */}
          <AnimatePresence mode="wait">
            {selectedPlan === 'premium' && (
              <motion.div
                key="premium-sub-options"
                layout
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{
                  opacity: { duration: 0.18, ease: 'easeOut' },
                  layout: springTransition,
                  height: springTransition,
                }}
                className="relative z-20 mt-1 flex items-center gap-1 text-[11px] font-mono tracking-tight"
              >
                {/* Monthly Sub-option */}
                <span
                  onClick={(e) => handleSelectBilling(e, 'monthly')}
                  className={`px-1.5 py-0.5 rounded transition-all duration-150 cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'text-white font-semibold bg-white/20'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/10'
                  }`}
                >
                  Monthly
                </span>

                <span className="text-neutral-600 dark:text-neutral-500 select-none text-[10px]">•</span>

                {/* Annual Sub-option */}
                <span
                  onClick={(e) => handleSelectBilling(e, 'annual')}
                  className={`px-1.5 py-0.5 rounded transition-all duration-150 cursor-pointer flex items-center gap-1 ${
                    billingCycle === 'annual'
                      ? 'text-white font-semibold bg-white/20'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/10'
                  }`}
                >
                  <span>Annual</span>
                  {showDiscountBadge && (
                    <span className="text-[9px] text-emerald-400 font-sans font-bold tracking-normal bg-emerald-500/20 px-1 py-0.2 rounded">
                      -20%
                    </span>
                  )}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </div>
  );
};

