import React from 'react';
import { Clock, MapPin, Sparkles, Sun, Moon, CloudSun, Eye } from 'lucide-react';
import { useStudioTime, StudioTimeState, SkyPhase } from '../utils/studioTime';
import { playSubtleClickSound } from '../utils/motion';

interface StudioTimeWidgetProps {
  variant?: 'compact' | 'full' | 'pill';
  onContactClick?: () => void;
  className?: string;
}

// Realistic Time-Based Sky Canvas Component
const RealisticSkyBackground: React.FC<{ studio: StudioTimeState }> = ({ studio }) => {
  const { skyGradient, starOpacity, cloudOpacity, sunMoonPosition, sunMoonType, skyName } = studio;

  // Static star coordinate seeds for realistic distribution
  const stars = [
    { top: '12%', left: '8%', size: 2, delay: '0s' },
    { top: '18%', left: '24%', size: 1.5, delay: '0.7s' },
    { top: '8%', left: '42%', size: 2.5, delay: '1.2s' },
    { top: '22%', left: '58%', size: 1, delay: '0.3s' },
    { top: '10%', left: '76%', size: 2, delay: '1.8s' },
    { top: '25%', left: '88%', size: 1.5, delay: '0.9s' },
    { top: '35%', left: '15%', size: 2, delay: '1.5s' },
    { top: '42%', left: '32%', size: 1, delay: '0.4s' },
    { top: '30%', left: '68%', size: 2.5, delay: '2.1s' },
    { top: '38%', left: '82%', size: 1.5, delay: '1.1s' },
    { top: '15%', left: '94%', size: 2, delay: '0.6s' },
    { top: '48%', left: '50%', size: 1, delay: '1.7s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
      {/* 1. Dynamic Time Sky Gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: skyGradient }}
      />

      {/* 2. Twinkling Stars Layer (Active in Night, Dawn, Sunset) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: starOpacity }}
      >
        {stars.map((star, idx) => (
          <div
            key={idx}
            className="absolute bg-white rounded-full animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: '2.5s',
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* 3. Celestial Body (Sun or Moon Positioned along Time Arc) */}
      <div
        className="absolute transition-all duration-1000 ease-out pointer-events-none z-10"
        style={{
          left: `${sunMoonPosition.x}%`,
          top: `${sunMoonPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {sunMoonType === 'sun' ? (
          <div className="relative flex items-center justify-center">
            {/* Outer Solar Flare Radial Bloom */}
            <div className="absolute w-28 h-28 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
            {/* Solar Corona Halo */}
            <div className="absolute w-16 h-16 rounded-full bg-yellow-300/35 blur-md" />
            {/* Sun Core */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-500 shadow-[0_0_35px_rgba(251,191,36,0.9)] border border-yellow-100/60" />
            {/* Subtle Sun Rays Lens Flare */}
            <div className="absolute w-20 h-0.5 bg-yellow-200/30 rotate-45 blur-[0.5px]" />
            <div className="absolute w-20 h-0.5 bg-yellow-200/30 -rotate-45 blur-[0.5px]" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Lunar Ambient Glow */}
            <div className="absolute w-24 h-24 rounded-full bg-indigo-200/20 blur-xl animate-pulse" />
            {/* Moon Core Crescent */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-slate-200 via-indigo-100 to-white shadow-[0_0_28px_rgba(224,231,255,0.85)] border border-white/80 relative overflow-hidden">
              {/* Crescent Shadow Overlay */}
              <div className="absolute -top-1 -right-1.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-slate-900/80 blur-[0.5px]" />
            </div>
          </div>
        )}
      </div>

      {/* 4. Drifting Realistic Clouds Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: cloudOpacity }}
      >
        {/* Soft Upper Cloud */}
        <div className="absolute top-[18%] left-[-10%] w-[50%] h-12 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Mid Drift Cloud */}
        <div className="absolute top-[35%] right-[-5%] w-[45%] h-14 bg-white/15 rounded-full blur-xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        {/* Low Horizon Fog Cloud */}
        <div className="absolute bottom-[20%] left-[20%] w-[60%] h-16 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* 5. Distant Mountain Horizon Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 pointer-events-none z-10 opacity-75">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full fill-[#0a0a0f] text-[#0a0a0f]"
        >
          {/* Subtle Mountain Contours */}
          <path d="M0,120 L0,85 Q150,45 300,75 Q450,105 600,55 Q750,15 900,65 Q1050,115 1200,70 L1200,120 Z" opacity="0.6" />
          <path d="M0,120 L0,95 Q200,65 400,90 Q600,40 800,85 Q1000,50 1200,90 L1200,120 Z" />
        </svg>
      </div>

      {/* 6. Ambient Glow Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 opacity-60"
        style={{ background: studio.glowGradient }}
      />
    </div>
  );
};

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
        className={`relative overflow-hidden rounded-2xl border transition-all duration-1000 shadow-lg ${className}`}
        style={{
          borderColor: studio.borderColor,
          padding: '16px 24px',
        }}
      >
        {/* Realistic Time Sky Background Canvas */}
        <RealisticSkyBackground studio={studio} />

        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-16px shadow-sm border border-white/20 bg-black/40 backdrop-blur-md shrink-0"
            >
              {studio.iconEmoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-12px font-mono text-white/90 truncate">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="font-semibold text-white truncate">Dhaka, Bangladesh</span>
                <span className="text-white/40">•</span>
                <span className="text-amber-200 font-mono font-bold">{studio.timeString}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/15">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-11px font-mono border border-white/20 bg-black/50 backdrop-blur-md text-white shrink-0 shadow-2xs">
              <span className="w-2 h-2 rounded-full animate-ping shrink-0" style={{ backgroundColor: studio.presenceDotColor }} />
              <span className="truncate">{studio.presenceBadgeText || studio.headline}</span>
            </div>
            {onContactClick && (
              <button
                onClick={() => {
                  playSubtleClickSound();
                  onContactClick();
                }}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black font-semibold text-11px font-mono hover:bg-neutral-100 transition-all shadow-md group cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-black" />
                <span>Contact</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full Widget Layout with Realistic Sky Background
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 border transition-all duration-1000 text-neutral-100 shadow-2xl ${className}`}
      style={{
        borderColor: studio.borderColor,
      }}
    >
      {/* Dynamic Realistic Time Sky Canvas */}
      <RealisticSkyBackground studio={studio} />

      <div className="relative z-20 flex flex-col gap-5">
        {/* Header Title: Studio - Dhaka, Bangladesh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-22px drop-shadow-md">{studio.iconEmoji}</span>
            <div>
              <div className="text-13px sm:text-14px font-mono font-bold text-white tracking-tight flex items-center gap-2 drop-shadow-sm">
                <span>Studio — Dhaka, Bangladesh</span>
                <span className="text-10px font-normal px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-amber-200/90 backdrop-blur-md">
                  ✨ {studio.skyName}
                </span>
              </div>
              <div className="text-11px font-mono text-neutral-200/90 mt-0.5 drop-shadow-xs">
                Local Timezone (UTC+06:00)
              </div>
            </div>
          </div>

          {/* Realtime Digital Clock */}
          <div className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-black/60 border border-white/20 font-mono text-13px sm:text-14px font-bold text-white shadow-xl backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{studio.timeString}</span>
          </div>
        </div>

        {/* Dynamic Time State Headline & Message */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div
              className="text-16px sm:text-19px font-extrabold text-white tracking-tight flex flex-wrap items-center gap-2 drop-shadow-md"
            >
              <span>{studio.headline}</span>
              <span className="text-11px sm:text-12px font-medium font-mono px-2.5 py-0.5 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md">
                {studio.statusMessage}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 text-12px sm:text-13px font-mono text-neutral-200 drop-shadow-xs">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: studio.presenceDotColor }}
              />
              <span className="font-semibold text-white">{studio.presenceBadgeText}</span>
              <span className="text-neutral-300/80">•</span>
              <span className="text-neutral-200/90">{studio.availabilityText}</span>
            </div>
          </div>

          {onContactClick && (
            <button
              onClick={() => {
                playSubtleClickSound();
                onContactClick();
              }}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-full bg-white text-black font-semibold text-12px font-mono hover:bg-neutral-100 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 group cursor-pointer"
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

