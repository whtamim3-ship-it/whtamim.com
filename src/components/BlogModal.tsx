import React, { useState } from 'react';
import { X, BookOpen, Clock, ArrowUpRight, Sparkles, Tag, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
  coverImage?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Pacing & Rhythm in High-Converting SaaS Product Trailers',
    slug: 'pacing-rhythm-saas-trailers',
    excerpt: 'How micro-cuts, audio sync, and visual momentum turn complex software features into captivating, high-conversion video stories.',
    date: 'August 10, 2026',
    readTime: '5 min read',
    category: 'Motion Design',
    content: [
      'In modern B2B and SaaS marketing, video is no longer just decorative—it is the primary sales engine. However, the biggest mistake most product trailers make is treating software like a static slideshow rather than a living narrative.',
      '1. The First 3 Seconds: Establishing the Pain State',
      'The human brain processes visual cues in under 13 milliseconds. To capture immediate attention, start directly in motion with a dynamic UI interaction, dynamic typography, or a high-impact sound effect that introduces the core problem.',
      '2. Rhythmic Keyframing and Micro-Cuts',
      'Static screen recordings bore viewers. By applying custom cubic-bezier easing curves (such as cubic-bezier(0.22, 1, 0.36, 1)) to zoom ins, pan shots, and cursor movements, software interactions feel tactile, snappy, and responsive.',
      '3. SFX and Audio Layering',
      'Audio carries 50% of the emotional weight. Layering subtle UI clicks, risers, sub-bass drops, and interface swooshes synchronized precisely with visual keyframes gives digital interfaces physical weight.',
    ],
  },
  {
    id: 'post-2',
    title: 'Why 3D Motion Graphics Drive 3x Higher Engagement for Tech Products',
    slug: '3d-motion-graphics-tech-products',
    excerpt: 'Exploring how isometric 3D renders, floating glass UI layers, and cinematic lighting elevate tech brands above generic flat graphics.',
    date: 'July 28, 2026',
    readTime: '4 min read',
    category: '3D & VFX',
    content: [
      'As flat design becomes saturated, top-tier tech brands like Apple, Stripe, and Vercel leverage 3D spatial motion graphics to differentiate their physical and digital offerings.',
      '1. Spatial Depth & Glassmorphism',
      'By separating UI components into floating 3D layers in After Effects or Cinema 4D, viewers gain a spatial understanding of how complex platforms function seamlessly.',
      '2. Cinematic Lighting & Materials',
      'Reflective glass surfaces, ambient rim lights, and soft studio shadows create an aura of luxury and craftsmanship that elevates perceived product value.',
    ],
  },
  {
    id: 'post-3',
    title: 'The Anatomy of a 60-Second Commercial: Frame-by-Frame Breakdown',
    slug: 'anatomy-60-second-commercial',
    excerpt: 'A deep dive into narrative arc, color grading palettes, and sound design structures used in premium commercial video production.',
    date: 'June 18, 2026',
    readTime: '7 min read',
    category: 'Commercial Production',
    content: [
      'A great commercial is a masterclass in concise storytelling. Every single frame must serve a purpose: hook, build desire, demonstrate value, and trigger action.',
      '1. Hook (0–5s): Visual disruption and curiosity gap.',
      '2. Tension (5–20s): Amplifying the problem state with dark, high-contrast color grades.',
      '3. Resolution (20–45s): Bright, vibrant product showcase revealing effortless solutions.',
      '4. Call to Action (45–60s): High-contrast logo launch and memorable sonic identity sound mark.',
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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const handleClose = () => {
    playSubtleClickSound();
    setSelectedPost(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 text-[#1D1D1F] dark:text-[#F5F5F7]"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between shrink-0 bg-white/50 dark:bg-[#161618]/50 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              {selectedPost && (
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    setSelectedPost(null);
                  }}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-[#1D1D1F] dark:text-[#F5F5F7]"
                  title="Back to Articles"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div className="p-2.5 rounded-2xl bg-[#eff6ff] dark:bg-[#007AFF]/20 text-[#007AFF] dark:text-[#0A84FF]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase text-[#007AFF] dark:text-[#0A84FF] tracking-wider block">
                  CREATIVE INSIGHTS
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
                  {selectedPost ? 'Article Reader' : 'Blog & Editorial'}
                </h2>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {selectedPost ? (
              /* Single Article View */
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-12px font-mono text-[#86868B] dark:text-[#98989D]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] dark:text-[#0A84FF] font-semibold">
                      {selectedPost.category}
                    </span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white leading-tight">
                    {selectedPost.title}
                  </h1>
                </div>

                <div className="space-y-4 text-14px sm:text-15px leading-relaxed text-[#424245] dark:text-[#C8C8D0] border-t border-neutral-200/80 dark:border-neutral-800/80 pt-6">
                  {selectedPost.content.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {onPreFillInquiry && (
                  <div className="p-6 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-neutral-200/80 dark:border-neutral-800/80 mt-8 space-y-3">
                    <h4 className="text-15px font-bold text-[#1D1D1F] dark:text-white">
                      Want to apply these insights to your product video?
                    </h4>
                    <p className="text-13px text-[#6E6E73] dark:text-[#9E9EA8]">
                      Let's collaborate to build a commercial or SaaS demo video tailored for high engagement.
                    </p>
                    <button
                      onClick={() => {
                        playSubtleClickSound();
                        onClose();
                        onPreFillInquiry(`Hi Tamim, I read your article "${selectedPost.title}" and would like to discuss a video project.`);
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#007AFF] hover:bg-[#0052CC] text-white font-semibold text-13px transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Discuss a Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Articles List */
              <div className="grid grid-cols-1 gap-4">
                {BLOG_POSTS.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      playSubtleClickSound();
                      setSelectedPost(post);
                    }}
                    className="p-5 sm:p-6 rounded-2xl bg-[#F8F9FA] dark:bg-[#1C1C1E] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-[#007AFF] dark:hover:border-[#0A84FF] transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex items-center justify-between gap-4 text-12px font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] dark:text-[#0A84FF] font-semibold">
                        {post.category}
                      </span>
                      <span className="text-[#86868B] dark:text-[#98989D] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-16px sm:text-18px font-bold text-[#1D1D1F] dark:text-white group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-13px sm:text-14px text-[#6E6E73] dark:text-[#9E9EA8] mt-1.5 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-12px text-[#86868B] dark:text-[#98989D] pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                      <span>{post.date}</span>
                      <span className="text-[#007AFF] dark:text-[#0A84FF] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
