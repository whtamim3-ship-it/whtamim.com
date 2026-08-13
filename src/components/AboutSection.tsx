import React from 'react';
import { TextReveal } from './TextReveal';
import { ImageReveal } from './ImageReveal';
import { SectionReveal } from './SectionReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';
import { BlurUpImage } from './BlurUpImage';

interface AboutSectionProps {}

const PremiereProIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 shadow-2xs" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#00005B" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#9999FF" strokeOpacity="0.8" />
    <text x="16" y="21" textAnchor="middle" fill="#9999FF" fontSize="13.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Pr</text>
  </svg>
);

const AfterEffectsIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 shadow-2xs" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#000033" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#D1A3FF" strokeOpacity="0.8" />
    <text x="16" y="21" textAnchor="middle" fill="#D1A3FF" fontSize="13.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Ae</text>
  </svg>
);

const DaVinciResolveIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 shadow-2xs" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#16171D" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#FFFFFF" strokeOpacity="0.15" />
    <path d="M16 7.5C18.5 11.5 21 12.5 23.5 14.5C19.5 16.5 16.5 15 16 7.5Z" fill="#FF4F5E" />
    <path d="M23.5 14.5C21.5 18 20.5 20.5 18.5 23C15.5 19.5 16.5 16.5 23.5 14.5Z" fill="#00C8FF" />
    <path d="M18.5 23C14.5 22.5 12 21 8.5 17.5C12.5 14.5 15.5 16.5 18.5 23Z" fill="#FFB700" />
  </svg>
);

const PhotoshopIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 shadow-2xs" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#001E36" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#31A8FF" strokeOpacity="0.8" />
    <text x="16" y="21" textAnchor="middle" fill="#31A8FF" fontSize="13.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Ps</text>
  </svg>
);

const IllustratorIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 shadow-2xs" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#330000" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#FF9A00" strokeOpacity="0.8" />
    <text x="16" y="21" textAnchor="middle" fill="#FF9A00" fontSize="13.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Ai</text>
  </svg>
);

const AuditionIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 shadow-2xs" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#002D2E" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#00E4BB" strokeOpacity="0.8" />
    <text x="16" y="21" textAnchor="middle" fill="#00E4BB" fontSize="13.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Au</text>
  </svg>
);

const CapCutIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 shadow-2xs" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#0A0A0C" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#FFFFFF" strokeOpacity="0.2" />
    <path
      d="M7 10.5 H25 M7 10.5 L25 21.5 M25 10.5 L7 21.5 M7 21.5 H25"
      stroke="#FFFFFF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const tools = [
    { name: 'Adobe Premiere Pro', icon: <PremiereProIcon /> },
    { name: 'Adobe After Effects', icon: <AfterEffectsIcon /> },
    { name: 'DaVinci Resolve', icon: <DaVinciResolveIcon /> },
    { name: 'Adobe Photoshop', icon: <PhotoshopIcon /> },
    { name: 'Adobe Illustrator', icon: <IllustratorIcon /> },
    { name: 'Adobe Audition', icon: <AuditionIcon /> },
    { name: 'CapCut', icon: <CapCutIcon /> },
  ];

  return (
    <SectionReveal
      id="about"
      className="min-h-[100svh] md:min-h-[100dvh] w-full flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20 border-t border-neutral-200/80 dark:border-neutral-800 bg-[#F5F5F7] dark:bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 my-auto">
      {/* Section Header with Narration Controls */}
      <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <TextReveal
            as="span"
            delay={0}
            yOffset={12}
            className="text-11px font-mono uppercase tracking-widest text-[#007AFF] dark:text-[#0A84FF] font-bold block mb-3"
          >
            ABOUT &amp; CREATIVE PHILOSOPHY
          </TextReveal>
          <TextReveal
            as="h2"
            delay={0.06}
            yOffset={16}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-[1.15]"
          >
            Craftsmanship, Precision, &amp; Authentic Storytelling.
          </TextReveal>
        </div>
      </div>

      {/* Main Content Grid: Left Portrait + Right Content */}
      <div className="about-section-grid grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
        {/* Left Profile Column with Portrait Parallax Depth */}
        <div className="lg:col-span-4 xl:col-span-4 w-full">
          <ParallaxLayer speed={-0.12} maxOffset={18}>
            <ImageReveal delay={0.1} yOffset={20} scaleFrom={1.05} className="rounded-2xl sm:rounded-3xl overflow-hidden mx-auto max-w-[320px] sm:max-w-[420px] lg:max-w-none w-full">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#161618] shadow-sm group aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] max-h-[320px] sm:max-h-[420px] lg:max-h-[480px] w-full mx-auto">
                <BlurUpImage
                  src="https://lh3.googleusercontent.com/d/1h6d88oXny8Tuxfz1OCF4eLJrm8bileM6"
                  alt="whtamim - Video Editor & Cinematographer"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to Google Drive uc export view URL if lh3 fails
                    const target = e.currentTarget as unknown as HTMLImageElement;
                    if (target && target.src !== 'https://drive.google.com/uc?export=view&id=1h6d88oXny8Tuxfz1OCF4eLJrm8bileM6') {
                      target.src = 'https://drive.google.com/uc?export=view&id=1h6d88oXny8Tuxfz1OCF4eLJrm8bileM6';
                    }
                  }}
                  className="w-full h-full"
                  imgClassName="[object-position:center_20%] group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                {/* Floating Frosted Glass Identity Card */}
                <div className="absolute bottom-[10px] left-[10px] right-[10px] p-[8px_12px] sm:py-3 sm:px-4 rounded-[10px] sm:rounded-2xl bg-[#121216]/75 backdrop-blur-[8px] border border-white/20 shadow-lg shadow-black/15 flex flex-col justify-center">
                  <h3 className="text-[13px] sm:text-14px font-semibold text-white leading-tight tracking-tight">whtamim</h3>
                  <p className="text-[10px] sm:text-[11px] font-normal text-white/80 opacity-80 font-mono mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">Video Editor &amp; Cinematographer</p>
                </div>
              </div>
            </ImageReveal>
          </ParallaxLayer>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-8 sm:space-y-10">
          {/* Creative Statement / Bio Paragraph */}
          <div className="space-y-3">
            <TextReveal
              as="h3"
              delay={0.12}
              yOffset={12}
              className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block"
            >
              CREATIVE STATEMENT
            </TextReveal>

            <TextReveal delay={0.15} yOffset={16}>
              <p
                className="text-[15px] leading-[1.6] font-normal text-[#1D1D1F] dark:text-[#F5F5F7]"
                style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                I am a video editor and visual storyteller focused on crafting compelling cinematic narratives. Every project I handle combines rhythm, technical precision, and emotional depth to transform raw footage into impactful stories. Rather than relying on artificial hype, I focus on authentic pacing and clean visual flow. My workflow spans full post-production—from initial pacing and sound design to advanced motion graphics and color grading. I help brands, creators, and studios communicate their vision with clarity and authority.
              </p>
            </TextReveal>
          </div>

          {/* Software Expertise */}
          <div className="space-y-4 pt-6 sm:pt-8 border-t border-neutral-200/60 dark:border-neutral-800">
            <TextReveal
              as="h3"
              delay={0.22}
              yOffset={12}
              className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block"
            >
              SOFTWARE EXPERTISE
            </TextReveal>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {tools.map((t, idx) => (
                <TextReveal key={t.name} delay={0.24 + idx * 0.03} yOffset={12}>
                  <div className="px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.08] shadow-2xs flex items-center gap-3 hover:border-[#007AFF]/40 dark:hover:border-[#0A84FF]/40 transition-all">
                    {t.icon}
                    <span
                      className="text-13px sm:text-14px font-medium text-[#1D1D1F] dark:text-[#F5F5F7] whitespace-nowrap"
                      style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      {t.name}
                    </span>
                  </div>
                </TextReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </SectionReveal>
  );
};




