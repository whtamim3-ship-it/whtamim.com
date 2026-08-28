export type SeoSectionKey = 'home' | 'work' | 'about' | 'assets';

export interface SeoData {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
}

export const SEO_PAGES: Record<SeoSectionKey, SeoData> = {
  home: {
    title: 'W.H. Tamim | Premium SaaS Video Editor & Motion Designer',
    description:
      'Elevate your SaaS product with premium motion design and cinematic video editing. Specialized in UI animations and brand stories for startups. Make your product feel premium, not advertised.',
    ogTitle: 'W.H. Tamim | Premium SaaS Video Editor & Motion Designer',
    ogDescription:
      'Elevate your SaaS product with premium motion design and cinematic video editing. Specialized in UI animations and brand stories for startups. Make your product feel premium, not advertised.',
    ogType: 'website',
  },
  work: {
    title: 'Selected Work | High-End Motion Design & Commercials by Tamim',
    description:
      'Explore top-tier motion design, cinematic VFX, and SaaS UI animations. See how high-quality video editing transforms ordinary software into premium visual experiences.',
    ogTitle: 'Selected Work | High-End Motion Design & Commercials by Tamim',
    ogDescription:
      'Explore top-tier motion design, cinematic VFX, and SaaS UI animations. See how high-quality video editing transforms ordinary software into premium visual experiences.',
    ogType: 'website',
  },
  about: {
    title: 'About Tamim | Expert Video Editor & Motion Designer for Startups',
    description:
      'I am a professional video editor and motion designer dedicated to helping modern brands and SaaS companies tell cinematic stories that leave a lasting impression.',
    ogTitle: 'About Tamim | Expert Video Editor & Motion Designer for Startups',
    ogDescription:
      'I am a professional video editor and motion designer dedicated to helping modern brands and SaaS companies tell cinematic stories that leave a lasting impression.',
    ogType: 'website',
  },
  assets: {
    title: 'Premium Assets & Resources for Motion Designers | W.H. Tamim',
    description:
      'Download premium motion design assets, professional video editing resources, and UI animation templates to boost your creative workflow.',
    ogTitle: 'Premium Assets & Resources for Motion Designers | W.H. Tamim',
    ogDescription:
      'Download premium motion design assets, professional video editing resources, and UI animation templates to boost your creative workflow.',
    ogType: 'website',
  },
};

/**
 * Updates or creates a <meta> tag by name or property attribute.
 */
export function updateMetaTag(
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string
): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Sets document title, description, Open Graph, and Twitter metadata.
 */
export function applyPageSeo(section: SeoSectionKey, customCanonicalUrl?: string): void {
  if (typeof document === 'undefined') return;

  const data = SEO_PAGES[section] || SEO_PAGES.home;

  // 1. Browser Window & Tab Title
  document.title = data.title;

  // 2. Standard Search Engine Meta Description
  updateMetaTag('name', 'description', data.description);

  // 3. Open Graph Metadata (LinkedIn, Slack, Facebook, Discord)
  updateMetaTag('property', 'og:title', data.ogTitle);
  updateMetaTag('property', 'og:description', data.ogDescription);
  updateMetaTag('property', 'og:type', data.ogType);
  updateMetaTag('property', 'og:site_name', 'W.H. Tamim');

  const currentUrl = customCanonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  if (currentUrl) {
    updateMetaTag('property', 'og:url', currentUrl);
  }

  // 4. Twitter Card Metadata (X / Twitter)
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', data.ogTitle);
  updateMetaTag('name', 'twitter:description', data.ogDescription);

  // 5. Google Site Verification for Google Search Console
  updateMetaTag('name', 'google-site-verification', 'VMSjGPRVJmCRfmOT3iXXVBXWfR9bNafljYGlLseiI0I');

  // 6. Ensure JSON-LD Brand Entity Schema is injected
  ensureJsonLdSchema();
}

/**
 * Ensures the Brand Entity JSON-LD Schema is injected in the document head.
 */
export function ensureJsonLdSchema(): void {
  if (typeof document === 'undefined') return;

  const existingScript = document.querySelector('script[type="application/ld+json"]');
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'W.H. Tamim',
        alternateName: ['whtamim', 'WHTAMIM', 'Wasim Hasnat Tamim', 'whtamim.work'],
        url: 'https://whtamim.work',
        jobTitle: 'Video Editor & Motion Designer',
      },
      {
        '@type': 'WebSite',
        url: 'https://whtamim.work',
        name: 'whtamim',
        alternateName: ['WHTAMIM', 'whtamim.work'],
      },
    ],
  };

  if (!existingScript) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);
  }
}
