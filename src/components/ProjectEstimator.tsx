import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, X, Sparkles, ShieldAlert } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';

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
  const [formats, setFormats] = useState<string[]>(['16:9']);
  const [speed, setSpeed] = useState<'standard' | 'rush'>('standard');

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
      case 'saas': return 4500;
      case 'ui': return 3200;
      case 'demo': return 3800;
      case 'doc': return 6500;
    }
  };

  const getDurationMultiplier = () => {
    switch (duration) {
      case '30s': return 0.8;
      case '60s': return 1.0;
      case '90s': return 1.35;
    }
  };

  const baseCost = getBaseCost();
  const durMult = getDurationMultiplier();
  const formatAddon = (formats.length - 1) * 600;
  const speedAddon = speed === 'rush' ? 1200 : 0;

  const minEstimate = Math.round((baseCost * durMult + formatAddon + speedAddon) * 0.9);
  const maxEstimate = Math.round((baseCost * durMult + formatAddon + speedAddon) * 1.15);

  const handleExportBrief = () => {
    const brief = `Configured Scope: ${projectType.toUpperCase()} Video (${duration}), Formats: ${formats.join(
      ', '
    )}, Speed: ${speed.toUpperCase()}. Estimated Budget Range: $${minEstimate.toLocaleString()} – $${maxEstimate.toLocaleString()}.`;
    onPreFillInquiry(brief);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#F5F5F7]/90 backdrop-blur-2xl animate-in fade-in duration-300 flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl rounded-[24px] bg-white border border-neutral-200/80 shadow-2xl overflow-hidden text-[#1D1D1F] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-[#F5F5F7] border-b border-neutral-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center border border-[#007AFF]/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-18px font-bold text-[#1D1D1F]">Project Scope & Budget Calculator</h3>
              <p className="text-12px text-[#86868B]">Configure deliverables to estimate your custom production budget.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-full bg-neutral-200/60 hover:bg-neutral-300 text-[#1D1D1F] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] mb-3 font-semibold">
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
                      ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#1D1D1F] shadow-sm'
                      : 'bg-[#F5F5F7] border-neutral-200/80 text-[#86868B] hover:border-neutral-300'
                  }`}
                >
                  <div className="font-bold text-14px text-[#1D1D1F]">{item.title}</div>
                  <div className="text-12px text-[#86868B] mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Duration */}
          <div>
            <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] mb-3 font-semibold">
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
                      ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#1D1D1F] font-bold'
                      : 'bg-[#F5F5F7] border-neutral-200/80 text-[#86868B]'
                  }`}
                >
                  <div className="text-13px text-[#1D1D1F]">{item.label}</div>
                  <div className="text-[10px] text-[#86868B]">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Required Formats */}
          <div>
            <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] mb-3 font-semibold">
              3. Multi-Format Cuts
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
                      ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF]'
                      : 'bg-[#F5F5F7] border-neutral-200/80 text-[#86868B]'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Investment Estimate Display */}
          <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-11px font-mono uppercase text-[#86868B] block mb-1 font-semibold">
                Estimated Project Investment
              </span>
              <div className="text-32px font-extrabold text-[#007AFF] font-mono tracking-tight">
                ${minEstimate.toLocaleString()} – ${maxEstimate.toLocaleString()}
              </div>
              <p className="text-12px text-[#86868B] mt-1">Includes strategy, script, motion design, audio mix & master 4K deliverables.</p>
            </div>

            <button
              onClick={handleExportBrief}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1D1D1F] text-white font-semibold text-14px hover:bg-[#007AFF] transition-all shadow-md shrink-0"
            >
              Export Brief to Inquiry →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
