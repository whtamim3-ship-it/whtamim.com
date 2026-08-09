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

        {/* Clean 3-column Equal Grid */}
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
      </div>
    </SectionReveal>
  );
};

interface FeaturedProjectCardProps {
  project: CaseStudy;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project }) => {
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
      {/* 16:9 Video Container */}
      <div 
        className="relative aspect-video w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-neutral-950 border border-neutral-200/20 dark:border-white/[0.05] shadow-[0_8px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]"
      >
        <video
          src={project.heroVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
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

