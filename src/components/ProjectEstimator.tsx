import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, X, Sparkles, ShieldAlert, Clock, Cpu, Layers, Monitor, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';

interface ProjectEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onPreFillInquiry: (brief: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  isOpen,
  onClose,
  onPreFillInquiry,
}) => {
  const [projectType, setProjectType] = useState<'saas' | 'ui' | 'demo' | 'doc'>('saas');
  const [duration, setDuration] = useState<'30s' | '60s' | '90s'>('60s');
  const [complexity, setComplexity] = useState<'standard' | 'advanced' | 'cinematic'>('advanced');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('1080p');
  const [formats, setFormats] = useState<string[]>(['16:9']);
  const [speed, setSpeed] = useState<'standard' | 'rush'>('standard');

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

  // Calculate live estimate
  const getBaseCost = () => {
    switch (projectType) {
      case 'saas': return 1200;
      case 'ui': return 800;
      case 'demo': return 1000;
      case 'doc': return 1500;
    }
  };

  const getDurationMultiplier = () => {
    switch (duration) {
      case '30s': return 0.8;
      case '60s': return 1.0;
      case '90s': return 1.35;
    }
  };

  const getComplexityMultiplier = () => {
    switch (complexity) {
      case 'standard': return 0.9;
      case 'advanced': return 1.1;
      case 'cinematic': return 1.35;
    }
  };

  const getResolutionAddon = () => {
    switch (resolution) {
      case '720p': return 0;
      case '1080p': return 300;
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
      case 'standard': return 30; // 30 mins for clean 2D UI
      case 'advanced': return 150; // 2.5 hours for 3D UI & depth cameras
      case 'cinematic': return 420; // 7 hours for raytraced C4D/Octane
    }
  };

  const getResRenderMultiplier = () => {
    switch (resolution) {
      case '1080p': return 0.7;
      case '4k': return 2.2;
      case '8k': return 5.5;
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
  const totalSeconds = duration === '30s' ? 30 : duration === '60s' ? 60 : 90;
  const totalFrames = totalSeconds * 60 * formats.length; // 60fps master
  const avgTimePerFrame = (totalRenderMinutes * 60 / totalFrames).toFixed(1);

  // Normalize progress percentage (say 1800 mins is 100%)
  const progressPercent = Math.min(100, Math.max(12, Math.round((totalRenderMinutes / 1800) * 100)));

  const handleExportBrief = () => {
    const brief = `Configured Scope: ${projectType.toUpperCase()} Video (${duration}), Complexity: ${complexity.toUpperCase()}, Resolution: ${resolution.toUpperCase()}, Formats: ${formats.join(
      ', '
    )}, Speed: ${speed.toUpperCase()}. Estimated Budget Range: $${minEstimate.toLocaleString()} – $${maxEstimate.toLocaleString()} (Est. Render: ${formattedRenderTime}).`;
    onPreFillInquiry(brief);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#F5F5F7]/90 dark:bg-[#0A0A0C]/90 backdrop-blur-2xl animate-in fade-in duration-300 flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl rounded-[24px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-2xl overflow-hidden text-[#1D1D1F] dark:text-[#F5F5F7] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-[#F5F5F7] dark:bg-[#121214] border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 text-[#007AFF] dark:text-[#0A84FF] flex items-center justify-center border border-[#007AFF]/20 dark:border-[#0A84FF]/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-18px font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">Project Scope & Budget Calculator</h3>
              <p className="text-12px text-[#86868B] dark:text-[#98989D]">Configure deliverables to estimate your custom production budget.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-3 font-semibold">
              1. Primary Deliverable Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'saas', title: 'SaaS Launch Commercial', sub: 'High-converting 60s trailer' },
                { id: 'ui', title: 'Motion Design & UI Rigging', sub: 'Figma to AE micro-animations' },
                { id: 'demo', title: 'Product Demo & Explainer', sub: 'Comprehensive walkthrough film' },
                { id: 'doc', title: 'Brand & Founder Doc', sub: 'Cinematic live action + motion' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    playSubtleClickSound();
                    setProjectType(item.id as any);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    projectType === item.id
                      ? 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 border-[#007AFF] dark:border-[#0A84FF] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-sm'
                      : 'bg-[#F5F5F7] dark:bg-[#1E1E22] border-neutral-200/80 dark:border-neutral-700 text-[#86868B] dark:text-[#98989D] hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="font-bold text-14px text-[#1D1D1F] dark:text-[#F5F5F7]">{item.title}</div>
                  <div className="text-12px text-[#86868B] dark:text-[#98989D] mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Duration */}
          <div>
            <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-3 font-semibold">
              2. Target Video Duration
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '30s', label: '30 Seconds', sub: 'Punchy teaser' },
                { id: '60s', label: '60 Seconds', sub: 'Standard commercial' },
                { id: '90s', label: '90 Seconds', sub: 'Deep product story' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    playSubtleClickSound();
                    setDuration(item.id as any);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    duration === item.id
                      ? 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 border-[#007AFF] dark:border-[#0A84FF] text-[#1D1D1F] dark:text-[#F5F5F7] font-bold'
                      : 'bg-[#F5F5F7] dark:bg-[#1E1E22] border-neutral-200/80 dark:border-neutral-700 text-[#86868B] dark:text-[#98989D]'
                  }`}
                >
                  <div className="text-13px text-[#1D1D1F] dark:text-[#F5F5F7]">{item.label}</div>
                  <div className="text-[10px] text-[#86868B] dark:text-[#98989D]">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Visual Complexity & Rigging */}
          <div>
            <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-3 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#007AFF] dark:text-[#0A84FF]" />
              3. Visual Complexity & Motion Density
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Standard 2D Motion', sub: 'Clean vector UI & typography easing' },
                { id: 'advanced', label: '3D UI Rigging & Depth', sub: 'Custom camera moves & isometric lighting' },
                { id: 'cinematic', label: 'Cinematic Raytracing', sub: 'Full Cinema 4D / Octane realistic physics' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    playSubtleClickSound();
                    setComplexity(item.id as any);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    complexity === item.id
                      ? 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 border-[#007AFF] dark:border-[#0A84FF] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs font-bold'
                      : 'bg-[#F5F5F7] dark:bg-[#1E1E22] border-neutral-200/80 dark:border-neutral-700 text-[#86868B] dark:text-[#98989D] hover:border-neutral-300 dark:hover:border-neutral-600 font-medium'
                  }`}
                >
                  <div className="text-13px text-[#1D1D1F] dark:text-[#F5F5F7]">{item.label}</div>
                  <div className="text-[11px] text-[#86868B] dark:text-[#98989D] mt-1 leading-tight font-normal">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Output Resolution */}
          <div>
            <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-3 font-semibold flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-[#007AFF] dark:text-[#0A84FF]" />
              4. Master Output Resolution
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: '720p', label: '720p HD', sub: 'Fast web & mobile' },
                { id: '1080p', label: '1080p Full HD', sub: 'Master web broadcast' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    playSubtleClickSound();
                    setResolution(item.id as any);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    resolution === item.id
                      ? 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 border-[#007AFF] dark:border-[#0A84FF] text-[#1D1D1F] dark:text-[#F5F5F7] font-bold shadow-xs'
                      : 'bg-[#F5F5F7] dark:bg-[#1E1E22] border-neutral-200/80 dark:border-neutral-700 text-[#86868B] dark:text-[#98989D] hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="text-13px text-[#1D1D1F] dark:text-[#F5F5F7]">{item.label}</div>
                  <div className="text-[10px] text-[#86868B] dark:text-[#98989D] mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Required Formats */}
          <div>
            <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-3 font-semibold">
              5. Multi-Format Cuts
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { id: '16:9', label: '16:9 Landscape (Web/YouTube)' },
                { id: '9:16', label: '9:16 Vertical (Reels/TikTok)' },
                { id: '1:1', label: '1:1 Square (LinkedIn/Feed)' },
              ].map((fmt) => (
                <button
                  type="button"
                  key={fmt.id}
                  onClick={() => toggleFormat(fmt.id)}
                  className={`px-4 py-2.5 rounded-xl border text-13px font-medium transition-all ${
                    formats.includes(fmt.id)
                      ? 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 border-[#007AFF] dark:border-[#0A84FF] text-[#007AFF] dark:text-[#0A84FF]'
                      : 'bg-[#F5F5F7] dark:bg-[#1E1E22] border-neutral-200/80 dark:border-neutral-700 text-[#86868B] dark:text-[#98989D]'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Rendering Time (Visual Progress Bar) */}
          <div className="p-6 rounded-2xl bg-[#1D1D1F] dark:bg-[#121214] text-white border border-neutral-800 space-y-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#007AFF]/20 dark:bg-[#0A84FF]/20 text-[#007AFF] dark:text-[#0A84FF] border border-[#007AFF]/30 dark:border-[#0A84FF]/30">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-15px font-bold text-white tracking-tight">Estimated Total Rendering Time</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#007AFF]/20 text-[#007AFF] dark:text-[#0A84FF] border border-[#007AFF]/30 dark:border-[#0A84FF]/30 font-semibold">
                      Live GPU Model
                    </span>
                  </div>
                  <p className="text-12px text-neutral-400 mt-0.5 font-mono">
                    Based on {resolution.toUpperCase()} resolution & {complexity} complexity across {formats.length} format{formats.length > 1 ? 's' : ''}.
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-22px font-extrabold text-[#007AFF] dark:text-[#0A84FF] font-mono tracking-tight">
                  {formattedRenderTime}
                </div>
                <span className="text-11px font-mono text-neutral-400 block">
                  {totalFrames.toLocaleString()} frames • {avgTimePerFrame}s / frame avg
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-11px font-mono text-neutral-400">
                <span>Realtime / Fast (1080p 2D)</span>
                <span className="font-semibold text-white">{progressPercent}% Compute Intensity</span>
                <span>Heavy Raytracing (8K 3D)</span>
              </div>
              
              <div className="w-full h-3.5 rounded-full bg-neutral-800 overflow-hidden p-0.5 relative shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full rounded-full bg-gradient-to-r ${
                    progressPercent < 35
                      ? 'from-emerald-500 to-teal-400'
                      : progressPercent < 70
                      ? 'from-blue-500 via-[#007AFF] to-indigo-500'
                      : 'from-[#007AFF] via-purple-500 to-rose-500'
                  } relative overflow-hidden transition-all duration-500 shadow-sm`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:14px_14px] animate-[pulse_2s_infinite]" />
                </motion.div>
              </div>
            </div>

            {/* Hardware Cluster Note */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-11px text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#007AFF] dark:text-[#0A84FF]" />
                Target Rig: {complexity === 'cinematic' ? 'Multi-GPU Cloud Farm (8x RTX 4090)' : complexity === 'advanced' || resolution === '1080p' ? 'Studio Workstation (Dual RTX 4090 / M3 Max)' : 'Standard Studio Rig Acceleration'}
              </span>
              <span className="text-[#007AFF] dark:text-[#0A84FF] font-medium hidden sm:inline">ProRes 422 HQ Master</span>
            </div>
          </div>

          {/* Live Investment Estimate Display */}
          <div className="p-6 rounded-2xl bg-[#F5F5F7] dark:bg-[#1E1E22] border border-neutral-200/80 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-11px font-mono uppercase text-[#86868B] dark:text-[#98989D] block mb-1 font-semibold">
                Estimated Project Investment
              </span>
              <div className="text-32px font-extrabold text-[#007AFF] dark:text-[#0A84FF] font-mono tracking-tight">
                ${minEstimate.toLocaleString()} – ${maxEstimate.toLocaleString()}
              </div>
              <p className="text-12px text-[#86868B] dark:text-[#98989D] mt-1">Includes script, motion design, {resolution.toUpperCase()} render & master deliverables.</p>
            </div>

            <button
              onClick={handleExportBrief}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] font-semibold text-14px hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all shadow-md shrink-0"
            >
              Export Brief to Inquiry →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEstimator;
