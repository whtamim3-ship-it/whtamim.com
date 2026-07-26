import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';

interface NavbarProps {
  currentView: 'home' | 'work';
  onNavigateToHome: (targetSection?: string) => void;
  onNavigateToWork: () => void;
  onOpenEstimator: () => void;
  onOpenAIStoryboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateToHome,
  onNavigateToWork,
  onOpenEstimator,
  onOpenAIStoryboard,
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
      setScrolled(window.scrollY > 20);

      // Skip scroll section detection if user recently clicked a nav item
      if (isManualClickingRef.current || currentView === 'work') return;

      // Detect active section on scroll
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;

      if (isAtBottom) {
        setActiveSection('#contact');
        return;
      }

      if (window.scrollY < 200) {
        setActiveSection('#');
        return;
      }

      const sections = [
        { id: '#contact', element: document.getElementById('contact') },
        { id: '#faq', element: document.getElementById('faq') },
        { id: '#about', element: document.getElementById('about') },
        { id: '#work', element: document.getElementById('work') },
      ];

      const scrollPosition = window.scrollY + 280;
      let current = '#';

      for (const section of sections) {
        if (section.element) {
          const top = section.element.offsetTop;
          const height = section.element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = section.id;
            break;
          }
        }
      }

      setActiveSection(current);
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
          ? 'py-4 bg-[#F5F5F7]/85 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo - whtamim */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, '#')}
          className="text-[#1D1D1F] font-bold text-xl sm:text-22px tracking-tighter hover:opacity-70 transition-opacity font-mono"
        >
          whtamim
        </a>

        {/* Minimal Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xs">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-13px transition-colors duration-200 select-none ${
                  isActive
                    ? 'text-[#1D1D1F] font-semibold'
                    : 'text-[#86868B] hover:text-[#1D1D1F] font-medium'
                }`}
              >
                {/* Soft glass hover capsule when NOT active */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full bg-white/45 backdrop-blur-md border border-[#1D1D1F]/[0.05] opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-2xs" />
                )}

                {/* Sliding Active Capsule using Motion layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavSegmentCapsule"
                    className="absolute inset-0 rounded-full bg-white/80 backdrop-blur-md border border-[#1D1D1F]/[0.08] shadow-[0_6px_18px_rgba(29,29,31,0.06)] pointer-events-none"
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSubtleClickSound();
              setStudioMenuOpen(!studioMenuOpen);
            }}
            className="md:hidden flex items-center justify-center p-2 rounded-full border border-neutral-200 bg-white text-[#1D1D1F]"
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
            className="px-5 py-2 rounded-full bg-[#1D1D1F] text-white text-13px font-medium hover:bg-[#007AFF] transition-all"
          >
            Start a Project
          </a>

          <button
            onClick={() => {
              playSubtleClickSound();
              setStudioMenuOpen(!studioMenuOpen);
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 bg-white text-[#1D1D1F]/80 text-12px font-mono hover:border-neutral-400 hover:text-[#1D1D1F] transition-all"
          >
            {studioMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Studio & Navigation Drawer */}
      {studioMenuOpen && (
        <div className="fixed inset-x-0 top-[73px] bg-[#F5F5F7]/95 backdrop-blur-2xl border-b border-neutral-200/80 p-8 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Quick Links Column */}
            <div className="md:col-span-6 space-y-4">
              <span className="text-11px font-mono uppercase tracking-widest text-[#86868B] block mb-2 font-bold">
                Navigation
              </span>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`relative text-15px py-2.5 px-4 rounded-full flex items-center justify-between transition-colors duration-200 ${
                        isActive
                          ? 'bg-white/80 text-[#1D1D1F] font-semibold border border-[#1D1D1F]/[0.08] shadow-[0_6px_18px_rgba(29,29,31,0.06)]'
                          : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white/45'
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="relative z-10 text-12px opacity-50">→</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Studio Tools & Direct Inquiries Column */}
            <div className="md:col-span-6 space-y-4 pt-4 md:pt-0 md:border-l border-neutral-200 md:pl-8">
              <span className="text-11px font-mono uppercase tracking-widest text-[#86868B] block mb-2 font-bold">
                Studio Tools
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    playSubtleClickSound();
                    setStudioMenuOpen(false);
                    onOpenAIStoryboard();
                  }}
                  className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#007AFF] text-left transition-all group shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Sparkles className="w-4 h-4 text-[#007AFF]" />
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#007AFF] transition-colors" />
                  </div>
                  <div className="text-14px font-bold text-[#1D1D1F]">AI Storyboard</div>
                  <div className="text-12px text-[#86868B] mt-0.5">Generate video script & visual frames</div>
                </button>

                <button
                  onClick={() => {
                    playSubtleClickSound();
                    setStudioMenuOpen(false);
                    onOpenEstimator();
                  }}
                  className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#007AFF] text-left transition-all group shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Calculator className="w-4 h-4 text-[#007AFF]" />
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#007AFF] transition-colors" />
                  </div>
                  <div className="text-14px font-bold text-[#1D1D1F]">Project Estimator</div>
                  <div className="text-12px text-[#86868B] mt-0.5">Calculate scope & budget estimate</div>
                </button>
              </div>

              <div className="pt-2 text-12px font-mono text-[#86868B]">
                Direct Contact: <a href="mailto:whtamim3@gmail.com" className="text-[#1D1D1F] underline font-medium hover:text-[#007AFF]">whtamim3@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
