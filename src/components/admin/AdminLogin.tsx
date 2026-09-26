import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowLeft, Eye, EyeOff, ShieldCheck, AlertCircle, KeyRound, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { playSubtleClickSound } from '../../utils/motion';

interface AdminLoginProps {
  onNavigateHome: () => void;
  onSuccess?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigateHome, onSuccess }) => {
  const { login } = usePortfolio();
  const [email, setEmail] = useState('whtamim3@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both admin email and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    playSubtleClickSound();

    const result = await login(email.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      if (onSuccess) onSuccess();
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleFillDemo = () => {
    setEmail('whtamim3@gmail.com');
    setPassword('whtamim2026!');
    setErrorMessage(null);
    playSubtleClickSound();
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0C] text-[#F5F5F7] flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden selection:bg-[#0066FF] selection:text-white">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#0066FF]/20 via-[#0A84FF]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <button
          onClick={() => {
            playSubtleClickSound();
            onNavigateHome();
          }}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#86868B] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO PORTFOLIO</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
      >
        {/* Card */}
        <div className="bg-[#121215]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          {/* Badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0A84FF] text-xs font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PROTECTED ACCESS</span>
            </div>
            <span className="text-[11px] font-mono text-[#86868B]">v2.6 SECURE</span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Studio Admin
            </h1>
            <p className="text-sm text-[#86868B] leading-relaxed">
              Sign in to manage portfolio projects, live studio settings, and client inquiries.
            </p>
          </div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@whtamim.work"
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/10 focus:border-[#0066FF] rounded-xl text-sm text-white placeholder:text-[#555] focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-white/[0.04] border border-white/10 focus:border-[#0066FF] rounded-xl text-sm text-white placeholder:text-[#555] focus:outline-none focus:ring-1 focus:ring-[#0066FF] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#86868B] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] active:scale-[0.98] text-white font-medium text-sm transition-all shadow-lg shadow-[#0066FF]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate & Enter Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-[#86868B] mb-2">
              <span className="font-mono text-[11px] text-[#A1A1A6]">Default Admin Account:</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-mono text-[#0A84FF] hover:text-white inline-flex items-center gap-1 transition-colors underline cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-Fill Credentials</span>
              </button>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 font-mono text-[11px] text-[#A1A1A6] space-y-1">
              <div><span className="text-[#666]">Email:</span> whtamim3@gmail.com</div>
              <div><span className="text-[#666]">Pass:</span> whtamim2026!</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
