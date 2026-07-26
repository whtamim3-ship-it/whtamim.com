import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'nexivo-ai-launch',
    title: 'Nexivo AI Launch Film',
    subtitle: 'Where Next-Gen Autonomous AI Meets High-Precision UI Motion',
    client: 'Nexivo Technologies',
    industry: 'Enterprise AI & Automation',
    services: ['SaaS Product Video', 'UI Animation', 'Motion Design', '3D Depth'],
    role: 'Lead Motion Designer & Video Editor',
    deliverables: ['60s Master Launch Commercial', '15s Vertical Shorts', '30s Product Demo Cut'],
    tools: ['Adobe After Effects', 'Premiere Pro', 'Figma', 'Cinema 4D'],
    year: '2026',
    budgetTier: '$6,000 – $8,500',
    duration: '60 Seconds',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-7',
    logline: 'An Apple-inspired product launch film revealing Nexivo’s AI engine through glassmorphism, floating keyframe timelines, and high-frequency UI interactions.',
    overview: 'Nexivo needed a high-impact commercial for their Series A launch. The challenge was making complex neural workflow automations feel intuitive, lightning-fast, and irresistibly premium.',
    challenge: 'Existing AI product videos looked like generic tech stock graphics with voiceover. Nexivo wanted a cinematic film that felt as refined as an Apple Keynote, demonstrating actual SaaS UI workflows without overwhelming the viewer.',
    goal: 'Position Nexivo as the undisputed category leader in AI agent workflows and achieve a 30%+ increase in demo booking conversions during launch week.',
    strategy: 'We stripped away visual fluff and focused on mathematical motion design: smooth Bezier easing, natural physics-based cursor interactions, and 3D camera sweeps across the dark mode interface.',
    storytellingApproach: 'Beginning with the pain of fragmented developer workflows, the video accelerates as Nexivo AI connects disparate databases in real time, culminating in an exhilarating crescendo of automated productivity.',
    motionDesignBreakdown: [
      {
        title: 'Glassmorphic UI Rigging',
        description: 'Reconstructed Nexivo’s Figma designs directly inside After Effects using vector shape layers, custom depth maps, and real-time frosted glass reflections.',
        keyPoints: ['Subtle 3.5° 3D tilt tracking cursor motion', 'Dynamic light sweep across frosted acrylic cards', 'Zero motion blur distortion on crisp text baselines'],
        easingCurve: 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      {
        title: 'Micro-Interaction Precision',
        description: 'Synchronized cursor speed curves to mimic human intention, adding subtle 2px button presses and glowing focus rings.',
        keyPoints: ['Natural easing on cursor deceleration', 'Subtle spring dynamics on hover states', '120 FPS high-refresh rate feeling']
      }
    ],
    behindTheScenes: [
      {
        title: 'Styleframe Explorations',
        type: 'styleframe',
        description: '3D lighting passes establishing the dark obsidian & electric teal accent palette.',
        imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'After Effects Timeline Composition',
        type: 'ae_timeline',
        description: 'Multi-nested composition tree with 120+ shape layers and custom expression drivers.',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'
      }
    ],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Master Launch Film (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        aspectRatioClass: 'aspect-video'
      },
      {
        format: '9:16',
        title: 'Mobile Story Reels (9:16)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        aspectRatioClass: 'aspect-[9/16]'
      },
      {
        format: '1:1',
        title: 'Social Feed Showcase (1:1)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        aspectRatioClass: 'aspect-square'
      }
    ],
    results: [
      { metric: '+340%', label: 'Increase in SaaS Demo Bookings' },
      { metric: '2.8M+', label: 'Total Launch Views Across Platforms' },
      { metric: '$4.2M', label: 'Series A Funding Secured Post-Launch' }
    ],
    testimonial: {
      quote: 'whtamim is a rare hybrid of product designer and master filmmaker. He translated our complex AI architecture into a video that literally made our investors say "WOW". Every keyframe was flawless.',
      author: 'Marcus Vance',
      title: 'Founder & CEO',
      company: 'Nexivo AI',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    featured: true
  },
  {
    id: 'pran-global-ident',
    title: 'PRAN Global Motion Ident',
    subtitle: 'Elevating FMCG Digital Presence With Kinetic Typography & Fluid Motion',
    client: 'PRAN Group',
    industry: 'Consumer Brands & Digital Media',
    services: ['Brand Motion', 'Kinetic Typography', '3D Product Rendering'],
    role: 'Motion Graphics Director',
    deliverables: ['45s Kinetic Brand Ident', '15s Broadcast Bumpers'],
    tools: ['After Effects', 'Cinema 4D', 'Redshift', 'Premiere Pro'],
    year: '2025',
    budgetTier: '$4,500 – $6,500',
    duration: '45 Seconds',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-5',
    logline: 'A bold, high-energy brand motion piece combining crisp typographic rhythms with physical fluid simulations.',
    overview: 'PRAN wanted to modernize their digital video branding across international distribution channels in Europe and North America.',
    challenge: 'Unifying disparate product lines under a single cohesive, high-end motion design identity.',
    goal: 'Create an iconic motion language for all future PRAN commercial assets.',
    strategy: 'Paired minimal Helvetica Neue typography with organic particle simulations, creating high contrast between rigid type and fluid physics.',
    storytellingApproach: 'Rhythmic typography pulses to a custom acoustic-electronic soundtrack, resolving into the classic PRAN mark.',
    motionDesignBreakdown: [
      {
        title: 'Kinetic Type Orchestration',
        description: 'Letter-by-letter tracking curves animated using custom expression controllers in After Effects.',
        keyPoints: ['Snappy overshoot dynamics', 'Zero artifacting on high-speed type wipes'],
      }
    ],
    behindTheScenes: [
      {
        title: 'Particle Simulation Test',
        type: 'styleframe',
        description: 'High-density liquid particle dynamics created in C4D.',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop'
      }
    ],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Broadcast Master (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        aspectRatioClass: 'aspect-video'
      }
    ],
    results: [
      { metric: '15M+', label: 'Global Impressions' },
      { metric: '100%', label: 'Brand Alignment Rating' }
    ],
    testimonial: {
      quote: 'whtamim delivered studio-grade quality on a tight deadline. The brand ident set a new benchmark for all our international media.',
      author: 'Ayesha Rahman',
      title: 'Global Brand Manager',
      company: 'PRAN Group'
    },
    featured: true
  },
  {
    id: 'dr-masums-product-reveal',
    title: 'Dr. Masums Dental Product Reveal',
    subtitle: 'Precision Medical Tech Presented With Cinematic Warmth',
    client: 'Dr. Masums Dental Tech',
    industry: 'Healthcare & Medical Tech',
    services: ['Product Commercial', '3D Visualization', 'Motion Editing'],
    role: 'Cinematic Video Editor',
    deliverables: ['90s Cinematic Reveal', 'Social Media Campaign'],
    tools: ['After Effects', 'Premiere Pro', 'DaVinci Resolve'],
    year: '2025',
    budgetTier: '$3,500 – $5,000',
    duration: '90 Seconds',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    posterImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-5',
    logline: 'A sleek, trust-building video showcase highlighting digital dentistry workflows with macro lens cinematography.',
    overview: 'Bridging high-tech medical hardware with compassionate patient care through film-like pacing and clean infographics.',
    challenge: 'Medical hardware videos can feel clinical and boring. We needed to convey luxury, comfort, and state-of-the-art precision.',
    goal: 'Increase high-value procedure consultations by 40%.',
    strategy: 'Soft macro lighting, slow camera motion, and minimal floating white UI overlays showing instant diagnostic scans.',
    storytellingApproach: 'Framed around the patient experience: turning fear into confidence with transparent tech visualization.',
    motionDesignBreakdown: [
      {
        title: 'Subtle Diagnostic Overlays',
        description: 'Tracking clinical scanning hardware to anchor minimal white vector UI charts directly over 4K live action footage.',
        keyPoints: ['Subtle corner crosshairs', 'Mocha Pro planar surface tracking', 'Gentle depth of field defocus']
      }
    ],
    behindTheScenes: [
      {
        title: 'Planar Tracking Pass',
        type: 'ui_rig',
        description: 'Motion tracking points mapped across clinical scan monitors.',
        imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop'
      }
    ],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Cinematic Reveal (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        aspectRatioClass: 'aspect-video'
      }
    ],
    results: [
      { metric: '+180%', label: 'Patient Inquiries' },
      { metric: '98%', label: 'Satisfaction Score' }
    ],
    testimonial: {
      quote: 'whtamim transformed our technical medical equipment into a stunning visual narrative that patients actually enjoy watching.',
      author: 'Dr. Masum',
      title: 'Lead Specialist',
      company: 'Dr. Masums Dental'
    },
    featured: true
  },
  {
    id: 'arc-workflow-motion',
    title: 'Arc Flow UI Animation Concept',
    subtitle: 'Micro-Interactions & Seamless Spatial Browser Navigation',
    client: 'Arc Creative Concept',
    industry: 'Productivity & Software',
    services: ['UI Animation', 'Interactive Prototype', 'Motion Design'],
    role: 'UI Motion Designer',
    deliverables: ['30s Motion Reel', 'Lottie Animation JSONs'],
    tools: ['After Effects', 'Figma', 'Rive', 'Lottie'],
    year: '2026',
    budgetTier: '$2,500 – $4,000',
    duration: '30 Seconds',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    posterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-7',
    logline: 'An exploration in spatial browser tabs, fluid color themes, and effortless keyboard shortcuts.',
    overview: 'Demonstrating how micro-interactions reduce cognitive friction in modern web browser layouts.',
    challenge: 'Capturing complex browser sidebar switches without confusing cursor trajectories.',
    goal: 'Create an open-source motion prototype showcasing Apple-like spring physics for desktop software.',
    strategy: 'Utilized custom cubic-bezier curves for split-screen sidebar slides and soft glowing tab active indicators.',
    storytellingApproach: 'Focusing entirely on tactile feedback: soundless visual clicks, instant tab swaps, and glass highlights.',
    motionDesignBreakdown: [
      {
        title: 'Spring Dynamics in AE',
        description: 'Applied expression scripts simulating spring tension and dampening on UI panel expands.',
        keyPoints: ['No linear keyframe motion', 'Natural momentum response']
      }
    ],
    behindTheScenes: [
      {
        title: 'Bezier Curve Tuning',
        type: 'ae_timeline',
        description: 'Fine-tuning velocity graphs in After Effects graph editor.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
      }
    ],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Full Reel (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        aspectRatioClass: 'aspect-video'
      }
    ],
    results: [
      { metric: '120k+', label: 'Design Community Stars & Shares' },
      { metric: '60 FPS', label: 'Silky Smooth Playback' }
    ],
    featured: true
  },
  {
    id: 'stripe-checkout-payflow',
    title: 'Stripe Pay Flow UI Motion',
    subtitle: 'High-Precision Micro-Motion for Financial Infrastructure',
    client: 'FinTech Demo Lab',
    industry: 'Fintech & Payments',
    services: ['UI Motion', 'SaaS Commercial', 'Screen Design'],
    role: 'Motion Designer',
    deliverables: ['45s Feature Spotlight'],
    tools: ['After Effects', 'Figma', 'Premiere Pro'],
    year: '2025',
    budgetTier: '$3,000 – $4,500',
    duration: '45 Seconds',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    posterImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-6',
    logline: 'Visualizing seamless multi-currency checkout flows with mathematical accuracy and subtle dark glass depth.',
    overview: 'Showing how instant card validation and biometric auth reduce checkout dropoff.',
    challenge: 'Fintech screens can look dense with numeric data. We isolated key user touchpoints.',
    goal: 'Demonstrate sub-second payment approval times through rhythm-driven UI animation.',
    strategy: 'Magnified viewports that track the payment card submission and instant checkmark particle burst.',
    storytellingApproach: 'Rhythmic countdown timer syncing with card authorization lighting sweeps.',
    motionDesignBreakdown: [
      {
        title: 'Subtle Haptic Pulse',
        description: 'Animated green glow radiating from payment confirmation badge.',
        keyPoints: ['Soft radial blur expansion', 'Clean vector icon pop']
      }
    ],
    behindTheScenes: [],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Master Showcase (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        aspectRatioClass: 'aspect-video'
      }
    ],
    results: [
      { metric: '100%', label: 'Pixel Perfection' }
    ],
    featured: true
  },
  {
    id: 'linear-pulse-launch',
    title: 'Linear Pulse Release Trailer',
    subtitle: 'Dark Mode Luxury & Minimalist Software Craftsmanship',
    client: 'Pulse Tech',
    industry: 'Developer Tools & SaaS',
    services: ['SaaS Launch Video', 'Storyboarding', 'Sound Design Sync'],
    role: 'Lead Video Producer & Editor',
    deliverables: ['60s Teaser Trailer', 'Social Clips'],
    tools: ['After Effects', 'Premiere Pro', 'Topaz Video AI'],
    year: '2026',
    budgetTier: '$5,000 – $7,500',
    duration: '60 Seconds',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    posterImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    thumbnailGridAspect: 'col-span-12 md:col-span-6',
    logline: 'An homage to Linear.app design language: pristine typography, dark obsidian canvases, and zero noise.',
    overview: 'Crafted for developer tools engineered for speed. Every frame reflects quiet confidence.',
    challenge: 'Creating a high-end software video that speaks directly to technical CTOs and product leads.',
    goal: 'Generate 5,000+ waitlist signups in 48 hours.',
    strategy: 'Deep monochrome palette, subtle film grain texture (2%), and rapid keyboard shortcut callouts.',
    storytellingApproach: 'A ticking clock metronome accelerating as project roadmaps automatically sync.',
    motionDesignBreakdown: [
      {
        title: 'Obsidian Depth & Lighting',
        description: 'Using subtle radial spotlights to guide viewer eye position across dark mode code blocks.',
        keyPoints: ['High contrast ratio', 'Crisp monospaced typography']
      }
    ],
    behindTheScenes: [],
    multiFormatCuts: [
      {
        format: '16:9',
        title: 'Master Trailer (16:9)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        aspectRatioClass: 'aspect-video'
      }
    ],
    results: [
      { metric: '8,400+', label: 'Waitlist Signups in 48 Hours' },
      { metric: '4.9/5', label: 'Product Hunt Launch Score' }
    ],
    featured: true
  }
];

export const CLIENT_LOGOS = [
  { name: 'PRAN', industry: 'Global FMCG', logoText: 'PRAN' },
  { name: 'Nexivo Ads', industry: 'AI Marketing SaaS', logoText: 'NEXIVO' },
  { name: 'Dr. Masums Dental', industry: 'HealthTech', logoText: 'DR. MASUMS' },
  { name: 'Vanguard AI', industry: 'Autonomous Agents', logoText: 'VANGUARD AI' },
  { name: 'SaaSFlow', industry: 'Workflow Engine', logoText: 'SaaSFLOW' },
  { name: 'Aether UI', industry: 'Design Systems', logoText: 'AETHER' },
];

export const SERVICES = [
  {
    id: 'saas-commercials',
    title: 'SaaS Commercial Videos',
    tagline: 'High-converting launch trailers and feature films designed for modern software brands.',
    description: 'We turn abstract software features into emotional, high-conversion visual stories that position your product as an essential tool.',
    deliverables: ['60s Launch Commercial', 'Social Cuts (9:16 / 1:1)', 'Feature Spotlights'],
    idealFor: 'Seed to Series B SaaS launches, Product Hunt campaigns, and hero website videos.',
    priceRange: '$3,500 – $8,500'
  },
  {
    id: 'ui-motion',
    title: 'Motion Design & UI Animation',
    tagline: 'Precision 2D/3D UI rigging that makes complex software feel effortless.',
    description: 'Rebuilding Figma components in After Effects with glass depth, custom Bezier easing, and human-like cursor interactions.',
    deliverables: ['UI Walkthrough Animations', 'Lottie Vectors for Web', 'Interactive Prototypes'],
    idealFor: 'Landing page hero animations, app store previews, and product demos.',
    priceRange: '$2,500 – $6,000'
  },
  {
    id: 'product-demos',
    title: 'Product Demos & Explainer Films',
    tagline: 'Clear, engaging video presentations that shorten sales cycles and boost conversion.',
    description: 'Guiding prospective customers through your product’s core value proposition with zero friction or visual boredom.',
    deliverables: ['90s Full Product Walkthrough', 'Modular Section Videos', 'Voiceover Integration'],
    idealFor: 'B2B Sales decks, onboarding sequences, and customer success hubs.',
    priceRange: '$3,000 – $5,500'
  },
  {
    id: 'talking-head-documentary',
    title: 'Talking Head & Brand Documentaries',
    tagline: 'Cinematic founder stories and customer case studies crafted with film-like grading.',
    description: 'Combining live-action founder interviews with pristine motion graphics, sound design, and color grading.',
    deliverables: ['Founder Origin Story Film', 'Customer Video Case Studies', 'Event Highlights'],
    idealFor: 'Brand positioning, about pages, and investor relations.',
    priceRange: '$4,000 – $10,000+'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Product Discovery & Strategy',
    subtitle: 'Understanding the Core Value Proposition',
    description: 'We dissect your software interface, user personas, and marketing goals to identify the single most compelling hook.',
    deliverable: 'Creative Brief & Positioning Map'
  },
  {
    step: '02',
    title: 'Scriptwriting & Narrative Flow',
    subtitle: 'Crafting Punchy, Clear Copy',
    description: 'Writing high-impact voiceover copy and on-screen text callouts that eliminate fluff and maximize engagement.',
    deliverable: 'Production Script & Voiceover Guide'
  },
  {
    step: '03',
    title: 'AI Storyboarding & Styleframes',
    subtitle: 'Visualizing Every Frame Before Animating',
    description: 'Rapidly prototyping visual directions, glassmorphism UI layouts, and color palettes so there are no surprises.',
    deliverable: 'Interactive Storyboard & 4K Styleframes'
  },
  {
    step: '04',
    title: 'Motion Design & UI Rigging',
    subtitle: 'After Effects Magic & Mathematical Easing',
    description: 'Rebuilding your app UI in After Effects with 3D camera depth, physics-based cursor motion, and crisp vector keyframes.',
    deliverable: 'First Motion Cut & Rough Edit'
  },
  {
    step: '05',
    title: 'Sound Design & Master Mix',
    subtitle: 'The Audio Atmosphere That Sells',
    description: 'Layering custom sound effects (subtle UI clicks, atmospheric risers, acoustic bass) and professional voiceover.',
    deliverable: 'Final Mix & Master Color Grade'
  },
  {
    step: '06',
    title: 'Multi-Format Delivery',
    subtitle: 'Ready for Web, Mobile & Socials',
    description: 'Exporting pristine 4K ProRes and compressed WebP/MP4 files in 16:9, 9:16, and 1:1 aspect ratios.',
    deliverable: 'Complete Media Package & Source Assets'
  }
];
