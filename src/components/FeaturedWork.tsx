import React, { useState, useRef, useEffect } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { calculateTilt, playSubtleClickSound } from '../utils/motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';

interface FeaturedWorkProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onNavigateToWork: () => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  onSelectCaseStudy,
  onNavigateToWork,
}) => {
  // Showcase ONLY 3 selected projects for the Home Page
  const featuredProjects = CASE_STUDIES.slice(0, 3);

  return (
    <SectionReveal id="work" className="py-24 w-full bg-[#F5F5F7] dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
        <TextReveal as="span" delay={0} yOffset={16} className="text-11px sm:text-12px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block">
          FEATURED WORK
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

      {/* Editorial Grid Layout - 3 Selected Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProjects.map((project, idx) => {
          const cardSpeeds = [-0.03, -0.05, -0.04];
          return (
            <ParallaxLayer key={project.id} speed={cardSpeeds[idx % cardSpeeds.length]} maxOffset={14}>
              <TextReveal delay={0.08 * idx} yOffset={24}>
                <FeaturedProjectCard
                  project={project}
                  onSelect={() => {
                    playSubtleClickSound();
                    onSelectCaseStudy(project);
                  }}
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
  onSelect: () => void;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glossX: 50, glossY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay video when visible in viewport via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(video);

    return () => {
      if (video) {
        observer.unobserve(video);
        video.pause();
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const tiltValues = calculateTilt(e, 3);
    setTilt(tiltValues);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glossX: 50, glossY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="VIEW"
      className="group cursor-pointer relative rounded-[24px] overflow-hidden bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:shadow-2xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
    >
      {/* Gloss Reflection Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${tilt.glossX}% ${tilt.glossY}%, rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />

      {/* Video / Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <img
          src={project.posterImage}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-105 opacity-40' : 'scale-100 opacity-90'
          }`}
        />

        {/* Video with Viewport Autoplay */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.posterImage}
          src={project.heroVideoUrl}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 sm:gap-2">
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-[10px] sm:text-11px font-mono tracking-wider">
            {project.duration}
          </span>
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/20 text-white backdrop-blur-md text-[10px] sm:text-11px font-mono">
            {project.year}
          </span>
        </div>

        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-[#222228] text-[#1D1D1F] dark:text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1D1D1F] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#0A0A0C] transition-all">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-7 flex flex-col justify-between flex-grow">
        <div>
          {/* Category */}
          <span className="text-11px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] font-semibold block mb-2">
            {project.services[0] || project.industry}
          </span>

          {/* Project Title */}
          <h3 className="text-18px sm:text-22px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2 group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Short One-Line Description */}
          <p className="text-13px sm:text-14px text-[#86868B] dark:text-[#98989D] line-clamp-2 leading-relaxed mb-4">
            {project.logline}
          </p>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2 flex-wrap text-11px font-mono text-[#86868B] dark:text-[#98989D]">
          <span className="truncate max-w-[60%]">Client: {project.client}</span>
          <span className="text-[#007AFF] font-medium shrink-0">{project.industry}</span>
        </div>
      </div>
    </div>
  );
};
