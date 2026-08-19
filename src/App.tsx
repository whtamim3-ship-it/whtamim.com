import React, { useState, useEffect, lazy, Suspense } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { MidnightAtmosphere } from './components/MidnightAtmosphere';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowreelModal } from './components/ShowreelModal';
import { FeaturedWork } from './components/FeaturedWork';
import { WorkPage } from './components/WorkPage';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollVelocityBlurController } from './components/ScrollVelocityBlurController';
import { CaseStudy } from './types';
import { CASE_STUDIES } from './data/portfolioData';

// Dynamically imported components for optimized initial load
const CaseStudyModal = lazy(() => import('./components/CaseStudyModal'));
const ProjectEstimator = lazy(() => import('./components/ProjectEstimator'));
const DatabaseDashboard = lazy(() => import('./components/DatabaseDashboard'));
const BlogModal = lazy(() => import('./components/BlogModal').then(m => ({ default: m.BlogModal })));

export default function App() {
  const [cursorEnabled] = useState<boolean>(true);

  // View state: 'home' or 'work'
  const [currentView, setCurrentView] = useState<'home' | 'work'>('home');

  // Modals & Drawers state
  const [showreelOpen, setShowreelOpen] = useState<boolean>(false);
  const [estimatorOpen, setEstimatorOpen] = useState<boolean>(false);
  const [dbDashboardOpen, setDbDashboardOpen] = useState<boolean>(false);
  const [blogOpen, setBlogOpen] = useState<boolean>(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Ambient Audio Loop State
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);

  // Pre-filled contact brief
  const [preFilledBrief, setPreFilledBrief] = useState<string>('');

  // Persistent Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      if (document.documentElement.classList.contains('dark')) {
        return 'dark';
      }
      const saved = localStorage.getItem('whtamim_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('whtamim_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('whtamim_theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Handle Hash/URL routing on initial load or manual navigation
  useEffect(() => {
    const handleRouting = () => {
      if (window.location.hash === '#work-all' || window.location.hash === '#work-archive') {
        setCurrentView('work');
      }
      if (window.location.pathname === '/blog' || window.location.hash === '#blog') {
        setBlogOpen(true);
      }
    };
    handleRouting();
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('popstate', handleRouting);
    return () => {
      window.removeEventListener('hashchange', handleRouting);
      window.removeEventListener('popstate', handleRouting);
    };
  }, []);

  // Global Escape (Esc) key keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        const isModalOpen =
          showreelOpen ||
          estimatorOpen ||
          dbDashboardOpen ||
          blogOpen ||
          selectedCaseStudy !== null ||
          Boolean(document.querySelector('[role="dialog"]')) ||
          document.body.style.overflow === 'hidden';

        if (isModalOpen) {
          if (showreelOpen) setShowreelOpen(false);
          if (estimatorOpen) setEstimatorOpen(false);
          if (dbDashboardOpen) setDbDashboardOpen(false);
          if (blogOpen) setBlogOpen(false);
          if (selectedCaseStudy) setSelectedCaseStudy(null);
        } else {
          if (currentView === 'work') {
            setCurrentView('home');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    showreelOpen,
    estimatorOpen,
    dbDashboardOpen,
    blogOpen,
    selectedCaseStudy,
    currentView,
  ]);

  const handleNavigateToHome = (targetSection?: string) => {
    setCurrentView('home');
    if (targetSection && targetSection !== '#') {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.querySelector(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToWork = () => {
    setCurrentView('work');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreFillInquiry = (brief: string) => {
    setPreFilledBrief(brief);
    handleNavigateToHome('#contact');
  };

  const handleSelectNextCaseStudy = (currentStudy: CaseStudy) => {
    const currentIndex = CASE_STUDIES.findIndex((c) => c.id === currentStudy.id);
    const nextIndex = (currentIndex + 1) % CASE_STUDIES.length;
    setSelectedCaseStudy(CASE_STUDIES[nextIndex]);
  };

  return (
    <div className="min-h-screen w-full min-w-full max-w-full overflow-x-clip relative bg-[#F5F5F7] dark:bg-[#0A0A0C] text-[#1D1D1F] dark:text-[#F5F5F7] font-sans selection:bg-[#007AFF] selection:text-white">
      {/* Scroll Velocity Dynamic Motion Blur Controller */}
      <ScrollVelocityBlurController />

      {/* Midnight Atmosphere System (Dark Mode Only Canvas) */}
      <MidnightAtmosphere theme={theme} />

      {/* Apple-Style Top Reading & Depth Scroll Progress Bar */}
      <ScrollProgress />

      {/* Liquid Glass Water Drop Custom Cursor */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Global Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToWork={handleNavigateToWork}
        onOpenEstimator={() => setEstimatorOpen(true)}
        onOpenDatabaseDashboard={() => setDbDashboardOpen(true)}
        onOpenBlog={() => setBlogOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={setIsAmbientPlaying}
      />

      {/* View Switcher: Work Page Archive vs Main Home Flow */}
      {currentView === 'work' ? (
        <WorkPage
          onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
          onBackToHome={() => handleNavigateToHome('#')}
        />
      ) : (
        <main className="relative w-full min-w-full max-w-full overflow-x-clip">
          {/* 100vh Apple Launch Hero Section */}
          <Hero onOpenShowreel={() => setShowreelOpen(true)} />

          {/* Featured Work - Only 3 Selected Projects */}
          <FeaturedWork
            onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
            onNavigateToWork={handleNavigateToWork}
          />

          {/* Services & Capabilities Section */}
          <ServicesSection />

          {/* About whtamim & Creative Philosophy */}
          <AboutSection theme={theme} />

          {/* Frequently Asked Questions (FAQ) Accordion */}
          <FaqSection onOpenEstimator={() => setEstimatorOpen(true)} />

          {/* Contact & Direct Inquiry Section */}
          <ContactSection
            preFilledBrief={preFilledBrief}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Fullscreen Showreel Cinema Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        onOpenEstimator={() => {
          setShowreelOpen(false);
          setEstimatorOpen(true);
        }}
      />

      {/* Dynamically loaded Modals & Tools */}
      <Suspense fallback={null}>
        {/* Full Dedicated Project Case Study Page Modal */}
        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onSelectNext={handleSelectNextCaseStudy}
          onOpenEstimator={() => {
            setSelectedCaseStudy(null);
            setEstimatorOpen(true);
          }}
        />

        {/* Project Scope & Budget Calculator Modal */}
        <ProjectEstimator
          isOpen={estimatorOpen}
          onClose={() => setEstimatorOpen(false)}
          onPreFillInquiry={handlePreFillInquiry}
        />

        {/* Studio Database & CMS Dashboard */}
        <DatabaseDashboard
          isOpen={dbDashboardOpen}
          onClose={() => setDbDashboardOpen(false)}
        />

        {/* Blog & Editorial Modal */}
        <BlogModal
          isOpen={blogOpen}
          onClose={() => setBlogOpen(false)}
          onPreFillInquiry={handlePreFillInquiry}
        />
      </Suspense>
    </div>
  );
}
