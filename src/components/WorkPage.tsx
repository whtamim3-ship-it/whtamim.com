import React, { useState, useRef, useEffect } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { playSubtleClickSound } from '../utils/motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { ParallaxLayer } from '../utils/parallaxEngine';

interface WorkPageProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onBackToHome: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onSelectCaseStudy,
  onBackToHome,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <SectionReveal as="div" className="min-h-screen pt-28 pb-24 w-full bg-[#F5F5F7] dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Back to Home button */}
      <TextReveal delay={0} yOffset={16} className="mb-8">
        <button
          onClick={() => {
            playSubtleClickSound();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 text-13px font-mono text-[#86868B] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors py-1.5 px-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </TextReveal>

      {/* Header */}
      <div className="mb-16 border-b border-neutral-200/80 dark:border-neutral-800 pb-12">
        <TextReveal as="span" delay={0.05} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block mb-3">
          ALL WORK
        </TextReveal>
        <TextReveal as="h1" delay={0.1} yOffset={20} className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] mb-4">
          Everything I've Made.
        </TextReveal>
        <TextReveal as="p" delay={0.15} yOffset={20} className="text-16px sm:text-18px text-[#86868B] dark:text-[#98989D] max-w-2xl leading-relaxed">
          A comprehensive archive of product launch films, UI motion animations, 3D visualizations, and commercial case studies built for technology brands worldwide.
        </TextReveal>
      </div>

      {/* 3-Column Responsive Grid - Displays all projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CASE_STUDIES.map((project, idx) => {
          const cardSpeeds = [-0.03, -0.045, -0.035];
          return (
            <ParallaxLayer key={project.id} speed={cardSpeeds[idx % cardSpeeds.length]} maxOffset={12}>
              <TextReveal delay={0.06 * idx} yOffset={20}>
                <WorkProjectCard
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

interface WorkProjectCardProps {
  project: CaseStudy;
  onSelect: () => void;
}

const WorkProjectCard: React.FC<WorkProjectCardProps> = ({ project, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="VIEW"
      className="group cursor-pointer relative rounded-[20px] overflow-hidden bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Thumbnail / Video Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <img
          src={project.posterImage}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105 opacity-40' : 'scale-100 opacity-95'
          }`}
        />

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={project.posterImage}
          src={project.heroVideoUrl}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100 scale-102' : 'opacity-0 scale-100'
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md text-11px font-mono">
            {project.duration}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md text-11px font-mono">
            {project.year}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-[#222228] text-[#1D1D1F] dark:text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#1D1D1F] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#0A0A0C] transition-all">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Details */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-11px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] font-semibold block mb-1">
            {project.services[0] || project.industry}
          </span>
          <h3 className="text-18px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2 group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-13px text-[#86868B] dark:text-[#98989D] line-clamp-2 leading-relaxed">
            {project.logline}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2 flex-wrap text-11px font-mono text-[#86868B] dark:text-[#98989D]">
          <span className="truncate max-w-[60%]">Client: {project.client}</span>
          <span className="text-[#007AFF] dark:text-[#0A84FF] font-medium shrink-0">{project.industry}</span>
        </div>
      </div>
    </div>
  );
};
