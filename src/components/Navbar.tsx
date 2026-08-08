import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Calculator, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';
import { StudioTimeWidget } from './StudioTimeWidget';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  currentView: 'home' | 'work';
  onNavigateToHome: (targetSection?: string) => void;
  onNavigateToWork: () => void;
  onOpenEstimator: () => void;
  onOpenAIStoryboard: () => void;
  onOpenDatabaseDashboard: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateToHome,
  onNavigateToWork,
  onOpenEstimator,
  onOpenAIStoryboard,
  onOpenDatabaseDashboard,
  theme,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [studioMenuOpen, setStudioMenuOpen] = useState(false);
  const isManualClickingRef = React.useRef(false);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (currentView === 'work') return '#work';
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash;
    }
    return '#';
  });

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useBodyScrollLock(studioMenuOpen);

  // Close menu on Escape key press
  useEffect(() => {
    if (!studioMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStudioMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [studioMenuOpen]);

  useEffect(() => {
    if (currentView === 'work') {
      setActiveSection('#work');
      return;
    }

    const handleHashChange = () => {
      const hash = window.location.hash || '#';
      setActiveSection(hash);
    };

    const handleScroll = () => {
      const isScrolledNow = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolledNow ? isScrolledNow : prev));

      // Skip scroll section detection if user recently clicked a nav item
      if (isManualClickingRef.current || currentView === 'work') return;

      // Detect active section on scroll
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;

      if (isAtBottom) {
        setActiveSection((prev) => (prev !== '#contact' ? '#contact' : prev));
        return;
      }

      if (window.scrollY < 180) {
        setActiveSection((prev) => (prev !== '#' ? '#' : prev));
        return;
      }

      const sections = [
        { id: '#work', element: document.getElementById('work') },
        { id: '#about', element: document.getElementById('about') },
        { id: '#faq', element: document.getElementById('faq') },
        { id: '#contact', element: document.getElementById('contact') },
      ];

      const scrollY = window.scrollY;
      let current = '#';

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const absoluteTop = rect.top + scrollY;
          if (scrollY + 220 >= absoluteTop) {
            current = section.id;
          }
        }
      }

      setActiveSection((prev) => (prev !== current ? current : prev));
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentView]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    playSubtleClickSound();
    e.preventDefault();

    isManualClickingRef.current = true;
    setActiveSection(href);

    if (href === '#work') {
      onNavigateToWork();
    } else if (href === '#') {
      onNavigateToHome('#');
    } else {
      onNavigateToHome(href);
    }

    setTimeout(() => {
      isManualClickingRef.current = false;
    }, 900);

    setStudioMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || currentView === 'work'
          ? 'py-1.5 sm:py-2 bg-[#F5F5F7]/85 dark:bg-[#0A0A0C]/85 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs'
          : 'py-2.5 sm:py-3 bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between relative">
        {/* Brand Logo */}
        <BrandLogo onClick={(e) => handleLinkClick(e, '#')} />

        {/* Minimal Desktop Navigation Links - Centered */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-2xs md:absolute md:left-1/2 md:-translate-x-1/2 z-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-13px transition-colors duration-200 select-none ${
                  isActive
                    ? 'text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold'
                    : 'text-[#86868B] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] font-medium'
                }`}
              >
                {/* Soft glass hover capsule when NOT active */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full bg-white/45 dark:bg-white/10 backdrop-blur-md border border-[#1D1D1F]/[0.05] dark:border-white/[0.08] opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-2xs" />
                )}

                {/* Sliding Active Capsule using Motion layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavSegmentCapsule"
                    className="absolute inset-0 rounded-full bg-white/80 dark:bg-white/20 backdrop-blur-md border border-[#1D1D1F]/[0.08] dark:border-white/[0.15] shadow-[0_6px_18px_rgba(29,29,31,0.06)] dark:shadow-[0_6px_18px_rgba(0,0,0,0.4)] pointer-events-none"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                      mass: 0.8,
                    }}
                  />
                )}

                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA - Start a Project & Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Active Status Light Indicator */}
          <StudioTimeWidget variant="pill" />

          {/* Persistent Floating Theme Toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            onClick={() => {
              playSubtleClickSound();
              setStudioMenuOpen(!studioMenuOpen);
            }}
            className="md:hidden flex items-center justify-center p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161618] text-[#1D1D1F] dark:text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {studioMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              playSubtleClickSound();
              onNavigateToHome('#contact');
            }}
            className="hidden md:inline-flex px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0C] text-12px sm:text-13px font-medium hover:bg-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all shadow-2xs"
          >
            Start a Project
          </a>

          <button
            onClick={() => {
              playSubtleClickSound();
              setStudioMenuOpen(!studioMenuOpen);
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161618] text-[#1D1D1F]/80 dark:text-white/80 text-12px font-mono hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-[#1D1D1F] dark:hover:text-white transition-all cursor-pointer"
          >
            {studioMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Studio & Navigation Drawer Overlay */}
      <AnimatePresence>
        {studioMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-xs cursor-pointer"
              onClick={() => {
                playSubtleClickSound();
                setStudioMenuOpen(false);
              }}
              aria-hidden="true"
            />

            {/* Responsive Menu Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="fixed inset-x-0 top-[48px] sm:top-[54px] md:top-[58px] z-50 max-h-[calc(100vh-60px)] overflow-y-auto bg-[#F5F5F7]/95 dark:bg-[#0A0A0C]/95 backdrop-blur-2xl border-b border-neutral-200/80 dark:border-neutral-800/80 p-4 sm:p-6 lg:p-8 shadow-2xl transition-colors duration-300"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
                {/* Navigation Column */}
                <div className="md:col-span-5 lg:col-span-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between pb-1 border-b border-neutral-200/60 dark:border-neutral-800/60">
                    <span className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold">
                      Navigation
                    </span>
                    <span className="text-11px font-mono text-neutral-400 dark:text-neutral-500">
                      5 Pages
                    </span>
                  </div>

                  {/* Grid layout on mobile (2 cols) vs list layout on desktop/tablet */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 gap-1.5 sm:gap-2">
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.href;
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className={`relative text-13px sm:text-14px py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl flex items-center justify-between transition-all duration-200 ${
                            isActive
                              ? 'bg-white/90 dark:bg-white/15 text-[#1D1D1F] dark:text-white font-semibold border border-[#1D1D1F]/[0.08] dark:border-white/10 shadow-2xs'
                              : 'text-[#6E6E73] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 border border-transparent'
                          }`}
                        >
                          <span className="relative z-10 font-medium">{link.name}</span>
                          <span className={`relative z-10 text-12px transition-transform duration-200 ${isActive ? 'text-[#007AFF] translate-x-0.5' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5'}`}>
                            →
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Studio Tools & Status Column */}
                <div className="md:col-span-7 lg:col-span-6 space-y-3 sm:space-y-4 pt-3 md:pt-0 md:border-l border-neutral-200/80 dark:border-neutral-800/80 md:pl-6 lg:pl-8">
                  <div className="flex items-center justify-between pb-1 border-b border-neutral-200/60 dark:border-neutral-800/60">
                    <span className="text-11px font-mono uppercase tracking-widest text-[#86868B] dark:text-[#98989D] font-bold">
                      Studio Tools
                    </span>
                    <span className="text-11px font-mono text-neutral-400 dark:text-neutral-500">
                      Interactive Utilities
                    </span>
                  </div>

                  {/* Tools Cards: 1 column on mobile, 2 columns on tablet/desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                      onClick={() => {
                        playSubtleClickSound();
                        setStudioMenuOpen(false);
                        onOpenAIStoryboard();
                      }}
                      className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/90 dark:border-neutral-800 hover:border-[#007AFF] text-left transition-all group shadow-2xs cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Sparkles className="w-4 h-4 text-[#007AFF]" />
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#007AFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <div className="text-13px sm:text-14px font-bold text-[#1D1D1F] dark:text-white">
                        AI Storyboard
                      </div>
                      <div className="text-11px sm:text-12px text-[#86868B] dark:text-[#98989D] mt-0.5 leading-snug">
                        Generate script & visual shotlist
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        playSubtleClickSound();
                        setStudioMenuOpen(false);
                        onOpenEstimator();
                      }}
                      className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/90 dark:border-neutral-800 hover:border-[#007AFF] text-left transition-all group shadow-2xs cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Calculator className="w-4 h-4 text-[#007AFF]" />
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#007AFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <div className="text-13px sm:text-14px font-bold text-[#1D1D1F] dark:text-white">
                        Project Estimator
                      </div>
                      <div className="text-11px sm:text-12px text-[#86868B] dark:text-[#98989D] mt-0.5 leading-snug">
                        Calculate scope & budget estimate
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        playSubtleClickSound();
                        setStudioMenuOpen(false);
                        onOpenDatabaseDashboard();
                      }}
                      className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#161618] border border-neutral-200/90 dark:border-neutral-800 hover:border-[#007AFF] text-left transition-all group shadow-2xs cursor-pointer sm:col-span-2"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Database className="w-4 h-4 text-[#007AFF]" />
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Live DB</span>
                      </div>
                      <div className="text-13px sm:text-14px font-bold text-[#1D1D1F] dark:text-white">
                        Database Dashboard & CMS
                      </div>
                      <div className="text-11px sm:text-12px text-[#86868B] dark:text-[#98989D] mt-0.5 leading-snug">
                        Inspect leads, portfolio CMS & run SQL queries
                      </div>
                    </button>
                  </div>

                  {/* Compact Live Studio Status */}
                  <div className="pt-1">
                    <StudioTimeWidget variant="compact" />
                  </div>

                  {/* Direct Contact Footer */}
                  <div className="pt-1 flex items-center justify-between text-11px sm:text-12px font-mono text-[#86868B] dark:text-[#98989D]">
                    <span>Direct Inquiries:</span>
                    <a
                      href="mailto:whtamim3@gmail.com"
                      className="text-[#1D1D1F] dark:text-white underline font-medium hover:text-[#007AFF] transition-colors"
                    >
                      whtamim3@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

