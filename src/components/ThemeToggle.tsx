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
      className={`relative group inline-flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full border border-neutral-200/90 dark:border-neutral-800/90 bg-white/80 dark:bg-[#161618]/80 backdrop-blur-md text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF]/60 dark:hover:border-[#0A84FF]/60 hover:shadow-xs transition-all duration-200 cursor-pointer select-none ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="dark-sun"
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center text-amber-400"
            >
              <Sun className="w-4 h-4 fill-amber-400/20 stroke-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="light-moon"
              initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center text-[#1D1D1F]"
            >
              <Moon className="w-4 h-4 fill-[#1D1D1F]/10 stroke-current" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-12px font-medium font-mono hidden sm:inline-block">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}

      {/* Accessible subtle hover tooltip */}
      <span className="absolute -bottom-8 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[10px] font-mono tracking-wide opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xs z-50">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};
