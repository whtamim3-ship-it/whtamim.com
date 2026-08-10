import React, { useState } from 'react';
import { Calculator, X, Clock, Cpu, Layers, Monitor, Film, Workflow, MonitorPlay, Clapperboard, Sliders, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';

interface ProjectEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onPreFillInquiry: (brief: string) => void;
}

const DURATION_STEPS = [
  { value: 15, label: '15s', title: '15 Seconds', sub: 'Short Teaser' },
  { value: 30, label: '30s', title: '30 Seconds', sub: 'Punchy Ad' },
  { value: 60, label: '60s', title: '60 Seconds', sub: 'Standard' },
  { value: 90, label: '90s+', title: '90s+ Deep', sub: 'Deep Story' },
];

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  isOpen,
  onClose,
  onPreFillInquiry,
}) => {
  const [projectType, setProjectType] = useState<'saas' | 'ui' | 'demo' | 'doc'>('saas');
  const [durationIndex, setDurationIndex] = useState<number>(2); // Default 60s (index 2)
  const [complexity, setComplexity] = useState<'standard' | 'advanced' | 'cinematic'>('advanced');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('1080p');
  const [formats, setFormats] = useState<string[]>(['16:9']);
  const [speed] = useState<'standard' | 'rush'>('standard');

  useBodyScrollLock(isOpen);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDurationObj = DURATION_STEPS[durationIndex] || DURATION_STEPS[2];

  const toggleFormat = (fmt: string) => {
    playSubtleClickSound();
    if (formats.includes(fmt)) {
      if (formats.length > 1) {
        setFormats(formats.filter((f) => f !== fmt));
      }
    } else {
      setFormats([...formats, fmt]);
    }
  };

  // Selection Glow helper style
  const getCardStyle = (isSelected: boolean) => {
    if (isSelected) {
      return {
        border: '2px solid #0066ff',
        background: 'rgba(0, 102, 255, 0.05)',
        boxShadow: '0 0 16px rgba(0, 102, 255, 0.12)',
      };
    }
    return {};
  };

  // Calculate live estimate
  const getBaseCost = () => {
    switch (projectType) {
      case 'saas': return 1200;
      case 'ui': return 800;
      case 'demo': return 1000;
      case 'doc': return 1500;
      default: return 1200;
    }
  };

  const getDurationMultiplier = () => {
    switch (currentDurationObj.value) {
      case 15: return 0.6;
      case 30: return 0.8;
      case 60: return 1.0;
      case 90: return 1.35;
      default: return 1.0;
    }
  };

  const getComplexityMultiplier = () => {
    switch (complexity) {
      case 'standard': return 0.9;
      case 'advanced': return 1.1;
      case 'cinematic': return 1.35;
      default: return 1.1;
    }
  };

  const getResolutionAddon = () => {
    switch (resolution) {
      case '720p': return 0;
      case '1080p': return 300;
      default: return 300;
    }
  };

  const baseCost = getBaseCost();
  const durMult = getDurationMultiplier();
  const compMult = getComplexityMultiplier();
  const resAddon = getResolutionAddon();
  const formatAddon = (formats.length - 1) * 600;
  const speedAddon = speed === 'rush' ? 1200 : 0;

  const minEstimate = Math.round((baseCost * durMult * compMult + resAddon + formatAddon + speedAddon) * 0.9);
  const maxEstimate = Math.round((baseCost * durMult * compMult + resAddon + formatAddon + speedAddon) * 1.15);

  // Calculate rendering time in minutes
  const getBaseRenderMinutes = () => {
    switch (complexity) {
      case 'standard': return 25; // 25 mins for clean 2D UI
      case 'advanced': return 110; // 110 mins for 3D UI & depth cameras
      case 'cinematic': return 320; // 320 mins for raytraced C4D/Octane
      default: return 110;
    }
  };

  const getResRenderMultiplier = () => {
    switch (resolution) {
      case '720p': return 0.5;
      case '1080p': return 0.7;
      default: return 0.7;
    }
  };

  const baseMinutes = getBaseRenderMinutes();
  const resMult = getResRenderMultiplier();
  const formatMult = 1 + (formats.length - 1) * 0.3;
  const totalRenderMinutes = Math.round(baseMinutes * durMult * resMult * formatMult);

  const renderHours = Math.floor(totalRenderMinutes / 60);
  const renderMins = totalRenderMinutes % 60;
  const formattedRenderTime = renderHours > 0 
    ? `~${renderHours} hr${renderHours > 1 ? 's' : ''}${renderMins > 0 ? ` ${renderMins}m` : ''}`
    : `~${renderMins} mins`;

  // Calculate approximate frame stats for the UI
  const totalSeconds = currentDurationObj.value;
  const totalFrames = totalSeconds * 60 * formats.length; // 60fps master
  const avgTimePerFrame = (totalRenderMinutes * 60 / totalFrames).toFixed(1);

  // Normalize progress percentage (say 1200 mins is 100%)
  const progressPercent = Math.min(100, Math.max(12, Math.round((totalRenderMinutes / 1200) * 100)));

  const handleExportBrief = () => {
    const brief = `Configured Scope: ${projectType.toUpperCase()} Video (${currentDurationObj.label}), Complexity: ${complexity.toUpperCase()}, Resolution: ${resolution.toUpperCase()}, Formats: ${formats.join(
      ', '
    )}, Speed: ${speed.toUpperCase()}. Estimated Budget Range: $${minEstimate.toLocaleString()} – $${maxEstimate.toLocaleString()} (Est. Render: ${formattedRenderTime}).`;
    onPreFillInquiry(brief);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#000000]/70 dark:bg-[#000000]/80 backdrop-blur-xl animate-in fade-in duration-200 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="relative w-full max-w-3xl rounded-[20px] sm:rounded-[24px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xl overflow-hidden text-[#1D1D1F] dark:text-[#F5F5F7] flex flex-col max-h-[94vh] sm:max-h-[85vh] my-auto">
        
        {/* Header */}
        <div className="px-3 py-2 sm:px-6 sm:py-3.5 bg-[#F5F5F7] dark:bg-[#121214] border-b border-[#f3f4f6] dark:border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-[22px] h-[22px] sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center border border-[#0066FF]/20 shrink-0">
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h3 className="text-[13px] sm:text-[16px] leading-[1.2] font-semibold text-[#111827] dark:text-[#F5F5F7] tracking-[-0.015em]">
                Project Scope &amp; Budget Calculator
              </h3>
              <p className="text-[10px] sm:text-[11px] font-normal text-[#6b7280] dark:text-[#98989D] mt-[1px]">Interactive scope matrix &amp; real-time production estimator.</p>
            </div>
          </div>
          <button onClick={onClose} className="w-[22px] h-[22px] sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-neutral-200/60 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors cursor-pointer shrink-0">
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Form Body - Viewport Optimized for Desktop One-Screen Fit */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-3.5 sm:space-y-4 flex-1 scrollbar-thin">
          
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.05em] sm:tracking-[0.08em] text-[#71717a] dark:text-[#a1a1aa] mb-1.5 font-semibold option-section-title">
              1. Primary Deliverable Type
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {[
                { id: 'saas', title: 'SaaS Launch Commercial', sub: 'High-converting 60s trailer', icon: Clapperboard },
                { id: 'ui', title: 'Motion Design & UI Rigging', sub: 'Figma to AE micro-animations', icon: Workflow },
                { id: 'demo', title: 'Product Demo & Explainer', sub: 'Comprehensive walkthrough film', icon: MonitorPlay },
                { id: 'doc', title: 'Brand & Founder Doc', sub: 'Cinematic live action + motion', icon: Film },
              ].map((item) => {
                const isSelected = projectType === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      playSubtleClickSound();
                      setProjectType(item.id as any);
                    }}
                    className={`option-card h-[42px] sm:h-auto py-0 px-2.5 sm:p-3 rounded-lg sm:rounded-xl text-left transition-all duration-150 flex items-center gap-2.5 cursor-pointer ${
                      isSelected ? 'selected' : ''
                    }`}
                  >
                    <div className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#0066FF]/20 text-[#3b82f6]'
                        : 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-[#f4f4f5]'
                    }`}>
                      <IconComponent className="w-4 h-4 shrink-0 transition-colors" style={{ color: 'inherit' }} />
                    </div>
                    <div className="min-w-0">
                      <div className={`font-medium sm:font-semibold text-[13px] tracking-[-0.015em] truncate option-title ${isSelected ? 'text-[#3b82f6]' : 'text-[#18181b] dark:text-[#f4f4f5]'}`}>{item.title}</div>
                      <div className="option-sub text-[11px] truncate hidden sm:block mt-0.5">{item.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Target Video Duration */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] uppercase tracking-[0.08em] text-[#71717a] dark:text-[#a1a1aa] font-semibold flex items-center gap-1.5 option-section-title">
                <Sliders className="w-3.5 h-3.5 text-[#0066FF]" />
                2. Target Video Duration
              </label>
              <span className="text-12px font-bold font-mono text-[#0066FF] bg-[#0066FF]/10 px-2 py-0.5 rounded-full border border-[#0066FF]/20">
                {currentDurationObj.title}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
              {DURATION_STEPS.map((step, idx) => {
                const isActive = durationIndex === idx;
                return (
                  <button
                    key={step.value}
                    type="button"
                    onClick={() => {
                      playSubtleClickSound();
                      setDurationIndex(idx);
                    }}
                    className={`option-card h-[40px] w-full rounded-lg font-bold text-[14px] cursor-pointer transition-all duration-150 ${
                      isActive ? 'selected' : ''
                    }`}
                  >
                    {step.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Visual Complexity */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.08em] text-[#71717a] dark:text-[#a1a1aa] mb-2 font-semibold flex items-center gap-1.5 option-section-title">
              <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
              3. Visual Complexity &amp; Motion Density
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {[
                { id: 'standard', label: 'Standard 2D Motion', mobileLabel: '2D Motion', sub: 'Clean vector UI & easing', isFullWidthMobile: false },
                { id: 'advanced', label: '3D UI Rigging & Depth', mobileLabel: '3D UI Rigging', sub: 'Camera moves & lighting', isFullWidthMobile: false },
                { id: 'cinematic', label: 'Cinematic Raytracing', mobileLabel: 'Cinematic Raytracing', sub: 'Cinema 4D / Octane physics', isFullWidthMobile: true },
              ].map((item) => {
                const isSelected = complexity === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      playSubtleClickSound();
                      setComplexity(item.id as any);
                    }}
                    className={`option-card h-[38px] sm:h-auto py-0 sm:py-2.5 px-2 sm:px-3 text-center transition-all duration-150 flex flex-col items-center justify-center text-[13px] font-semibold cursor-pointer ${
                      item.isFullWidthMobile ? 'col-span-2 sm:col-span-1' : 'col-span-1'
                    } ${isSelected ? 'selected' : ''}`}
                  >
                    <span className="sm:hidden option-title">{item.mobileLabel}</span>
                    <span className="hidden sm:inline tracking-[-0.015em] font-medium option-title">{item.label}</span>
                    <div className="hidden sm:block text-[11px] font-normal truncate mt-0.5 option-sub">{item.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Resolution & Multi-Format Cuts Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Resolution */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.08em] text-[#71717a] dark:text-[#a1a1aa] mb-1.5 font-semibold flex items-center gap-1.5 option-section-title">
                <Monitor className="w-3.5 h-3.5 text-[#0066FF]" />
                4. Master Resolution
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '720p', label: '720p HD', sub: 'Fast Web' },
                  { id: '1080p', label: '1080p Full HD', sub: 'Master Broadcast' },
                ].map((item) => {
                  const isSelected = resolution === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        playSubtleClickSound();
                        setResolution(item.id as any);
                      }}
                      className={`option-card h-[38px] sm:h-auto py-0 sm:py-2 px-2 text-center transition-all duration-150 flex flex-col items-center justify-center font-bold text-[13px] cursor-pointer ${
                        isSelected ? 'selected' : ''
                      }`}
                    >
                      <div className="text-[13px] font-bold leading-none tracking-[-0.015em] option-title">{item.label}</div>
                      <div className="hidden sm:block text-[10px] font-normal mt-0.5 option-sub">{item.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formats */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.08em] text-[#71717a] dark:text-[#a1a1aa] mb-1.5 font-semibold option-section-title">
                5. Deliverable Cuts
              </label>
              <div className="flex gap-1.5">
                {[
                  { id: '16:9', label: '16:9 Web' },
                  { id: '9:16', label: '9:16 Vertical' },
                  { id: '1:1', label: '1:1 Square' },
                ].map((fmt) => {
                  const isSelected = formats.includes(fmt.id);
                  return (
                    <button
                      type="button"
                      key={fmt.id}
                      onClick={() => toggleFormat(fmt.id)}
                      className={`option-card flex-1 px-1 sm:px-2 h-[36px] sm:min-h-[44px] rounded-xl text-[12px] text-center font-medium transition-all duration-150 cursor-pointer flex items-center justify-center ${
                        isSelected ? 'selected' : ''
                      }`}
                    >
                      {fmt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Render Compute Card (NVIDIA RTX 5060 Hardware Rig Preset) */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0B0C10] text-white border border-[#00f0ff]/20 space-y-2.5 shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#00f0ff]/10 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                  <Clock className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[12px] sm:text-14px font-medium sm:font-semibold text-white tracking-[-0.015em]">Estimated Rendering Time</h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 font-medium">
                      Live CUDA
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-11px text-[#a1a1aa] font-mono">
                    {resolution.toUpperCase()} • {complexity} • {formats.length} cut{formats.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14px] sm:text-[20px] font-semibold sm:font-bold font-mono tracking-tight" style={{ color: '#00f0ff' }}>
                  {formattedRenderTime}
                </div>
                <span className="text-[10px] font-mono text-[#a1a1aa] block font-normal">
                  <span style={{ color: '#00f0ff' }}>{totalFrames.toLocaleString()}</span> frames • <span style={{ color: '#00f0ff' }}>{avgTimePerFrame}s</span> / frame
                </span>
              </div>
            </div>

            {/* Visual Progress Bar with Shimmer */}
            <div className="space-y-1.5 relative z-10">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#a1a1aa]">
                <span>Fast 2D</span>
                <span className="font-medium" style={{ color: '#00f0ff' }}>{progressPercent}% Compute Intensity</span>
                <span>Raytraced 3D</span>
              </div>
              
              <div className="w-full h-2.5 rounded-full bg-neutral-900 border border-neutral-800 overflow-hidden p-0.5 relative shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-[#0066FF] via-[#00f0ff] to-[#00ffcc] relative overflow-hidden transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Target Hardware Badge: NVIDIA RTX 5060 / CUDA Accelerated */}
            <div className="flex items-center justify-between pt-1.5 border-t border-neutral-800/80 text-[10px] text-[#a1a1aa] font-mono relative z-10">
              <span className="flex items-center gap-1.5 truncate font-normal">
                <Cpu className="w-3.5 h-3.5 shrink-0" style={{ color: '#00f0ff' }} />
                <span>Target Rig: <span style={{ color: '#00f0ff' }}>Local High-Performance Studio Rig (NVIDIA RTX 5060 / CUDA Accelerated)</span></span>
              </span>
              <span className="font-medium shrink-0 hidden sm:inline ml-2" style={{ color: '#00f0ff' }}>ProRes 422 HQ</span>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Footer CTA Section - Always Visible on Desktop & Mobile */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-[#F5F5F7] dark:bg-[#121214] border-t border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase text-[#8E8E93] block font-semibold tracking-[0.08em]">
              Estimated Project Investment
            </span>
            <div
              className="font-mono tracking-[-0.02em] font-semibold sm:font-bold"
              style={{ fontSize: '18px', color: '#0066FF' }}
            >
              ${minEstimate.toLocaleString()} – ${maxEstimate.toLocaleString()}
            </div>
            <p className="text-[11px] text-[#86868B] dark:text-[#98989D] hidden sm:block">Scripting, motion design, {resolution.toUpperCase()} render &amp; master cuts included.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportBrief}
            className="w-full sm:w-auto px-6 h-[42px] sm:h-auto sm:py-3 rounded-full bg-[#0066FF] text-white font-medium sm:font-semibold text-[13px] sm:text-14px hover:bg-[#0052cc] transition-all shadow-md hover:shadow-[0_0_16px_rgba(0,102,255,0.35)] shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Export Brief to Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default ProjectEstimator;


