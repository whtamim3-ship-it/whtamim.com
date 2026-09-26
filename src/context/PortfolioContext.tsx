import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/portfolioData';

export interface DynamicProject {
  id: string;
  title: string;
  subtitle?: string;
  client?: string;
  industry?: string;
  category: string;
  tag?: string;
  filterCategory: string;
  type?: 'youtube' | 'video' | string;
  src?: string;
  videoUrl: string;
  externalUrl?: string;
  coverImage: string;
  description?: string;
  logline?: string;
  overview?: string;
  featured: boolean;
  uploadDate: string;
  role?: string;
  year?: string;
  duration?: string;
  order?: number;
}

export interface SiteSettings {
  heroHeadline: string;
  heroSubheadline: string;
  availabilityBadge: string;
  availabilityStatus: 'available' | 'busy' | 'closed';
  contactEmail: string;
  showreelUrl: string;
  studioName: string;
  location: string;
  timezone: string;
}

export interface DynamicAssetPack {
  id: string;
  title: string;
  category: string;
  format: string;
  filesCount: string;
  size: string;
  description: string;
  specs: string[];
  tags: string[];
  badge?: string;
  recommendedFor: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Archived';
  createdAt: string;
}

export interface AdminUser {
  email: string;
  role: string;
  authenticatedAt: string;
}

interface PortfolioContextType {
  projects: DynamicProject[];
  featuredProjects: DynamicProject[];
  caseStudies: CaseStudy[];
  settings: SiteSettings;
  assetPacks: DynamicAssetPack[];
  isLoading: boolean;
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminToken: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  addProject: (project: Omit<DynamicProject, 'id'> & { id?: string }) => Promise<boolean>;
  updateProject: (id: string, updates: Partial<DynamicProject>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  updateAssetPack: (id: string, updates: Partial<DynamicAssetPack>) => Promise<boolean>;
  resetContentToDefaults: () => Promise<boolean>;
  refreshContent: () => Promise<void>;
  fetchInquiries: () => Promise<Inquiry[]>;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => Promise<boolean>;
  deleteInquiry: (id: string) => Promise<boolean>;
  updateCredentials: (email?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
}

const DEFAULT_SETTINGS: SiteSettings = {
  heroHeadline: 'Make your product feel premium, not advertised.',
  heroSubheadline: 'High-impact motion design and cinematic video editing tailored for ambitious SaaS startups and high-growth digital brands.',
  availabilityBadge: 'Available for new projects',
  availabilityStatus: 'available',
  contactEmail: 'whtamim3@gmail.com',
  showreelUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4',
  studioName: 'whtamim motion studio',
  location: 'London, UK / Remote Worldwide',
  timezone: 'Europe/London (GMT/BST)'
};

const INITIAL_PROJECTS_FALLBACK: DynamicProject[] = CASE_STUDIES.map((c) => ({
  id: c.id,
  title: c.title,
  subtitle: c.subtitle,
  client: c.client,
  industry: c.industry,
  category: c.services[0] || 'Motion Design',
  tag: c.services[0] || 'MOTION DESIGN',
  filterCategory: c.industry === 'Motion Design' || c.industry === 'UI Animation' ? 'SaaS & UI' : 'Commercials',
  type: 'video',
  src: c.heroVideoUrl,
  videoUrl: c.heroVideoUrl,
  coverImage: c.posterImage,
  logline: c.logline,
  overview: c.overview,
  featured: c.featured ?? false,
  uploadDate: c.uploadDate,
  role: c.role,
  year: c.year,
  duration: c.duration,
}));

const INITIAL_ASSET_PACKS_FALLBACK: DynamicAssetPack[] = [
  {
    id: 'saas-ui-rig',
    title: 'SaaS Dynamic UI Animation Rig',
    category: 'Motion Templates',
    format: 'AE & Premiere (.aep, .mogrt)',
    filesCount: '18 Compositions',
    size: '142 MB',
    description: 'Precision spring physics, responsive window frames, cursor interactions, and fluid mockups designed specifically for SaaS product launches and demo walkthroughs.',
    specs: ['60 FPS Native', 'Vector Resizable', 'Auto-Fit Padding', 'After Effects 2024+'],
    tags: ['After Effects', 'MOGRT', '60 FPS', 'SaaS'],
    badge: 'Popular',
    recommendedFor: 'Product hunt launches, onboarding loops, landing page motion.'
  },
  {
    id: 'cinematic-luts',
    title: 'Cinematic Clean Commercial LUTs',
    category: 'Color Profiles',
    format: '33x33 Cube (.cube)',
    filesCount: '12 LUT Profiles',
    size: '48 MB',
    description: 'Color Space Transform compatible film emulations calibrated for Sony S-Log3, Arri LogC, and Apple Log footage with natural skin tone roll-off and filmic contrast.',
    specs: ['Rec.709 & DWG', '33-Point Precision', 'Zero Banding', 'DaVinci & Premiere'],
    tags: ['DaVinci Resolve', 'Premiere', 'Rec.709', 'Color Grading'],
    badge: 'Essential',
    recommendedFor: 'Brand commercials, founder interview grades, cinematic B-roll.'
  },
  {
    id: 'ui-sfx-stems',
    title: 'High-Bitrate UI & Haptic Sound Pack',
    category: 'Audio Foley',
    format: '24-bit / 96kHz WAV',
    filesCount: '85 Sound FX',
    size: '210 MB',
    description: 'Crisp micro-interaction clicks, dynamic low-end whooshes, smooth riser sweeps, and tech swooshes tailored for modern product trailers without clipping.',
    specs: ['24-bit / 96kHz', 'Broadcast WAV', 'iXML Tagged', 'Uncompressed'],
    tags: ['Uncompressed WAV', 'Commercial Use', 'Foley', 'Sound Design'],
    badge: 'Studio Grade',
    recommendedFor: 'UI click syncing, teaser transitions, kinetic typography timing.'
  },
  {
    id: 'kinetic-typography',
    title: 'Kinetic Product Title Presets',
    category: 'Typography',
    format: 'Motion Presets (.ffx, .mogrt)',
    filesCount: '24 Presets',
    size: '64 MB',
    description: 'Fast-paced typographic stings, editorial lower thirds, and tracking transitions configured for modern European SaaS promotional pacing.',
    specs: ['Auto-Tracking', 'Responsive Time Stretch', 'Multi-Language UTF-8', 'Zero Plug-ins'],
    tags: ['Typography', 'Auto-Resize', 'MOGRT', 'Editorial'],
    badge: 'New 2026',
    recommendedFor: 'Social video hooks, value prop highlights, feature callouts.'
  }
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'whtamim_admin_token';
const USER_STORAGE_KEY = 'whtamim_admin_user';
const PROJECTS_STORAGE_KEY = 'whtamim_custom_projects';
const SETTINGS_STORAGE_KEY = 'whtamim_custom_settings';
const ASSETS_STORAGE_KEY = 'whtamim_custom_assets';

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<DynamicProject[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Auto-heal legacy broken video links
            return parsed.map((p) => {
              if (p.id === 'whatsapp-promo' && (p.src?.includes('Whatsapp_Ad_zrk3yc.mp4') || p.videoUrl?.includes('Whatsapp_Ad_zrk3yc.mp4'))) {
                return {
                  ...p,
                  src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790332092/Whatsapp_Ad.mp4',
                  videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790332092/Whatsapp_Ad.mp4'
                };
              }
              if ((p.id === 'saas-animation-redlab' || p.id === 'notchnook' || p.title?.toLowerCase().includes('music')) && (p.src?.includes('Music_jwuuat.mp4') || p.videoUrl?.includes('Music_jwuuat.mp4'))) {
                return {
                  ...p,
                  src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790334563/Music.mp4',
                  videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790334563/Music.mp4'
                };
              }
              if ((p.id === 'documentary-project' || p.id === 'claude' || p.title?.toLowerCase().includes('good night') || p.title?.toLowerCase().includes('time')) && (p.src?.includes('Time%20Ui.mp4') || p.videoUrl?.includes('Time%20Ui.mp4') || p.src?.includes('Time Ui.mp4') || p.videoUrl?.includes('Time Ui.mp4'))) {
                return {
                  ...p,
                  title: p.title === 'work' ? 'Good Night' : (p.title === 'Time & Workflow UI' ? 'Good Night UI' : p.title),
                  src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335644/Good_Night.mp4',
                  videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335644/Good_Night.mp4'
                };
              }
              if ((p.id === 'ikigai' || p.id === 'ikigai-motion' || p.title?.toLowerCase().includes('ikigai')) && (p.src?.includes('ikigai') || p.videoUrl?.includes('ikigai') || p.src?.includes('1786057552') || p.videoUrl?.includes('1786057552'))) {
                return {
                  ...p,
                  src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4',
                  videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4'
                };
              }
              if ((p.id === 'chatgpt-saas-promo' || p.title?.toLowerCase().includes('chat') || p.title?.toLowerCase().includes('gpt')) && (p.src?.includes('Chat_GPT') || p.videoUrl?.includes('Chat_GPT') || p.src?.includes('1787005445') || p.videoUrl?.includes('1787005445') || (p.src?.includes('Chat_GPT') && !p.src?.includes('1790338117')))) {
                return {
                  ...p,
                  title: 'Chat GPT Thinking',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4'
                };
              }
              if ((p.id === 'make-a-saas' || p.title?.toLowerCase().includes('make a saas') || p.src?.includes('Make_a_SAAS') || p.videoUrl?.includes('Make_a_SAAS')) && (!p.src?.includes('1790338289') || !p.videoUrl?.includes('1790338289'))) {
                return {
                  ...p,
                  title: 'Make a SAAS',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4'
                };
              }
              if ((p.id === 'pran-ghee-promo' || p.id === 'zh-motion-dc' || p.title?.toLowerCase().includes('zh motion') || p.title?.toLowerCase().includes('pran') || p.src?.includes('ZH_Motion_Dc') || p.videoUrl?.includes('ZH_Motion_Dc')) && (!p.src?.includes('1790340162') || !p.videoUrl?.includes('1790340162'))) {
                return {
                  ...p,
                  title: 'ZH Motion Dc',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4'
                };
              }
              if ((p.id === 'deta' || p.id === 'drive-motion' || p.title?.toLowerCase().includes('deta') || p.title?.toLowerCase().includes('drive') || p.src?.includes('Deta') || p.videoUrl?.includes('Deta') || p.src?.includes('Drive_hkng6w') || p.videoUrl?.includes('Drive_hkng6w')) && (!p.src?.includes('1790343976') || !p.videoUrl?.includes('1790343976'))) {
                return {
                  ...p,
                  id: 'deta',
                  title: 'Deta',
                  src: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4',
                  videoUrl: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4'
                };
              }
              return p;
            });
          }
        } catch (e) {}
      }
    }
    return INITIAL_PROJECTS_FALLBACK;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && (parsed.showreelUrl?.includes('ikigai') || parsed.showreelUrl?.includes('1786057552')) && !parsed.showreelUrl?.includes('1790335903')) {
            parsed.showreelUrl = 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4';
          }
          return { ...DEFAULT_SETTINGS, ...parsed };
        } catch (e) {}
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [assetPacks, setAssetPacks] = useState<DynamicAssetPack[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(ASSETS_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return INITIAL_ASSET_PACKS_FALLBACK;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Admin Auth State
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null;
  });
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return null; }
      }
    }
    return null;
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const user = localStorage.getItem(USER_STORAGE_KEY);
      return Boolean(token && user);
    }
    return false;
  });

  // Fetch Public Content from API or retain cached/fallback
  const refreshContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.projects && Array.isArray(json.data.projects)) {
            const healedProjects = json.data.projects.map((p: DynamicProject) => {
              if ((p.id === 'ikigai' || p.id === 'ikigai-motion' || p.title?.toLowerCase().includes('ikigai')) && (p.src?.includes('1786057552') || p.videoUrl?.includes('1786057552') || (p.src?.includes('ikigai') && !p.src?.includes('1790335903')))) {
                return {
                  ...p,
                  src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4',
                  videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4'
                };
              }
              if ((p.id === 'chatgpt-saas-promo' || p.title?.toLowerCase().includes('chat') || p.title?.toLowerCase().includes('gpt')) && (p.src?.includes('1787005445') || p.videoUrl?.includes('1787005445') || (p.src?.includes('Chat_GPT') && !p.src?.includes('1790338117')))) {
                return {
                  ...p,
                  title: 'Chat GPT Thinking',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4'
                };
              }
              if ((p.id === 'make-a-saas' || p.title?.toLowerCase().includes('make a saas') || p.src?.includes('Make_a_SAAS') || p.videoUrl?.includes('Make_a_SAAS')) && (!p.src?.includes('1790338289') || !p.videoUrl?.includes('1790338289'))) {
                return {
                  ...p,
                  title: 'Make a SAAS',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4'
                };
              }
              if ((p.id === 'pran-ghee-promo' || p.id === 'zh-motion-dc' || p.title?.toLowerCase().includes('zh motion') || p.title?.toLowerCase().includes('pran') || p.src?.includes('ZH_Motion_Dc') || p.videoUrl?.includes('ZH_Motion_Dc')) && (!p.src?.includes('1790340162') || !p.videoUrl?.includes('1790340162'))) {
                return {
                  ...p,
                  title: 'ZH Motion Dc',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4'
                };
              }
              if ((p.id === 'deta' || p.id === 'drive-motion' || p.title?.toLowerCase().includes('deta') || p.title?.toLowerCase().includes('drive') || p.src?.includes('Deta') || p.videoUrl?.includes('Deta') || p.src?.includes('Drive_hkng6w') || p.videoUrl?.includes('Drive_hkng6w')) && (!p.src?.includes('1790343976') || !p.videoUrl?.includes('1790343976'))) {
                return {
                  ...p,
                  id: 'deta',
                  title: 'Deta',
                  src: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4',
                  videoUrl: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4'
                };
              }
              return p;
            });
            setProjects(healedProjects);
            localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(healedProjects));
          }
          if (json.data.settings) {
            const healedSettings = { ...json.data.settings };
            if (healedSettings.showreelUrl && (healedSettings.showreelUrl.includes('ikigai') || healedSettings.showreelUrl.includes('1786057552')) && !healedSettings.showreelUrl.includes('1790335903')) {
              healedSettings.showreelUrl = 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4';
            }
            setSettings(healedSettings);
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(healedSettings));
          }
          if (json.data.assetPacks && Array.isArray(json.data.assetPacks)) {
            setAssetPacks(json.data.assetPacks);
            localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(json.data.assetPacks));
          }
        }
      }
    } catch (err) {
      console.warn('Could not fetch dynamic content from API, retaining cached state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify Admin Session on mount
  useEffect(() => {
    refreshContent();

    const verifyExistingToken = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!token) {
        setIsAdminAuthenticated(false);
        setAdminUser(null);
        return;
      }

      // If token is local fallback session
      if (token.startsWith('admin_token_')) {
        setIsAdminAuthenticated(true);
        return;
      }

      try {
        const res = await fetch('/api/admin/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.valid) {
            setIsAdminAuthenticated(true);
            setAdminToken(token);
            if (json.user) {
              setAdminUser(json.user);
              localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(json.user));
            }
            return;
          }
        } else if (res.status === 401) {
          // If unauthorized by server, clear session
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(USER_STORAGE_KEY);
          setAdminToken(null);
          setAdminUser(null);
          setIsAdminAuthenticated(false);
          return;
        } else if (res.status === 404) {
          // Static host without /api/admin/verify, maintain existing valid session if present
          const savedUser = localStorage.getItem(USER_STORAGE_KEY);
          if (savedUser) {
            setIsAdminAuthenticated(true);
          }
        }
      } catch (e) {
        console.warn('Session verification notice (offline/static fallback active):', e);
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (savedUser) {
          setIsAdminAuthenticated(true);
        }
      }
    };

    verifyExistingToken();
  }, []);

  // Admin Login
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. First attempt backend API login
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.token) {
          setAdminToken(data.token);
          setAdminUser(data.user);
          setIsAdminAuthenticated(true);
          localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
          return { success: true };
        }
      } else if (res.status === 401) {
        const errData = await res.json().catch(() => ({}));
        // If the server explicitly rejected the credentials, do not fall back to demo unless matching local env
        const validEmail = (((import.meta as any).env?.VITE_ADMIN_EMAIL || 'whtamim3@gmail.com') as string).toLowerCase();
        const validPassword = ((import.meta as any).env?.VITE_ADMIN_PASSWORD || 'whtamim2026!') as string;
        if (normalizedEmail !== validEmail || password !== validPassword) {
          return { success: false, error: errData.error || 'Invalid credentials' };
        }
      }
    } catch (netErr) {
      console.warn('Backend authentication API unreachable, using credential validation fallback:', netErr);
    }

    // 2. Direct Credential Check Fallback (for static hosting or offline container)
    const validEmail = (((import.meta as any).env?.VITE_ADMIN_EMAIL || 'whtamim3@gmail.com') as string).toLowerCase();
    const validPassword = ((import.meta as any).env?.VITE_ADMIN_PASSWORD || 'whtamim2026!') as string;

    if (normalizedEmail === validEmail && password === validPassword) {
      const fallbackUser: AdminUser = {
        email: validEmail,
        role: 'superadmin',
        authenticatedAt: new Date().toISOString()
      };
      const fallbackToken = `admin_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      setAdminToken(fallbackToken);
      setAdminUser(fallbackUser);
      setIsAdminAuthenticated(true);
      localStorage.setItem(TOKEN_STORAGE_KEY, fallbackToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fallbackUser));
      return { success: true };
    }

    return { success: false, error: 'Invalid admin email or password. Please verify your credentials.' };
  };

  // Admin Logout
  const logout = async () => {
    if (adminToken && !adminToken.startsWith('admin_token_')) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (e) {
        console.warn('Logout notification error:', e);
      }
    }
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setAdminToken(null);
    setAdminUser(null);
    setIsAdminAuthenticated(false);
  };

  // Admin: Update Settings
  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));

    if (!adminToken || adminToken.startsWith('admin_token_')) return true;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data.settings));
          return true;
        }
      }
      return true;
    } catch (e) {
      console.warn('Settings saved locally (server sync notice):', e);
      return true;
    }
  };

  // Admin: Add Project
  const addProject = async (project: Omit<DynamicProject, 'id'> & { id?: string }): Promise<boolean> => {
    const newId = project.id || `proj-${Date.now()}`;
    const newProj: DynamicProject = { ...project, id: newId };
    const updated = [newProj, ...projects];
    setProjects(updated);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));

    if (!adminToken || adminToken.startsWith('admin_token_')) return true;
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(project)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.project) {
          setProjects((prev) => [data.project, ...prev.filter(p => p.id !== newId)]);
        }
      }
      return true;
    } catch (e) {
      console.warn('Project saved locally (server sync notice):', e);
      return true;
    }
  };

  // Admin: Update Project
  const updateProject = async (id: string, updates: Partial<DynamicProject>): Promise<boolean> => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProjects(updated);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));

    if (!adminToken || adminToken.startsWith('admin_token_')) return true;
    try {
      const res = await fetch(`/api/admin/projects/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.project) {
          setProjects((prev) => prev.map((p) => (p.id === id ? data.project : p)));
        }
      }
      return true;
    } catch (e) {
      console.warn('Project updated locally (server sync notice):', e);
      return true;
    }
  };

  // Admin: Delete Project
  const deleteProject = async (id: string): Promise<boolean> => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));

    if (!adminToken || adminToken.startsWith('admin_token_')) return true;
    try {
      await fetch(`/api/admin/projects/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      return true;
    } catch (e) {
      console.warn('Project deleted locally (server sync notice):', e);
      return true;
    }
  };

  // Admin: Update Asset Pack
  const updateAssetPack = async (id: string, updates: Partial<DynamicAssetPack>): Promise<boolean> => {
    const updated = assetPacks.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAssetPacks(updated);
    localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(updated));

    if (!adminToken || adminToken.startsWith('admin_token_')) return true;
    try {
      await fetch(`/api/admin/assets/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(updates)
      });
      return true;
    } catch (e) {
      console.warn('Asset pack updated locally (server sync notice):', e);
      return true;
    }
  };

  // Admin: Reset Content to Factory Defaults
  const resetContentToDefaults = async (): Promise<boolean> => {
    setProjects(INITIAL_PROJECTS_FALLBACK);
    setSettings(DEFAULT_SETTINGS);
    setAssetPacks(INITIAL_ASSET_PACKS_FALLBACK);
    localStorage.removeItem(PROJECTS_STORAGE_KEY);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    localStorage.removeItem(ASSETS_STORAGE_KEY);

    if (!adminToken || adminToken.startsWith('admin_token_')) return true;
    try {
      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setProjects(data.data.projects);
          setSettings(data.data.settings);
          setAssetPacks(data.data.assetPacks);
        }
      }
      return true;
    } catch (e) {
      console.warn('Reset to defaults performed locally:', e);
      return true;
    }
  };

  // Admin: Inquiries
  const fetchInquiries = async (): Promise<Inquiry[]> => {
    if (!adminToken) return [];
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const json = await res.json();
        return json.inquiries || [];
      }
      return [];
    } catch (e) {
      console.warn('Inquiries fetch notice (using cached/fallback):', e);
      return [];
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status })
      });
      return res.ok;
    } catch (e) {
      console.warn('Inquiry update status notice:', e);
      return true;
    }
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      return res.ok;
    } catch (e) {
      console.warn('Inquiry delete notice:', e);
      return true;
    }
  };

  // Admin: Update Credentials
  const updateCredentials = async (email?: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    if (!adminToken) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch('/api/admin/update-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        if (email) {
          const updatedUser: AdminUser = {
            email,
            role: adminUser?.role || 'superadmin',
            authenticatedAt: new Date().toISOString()
          };
          setAdminUser(updatedUser);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        }
      }
      return data;
    } catch (e: any) {
      if (email) {
        const updatedUser: AdminUser = {
          email,
          role: adminUser?.role || 'superadmin',
          authenticatedAt: new Date().toISOString()
        };
        setAdminUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        return { success: true };
      }
      return { success: false, error: e.message || 'Failed to update credentials' };
    }
  };

  // Memoized featured projects
  const featuredProjects = useMemo(() => {
    const f = projects.filter((p) => p.featured);
    return f.length > 0 ? f : projects.slice(0, 3);
  }, [projects]);

  // Derived CaseStudy objects for legacy/modal interfaces
  const caseStudies = useMemo<CaseStudy[]>(() => {
    if (projects.length > 0) {
      return projects.map((p) => {
        const existing = CASE_STUDIES.find((c) => c.id === p.id);
        if (existing) {
          return {
            ...existing,
            title: p.title,
            subtitle: p.subtitle || existing.subtitle,
            client: p.client || existing.client,
            heroVideoUrl: p.videoUrl || existing.heroVideoUrl,
            posterImage: p.coverImage || existing.posterImage,
            featured: p.featured,
            uploadDate: p.uploadDate || existing.uploadDate,
            logline: p.logline || existing.logline,
            overview: p.overview || existing.overview
          };
        }
        return {
          id: p.id,
          title: p.title,
          subtitle: p.subtitle || `${p.category} Showpiece`,
          client: p.client || 'Client Project',
          industry: p.industry || p.category,
          services: [p.tag || p.category.toUpperCase()],
          role: p.role || 'Lead Motion Designer',
          deliverables: ['Promotional Master', 'Social Cuts'],
          tools: ['Adobe After Effects', 'Premiere Pro'],
          year: p.year || '2026',
          budgetTier: 'Custom Scope',
          duration: p.duration || '30-60 Seconds',
          heroVideoUrl: p.videoUrl,
          posterImage: p.coverImage,
          logline: p.logline || 'Precision visual storytelling and kinetic motion design.',
          overview: p.overview || p.description || 'Dynamic motion design project created by whtamim studio.',
          challenge: 'Executing engaging pacing and visual clarity.',
          goal: 'Deliver high-impact conversion-focused visuals.',
          strategy: 'Sound-synced animation and modern aesthetic.',
          storytellingApproach: 'Clear kinetic pacing and sleek typography.',
          motionDesignBreakdown: [],
          behindTheScenes: [],
          multiFormatCuts: [],
          results: [{ metric: '100%', label: 'Visual Precision' }],
          featured: p.featured,
          uploadDate: p.uploadDate
        };
      });
    }
    return CASE_STUDIES;
  }, [projects]);

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        featuredProjects,
        caseStudies,
        settings,
        assetPacks,
        isLoading,
        isAdminAuthenticated,
        adminUser,
        adminToken,
        login,
        logout,
        updateSettings,
        addProject,
        updateProject,
        deleteProject,
        updateAssetPack,
        resetContentToDefaults,
        refreshContent,
        fetchInquiries,
        updateInquiryStatus,
        deleteInquiry,
        updateCredentials
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
