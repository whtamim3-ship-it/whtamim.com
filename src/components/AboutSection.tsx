import React from 'react';
import { SiDavinciresolve } from 'react-icons/si';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';

interface AboutSectionProps {
  theme?: 'light' | 'dark';
}

const DaVinciResolveIcon = () => (
  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#121318] border border-white/20 flex items-center justify-center shrink-0 pointer-events-none select-none">
    <SiDavinciresolve className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF453A]" />
  </div>
);

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

const LightroomIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 block select-none pointer-events-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#001D26" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#31A8FF" strokeOpacity="0.8" />
    <text x="16" y="21.5" textAnchor="middle" fill="#31A8FF" fontSize="14" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Lr</text>
  </svg>
);

const PhotoshopIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 block select-none pointer-events-none" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#001E36" />
    <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#31A8FF" strokeOpacity="0.8" />
    <text x="16" y="21.5" textAnchor="middle" fill="#31A8FF" fontSize="14" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Ps</text>
  </svg>
);

const RAW_TOOLS = [
  { name: 'DaVinci Resolve', icon: <DaVinciResolveIcon /> },
  { name: 'Adobe Premiere Pro', icon: <PremiereProIcon /> },
  { name: 'Adobe After Effects', icon: <AfterEffectsIcon /> },
  { name: 'CapCut', icon: <CapCutIcon /> },
  { name: 'Adobe Lightroom', icon: <LightroomIcon /> },
  { name: 'Adobe Photoshop', icon: <PhotoshopIcon /> },
];

interface ScatteredTool {
  name: string;
  icon: React.ReactNode;
  baseRotate: number;
  baseTranslateX: number;
  baseTranslateY: number;
  baseScale: number;
  parallaxMultiplier: number;
  tiltMultiplier: number;
}

// Generate randomized 'studio mess' scattering uniquely on every page reload
function generateRandomizedStudioMess(toolsList: typeof RAW_TOOLS): ScatteredTool[] {
  return toolsList.map((t, idx) => {
    const sign = idx % 2 === 0 ? 1 : -1;
    const randomInRange = (min: number, max: number) => min + Math.random() * (max - min);

    // Random rotation between -16° and +16°
    const baseRotate = Math.round(randomInRange(6, 16) * sign * (Math.random() > 0.35 ? 1 : -1));
    
    // Random vertical translation (-16px to +18px)
    const baseTranslateY = Math.round(randomInRange(-16, 18));
    
    // Random horizontal translation (-10px to +10px)
    const baseTranslateX = Math.round(randomInRange(-10, 10));
    
    // Subtle scale variation (0.96 to 1.10)
    const baseScale = Number(randomInRange(0.96, 1.10).toFixed(2));
    
    // Parallax depth responsiveness
    const depth = Number(randomInRange(0.8, 1.3).toFixed(2));
    const parallaxMultiplier = Math.round(randomInRange(10, 18) * depth);
    const tiltMultiplier = Number((randomInRange(12, 20) * depth).toFixed(1));

    return {
      name: t.name,
      icon: t.icon,
      baseRotate,
      baseTranslateX,
      baseTranslateY,
      baseScale,
      parallaxMultiplier,
      tiltMultiplier,
    };
  });
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>(theme || 'dark');
  const [hoveredTool, setHoveredTool] = React.useState<number | null>(null);

  // Randomized scatter configuration initialized uniquely per page reload
  const [scatteredTools] = React.useState<ScatteredTool[]>(() => generateRandomizedStudioMess(RAW_TOOLS));

  // Responsive mouse position tracking for realistic 3D tilt & parallax
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = React.useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    setMouseOffset({
      x: Math.max(-1.2, Math.min(1.2, normalizedX)),
      y: Math.max(-1.2, Math.min(1.2, normalizedY)),
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setMouseOffset({ x: 0, y: 0, active: false });
  };

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

            {/* 3D Scattered Responsive Tilt Icons (Studio Mess on Page Reload) */}
            <div
              ref={containerRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative flex flex-wrap items-center gap-6 sm:gap-8 pt-6 pb-8 sm:pt-8 sm:pb-10 px-1 select-none"
              style={{ perspective: 1000 }}
            >
              {scatteredTools.map((t, idx) => {
                const isHovered = hoveredTool === idx;

                // Responsive mouse tilt & parallax values
                const currentRotateZ = isHovered
                  ? 0
                  : t.baseRotate + (mouseOffset.active ? mouseOffset.x * 4 : 0);

                const currentTranslateX = isHovered
                  ? 0
                  : t.baseTranslateX + (mouseOffset.active ? mouseOffset.x * t.parallaxMultiplier : 0);

                const currentTranslateY = isHovered
                  ? -14
                  : t.baseTranslateY + (mouseOffset.active ? mouseOffset.y * t.parallaxMultiplier : 0);

                // 3D Tilt angles (pitch & yaw)
                const rotateX = isHovered ? 0 : (mouseOffset.active ? -mouseOffset.y * t.tiltMultiplier : 0);
                const rotateY = isHovered ? 0 : (mouseOffset.active ? mouseOffset.x * t.tiltMultiplier : 0);

                const currentScale = isHovered ? t.baseScale * 1.2 : t.baseScale;

                // Dynamic light / drop-shadow offset reacting to cursor position
                const shadowX = mouseOffset.active ? Math.round(-mouseOffset.x * 12) : 0;
                const shadowY = isHovered ? 26 : Math.round(16 - mouseOffset.y * 8);
                const shadowBlur = isHovered ? 32 : 22;
                const shadowOpacity1 = isHovered ? 0.65 : 0.42;
                const shadowOpacity2 = isHovered ? 0.35 : 0.22;

                return (
                  <TextReveal key={t.name} delay={0.24 + idx * 0.03} yOffset={12}>
                    <div
                      title={t.name}
                      aria-label={t.name}
                      onMouseEnter={() => setHoveredTool(idx)}
                      onMouseLeave={() => setHoveredTool(null)}
                      className="relative cursor-pointer"
                      style={{
                        zIndex: isHovered ? 40 : 10,
                        perspective: 800,
                      }}
                    >
                      <div
                        className="scatter-icon-raw transition-all duration-200 ease-out will-change-transform"
                        style={{
                          transform: `perspective(800px) translate3d(${currentTranslateX}px, ${currentTranslateY}px, ${isHovered ? 25 : 0}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${currentRotateZ}deg) scale(${currentScale})`,
                          transformStyle: 'preserve-3d',
                          filter: `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity1})) drop-shadow(${Math.round(shadowX * 0.5)}px ${Math.round(shadowY * 0.4)}px 8px rgba(0, 0, 0, ${shadowOpacity2}))`,
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
