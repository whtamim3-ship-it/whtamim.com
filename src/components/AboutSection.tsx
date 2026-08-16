import React from 'react';
import { SiDavinciresolve } from 'react-icons/si';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';

interface AboutSectionProps {
  theme?: 'light' | 'dark';
}

const PremiereProIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 block select-none pointer-events-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#00005B" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#9999FF" strokeOpacity="0.8" />
    <text x="16" y="21.5" textAnchor="middle" fill="#9999FF" fontSize="14" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Pr</text>
  </svg>
);

const AfterEffectsIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 block select-none pointer-events-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#000033" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#D1A3FF" strokeOpacity="0.8" />
    <text x="16" y="21.5" textAnchor="middle" fill="#D1A3FF" fontSize="14" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Ae</text>
  </svg>
);

const DaVinciResolveIcon = () => (
  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#121318] border border-white/20 flex items-center justify-center shrink-0 pointer-events-none select-none">
    <SiDavinciresolve className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF453A]" />
  </div>
);

const PhotoshopIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 block select-none pointer-events-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#001E36" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#31A8FF" strokeOpacity="0.8" />
    <text x="16" y="21.5" textAnchor="middle" fill="#31A8FF" fontSize="14" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Ps</text>
  </svg>
);

const IllustratorIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 block select-none pointer-events-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#330000" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#FF9A00" strokeOpacity="0.8" />
    <text x="16" y="21.5" textAnchor="middle" fill="#FF9A00" fontSize="14" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Ai</text>
  </svg>
);

const AuditionIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 block select-none pointer-events-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#002D2E" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#00E4BB" strokeOpacity="0.8" />
    <text x="16" y="21.5" textAnchor="middle" fill="#00E4BB" fontSize="14" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Au</text>
  </svg>
);

const CapCutIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 block select-none pointer-events-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#0A0A0C" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#FFFFFF" strokeOpacity="0.25" />
    <path
      d="M8 10 H24 M8 10 L24 22 M24 10 L8 22 M8 22 H24"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>(theme || 'dark');
  const [hoveredTool, setHoveredTool] = React.useState<number | null>(null);

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
    {
      name: 'Adobe Premiere Pro',
      icon: <PremiereProIcon />,
      rotate: -12,
      translateY: -14,
      scale: 1.08,
      floatAnim: 'floatScatter1',
      floatDur: '4.4s',
      floatDelay: '0s',
    },
    {
      name: 'Adobe After Effects',
      icon: <AfterEffectsIcon />,
      rotate: 13,
      translateY: 16,
      scale: 0.95,
      floatAnim: 'floatScatter2',
      floatDur: '5.2s',
      floatDelay: '-1.3s',
    },
    {
      name: 'DaVinci Resolve',
      icon: <DaVinciResolveIcon />,
      rotate: -15,
      translateY: -20,
      scale: 1.14,
      floatAnim: 'floatScatter3',
      floatDur: '4.8s',
      floatDelay: '-2.5s',
    },
    {
      name: 'Adobe Photoshop',
      icon: <PhotoshopIcon />,
      rotate: 8,
      translateY: 10,
      scale: 1.0,
      floatAnim: 'floatScatter4',
      floatDur: '5.5s',
      floatDelay: '-0.8s',
    },
    {
      name: 'Adobe Illustrator',
      icon: <IllustratorIcon />,
      rotate: -13,
      translateY: -12,
      scale: 0.92,
      floatAnim: 'floatScatter1',
      floatDur: '4.6s',
      floatDelay: '-3.1s',
    },
    {
      name: 'Adobe Audition',
      icon: <AuditionIcon />,
      rotate: 15,
      translateY: 18,
      scale: 1.06,
      floatAnim: 'floatScatter2',
      floatDur: '5.3s',
      floatDelay: '-1.9s',
    },
    {
      name: 'CapCut',
      icon: <CapCutIcon />,
      rotate: -7,
      translateY: -8,
      scale: 0.96,
      floatAnim: 'floatScatter3',
      floatDur: '4.2s',
      floatDelay: '-2.7s',
    },
  ];

  return (
    <SectionReveal
      id="about"
      className="min-h-screen w-full flex flex-col justify-center items-center py-14 sm:py-20 lg:py-24 border-t border-neutral-200/80 dark:border-neutral-800 text-[#1D1D1F] dark:text-[#F5F5F7] relative overflow-hidden"
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}
    >
      {/* Centering-Locked Full-Screen Day Background Image */}
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
          top: '50%',
          left: '50%',
          width: '101vw',
          height: '101vh',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          zIndex: -1,
          opacity: currentTheme === 'light' ? 1 : 0,
          transition: 'none',
        }}
      />

      {/* Centering-Locked Full-Screen Night Background Image */}
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
          top: '50%',
          left: '50%',
          width: '101vw',
          height: '101vh',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
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

            {/* 3D Scattered Floating Icons */}
            <div className="relative flex flex-wrap items-center gap-6 sm:gap-8 pt-6 pb-8 sm:pt-8 sm:pb-10 px-1 select-none">
              {tools.map((t, idx) => {
                const isHovered = hoveredTool === idx;
                return (
                  <TextReveal key={t.name} delay={0.24 + idx * 0.03} yOffset={12}>
                    <div
                      title={t.name}
                      aria-label={t.name}
                      onMouseEnter={() => setHoveredTool(idx)}
                      onMouseLeave={() => setHoveredTool(null)}
                      className="relative cursor-pointer"
                      style={{
                        animation: `${t.floatAnim} ${t.floatDur} ease-in-out ${t.floatDelay} infinite`,
                        zIndex: isHovered ? 40 : 10,
                      }}
                    >
                      <div
                        className="scatter-icon-raw transition-all duration-300 ease-out"
                        style={{
                          transform: isHovered
                            ? `translateY(-10px) rotate(0deg) scale(${t.scale * 1.2})`
                            : `translateY(${t.translateY}px) rotate(${t.rotate}deg) scale(${t.scale})`,
                          filter: isHovered
                            ? 'drop-shadow(0px 24px 30px rgba(0, 0, 0, 0.65)) drop-shadow(0px 8px 14px rgba(0, 0, 0, 0.35))'
                            : 'drop-shadow(0px 15px 20px rgba(0, 0, 0, 0.42)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))',
                        }}
                      >
                        {t.icon}
                      </div>
                    </div>
                  </TextReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
};
