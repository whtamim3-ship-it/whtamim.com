import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Calculator, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { AmbientAudioToggle } from './AmbientAudioToggle';
import { PremiumNavIcon } from './PremiumNavIcon';

interface NavbarProps {
  currentView: 'home' | 'work';
  onNavigateToHome: (targetSection?: string) => void;
  onNavigateToWork: () => void;
  onOpenEstimator: () => void;
  onOpenAIStoryboard: () => void;
  onOpenDatabaseDashboard: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isAmbientPlaying: boolean;
  onToggleAmbient: (newState: boolean) => void;
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
  isAmbientPlaying,
  onToggleAmbient,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isManualClickingRef = React.useRef(false);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (currentView === 'work') return '#work';
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash;
    }
    return '#';
  });

  const navLinks = [
    { name: 'Home' as const, href: '#' },
    { name: 'Work' as const, href: '#work' },
    { name: 'About' as const, href: '#about' },
    { name: 'FAQ' as const, href: '#faq' },
    { name: 'Contact' as const, href: '#contact' },
  ];

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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

      if (isManualClickingRef.current || currentView === 'work') return;

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

      const sections = ['#work', '#about', '#faq', '#contact'];
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection((prev) => (prev !== section ? section : prev));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentView]);

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playSubtleClickSound();
    isManualClickingRef.current = true;
    setActiveSection(href);
    setMobileMenuOpen(false);

    if (href === '#work') {
      onNavigateToWork();
    } else {
      onNavigateToHome(href === '#' ? undefined : href);
    }

    setTimeout(() => {
      isManualClickingRef.current = false;
    }, 1500);
  };

  return (
    <nav
      className={`navbar-wrapper ${scrolled ? 'scrolled' : ''} ${theme}`}
    >
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="navbar-brand">
          <BrandLogo />
        </div>

        {/* Center: Navigation Links in Floating Glass Capsule */}
        <div className="nav-icons-desktop">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className={`nav-link ${activeSection === link.href ? 'active' : ''}`}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <PremiumNavIcon 
                name={link.name} 
                isActive={activeSection === link.href}
              />
              <span className="nav-label">{link.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Right: Ambient Audio + Theme Toggle + CTA Button on Desktop */}
        <div className="navbar-right">
          <div className="desktop-actions">
            <AmbientAudioToggle isPlaying={isAmbientPlaying} onToggle={onToggleAmbient} />
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick('#contact', e)}
              className="start-project-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Project
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} className="w-5 h-5" /> : <Menu size={20} className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-nav-items">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className={`mobile-nav-item ${activeSection === link.href ? 'active' : ''}`}
                  whileTap={{ scale: 0.98 }}
                >
                  <PremiumNavIcon 
                    name={link.name} 
                    isActive={activeSection === link.href}
                  />
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>

            <div className="mobile-actions-row">
              <AmbientAudioToggle isPlaying={isAmbientPlaying} onToggle={onToggleAmbient} />
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick('#contact', e)}
                className="mobile-cta-btn"
                whileTap={{ scale: 0.98 }}
              >
                Start a Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
