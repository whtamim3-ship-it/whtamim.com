import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
  showLabel = false,
}) => {
  const isDark = theme === 'dark';

  const handleClick = () => {
    playSubtleClickSound();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative group inline-flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full border border-neutral-200/90 dark:border-neutral-800/90 bg-white/80 dark:bg-[#161618]/80 backdrop-blur-md text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF]/60 dark:hover:border-[#0A84FF]/60 hover:shadow-xs transition-all duration-400 ease-out cursor-pointer select-none overflow-visible ${className}`}
    >
      {/* Dynamic Ambient Glow Cross-Fade Halo */}
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="glow-amber"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-full bg-amber-400/15 blur-[6px] pointer-events-none"
          />
        ) : (
          <motion.div
            key="glow-blue"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-full bg-blue-500/10 blur-[6px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="dark-sun"
              initial={{ opacity: 0, scale: 0.6, rotate: -45, filter: 'blur(2px)' }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.6, rotate: 45, filter: 'blur(2px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center text-amber-400"
            >
              <Sun className="w-4 h-4 fill-amber-400/20 stroke-amber-400 transition-transform duration-300 group-hover:rotate-45" />
            </motion.div>
          ) : (
            <motion.div
              key="light-moon"
              initial={{ opacity: 0, scale: 0.6, rotate: 45, filter: 'blur(2px)' }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.6, rotate: -45, filter: 'blur(2px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center text-[#1D1D1F]"
            >
              <Moon className="w-4 h-4 fill-[#1D1D1F]/10 stroke-current transition-transform duration-300 group-hover:-rotate-12" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <div className="relative overflow-hidden h-4 min-w-[34px] hidden sm:inline-flex items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? 'label-dark' : 'label-light'}
              initial={{ opacity: 0, y: isDark ? 6 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isDark ? -6 : 6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-12px font-medium font-mono whitespace-nowrap"
            >
              {isDark ? 'Light' : 'Dark'}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {/* Accessible subtle hover tooltip */}
      <span className="absolute -bottom-8 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[10px] font-mono tracking-wide opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xs z-50">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};
