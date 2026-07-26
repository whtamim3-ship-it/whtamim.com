import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowreelModal } from './components/ShowreelModal';
import { ClientTrust } from './components/ClientTrust';
import { FeaturedWork } from './components/FeaturedWork';
import { WorkPage } from './components/WorkPage';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AIStoryboardTool } from './components/AIStoryboardTool';
import { ServicesSection } from './components/ServicesSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudy } from './types';
import { CASE_STUDIES } from './data/portfolioData';

export default function App() {
  const [cursorEnabled] = useState<boolean>(true);

  // View state: 'home' or 'work'
  const [currentView, setCurrentView] = useState<'home' | 'work'>('home');

  // Modals & Drawers state
  const [showreelOpen, setShowreelOpen] = useState<boolean>(false);
  const [estimatorOpen, setEstimatorOpen] = useState<boolean>(false);
  const [aiStoryboardOpen, setAiStoryboardOpen] = useState<boolean>(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Pre-filled contact brief
  const [preFilledBrief, setPreFilledBrief] = useState<string>('');

  // Remove dark mode class on <html> for permanent Apple light canvas
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Handle Hash routing on initial load or manual hash changes
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#work-all' || window.location.hash === '#work-archive') {
        setCurrentView('work');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Global Tap Wash Effect Listener
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer'
      ) as HTMLElement | null;

      if (!target) return;

      // Exclude header and nav links from persistent data-tapped attribute
      if (!target.closest('header, nav, .nav-glass-link')) {
        target.setAttribute('data-tapped', 'true');
      }

      // Ensure proper relative position for radial wash ripple
      const computedStyle = window.getComputedStyle(target);
      if (computedStyle.position === 'static') {
        target.style.position = 'relative';
      }
      target.style.overflow = 'hidden';

      // Create expanding wash wave element
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.5;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const wave = document.createElement('span');
      wave.className = 'tap-wash-wave';
      wave.style.width = `${size}px`;
      wave.style.height = `${size}px`;
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;

      target.appendChild(wave);

      setTimeout(() => {
        wave.remove();
      }, 700);
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  const handleNavigateToHome = (targetSection?: string) => {
    setCurrentView('home');
    if (targetSection && targetSection !== '#') {
      setTimeout(() => {
        const el = document.querySelector(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
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
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-[#007AFF] selection:text-white">
      {/* Liquid Glass Water Drop Custom Cursor */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Global Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToWork={handleNavigateToWork}
        onOpenEstimator={() => setEstimatorOpen(true)}
        onOpenAIStoryboard={() => setAiStoryboardOpen(true)}
      />

      {/* View Switcher: Work Page Archive vs Main Home Flow */}
      {currentView === 'work' ? (
        <WorkPage
          onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
          onBackToHome={() => handleNavigateToHome('#')}
        />
      ) : (
        <main className="relative">
          {/* 100vh Apple Launch Hero Section */}
          <Hero onOpenShowreel={() => setShowreelOpen(true)} />

          {/* Client Roster & Trust Logos Bar */}
          <ClientTrust />

          {/* Featured Work - Only 3 Selected Projects */}
          <FeaturedWork
            onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
            onNavigateToWork={handleNavigateToWork}
          />

          {/* Services & Capabilities Section */}
          <ServicesSection
            onOpenEstimator={() => setEstimatorOpen(true)}
            onOpenAIStoryboard={() => setAiStoryboardOpen(true)}
          />

          {/* Production Process & Keyframe Timeline Inspector */}
          <ProcessSection />

          {/* About whtamim & Creative Philosophy */}
          <AboutSection onOpenEstimator={() => setEstimatorOpen(true)} />

          {/* Frequently Asked Questions (FAQ) Accordion */}
          <FaqSection onOpenEstimator={() => setEstimatorOpen(true)} />

          {/* Contact & Direct Inquiry Section */}
          <ContactSection preFilledBrief={preFilledBrief} />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenEstimator={() => setEstimatorOpen(true)}
        onOpenAIStoryboard={() => setAiStoryboardOpen(true)}
      />

      {/* Fullscreen Showreel Cinema Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        onOpenEstimator={() => {
          setShowreelOpen(false);
          setEstimatorOpen(true);
        }}
      />

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

      {/* Live AI Script & Motion Storyboard Generator */}
      <AIStoryboardTool
        isOpen={aiStoryboardOpen}
        onClose={() => setAiStoryboardOpen(false)}
        onPreFillInquiry={handlePreFillInquiry}
      />

      {/* Project Scope & Budget Calculator Modal */}
      <ProjectEstimator
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        onPreFillInquiry={handlePreFillInquiry}
      />
    </div>
  );
}
