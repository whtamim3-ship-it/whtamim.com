import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Linkedin, ArrowUpRight, Loader2, AlertCircle, X } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';
import { TextReveal } from './TextReveal';
import { SectionReveal } from './SectionReveal';
import { StudioTimeWidget } from './StudioTimeWidget';

interface ContactSectionProps {
  preFilledBrief?: string;
  onOpenEstimator?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preFilledBrief, onOpenEstimator }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('Promotional Video');
  const [budget, setBudget] = useState('$800 – $1,500');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Form Validation & Toast State
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (preFilledBrief) {
      setMessage(preFilledBrief);
    }
  }, [preFilledBrief]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    if (!message.trim()) {
      newErrors.message = 'Please include a project brief or goals.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate single field on blur
    if (field === 'name') {
      if (!name.trim()) setErrors(prev => ({ ...prev, name: 'Name is required.' }));
      else setErrors(prev => ({ ...prev, name: undefined }));
    }
    if (field === 'email') {
      if (!email.trim()) setErrors(prev => ({ ...prev, email: 'Work email is required.' }));
      else if (!validateEmail(email)) setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      else setErrors(prev => ({ ...prev, email: undefined }));
    }
    if (field === 'message') {
      if (!message.trim()) setErrors(prev => ({ ...prev, message: 'Please include a project brief or goals.' }));
      else setErrors(prev => ({ ...prev, message: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!validateForm()) {
      playSubtleClickSound();
      return;
    }

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
      setToastMessage('Project inquiry sent successfully! whtamim will be in touch within 24 hours.');
      setShowToast(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting inquiry. Please try emailing directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionReveal id="contact" className="min-h-[100svh] md:min-h-[100dvh] w-full flex flex-col justify-center items-center py-10 sm:py-16 lg:py-20 border-t border-neutral-200/80 dark:border-neutral-800 bg-[#F5F5F7] dark:bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 my-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-end">

          {/* 1. Mobile Top Heading & Intro Text (< lg screen) */}
          <div className="w-full lg:hidden space-y-3">
            <div>
              <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block mb-2">
                CONTACT & INQUIRIES
              </TextReveal>
              <TextReveal as="h2" delay={0.08} yOffset={20} className="text-[28px] sm:text-3xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight">
                Let's Elevate Your Product.
              </TextReveal>
            </div>
            <TextReveal as="p" delay={0.16} yOffset={20} className="text-[13px] sm:text-16px text-[#86868B] dark:text-[#98989D] leading-relaxed">
              Ready to bring your video concept to life? Let's discuss your timeline, footage, and vision.
            </TextReveal>
          </div>

          {/* Desktop Left Info & Direct Links (>= lg screen) */}
          <div className="hidden lg:block lg:col-span-5 space-y-6">
            <div>
              <TextReveal as="span" delay={0} yOffset={16} className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold block mb-3">
                CONTACT & INQUIRIES
              </TextReveal>
              <TextReveal as="h2" delay={0.08} yOffset={20} className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-extrabold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight">
                Let's Elevate Your Product.
              </TextReveal>
            </div>

            <TextReveal as="p" delay={0.16} yOffset={20} className="text-16px text-[#86868B] dark:text-[#98989D] leading-relaxed">
              Ready to bring your video concept to life? Let's discuss your timeline, footage, and vision.
            </TextReveal>

            <TextReveal delay={0.24} yOffset={20} className="space-y-4 pt-4">
              <div
                className="p-4 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between shadow-xs transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F5F5F7] dark:bg-neutral-800 text-[#007AFF] dark:text-[#0A84FF] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-11px font-mono uppercase text-[#86868B] dark:text-[#98989D] block mb-1">Email</span>
                    <div className="flex flex-col gap-[4px]">
                      <a
                        href="mailto:whtamim3@gmail.com"
                        className="text-[13px]! font-medium text-inherit hover:text-[#007AFF] dark:hover:text-[#0A84FF] transition-colors block leading-tight"
                        style={{ fontFamily: 'var(--font-display, inherit)', fontSize: '13px', fontWeight: 500 }}
                      >
                        whtamim3@gmail.com
                      </a>
                      <a
                        href="mailto:wasimhasnattamim@gmail.com"
                        className="text-[13px]! font-medium text-inherit hover:text-[#007AFF] dark:hover:text-[#0A84FF] transition-colors block leading-tight"
                        style={{ fontFamily: 'var(--font-display, inherit)', fontSize: '13px', fontWeight: 500 }}
                      >
                        wasimhasnattamim@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/wasimhasnat/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between hover:border-[#007AFF] dark:hover:border-[#0A84FF] shadow-xs transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F5F5F7] dark:bg-neutral-800 text-[#007AFF] dark:text-[#0A84FF]">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-11px font-mono uppercase text-[#86868B] dark:text-[#98989D] block">LinkedIn</span>
                    <span className="text-15px font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      linkedin.com/in/wasimhasnat/
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#86868B] dark:text-[#98989D] group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors" />
              </a>
            </TextReveal>

            <TextReveal delay={0.32} yOffset={20}>
              <StudioTimeWidget variant="compact" />
            </TextReveal>
          </div>

          {/* 2. Main Contact Form Card (Middle on Mobile, Right on Desktop) */}
          <div className="w-full lg:col-span-7">
            <TextReveal delay={0.2} yOffset={24}>
              <div className="p-[20px_16px] sm:p-8 rounded-[24px] bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 shadow-md">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#007AFF]/10 dark:bg-[#0A84FF]/10 text-[#007AFF] dark:text-[#0A84FF] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-24px font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Inquiry Received!
                  </h3>
                  <p className="text-14px text-[#86868B] dark:text-[#98989D] max-w-md mx-auto">
                    Thank you for reaching out. whtamim will review your project requirements and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] font-semibold text-13px hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-[14px] sm:space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] sm:gap-6">
                    <div>
                      <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-1.5 font-medium flex items-center justify-between">
                        <span>Your Name *</span>
                        {touched.name && errors.name && (
                          <span className="text-red-500 dark:text-red-400 font-sans normal-case text-11px flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        onBlur={() => handleBlur('name')}
                        placeholder="e.g. Marcus Vance"
                        className={`w-full h-[48px] min-h-[48px] px-4 py-3 rounded-xl bg-[#F5F5F7] dark:bg-[#1E1E22] border text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#6E6E73] text-[16px] sm:text-14px focus:outline-none transition-colors ${
                          touched.name && errors.name
                            ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                            : 'border-neutral-200 dark:border-neutral-700 focus:border-[#007AFF] dark:focus:border-[#0A84FF]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-1.5 font-medium flex items-center justify-between">
                        <span>Work Email *</span>
                        {touched.email && errors.email && (
                          <span className="text-red-500 dark:text-red-400 font-sans normal-case text-11px flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </span>
                        )}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        onBlur={() => handleBlur('email')}
                        placeholder="marcus@zara.com"
                        className={`w-full h-[48px] min-h-[48px] px-4 py-3 rounded-xl bg-[#F5F5F7] dark:bg-[#1E1E22] border text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#6E6E73] text-[16px] sm:text-14px focus:outline-none transition-colors ${
                          touched.email && errors.email
                            ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                            : 'border-neutral-200 dark:border-neutral-700 focus:border-[#007AFF] dark:focus:border-[#0A84FF]'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] sm:gap-6">
                    <div>
                      <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-1.5 font-medium">
                        Company / Product
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="ZARA"
                        className="w-full h-[48px] min-h-[48px] px-4 py-3 rounded-xl bg-[#F5F5F7] dark:bg-[#1E1E22] border border-neutral-200 dark:border-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#6E6E73] text-[16px] sm:text-14px focus:outline-none focus:border-[#007AFF] dark:focus:border-[#0A84FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-1.5 font-medium">
                        Estimated Budget Tier
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full h-[48px] min-h-[48px] px-4 py-3 rounded-xl bg-[#F5F5F7] dark:bg-[#1E1E22] border border-neutral-200 dark:border-neutral-700 text-[#1D1D1F] dark:text-[#F5F5F7] text-[16px] sm:text-14px focus:outline-none focus:border-[#007AFF] dark:focus:border-[#0A84FF] transition-colors"
                      >
                        <option value="$300 – $800">$300 – $800</option>
                        <option value="$800 – $1,500">$800 – $1,500</option>
                        <option value="$1,500 – $3,000">$1,500 – $3,000</option>
                        <option value="$3,000+">$3,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-12px font-mono uppercase tracking-wider text-[#86868B] dark:text-[#98989D] mb-1.5 font-medium flex items-center justify-between">
                      <span>Project Brief & Goals *</span>
                      {touched.message && errors.message && (
                        <span className="text-red-500 dark:text-red-400 font-sans normal-case text-11px flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </span>
                      )}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                      }}
                      onBlur={() => handleBlur('message')}
                      placeholder="Tell whtamim about your product, target launch date, and video expectations..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#F5F5F7] dark:bg-[#1E1E22] border text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#6E6E73] text-[16px] sm:text-14px focus:outline-none transition-colors ${
                        touched.message && errors.message
                          ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:border-[#007AFF] dark:focus:border-[#0A84FF]'
                      }`}
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-12px flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[52px] min-h-[52px] rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] font-semibold text-[15px] sm:text-[16px] hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white disabled:opacity-50 transition-all flex items-center justify-center text-center gap-2 shadow-md cursor-pointer"
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

          {/* 3. Mobile Left Contact Badges & Timezone Widget (< lg screen) */}
          <div className="w-full lg:hidden space-y-4 pt-2">
            <div className="space-y-3">
              <div
                className="p-3.5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between shadow-xs transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F5F5F7] dark:bg-neutral-800 text-[#007AFF] dark:text-[#0A84FF] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-11px font-mono uppercase text-[#86868B] dark:text-[#98989D] block mb-1">Email</span>
                    <div className="flex flex-col gap-[4px]">
                      <a
                        href="mailto:whtamim3@gmail.com"
                        className="text-[13px]! font-medium text-inherit hover:text-[#007AFF] dark:hover:text-[#0A84FF] transition-colors block leading-tight"
                        style={{ fontFamily: 'var(--font-display, inherit)', fontSize: '13px', fontWeight: 500 }}
                      >
                        whtamim3@gmail.com
                      </a>
                      <a
                        href="mailto:wasimhasnattamim@gmail.com"
                        className="text-[13px]! font-medium text-inherit hover:text-[#007AFF] dark:hover:text-[#0A84FF] transition-colors block leading-tight"
                        style={{ fontFamily: 'var(--font-display, inherit)', fontSize: '13px', fontWeight: 500 }}
                      >
                        wasimhasnattamim@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/wasimhasnat/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between hover:border-[#007AFF] dark:hover:border-[#0A84FF] shadow-xs transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F5F5F7] dark:bg-neutral-800 text-[#007AFF] dark:text-[#0A84FF]">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-11px font-mono uppercase text-[#86868B] dark:text-[#98989D] block">LinkedIn</span>
                    <span className="text-14px font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      linkedin.com/in/wasimhasnat/
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#86868B] dark:text-[#98989D] group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors" />
              </a>
            </div>

            <StudioTimeWidget variant="compact" />
          </div>

        </div>
      </div>

      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200 dark:border-neutral-800 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-14px font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Inquiry Sent Successfully!
            </h4>
            <p className="text-12px text-[#86868B] dark:text-[#98989D] mt-0.5 leading-snug">
              {toastMessage}
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </SectionReveal>
  );
};
