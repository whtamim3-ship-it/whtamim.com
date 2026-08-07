import React, { useState, useRef, useEffect } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { playSubtleClickSound } from '../utils/motion';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';
import { CustomYoutubePlayer } from './CustomYoutubePlayer';

const getYoutubeId = (url: string) => {
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

interface FeaturedWorkProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onNavigateToWork: () => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  onNavigateToWork,
}) => {
  // Showcase exactly 3 selected projects for the clean 3-column grid
  const featuredProjects = CASE_STUDIES.slice(0, 3);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  // Keyboard navigation for cinema modal
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveModalIndex((prev) => (prev !== null ? (prev + 1) % featuredProjects.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActiveModalIndex((prev) => (prev !== null ? (prev - 1 + featuredProjects.length) % featuredProjects.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, featuredProjects.length]);

  return (
    <SectionReveal id="work" className="min-h-[100svh] md:min-h-[100dvh] w-full flex flex-col justify-center items-center py-16 sm:py-20 bg-[#F5F5F7] dark:bg-transparent">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 my-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-10 sm:mb-12">
          <TextReveal as="span" delay={0} yOffset={16} className="text-11px sm:text-12px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block">
            SELECTED WORK
          </TextReveal>
          <TextReveal delay={0.1} yOffset={16}>
            <button
              onClick={() => {
                playSubtleClickSound();
                onNavigateToWork();
              }}
              className="group inline-flex items-center gap-2 text-13px sm:text-14px font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#007AFF] dark:hover:text-[#0A84FF] transition-colors py-1.5 px-3.5 sm:py-2 sm:px-4 rounded-full hover:bg-white/60 dark:hover:bg-white/10 cursor-pointer"
            >
              <span>View All Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </TextReveal>
        </div>

        {/* Clean 3-column Equal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px] items-start">
          {featuredProjects.map((project, idx) => {
            const cardSpeeds = [-0.02, -0.03, -0.02];
            return (
              <ParallaxLayer key={project.id} speed={cardSpeeds[idx % cardSpeeds.length]} maxOffset={10}>
                <TextReveal delay={0.08 * idx} yOffset={20}>
                  <FeaturedProjectCard
                    project={project}
                    onSelect={() => {
                      playSubtleClickSound();
                      setActiveModalIndex(idx);
                    }}
                  />
                </TextReveal>
              </ParallaxLayer>
            );
          })}
        </div>
      </div>

      {/* Modern 50% Full-Screen Cinema Pop-up Player Modal */}
      {activeModalIndex !== null && (
        <div 
          className="fixed inset-0 z-[10000] bg-[#0d0d0f]/70 backdrop-blur-[8px] flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 select-none transition-all duration-300"
          onClick={() => setActiveModalIndex(null)}
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          {/* Close button top right */}
          <button
            onClick={() => setActiveModalIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer z-50 focus:outline-none"
            aria-label="Close player"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSubtleClickSound();
              setActiveModalIndex((activeModalIndex - 1 + featuredProjects.length) % featuredProjects.length);
            }}
            className="absolute left-4 sm:left-6 md:left-10 p-3 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition-all cursor-pointer z-50 focus:outline-none"
            aria-label="Previous project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSubtleClickSound();
              setActiveModalIndex((activeModalIndex + 1) % featuredProjects.length);
            }}
            className="absolute right-4 sm:right-6 md:right-10 p-3 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition-all cursor-pointer z-50 focus:outline-none"
            aria-label="Next project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Centered Modal Content Panel - 50% Screen Area */}
          <div 
            className="relative w-[90vw] max-w-[960px] aspect-video bg-black rounded-[16px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={featuredProjects[activeModalIndex].heroVideoUrl}
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
              {featuredProjects[activeModalIndex].title}
            </h2>
            <p className="text-neutral-400 text-[13px] sm:text-sm font-medium tracking-wide mt-1 uppercase">
              {featuredProjects[activeModalIndex].services[0] || featuredProjects[activeModalIndex].industry}
            </p>
          </div>
        </div>
      )}
    </SectionReveal>
  );
};

interface FeaturedProjectCardProps {
  project: CaseStudy;
  onSelect: () => void;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer relative bg-transparent transition-all duration-300 flex flex-col"
    >
      {/* 16:9 Video Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-neutral-950 border border-neutral-200/20 dark:border-white/[0.05] shadow-[0_10px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
        <video
          src={project.heroVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details on separate lines below each video box */}
      <div className="mt-4 flex flex-col items-start text-left">
        <h3 className="text-17px sm:text-18px font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors">
          {project.title}
        </h3>
        <span className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] mt-1 font-semibold">
          {project.services[0] || project.industry}
        </span>
        <p className="text-14px text-[#6E6E73] dark:text-[#8E8E93] mt-1.5 line-clamp-2 leading-relaxed">
          {project.logline || project.subtitle}
        </p>
      </div>
    </div>
  );
};

