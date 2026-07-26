import React, { useState, useRef, useEffect } from 'react';
import { CaseStudy } from '../types';
import { playSubtleClickSound } from '../utils/motion';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Layers,
  Cpu,
  CheckCircle2,
  Quote,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Sliders,
  Film
} from 'lucide-react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onSelectNext: (study: CaseStudy) => void;
  onOpenEstimator: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onSelectNext,
  onOpenEstimator,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'motion' | 'bts' | 'results'>('overview');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Scroll modal container to top when caseStudy changes
    const modalEl = document.getElementById('case-study-modal-scroll');
    if (modalEl) modalEl.scrollTop = 0;
  }, [caseStudy]);

  if (!caseStudy) return null;

  const togglePlay = () => {
    playSubtleClickSound();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    playSubtleClickSound();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#F5F5F7] animate-in fade-in duration-300">
      {/* Top Floating Bar */}
      <div className="sticky top-0 z-50 px-6 py-4 bg-[#F5F5F7]/90 backdrop-blur-xl border-b border-neutral-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-12px font-mono text-[#86868B] font-bold uppercase tracking-wider">
            CASE STUDY
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-14px font-bold text-[#1D1D1F]">{caseStudy.title}</span>
        </div>

        <button
          onClick={() => {
            playSubtleClickSound();
            onClose();
          }}
          data-cursor-text="CLOSE"
          className="p-2.5 rounded-full bg-neutral-200/60 hover:bg-neutral-300 text-[#1D1D1F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div id="case-study-modal-scroll" className="h-[calc(100vh-65px)] overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-10 sm:px-8">
          {/* Hero Header & Title */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[#1D1D1F] text-12px font-mono">
                {caseStudy.client}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[#86868B] text-12px font-mono font-semibold">
                {caseStudy.industry}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[#86868B] text-12px font-mono">
                {caseStudy.duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight leading-tight mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-18px sm:text-20px text-[#86868B] max-w-3xl leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </div>

          {/* Video Presentation Player */}
          <div className="relative aspect-video w-full rounded-[24px] overflow-hidden bg-black border border-neutral-200/80 shadow-2xl mb-12 group">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={caseStudy.posterImage}
              src={caseStudy.heroVideoUrl}
              className="w-full h-full object-cover"
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
              <div className="flex justify-end">
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-13px"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause Reel' : 'Play Reel'}</span>
                </button>

                <span className="text-12px font-mono text-neutral-300">
                  {caseStudy.year} • ProRes Master 4K
                </span>
              </div>
            </div>
          </div>

          {/* Two-Column Project Metadata & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 pb-12 border-b border-neutral-200/80">
            {/* Sidebar Specifications */}
            <div className="lg:col-span-4 flex flex-col gap-6 p-6 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs">
              <div>
                <span className="text-11px font-mono text-[#86868B] uppercase tracking-wider block mb-1">
                  Deliverables
                </span>
                <ul className="text-13px font-medium text-[#1D1D1F] space-y-1">
                  {caseStudy.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-11px font-mono text-[#86868B] uppercase tracking-wider block mb-1">
                  Tools & Software
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {caseStudy.tools.map((tool) => (
                    <span key={tool} className="text-11px font-mono px-2 py-0.5 rounded bg-[#F5F5F7] border border-neutral-200 text-[#1D1D1F]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-11px font-mono text-[#86868B] uppercase tracking-wider block mb-1">
                  Budget Investment Tier
                </span>
                <span className="text-14px font-bold text-[#007AFF] font-mono">
                  {caseStudy.budgetTier}
                </span>
              </div>
            </div>

            {/* Narrative Storytelling Body */}
            <div className="lg:col-span-8 flex flex-col gap-8 text-[#1D1D1F]">
              <div>
                <h3 className="text-20px font-bold text-[#1D1D1F] mb-3">Project Overview</h3>
                <p className="text-15px leading-relaxed text-[#86868B]">{caseStudy.overview}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs">
                  <h4 className="text-14px font-mono font-bold text-[#007AFF] uppercase tracking-wider mb-2">
                    The Challenge
                  </h4>
                  <p className="text-13px leading-relaxed text-[#86868B]">{caseStudy.challenge}</p>
                </div>
                <div className="p-5 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs">
                  <h4 className="text-14px font-mono font-bold text-[#1D1D1F] uppercase tracking-wider mb-2">
                    The Goal
                  </h4>
                  <p className="text-13px leading-relaxed text-[#86868B]">{caseStudy.goal}</p>
                </div>
              </div>

              <div>
                <h3 className="text-20px font-bold text-[#1D1D1F] mb-3">Creative & Motion Strategy</h3>
                <p className="text-15px leading-relaxed mb-4 text-[#86868B]">{caseStudy.strategy}</p>
                <p className="text-15px leading-relaxed text-[#86868B]">{caseStudy.storytellingApproach}</p>
              </div>
            </div>
          </div>

          {/* Motion Design Breakdown Section */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-11px font-mono uppercase tracking-widest text-[#007AFF] font-bold mb-4">
              <Layers className="w-4 h-4" />
              <span>MOTION DESIGN BREAKDOWN</span>
            </div>
            <h2 className="text-28px font-bold text-[#1D1D1F] mb-8">
              Mathematical Precision & After Effects Rigging
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudy.motionDesignBreakdown.map((item, idx) => (
                <div key={idx} className="p-6 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-18px font-bold text-[#1D1D1F] mb-2">{item.title}</h3>
                    <p className="text-14px text-[#86868B] mb-4">{item.description}</p>

                    <ul className="space-y-2 text-13px text-[#86868B] mb-6">
                      {item.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.easingCurve && (
                    <div className="pt-4 border-t border-neutral-100 font-mono text-11px text-[#007AFF] flex items-center justify-between">
                      <span>Bezier Easing:</span>
                      <span>{item.easingCurve}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Behind The Scenes & Styleframes */}
          {caseStudy.behindTheScenes && caseStudy.behindTheScenes.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-2 text-11px font-mono uppercase tracking-widest text-[#007AFF] font-bold mb-4">
                <Sliders className="w-4 h-4" />
                <span>BEHIND THE SCENES</span>
              </div>
              <h2 className="text-28px font-bold text-[#1D1D1F] mb-8">
                Styleframes & After Effects Compositions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {caseStudy.behindTheScenes.map((bts, bIdx) => (
                  <div key={bIdx} className="rounded-[20px] overflow-hidden bg-white border border-neutral-200/80 shadow-xs">
                    <img src={bts.imageUrl} alt={bts.title} className="w-full h-56 object-cover" />
                    <div className="p-5">
                      <h3 className="text-16px font-bold text-[#1D1D1F] mb-1">{bts.title}</h3>
                      <p className="text-13px text-[#86868B]">{bts.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Multi-Format Cuts Showcase */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-11px font-mono uppercase tracking-widest text-[#007AFF] font-bold mb-4">
              <Film className="w-4 h-4" />
              <span>MULTI-FORMAT DELIVERABLES</span>
            </div>
            <h2 className="text-28px font-bold text-[#1D1D1F] mb-8">
              Multi-Format Cuts for Web, Socials & Mobile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {caseStudy.multiFormatCuts.map((cut, cIdx) => (
                <div key={cIdx} className="p-4 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs flex flex-col items-center">
                  <div className={`w-full ${cut.aspectRatioClass} rounded-xl overflow-hidden bg-black mb-3`}>
                    <video autoPlay loop muted playsInline src={cut.videoUrl} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-13px font-bold text-[#1D1D1F] text-center">{cut.title}</span>
                  <span className="text-11px font-mono text-[#86868B] uppercase">{cut.format} Aspect Ratio</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results & Key Metrics */}
          <div className="mb-16 p-8 rounded-[24px] bg-white border border-neutral-200/80 shadow-md">
            <h3 className="text-12px font-mono text-[#007AFF] uppercase tracking-widest font-bold mb-6">
              MEASURABLE RESULTS & IMPACT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              {caseStudy.results.map((res, rIdx) => (
                <div key={rIdx} className="flex flex-col">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#1D1D1F] font-mono tracking-tight">
                    {res.metric}
                  </span>
                  <span className="text-13px text-[#86868B] mt-1">{res.label}</span>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            {caseStudy.testimonial && (
              <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-start gap-4">
                <Quote className="w-8 h-8 text-[#007AFF] shrink-0" />
                <div>
                  <p className="text-16px italic text-[#1D1D1F] mb-4 leading-relaxed">
                    "{caseStudy.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    {caseStudy.testimonial.avatarUrl && (
                      <img
                        src={caseStudy.testimonial.avatarUrl}
                        alt={caseStudy.testimonial.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h4 className="text-14px font-bold text-[#1D1D1F]">{caseStudy.testimonial.author}</h4>
                      <p className="text-12px text-[#86868B] font-mono">
                        {caseStudy.testimonial.title}, {caseStudy.testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action CTA & Navigation */}
          <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => {
                playSubtleClickSound();
                onClose();
                onOpenEstimator();
              }}
              data-cursor-text="START"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1D1D1F] text-white font-semibold text-15px hover:bg-[#007AFF] transition-all shadow-md"
            >
              Start Similar Project with whtamim →
            </button>

            <button
              onClick={() => {
                playSubtleClickSound();
                onClose();
              }}
              className="text-14px font-mono text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            >
              ← Back to All Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
