export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  services: string[];
  role: string;
  deliverables: string[];
  tools: string[];
  year: string;
  budgetTier: string;
  duration: string;
  heroVideoUrl: string;
  posterImage: string;
  thumbnailGridAspect?: string;
  logline: string;
  overview: string;
  challenge: string;
  goal: string;
  strategy: string;
  storytellingApproach: string;
  motionDesignBreakdown: {
    title: string;
    description: string;
    keyPoints: string[];
    easingCurve?: string;
  }[];
  behindTheScenes: {
    title: string;
    type: 'storyboard' | 'styleframe' | 'ae_timeline' | 'ui_rig';
    description: string;
    imageUrl: string;
  }[];
  multiFormatCuts: {
    format: '16:9' | '9:16' | '1:1';
    title: string;
    videoUrl: string;
    aspectRatioClass: string;
  }[];
  results: {
    metric: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    company: string;
    avatarUrl?: string;
  };
  featured: boolean;
}

export interface StoryboardScene {
  sceneNumber: number;
  timestamp: string;
  visualDescription: string;
  uiAnimationDetails: string;
  voiceoverText: string;
  onScreenText: string;
  transitionType: string;
}

export interface AIStoryboardResponse {
  projectTitle: string;
  logline: string;
  recommendedDuration: string;
  pacingAndTone: string;
  musicStyle: string;
  visualStyle?: string;
  scenes: StoryboardScene[];
  motionDesignKeyframes: string[];
  estimatedProductionTimeline: string;
  budgetTierEstimate: string;
}

export interface EstimatorState {
  projectType: string;
  duration: string;
  formats: string[];
  turnaround: string;
  addons: string[];
}
