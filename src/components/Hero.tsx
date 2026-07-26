import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, ArrowDown } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';

interface HeroProps {
  onOpenShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenShowreel,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    playSubtleClickSound();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 bg-[#F5F5F7] text-[#1D1D1F] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center my-auto">
        {/* Creator Portrait Badge */}
        <TextReveal delay={0} yOffset={16}>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs mb-8">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
              alt="whtamim portrait"
              className="w-5 h-5 rounded-full object-cover border border-neutral-300"
            />
            <span className="text-12px font-mono text-[#86868B]">
              <strong className="text-[#1D1D1F] font-semibold">whtamim</strong> — SaaS Video Editor & Motion Designer
            </span>
          </div>
        </TextReveal>

        {/* Headline */}
        <TextReveal as="h1" delay={0.08} yOffset={20} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05] text-[#1D1D1F] max-w-5xl mb-6">
          Crafting Motion That Elevates Digital Products.
        </TextReveal>

        {/* Small Supporting Paragraph */}
        <TextReveal as="p" delay={0.16} yOffset={20} className="text-16px sm:text-18px md:text-20px text-[#86868B] font-normal leading-relaxed max-w-2xl mb-10">
          Production-grade launch films, motion graphics, and UI walkthroughs built specifically for category-defining SaaS & AI startups.
        </TextReveal>

        {/* Primary CTAs */}
        <TextReveal delay={0.24} yOffset={20} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              playSubtleClickSound();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full bg-[#1D1D1F] text-white font-semibold text-14px tracking-wide hover:bg-[#007AFF] transition-all shadow-md hover:shadow-lg"
          >
            Start a Project
          </a>

          <button
            onClick={() => {
              playSubtleClickSound();
              onOpenShowreel();
            }}
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white border border-neutral-200 text-[#1D1D1F] font-semibold text-14px hover:border-neutral-400 transition-all shadow-xs"
          >
            <div className="w-5 h-5 rounded-full bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
            <span>Watch Showreel</span>
            <span className="text-11px font-mono text-[#86868B] font-normal ml-1">
              1:15
            </span>
          </button>
        </TextReveal>

        {/* Muted Autoplay Showreel Card Container */}
        <TextReveal delay={0.32} yOffset={24} className="w-full max-w-4xl relative rounded-[24px] overflow-hidden border border-neutral-200/90 shadow-2xl bg-black aspect-video group">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
          </video>

          {/* Video Control Bar Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-12px font-mono">
            <span className="opacity-80">2026 Showreel Preview</span>

            <button
              onClick={toggleAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#007AFF]" />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>
          </div>
        </TextReveal>
      </div>

      {/* Bottom Scroll Indicator */}
      <TextReveal delay={0.4} yOffset={16} className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-center text-12px font-mono text-[#86868B]">
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            playSubtleClickSound();
            document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 hover:text-[#1D1D1F] transition-colors"
        >
          <span>Scroll to Selected Work</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </TextReveal>
    </section>
  );
};


