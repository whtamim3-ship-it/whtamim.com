import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const ADMIN_CONFIG_FILE = path.join(DATA_DIR, 'admin-config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

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

export interface SiteContent {
  settings: SiteSettings;
  projects: DynamicProject[];
  assetPacks: DynamicAssetPack[];
  lastUpdated: string;
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

export interface Session {
  token: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

// Initial default projects matching portfolio
const INITIAL_PROJECTS: DynamicProject[] = [
  {
    id: 'whatsapp-promo',
    title: 'WhatsApp Promo',
    subtitle: 'High-Impact Promotional Motion Design',
    client: 'WhatsApp Campaign',
    industry: 'Motion Design',
    category: 'Motion Design',
    tag: 'MOTION DESIGN',
    filterCategory: 'SaaS & UI',
    type: 'video',
    src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790332092/Whatsapp_Ad.mp4',
    videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790332092/Whatsapp_Ad.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    logline: 'Dynamic visual motion design and promotional product animation.',
    overview: 'High-energy promotional motion graphics crafted for social marketing and visual product storytelling.',
    featured: true,
    uploadDate: '2026-08-16',
    role: 'Lead Motion Designer & Animator',
    year: '2026',
    duration: '30 Seconds'
  },
  {
    id: 'saas-animation-redlab',
    title: 'Music App UI',
    subtitle: 'Kinetic UI Motion & Digital Product Showcase',
    client: 'RedLab Studio',
    industry: 'UI Animation',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    type: 'video',
    src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790334563/Music.mp4',
    videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790334563/Music.mp4',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    logline: 'Stunning dynamic concepts and dark mode dashboard interfaces animated with micro-interactions.',
    overview: 'Collaboration with RedLab Studio demonstrating complex software features through intuitive UI motion.',
    featured: true,
    uploadDate: '2026-08-14',
    role: 'Lead Video Editor & Motion Designer',
    year: '2026',
    duration: '60 Seconds'
  },
  {
    id: 'documentary-project',
    title: 'Good Night UI',
    subtitle: 'Kinetic Mobile UI & Sleep Interface Animation',
    client: 'Good Night App',
    industry: 'UI Animation',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    type: 'video',
    src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335644/Good_Night.mp4',
    videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335644/Good_Night.mp4',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    logline: 'An elegant, fluid mobile UI concept featuring seamless gesture-based navigation.',
    overview: 'Clean, minimalist mobile bedtime and sleep experience motion design showcasing fluid gesture navigation.',
    featured: true,
    uploadDate: '2026-08-14',
    role: 'Lead UI Animator & Motion Designer',
    year: '2026',
    duration: '10 Seconds'
  },
  {
    id: 'youtube-kbd',
    title: 'YouTube Commercial',
    category: 'Commercial',
    tag: 'COMMERCIAL',
    filterCategory: 'Commercials',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/kBDucd_m7wk?autoplay=1&mute=1&loop=1&playlist=kBDucd_m7wk&controls=0&modestbranding=1&rel=0&showinfo=0',
    videoUrl: 'https://www.youtube.com/embed/kBDucd_m7wk?autoplay=1&mute=1&loop=1&playlist=kBDucd_m7wk&controls=0&modestbranding=1&rel=0&showinfo=0',
    externalUrl: 'https://www.youtube.com/watch?v=kBDucd_m7wk',
    coverImage: 'https://img.youtube.com/vi/kBDucd_m7wk/maxresdefault.jpg',
    uploadDate: '2026-08-22',
    featured: false
  },
  {
    id: 'youtube-cinematic-uc8p',
    title: 'Cinematic & VFX Showcase',
    category: 'Cinematic / VFX',
    tag: 'CINEMATIC / VFX',
    filterCategory: 'Cinematic / VFX',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/uc8pp0fLgzs?autoplay=1&mute=1&loop=1&playlist=uc8pp0fLgzs&controls=0&modestbranding=1&rel=0&showinfo=0',
    videoUrl: 'https://www.youtube.com/embed/uc8pp0fLgzs?autoplay=1&mute=1&loop=1&playlist=uc8pp0fLgzs&controls=0&modestbranding=1&rel=0&showinfo=0',
    externalUrl: 'https://www.youtube.com/watch?v=uc8pp0fLgzs',
    coverImage: 'https://img.youtube.com/vi/uc8pp0fLgzs/maxresdefault.jpg',
    uploadDate: '2026-08-22',
    featured: false
  },
  {
    id: 'youtube-short-jDXv',
    title: 'Talking Head — Short',
    category: 'Talking Head',
    tag: 'TALKING HEAD',
    filterCategory: 'Talking Head',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/jDXv__tRgKM?autoplay=1&mute=1&loop=1&playlist=jDXv__tRgKM&controls=0&modestbranding=1&rel=0&showinfo=0',
    videoUrl: 'https://www.youtube.com/embed/jDXv__tRgKM?autoplay=1&mute=1&loop=1&playlist=jDXv__tRgKM&controls=0&modestbranding=1&rel=0&showinfo=0',
    externalUrl: 'https://www.youtube.com/shorts/jDXv__tRgKM',
    coverImage: 'https://img.youtube.com/vi/jDXv__tRgKM/hqdefault.jpg',
    uploadDate: '2026-08-22',
    featured: false
  },
  {
    id: 'chatgpt-saas-promo',
    title: 'Chat GPT Thinking',
    category: 'MOTION DESIGN',
    tag: 'MOTION DESIGN',
    filterCategory: 'SaaS & UI',
    type: 'video',
    src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4',
    videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-18',
    featured: false
  },
  {
    id: 'ikigai-motion',
    title: 'Ikigai Motion',
    subtitle: 'Cinematic Motion Design & Visual Storytelling',
    client: 'Ikigai Studio',
    industry: 'Motion Design',
    category: 'Motion Design',
    tag: 'MOTION DESIGN',
    filterCategory: 'SaaS & UI',
    type: 'video',
    src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4',
    videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    logline: 'A striking blend of typography and cinematic atmosphere.',
    overview: 'Exploring balance and harmony through fluid 3D motion and typography.',
    uploadDate: '2026-08-14',
    featured: false
  },
  {
    id: 'pran-ghee-promo',
    title: 'ZH Motion Dc',
    subtitle: 'High-Impact Brand Commercial for PRAN Group',
    client: 'PRAN',
    industry: 'UI animation',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'Commercials',
    type: 'video',
    src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4',
    videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    logline: 'A seamless, dynamic interface motion design communicating complex product actions.',
    overview: 'Crafted a high-energy promotional advertisement for PRAN focused on appetizing visual storytelling.',
    uploadDate: '2026-08-14',
    featured: false
  },
  {
    id: 'make-a-saas',
    title: 'Make a SAAS',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    type: 'video',
    src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4',
    videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14',
    featured: false
  },
  {
    id: 'deta',
    title: 'Deta',
    category: 'UI animation',
    tag: 'UI ANIMATION',
    filterCategory: 'SaaS & UI',
    type: 'video',
    src: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4',
    videoUrl: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    uploadDate: '2026-08-14',
    featured: false
  }
];

const INITIAL_SETTINGS: SiteSettings = {
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

const INITIAL_ASSET_PACKS: DynamicAssetPack[] = [
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

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Sarah Jenkins',
    email: 'sarah@fintechpulse.io',
    company: 'FintechPulse',
    projectType: 'SaaS UI Animation',
    budget: '$5,000 - $10,000',
    timeline: '2-4 weeks',
    message: 'We need 3 high-converting product motion promos for our upcoming Series A launch.',
    status: 'New',
    createdAt: '2026-09-08 14:22'
  },
  {
    id: 'inq-2',
    name: 'Marcus Vance',
    email: 'marcus@apexvisuals.com',
    company: 'Apex Visuals',
    projectType: 'Cinematic VFX / Commercial',
    budget: '$10,000+',
    timeline: '1-2 months',
    message: 'Looking for high-end commercial video editing, color grading, and sound design for our new campaign.',
    status: 'In Progress',
    createdAt: '2026-09-07 09:15'
  }
];

class AdminStore {
  private content: SiteContent;
  private inquiries: Inquiry[];
  private sessions: Map<string, Session> = new Map();
  private adminEmail: string;
  private adminPasswordHash: string;

  constructor() {
    this.adminEmail = process.env.ADMIN_EMAIL || 'whtamim3@gmail.com';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'whtamim2026!';
    this.adminPasswordHash = this.hashPassword(defaultPassword);

    this.loadAdminConfig();
    this.content = this.loadContent();
    this.inquiries = this.loadInquiries();
    this.loadSessions();
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password.trim()).digest('hex');
  }

  private loadAdminConfig() {
    try {
      if (fs.existsSync(ADMIN_CONFIG_FILE)) {
        const raw = fs.readFileSync(ADMIN_CONFIG_FILE, 'utf8');
        const data = JSON.parse(raw);
        if (data.email) this.adminEmail = data.email;
        if (data.passwordHash) this.adminPasswordHash = data.passwordHash;
      }
    } catch (e) {
      console.warn('Could not read admin-config.json:', e);
    }
  }

  private saveAdminConfig() {
    try {
      fs.writeFileSync(
        ADMIN_CONFIG_FILE,
        JSON.stringify({ email: this.adminEmail, passwordHash: this.adminPasswordHash }, null, 2),
        'utf8'
      );
    } catch (e) {
      console.error('Error saving admin-config.json:', e);
    }
  }

  private loadContent(): SiteContent {
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        const raw = fs.readFileSync(CONTENT_FILE, 'utf8');
        const parsed: SiteContent = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.projects)) {
          let updated = false;
          parsed.projects = parsed.projects.map((p) => {
            if (p.id === 'whatsapp-promo' && (p.src?.includes('Whatsapp_Ad_zrk3yc.mp4') || p.videoUrl?.includes('Whatsapp_Ad_zrk3yc.mp4'))) {
              updated = true;
              return {
                ...p,
                src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790332092/Whatsapp_Ad.mp4',
                videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790332092/Whatsapp_Ad.mp4'
              };
            }
            if ((p.id === 'saas-animation-redlab' || p.id === 'notchnook' || p.title?.toLowerCase().includes('music')) && (p.src?.includes('Music_jwuuat.mp4') || p.videoUrl?.includes('Music_jwuuat.mp4'))) {
              updated = true;
              return {
                ...p,
                src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790334563/Music.mp4',
                videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790334563/Music.mp4'
              };
            }
            if ((p.id === 'documentary-project' || p.id === 'claude' || p.title?.toLowerCase().includes('good night') || p.title?.toLowerCase().includes('time')) && (p.src?.includes('Time%20Ui.mp4') || p.videoUrl?.includes('Time%20Ui.mp4') || p.src?.includes('Time Ui.mp4') || p.videoUrl?.includes('Time Ui.mp4'))) {
              updated = true;
              return {
                ...p,
                title: p.title === 'work' ? 'Good Night' : (p.title === 'Time & Workflow UI' ? 'Good Night UI' : p.title),
                src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335644/Good_Night.mp4',
                videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335644/Good_Night.mp4'
              };
            }
            if ((p.id === 'ikigai' || p.id === 'ikigai-motion' || p.title?.toLowerCase().includes('ikigai')) && (p.src?.includes('ikigai') || p.videoUrl?.includes('ikigai') || p.src?.includes('1786057552') || p.videoUrl?.includes('1786057552'))) {
              if (p.src !== 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4') {
                updated = true;
                return {
                  ...p,
                  src: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4',
                  videoUrl: 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4'
                };
              }
            }
            if ((p.id === 'chatgpt-saas-promo' || p.title?.toLowerCase().includes('chat') || p.title?.toLowerCase().includes('gpt')) && (p.src?.includes('Chat_GPT') || p.videoUrl?.includes('Chat_GPT') || p.src?.includes('1787005445') || p.videoUrl?.includes('1787005445') || (p.src?.includes('Chat_GPT') && !p.src?.includes('1790338117')))) {
              if (p.src !== 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4') {
                updated = true;
                return {
                  ...p,
                  title: 'Chat GPT Thinking',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338117/Chat_GPT_Thinking.mp4'
                };
              }
            }
            if ((p.id === 'make-a-saas' || p.title?.toLowerCase().includes('make a saas') || p.src?.includes('Make_a_SAAS') || p.videoUrl?.includes('Make_a_SAAS'))) {
              if (p.src !== 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4') {
                updated = true;
                return {
                  ...p,
                  title: 'Make a SAAS',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4'
                };
              }
            }
            if ((p.id === 'pran-ghee-promo' || p.id === 'zh-motion-dc' || p.title?.toLowerCase().includes('zh motion') || p.title?.toLowerCase().includes('pran') || p.src?.includes('ZH_Motion_Dc') || p.videoUrl?.includes('ZH_Motion_Dc'))) {
              if (p.src !== 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4') {
                updated = true;
                return {
                  ...p,
                  title: 'ZH Motion Dc',
                  src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4',
                  videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790340162/ZH_Motion_Dc.mp4'
                };
              }
            }
            if ((p.id === 'deta' || p.id === 'drive-motion' || p.title?.toLowerCase().includes('deta') || p.title?.toLowerCase().includes('drive') || p.src?.includes('Deta') || p.videoUrl?.includes('Deta') || p.src?.includes('Drive_hkng6w') || p.videoUrl?.includes('Drive_hkng6w'))) {
              if (p.src !== 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4') {
                updated = true;
                return {
                  ...p,
                  id: 'deta',
                  title: 'Deta',
                  src: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4',
                  videoUrl: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4'
                };
              }
            }
            return p;
          });
          const hasMakeSaas = parsed.projects.some(p => p.id === 'make-a-saas' || p.title?.toLowerCase().includes('make a saas'));
          if (!hasMakeSaas) {
            parsed.projects.push({
              id: 'make-a-saas',
              title: 'Make a SAAS',
              category: 'UI animation',
              tag: 'UI ANIMATION',
              filterCategory: 'SaaS & UI',
              type: 'video',
              src: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4',
              videoUrl: 'https://res.cloudinary.com/ibm9kfbm/video/upload/v1790338289/Make_a_SAAS.mp4',
              coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
              uploadDate: '2026-08-14',
              featured: false
            });
            updated = true;
          }
          const hasDeta = parsed.projects.some(p => p.id === 'deta' || p.title?.toLowerCase().includes('deta'));
          if (!hasDeta) {
            parsed.projects.push({
              id: 'deta',
              title: 'Deta',
              category: 'UI animation',
              tag: 'UI ANIMATION',
              filterCategory: 'SaaS & UI',
              type: 'video',
              src: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4',
              videoUrl: 'https://res.cloudinary.com/ahuv4pom/video/upload/v1790343976/Deta.mp4',
              coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
              uploadDate: '2026-08-14',
              featured: false
            });
            updated = true;
          }
          if (parsed.settings?.showreelUrl && (parsed.settings.showreelUrl.includes('ikigai') || parsed.settings.showreelUrl.includes('1786057552')) && !parsed.settings.showreelUrl.includes('1790335903')) {
            parsed.settings.showreelUrl = 'https://res.cloudinary.com/sahrey6n/video/upload/v1790335903/ikigai.mp4';
            updated = true;
          }
          if (updated) {
            this.saveContent(parsed);
          }
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse site-content.json, using defaults:', e);
    }

    const defaultContent: SiteContent = {
      settings: INITIAL_SETTINGS,
      projects: INITIAL_PROJECTS,
      assetPacks: INITIAL_ASSET_PACKS,
      lastUpdated: new Date().toISOString()
    };
    this.saveContent(defaultContent);
    return defaultContent;
  }

  private saveContent(content: SiteContent) {
    try {
      this.content = content;
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
    } catch (e) {
      console.error('Error saving site-content.json:', e);
    }
  }

  private loadInquiries(): Inquiry[] {
    try {
      if (fs.existsSync(INQUIRIES_FILE)) {
        const raw = fs.readFileSync(INQUIRIES_FILE, 'utf8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to parse inquiries.json, using defaults:', e);
    }

    this.saveInquiries(INITIAL_INQUIRIES);
    return INITIAL_INQUIRIES;
  }

  private saveInquiries(inquiries: Inquiry[]) {
    try {
      this.inquiries = inquiries;
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf8');
    } catch (e) {
      console.error('Error saving inquiries.json:', e);
    }
  }

  private loadSessions() {
    try {
      if (fs.existsSync(SESSIONS_FILE)) {
        const raw = fs.readFileSync(SESSIONS_FILE, 'utf8');
        const list: Session[] = JSON.parse(raw);
        const now = Date.now();
        list.forEach((s) => {
          if (s.expiresAt > now) {
            this.sessions.set(s.token, s);
          }
        });
      }
    } catch (e) {
      console.warn('Could not load sessions.json:', e);
    }
  }

  private saveSessions() {
    try {
      const arr = Array.from(this.sessions.values());
      fs.writeFileSync(SESSIONS_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {
      console.error('Error saving sessions.json:', e);
    }
  }

  // --- Auth Methods ---

  public login(email: string, password: string): { success: boolean; token?: string; error?: string; user?: any } {
    const cleanEmail = (email || '').trim().toLowerCase();
    const targetEmail = this.adminEmail.trim().toLowerCase();
    const providedHash = this.hashPassword(password || '');

    if (cleanEmail !== targetEmail || providedHash !== this.adminPasswordHash) {
      return { success: false, error: 'Invalid admin email or password credentials.' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    const session: Session = {
      token,
      email: this.adminEmail,
      createdAt: now,
      expiresAt: now + 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    this.sessions.set(token, session);
    this.saveSessions();

    return {
      success: true,
      token,
      user: {
        email: this.adminEmail,
        name: 'W.H. Tamim',
        role: 'Studio Owner & Lead Motion Designer'
      }
    };
  }

  public verifySession(token: string): { valid: boolean; user?: any } {
    if (!token) return { valid: false };
    const session = this.sessions.get(token);
    if (!session) return { valid: false };

    if (session.expiresAt < Date.now()) {
      this.sessions.delete(token);
      this.saveSessions();
      return { valid: false };
    }

    return {
      valid: true,
      user: {
        email: this.adminEmail,
        name: 'W.H. Tamim',
        role: 'Studio Owner & Lead Motion Designer'
      }
    };
  }

  public logout(token: string) {
    if (token && this.sessions.has(token)) {
      this.sessions.delete(token);
      this.saveSessions();
    }
  }

  public updateCredentials(newEmail?: string, newPassword?: string): { success: boolean; error?: string } {
    if (newEmail && newEmail.includes('@')) {
      this.adminEmail = newEmail.trim();
    }
    if (newPassword && newPassword.length >= 6) {
      this.adminPasswordHash = this.hashPassword(newPassword);
    }
    this.saveAdminConfig();
    return { success: true };
  }

  // --- Content Methods ---

  public getContent(): SiteContent {
    return this.content;
  }

  public updateContent(updates: Partial<SiteContent>): SiteContent {
    const updated: SiteContent = {
      ...this.content,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    this.saveContent(updated);
    return updated;
  }

  public updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    const newSettings = { ...this.content.settings, ...settings };
    this.updateContent({ settings: newSettings });
    return newSettings;
  }

  public addProject(project: Omit<DynamicProject, 'id'> & { id?: string }): DynamicProject {
    const id = project.id || `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newProj: DynamicProject = {
      ...project,
      id,
      uploadDate: project.uploadDate || new Date().toISOString().split('T')[0]
    };
    const updatedProjects = [newProj, ...this.content.projects];
    this.updateContent({ projects: updatedProjects });
    return newProj;
  }

  public updateProject(id: string, updates: Partial<DynamicProject>): DynamicProject | null {
    const index = this.content.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = { ...this.content.projects[index], ...updates };
    const projects = [...this.content.projects];
    projects[index] = updated;
    this.updateContent({ projects });
    return updated;
  }

  public deleteProject(id: string): boolean {
    const filtered = this.content.projects.filter((p) => p.id !== id);
    if (filtered.length === this.content.projects.length) return false;
    this.updateContent({ projects: filtered });
    return true;
  }

  public updateAssetPack(id: string, updates: Partial<DynamicAssetPack>): DynamicAssetPack | null {
    const index = this.content.assetPacks.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = { ...this.content.assetPacks[index], ...updates };
    const packs = [...this.content.assetPacks];
    packs[index] = updated;
    this.updateContent({ assetPacks: packs });
    return updated;
  }

  public resetToDefaults(): SiteContent {
    const defaultContent: SiteContent = {
      settings: INITIAL_SETTINGS,
      projects: INITIAL_PROJECTS,
      assetPacks: INITIAL_ASSET_PACKS,
      lastUpdated: new Date().toISOString()
    };
    this.saveContent(defaultContent);
    return defaultContent;
  }

  // --- Inquiries Methods ---

  public getInquiries(): Inquiry[] {
    return this.inquiries;
  }

  public addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    const updated = [newInquiry, ...this.inquiries];
    this.saveInquiries(updated);
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: Inquiry['status']): boolean {
    const index = this.inquiries.findIndex((i) => i.id === id);
    if (index === -1) return false;
    this.inquiries[index].status = status;
    this.saveInquiries([...this.inquiries]);
    return true;
  }

  public deleteInquiry(id: string): boolean {
    const filtered = this.inquiries.filter((i) => i.id !== id);
    if (filtered.length === this.inquiries.length) return false;
    this.saveInquiries(filtered);
    return true;
  }
}

export const adminStore = new AdminStore();
