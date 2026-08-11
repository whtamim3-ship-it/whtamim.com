import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import {
  startAmbientAudio,
  stopAmbientAudio,
  getAmbientAudioStatus,
} from '../utils/ambientAudio';

interface AmbientAudioToggleProps {
  isPlaying: boolean;
  onToggle: (newState: boolean) => void;
  className?: string;
  showLabel?: boolean;
}

export const AmbientAudioToggle: React.FC<AmbientAudioToggleProps> = ({
  isPlaying,
  onToggle,
  className = '',
  showLabel = false,
}) => {
  const handleToggle = () => {
    playSubtleClickSound();
    const nextState = !isPlaying;
    if (nextState) {
      startAmbientAudio();
    } else {
      stopAmbientAudio();
    }
    onToggle(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={isPlaying ? 'Mute Ambient Background Loop' : 'Play Ambient Background Loop'}
      title={isPlaying ? 'Disable Ambient Audio' : 'Enable Ambient Audio'}
      className={`relative group inline-flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full border border-neutral-200/90 dark:border-neutral-800/90 bg-white/80 dark:bg-[#161618]/80 backdrop-blur-md text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF]/60 dark:hover:border-[#0A84FF]/60 hover:shadow-xs transition-all duration-200 cursor-pointer select-none ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isPlaying ? (
            <motion.div
              key="audio-on"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-[#007AFF] dark:text-[#0A84FF]"
            >
              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-[1.5px] h-3.5 w-3.5 justify-center py-0.5">
                <motion.span
                  className="w-[2px] bg-[#007AFF] dark:bg-[#0A84FF] rounded-full"
                  animate={{ height: ['20%', '80%', '40%', '100%', '30%'] }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                />
                <motion.span
                  className="w-[2px] bg-[#007AFF] dark:bg-[#0A84FF] rounded-full"
                  animate={{ height: ['60%', '20%', '90%', '30%', '70%'] }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                />
                <motion.span
                  className="w-[2px] bg-[#007AFF] dark:bg-[#0A84FF] rounded-full"
                  animate={{ height: ['30%', '100%', '30%', '80%', '20%'] }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="audio-off"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-[#86868B] dark:text-[#98989D]"
            >
              <VolumeX className="w-4 h-4 stroke-current opacity-70" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-12px font-medium font-mono hidden sm:inline-block">
          {isPlaying ? 'Sound ON' : 'Sound OFF'}
        </span>
      )}

      {/* Accessible subtle hover tooltip */}
      <span className="absolute -bottom-8 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[10px] font-mono tracking-wide opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xs z-50">
        {isPlaying ? 'Mute Ambient Audio' : 'Play Ambient Audio'}
      </span>
    </button>
  );
};
