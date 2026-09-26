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
import { AssetsPage } from './components/AssetsPage';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollVelocityBlurController } from './components/ScrollVelocityBlurController';
import { CaseStudy } from './types';
import { CASE_STUDIES } from './data/portfolioData';
import { applyPageSeo, SeoSectionKey } from './utils/seo';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Dynamically imported components for optimized initial load
const CaseStudyModal = lazy(() => import('./components/CaseStudyModal'));
const ProjectEstimator = lazy(() => import('./components/ProjectEstimator'));
const DatabaseDashboard = lazy(() => import('./components/DatabaseDashboard').then(m => ({ default: m.DatabaseDashboard })));
const BlogModal = lazy(() => import('./components/BlogModal').then(m => ({ default: m.BlogModal })));
const AdminPage = lazy(() => import('./components/admin/AdminPage').then(m => ({ default: m.AdminPage })));

function MainAppContent() {
  const { isAdminAuthenticated } = usePortfolio();
  const [cursorEnabled] = useState<boolean>(true);

  // View state: 'home', 'work', 'assets', or 'admin'
  const [currentView, setCurrentView] = useState<'home' | 'work' | 'assets' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        pathname === '/admin' ||
        pathname === '/admin/' ||
        pathname.startsWith('/admin/') ||
        pathname === '/admin/index' ||
        pathname === '/admin/index.html' ||
        hash === '#admin' ||
        hash.startsWith('#admin') ||
        search.includes('view=admin') ||
        search.includes('p=%2fadmin') ||
        search.includes('p=/admin')
      ) {
        return 'admin';
      }
      if (pathname === '/assets' || pathname === '/assets/' || hash === '#assets' || search.includes('p=%2fassets')) {
        return 'assets';
      }
      if (
        pathname === '/work' ||
        pathname === '/work/' ||
        hash === '#work-all' ||
        hash === '#work-archive' ||
        search.includes('p=%2fwork')
      ) {
        return 'work';
      }
    }
    return 'home';
  });

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

  // Dynamic European SaaS & Motion Design SEO Management
  useEffect(() => {
    const updateActiveSeo = () => {
      if (currentView === 'admin') {
        document.title = 'Studio Admin | whtamim.work';
        return;
      }
      if (currentView === 'work') {
        applyPageSeo('work');
        return;
      }
      if (currentView === 'assets') {
        applyPageSeo('assets');
        return;
      }

      const hash = window.location.hash.toLowerCase();
      if (hash === '#work' || hash === '#work-all' || hash === '#work-archive') {
        applyPageSeo('work');
        return;
      }
      if (hash === '#about') {
        applyPageSeo('about');
        return;
      }
      if (hash === '#assets') {
        applyPageSeo('assets');
        return;
      }

      // If at top or home
      if (window.scrollY < 250) {
        applyPageSeo('home');
        return;
      }

      // Check sections in viewport on home page
      const sections: { key: SeoSectionKey; selector: string }[] = [
        { key: 'work', selector: '#work' },
        { key: 'about', selector: '#about' },
      ];

      let matched = false;
      for (const sec of sections) {
        const el = document.querySelector(sec.selector);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.25) {
            applyPageSeo(sec.key);
            matched = true;
            break;
          }
        }
      }

      if (!matched && window.scrollY < 600) {
        applyPageSeo('home');
      }
    };

    updateActiveSeo();
    window.addEventListener('scroll', updateActiveSeo, { passive: true });
    window.addEventListener('hashchange', updateActiveSeo);
    window.addEventListener('popstate', updateActiveSeo);

    return () => {
      window.removeEventListener('scroll', updateActiveSeo);
      window.removeEventListener('hashchange', updateActiveSeo);
      window.removeEventListener('popstate', updateActiveSeo);
    };
  }, [currentView]);

  // Handle Hash/URL routing on initial load or manual navigation
  useEffect(() => {
    const handleRouting = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (
        pathname === '/admin' ||
        pathname === '/admin/' ||
        pathname.startsWith('/admin/') ||
        pathname === '/admin/index' ||
        pathname === '/admin/index.html' ||
        hash === '#admin' ||
        hash.startsWith('#admin') ||
        search.includes('view=admin') ||
        search.includes('p=%2fadmin') ||
        search.includes('p=/admin')
      ) {
        setCurrentView('admin');
      } else if (pathname === '/assets' || pathname === '/assets/' || hash === '#assets' || search.includes('p=%2fassets')) {
        setCurrentView('assets');
      } else if (
        pathname === '/work' ||
        pathname === '/work/' ||
        hash === '#work-all' ||
        hash === '#work-archive' ||
        search.includes('p=%2fwork')
      ) {
        setCurrentView('work');
      } else if (
        (pathname === '/' || pathname === '') &&
        !hash.includes('assets') &&
        !hash.includes('work-all') &&
        !hash.includes('work-archive') &&
        !hash.includes('admin') &&
        !search.includes('admin')
      ) {
        if (currentView === 'assets' || currentView === 'work' || currentView === 'admin') {
          setCurrentView('home');
        }
      }

      if (pathname === '/blog' || hash === '#blog') {
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
  }, [currentView]);

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
          if (currentView === 'work' || currentView === 'assets' || currentView === 'admin') {
            handleNavigateToHome('#');
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
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
    const newUrl = targetSection && targetSection !== '#' ? `/${targetSection}` : '/';
    if (window.location.pathname !== '/' || (targetSection && window.location.hash !== targetSection)) {
      window.history.pushState(null, '', newUrl);
    }

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
    if (window.location.pathname !== '/work') {
      window.history.pushState(null, '', '/work');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAssets = () => {
    setCurrentView('assets');
    if (window.location.pathname !== '/assets') {
      window.history.pushState(null, '', '/assets');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAdmin = () => {
    setCurrentView('admin');
    if (window.location.pathname !== '/admin') {
      window.history.pushState(null, '', '/admin');
    }
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

      {/* Global Navigation Header (Hidden on dedicated admin page for clean focused workspace) */}
      {currentView !== 'admin' && (
        <Navbar
          currentView={currentView}
          onNavigateToHome={handleNavigateToHome}
          onNavigateToWork={handleNavigateToWork}
          onNavigateToAssets={handleNavigateToAssets}
          onNavigateToAdmin={handleNavigateToAdmin}
          onOpenEstimator={() => setEstimatorOpen(true)}
          onOpenDatabaseDashboard={() => setDbDashboardOpen(true)}
          onOpenBlog={() => setBlogOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          isAmbientPlaying={isAmbientPlaying}
          onToggleAmbient={setIsAmbientPlaying}
        />
      )}

      {/* View Switcher: Dedicated Admin Route vs Work Page vs Dedicated Assets Page vs Main Home Flow */}
      {currentView === 'admin' ? (
        <Suspense fallback={
          <div className="min-h-screen w-full bg-[#0A0A0C] text-[#F5F5F7] flex flex-col items-center justify-center font-mono text-sm">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin mb-4" />
            <span className="text-neutral-400">Loading Studio Admin Control...</span>
          </div>
        }>
          <AdminPage
            onNavigateHome={() => handleNavigateToHome('#')}
            onNavigateWork={handleNavigateToWork}
            onNavigateAssets={handleNavigateToAssets}
          />
        </Suspense>
      ) : currentView === 'work' ? (
        <WorkPage
          onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
          onBackToHome={() => handleNavigateToHome('#')}
        />
      ) : currentView === 'assets' ? (
        <AssetsPage
          onBackToHome={() => handleNavigateToHome('#')}
          onOpenInquiry={handlePreFillInquiry}
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

      {/* Footer (Rendered on non-admin pages) */}
      {currentView !== 'admin' && (
        <Footer onNavigateToAdmin={handleNavigateToAdmin} />
      )}

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

        {/* Studio Database & CMS Dashboard Modal */}
        <DatabaseDashboard
          isOpen={dbDashboardOpen}
          onClose={() => setDbDashboardOpen(false)}
          onOpenFullAdmin={() => {
            setDbDashboardOpen(false);
            handleNavigateToAdmin();
          }}
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

export default function App() {
  return (
    <PortfolioProvider>
      <MainAppContent />
    </PortfolioProvider>
  );
}
