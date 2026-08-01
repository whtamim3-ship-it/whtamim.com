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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'motion' | 'bts' | 'results'>('overview');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Scroll modal container to top when caseStudy changes
    const modalEl = document.getElementById('case-study-modal-scroll');
    if (modalEl) modalEl.scrollTop = 0;
    setHasError(false);
  }, [caseStudy]);

  // Keyboard controls listener
  useEffect(() => {
    if (!caseStudy) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [caseStudy, isPlaying, isMuted]);

  if (!caseStudy) return null;

  const togglePlay = () => {
    playSubtleClickSound();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '00:00';
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#F5F5F7] dark:bg-[#0A0A0C] text-[#1D1D1F] dark:text-[#F5F5F7] animate-in fade-in duration-300">
      {/* Top Floating Bar */}
      <div className="sticky top-0 z-50 px-6 py-4 bg-[#F5F5F7]/90 dark:bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-12px font-mono text-[#86868B] dark:text-[#98989D] font-bold uppercase tracking-wider">
            CASE STUDY
          </span>
          <span className="text-neutral-400 dark:text-neutral-600">•</span>
          <span className="text-14px font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{caseStudy.title}</span>
        </div>

        <button
          onClick={() => {
            playSubtleClickSound();
            onClose();
          }}
          data-cursor-text="CLOSE"
          className="p-2.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors"
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
              <span className="px-3 py-1 rounded-full bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 text-[#1D1D1F] dark:text-[#F5F5F7] text-12px font-mono">
                {caseStudy.client}
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 text-[#86868B] dark:text-[#98989D] text-12px font-mono font-semibold">
                {caseStudy.industry}
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 text-[#86868B] dark:text-[#98989D] text-12px font-mono">
                {caseStudy.duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-tight mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-18px sm:text-20px text-[#86868B] dark:text-[#98989D] max-w-3xl leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </div>

          {/* Video Presentation Player */}
          <div className="relative aspect-video w-full rounded-[24px] overflow-hidden bg-black border border-neutral-200/80 dark:border-neutral-800 shadow-2xl mb-12 group">
            {hasError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-400">
                <p className="text-14px font-mono mb-2">Video playback failed</p>
                <button
                  onClick={() => {
                    setHasError(false);
                    if (videoRef.current) videoRef.current.load();
                  }}
                  className="px-4 py-2 rounded-full bg-neutral-800 text-white text-12px font-mono hover:bg-neutral-700 cursor-pointer"
                >
                  Retry Video
                </button>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                poster={caseStudy.posterImage}
                src={caseStudy.heroVideoUrl}
                onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                onWaiting={() => setIsBuffering(true)}
                onCanPlay={() => setIsBuffering(false)}
                onError={() => setHasError(true)}
                className="w-full h-full object-cover"
              />
            )}

            {/* Buffering Indicator */}
            {isBuffering && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none z-10">
                <span className="text-white text-12px font-mono">Buffering...</span>
              </div>
            )}

            {/* Center Interactive Play Overlay Button - Apple Native Media Control */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-transparent cursor-pointer group/btn focus:outline-none z-10"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/20 bg-white/[0.12] backdrop-blur-[24px] backdrop-saturate-[180%] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.25)] text-white/90 opacity-0 scale-[0.96] pointer-events-none group-hover:opacity-40 group-hover:scale-100 group-hover:pointer-events-auto hover:!opacity-70 hover:!bg-white/[0.22] hover:!backdrop-blur-[28px] hover:!scale-[1.03] active:!scale-[0.97] transition-all duration-[220ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:duration-[150ms] active:duration-[100ms] will-change-transform">
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white opacity-90 stroke-[1.75]" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5 text-white opacity-90 stroke-[1.75]" />
                )}
              </div>
            </button>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] p-4 sm:p-6 flex flex-col justify-between z-20 pointer-events-none">
              <div className="flex justify-end pointer-events-auto">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="p-2.5 rounded-full border border-white/20 bg-white/[0.12] backdrop-blur-[24px] backdrop-saturate-[180%] text-white hover:bg-white/[0.22] transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_24px_rgba(0,0,0,0.25)] active:scale-95"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-white/90" /> : <Volume2 className="w-4 h-4 text-white/90" />}
                </button>
              </div>

              {/* Bottom Clean Horizontal Controls Overlay */}
              <div className="w-full pt-6 pb-1 px-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col gap-3 pointer-events-auto rounded-b-[24px]">
                {/* Single Horizontal Timeline Seek Bar */}
                <div className="flex items-center gap-3">
                  <span className="text-11px font-mono text-white/90 font-medium tracking-tight min-w-[36px] select-none">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="apple-range-slider flex-1 cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgba(255, 255, 255, 0.95) ${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%, rgba(255, 255, 255, 0.22) ${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%)`,
                    }}
                  />
                  <span className="text-11px font-mono text-white/70 font-medium tracking-tight min-w-[36px] select-none text-right">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Sub Controls Row */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium text-12px transition-all cursor-pointer backdrop-blur-md active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <span className="text-11px font-mono text-white/80 select-none">
                    {caseStudy.year} • Master 1080p
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Project Metadata & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 pb-12 border-b border-neutral-200/80 dark:border-neutral-800">
            {/* Sidebar Specifications */}
            <div className="lg:col-span-4 flex flex-col gap-6 p-6 rounded-[20px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <div>
                <span className="text-11px font-mono text-[#86868B] dark:text-[#98989D] uppercase tracking-wider block mb-1">
                  Deliverables
                </span>
                <ul className="text-13px font-medium text-[#1D1D1F] dark:text-[#F5F5F7] space-y-1">
                  {caseStudy.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] dark:bg-[#0A84FF]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-11px font-mono text-[#86868B] dark:text-[#98989D] uppercase tracking-wider block mb-1">
                  Tools & Software
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {caseStudy.tools.map((tool) => (
                    <span key={tool} className="text-11px font-mono px-2 py-0.5 rounded bg-[#F5F5F7] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-11px font-mono text-[#86868B] dark:text-[#98989D] uppercase tracking-wider block mb-1">
                  Budget Investment Tier
                </span>
                <span className="text-14px font-bold text-[#007AFF] dark:text-[#0A84FF] font-mono">
                  {caseStudy.budgetTier}
                </span>
              </div>
            </div>

            {/* Narrative Storytelling Body */}
            <div className="lg:col-span-8 flex flex-col gap-8 text-[#1D1D1F] dark:text-[#F5F5F7]">
              <div>
                <h3 className="text-20px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">Project Overview</h3>
                <p className="text-15px leading-relaxed text-[#86868B] dark:text-[#98989D]">{caseStudy.overview}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-[20px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                  <h4 className="text-14px font-mono font-bold text-[#007AFF] dark:text-[#0A84FF] uppercase tracking-wider mb-2">
                    The Challenge
                  </h4>
                  <p className="text-13px leading-relaxed text-[#86868B] dark:text-[#98989D]">{caseStudy.challenge}</p>
                </div>
                <div className="p-5 rounded-[20px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                  <h4 className="text-14px font-mono font-bold text-[#1D1D1F] dark:text-[#F5F5F7] uppercase tracking-wider mb-2">
                    The Goal
                  </h4>
                  <p className="text-13px leading-relaxed text-[#86868B] dark:text-[#98989D]">{caseStudy.goal}</p>
                </div>
              </div>

              <div>
                <h3 className="text-20px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">Creative & Motion Strategy</h3>
                <p className="text-15px leading-relaxed mb-4 text-[#86868B] dark:text-[#98989D]">{caseStudy.strategy}</p>
                <p className="text-15px leading-relaxed text-[#86868B] dark:text-[#98989D]">{caseStudy.storytellingApproach}</p>
              </div>
            </div>
          </div>

          {/* Motion Design Breakdown Section */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-11px font-mono uppercase tracking-widest text-[#007AFF] dark:text-[#0A84FF] font-bold mb-4">
              <Layers className="w-4 h-4" />
              <span>MOTION DESIGN BREAKDOWN</span>
            </div>
            <h2 className="text-28px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-8">
              Mathematical Precision & After Effects Rigging
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudy.motionDesignBreakdown.map((item, idx) => (
                <div key={idx} className="p-6 rounded-[20px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-18px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">{item.title}</h3>
                    <p className="text-14px text-[#86868B] dark:text-[#98989D] mb-4">{item.description}</p>

                    <ul className="space-y-2 text-13px text-[#86868B] dark:text-[#98989D] mb-6">
                      {item.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#007AFF] dark:text-[#0A84FF] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.easingCurve && (
                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 font-mono text-11px text-[#007AFF] dark:text-[#0A84FF] flex items-center justify-between">
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
              <div className="flex items-center gap-2 text-11px font-mono uppercase tracking-widest text-[#007AFF] dark:text-[#0A84FF] font-bold mb-4">
                <Sliders className="w-4 h-4" />
                <span>BEHIND THE SCENES</span>
              </div>
              <h2 className="text-28px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-8">
                Styleframes & After Effects Compositions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {caseStudy.behindTheScenes.map((bts, bIdx) => (
                  <div key={bIdx} className="rounded-[20px] overflow-hidden bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                    <img src={bts.imageUrl} alt={bts.title} className="w-full h-56 object-cover" />
                    <div className="p-5">
                      <h3 className="text-16px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">{bts.title}</h3>
                      <p className="text-13px text-[#86868B] dark:text-[#98989D]">{bts.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Multi-Format Cuts Showcase */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-11px font-mono uppercase tracking-widest text-[#007AFF] dark:text-[#0A84FF] font-bold mb-4">
              <Film className="w-4 h-4" />
              <span>MULTI-FORMAT DELIVERABLES</span>
            </div>
            <h2 className="text-28px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-8">
              Multi-Format Cuts for Web, Socials & Mobile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {caseStudy.multiFormatCuts.map((cut, cIdx) => (
                <div key={cIdx} className="p-4 rounded-[20px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col items-center">
                  <div className={`w-full ${cut.aspectRatioClass} rounded-xl overflow-hidden bg-black mb-3`}>
                    <video autoPlay loop muted playsInline preload="metadata" src={cut.videoUrl} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-13px font-bold text-[#1D1D1F] dark:text-[#F5F5F7] text-center">{cut.title}</span>
                  <span className="text-11px font-mono text-[#86868B] dark:text-[#98989D] uppercase">{cut.format} Aspect Ratio</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results & Key Metrics */}
          <div className="mb-16 p-8 rounded-[24px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-md">
            <h3 className="text-12px font-mono text-[#007AFF] dark:text-[#0A84FF] uppercase tracking-widest font-bold mb-6">
              MEASURABLE RESULTS & IMPACT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              {caseStudy.results.map((res, rIdx) => (
                <div key={rIdx} className="flex flex-col">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] font-mono tracking-tight">
                    {res.metric}
                  </span>
                  <span className="text-13px text-[#86868B] dark:text-[#98989D] mt-1">{res.label}</span>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            {caseStudy.testimonial && (
              <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row items-start gap-4">
                <Quote className="w-8 h-8 text-[#007AFF] dark:text-[#0A84FF] shrink-0" />
                <div>
                  <p className="text-16px italic text-[#1D1D1F] dark:text-[#F5F5F7] mb-4 leading-relaxed">
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
                      <h4 className="text-14px font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{caseStudy.testimonial.author}</h4>
                      <p className="text-12px text-[#86868B] dark:text-[#98989D] font-mono">
                        {caseStudy.testimonial.title}, {caseStudy.testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action CTA & Navigation */}
          <div className="pt-8 border-t border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => {
                playSubtleClickSound();
                onClose();
                onOpenEstimator();
              }}
              data-cursor-text="START"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] font-semibold text-15px hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all shadow-md"
            >
              Start Similar Project with whtamim →
            </button>

            <button
              onClick={() => {
                playSubtleClickSound();
                onClose();
              }}
              className="text-14px font-mono text-[#86868B] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors"
            >
              ← Back to All Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
