import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Layers, 
  FileVideo, 
  Music, 
  Film, 
  Check, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Search,
  Filter,
  ExternalLink,
  SlidersHorizontal,
  Package,
  FileCode2
} from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { applyPageSeo } from '../utils/seo';
import { usePortfolio } from '../context/PortfolioContext';

export interface AssetPack {
  id: string;
  title: string;
  category: 'Motion Templates' | 'Color Profiles' | 'Audio Foley' | 'Typography';
  format: string;
  filesCount: string;
  size: string;
  description: string;
  specs: string[];
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  badge?: string;
  recommendedFor: string;
}

const ASSET_PACKS: AssetPack[] = [
  {
    id: 'saas-ui-rig',
    title: 'SaaS Dynamic UI Animation Rig',
    category: 'Motion Templates',
    format: 'AE & Premiere (.aep, .mogrt)',
    filesCount: '18 Compositions',
    size: '142 MB',
    description: 'Precision spring physics, responsive window frames, cursor interactions, and fluid mockups designed specifically for SaaS product launches and demo walkthroughs.',
    specs: ['60 FPS Native', 'Vector Resizable', 'Auto-Fit Padding', 'After Effects 2024+'],
    icon: Layers,
    tags: ['After Effects', 'MOGRT', '60 FPS', 'SaaS'],
    badge: 'Popular',
    recommendedFor: 'Product hunt launches, onboarding loops, landing page motion.'
  },
  {
    id: 'cinematic-luts',
    title: 'Cinematic Clean Commercial LUTs',
    category: 'Color Profiles',
    format: '33x33 Cube (.cube)',
    filesCount: '12 LUT Profiles',
    size: '48 MB',
    description: 'Color Space Transform compatible film emulations calibrated for Sony S-Log3, Arri LogC, and Apple Log footage with natural skin tone roll-off and filmic contrast.',
    specs: ['Rec.709 & DWG', '33-Point Precision', 'Zero Banding', 'DaVinci & Premiere'],
    icon: Film,
    tags: ['DaVinci Resolve', 'Premiere', 'Rec.709', 'Color Grading'],
    badge: 'Essential',
    recommendedFor: 'Brand commercials, founder interview grades, cinematic B-roll.'
  },
  {
    id: 'ui-sfx-stems',
    title: 'High-Bitrate UI & Haptic Sound Pack',
    category: 'Audio Foley',
    format: '24-bit / 96kHz WAV',
    filesCount: '85 Sound FX',
    size: '210 MB',
    description: 'Crisp micro-interaction clicks, dynamic low-end whooshes, smooth riser sweeps, and tech swooshes tailored for modern product trailers without clipping.',
    specs: ['24-bit / 96kHz', 'Broadcast WAV', 'iXML Tagged', 'Uncompressed'],
    icon: Music,
    tags: ['Uncompressed WAV', 'Commercial Use', 'Foley', 'Sound Design'],
    badge: 'Studio Grade',
    recommendedFor: 'UI click syncing, teaser transitions, kinetic typography timing.'
  },
  {
    id: 'kinetic-typography',
    title: 'Kinetic Product Title Presets',
    category: 'Typography',
    format: 'Motion Presets (.ffx, .mogrt)',
    filesCount: '24 Presets',
    size: '64 MB',
    description: 'Fast-paced typographic stings, editorial lower thirds, and tracking transitions configured for modern European SaaS promotional pacing.',
    specs: ['Auto-Tracking', 'Responsive Time Stretch', 'Multi-Language UTF-8', 'Zero Plug-ins'],
    icon: FileVideo,
    tags: ['Typography', 'Auto-Resize', 'MOGRT', 'Editorial'],
    badge: 'New 2026',
    recommendedFor: 'Social video hooks, value prop highlights, feature callouts.'
  }
];

interface AssetsPageProps {
  onBackToHome: () => void;
  onOpenInquiry?: (brief: string) => void;
}

export const AssetsPage: React.FC<AssetsPageProps> = ({
  onBackToHome,
  onOpenInquiry,
}) => {
  const { assetPacks: dynamicPacks } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedSet, setDownloadedSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    applyPageSeo('assets');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = ['All', 'Motion Templates', 'Color Profiles', 'Audio Foley', 'Typography'];

  const allPacks: AssetPack[] = dynamicPacks.length > 0
    ? dynamicPacks.map((dp) => {
        const existing = ASSET_PACKS.find(p => p.id === dp.id);
        return {
          ...dp,
          category: dp.category as any,
          icon: existing?.icon || Package
        };
      })
    : ASSET_PACKS;

  const filteredPacks = allPacks.filter((pack) => {
    const matchesCategory = activeCategory === 'All' || pack.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pack.format.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (pack: AssetPack) => {
    playSubtleClickSound();
    setDownloadingId(pack.id);

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedSet((prev) => new Set(prev).add(pack.id));

      // Real downloadable markdown instructions and license manifest
      const blob = new Blob(
        [
          `# ${pack.title}\n\n` +
          `**Category:** ${pack.category}\n` +
          `**Format:** ${pack.format}\n` +
          `**Files:** ${pack.filesCount} (${pack.size})\n` +
          `**License:** Commercial Royalty-Free by W.H. Tamim (whtamim.work)\n\n` +
          `## Specifications\n` +
          pack.specs.map(s => `- ${s}`).join('\n') + `\n\n` +
          `## Description\n${pack.description}\n\n` +
          `## Best For\n${pack.recommendedFor}\n\n` +
          `---\n` +
          `Thank you for downloading studio-grade motion assets by W.H. Tamim.\n` +
          `For full custom project inquiries & bespoke motion design: https://whtamim.work/#contact\n`
        ],
        { type: 'text/markdown;charset=utf-8' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pack.id}-whtamim-pack.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 800);
  };

  const handleCustomRequest = () => {
    playSubtleClickSound();
    if (onOpenInquiry) {
      onOpenInquiry('Hi Tamim, I would like to inquire about bespoke motion design templates and assets for our brand.');
    } else {
      onBackToHome();
      setTimeout(() => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <SectionReveal
      id="assets-page"
      as="div"
      className="min-h-screen pt-[120px] pb-[120px] px-6 sm:px-12 md:px-16 lg:px-24 w-full bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-neutral-100 transition-colors duration-300"
      style={{ fontFamily: 'var(--apple-font, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif)' }}
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => {
              playSubtleClickSound();
              onBackToHome();
            }}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-[#0066FF] dark:hover:text-[#0A84FF] transition-colors py-1.5 px-3 rounded-full bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200/80 dark:hover:bg-white/[0.1] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Commercial Royalty-Free Cleared</span>
          </div>
        </div>

        {/* Page Top Hero Header */}
        <div className="text-left mb-10 sm:mb-14 page-header">
          <TextReveal as="span" delay={0.02} yOffset={10} className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#0066ff] dark:text-[#3B82F6] block mb-2 font-mono">
            CREATIVE TOOLS & RESOURCES
          </TextReveal>
          <TextReveal as="h1" delay={0.05} yOffset={16} className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight text-neutral-900 dark:text-white font-bold leading-[1.12] mb-4 max-w-3xl">
            Motion Design & Video Assets.
          </TextReveal>
          <TextReveal as="p" delay={0.1} yOffset={16} className="text-[15px] sm:text-[17px] text-[#64748B] dark:text-[#94A3B8] max-w-2xl leading-relaxed font-normal">
            Curated UI motion presets, color grading film emulations, and studio-grade sound stems crafted specifically for high-end SaaS product storytelling.
          </TextReveal>
        </div>

        {/* Controls Bar: Category Filters & Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-200/80 dark:border-white/[0.08]">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playSubtleClickSound();
                    setActiveCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                      : 'bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-white/[0.1]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search assets, formats, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-[13px] rounded-full bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200/80 dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#0066FF] dark:focus:border-[#0A84FF] transition-colors"
            />
          </div>
        </div>

        {/* Assets Grid */}
        {filteredPacks.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-neutral-50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800">
            <Package className="w-10 h-10 text-neutral-400 mb-3" />
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              No asset packs found
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Try changing your search query or selecting another category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 mb-16">
            {filteredPacks.map((pack, idx) => {
              const Icon = pack.icon;
              const isDownloading = downloadingId === pack.id;
              const isDownloaded = downloadedSet.has(pack.id);

              return (
                <TextReveal key={pack.id} delay={0.05 * idx} yOffset={20}>
                  <div className="group bg-white dark:bg-[#161618] border border-black/[0.08] dark:border-white/[0.08] rounded-[24px] p-7 sm:p-8 relative flex flex-col justify-between h-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:border-[#0066ff]/40 dark:hover:border-[#3B82F6]/60 hover:shadow-[0_20px_40px_rgba(0,102,255,0.08)]">
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

                      <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight mb-3 group-hover:text-[#0066ff] dark:group-hover:text-[#60a5fa] transition-colors">
                        {pack.title}
                      </h2>

                      <p className="text-[14px] leading-relaxed text-[#475569] dark:text-[#94A3B8] mb-5">
                        {pack.description}
                      </p>

                      {/* Key Technical Specs */}
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {pack.specs.map((spec, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[12px] text-neutral-600 dark:text-neutral-400 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] dark:bg-[#3B82F6] shrink-0 opacity-70" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {pack.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
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
                        className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-[#0066ff] dark:bg-white dark:text-neutral-900 dark:hover:bg-[#3B82F6] dark:hover:text-white text-white text-[13px] font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Preparing...</span>
                          </>
                        ) : isDownloaded ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Downloaded</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download Pack</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </TextReveal>
              );
            })}
          </div>
        )}

        {/* Commercial Licensing & Bespoke Request Section */}
        <div className="rounded-3xl p-8 sm:p-10 bg-neutral-50 dark:bg-[#121214] border border-neutral-200/80 dark:border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#0066ff] dark:text-[#3B82F6] mb-2 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Studio Quality Guarantee</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Need custom animation rigs or bespoke templates?
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I develop tailored UI animation presets, custom MOGRT brand kits, and sound identity libraries for design systems and SaaS marketing teams.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleCustomRequest}
              type="button"
              className="px-6 py-3 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold transition-all cursor-pointer shadow-md w-full md:w-auto text-center"
            >
              Request Custom Assets
            </button>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
};
