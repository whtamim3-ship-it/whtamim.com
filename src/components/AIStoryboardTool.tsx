import React, { useState } from 'react';
import { Sparkles, Loader2, Play, CheckCircle2, Copy, Send, ArrowRight, Layers, Clapperboard, X } from 'lucide-react';
import { AIStoryboardResponse } from '../types';
import { playSubtleClickSound } from '../utils/motion';

interface AIStoryboardToolProps {
  isOpen: boolean;
  onClose: () => void;
  onPreFillInquiry: (brief: string) => void;
}

export const AIStoryboardTool: React.FC<AIStoryboardToolProps> = ({
  isOpen,
  onClose,
  onPreFillInquiry,
}) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('SaaS Founders, Tech Leaders, Product Managers');
  const [videoGoal, setVideoGoal] = useState('Product Launch & Demo Conversion');
  const [stylePreference, setStylePreference] = useState('Apple Launch Style, Dark Mode UI, Smooth 3D Depth');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storyboard, setStoryboard] = useState<AIStoryboardResponse | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productDescription) return;

    playSubtleClickSound();
    setLoading(true);
    setError(null);
    setStoryboard(null);

    try {
      const res = await fetch('/api/generate-storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          productDescription,
          targetAudience,
          videoGoal,
          stylePreference,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate storyboard.');
      }

      setStoryboard(data.storyboard);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while generating the storyboard.');
    } finally {
      setLoading(false);
    }
  };

  const copyStoryboardText = () => {
    if (!storyboard) return;
    const text = `WHTAMIM AI STORYBOARD PROPOSAL
Title: ${storyboard.projectTitle}
Duration: ${storyboard.recommendedDuration}
Logline: ${storyboard.logline}

SCENES:
${storyboard.scenes
  .map(
    (s) =>
      `Scene ${s.sceneNumber} (${s.timestamp}):
Visuals: ${s.visualDescription}
UI Animation: ${s.uiAnimationDetails}
VO: "${s.voiceoverText}"
Text: "${s.onScreenText}"
Transition: ${s.transitionType}`
  )
  .join('\n\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportToInquiry = () => {
    if (!storyboard) return;
    const brief = `AI Storyboard generated for ${productName}: ${storyboard.projectTitle}. Recommended Duration: ${storyboard.recommendedDuration}. Estimated Budget: ${storyboard.budgetTierEstimate}.`;
    onPreFillInquiry(brief);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#F5F5F7]/90 backdrop-blur-2xl animate-in fade-in duration-300 flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-5xl h-[90vh] rounded-[24px] bg-white border border-neutral-200/80 shadow-2xl flex flex-col overflow-hidden text-[#1D1D1F]">
        {/* Header */}
        <div className="p-6 bg-[#F5F5F7] border-b border-neutral-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center border border-[#007AFF]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-18px font-bold text-[#1D1D1F] flex items-center gap-2">
                whtamim AI Motion Storyboard Studio
                <span className="text-10px font-mono uppercase px-2 py-0.5 rounded bg-[#007AFF]/10 text-[#007AFF] font-bold">
                  GEMINI POWERED
                </span>
              </h2>
              <p className="text-12px text-[#86868B]">
                Input your SaaS product details to generate an instant, production-grade video script & motion storyboard.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-neutral-200/60 hover:bg-neutral-300 text-[#1D1D1F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Input Form */}
          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F5F7] p-6 rounded-2xl border border-neutral-200/80">
            <div>
              <label className="block text-12px font-mono text-[#86868B] uppercase tracking-wider mb-2 font-medium">
                SaaS Product Name *
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Nexivo AI"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-12px font-mono text-[#86868B] uppercase tracking-wider mb-2 font-medium">
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Seed/Series A founders, CTOs"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-12px font-mono text-[#86868B] uppercase tracking-wider mb-2 font-medium">
                Product Description & Key Features *
              </label>
              <textarea
                required
                rows={3}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="e.g. Autonomous AI workflow engine that connects databases, automates developer tasks, and features a sleek dark mode dashboard."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-12px font-mono text-[#86868B] uppercase tracking-wider mb-2 font-medium">
                Primary Goal
              </label>
              <input
                type="text"
                value={videoGoal}
                onChange={(e) => setVideoGoal(e.target.value)}
                placeholder="e.g. Product Hunt Launch, Demo Signups"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-12px font-mono text-[#86868B] uppercase tracking-wider mb-2 font-medium">
                Style Direction
              </label>
              <input
                type="text"
                value={stylePreference}
                onChange={(e) => setStylePreference(e.target.value)}
                placeholder="e.g. Apple Keynote, Clean Minimalist Light Mode"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={loading || !productName || !productDescription}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D1D1F] text-white font-semibold text-14px hover:bg-[#007AFF] disabled:opacity-50 transition-all shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Architecting Script & Keyframes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Motion Storyboard</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-13px">
              {error}
            </div>
          )}

          {/* Generated Storyboard Output */}
          {storyboard && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Summary Header Card */}
              <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-neutral-200/80 flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <span className="text-11px font-mono text-[#007AFF] font-bold uppercase tracking-wider block mb-1">
                    AI PROPOSED CONCEPT
                  </span>
                  <h3 className="text-24px font-extrabold text-[#1D1D1F] mb-2">{storyboard.projectTitle}</h3>
                  <p className="text-14px text-[#86868B] max-w-2xl">{storyboard.logline}</p>
                </div>

                <div className="flex flex-col gap-2 shrink-0 font-mono text-12px">
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-[#86868B] flex justify-between gap-4">
                    <span>Duration:</span>
                    <span className="text-[#1D1D1F] font-bold">{storyboard.recommendedDuration}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-[#86868B] flex justify-between gap-4">
                    <span>Est. Timeline:</span>
                    <span className="text-[#1D1D1F] font-bold">{storyboard.estimatedProductionTimeline}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-[#86868B] flex justify-between gap-4">
                    <span>Budget Tier:</span>
                    <span className="text-[#007AFF] font-bold">{storyboard.budgetTierEstimate}</span>
                  </div>
                </div>
              </div>

              {/* Scene Breakdown */}
              <div>
                <h4 className="text-14px font-mono font-bold text-[#007AFF] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clapperboard className="w-4 h-4" />
                  Scene-by-Scene Motion Storyboard
                </h4>

                <div className="space-y-4">
                  {storyboard.scenes.map((scene) => (
                    <div
                      key={scene.sceneNumber}
                      className="p-5 rounded-2xl bg-[#F5F5F7] border border-neutral-200/80 grid grid-cols-1 lg:grid-cols-12 gap-4"
                    >
                      <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200 pb-3 lg:pb-0 lg:pr-4">
                        <div>
                          <span className="text-12px font-mono text-[#007AFF] font-bold">
                            SCENE {scene.sceneNumber}
                          </span>
                          <span className="text-11px font-mono text-[#86868B] block">
                            {scene.timestamp}
                          </span>
                        </div>
                        <span className="text-11px font-mono px-2 py-1 rounded bg-white text-[#86868B] mt-2 inline-block border border-neutral-200">
                          {scene.transitionType}
                        </span>
                      </div>

                      <div className="lg:col-span-5 space-y-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#86868B]">Visuals & Camera</span>
                          <p className="text-13px text-[#1D1D1F]">{scene.visualDescription}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#007AFF]">UI Animation Rig</span>
                          <p className="text-12px text-[#86868B]">{scene.uiAnimationDetails}</p>
                        </div>
                      </div>

                      <div className="lg:col-span-4 space-y-2 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-3 lg:pt-0 lg:pl-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#1D1D1F]">Voiceover</span>
                          <p className="text-13px italic text-[#1D1D1F]">"{scene.voiceoverText}"</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#86868B]">On-Screen Text</span>
                          <p className="text-12px font-mono text-[#1D1D1F] font-bold">{scene.onScreenText}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={copyStoryboardText}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F] text-13px font-medium transition-colors border border-neutral-200"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Raw Script Text'}</span>
                </button>

                <button
                  onClick={handleExportToInquiry}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D1D1F] text-white font-semibold text-14px hover:bg-[#007AFF] transition-all shadow-md"
                >
                  <span>Lock In Slot With This Script</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
