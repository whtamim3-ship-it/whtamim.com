import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Linkedin, ArrowUpRight, Loader2, Sparkles } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { StudioTimeWidget } from './StudioTimeWidget';

interface ContactSectionProps {
  preFilledBrief?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preFilledBrief }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('Promotional Video');
  const [budget, setBudget] = useState('$800 – $1,500');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preFilledBrief) {
      setMessage(preFilledBrief);
    }
  }, [preFilledBrief]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    playSubtleClickSound();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          budget,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting inquiry. Please try emailing directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionReveal id="contact" className="py-24 w-full border-t border-neutral-200/80 bg-[#F5F5F7] text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Info & Direct Links */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] font-bold block mb-3">
              CONTACT & INQUIRIES
            </TextReveal>
            <TextReveal as="h2" delay={0.08} yOffset={20} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1D1F] leading-tight">
              Let's Elevate Your Product.
            </TextReveal>
          </div>

          <TextReveal as="p" delay={0.16} yOffset={20} className="text-16px text-[#86868B] leading-relaxed">
            Ready to bring your video concept to life? Let's discuss your timeline, footage, and vision.
          </TextReveal>

          <TextReveal delay={0.24} yOffset={20} className="space-y-4 pt-4">
            <a
              href="mailto:whtamim3@gmail.com"
              className="p-4 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-between hover:border-[#007AFF] shadow-xs transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#F5F5F7] text-[#007AFF]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-11px font-mono uppercase text-[#86868B] block">Email</span>
                  <span className="text-15px font-bold text-[#1D1D1F] font-mono">
                    whtamim3@gmail.com
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#86868B] group-hover:text-[#007AFF] transition-colors" />
            </a>

            <a
              href="https://www.linkedin.com/in/whtamim/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-between hover:border-[#007AFF] shadow-xs transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#F5F5F7] text-[#007AFF]">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-11px font-mono uppercase text-[#86868B] block">LinkedIn</span>
                  <span className="text-15px font-bold text-[#1D1D1F]">
                    linkedin.com/in/whtamim/
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#86868B] group-hover:text-[#007AFF] transition-colors" />
            </a>
          </TextReveal>

          <TextReveal delay={0.32} yOffset={20}>
            <div className="space-y-4">
              <StudioTimeWidget variant="compact" />
              <div className="p-5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                <span className="text-11px font-mono text-[#007AFF] dark:text-[#0A84FF] font-bold block mb-1">
                  ● PRODUCTION TURNAROUND
                </span>
                <p className="text-13px text-[#86868B] dark:text-[#98989D]">
                  Average production timeline is 1–2 weeks depending on scope. Currently available for new projects.
                </p>
              </div>
            </div>
          </TextReveal>
        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-7">
          <TextReveal delay={0.2} yOffset={24}>
            <div className="p-5 sm:p-8 rounded-[24px] bg-white border border-neutral-200/80 shadow-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-24px font-bold text-[#1D1D1F]">
                  Inquiry Received!
                </h3>
                <p className="text-14px text-[#86868B] max-w-md mx-auto">
                  Thank you for reaching out. whtamim will review your project requirements and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#1D1D1F] text-white font-semibold text-13px hover:bg-[#007AFF] transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] mb-2 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] mb-2 font-medium">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcus@nexivo.ai"
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] mb-2 font-medium">
                      Company / Product
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nexivo AI"
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] mb-2 font-medium">
                      Estimated Budget Tier
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
                    >
                      <option value="$300 – $800">$300 – $800</option>
                      <option value="$800 – $1,500">$800 – $1,500</option>
                      <option value="$1,500 – $3,000">$1,500 – $3,000</option>
                      <option value="$3,000+">$3,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] mb-2 font-medium">
                    Project Brief & Goals
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell whtamim about your product, target launch date, and video expectations..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-[#1D1D1F] text-14px focus:outline-none focus:border-[#007AFF] transition-colors"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-12px">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !name || !email}
                  className="w-full py-4 rounded-full bg-[#1D1D1F] text-white font-semibold text-15px hover:bg-[#007AFF] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Start a Project</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          </TextReveal>
        </div>
      </div>
      </div>
    </SectionReveal>
  );
};
