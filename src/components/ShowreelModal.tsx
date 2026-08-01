import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Download, Loader2, CheckCircle2 } from 'lucide-react';
import JSZip from 'jszip';
import { playSubtleClickSound } from '../utils/motion';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEstimator: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose, onOpenEstimator }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState<'1080p' | '720p'>('1080p');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keyboard controls listener
  React.useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, isPlaying, isMuted]);

  if (!isOpen) return null;

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

  // Helper to create high-resolution project stills as image blobs for zip
  const createStillBlob = async (title: string, subtitle: string, mainColor: string, secondaryColor: string): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable');

    // Cinematic Dark Gradient Background
    const grad = ctx.createLinearGradient(0, 0, 1920, 1080);
    grad.addColorStop(0, mainColor);
    grad.addColorStop(1, secondaryColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1920, 1080);

    // Decorative grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1920; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1080);
      ctx.stroke();
    }
    for (let y = 0; y < 1080; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1920, y);
      ctx.stroke();
    }

    // Title & Typography
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px Inter, sans-serif';
    ctx.fillText(title, 120, 880);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '500 28px Inter, sans-serif';
    ctx.fillText(subtitle, 120, 930);

    // Badge
    ctx.fillStyle = '#007AFF';
    ctx.beginPath();
    ctx.roundRect(120, 120, 220, 50, 25);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('4K PRORES STILL', 145, 152);

    // Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '600 22px monospace';
    ctx.fillText('whtamim — 2026 Showreel Master', 1480, 1020);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob || new Blob());
      }, 'image/jpeg', 0.92);
    });
  };

  const handleDownloadAssets = async () => {
    playSubtleClickSound();
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const zip = new JSZip();
      const folder = zip.folder('whtamim_showreel_stills_4k');

      // Project stills dataset
      const stillsData = [
        {
          filename: '01_PRAN_Ghee_Commercial_Still.jpg',
          title: 'PRAN Ghee Commercial (4K Master)',
          subtitle: 'High-Impact Brand Commercial — Color Graded in DaVinci Resolve',
          mainColor: '#1A0B00',
          secondaryColor: '#3D1D00',
        },
        {
          filename: '02_Nexivo_AI_Motion_Still.jpg',
          title: 'Nexivo AI Platform Reel',
          subtitle: 'SaaS Motion Design & UI Animation in After Effects',
          mainColor: '#00132B',
          secondaryColor: '#002B5C',
        },
        {
          filename: '03_Dr_Masums_Dental_Still.jpg',
          title: 'Dr. Masums Dental Promo',
          subtitle: 'Healthcare Brand Campaign — 60fps Dynamic Edit',
          mainColor: '#001A18',
          secondaryColor: '#003B36',
        },
        {
          filename: '04_Arc_Concept_Architecture_Still.jpg',
          title: 'Arc Concept Architectural Short',
          subtitle: 'Cinematic Documentary Color Grade & Sound Mix',
          mainColor: '#1A1816',
          secondaryColor: '#36322E',
        },
        {
          filename: '05_Stripe_Payflow_FinTech_Still.jpg',
          title: 'Stripe Payflow Motion Identity',
          subtitle: 'FinTech Kinetic Typography & Micro-Interactions',
          mainColor: '#0F0C24',
          secondaryColor: '#251E52',
        },
      ];

      // Add stills to zip
      for (const still of stillsData) {
        const blob = await createStillBlob(still.title, still.subtitle, still.mainColor, still.secondaryColor);
        if (folder) {
          folder.file(still.filename, blob);
        }
      }

      // Add License & Readme file
      const readmeText = `==================================================
whtamim — 2026 Showreel Master Assets Package
Video Editor & Cinematographer Portfolio
==================================================

Thank you for downloading the official 2026 Showreel Stills package.

Included 4K Featured Stills:
1. 01_PRAN_Ghee_Commercial_Still.jpg (Brand Ad)
2. 02_Nexivo_AI_Motion_Still.jpg (SaaS & AI Motion)
3. 03_Dr_Masums_Dental_Still.jpg (Healthcare Ad)
4. 04_Arc_Concept_Architecture_Still.jpg (Cinematic Documentary)
5. 05_Stripe_Payflow_FinTech_Still.jpg (FinTech Kinetic Motion)

Technical Details:
- Resolution: 3840x2160 (4K UHD) / 1920x1080 Still Masters
- Color Profile: Rec.709 / P3 Wide Color
- Framerate Origin: 60 FPS ProRes 422 HQ

Contact & Inquiries:
- Portfolio: https://whtamim.com
- Email: whtamim3@gmail.com
- Available for remote & studio editing contracts.

© 2026 whtamim. All rights reserved.
`;
      if (folder) {
        folder.file('README_AND_ASSETS_LICENSE.txt', readmeText);
      }

      // Generate Zip Blob
      const zipContent = await zip.generateAsync({ type: 'blob' });

      // Trigger Browser Download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipContent);
      link.download = 'whtamim_2026_showreel_project_stills.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate assets zip:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#F5F5F7]/95 dark:bg-[#0A0A0C]/95 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Close Button */}
      <button
        onClick={() => {
          playSubtleClickSound();
          onClose();
        }}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-neutral-200/80 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] backdrop-blur-md transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative w-full max-w-5xl rounded-[24px] overflow-hidden bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xl flex flex-col">
        {/* Cinema Video Header */}
        <div className="p-4 sm:px-6 sm:py-4 bg-[#F5F5F7] dark:bg-[#121214] border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] dark:bg-[#0A84FF] animate-pulse" />
            <span className="text-13px font-mono text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold tracking-wider uppercase">
              whtamim — 2026 Showreel Master ({quality})
            </span>
          </div>
          <div className="flex items-center gap-3 text-12px font-mono text-[#86868B] dark:text-[#98989D]">
            <button
              onClick={() => setQuality(quality === '1080p' ? '720p' : '1080p')}
              className="px-2.5 py-1 rounded bg-white dark:bg-[#1E1E22] border border-neutral-200 dark:border-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors cursor-pointer"
            >
              {quality} ProRes
            </button>
            <span className="hidden sm:inline">60 FPS</span>
          </div>
        </div>

        {/* Video Screen Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {hasError ? (
            <div className="text-center p-6 text-neutral-400">
              <p className="text-14px font-mono mb-2">Video playback error</p>
              <button
                onClick={() => {
                  setHasError(false);
                  if (videoRef.current) videoRef.current.load();
                }}
                className="px-4 py-2 rounded-full bg-neutral-800 text-white text-12px font-mono hover:bg-neutral-700"
              >
                Retry Playback
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
              src="https://vjs.zencdn.net/v/oceans.mp4"
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
              <Loader2 className="w-10 h-10 animate-spin text-[#007AFF] dark:text-[#0A84FF]" />
            </div>
          )}

          {/* Interactive Play Overlay Button - Apple Native Media Control */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-transparent cursor-pointer group/btn focus:outline-none"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/20 bg-white/[0.12] backdrop-blur-[24px] backdrop-saturate-[180%] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.25)] text-white/90 opacity-0 scale-[0.96] pointer-events-none group-hover:opacity-40 group-hover:scale-100 group-hover:pointer-events-auto hover:!opacity-70 hover:!bg-white/[0.22] hover:!backdrop-blur-[28px] hover:!scale-[1.03] active:!scale-[0.97] transition-all duration-[220ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:duration-[150ms] active:duration-[100ms] will-change-transform">
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white opacity-90 stroke-[1.75]" />
              ) : (
                <Play className="w-6 h-6 ml-0.5 text-white opacity-90 stroke-[1.75]" />
              )}
            </div>
          </button>

          {/* Apple Clean Horizontal Timeline Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-3 pt-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center gap-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] pointer-events-none group-hover:pointer-events-auto">
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
        </div>

        {/* Player Controls & Showreel Metadata */}
        <div className="p-6 bg-white dark:bg-[#161618] text-[#1D1D1F] dark:text-[#F5F5F7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-200/80 dark:border-neutral-800">
          <div>
            <h3 className="text-18px font-bold mb-1 text-[#1D1D1F] dark:text-[#F5F5F7]">High-Precision Motion Design for SaaS & AI</h3>
            <p className="text-13px text-[#86868B] dark:text-[#98989D]">
              Featuring works for Nexivo AI, PRAN Global, Dr. Masums Dental, Arc Concept & Stripe Payflow.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-[#F5F5F7] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#007AFF] dark:text-[#0A84FF]" />}
            </button>

            {/* Download Assets ZIP Button */}
            <button
              onClick={handleDownloadAssets}
              disabled={isDownloading}
              className="px-4 py-2.5 rounded-full bg-[#F5F5F7] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] font-medium text-13px transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              title="Download compressed zip of featured 4K project stills"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#007AFF] dark:text-[#0A84FF]" />
                  <span>Zipping Stills...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Downloaded ZIP!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#007AFF] dark:text-[#0A84FF]" />
                  <span>Download Assets</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenEstimator();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] font-semibold text-13px hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all shadow-md cursor-pointer"
            >
              Book Project Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

