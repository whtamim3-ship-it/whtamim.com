import React, { useState, useRef, useEffect } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { playSubtleClickSound } from '../utils/motion';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';
import { FeaturedWorkSkeleton, FeaturedCardSkeleton } from './FeaturedWorkSkeleton';

export { FeaturedWorkSkeleton, FeaturedCardSkeleton };

interface FeaturedWorkProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onNavigateToWork: () => void;
  onOpenEstimator?: () => void;
  isLoading?: boolean;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  onNavigateToWork,
  isLoading = false,
}) => {
  // Showcase exactly 3 selected projects for the clean 3-column grid
  const featuredProjects = CASE_STUDIES.slice(0, 3);

  return (
    <SectionReveal id="work" className="min-h-[100svh] md:min-h-[100dvh] w-full flex flex-col justify-center items-center py-12 sm:py-16 bg-[#F5F5F7] dark:bg-transparent">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 my-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
          <TextReveal as="span" delay={0} yOffset={16} className="text-11px sm:text-12px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block">
            SELECTED WORK
          </TextReveal>
          <TextReveal delay={0.1} yOffset={16}>
            <button
              onClick={() => {
                playSubtleClickSound();
                onNavigateToWork();
              }}
              className="group inline-flex items-center gap-2 text-13px sm:text-14px font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#0066FF] dark:hover:text-[#0A84FF] transition-colors py-1.5 px-3.5 sm:py-2 sm:px-4 rounded-full hover:bg-white/60 dark:hover:bg-white/10 cursor-pointer"
            >
              <span>View All Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </TextReveal>
        </div>

        {/* Clean 3-column Equal Grid with Skeleton Fallback */}
        {isLoading ? (
          <FeaturedWorkSkeleton count={3} />
        ) : (
          <div className="selected-work-grid portfolio-grid grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
            {featuredProjects.map((project, idx) => {
              const cardSpeeds = [-0.02, -0.03, -0.02];
              return (
                <ParallaxLayer key={project.id} speed={cardSpeeds[idx % cardSpeeds.length]} maxOffset={10}>
                  <TextReveal delay={0.08 * idx} yOffset={20}>
                    <FeaturedProjectCard
                      project={project}
                    />
                  </TextReveal>
                </ParallaxLayer>
              );
            })}
          </div>
        )}
      </div>
    </SectionReveal>
  );
};

interface FeaturedProjectCardProps {
  project: CaseStudy;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project }) => {
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
      if (videoRef.current.readyState >= 2) {
        setIsMediaLoaded(true);
      }
    }
  }, [project.heroVideoUrl]);

  return (
    <div
      onClick={() => {
        playSubtleClickSound();
        if ((window as any).openVideoLightbox) {
          (window as any).openVideoLightbox(project.heroVideoUrl);
        }
      }}
      className="group cursor-pointer relative bg-transparent transition-all duration-300 flex flex-col"
    >
      {/* 16:9 Media Container (Strict Fixed Aspect Ratio prevents Layout Shifts) */}
      <div 
        className="relative aspect-video w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-neutral-200/90 dark:bg-neutral-950 border border-neutral-200/40 dark:border-white/[0.05] shadow-[0_8px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]"
      >
        {/* Skeleton Shimmer Placeholder Layer (visible until media is ready) */}
        {!isMediaLoaded && (
          <div className="absolute inset-0 bg-neutral-200/80 dark:bg-neutral-900 z-10 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[skeletonShimmer_1.8s_infinite_ease-in-out] bg-gradient-to-r from-transparent via-white/40 dark:via-white/[0.08] to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-10 pointer-events-none">
              <svg className="w-8 h-8 text-neutral-500 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Video Layer with autoPlay, loop, muted, playsInline & no poster or controls */}
        <video
          ref={videoRef}
          src={project.heroVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsMediaLoaded(true)}
          onCanPlay={() => setIsMediaLoaded(true)}
          onPlay={() => setIsMediaLoaded(true)}
          onPlaying={() => setIsMediaLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isMediaLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Details: Title & Category Badge Only */}
      <div className="mt-2.5 flex flex-col items-start text-left">
        <h3 className="text-[16px] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight group-hover:text-[#0066FF] dark:group-hover:text-[#0A84FF] transition-colors leading-snug">
          {project.title}
        </h3>
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#0066FF] dark:text-[#0A84FF] mt-0.5">
          {project.services[0] || project.industry}
        </span>
      </div>
    </div>
  );
};

