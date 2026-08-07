import React, { useEffect, useState } from 'react';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { playSubtleClickSound } from '../utils/motion';
import { CaseStudy } from '../types';
import { CustomYoutubePlayer } from './CustomYoutubePlayer';

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
  const ytId = getYoutubeIdFromUrl(project.videoUrl);
  const isYt = isYoutubeUrl(project.videoUrl) && ytId;

  return (
    <div
      className="group relative flex flex-col w-full transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* External Link Icon Button (Subtle & neat, only fully visible on hover) */}
      <a
        href={project.videoUrl.replace('/preview', '/view')}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-[14px] right-[14px] w-8 h-8 bg-black/60 dark:bg-black/80 backdrop-blur-[8px] border border-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-neutral-900 transition-all duration-200 z-[5] opacity-0 group-hover:opacity-100"
        title="Open Video in New Tab"
        onClick={(e) => {
          e.stopPropagation();
          playSubtleClickSound();
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>

      {/* 16:9 Aspect Ratio Video Container - Always Playing Loop */}
      <div 
        onClick={onSelect}
        className="cursor-pointer relative w-full aspect-video rounded-[18px] sm:rounded-[22px] overflow-hidden bg-neutral-950 border border-neutral-200/20 dark:border-white/[0.03] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
      >
        <video
          src={project.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>


    </div>
  );
};

const ALL_WORK_PROJECTS = [
  {
    id: 'weather',
    title: 'discord',
    category: 'UI animation',
    filterCategory: 'SaaS & UI',
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786054315/ZH_Motion_Dc_yuse2e.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
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
    videoUrl: 'https://res.cloudinary.com/grjdsu5n/video/upload/v1786057552/ikigai_lxe9jo.mp4',
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
  },
  {
    id: 'pran-ghee',
    title: 'PRAN Ghee Commercial',
    category: 'Brand Commercial',
    filterCategory: 'Commercials',
    videoUrl: 'https://drive.google.com/file/d/1GxmwawkAImn8PdFGAsZBqu6wrhVmjtH8/preview',
    coverImage: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'strait-of-hormuz',
    title: 'Strait of Hormuz',
    category: 'Documentary',
    filterCategory: 'Documentary',
    videoUrl: 'https://drive.google.com/file/d/1uM-ZYypGRBRId2lNUFFjYFxBSxMGIP2q/preview',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bmw-drifting',
    title: 'BMW E36 M4 Drifting Edit',
    category: 'Cinematic VFX',
    filterCategory: 'Cinematic / VFX',
    videoUrl: 'https://drive.google.com/file/d/1e4peHebyXa8ff7YkXCZBHKWvKOMNDp_n/preview',
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'valorant-edit',
    title: 'VALORANT x WHTAMIM',
    category: 'Motion Graphics',
    filterCategory: 'Cinematic / VFX',
    videoUrl: 'https://drive.google.com/file/d/19M1_bhdmpDTq5z8bG8DEBWUlv-LRu_Ev/preview',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
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
    id: 'commercials',
    eyebrow: 'COMMERCIALS',
    title: 'Commercial videos',
    filterCategory: 'Commercials'
  },
  {
    id: 'cinematic-vfx',
    eyebrow: 'CINEMATIC & VFX',
    title: 'Cinematic & VFX',
    filterCategory: 'Cinematic / VFX'
  },
  {
    id: 'documentary',
    eyebrow: 'DOCUMENTARY',
    title: 'Documentaries',
    filterCategory: 'Documentary'
  }
];

interface WorkPageProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onBackToHome: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');
  const [activeVideoCategory, setActiveVideoCategory] = useState<string>('');

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
        <div className="text-left mb-16 sm:mb-24 page-header">
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

        {/* Modular Category Sections */}
        {CATEGORY_SECTIONS.map((section, sIdx) => {
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

              {/* Minimal Apple Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {sectionProjects.map((project, idx) => (
                  <TextReveal key={project.id} delay={0.05 * idx} yOffset={15}>
                    <WorkProjectCard
                      project={project}
                      onSelect={() => {
                        playSubtleClickSound();
                        setActiveVideoUrl(project.videoUrl);
                        setActiveVideoTitle(project.title);
                        setActiveVideoCategory(project.category);
                      }}
                    />
                  </TextReveal>
                ))}
              </div>

            </div>
          );
        })}

      </div>

      {/* Modern 50% Full-Screen Cinema Pop-up Player Modal */}
      {activeVideoUrl !== null && (
        <div 
          className="fixed inset-0 z-[10000] bg-[#0d0d0f]/70 backdrop-blur-[8px] flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 select-none transition-all duration-300"
          onClick={() => setActiveVideoUrl(null)}
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          {/* Close button top right */}
          <button
            onClick={() => setActiveVideoUrl(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer z-50 focus:outline-none"
            aria-label="Close player"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Centered Modal Content Panel - 50% Screen Area */}
          <div 
            className="relative w-[90vw] max-w-[960px] aspect-video bg-black rounded-[16px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideoUrl || ''}
              autoPlay
              loop
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Underneath the video details */}
          <div className="text-center mt-6 select-none" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold tracking-tight m-0">
              {activeVideoTitle}
            </h2>
            <p className="text-neutral-400 text-[13px] sm:text-sm font-medium tracking-wide mt-1 uppercase font-mono">
              {activeVideoCategory}
            </p>
          </div>
        </div>
      )}
    </SectionReveal>
  );
};

