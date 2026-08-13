import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  BookOpen,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Filter,
  Sparkles,
  Layers,
  Palette,
  Film,
  Newspaper,
  LayoutGrid,
  RefreshCw,
  Mail,
  Send,
  Check,
  Share2,
  Linkedin,
  Copy,
  Sun,
  Moon,
  TrendingUp,
  Bookmark,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';

const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Workflow & Breakdown' | 'Color & VFX' | 'Motion Design' | 'Industry News';
  content: string[];
  coverGradient: string;
  thumbnailGradient: string;
  badgeColor: '#E11D48' | '#2563EB';
  author?: string;
  tags?: string[];
}

export const CATEGORIES = [
  'All',
  'Workflow & Breakdown',
  'Color & VFX',
  'Motion Design',
  'Industry News',
] as const;

export const FEATURED_POST: BlogPost = {
  id: 'featured-1',
  title: 'Pacing & Rhythm in High-Converting SaaS Product Trailers',
  slug: 'pacing-rhythm-saas-trailers',
  excerpt:
    'How micro-cuts, audio sync, and visual momentum turn complex software features into captivating, high-conversion video stories designed for modern audiences.',
  date: 'August 10, 2026',
  readTime: '5 min read',
  category: 'Motion Design',
  badgeColor: '#E11D48',
  author: 'Tamim',
  tags: ['SaaS Video', 'Micro-Cuts', 'Sound Design'],
  coverGradient: 'from-rose-950/80 via-indigo-950/60 to-slate-900',
  thumbnailGradient: 'from-rose-600 to-indigo-600',
  content: [
    'In modern B2B and SaaS marketing, video is no longer just decorative—it is the primary conversion engine. However, the biggest mistake most product trailers make is treating software like a static slideshow rather than a living narrative.',
    '1. The First 3 Seconds: Establishing the Pain State',
    'The human brain processes visual cues in under 13 milliseconds. To capture immediate attention, start directly in motion with a dynamic UI interaction, dynamic typography, or a high-impact sound effect that introduces the core problem.',
    '2. Rhythmic Keyframing and Micro-Cuts',
    'Static screen recordings bore viewers. By applying custom cubic-bezier easing curves (such as cubic-bezier(0.22, 1, 0.36, 1)) to zoom ins, pan shots, and cursor movements, software interactions feel tactile, snappy, and responsive.',
    '3. SFX and Audio Layering',
    'Audio carries 50% of the emotional weight. Layering subtle UI clicks, risers, sub-bass drops, and interface swooshes synchronized precisely with visual keyframes gives digital interfaces physical weight.',
  ],
};

export const LATEST_STORIES: BlogPost[] = [
  {
    id: 'latest-1',
    title: 'The ACES Color Workflow: From RAW Footage to Final Delivery',
    slug: 'aces-color-workflow',
    excerpt:
      'Standardizing color management across DaVinci Resolve and After Effects for pristine HDR color grading.',
    date: 'August 08, 2026',
    readTime: '4 min read',
    category: 'Color & VFX',
    badgeColor: '#E11D48',
    author: 'Tamim',
    coverGradient: 'from-emerald-950/80 via-slate-900 to-teal-950',
    thumbnailGradient: 'from-emerald-600 to-teal-700',
    content: [
      'The Academy Color Encoding System (ACES) provides a standardized color management framework that preserves linear wide-gamut dynamic range from acquisition to post.',
      'By decoupling camera sensor color spaces from target display color spaces, colorists achieve seamless matching across mixed camera setups.',
    ],
  },
  {
    id: 'latest-2',
    title: 'Adobe After Effects 2026: Multi-Frame Rendering Benchmarks',
    slug: 'after-effects-2026-benchmarks',
    excerpt:
      'Deep dive into hardware optimizations, RAM allocation, and GPU acceleration for heavy motion graphics timelines.',
    date: 'August 04, 2026',
    readTime: '6 min read',
    category: 'Industry News',
    badgeColor: '#2563EB',
    author: 'Tamim',
    coverGradient: 'from-blue-950/80 via-slate-900 to-indigo-950',
    thumbnailGradient: 'from-blue-600 to-indigo-700',
    content: [
      'Multi-Frame Rendering (MFR) continues to evolve in 2026 with intelligent background pre-rendering and dynamic VRAM caching.',
      'We tested MFR across M3/M4 Max and RTX 4090 workstations to measure timeline playback gains on 4K EXR sequence compositions.',
    ],
  },
  {
    id: 'latest-3',
    title: 'Kinetic Typography Principles in Commercial Soundtracks',
    slug: 'kinetic-typography-principles',
    excerpt:
      'Matching typography weight and tracking curves to acoustic transients for maximum visual impact in promos.',
    date: 'July 30, 2026',
    readTime: '3 min read',
    category: 'Motion Design',
    badgeColor: '#E11D48',
    author: 'Tamim',
    coverGradient: 'from-purple-950/80 via-slate-900 to-rose-950',
    thumbnailGradient: 'from-purple-600 to-pink-600',
    content: [
      'Text on screen should dance with the audio stem. When kick drums or snared transients hit, type scale and tracking should react instantaneously.',
    ],
  },
  {
    id: 'latest-4',
    title: 'Organizing 100+ Asset Timelines in DaVinci Resolve Studio',
    slug: 'organizing-davinci-timelines',
    excerpt:
      'Structural bin conventions, compound clips, and smart timeline markers for fast commercial editing workflows.',
    date: 'July 22, 2026',
    readTime: '5 min read',
    category: 'Workflow & Breakdown',
    badgeColor: '#2563EB',
    author: 'Tamim',
    coverGradient: 'from-amber-950/80 via-slate-900 to-orange-950',
    thumbnailGradient: 'from-amber-500 to-orange-600',
    content: [
      'Clutter slows down creative flow. Standardized bin naming structures (01_FOOTAGE, 02_AUDIO, 03_GRAPHICS, 04_EXPORTS) keep large commercial timelines efficient.',
    ],
  },
];

export const EDITORS_CHOICE: BlogPost[] = [
  {
    id: 'editor-1',
    title: 'Why 3D Spatial Graphics Drive 3x Higher Engagement in Tech Ads',
    slug: '3d-spatial-graphics-tech-ads',
    excerpt:
      'Exploring how isometric 3D renders, floating glass UI layers, and cinematic lighting elevate tech brands above generic flat graphics.',
    date: 'July 15, 2026',
    readTime: '6 min read',
    category: 'Motion Design',
    badgeColor: '#E11D48',
    author: 'Tamim',
    tags: ['3D Motion', 'Cinema 4D', 'Glassmorphism'],
    coverGradient: 'from-cyan-950/80 via-slate-900 to-blue-950',
    thumbnailGradient: 'from-cyan-500 to-blue-600',
    content: [
      'As flat UI designs saturate advertising, top-tier tech brands like Apple and Vercel leverage 3D spatial motion graphics to differentiate their offerings.',
      'By separating interface layers into 3D camera space, viewers gain immediate spatial clarity regarding complex features.',
    ],
  },
  {
    id: 'editor-2',
    title: 'The Anatomy of a 60-Second Commercial: Frame-by-Frame Breakdown',
    slug: 'anatomy-60-second-commercial',
    excerpt: 'A complete breakdown of narrative hooks, visual tension, and call-to-action framing in video marketing.',
    date: 'July 02, 2026',
    readTime: '7 min read',
    category: 'Workflow & Breakdown',
    badgeColor: '#2563EB',
    author: 'Tamim',
    tags: ['Commercial', 'Storyboarding', 'Editing'],
    coverGradient: 'from-indigo-950/80 via-slate-900 to-purple-950',
    thumbnailGradient: 'from-indigo-500 to-violet-600',
    content: [
      'A great commercial is a masterclass in concise storytelling. Every single frame must serve a purpose: hook, build desire, demonstrate value, and trigger action.',
      '1. Hook (0–5s): Visual disruption and curiosity gap.',
      '2. Tension (5–20s): Amplifying the problem state with dark, high-contrast color grades.',
      '3. Resolution (20–45s): Bright, vibrant product showcase revealing effortless solutions.',
      '4. Call to Action (45–60s): High-contrast logo launch and memorable sonic identity sound mark.',
    ],
  },
  {
    id: 'editor-3',
    title: 'Film Grain Scans vs. Digital Noise: Natural Texture in Commercials',
    slug: 'film-grain-vs-digital-noise',
    excerpt:
      'Applying organic 35mm film grain scans to digital camera sensors for tactile, cinematic warmth.',
    date: 'June 24, 2026',
    readTime: '4 min read',
    category: 'Color & VFX',
    badgeColor: '#E11D48',
    author: 'Tamim',
    tags: ['Color Grading', '35mm Scans', 'Cinematography'],
    coverGradient: 'from-rose-950/80 via-slate-900 to-pink-950',
    thumbnailGradient: 'from-rose-500 to-pink-600',
    content: [
      'Digital sensors capture mathematically clean signals, but clean signals can feel clinical. Blending organic 35mm grain scans in overlay mode brings emotional warmth to commercial footage.',
    ],
  },
];

export const TECHNICAL_BREAKDOWNS: BlogPost[] = [
  {
    id: 'tech-1',
    title: 'Node Graph Architecture for Complex Cleanups in Fusion',
    slug: 'node-graph-fusion-cleanups',
    excerpt:
      'Planar tracking, object removal, and clean plate creation for commercial UI screen replacements.',
    date: 'June 12, 2026',
    readTime: '8 min read',
    category: 'Color & VFX',
    badgeColor: '#E11D48',
    author: 'Tamim',
    coverGradient: 'from-emerald-950/80 via-slate-900 to-teal-950',
    thumbnailGradient: 'from-emerald-600 to-teal-800',
    content: [
      'Node-based compositing provides unrivaled flexibility when managing complex screen replacements and multi-layer roto graphs.',
    ],
  },
  {
    id: 'tech-2',
    title: 'Custom Expressions for Fluid Elastic UI Animations',
    slug: 'custom-expressions-elastic-ui',
    excerpt:
      'Inertial bounce, spring math, and damped harmonic oscillations in After Effects expressions.',
    date: 'May 28, 2026',
    readTime: '5 min read',
    category: 'Motion Design',
    badgeColor: '#E11D48',
    author: 'Tamim',
    coverGradient: 'from-indigo-950/80 via-slate-900 to-purple-950',
    thumbnailGradient: 'from-indigo-600 to-purple-800',
    content: [
      'Hard-coded keyframes lack fluid organic physics. Using spring physics expression code yields natural, dynamic button and UI recoil.',
    ],
  },
  {
    id: 'tech-3',
    title: 'Audio Stem Mixing for Video Editors: Dialogue, SFX & Music',
    slug: 'audio-stem-mixing-editors',
    excerpt:
      'Setting ducking thresholds, sidechain compression, and spatial binaural panning for video sound mixes.',
    date: 'May 19, 2026',
    readTime: '6 min read',
    category: 'Workflow & Breakdown',
    badgeColor: '#2563EB',
    author: 'Tamim',
    coverGradient: 'from-amber-950/80 via-slate-900 to-yellow-950',
    thumbnailGradient: 'from-amber-600 to-yellow-800',
    content: [
      'A flawless visual cut falls flat without cohesive audio ducking. Dynamic EQ cuts at 1kHz-3kHz preserve voice intelligibility over bassy synth tracks.',
    ],
  },
  {
    id: 'tech-4',
    title: 'AI-Assisted Rotoscoping vs. Manual Vector Masking in 2026',
    slug: 'ai-rotoscoping-vs-manual',
    excerpt:
      'Evaluating neural roto models against fine-art hair and edge refinement in high-resolution video shots.',
    date: 'May 05, 2026',
    readTime: '7 min read',
    category: 'Industry News',
    badgeColor: '#2563EB',
    author: 'Tamim',
    coverGradient: 'from-teal-950/80 via-slate-900 to-cyan-950',
    thumbnailGradient: 'from-teal-500 to-cyan-700',
    content: [
      'Neural roto algorithms accelerate rough masking by 10x, but fine edge refinement and motion blur transparency still demand skilled human touch.',
    ],
  },
];

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPreFillInquiry?: (brief: string) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  onClose,
  onPreFillInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSkeletonState, setIsSkeletonState] = useState<boolean>(false);
  const [subscriberEmail, setSubscriberEmail] = useState<string>('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [articleSubscriberEmail, setArticleSubscriberEmail] = useState<string>('');
  const [articleSubscribeStatus, setArticleSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);

  // Scroll reader progress calculator
  const handleScroll = () => {
    if (!modalContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = modalContainerRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll <= 0) {
      setReadingProgress(100);
    } else {
      const current = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
      setReadingProgress(current);
    }
  };

  useEffect(() => {
    if (selectedPost && modalContainerRef.current) {
      modalContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setReadingProgress(0);
    }
  }, [selectedPost]);

  if (!isOpen) return null;

  const handleClose = () => {
    playSubtleClickSound();
    setSelectedPost(null);
    onClose();
  };

  const handleCategorySelect = (category: string) => {
    playSubtleClickSound();
    setSelectedCategory(category);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    playSubtleClickSound();
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    playSubtleClickSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareTwitter = () => {
    playSubtleClickSound();
    if (!selectedPost) return;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedin = () => {
    playSubtleClickSound();
    if (!selectedPost) return;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes('@')) {
      setSubscribeStatus('error');
      return;
    }
    playSubtleClickSound();
    setSubscribeStatus('success');
    setTimeout(() => {
      setSubscriberEmail('');
      setSubscribeStatus('idle');
    }, 4000);
  };

  const handleArticleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleSubscriberEmail || !articleSubscriberEmail.includes('@')) {
      setArticleSubscribeStatus('error');
      return;
    }
    playSubtleClickSound();
    setArticleSubscribeStatus('success');
    setTimeout(() => {
      setArticleSubscriberEmail('');
      setArticleSubscribeStatus('idle');
    }, 4000);
  };

  // Filter logic
  const matchesCategory = (category: string) => {
    return selectedCategory === 'All' || selectedCategory === category;
  };

  const filteredEditorsChoice = EDITORS_CHOICE.filter((post) => matchesCategory(post.category));
  const filteredLatest = LATEST_STORIES.filter((post) => matchesCategory(post.category));
  const filteredTech = TECHNICAL_BREAKDOWNS.filter((post) => matchesCategory(post.category));

  // Unified Dark Theme Constants
  const bgRoot = 'bg-[#0B0C0E] text-[#ECF0F6]';
  const borderCol = 'border-[#22252D]';
  const bgCard = 'bg-[#14161B] border-[#22252D]';
  const textHeading = 'text-[#ECF0F6]';
  const textBody = 'text-[#C5CEDC]';
  const textMuted = 'text-[#8A94A6]';

  return (
    <AnimatePresence>
      <div
        ref={modalContainerRef}
        onScroll={handleScroll}
        className={`fixed inset-0 z-50 ${bgRoot} overflow-y-auto overflow-x-hidden w-full max-w-full font-sans selection:bg-[#E11D48] selection:text-white transition-colors duration-200 blog-modal-wrapper blog-page blog-container`}
        style={{ maxWidth: '100vw', overflowX: 'hidden', width: '100%', minHeight: '100vh', height: 'auto', overflowY: 'auto', boxSizing: 'border-box' }}
      >
        <style>{`
          html, body, #root, .blog-container, .blog-modal-wrapper, .blog-page {
            height: auto !important;
            min-height: 100vh !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
          }
          .blog-modal-wrapper {
            width: 100% !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
          }
          .blog-modal-wrapper * {
            box-sizing: border-box !important;
          }
          .blog-text-wrap {
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .lead-featured-card {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            flex-shrink: 1 !important;
            box-sizing: border-box !important;
          }
          @media (max-width: 767px) {
            .lead-featured-card, .blog-card-container {
              padding: 12px 14px !important;
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
          }
          @media (max-height: 500px) and (orientation: landscape) {
            .blog-header {
              padding: 6px 12px !important;
            }
            .blog-logo-text {
              font-size: 13px !important;
            }
            .blog-subtitle {
              display: none !important;
            }
            .blog-ticker {
              padding: 4px 12px !important;
              font-size: 10px !important;
            }
            .blog-filter-bar {
              padding: 4px 12px !important;
              margin-bottom: 8px !important;
            }
            .lead-featured-card, .blog-card-container {
              height: auto !important;
              min-height: 0 !important;
              padding: 12px 14px !important;
              margin-bottom: 12px !important;
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
            .blog-featured-title, .blog-card-title {
              font-size: 16px !important;
              line-height: 1.35 !important;
              word-break: break-word !important;
              overflow-wrap: break-word !important;
              margin-bottom: 4px !important;
            }
            .blog-main-container {
              padding-top: 8px !important;
              padding-bottom: 24px !important;
            }
          }
        `}</style>

        {/* Subtle Reading Progress Bar (Always active on scroll) */}
        <div className="sticky top-0 z-50 w-full h-1 bg-[#22252D]/80 backdrop-blur-xs pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#E11D48] to-[#2563EB] transition-all duration-75 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Newspaper Top Main Header - Normal Document Flow (relative) */}
        <header className="blog-header relative top-0 z-40 w-full max-w-full box-border bg-[#0B0C0E] border-b border-[#22252D] px-3.5 sm:px-8 py-3 flex items-center justify-between gap-2 overflow-x-hidden">
          {/* Newspaper Logo & Branding */}
          <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#E11D48] flex items-center justify-center font-black text-white text-13px sm:text-14px shadow-sm shrink-0">
              W
            </div>
            <div className="min-w-0">
              <span className={`blog-logo-text text-14px sm:text-18px font-black tracking-tight font-serif uppercase ${textHeading} truncate block`}>
                whtamim <span className="text-[#E11D48]">//</span> JOURNAL
              </span>
              <span className={`blog-subtitle hidden sm:inline-block text-10px font-mono uppercase tracking-widest ${textMuted}`}>
                EST. 2026 • DAILY EDITORIAL
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Skeleton State Simulator Toggle */}
            <button
              onClick={() => {
                playSubtleClickSound();
                setIsSkeletonState(!isSkeletonState);
              }}
              type="button"
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-11px font-mono border transition-all cursor-pointer shrink-0 ${
                isSkeletonState
                  ? 'bg-[#E11D48]/10 border-[#E11D48] text-[#E11D48]'
                  : 'bg-[#14161B] border-[#22252D] text-[#8A94A6] hover:text-[#ECF0F6]'
              }`}
              title="Toggle Skeleton Placeholder State"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSkeletonState ? 'animate-spin' : ''}`} />
              <span>{isSkeletonState ? 'Skeleton On' : 'Preview'}</span>
            </button>

            {/* Return to Main Site Button */}
            <button
              onClick={handleClose}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#14161B] text-[#ECF0F6] border border-[#22252D] hover:border-[#E11D48] text-12px sm:text-13px font-bold transition-all duration-200 cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>← Main Site</span>
            </button>
          </div>
        </header>

        {/* Top Editorial Ticker Bar for TRENDING TOPICS */}
        <div className={`blog-ticker py-2 px-3.5 sm:px-8 border-b ${borderCol} bg-[#12141A] text-11px font-mono flex items-center justify-between gap-3 overflow-x-auto no-scrollbar shrink-0 w-full max-w-full box-border`}>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded font-black text-white bg-[#E11D48] tracking-widest text-[10px] uppercase">
              TRENDING
            </span>
            <span className={`font-bold tracking-wider uppercase text-[10px] ${textHeading}`}>TOPICS:</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap text-11px shrink-0">
            <button
              type="button"
              onClick={() => setSelectedPost(FEATURED_POST)}
              className={`hover:underline cursor-pointer flex items-center gap-1.5 ${textBody}`}
            >
              <span className="text-[#E11D48] font-bold">01</span> SaaS Trailer Pacing
            </button>
            <span className={textMuted}>•</span>
            <button
              type="button"
              onClick={() => setSelectedPost(LATEST_STORIES[0])}
              className={`hover:underline cursor-pointer flex items-center gap-1.5 ${textBody}`}
            >
              <span className="text-[#2563EB] font-bold">02</span> ACES Color Management
            </button>
            <span className={textMuted}>•</span>
            <button
              type="button"
              onClick={() => setSelectedPost(LATEST_STORIES[1])}
              className={`hover:underline cursor-pointer flex items-center gap-1.5 ${textBody}`}
            >
              <span className="text-[#E11D48] font-bold">03</span> After Effects 2026 MFR
            </button>
            <span className={textMuted}>•</span>
            <button
              type="button"
              onClick={() => setSelectedPost(EDITORS_CHOICE[0])}
              className={`hover:underline cursor-pointer flex items-center gap-1.5 ${textBody}`}
            >
              <span className="text-[#2563EB] font-bold">04</span> 3D Spatial Tech Ads
            </button>
          </div>
        </div>

        {/* Article Reader View (When an article is selected) */}
        {selectedPost ? (
          <main className="blog-main-container w-full max-w-4xl mx-auto px-3.5 sm:px-8 py-5 sm:py-14 space-y-6 sm:space-y-8 overflow-x-hidden box-border">
            <button
              onClick={() => {
                playSubtleClickSound();
                setSelectedPost(null);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${bgCard} ${textMuted} hover:${textHeading} text-11px sm:text-12px font-mono transition-colors cursor-pointer border ${borderCol}`}
            >
              <ChevronLeft className="w-4 h-4 text-[#E11D48]" />
              <span>Back to Journal Front Page</span>
            </button>

            <article className="space-y-5 sm:space-y-6 w-full max-w-full box-border">
              <div className="space-y-3.5 sm:space-y-4 w-full max-w-full box-border">
                <div className="flex items-center justify-between flex-wrap gap-2 text-11px sm:text-12px font-mono">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span
                      className="px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[10px] sm:text-11px font-semibold sm:font-black uppercase tracking-wider text-white shrink-0"
                      style={{ backgroundColor: selectedPost.badgeColor }}
                    >
                      {selectedPost.category}
                    </span>
                    <span className={textMuted}>•</span>
                    <span className={`font-semibold ${textHeading}`}>By {selectedPost.author || 'Tamim'}</span>
                    <span className={textMuted}>•</span>
                    <span className={textMuted}>{selectedPost.date}</span>
                    <span className={textMuted}>•</span>
                    <span className={`${textMuted} flex items-center gap-1`}>
                      <Clock className="w-3.5 h-3.5" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>

                <h1
                  className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] ${textHeading} blog-text-wrap`}
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  {selectedPost.title}
                </h1>
                <p
                  className={`text-[15px] sm:text-19px ${textMuted} leading-[1.5] sm:leading-relaxed blog-text-wrap`}
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  {selectedPost.excerpt}
                </p>

                {/* Social Sharing Toolbar (Top) */}
                <div className={`flex items-center gap-2 pt-3 pb-2 border-y ${borderCol} my-4 flex-wrap w-full max-w-full box-border`}>
                  <span className={`text-10px sm:text-11px font-mono ${textMuted} uppercase tracking-wider mr-1 sm:mr-2 font-bold flex items-center gap-1 shrink-0`}>
                    <Share2 className="w-3.5 h-3.5 text-[#E11D48]" /> Share:
                  </span>
                  <button
                    onClick={handleShareTwitter}
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bgCard} hover:border-[#E11D48] ${textHeading} text-10px sm:text-11px font-mono transition-colors cursor-pointer border ${borderCol}`}
                    title="Share on Twitter / X"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>X / Twitter</span>
                  </button>
                  <button
                    onClick={handleShareLinkedin}
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bgCard} hover:border-[#2563EB] ${textHeading} text-10px sm:text-11px font-mono transition-colors cursor-pointer border ${borderCol}`}
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bgCard} hover:border-[#10B981] ${textHeading} text-10px sm:text-11px font-mono transition-colors cursor-pointer border ${borderCol}`}
                    title="Copy Link to Clipboard"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className={`w-3.5 h-3.5 ${textMuted}`} />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Cover Banner Graphic */}
              <div
                className={`w-full h-48 sm:h-80 rounded-xl sm:rounded-[16px] bg-gradient-to-br ${selectedPost.coverGradient} border ${borderCol} flex items-center justify-center relative overflow-hidden p-6 sm:p-8 shadow-sm`}
              >
                <div className="relative z-10 text-center space-y-1.5">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto animate-pulse" />
                  <span className="text-10px sm:text-12px font-mono uppercase tracking-widest text-white/90 font-bold block">
                    EDITORIAL COVER STORY
                  </span>
                </div>
              </div>

              {/* Article Content Paragraphs with Optimal Long-form Typography */}
              <div className={`space-y-5 sm:space-y-6 ${textBody} text-[15px] sm:text-[18px] leading-[1.65] sm:leading-[1.75] pt-4 border-t ${borderCol}`}>
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx} className="tracking-normal break-words">{paragraph}</p>
                ))}
              </div>

              {/* Social Sharing Toolbar (Bottom) */}
              <div className={`flex items-center justify-between gap-3 pt-5 border-t ${borderCol} flex-wrap`}>
                <span className={`text-11px sm:text-12px font-mono ${textMuted}`}>
                  Enjoyed this editorial? Share it with fellow creators:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareTwitter}
                    type="button"
                    className={`p-2 rounded-full ${bgCard} hover:border-[#E11D48] ${textHeading} transition-colors cursor-pointer border ${borderCol}`}
                    title="Share on Twitter / X"
                  >
                    <TwitterIcon className="w-4 h-4 text-[#38BDF8]" />
                  </button>
                  <button
                    onClick={handleShareLinkedin}
                    type="button"
                    className={`p-2 rounded-full ${bgCard} hover:border-[#2563EB] ${textHeading} transition-colors cursor-pointer border ${borderCol}`}
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-[#2563EB]" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    type="button"
                    className={`p-2 rounded-full ${bgCard} hover:border-[#10B981] ${textHeading} transition-colors cursor-pointer border ${borderCol}`}
                    title="Copy Article Link"
                  >
                    {copiedLink ? (
                      <Check className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <Copy className={`w-4 h-4 ${textMuted}`} />
                    )}
                  </button>
                </div>
              </div>

              {/* Minimal Email Subscription Box for Article Reader */}
              <div className={`p-4 sm:p-8 rounded-xl sm:rounded-[16px] ${bgCard} border ${borderCol} relative overflow-hidden space-y-4 mt-8 w-full max-w-full box-border`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] sm:text-11px font-mono text-[#E11D48] uppercase tracking-wider font-bold block">
                      STAY UPDATED
                    </span>
                    <h4 className={`text-16px sm:text-18px font-bold ${textHeading} tracking-tight`}>
                      Subscribe to future editorial dispatches
                    </h4>
                    <p className={`text-12px sm:text-13px ${textMuted}`}>
                      Get new video editing case studies and motion design benchmarks in your inbox.
                    </p>
                  </div>

                  <form onSubmit={handleArticleSubscribeSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                    <div className="relative flex-1 sm:w-64">
                      <Mail className={`w-3.5 h-3.5 ${textMuted} absolute left-3 top-1/2 -translate-y-1/2`} />
                      <input
                        type="email"
                        value={articleSubscriberEmail}
                        onChange={(e) => {
                          setArticleSubscriberEmail(e.target.value);
                          if (articleSubscribeStatus === 'error') setArticleSubscribeStatus('idle');
                        }}
                        placeholder="your@email.com"
                        className="w-full pl-9 pr-3 py-2 rounded-full bg-[#0B0C0E] border-[#2A2E39] text-[#ECF0F6] border text-12px placeholder-[#8A94A6] focus:outline-none focus:border-[#E11D48] transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-12px transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                    >
                      {articleSubscribeStatus === 'success' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Subscribed</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
                {articleSubscribeStatus === 'error' && (
                  <p className="text-11px text-rose-500 font-mono text-left">Please enter a valid email address.</p>
                )}
              </div>

              {/* Discuss Project CTA Box */}
              {onPreFillInquiry && (
                <div className={`p-4 sm:p-8 rounded-xl sm:rounded-[16px] ${bgCard} border ${borderCol} space-y-3 sm:space-y-4 mt-8 sm:mt-12 text-left w-full max-w-full box-border`}>
                  <span className="text-[10px] sm:text-11px font-mono text-[#2563EB] uppercase tracking-wider font-bold block">
                    COLLABORATION &amp; PRODUCTION
                  </span>
                  <h3 className={`text-18px sm:text-22px font-bold ${textHeading}`}>
                    Ready to implement these editing strategies into your video release?
                  </h3>
                  <p className={`text-13px sm:text-14px ${textMuted} leading-relaxed`}>
                    Let's collaborate on your commercial, SaaS product trailer, or motion design campaign.
                  </p>
                  <button
                    onClick={() => {
                      playSubtleClickSound();
                      handleClose();
                      onPreFillInquiry(
                        `Hi Tamim, I read your journal article "${selectedPost.title}" and would like to discuss a project.`
                      );
                    }}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold text-12px sm:text-13px transition-all inline-flex items-center gap-2 cursor-pointer shadow-md hover:opacity-90"
                  >
                    <span>Discuss a Video Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </article>
          </main>
        ) : (
          /* Main Journal / Newspaper Front Page View */
          <main className="blog-main-container w-full max-w-7xl mx-auto px-3 sm:px-8 py-4 sm:py-6 space-y-6 sm:space-y-10 pb-20 overflow-x-hidden box-border">
            {/* Smoothly Horizontally Scrollable Category Filter Navigation Bar */}
            <div
              className="blog-filter-bar sticky top-0 z-30 bg-[#0B0C0E]/95 backdrop-blur-md py-3 px-4 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar w-full max-w-full box-border shrink-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-3.5 h-3.5 text-[#E11D48] mr-1 shrink-0" />
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      type="button"
                      className={`relative px-3.5 py-1.5 rounded-full text-12px font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'bg-[#1A1D24] border border-[#2A2E39] text-[#8A94A6] hover:text-[#ECF0F6] hover:border-[#E11D48]'
                      }`}
                      style={{ padding: '6px 14px', fontSize: '12px', fontWeight: isActive ? 600 : 500 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeBlogCategoryPill"
                          className="absolute inset-0 bg-[#E11D48] rounded-full shadow-xs z-0"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Status Indicator */}
              <div className={`hidden lg:flex items-center gap-2 text-11px font-mono ${textMuted} shrink-0`}>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>NEWSPAPER FRONT PAGE</span>
              </div>
            </div>

            {/* Skeleton Loading State Preview */}
            {isSkeletonState ? (
              <div className="space-y-8 sm:space-y-12 w-full max-w-full box-border">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full max-w-full box-border">
                  <div className={`lg:col-span-7 h-72 sm:h-96 rounded-xl sm:rounded-[16px] ${bgCard} border ${borderCol} p-4 sm:p-8 animate-pulse space-y-4 flex flex-col justify-end w-full max-w-full box-border`}>
                    <div className="w-24 h-5 bg-[#22252D] rounded-full" />
                    <div className="w-3/4 h-8 bg-[#22252D] rounded-lg" />
                    <div className="w-full h-4 bg-[#22252D] rounded" />
                  </div>
                  <div className="lg:col-span-5 space-y-3 sm:space-y-4 w-full max-w-full box-border">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`p-3.5 sm:p-4 rounded-xl sm:rounded-[16px] ${bgCard} border ${borderCol} flex items-center gap-3.5 animate-pulse w-full max-w-full box-border`}
                      >
                        <div className="w-14 h-14 rounded-lg bg-[#22252D] shrink-0" />
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="w-16 h-3 bg-[#22252D] rounded-full" />
                          <div className="w-full h-4 bg-[#22252D] rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* NEWSPAPER FRONT PAGE FEATURE GRID: Mobile Single Column Layout */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 w-full max-w-full box-border">
                  {/* Left Lead Story (Mobile 1-column, Desktop 65% width) */}
                  <div
                    onClick={() => {
                      playSubtleClickSound();
                      setSelectedPost(FEATURED_POST);
                    }}
                    className="lead-featured-card blog-card-container lg:col-span-7 relative min-h-[360px] sm:min-h-[480px] rounded-[12px] sm:rounded-[16px] bg-[#14161B] border border-[#22252D] hover:border-[#E11D48] transition-all duration-300 overflow-hidden cursor-pointer group p-4 sm:p-8 flex flex-col justify-between shadow-md w-full max-w-full box-border"
                  >
                    {/* Background Overlay Visual */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${FEATURED_POST.coverGradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 pointer-events-none" />

                    {/* Top Meta Header Badges */}
                    <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 min-w-0 w-full max-w-full">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded text-[10px] sm:text-11px font-semibold sm:font-black font-mono uppercase tracking-wider bg-[#E11D48] text-white shadow-xs shrink-0 max-w-full truncate">
                        {FEATURED_POST.category}
                      </span>
                      <span className="text-[10px] sm:text-11px font-mono text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-white/20 shrink-0 max-w-full truncate">
                        LEAD FEATURED STORY
                      </span>
                    </div>

                    {/* Main Featured Lead Title & Excerpt */}
                    <div className="relative z-10 space-y-2.5 sm:space-y-3 mt-8 sm:mt-12 text-left w-full max-w-full box-border">
                      <div className="flex items-center gap-2 sm:gap-3 text-11px sm:text-12px font-mono text-white/80 flex-wrap">
                        <span className="font-bold text-white">By {FEATURED_POST.author || 'Tamim'}</span>
                        <span>•</span>
                        <span>{FEATURED_POST.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#E11D48] font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          {FEATURED_POST.readTime}
                        </span>
                      </div>

                      <h2
                        className="blog-featured-title blog-text-wrap text-[18px] sm:text-32px lg:text-38px font-black text-[#ECF0F6] tracking-tight leading-[1.4] mb-2 group-hover:text-rose-300 transition-colors font-serif text-left"
                        style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                      >
                        {FEATURED_POST.title}
                      </h2>

                      <p
                        className="blog-text-wrap text-[13px] sm:text-16px text-[#8A94A6] leading-[1.5] sm:leading-[1.7] line-clamp-3 text-left"
                        style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                      >
                        {FEATURED_POST.excerpt}
                      </p>

                      <div className="pt-1 sm:pt-2 flex items-center gap-2 text-12px sm:text-13px font-bold text-rose-300 group-hover:translate-x-1 transition-transform">
                        <span>Read Lead Dispatch</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Right Secondary News Column Stack (Mobile 1-column) */}
                  <div className={`blog-card-container lg:col-span-5 flex flex-col justify-between space-y-3 rounded-[12px] sm:rounded-[16px] ${bgCard} border ${borderCol} p-4 sm:p-5 shadow-sm w-full max-w-full box-border`}>
                    <div className={`flex items-center justify-between pb-2.5 border-b ${borderCol}`}>
                      <h3 className={`text-13px sm:text-14px font-mono font-black uppercase tracking-wider ${textHeading} flex items-center gap-2`}>
                        <Newspaper className="w-4 h-4 text-[#E11D48]" />
                        Latest News Feed
                      </h3>
                      <span className={`text-10px sm:text-11px font-mono ${textMuted}`}>
                        {filteredLatest.length} Articles
                      </span>
                    </div>

                    <div className="space-y-2.5 sm:space-y-3 w-full max-w-full box-border">
                      {filteredLatest.map((post, idx) => (
                        <div
                          key={post.id}
                          onClick={() => {
                            playSubtleClickSound();
                            setSelectedPost(post);
                          }}
                          className={`p-2.5 sm:p-3 rounded-xl hover:bg-[#1A1D24] transition-all cursor-pointer group flex items-start gap-3 border-b ${
                            idx === filteredLatest.length - 1 ? 'border-transparent' : borderCol
                          } pb-2.5 sm:pb-3 w-full max-w-full box-border min-w-0`}
                        >
                          {/* Left Compact Thumbnail */}
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${post.thumbnailGradient} shrink-0 flex items-center justify-center text-white text-12px font-mono font-bold shadow-xs group-hover:scale-105 transition-transform mt-0.5`}
                          >
                            {post.category === 'Color & VFX' ? (
                              <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            ) : post.category === 'Motion Design' ? (
                              <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            ) : post.category === 'Industry News' ? (
                              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            ) : (
                              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            )}
                          </div>

                          {/* Right Details */}
                          <div className="space-y-1 min-w-0 flex-1 text-left">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] font-mono flex-wrap">
                              <span
                                className="font-semibold uppercase tracking-wider text-white px-1.5 py-0.5 rounded text-[10px] shrink-0"
                                style={{ backgroundColor: post.badgeColor }}
                              >
                                {post.category}
                              </span>
                              <span className={textMuted}>•</span>
                              <span className={textMuted}>{post.readTime}</span>
                            </div>

                            <h4 className={`text-[14px] sm:text-14px font-bold ${textHeading} group-hover:text-[#E11D48] transition-colors leading-[1.4] mb-1 text-left line-clamp-2`}>
                              {post.title}
                            </h4>

                            <p className={`text-[12px] sm:text-11px ${textMuted} line-clamp-2 sm:truncate leading-normal text-left`}>
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* SECTION 1: "Editor's Choice" (Mobile 1-Column Feed, Desktop 3-Column Grid) */}
                <section className="space-y-4 sm:space-y-6 pt-2 sm:pt-4 w-full max-w-full box-border">
                  <div className={`flex items-center justify-between border-b ${borderCol} pb-2.5 sm:pb-3`}>
                    <div className="text-left">
                      <span className="text-[10px] sm:text-11px font-mono text-[#E11D48] uppercase tracking-wider font-extrabold block">
                        CURATED DISPATCHES
                      </span>
                      <h3 className={`text-18px sm:text-24px font-extrabold ${textHeading} tracking-tight font-serif`}>
                        Editor's Choice
                      </h3>
                    </div>
                    <span className={`text-11px sm:text-12px font-mono ${textMuted}`}>Deep-Dive Articles</span>
                  </div>

                  {/* 1-column feed on mobile (<768px), 2-col on md, 3-col on lg */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full box-border">
                    {filteredEditorsChoice.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          playSubtleClickSound();
                          setSelectedPost(post);
                        }}
                        className={`blog-card-container rounded-[12px] sm:rounded-[16px] ${bgCard} border ${borderCol} hover:border-[#E11D48] transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-sm w-full max-w-full box-border`}
                      >
                        <div className="space-y-2.5 sm:space-y-3 text-left w-full max-w-full box-border">
                          {/* Card Cover Preview */}
                          <div
                            className={`w-full h-28 sm:h-36 rounded-lg sm:rounded-xl bg-gradient-to-br ${post.coverGradient} border ${borderCol} relative p-3 sm:p-4 flex items-end justify-between overflow-hidden group-hover:scale-[1.02] transition-transform`}
                          >
                            <span
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] font-semibold uppercase tracking-wider text-white shadow-xs shrink-0"
                              style={{ backgroundColor: post.badgeColor }}
                            >
                              {post.category}
                            </span>
                            <span className="text-[10px] sm:text-11px font-mono text-white/90 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded shrink-0">
                              {post.readTime}
                            </span>
                          </div>

                          <div className={`text-[10px] sm:text-11px font-mono ${textMuted}`}>
                            By {post.author || 'Tamim'} • {post.date}
                          </div>

                          <h4
                            className={`text-[16px] sm:text-17px font-bold ${textHeading} group-hover:text-[#E11D48] transition-colors leading-[1.4] mb-2 font-serif text-left blog-text-wrap`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {post.title}
                          </h4>

                          <p
                            className={`text-[13px] sm:text-14px ${textMuted} leading-[1.5] sm:leading-[1.7] line-clamp-3 text-left blog-text-wrap`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {post.excerpt}
                          </p>
                        </div>

                        <div className={`pt-2.5 sm:pt-3 border-t ${borderCol} flex items-center justify-between text-11px sm:text-12px font-bold text-[#E11D48] transition-colors`}>
                          <span>Read Editorial</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 2: "Technical Breakdown" (Horizontal Scrollable Feed) */}
                <section className="space-y-4 sm:space-y-6 pt-2 sm:pt-4 w-full max-w-full box-border">
                  <div className={`flex items-center justify-between border-b ${borderCol} pb-2.5 sm:pb-3`}>
                    <div className="text-left">
                      <span className="text-[10px] sm:text-11px font-mono text-[#2563EB] uppercase tracking-wider font-extrabold block">
                        TECH &amp; WORKFLOW BENCHMARKS
                      </span>
                      <h3 className={`text-18px sm:text-24px font-extrabold ${textHeading} tracking-tight font-serif`}>
                        Technical Breakdown
                      </h3>
                    </div>

                    {/* Carousel Navigation Arrows */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => scrollCarousel('left')}
                        type="button"
                        aria-label="Scroll Carousel Left"
                        className={`p-1.5 sm:p-2 rounded-full ${bgCard} border ${borderCol} ${textHeading} hover:border-[#2563EB] hover:text-[#2563EB] transition-all cursor-pointer`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollCarousel('right')}
                        type="button"
                        aria-label="Scroll Carousel Right"
                        className={`p-1.5 sm:p-2 rounded-full ${bgCard} border ${borderCol} ${textHeading} hover:border-[#2563EB] hover:text-[#2563EB] transition-all cursor-pointer`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Carousel Container */}
                  <div
                    ref={carouselRef}
                    className="flex items-stretch gap-3.5 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth w-full max-w-full box-border"
                  >
                    {filteredTech.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          playSubtleClickSound();
                          setSelectedPost(post);
                        }}
                        className={`blog-card-container min-w-[270px] sm:min-w-[340px] max-w-[360px] snap-start rounded-[12px] sm:rounded-[16px] ${bgCard} border ${borderCol} hover:border-[#2563EB] transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4 cursor-pointer group shadow-sm shrink-0 box-border`}
                      >
                        <div className="space-y-2.5 sm:space-y-3 text-left w-full max-w-full box-border">
                          <div className="flex items-center justify-between text-[10px] sm:text-11px font-mono">
                            <span
                              className="px-2 py-0.5 rounded font-semibold sm:font-extrabold uppercase tracking-wider text-white shrink-0"
                              style={{ backgroundColor: post.badgeColor }}
                            >
                              {post.category}
                            </span>
                            <span className={textMuted}>{post.readTime}</span>
                          </div>

                          <h4
                            className={`text-[15px] sm:text-[16px] font-bold ${textHeading} group-hover:text-[#2563EB] transition-colors leading-[1.4] mb-2 font-serif text-left blog-text-wrap`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {post.title}
                          </h4>

                          <p
                            className={`text-[13px] sm:text-14px ${textMuted} leading-[1.5] sm:leading-[1.7] line-clamp-3 text-left blog-text-wrap`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {post.excerpt}
                          </p>
                        </div>

                        <div className={`pt-2.5 sm:pt-3 border-t ${borderCol} flex items-center justify-between text-11px sm:text-12px font-mono ${textMuted} group-hover:${textHeading} transition-colors`}>
                          <span>{post.date}</span>
                          <span className="text-[#2563EB] font-bold flex items-center gap-1">
                            Explore <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 3: "Subscribe to Updates" Newsletter Capture Card */}
                <section className={`blog-card-container p-4 sm:p-10 rounded-[12px] sm:rounded-[20px] ${bgCard} border ${borderCol} relative overflow-hidden space-y-4 sm:space-y-6 mt-8 sm:mt-12 shadow-sm w-full max-w-full box-border`}>
                  <div className="relative z-10 max-w-xl space-y-2 sm:space-y-3 text-left w-full max-w-full box-border">
                    <span className="text-[10px] sm:text-11px font-mono text-[#E11D48] uppercase tracking-wider font-extrabold block">
                      DAILY EDITORIAL DISPATCHES
                    </span>
                    <h3 className={`text-18px sm:text-28px font-black ${textHeading} tracking-tight font-serif`}>
                      Subscribe to Journal Updates
                    </h3>
                    <p className={`text-13px sm:text-14px ${textMuted} leading-relaxed`}>
                      Get weekly editorial dispatches on SaaS video editing, color grading techniques, After Effects benchmarks, and motion design theory delivered straight to your inbox.
                    </p>
                  </div>
                  <form onSubmit={handleSubscribeSubmit} className="relative z-10 flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-md w-full">
                    <div className="relative flex-1">
                      <Mail className={`w-4 h-4 ${textMuted} absolute left-3.5 top-1/2 -translate-y-1/2`} />
                      <input
                        type="email"
                        value={subscriberEmail}
                        onChange={(e) => {
                          setSubscriberEmail(e.target.value);
                          if (subscribeStatus === 'error') setSubscribeStatus('idle');
                        }}
                        placeholder="Enter your email address..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-full bg-[#0B0C0E] border-[#2A2E39] text-[#ECF0F6] border text-12px sm:text-13px placeholder-[#8A94A6] focus:outline-none focus:border-[#E11D48] transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-12px sm:text-13px transition-all inline-flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-md"
                    >
                      {subscribeStatus === 'success' ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Subscribed!</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                  {subscribeStatus === 'error' && (
                    <p className="text-11px sm:text-12px text-rose-500 font-mono text-left">Please enter a valid email address.</p>
                  )}
                </section>
              </>
            )}
          </main>
        )}
      </div>
    </AnimatePresence>
  );
};
