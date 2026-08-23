import React, { useEffect, useState } from 'react';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { playSubtleClickSound } from '../utils/motion';
import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/portfolioData';
import { CustomYoutubePlayer } from './CustomYoutubePlayer';
import { BlurUpImage } from './BlurUpImage';

const isYoutubeUrl = (url: string) => {
  return url && (url.includes('youtube.com') || url.includes('youtu.be'));
};

const getYoutubeIdFromUrl = (url: string) => {
  if (!url) return '';
  let id = '';
  if (url.includes('shorts/')) {
    id = url.split('shorts/')[1]?.split('?')[0];
  } else if (url.includes('youtu.be/')) {
    id = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('v=')) {
    id = url.split('v=')[1]?.split('&')[0];
  } else if (url.includes('embed/')) {
    id = url.split('embed/')[1]?.split('?')[0];
  }
  return id;
};

interface WorkProjectCardProps {
  project: {
    id: string;
    title: string;
    category: string;
    tag?: string;
    filterCategory: string;
    type?: 'youtube' | 'video' | string;
    src?: string;
    videoUrl: string;
    externalUrl?: string;
    coverImage: string;
    uploadDate: string;
  };
  onSelect: () => void;
}

const WorkProjectCard: React.FC<WorkProjectCardProps> = ({ project, onSelect }) => {
  const rawVideoUrl = project.src || project.videoUrl;
  const isYt = isYoutubeUrl(rawVideoUrl);
  const ytId = isYt ? getYoutubeIdFromUrl(rawVideoUrl) : '';
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    }
  }, [rawVideoUrl]);

  const extUrl = project.externalUrl || (isYt ? (rawVideoUrl.includes('embed/') && ytId ? `https://www.youtube.com/watch?v=${ytId}` : rawVideoUrl) : rawVideoUrl.replace('/preview', '/view'));

  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer relative flex flex-col w-full"
    >
      <div className="video-card relative w-full rounded-[16px] overflow-hidden bg-black aspect-video border border-neutral-200/20 dark:border-white/[0.05] shadow-[0_8px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out group-hover:scale-[1.02]">
        {project.type === 'youtube' ? (
          <iframe
            src={rawVideoUrl}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover rounded-[inherit] pointer-events-none border-0"
            tabIndex={-1}
          />
        ) : isYt ? (
          <BlurUpImage
            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
            alt={project.title}
            className="w-full h-full"
            imgClassName="group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <video
            ref={videoRef}
            src={rawVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }}
            onCanPlay={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }}
            className="w-full h-full object-cover"
          />
        )}
        {/* External Link Icon Button */}
        <a
          href={extUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[12px] right-[12px] w-7 h-7 bg-black/60 dark:bg-black/80 backdrop-blur-[8px] border border-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-neutral-900 transition-all duration-200 z-[5] opacity-0 group-hover:opacity-100"
          title="Open Video in New Tab"
          onClick={(e) => {
            e.stopPropagation();
            playSubtleClickSound();
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* Details: Title & Category Badge Only */}
      <div className="mt-2.5 flex flex-col items-start text-left">
        <h3 className="text-[16px] font-semibold text-neutral-900 dark:text-white tracking-tight group-hover:text-[#0066FF] dark:group-hover:text-[#0A84FF] transition-colors leading-snug">
          {project.title}
        </h3>
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#0066FF] dark:text-[#0A84FF] mt-0.5 font-mono">
          {project.tag || project.category}
        </span>
      </div>
    </div>
  );
};

const ALL_WORK_PROJECTS: Array<WorkProjectCardProps['project']> = [
  {
    id: 'youtube-kbd',
    title: 'YouTube Commercial',
    category: 'Commercial',
    tag: 'COMMERCIAL',
    filterCategory: 'Commercials',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/kBDucd_m7wk?autoplay=1&mute=1&loop=1&playlist=kBDucd_m7wk&controls=0&modestbranding=1&rel=0&showinfo=0',
    videoUrl: 'https://www.youtube.com/embed/kBDucd_m7wk?autoplay=1&mute=1&loop=1&playlist=kBDucd_m7wk&controls=0&modestbranding=1&rel=0&showinfo=0',
    externalUrl: 'https://www.youtube.com/watch?v=kBDucd_m7wk',
    coverImage: 'https://img.youtube.com/vi/kBDucd_m7wk/maxresdefault.jpg',
    uploadDate: '2026-08-22'
  },
  {
    id: 'youtube-cinematic-uc8p',
    title: 'Cinematic & VFX Showcase',
    category: 'Cinematic / VFX',
    tag: 'CINEMATIC / VFX',
    filterCategory: 'Cinematic / VFX',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/uc8pp0fLgzs?autoplay=1&mute=1&loop=1&playlist=uc8pp0fLgzs&controls=0&modestbranding=1&rel=0&showinfo=0',
    videoUrl: 'https://www.youtube.com/embed/uc8pp0fLgzs?autoplay=1&mute=1&loop=1&playlist=uc8pp0fLgzs&controls=0&modestbranding=1&rel=0&showinfo=0',
    externalUrl: 'https://www.youtube.com/watch?v=uc8pp0fLgzs',
    coverImage: 'https://img.youtube.com/vi/uc8pp0fLgzs/maxresdefault.jpg',
    uploadDate: '2026-08-22'
  },
  {
    id: 'youtube-short-jDXv',
    title: 'Talking Head — Short',
    category: 'Talking Head',
    tag: 'TALKING HEAD',
    filterCategory: 'Talking Head',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/jDXv__tRgKM?autoplay=1&mute=1&loop=1&playlist=jDXv__tRgKM&controls=0&modestbranding=1&rel=0&showinfo=0',
    videoUrl: 'https://www.youtube.com/embed/jDXv__tRgKM?autoplay=1&mute=1&loop=1&playlist=jDXv__tRgKM&controls=0&modestbranding=1&rel=0&showinfo=0',
    externalUrl: 'https://www.youtube.com/shorts/jDXv__tRgKM',
    coverImage: 'https://img.youtube.com/vi/jDXv__tRgKM/hqdefault.jpg',
    uploadDate: '2026-08-22'
  },
  {
    id: 'youtube-short-4OIq',
    title: 'Talking Head — Short 2',
    category: 'Talking Head',
    tag: 'TALKING HEAD',
    filterCategory: 'Talking Head',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/4OIqTAAGvf8?autoplay=1&mute=1&loop=1&playlist=4OIqTAAGvf8&controls=0&modestbranding=1&rel=0&showinfo=0',
    videoUrl: 'https://www.youtube.com/embed/4OIqTAAGvf8?autoplay=1&mute=1&loop=1&playlist=4OIqTAAGvf8&controls=0&modestbranding=1&rel=0&showinfo=0',
    externalUrl: 'https://www.youtube.com/shorts/4OIqTAAGvf8',
    coverImage: 'https://img.youtube.com/vi/4OIqTAAGvf8/hqdefault.jpg',
    uploadDate: '2026-08-22'
  },
  {
    id: 'chatgpt-saas-promo',
    title: 'ChatGPT SaaS Promo',
    category: 'MOTION DESIGN',
    tag: 'MOTION DESIGN',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1787005445/Chat_GPT_xs95dd.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1787005445/Chat_GPT_xs95dd.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-18'
  },
  {
    id: 'whatsapp-promo',
    title: 'WhatsApp Promo',
    category: 'Motion Design',
    tag: 'MOTION DESIGN',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786896348/Whatsapp_Ad_zrk3yc.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786896348/Whatsapp_Ad_zrk3yc.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14'
  },
  {
    id: 'notchnook',
    title: 'music',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786054247/Music_jwuuat.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786054247/Music_jwuuat.mp4',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14'
  },
  {
    id: 'claude',
    title: 'work',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786053944/Time%20Ui.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786053944/Time%20Ui.mp4',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14'
  },
  {
    id: 'ikigai',
    title: 'Ikigai',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057552/ikigai_lxe9jo.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057552/ikigai_lxe9jo.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14'
  },
  {
    id: 'make-a-saas',
    title: 'Make a SAAS',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057626/Make_a_SAAS_s5kbel.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057626/Make_a_SAAS_s5kbel.mp4',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14'
  },
  {
    id: 'hi-motion',
    title: 'Hi',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057680/Hi_lsfoyf.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057680/Hi_lsfoyf.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14'
  },
  {
    id: 'valorant-whtamim',
    title: 'VALORANT x WHTAMIM',
    category: 'Motion Graphics',
    tag: 'MOTION GRAPHICS',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057656/VALORANT_x_WHTAMIM_fs0drm.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057656/VALORANT_x_WHTAMIM_fs0drm.mp4',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14'
  },
  {
    id: 'drive-motion',
    title: 'Drive',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    src: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057757/Drive_hkng6w.mp4',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057757/Drive_hkng6w.mp4',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14'
  }
];

const CATEGORY_SECTIONS = [
  {
    id: 'commercials',
    eyebrow: 'COMMERCIALS',
    title: 'Commercials',
    filterCategory: 'Commercials'
  },
  {
    id: 'motion-design',
    eyebrow: 'MOTION DESIGN',
    title: 'Motion design',
    filterCategory: 'SaaS & UI'
  },
  {
    id: 'talking-head',
    eyebrow: 'TALKING HEAD',
    title: 'Talking head videos',
    filterCategory: 'Talking Head'
  },
  {
    id: 'cinematic-vfx',
    eyebrow: 'CINEMATIC / VFX',
    title: 'Cinematic & VFX',
    filterCategory: 'Cinematic / VFX'
  }
];

interface WorkPageProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onBackToHome: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onSelectCaseStudy }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; src: string; externalUrl?: string } | null>(null);
  const filters = ['All', 'SaaS & UI', 'Commercials', 'Cinematic / VFX', 'Documentary', 'Talking Head'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard escape to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeVideoModal) {
        setActiveVideoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoModal]);

  return (
    <SectionReveal
      id="all-work"
      as="section"
      className="min-h-screen pt-[120px] pb-[120px] px-6 sm:px-12 md:px-16 lg:px-24 w-full bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-neutral-100 transition-colors duration-300"
      style={{ fontFamily: 'var(--apple-font, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header Section - Extremely Clean & Elegant */}
        <div className="text-left mb-12 sm:mb-16 page-header">
          <TextReveal as="span" delay={0.02} yOffset={10} className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#86868B] dark:text-[#86868B] block mb-2 font-mono">
            ALL WORK
          </TextReveal>
          <TextReveal as="h1" delay={0.05} yOffset={16} className="text-4xl sm:text-5xl md:text-[3.5rem] tracking-tight text-neutral-900 dark:text-white font-semibold leading-[1.1] mb-4">
            Everything I've made.
          </TextReveal>
          <TextReveal as="p" delay={0.1} yOffset={16} className="text-[15px] sm:text-[17px] text-[#86868B] dark:text-[#86868B] max-w-[500px] leading-relaxed font-normal">
            A collection of motion design and other projects I've worked on over the years.
          </TextReveal>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => {
                  playSubtleClickSound();
                  setActiveFilter(filter);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Modular Category Sections */}
        {CATEGORY_SECTIONS.filter(section => activeFilter === 'All' ? true : section.filterCategory === activeFilter).map((section) => {
          const sectionProjects = ALL_WORK_PROJECTS
            .filter(p => p.filterCategory === section.filterCategory)
            .filter(p => {
              if (activeFilter === 'All') {
                return (
                  p.tag !== 'TALKING HEAD' &&
                  p.id !== 'youtube-cinematic-uc8p' &&
                  p.filterCategory !== 'Talking Head' &&
                  p.filterCategory !== 'Commercials' &&
                  p.type !== 'youtube' &&
                  p.id !== 'youtube-kbd' &&
                  p.id !== 'youtube-short-jDXv' &&
                  p.id !== 'youtube-short-4OIq'
                );
              }
              return true;
            })
            .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
          if (sectionProjects.length === 0) return null;

          return (
            <div key={section.id} className="mb-20 sm:mb-28 first:mt-0">
              
              {/* Category Header */}
              <div className="text-left mb-8 sm:mb-12">
                <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868B] dark:text-[#86868B] block mb-1 font-mono">
                  {section.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] tracking-tight text-neutral-900 dark:text-white font-semibold leading-tight">
                  {section.title}
                </h2>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionProjects.map((project, idx) => (
                  <TextReveal key={project.id} delay={0.05 * idx} yOffset={15}>
                    <WorkProjectCard
                      project={project}
                      onSelect={() => {
                        playSubtleClickSound();
                        const matchingCaseStudy = CASE_STUDIES.find(c => c.id === project.id);
                        if (matchingCaseStudy) {
                          onSelectCaseStudy(matchingCaseStudy);
                        } else {
                          setActiveVideoModal({
                            title: project.title,
                            src: project.src || project.videoUrl,
                            externalUrl: project.externalUrl,
                          });
                        }
                      }}
                    />
                  </TextReveal>
                ))}
              </div>

            </div>
          );
        })}

        {/* Fullscreen Video Cinema Modal */}
        {activeVideoModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8 animate-fade-in"
            onClick={() => setActiveVideoModal(null)}
          >
            <div
              className="relative w-full max-w-5xl bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/60 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {activeVideoModal.title}
                </h3>
                <div className="flex items-center gap-3">
                  {activeVideoModal.externalUrl && (
                    <a
                      href={activeVideoModal.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                    >
                      <span>
                        {activeVideoModal.externalUrl.includes('drive.google.com')
                          ? 'Google Drive'
                          : isYoutubeUrl(activeVideoModal.externalUrl)
                          ? 'YouTube'
                          : 'Open Video'}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
                {isYoutubeUrl(activeVideoModal.src) ? (
                  <CustomYoutubePlayer
                    videoUrl={activeVideoModal.src}
                    autoplay
                  />
                ) : (
                  <video
                    src={activeVideoModal.src}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </SectionReveal>
  );
};

