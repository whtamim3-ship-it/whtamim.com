import React, { useEffect, useState } from 'react';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { playSubtleClickSound } from '../utils/motion';
import { CaseStudy } from '../types';
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
    filterCategory: string;
    videoUrl: string;
    coverImage: string;
  };
  onSelect: () => void;
}

const WorkProjectCard: React.FC<WorkProjectCardProps> = ({ project, onSelect }) => {
  const isYt = isYoutubeUrl(project.videoUrl);
  const ytId = isYt ? getYoutubeIdFromUrl(project.videoUrl) : '';
  const isCommercial = project.filterCategory === 'Commercials';

  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer relative flex flex-col w-full"
    >
      <div className="video-card relative w-full rounded-[16px] overflow-hidden bg-black aspect-video border border-neutral-200/20 dark:border-white/[0.05] shadow-[0_8px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out group-hover:scale-[1.02]">
        {isYt ? (
          <BlurUpImage
            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
            alt={project.title}
            className="w-full h-full"
            imgClassName="group-hover:scale-105 transition-transform duration-500"
          />
        ) : isCommercial ? (
          <BlurUpImage
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full"
            imgClassName="group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <video
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        {/* External Link Icon Button */}
        <a
          href={isYt ? project.videoUrl : project.videoUrl.replace('/preview', '/view')}
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
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#0066FF] dark:text-[#0A84FF] mt-0.5">
          {project.category}
        </span>
      </div>
    </div>
  );
};

const ALL_WORK_PROJECTS = [
  {
    id: 'notchnook',
    title: 'music',
    category: 'UI animation',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786054247/Music_jwuuat.mp4',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'claude',
    title: 'work',
    category: 'UI animation',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786053944/Time%20Ui.mp4',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ikigai',
    title: 'Ikigai',
    category: 'UI animation',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786896348/Whatsapp_Ad_zrk3yc.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'make-a-saas',
    title: 'Make a SAAS',
    category: 'UI animation',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057626/Make_a_SAAS_s5kbel.mp4',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'hi-motion',
    title: 'Hi',
    category: 'UI animation',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057680/Hi_lsfoyf.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'valorant-whtamim',
    title: 'VALORANT x WHTAMIM',
    category: 'Motion Graphics',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057656/VALORANT_x_WHTAMIM_fs0drm.mp4',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'drive-motion',
    title: 'Drive',
    category: 'UI animation',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057757/Drive_hkng6w.mp4',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
  }
];

const CATEGORY_SECTIONS = [
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
  }
];

interface WorkPageProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onBackToHome: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filters = ['All', 'SaaS & UI', 'Commercials', 'Cinematic / VFX', 'Documentary', 'Talking Head'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
        {CATEGORY_SECTIONS.filter(section => activeFilter === 'All' || section.filterCategory === activeFilter).map((section) => {
          const sectionProjects = ALL_WORK_PROJECTS.filter(p => p.filterCategory === section.filterCategory);
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
                        if ((window as any).openVideoLightbox) {
                          (window as any).openVideoLightbox(project.videoUrl);
                        }
                      }}
                    />
                  </TextReveal>
                ))}
              </div>

            </div>
          );
        })}

      </div>
    </SectionReveal>
  );
};

