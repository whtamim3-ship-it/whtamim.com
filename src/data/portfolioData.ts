import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'pran-ghee-promo',
    title: 'PRAN Ghee Promotional Ad',
    subtitle: 'High-Impact Brand Commercial for PRAN Group',
    client: 'PRAN',
    industry: 'Brand Ad',
    services: ['Brand Ad', 'Promotional Video', 'Color Grade'],
    role: 'Video Editor & Colorist',
    deliverables: ['Master Commercial (16:9)', 'Social Clips (9:16 / 1:1)'],
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut'],
    year: '2026',
    budgetTier: '',
    duration: '45 Seconds',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-7',
    logline: 'A vibrant, cinematic promotional commercial for PRAN Ghee showcasing rich textures, fluid camera motion, and crisp audio mixing.',
    overview: 'Crafted a high-energy promotional advertisement for PRAN Ghee focused on appetizing visual storytelling, color warmth, and rhythmic cutting.',
    challenge: 'Highlighting product freshness and quality in a short 45-second spot while maintaining high brand consistency.',
    goal: 'Engage viewers instantly on television and digital ad channels with a warm, premium brand aesthetic.',
    strategy: 'Utilized close-up shots, rich color grading, and dynamic sound design to evoke quality and trust.',
    storytellingApproach: 'Paced cuts to acoustic rhythms, building up to the iconic product reveal.',
    motionDesignBreakdown: [
      {
        title: 'Color & Lighting Enhancement',
        description: 'Applied rich warm color grading to emphasize appetizing golden hues and brand identity.',
        keyPoints: ['Warm tone balancing', 'Crisp product callouts'],
      }
    ],
    behindTheScenes: [],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Main Commercial (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        aspectRatioClass: 'aspect-video'
      },
      {
        format: '9:16',
        title: 'Reels Cut (9:16)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        aspectRatioClass: 'aspect-[9/16]'
      }
    ],
    results: [
      { metric: '10M+', label: 'Broadcast & Online Views' },
      { metric: '100%', label: 'Brand Alignment' }
    ],
    testimonial: {
      quote: 'whtamim delivered an exceptional commercial with great pacing, color work, and audio design.',
      author: 'PRAN Marketing Team',
      title: 'Brand Lead',
      company: 'PRAN Group'
    },
    featured: true
  },
  {
    id: 'saas-animation-redlab',
    title: 'SaaS Animation (RedLab Studio Featured)',
    subtitle: 'Kinetic UI Motion & Digital Product Showcase',
    client: 'RedLab Studio',
    industry: 'Motion/Animation',
    services: ['Motion/Animation', 'UI Animation'],
    role: 'Lead Video Editor & Motion Designer',
    deliverables: ['60s Master Video', 'Social Promo Snippets'],
    tools: ['Adobe Premiere Pro', 'Adobe After Effects'],
    year: '2026',
    budgetTier: '',
    duration: '60 Seconds',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-5',
    logline: 'Sleek SaaS product animation bringing software interfaces to life through fluid motion graphics and precise pacing.',
    overview: 'Featured collaboration with RedLab Studio demonstrating complex software features through intuitive UI motion and smooth transitions.',
    challenge: 'Making abstract digital software workflows engaging and easy to understand for viewers.',
    goal: 'Create an engaging showcase video for product launch and social marketing.',
    strategy: 'Combined clean keyframe animation with sound design cues to guide viewer focus across key features.',
    storytellingApproach: 'Framed around the user journey, moving effortlessly from problem state to product resolution.',
    motionDesignBreakdown: [
      {
        title: 'UI Motion & Precision Cuts',
        description: 'Smooth keyframe timing and cursor interactions built directly for modern software visual storytelling.',
        keyPoints: ['Seamless panel transitions', 'Subtle UI depth'],
      }
    ],
    behindTheScenes: [],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Master Edit (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        aspectRatioClass: 'aspect-video'
      }
    ],
    results: [
      { metric: '100%', label: 'Pixel-Perfect Pacing' }
    ],
    featured: true
  },
  {
    id: 'documentary-project',
    title: 'Documentary Project',
    subtitle: 'Authentic Narrative Editing & Cinematic Storytelling',
    client: "Zakir Husayn's Team",
    industry: 'Documentary Project',
    services: ['Documentary Editing', 'Cinematography'],
    role: 'Documentary Editor & Cinematographer',
    deliverables: ['Full Narrative Film', 'Teaser Trailer'],
    tools: ['Adobe Premiere Pro', 'CapCut', 'Adobe After Effects'],
    year: '2025',
    budgetTier: '',
    duration: '3 Minutes',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    posterImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-12',
    logline: 'A compelling documentary narrative constructed from raw footage, weaving human emotion, pacing, and authentic sound design.',
    overview: 'Collaborated with Zakir Husayn’s Team to edit a moving documentary project focused on real people and authentic stories.',
    challenge: 'Structuring hours of unscripted raw footage into a captivating narrative arc.',
    goal: 'Produce a deeply resonant documentary short that engages audiences from start to finish.',
    strategy: 'Letting real dialogue and natural emotion drive the edit, supported by cinematic color grading.',
    storytellingApproach: 'Building momentum through story beats, ambient audio mixing, and thoughtful pacing.',
    motionDesignBreakdown: [
      {
        title: 'Cinematic Story Pacing',
        description: 'Carefully curated timeline cuts matching dialogue rhythm with emotional narrative peaks.',
        keyPoints: ['Natural sound design', 'Atmospheric color grade'],
      }
    ],
    behindTheScenes: [],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Full Film (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        aspectRatioClass: 'aspect-video'
      }
    ],
    results: [
      { metric: 'High', label: 'Audience Engagement' }
    ],
    featured: true
  }
];

export const CLIENT_LOGOS = [
  { name: 'PRAN', industry: 'Global FMCG & Brand Ads', logoText: 'PRAN' },
  { name: 'RedLab Studio', industry: 'Creative Studio & Motion', logoText: 'REDLAB STUDIO' },
  { name: "Zakir Husayn's Team", industry: 'Documentary & Production', logoText: "ZAKIR HUSAYN'S TEAM" },
];

export const SERVICES = [
  {
    id: 'promotional-videos',
    title: 'Promotional Videos',
    tagline: 'High-energy brand and product promotional ads designed for social, web, and broadcast.',
    description: 'Captivating promos that grab attention immediately and highlight core brand values.',
    deliverables: ['Promotional Ad Master', 'Vertical Cuts (9:16)', 'Social Feeds (1:1)'],
    priceRange: 'Custom Scope'
  },
  {
    id: 'brand-videos',
    title: 'Brand Videos',
    tagline: 'Cinematic brand films communicating company vision and identity.',
    description: 'Refined storytelling that connects emotionally with audiences and elevates brand authority.',
    deliverables: ['Hero Brand Film', 'Short Social Cuts', 'Sound Design & Color Grade'],
    priceRange: 'Custom Scope'
  },
  {
    id: 'documentary-editing',
    title: 'Documentary Editing',
    tagline: 'Narrative-driven documentary cuts for real stories, teams, and events.',
    description: 'Structuring raw footage into compelling narrative arcs with cinematic color grading and audio mixing.',
    deliverables: ['Full Length Documentary Cut', 'Trailer / Teaser', 'Color Grade & Audio Mix'],
    priceRange: 'Custom Scope'
  },
  {
    id: 'talking-head-editing',
    title: 'Talking Head Editing',
    tagline: 'Pristine interview and talking-head videos with seamless pacing.',
    description: 'Crisp, engaging interview cuts enhanced with subtle motion graphics, multi-cam sync, and noise-free sound design.',
    deliverables: ['Interview Master Cut', 'Short Content Snippets', 'Subtitles & Motion Graphics'],
    priceRange: 'Custom Scope'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Brief',
    subtitle: 'Aligning Vision & Objectives',
    description: 'We review your raw footage, brand goals, tone references, and target audience to outline a clear project brief.',
    deliverable: 'Creative Brief & Story Outline'
  },
  {
    step: '02',
    title: 'Shoot Planning & Script',
    subtitle: 'Pre-Production Precision',
    description: 'Crafting shot lists, scripts, and production schedules so every angle on shooting day serves the final narrative.',
    deliverable: 'Shot List & Production Script'
  },
  {
    step: '03',
    title: 'Shooting Day',
    subtitle: 'Cinematic Live Capture',
    description: 'Executing the shoot with high-end camera rigs, professional lighting, and crisp audio capture.',
    deliverable: '4K Raw Footage & Audio Takes'
  },
  {
    step: '04',
    title: 'Editing & Color Grade',
    subtitle: 'Cutting & Film Look',
    description: 'Selecting the strongest takes, establishing rhythmic pacing, and applying cinematic color grading.',
    deliverable: 'Picture-Lock Rough Cut'
  },
  {
    step: '05',
    title: 'Sound Design & Mix',
    subtitle: 'Audio Precision',
    description: 'Layering ambient atmosphere, sound effects, voice restoration, and music mixing to enhance emotional impact.',
    deliverable: 'Broadcast Audio Master & Mix'
  },
  {
    step: '06',
    title: 'Final Delivery',
    subtitle: 'Polished Masters',
    description: 'Delivering full 4K masters and compressed MP4 files optimized for all web and social aspect ratios.',
    deliverable: 'Complete Master Package'
  }
];

