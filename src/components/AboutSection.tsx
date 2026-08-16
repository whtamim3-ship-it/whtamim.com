import React from 'react';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';

interface AboutSectionProps {
  theme?: 'light' | 'dark';
}

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

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>(theme || 'dark');

  React.useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
      return;
    }
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [theme]);

  const dayImage = 'https://drive.google.com/uc?export=view&id=1t__vRPyKD3bVzCXagiT4rtoaL8FFyJs3';
  const nightImage = 'https://drive.google.com/uc?export=view&id=1Iw0TKqADERuDOqDo60bKzRBEWCIn-woJ';
  const imageSrc = currentTheme === 'light' ? dayImage : nightImage;

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
      className="min-h-[80vh] w-full flex flex-col justify-center items-center py-14 sm:py-20 lg:py-24 border-t border-neutral-200/80 dark:border-neutral-800 text-[#1D1D1F] dark:text-[#F5F5F7] relative overflow-hidden"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Pre-rendered Day Background Image */}
      <img
        src={dayImage}
        alt="About Background Day"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.includes('lh3.googleusercontent.com')) {
            target.src = 'https://lh3.googleusercontent.com/d/1t__vRPyKD3bVzCXagiT4rtoaL8FFyJs3';
          }
        }}
        className="pointer-events-none select-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center',
          zIndex: -1,
          opacity: currentTheme === 'light' ? 1 : 0,
          transition: 'none',
        }}
      />

      {/* Pre-rendered Night Background Image */}
      <img
        src={nightImage}
        alt="About Background Night"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.includes('lh3.googleusercontent.com')) {
            target.src = 'https://lh3.googleusercontent.com/d/1Iw0TKqADERuDOqDo60bKzRBEWCIn-woJ';
          }
        }}
        className="pointer-events-none select-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center',
          zIndex: -1,
          opacity: currentTheme === 'dark' ? 1 : 0,
          transition: 'none',
        }}
      />

      {/* Subtle text readability gradient wash on the left */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#F5F5F7]/95 via-[#F5F5F7]/70 to-transparent dark:from-[#0a0a0c]/95 dark:via-[#0a0a0c]/70 dark:to-transparent pointer-events-none -z-10 md:max-w-[70%]"
        style={{ zIndex: -1 }}
      />

      <div
        className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 my-auto relative z-10"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {/* 1-Column Natural Left-Aligned Layout */}
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8 text-left">
          {/* Sub-badge & Main Headline */}
          <div>
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
                className="text-[15px] sm:text-[16px] leading-[1.65] font-normal text-[#1D1D1F] dark:text-[#F5F5F7]"
                style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                I am a video editor and visual storyteller focused on crafting compelling cinematic narratives. Every project I handle combines rhythm, technical precision, and emotional depth to transform raw footage into impactful stories. Rather than relying on authentic hype, I focus on authentic pacing and clean visual flow. My workflow spans full post-production—from initial pacing and sound design to advanced motion graphics and color grading. I help brands, creators, and studios communicate their vision with clarity and authority.
              </p>
            </TextReveal>
          </div>

          {/* Software Expertise */}
          <div className="space-y-4 pt-6 sm:pt-8 border-t border-neutral-200/60 dark:border-neutral-800/80">
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
                  <div className="px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-[#121214]/75 backdrop-blur-md border border-neutral-200/80 dark:border-white/[0.08] shadow-2xs flex items-center gap-3 hover:border-[#007AFF]/50 dark:hover:border-[#0A84FF]/50 transition-all">
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
    </SectionReveal>
  );
};
