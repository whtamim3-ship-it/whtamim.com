import React, { useState } from 'react';
import { Download, Sparkles, FolderDown, Layers, FileVideo, Music, Film, Check, ArrowUpRight } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';

interface AssetPack {
  id: string;
  title: string;
  category: string;
  format: string;
  filesCount: string;
  size: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  downloadUrl?: string;
  badge?: string;
}

const ASSET_PACKS: AssetPack[] = [
  {
    id: 'saas-ui-rig',
    title: 'SaaS Dynamic UI Animation Rig',
    category: 'Motion Template',
    format: 'AE & Premiere (.aep, .mogrt)',
    filesCount: '18 Compositions',
    size: '142 MB',
    description: 'Precision spring physics, responsive window frames, cursor interactions, and fluid mockups designed specifically for SaaS product launches.',
    icon: Layers,
    tags: ['After Effects', 'MOGRT', '60 FPS'],
    badge: 'Popular',
  },
  {
    id: 'cinematic-luts',
    title: 'Cinematic Clean Commercial LUTs',
    category: 'Color Profiles',
    format: '33x33 Cube (.cube)',
    filesCount: '12 LUT Profiles',
    size: '48 MB',
    description: 'Color Space Transform compatible film emulations calibrated for Sony S-Log3, Arri LogC, and Apple Log footage with natural skin tones.',
    icon: Film,
    tags: ['DaVinci Resolve', 'Premiere', 'Rec.709'],
    badge: 'Essential',
  },
  {
    id: 'ui-sfx-stems',
    title: 'High-Bitrate UI & Haptic Sound Pack',
    category: 'Audio Foley',
    format: '24-bit / 96kHz WAV',
    filesCount: '85 Sound FX',
    size: '210 MB',
    description: 'Crisp micro-interaction clicks, dynamic low-end whooshes, smooth riser sweeps, and tech swooshes tailored for product trailers.',
    icon: Music,
    tags: ['Uncompressed WAV', 'Commercial Use'],
    badge: 'Studio Grade',
  },
  {
    id: 'kinetic-typography',
    title: 'Kinetic Product Title Presets',
    category: 'Typography',
    format: 'Motion Presets (.ffx, .mogrt)',
    filesCount: '24 Presets',
    size: '64 MB',
    description: 'Fast-paced typographic stings, editorial lower thirds, and tracking transitions configured for modern European SaaS promo pacing.',
    icon: FileVideo,
    tags: ['Typography', 'Auto-Resize'],
    badge: 'New 2026',
  },
];

export const AssetsSection: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedSet, setDownloadedSet] = useState<Set<string>>(new Set());

  const handleDownload = (pack: AssetPack) => {
    playSubtleClickSound();
    setDownloadingId(pack.id);

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedSet((prev) => new Set(prev).add(pack.id));

      // Simulate a real file download by creating a blob text info file
      const blob = new Blob(
        [
          `# ${pack.title}\n` +
          `Category: ${pack.category}\n` +
          `Format: ${pack.format}\n` +
          `License: Commercial Royalty-Free by W.H. Tamim (whtamim.work)\n\n` +
          `Description: ${pack.description}\n\n` +
          `Thank you for downloading studio-grade motion assets by W.H. Tamim.\n` +
          `For full project inquiries & bespoke motion design: https://whtamim.work/#contact\n`
        ],
        { type: 'text/markdown' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pack.id}-whtamim-assets-pack.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <SectionReveal
      id="assets"
      className="w-full flex flex-col justify-center items-center py-16 sm:py-20 lg:py-24 border-t border-neutral-200/80 dark:border-neutral-800 bg-[#F8F9FA] dark:bg-[#0A0A0C] text-[#111827] dark:text-[#F5F5F7]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <TextReveal as="span" delay={0} yOffset={16} className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[2px] text-[#0066ff] dark:text-[#3B82F6] block mb-3 font-mono">
              Creative Tools & Resources
            </TextReveal>
            <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-[-1px] text-[#0F172A] dark:text-white leading-[1.15]">
              Motion Design & Video Assets.
            </TextReveal>
          </div>
          <TextReveal delay={0.16} yOffset={16}>
            <p className="text-[14px] sm:text-[15px] text-[#64748B] dark:text-[#94A3B8] max-w-md leading-relaxed">
              Curated UI motion presets, film emulation LUTs, and studio sound packs crafted for high-end digital products.
            </p>
          </TextReveal>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8">
          {ASSET_PACKS.map((pack, idx) => {
            const Icon = pack.icon;
            const isDownloading = downloadingId === pack.id;
            const isDownloaded = downloadedSet.has(pack.id);

            return (
              <TextReveal key={pack.id} delay={0.06 * idx} yOffset={20}>
                <div className="group bg-white dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] rounded-[24px] p-7 sm:p-8 relative flex flex-col justify-between h-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:border-[#0066ff]/30 dark:hover:border-[#3B82F6]/50 hover:shadow-[0_20px_40px_rgba(0,102,255,0.08)]">
                  {/* Top Bar with Icon & Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#0066ff]/10 dark:bg-[#3B82F6]/15 border border-[#0066ff]/20 dark:border-[#3B82F6]/30 flex items-center justify-center text-[#0066ff] dark:text-[#3B82F6] group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      {pack.badge && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide uppercase bg-neutral-100 dark:bg-white/[0.07] border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-neutral-300">
                          {pack.badge}
                        </span>
                      )}
                    </div>

                    <div className="mb-2">
                      <span className="text-[12px] font-mono text-[#0066ff] dark:text-[#3B82F6] font-medium tracking-wider uppercase">
                        {pack.category} • {pack.format}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight mb-3 group-hover:text-[#0066ff] dark:group-hover:text-[#60a5fa] transition-colors">
                      {pack.title}
                    </h3>

                    <p className="text-[14px] leading-relaxed text-[#475569] dark:text-[#94A3B8] mb-6">
                      {pack.description}
                    </p>
                  </div>

                  {/* Footer Stats & Download Action */}
                  <div className="pt-5 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-mono text-neutral-500 dark:text-neutral-400">
                        {pack.filesCount}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">•</span>
                      <span className="text-[12px] font-mono text-neutral-500 dark:text-neutral-400">
                        {pack.size}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDownload(pack)}
                      disabled={isDownloading}
                      type="button"
                      className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-[#0066ff] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#3B82F6] dark:hover:text-white text-white text-[13px] font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Preparing...</span>
                        </>
                      ) : isDownloaded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Get Pack</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </TextReveal>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
};
