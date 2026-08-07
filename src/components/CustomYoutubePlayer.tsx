import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface CustomYoutubePlayerProps {
  videoUrl: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  showControls?: boolean;
}

// Global YouTube API loader to prevent duplicates
let ytLoadingPromise: Promise<void> | null = null;

const loadYT = (): Promise<void> => {
  if (window.YT && window.YT.Player) {
    return Promise.resolve();
  }
  if (ytLoadingPromise) {
    return ytLoadingPromise;
  }

  ytLoadingPromise = new Promise<void>((resolve) => {
    if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    const oldCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (oldCallback) oldCallback();
      resolve();
    };
  });

  return ytLoadingPromise;
};

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

export const CustomYoutubePlayer: React.FC<CustomYoutubePlayerProps> = ({
  videoUrl,
  autoplay = true,
  muted = false,
  loop = true,
  className = '',
  showControls = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const fadeTimeoutRef = useRef<number | null>(null);

  const videoId = getYoutubeId(videoUrl);

  // Load API and initialize player
  useEffect(() => {
    let active = true;

    loadYT().then(() => {
      if (!active || !placeholderRef.current) return;

      // Clean up previous instance if exists
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn('Error destroying player:', e);
        }
        playerRef.current = null;
      }

      const playerVars: any = {
        autoplay: autoplay ? 1 : 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        enablejsapi: 1,
        origin: window.location.origin,
        playsinline: 1,
      };

      if (loop && videoId) {
        playerVars.loop = 1;
        playerVars.playlist = videoId;
      }

      playerRef.current = new window.YT.Player(placeholderRef.current, {
        videoId: videoId,
        playerVars: playerVars,
        events: {
          onReady: (event: any) => {
            if (!active) return;
            setIsPlayerReady(true);
            
            if (isMuted) {
              event.target.mute();
            } else {
              event.target.unMute();
            }

            if (autoplay) {
              event.target.playVideo();
              setIsPlaying(true);
            }
          },
          onStateChange: (event: any) => {
            if (!active) return;
            
            // window.YT.PlayerState states:
            // UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5
            const state = event.data;
            if (state === 1) {
              setIsPlaying(true);
            } else if (state === 2) {
              setIsPlaying(false);
            } else if (state === 0) {
              setIsPlaying(false);
              if (loop) {
                event.target.playVideo();
              }
            }
          },
        },
      });
    });

    return () => {
      active = false;
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [videoId]);

  // Handle tracking current playback progress
  useEffect(() => {
    if (isPlaying && isPlayerReady) {
      progressIntervalRef.current = window.setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const current = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration() || 0;
          setCurrentTime(current);
          setDuration(dur);
          if (dur > 0 && !isDragging) {
            setProgress((current / dur) * 100);
          }
        }
      }, 250);
    } else {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, isPlayerReady, isDragging]);

  // Autohide controls logic
  const resetFadeTimeout = () => {
    setShowUI(true);
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
    }
    fadeTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying && !isDragging) {
        setShowUI(false);
      }
    }, 2500);
  };

  useEffect(() => {
    resetFadeTimeout();
    return () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [isPlaying, isDragging]);

  const handleMouseMove = () => {
    resetFadeTimeout();
  };

  const handleContainerClick = () => {
    togglePlay();
  };

  // Player controls actions
  const togglePlay = () => {
    if (!playerRef.current || !isPlayerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
    resetFadeTimeout();
  };

  const toggleMute = () => {
    if (!playerRef.current || !isPlayerReady) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
    resetFadeTimeout();
  };

  const handleProgressBarInteraction = (clientX: number) => {
    if (!playerRef.current || !duration || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    
    setCurrentTime(newTime);
    setProgress(percentage * 100);
    playerRef.current.seekTo(newTime, true);
  };

  const handleProgressBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    handleProgressBarInteraction(e.clientX);
  };

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (isDragging) {
        handleProgressBarInteraction(e.clientX);
      }
    };

    const handleMouseUpGlobal = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMoveGlobal);
      window.addEventListener('mouseup', handleMouseUpGlobal);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging, duration]);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
    resetFadeTimeout();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === null) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowUI(false)}
      onClick={handleContainerClick}
      className={`relative w-full h-full bg-black overflow-hidden flex items-center justify-center group/player select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* YouTube Iframe Container - Sized & Cropped beautifully to hide Youtube Chrome */}
      <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.25] origin-center z-0">
        <div ref={placeholderRef} className="w-full h-full" />
      </div>

      {/* Transparent Clickable Overlay (covers entire video to prevent any native youtube interactions) */}
      <div className="absolute inset-0 z-10 cursor-pointer" />

      {/* Soft dark vignettes at top and bottom for readability */}
      {showControls && (
        <>
          <div 
            className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-20 transition-opacity duration-500 ease-out ${
              showUI ? 'opacity-100' : 'opacity-0'
            }`} 
          />
          <div 
            className={`absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20 transition-opacity duration-500 ease-out ${
              showUI ? 'opacity-100' : 'opacity-0'
            }`} 
          />
        </>
      )}

      {/* Circular Play/Pause HUD in the center */}
      {showControls && (
        <div 
          className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-300 ${
            showUI ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white backdrop-blur-md pointer-events-auto hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none shadow-xl"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-current text-white translate-x-0" />
            ) : (
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current text-white translate-x-0.5" />
            )}
          </button>
        </div>
      )}

      {/* Sleek Custom Apple-style Control Bar */}
      {showControls && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-6 left-6 right-6 z-30 transition-all duration-500 ease-out transform pointer-events-auto ${
            showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Timeline / Progress Slider Container */}
          <div className="flex flex-col gap-3.5 px-4 py-3 sm:py-4 bg-black/35 backdrop-blur-[24px] border border-white/10 rounded-2xl shadow-2xl">
            {/* Custom Interactive Seek Bar */}
            <div
              ref={progressBarRef}
              onMouseDown={handleProgressBarMouseDown}
              className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer group/bar flex items-center py-2"
            >
              {/* Active filled track */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-white rounded-full group-hover/bar:bg-[#007AFF] dark:group-hover/bar:bg-[#0A84FF] transition-colors"
                style={{ width: `${progress}%` }}
              />
              
              {/* Scrub handle / thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg scale-0 group-hover/bar:scale-100 transition-transform origin-center"
                style={{ left: `calc(${progress}% - 7px)` }}
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between gap-4">
              {/* Left Group: Play/Pause button and Time Counter */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 text-white/80 hover:text-white transition-colors hover:scale-105 active:scale-95 focus:outline-none"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                </button>
                
                <span className="text-[12px] sm:text-13px font-mono text-white/90 select-none">
                  {formatTime(currentTime)} <span className="text-white/40">/</span> {formatTime(duration)}
                </span>
              </div>

              {/* Right Group: Sound/Unmute and Fullscreen */}
              <div className="flex items-center gap-2">
                {/* Volume / Mute button */}
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-white/80 hover:text-white transition-colors hover:scale-105 active:scale-95 focus:outline-none"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                {/* Fullscreen button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 text-white/80 hover:text-white transition-colors hover:scale-105 active:scale-95 focus:outline-none"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
