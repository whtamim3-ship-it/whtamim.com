import React from 'react';
import { Clock, MapPin, Sparkles } from 'lucide-react';
import { useStudioTime } from '../utils/studioTime';
import { playSubtleClickSound } from '../utils/motion';

interface StudioTimeWidgetProps {
  variant?: 'compact' | 'full' | 'pill';
  onContactClick?: () => void;
  className?: string;
}

export const StudioTimeWidget: React.FC<StudioTimeWidgetProps> = ({
  variant = 'full',
  onContactClick,
  className = '',
}) => {
  const studio = useStudioTime();

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center justify-center p-2 rounded-xl border border-emerald-500/30 dark:border-emerald-400/30 bg-emerald-500/10 dark:bg-emerald-500/15 backdrop-blur-md shadow-2xs select-none ${className}`}
        title="Active Now"
        aria-label="Active Now"
      >
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl p-3.5 sm:p-4 border transition-all duration-1000 bg-[#121216] ${className}`}
        style={{
          borderColor: studio.borderColor,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ background: studio.glowGradient }}
        />
        <div className="relative z-10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-14px sm:text-16px shadow-sm border border-white/10 shrink-0"
              style={{ backgroundColor: `${studio.accentColor}20` }}
            >
              {studio.iconEmoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-11px font-mono text-neutral-400 truncate">
                <MapPin className="w-3 h-3 text-neutral-500 shrink-0" />
                <span className="truncate">Dhaka, Bangladesh</span>
              </div>
              <div className="text-13px sm:text-15px font-bold font-mono text-white tracking-tight">
                {studio.timeString}
              </div>
            </div>
          </div>

          <div className="flex items-center xs:flex-col xs:items-end justify-between w-full xs:w-auto gap-1 pt-2 xs:pt-0 border-t xs:border-t-0 border-white/10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-10px sm:text-11px font-mono border border-white/10 bg-white/5 text-neutral-200 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full animate-ping shrink-0" style={{ backgroundColor: studio.presenceDotColor }} />
              <span className="truncate">{studio.headline}</span>
            </div>
            <div className="text-10px sm:text-11px text-neutral-400 font-mono shrink-0">
              {studio.presenceBadgeText}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full Widget Layout (as requested by user)
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 border transition-all duration-1000 bg-[#121218] dark:bg-[#121218] text-neutral-200 shadow-xl ${className}`}
      style={{
        borderColor: studio.borderColor,
      }}
    >
      {/* Ambient Time Glow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-80"
        style={{ background: studio.glowGradient }}
      />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Header Title: Studio - Dhaka, Bangladesh */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-20px">{studio.iconEmoji}</span>
            <div>
              <div className="text-13px font-mono font-semibold text-white tracking-tight flex items-center gap-1.5">
                <span>Studio — Dhaka, Bangladesh</span>
              </div>
              <div className="text-11px font-mono text-neutral-400 mt-0.5">
                Local Timezone (UTC+06:00)
              </div>
            </div>
          </div>

          {/* Realtime Digital Clock */}
          <div className="self-start xs:self-auto flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/40 border border-white/10 font-mono text-13px sm:text-14px font-bold text-white shadow-inner">
            <Clock className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
            <span>{studio.timeString}</span>
          </div>
        </div>

        {/* Dynamic Time State Headline & Message */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div
              className="text-16px sm:text-18px font-bold text-white tracking-tight flex flex-wrap items-center gap-2"
            >
              <span>{studio.headline}</span>
              <span className="text-11px sm:text-12px font-normal font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
                {studio.statusMessage}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 text-12px sm:text-13px font-mono text-neutral-300">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: studio.presenceDotColor }}
              />
              <span className="font-medium text-white">{studio.presenceBadgeText}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">{studio.availabilityText}</span>
            </div>
          </div>

          {onContactClick && (
            <button
              onClick={() => {
                playSubtleClickSound();
                onContactClick();
              }}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-semibold text-12px font-mono hover:bg-neutral-200 transition-all shadow-md group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black group-hover:scale-110 transition-transform" />
              <span>Send Message</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
