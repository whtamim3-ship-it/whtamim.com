import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEstimator: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose, onOpenEstimator }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState<'4K' | '1080p'>('4K');
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#F5F5F7]/95 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Close Button */}
      <button
        onClick={() => {
          playSubtleClickSound();
          onClose();
        }}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-[#1D1D1F] backdrop-blur-md transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative w-full max-w-5xl rounded-[24px] overflow-hidden bg-white border border-neutral-200/80 shadow-2xl flex flex-col">
        {/* Cinema Video Header */}
        <div className="p-4 sm:px-6 sm:py-4 bg-[#F5F5F7] border-b border-neutral-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] animate-pulse" />
            <span className="text-13px font-mono text-[#1D1D1F] font-semibold tracking-wider uppercase">
              whtamim — 2026 Showreel Master (4K)
            </span>
          </div>
          <div className="flex items-center gap-3 text-12px font-mono text-[#86868B]">
            <button
              onClick={() => setQuality(quality === '4K' ? '1080p' : '4K')}
              className="px-2.5 py-1 rounded bg-white border border-neutral-200 text-[#1D1D1F] transition-colors"
            >
              {quality} ProRes
            </button>
            <span className="hidden sm:inline">60 FPS</span>
          </div>
        </div>

        {/* Video Screen Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            className="w-full h-full object-cover"
          />

          {/* Interactive Play Overlay Button */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors group"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </div>
          </button>
        </div>

        {/* Player Controls & Showreel Metadata */}
        <div className="p-6 bg-white text-[#1D1D1F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-200/80">
          <div>
            <h3 className="text-18px font-bold mb-1 text-[#1D1D1F]">High-Precision Motion Design for SaaS & AI</h3>
            <p className="text-13px text-[#86868B]">
              Featuring works for Nexivo AI, PRAN Global, Dr. Masums Dental, Arc Concept & Stripe Payflow.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-[#F5F5F7] border border-neutral-200 hover:bg-neutral-200 text-[#1D1D1F] transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#007AFF]" />}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenEstimator();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#1D1D1F] text-white font-semibold text-13px hover:bg-[#007AFF] transition-all shadow-md"
            >
              Book Project Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
