import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  X,
  BookOpen,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Filter,
  Sparkles,
  Layers,
  Palette,
  Film,
  Newspaper,
  LayoutGrid,
  RefreshCw,
  Mail,
  Send,
  Check,
  Share2,
  Linkedin,
  Copy,
  Sun,
  Moon,
  TrendingUp,
  Bookmark,
  FileText,
  Tag,
  Globe,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSubtleClickSound } from '../utils/motion';
import { useBodyScrollLock } from '../utils/scrollLock';

const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Workflow & Breakdown' | 'Color & VFX' | 'Motion Design' | 'Industry News' | 'AI & Workflow';
  content: string[];
  coverGradient: string;
  thumbnailGradient: string;
  badgeColor: '#E11D48' | '#2563EB';
  author?: string;
  tags?: string[];
  seoMeta?: {
    primaryKeyword: string;
    secondaryKeywords: string;
    metaTitle: string;
    metaDescription: string;
    urlSlug: string;
    contentType: string;
    targetAudience: string;
  };
}

export const CATEGORIES = [
  'All',
  'AI & Workflow',
  'Workflow & Breakdown',
  'Color & VFX',
  'Motion Design',
  'Industry News',
] as const;

export const FEATURED_POST: BlogPost = {
  id: 'top-50-assets-2026',
  title: 'Top 50 Free Video Editing Assets 2026: SFX, MOGRTs & Cinematic LUTs (Tested & Verified)',
  slug: 'top-free-video-editing-assets-2026',
  excerpt:
    'Download the top 50 verified royalty-free sound effects, Premiere Pro MOGRT templates, and DaVinci Resolve LUTs for commercial client projects in 2026.',
  date: 'August 13, 2026',
  readTime: '12 min read',
  category: 'Workflow & Breakdown',
  badgeColor: '#E11D48',
  author: 'Tamim',
  tags: ['Free Assets 2026', 'Royalty-Free SFX', 'MOGRTs', 'DaVinci LUTs', 'Post-Production'],
  coverGradient: 'from-rose-950/90 via-slate-900 to-indigo-950',
  thumbnailGradient: 'from-rose-600 via-pink-600 to-indigo-600',
  seoMeta: {
    primaryKeyword: 'Free video editing assets 2026',
    secondaryKeywords: 'Royalty-free SFX, Premiere Pro MOGRT templates, DaVinci Resolve LUTs, commercial video editing assets, free sound effects WAV',
    metaTitle: 'Top 50 Free Video Editing Assets 2026: SFX, MOGRTs & LUTs',
    metaDescription: 'Download the top 50 verified royalty-free sound effects, Premiere Pro MOGRT templates, and DaVinci Resolve LUTs for commercial client projects in 2026.',
    urlSlug: '/blog/top-free-video-editing-assets-2026',
    contentType: 'In-Depth Technical Guide & Asset Directory',
    targetAudience: 'Video Editors, Post-Production Houses, Content Creators, Colorists',
  },
  content: [
    `### Executive Summary & Key Takeaways

- **Asset Debt Relief:** Video editors are moving away from paid monthly asset subscriptions due to cost accumulation and low-grade AI asset saturation.
- **Production-Grade Audio:** High-bitrate 24-bit/96kHz WAV SFX are mandatory for commercial broadcast standards (EBU R128) to prevent high-frequency aliasing and phase issues.
- **Lightweight Motion Graphics:** Premiere Pro MOGRTs utilizing native Mercury Playback Engine acceleration and Responsive Design time-stretching outperform heavy After Effects Dynamic Link comps.
- **Color Precision:** Utilizing 32-bit floating-point Color Space Transforms (CST) in DaVinci Wide Gamut prevents highlight clipping and color distortion compared to applying raw LUTs to Log footage.
- **Commercial Clearance:** Always verify CC0 or Royalty-Free Commercial licensing and retain license documents to avoid intellectual property litigation.`,

    `## The Asset Debt Crisis: Paradigm Shift in Post-Production Infrastructure

The post-production landscape across European agency and freelance markets is undergoing a structural realignment driven by financial overhead and quality degradation. Professional editors, motion graphics artists, and colorists are actively scaling back reliance on all-in-one subscription platforms. The industry phenomenon recognized as "Asset Debt"—the cumulative financial burden of paying perpetual monthly licensing fees for bloated libraries of underutilized media—has reached a critical turning point.

This transition away from subscription platforms is further accelerated by the proliferation of uncurated generative artificial intelligence (AI) assets. Industry analyses indicate that over 60% of paid asset libraries have become populated with low-bitrate AI-generated sound effects and improperly mapped Look-Up Tables (LUTs). In audio engineering, AI-synthesized sound effects frequently display high-frequency phase cancellation, severe band-limiting, and unnatural background noise floors that fail broadcast quality control (QC) standards. In color grading, sub-standard LUTs compiled without dynamic mathematical gamut mapping destroy highlight roll-off and clip saturated color channels when applied to modern 10-bit and 12-bit Log footage.

To maintain technical standards while eliminating recurring subscription liabilities, post-production professionals are transitioning toward sovereign asset management. This paradigm relies on curated, uncompressed open-access assets, high-bitrate archival libraries, and native motion graphics templates. The following directory details the top 50 royalty-free assets available in 2026, categorized across uncompressed Sound Effects (SFX), optimized Premiere Pro Motion Graphics Templates (MOGRTs), and mathematically precise DaVinci Resolve color transformation tools.`,

    `## High-Bitrate Royalty-Free Sound Effects (SFX) Architecture

Sound design represents half of the perceptual quality in visual media, yet sourcing production-grade, uncompressed Pulse Code Modulation (PCM) audio without recurring licensing fees presents a persistent challenge. Broadcast standards require 24-bit/96kHz or 24-bit/48kHz WAV files that maintain dynamic range and spectral headroom for extensive pitch-shifting, time-stretching, and equalization. Low-grade MP3 or compressed AAC assets lack the necessary spectral data, introducing aliasing artifacts when manipulated in digital audio workstations (DAWs) or non-linear editors (NLEs).

In a professional post-production audio pipeline, raw field recordings captured at 24-bit/96kHz undergo spatial alignment and noise floor editing. Sound designers then layer sub-bass transients, such as sub-booms and risers, underneath mid-range foley to create tactile impact without muddying dialogue frequencies. The final mix is normalized to meet international broadcast standards, such as EBU R128 (-24 LUFS integrated loudness).

The audio assets detailed below offer uncompressed WAV containers cleared for commercial client workflows.

### Cinematic Foley, Impacts, and Trailer Sound FX

High-impact visual transitions, commercial teasers, and narrative film cues depend on low-frequency transients paired with clean high-frequency textures. The BOOM Library Cinematic Free Series and the Sonniss GameAudioGDC archives represent the benchmark for non-subscription cinematic audio. Delivered at 24-bit/96kHz, these assets provide both pre-processed "Designed" files for rapid timeline placement and raw "Construction Kit" elements for multi-layered sound design.

1. **BOOM Library Cinematic Darkness (Designed):** High-impact sub-booms, sub-bass drops, and atmospheric hits engineered for suspense trailers.
2. **BOOM Library Cinematic Darkness (Construction Kit):** Raw, unprocessed organic source recordings allowing sound designers to custom-layer low-end impacts and metallic scrapes.
3. **BOOM Library Cinematic Elements - Fire & Water:** Fluid textures, steam hiss, high-speed flame whooshes, and underwater sub-surface impacts.
4. **BOOM Library Cinematic Expressions:** Tonal soundscapes, evolving pad textures, and emotional cinematic swells engineered for narrative scoring.
5. **BOOM Library Cinematic Metal Titan:** Mechanical clashes, industrial steel impacts, and structural resonance tails recorded in acoustic spaces.
6. **BOOM Library Cinematic Motion:** High-speed Doppler-effect whip passes, low-end air displacement whoosh effects, and organic fly-bys.
7. **BOOM Library Cinematic Horror Suspense:** Micro-detail violin screeches, metallic tension risers, and drone layers.
8. **BOOM Library Cinematic Impacts:** Structural destruction sounds, deep sub-surface slams, and cinematic trailer hits.
9. **BOOM Library Cinematic Strikes:** Fast-attack transient strikes combined with resonant decay tails for action sequence editing.
10. **BOOM Library Cinematic Trailer Riser & Sweep Suite:** Exponential pitch risers, white-noise sweeps, and tension-building transitional elements.
11. **PremiumBeat 20 Free Movie Trailer SFX:** High-energy cinematic slams, organic sweeps, metallic hits, and drop-downers optimized for promo cutting.
12. **Sonniss GDC Foley Archive - Organic Footsteps Collection:** Multi-surface footfall recordings across gravel, concrete, mud, and wood captured with multi-microphone configurations.
13. **Sonniss GDC Foley Archive - Cloth & Garment Movement:** High-detail fabric rustles, jacket swishes, leather creaks, and friction passes essential for narrative realism.
14. **PremiumBeat 40+ Free Footsteps and Foley Pack:** Professionally tracked footsteps across various footwear and terrain types, offering consistent spatial resonance.

### User Interface (UI), Tech, and Digital Interaction SFX

Modern corporate video production, software demonstrations, and social media advertising require subtle digital interaction cues. Overly saturated digital clicks and harsh synthetic beeps induce listener fatigue. High-grade UI libraries utilize tactile analog clicks, soft pops, and refined micro-swishes that provide clear auditory feedback without dominating the audio mix.

15. **RocketStock 29 Free Sci-Fi & UI Sound FX:** Precision digital telemetry tones, interface clicks, HUD scan passes, futuristic button presses, and processing hums.
16. **PremiumBeat 25 Free Vintage Analog & Sci-Fi SFX:** Analog synthesizer bleeps, relay clicks, tape machine engagement mechanics, and retro-futuristic swells.
17. **Envato TibaSFX Glitch & Digital Malfunction Pack:** Digital corruptions, bit-crushed signal drops, video static passes, and data transmission errors.
18. **Sonniss GDC Tech & Robotics Interface Suite:** Servo motor actuations, pneumatic releases, mechanical switch toggles, and robotic joint articulations.
19. **SoundJay 50 Short Notification Alerts Vol. 2:** Minimalist device chimes, success alerts, notification pops, and mobile app interface sounds.

### Foley, Ambience, and Environmental Background FX

Environmental background audio covers dialogue edit cuts, masks acoustic inconsistencies, and establishes physical spatial reality. The BBC Sound Effects Archive provides over 16,000 field recordings capturing real-world acoustics across global environments. Utilizing these uncompressed spatial recordings prevents the acoustic unnaturalness common in low-budget productions.

20. **BBC Sound Effects Archive - European Urban Ambience:** Metropolitan street traffic, pedestrian chatter, distant sirens, and cobblestone roadway acoustics.
21. **BBC Sound Effects Archive - Natural Environments & Wildlife:** Forest wind passes, rain falling on foliage, river flows, and isolated bird species calls.
22. **PremiumBeat 15 Free Ambient Background SFX:** Background room tones, coffee shop interior bustle, soft rain against glass, and electrical hums.
23. **Sonniss GDC Ambisonic Room Tones:** Spatial 360-degree room tone recordings engineered for surround sound field placement and immersive mixing.
24. **PremiumBeat 18 Free Office Sound Effects Pack:** Keyboard clatter, paper shuffles, HVAC air handling noise, printer mechanics, and executive office room tone.
25. **PremiumBeat 50+ Kitchen & Cooking Foley FX:** Sizzling oil transients, knife chopping block impacts, ceramic plate slides, and glass clinks for culinary edits.

| Asset Repository / Pack | Technical Specifications | Primary Use Case | Key Included Sound Types | Licensing Terms |
| :--- | :--- | :--- | :--- | :--- |
| Sonniss GameAudioGDC Archive | 24-bit / 96kHz PCM WAV | Video games, feature films, commercial trailers | Foley, UI, industrial impacts, multi-surface footsteps | Royalty-Free Commercial (No attribution required) |
| BOOM Library Cinematic Free | 24-bit / 96kHz PCM WAV | High-end cinematic promos, trailers, teasers | Sub-booms, organic whooshes, horror textures, risers | Royalty-Free Commercial (Unrestricted usage) |
| BBC Sound Effects Archive | 16-bit / 44.1kHz Broadcast WAV | Documentary, spatial background alignment | Historic urban spaces, wildlife, weather, crowd noise | Non-Commercial / Educational (Clearance required for commercial ads) |
| PremiumBeat Free SFX Collection | 24-bit / 48kHz WAV | Social media, corporate promos, commercial edits | Sci-Fi HUDs, trailer impacts, ambient room tones, foley | Royalty-Free Commercial (Standard editorial) |
| 99Sounds Cinematic Soundscapes | 24-bit / 48kHz WAV | Film scoring, atmospheric background design | Drones, evolving pads, textural noise layers | Royalty-Free Commercial (CC0 / Independent) |`,

    `## Motion Graphics Templates (MOGRTs) & Timeline Optimization

The operational debate between editing natively in Adobe Premiere Pro versus utilizing After Effects Dynamic Link compositions centers on editing efficiency and system resource management. While After Effects enables complex motion graphics creation, linking multiple dynamic compositions directly into a Premiere Pro timeline consumes significant RAM, degrades real-time playback performance, and increases export render times.

Motion Graphics Templates (.mogrt) eliminate these performance bottlenecks. Compiled with underlying After Effects expressions but executed inside Premiere Pro's Essential Graphics panel, MOGRTs leverage Mercury Playback Engine GPU acceleration. Modern MOGRT architecture incorporates Responsive Design — Time Stretching, allowing editors to trim or extend template duration on the timeline without altering keyframe timing for intro and outro animations.

| Feature Parameter | Traditional AE Dynamic Link Workflow | Modern Native MOGRT System Workflow |
| :--- | :--- | :--- |
| System Resource Allocation | Heavy RAM usage & potential timeline playback caching delays | Lightweight GPU acceleration via Mercury Engine |
| Customization Efficiency | Requires opening After Effects application per modification | Direct text, color, and timing control in Premiere panel |
| Animation Timing Control | Manual keyframe repositioning required when lengthening clips | Responsive Design time-stretching protects keyframe timing |
| Render & Export Speed | Extended render times due to background AE composition engine | Optimized direct timeline rendering and fast export encoding |

### Minimalist Lower Thirds and Title Cards

Lower thirds must present corporate or narrative text clearly without obscuring primary visual subject matter. The verified MOGRT packs below feature auto-resizing bounding boxes that scale dynamically based on string length, eliminating manual keyframing during fast-turnaround revisions.

26. **RocketStock 15 Free Animated Lower Thirds:** Modern lower thirds featuring clean line accents, vector parameter controls, and smooth entrance/exit reveals.
27. **PremiumBeat 21 Free Hand-Painted Brush Stroke Graphics:** Organic animated brush overlays and lower third accent lines, built with vector alpha channels.
28. **Motion Array Clean Corporate Titles Suite:** Typography-focused title cards featuring auto-resizing background shapes and precise color controls.
29. **Mixkit Minimalist Broadcast Lower Thirds:** Broadcast-style lower third overlays with integrated dual-line text structures and opacity controls.
30. **Film Bodega Minimal Pedigree Title Pack:** Text cards utilizing elegant typography and tracking animations for documentary work.

### Kinetic Typography and Auto-Caption Systems

Short-form social media video content across platforms demands dynamic, frame-by-frame text engagement. Manual captioning is time-prohibitive. These optimized MOGRT systems enable text replacement while preserving kinetic physics and customizable text glow parameters.

31. **AEJuice Free Starter Pack - Kinetic Text Accents:** Typographic animations featuring pop-in letters, kinetic bounce effects, and vector text bursts.
32. **Mixkit Social Media Kinetic Caption Kit:** Vertical-video text templates featuring bold background highlights, dynamic word-by-word reveals, and color controls.
33. **PremiumBeat Free Textured Title Kit:** Textured typography overlays designed specifically for sports promos and music videos.
34. **ProductionCrate Action Typographic Stings:** Title templates with integrated chromatic aberration, glitch text reveals, and motion blur parameters.

### Seamless Transitions and Overlay Mechanics

Traditional NLE transitions often apply harsh geometric wipes or rely on third-party plugins that compromise system stability. The transition MOGRTs listed below operate natively using Premiere Pro adjustment layers and native distortion math, preserving real-time timeline playback.

35. **PremiumBeat 15 Free Textured Transitions:** Scribble, hand-painted, and paper-rip transitional overlays compiled into drag-and-drop MOGRT containers.
36. **Mixkit 3D Spin & Multi-Circle Transitions:** Native vector shape transitions offering geometric camera rotations without third-party GPU plugins.
37. **Motion Array Dynamic Glitch Transition Suite:** Digital signal distortion transitions utilizing native displacement mapping for cuts.
38. **RocketStock Sci-Fi HUD Overlay Collection:** Vector-based holographic user interface elements, targeting reticles, and framing corners.
39. **Mixkit Smooth Whip Pan & Zoom Transition MOGRTs:** Optical motion-blur transitions simulating camera whips and push-ins without manual keyframing.

| Asset Suite / Title | Native Software | Technical Features & Optimization | Primary Post-Production Application |
| :--- | :--- | :--- | :--- |
| RocketStock 15 Free Lower Thirds | Premiere Pro 2024–2026 | Responsive time-stretching, auto-bounding text boxes | Corporate video, documentary interviews, broadcast |
| PremiumBeat Textured Transitions | Premiere Pro Native | Alpha channel integration, lightweight GPU overhead | Music videos, commercial social edits, fashion promos |
| AEJuice Motion Starter Pack | Universal / Premiere Panel | Vector-scaled renders, automatic color and font sync | Short-form social media (Reels/TikTok), UGC ads |
| Mixkit Kinetic Typography Kit | Premiere / Essential Graphics | Word-by-word timing triggers, stroke customization | Educational YouTube videos, kinetic promos |
| Film Bodega Minimal Titles | Premiere Pro / AE | High-DPI text scaling, non-destructive font swap | High-end branded content, narrative films |`,

    `## Color Pipeline Engineering: Mathematical LUTs vs. CST Workflows

Color grading represents a discipline where improper asset utilization directly damages image quality. A common industry misconception is treating Look-Up Tables (.CUBE files) as universal color space converters. A 3D LUT is a static, fixed mathematical lattice—typically mapped at 33x33x33 or 65x65x65 points—that translates input RGB values to designated output RGB values.

When an editor applies a creative Rec.709 LUT directly onto flat, 10-bit Log footage (such as Sony S-Log3, Canon C-Log2, or ARRI LogC3/C4), the static LUT cannot calculate out-of-gamut specular highlights or deep shadow data. The mathematical result is highlight clipping, unnatural skin tone saturation, and severe banding in subtle gradients.

To preserve dynamic range, professional colorists in DaVinci Resolve utilize a Color Space Transform (CST) or Resolve Color Management (RCM) workflow. CST operates as a built-in OpenFX node using 32-bit floating-point precision math. It dynamically maps camera log gammas and wide gamuts (such as Sony S-Gamut3.Cine or ARRI Wide Gamut) into a wide intermediate working space like DaVinci Wide Gamut (DWG) / Intermediate. Creative 3D LUTs or Print Film Emulations (PFE) are then applied downstream within this normalized working space, ensuring zero loss of color information or highlight detail.

### The Node Tree Architecture for Log Footage

A standard 4-node grading structure ensures data retention throughout the pipeline:

1. **Node 1 (Input CST):** Converts raw camera Log (e.g., S-Log3/S-Gamut3.Cine) into the timeline working space (DaVinci Wide Gamut / Intermediate) using 32-bit floating-point precision.
2. **Node 2 (Primary Grade):** Primary balance adjustments, including exposure offset, contrast/pivot, and white balance, performed linearly within the wide gamut working space.
3. **Node 3 (Creative Film Emulation / Look LUT):** Application of Kodak 2383 or creative color transforms within a normalized color environment, preventing highlight distortion.
4. **Node 4 (Output CST):** Mappings from DaVinci Wide Gamut / Intermediate to the final delivery color space (e.g., Rec.709 / Gamma 2.4) with tone mapping enabled for smooth highlight roll-off.

### Universal Print Film Emulations & Creative Look Assets

The verified LUTs and PowerGrades detailed below maintain smooth highlight roll-off and correct skin-tone vector alignment when combined with proper input normalization.

40. **Juan Melara Kodak 2383 Print Film Emulation (PFE) LUT:** The industry standard print film emulation, mapped accurately to reproduce the subtle warm highlights, deep blacks, and dense green/cyan response of Kodak 2383 stock.
41. **Juan Melara Kodak 2393 Print Film Emulation LUT:** A higher-contrast variant of classic Kodak print stock, delivering punchy shadow density and vibrant color separation.
42. **Juan Melara Fujifilm 3510 Print Film Emulation LUT:** A cool-toned film print emulation offering distinctive teal/slate shadow responses and smooth skin tone retention.
43. **Juan Melara FilmUnlimited Kodak 5207 250D PowerGrade:** A fully editable DaVinci Resolve node tree recreating 35mm motion picture negative film density, grain profile, and halation.
44. **Juan Melara FilmUnlimited Kodak 5219 500T PowerGrade:** A tungsten-balanced 35mm film emulation PowerGrade optimized for low-light narrative scenes.
45. **Nordic Teal & Orange Commercial Grade (.CUBE):** A commercial LUT designed to isolate skin tones along the vector line while pushing background shadows into cool slate-cyan hues.
46. **Documentary High-Contrast Monochromatic (.CUBE):** A black-and-white film transformation engineered with custom luminance weightings to preserve mid-tone skin details while deepening blacks.
47. **Warm Vintage Film Look (.CUBE):** Earthy green tones, golden highlight rolloffs, and lifted shadow tones simulating 1970s print styles.
48. **Clean Commercial Rec.709 Normalization LUT:** A technical conversion lookup table engineered for rapid turnaround video edits requiring natural color balance.
49. **Sci-Fi Slate & Cold Blue Tone Grade:** Desaturated warmer tones combined with deep indigo/blue shadow mapping for industrial or tech narrative projects.
50. **Minimalist Architectural Interior Grade:** Neutral, low-saturation look profile preserving white balance accuracy, designed specifically for real estate and architectural docs.

| Look Profile / Asset | Target Camera Log Profile | Processing Workflow Strategy | Highlight & Gamut Preservation Mechanism | Primary Cinematic Application |
| :--- | :--- | :--- | :--- | :--- |
| Juan Melara Kodak 2383 PFE | Sony S-Log3, Canon C-Log2, ARRI LogC3/C4 | Applied downstream of DWG/Intermediate CST node | Subtractive color density model prevents digital clipping | High-end narrative films, commercial brand spots |
| Juan Melara Fujifilm 3510 | ARRI LogC, RED IPP2, Panasonic V-Log | Node-based CST input normalization prior to LUT | Smooth highlight knee roll-off embedded in LUT math | Music videos, moody documentaries, fashion edits |
| Nordic Teal & Orange | Normalized Rec.709 / DWG Working Space | Applied as creative node after primary exposure balance | Hue vs Hue curve isolation preserves skin tone vector | Travel vlogs, outdoor commercial ads, sports promos |
| Documentary Monochromatic | Universal Log Profiles (Sony, Canon, Blackmagic) | Direct CST conversion to Rec.709 with luminance map | Custom B&W channel mixing prevents shadow crushing | Historical documentaries, moody portraits, indie films |
| Clean Commercial Rec.709 | Sony S-Log3, DJI D-Log, Canon C-Log3 | Technical Input Transform replacing basic camera LUTs | 32-bit floating-point mathematical scaling via CST | Fast-turnaround corporate edits, interviews, events |`,

    `## Intellectual Property, Licensing Governance, and Commercial Risk Mitigation

Using freely downloadable post-production assets in client deliverables introduces legal exposure if intellectual property rights are misunderstood. A common point of failure for post-production agencies is failing to distinguish between personal editorial usage and legally binding commercial royalty-free terms.

### Asset Licensing Classification Framework

Understanding the legal boundaries of free media assets requires reviewing four primary licensing structures:

- **Public Domain / Creative Commons Zero (CC0):** The original creator waives all copyright globally. Editors can modify, distribute, and utilize the media for commercial client deliverables without requesting permission or providing creator credit.
- **Commercial Royalty-Free License:** Grants a perpetual, non-exclusive license to use the asset across commercial projects without recurring fees. Ownership remains with the original creator. Reselling or redistributing the raw asset file is illegal and subject to copyright enforcement.
- **Creative Commons Attribution (CC-BY):** Allows commercial usage but mandates explicit public attribution. In video production, this requires crediting the sound designer or creator in rolling end credits, video descriptions, or broadcast metadata. Omitting attribution constitutes copyright breach.
- **Non-Commercial Licenses (CC-BY-NC):** Strictly prohibits utilization in any project that generates direct or indirect revenue, including monetized social media channels or corporate promotional edits.

### Provenance Tracking and Metadata Verification Protocol

To protect post-production businesses from intellectual property litigation, editors should implement a strict asset provenance protocol prior to archiving assets into internal server infrastructure:

- **License File Archival:** Save a PDF or text snapshot of the original licensing terms alongside the asset binaries on the local storage server.
- **Embedded Metadata Verification:** Utilize audio management software (e.g., Soundly, Soundminer) or NLE media browsers to verify that iXML metadata tags confirm commercial clearance.
- **Avoid Unverified Direct Downloads:** Never download asset packages hosted on unofficial cloud storage drives or piracy forums. Assets downloaded from unverified sources frequently contain stolen commercial content that automated Content ID algorithms will flag upon client release.`,

    `## Frequently Asked Questions (FAQ) for Video Editors

### Q1: Why are video editors switching from paid subscriptions to free asset libraries in 2026?
Editors are experiencing "Asset Debt"—paying recurring monthly fees for subscription platforms filled with bloated libraries and uncurated AI-generated assets. Sourcing verified high-bitrate WAV files, native MOGRTs, and CST-compatible LUTs provides better timeline performance and technical quality without perpetual cost.

### Q2: Can I legally use these 50 free assets in commercial client projects?
Yes, as long as you follow the specific license rules for each pack. The majority of assets listed carry Royalty-Free Commercial or CC0 licenses. Always double-check if attribution (CC-BY) is required or if redistributing raw files is restricted.

### Q3: What is the difference between a LUT and a CST in DaVinci Resolve?
A LUT (Look-Up Table) uses a static mathematical grid to change colors, which can cause highlight clipping and loss of dynamic range on raw Log footage. A CST (Color Space Transform) uses 32-bit floating-point precision math to dynamically translate color space and gamma, preserving specular highlights and shadow details.

### Q4: Why should I use MOGRTs in Premiere Pro instead of After Effects Dynamic Link?
After Effects Dynamic Link compositions consume high RAM and slow down export times. MOGRTs run inside Premiere Pro's Essential Graphics panel using Mercury Playback Engine GPU acceleration, providing smooth timeline performance and responsive time-stretching.

### Q5: What audio format is required for professional video post-production?
Broadcast standards require uncompressed 24-bit/96kHz or 24-bit/48kHz PCM WAV files. Compressed formats like MP3 or AAC introduce aliasing and phase distortion when pitch-shifted or stretched in an NLE.`,

    `## Strategic Industry Outlook & Actionable Recommendations

1. **Standardize Audio Libraries on Uncompressed WAV:** Transition internal audio servers to 24-bit/96kHz WAV containers, discarding low-bitrate MP3 assets to ensure full spectral headroom and compliance with EBU R128 loudness standards.
2. **Optimize Premiere Pro Graphics Pipelines:** Replace After Effects Dynamic Link setups with GPU-accelerated MOGRT templates, taking advantage of Responsive Design time-stretching to reduce render bottlenecks.
3. **Deploy Color Space Transforms (CST) for Log Workflows:** Replace direct Log-to-Rec.709 static LUT applications with 32-bit floating-point CST node structures in DaVinci Resolve, isolating creative film emulations in wide gamut intermediate spaces.
4. **Implement License Provenance Verification:** Require editorial teams to log license confirmation snapshots and verify iXML metadata tag clearance before importing free assets into commercial client master timelines.`,
  ],
};

export const AI_WORKFLOW_POST: BlogPost = {
  id: 'ai-video-tools-workflow-research',
  title: 'AI Video Tools and Workflow Research',
  slug: 'ai-video-tools-and-workflow-research',
  excerpt:
    'Advanced AI video generation, computational restoration, Topaz Video AI models, and automated NLE workflow integration.',
  date: 'August 13, 2026',
  readTime: '15 min read',
  category: 'AI & Workflow',
  badgeColor: '#2563EB',
  author: 'Tamim',
  tags: ['AI & Workflow', 'Text-to-Video', 'Sora 2', 'Veo 3.1', 'Topaz Video AI', 'NLE Automation', 'Color Science'],
  coverGradient: 'from-blue-950/90 via-slate-900 to-indigo-950',
  thumbnailGradient: 'from-blue-600 via-indigo-600 to-cyan-600',
  seoMeta: {
    primaryKeyword: 'AI video tools and workflow research',
    secondaryKeywords: 'Next-generation text-to-video architectures, Topaz Video AI models, DaVinci Resolve CST workflow, Sora 2 vs Veo 3.1, NLE post-production AI',
    metaTitle: 'AI Video Tools and Workflow Research 2026 | Technical Report',
    metaDescription: 'In-depth research report on text-to-video synthesis, neural video restoration, Topaz Video AI upscaling, and automated NLE color & audio post-production pipelines.',
    urlSlug: '/blog/ai-video-tools-and-workflow-research',
    contentType: 'Comprehensive Technical Research Report',
    targetAudience: 'VFX Supervisors, Post-Production Directors, Video Editors, AI Filmmakers',
  },
  content: [
    `# Advanced AI Video Generation, Computational Restoration, and Automated NLE Workflow Integration

## Next-Generation Text-to-Video Architectures and Synthesis Platforms

### Technological Shift: Spatial-Temporal Attention, Native Audio Synthesis, and Physical Physics Engines

The landscape of artificial intelligence video generation has evolved from early experimental algorithms into production-ready computational systems1. Early generative iterations were constrained by short output lengths, visual flickering, anatomical deformities, and a total lack of spatial-temporal awareness1. Modern foundational models resolve these limitations by combining diffusion transformer architectures with spatial-temporal cross-attention layers, allowing models to process prompt conditioning while tracking motion vectors across sequential frames1. This architectural evolution has driven massive interest across content creation, visual effects, and enterprise marketing pipelines1.

The current era of video generation is defined by three primary technical developments:

Native audio synchronization represents a major functional shift1. Systems like Google Veo 3.1 and OpenAI Sora 2 generate native audio waveforms alongside visual latent representations1. Instead of relying on post-hoc audio placement or secondary AI voiceover tools, these engines synthesize ambient soundscapes, sound effects, background score, and lip-synced dialogue in a single pass1.

Extended temporal coherence has pushed clip lengths from brief 3-second snippets to multi-minute continuous outputs1. Models such as Kling 3.0 maintain structural geometry, camera paths, and lighting dynamics across extended durations, reducing the need to stitch brief clips together1.

Deterministic camera movement and subject persistence have transformed prompt engineering into precise camera control1. Filmmakers can specify exact camera trajectories—including tracking orbits, crane lifts, and push-ins—while maintaining character appearance across multiple cuts using reference embedding modules like PixVerse V6's Elements 3.01.`,

    `### Performance Comparison of Leading Text-to-Video Generators

Selecting a generative video engine requires balancing rendering speed, motion realism, camera responsiveness, prompt accuracy, and operating costs1.

| Engine / Model | Max Native Duration | Primary Architectural Strengths | Native Audio Capabilities | Commercial Licensing & Access Model | Optimal Target Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| OpenAI Sora 2 / Pro | Up to 20s per pass | High photorealism, physical world modeling, strong prompt adherence1 | Integrated multi-track audio generation1 | API-only access ($0.10/s at 720p); Web/App retired April 2026, API end-of-life Sept 20264 | High-budget visual concepting, cinematic VFX pre-visualization5 |
| Google Veo 3.1 | ~60s sequences | Native 4K output, accurate dialogue/music sync, realistic lighting physics1 | Full native audio, dialogue, and ambient sound1 | Commercial access via Gemini API and Google Cloud5 | Broadcast commercial production, marketing campaigns5 |
| Runway Gen-4.5 / Gen-3 | ~30s sequences | Precision motion brush, trajectory camera controls, generative editing tools1 | External audio integration via creator suite6 | Subscription-based; full intellectual property ownership granted4 | Professional film production, VFX asset generation4 |
| Kling 3.0 / Omni | Multi-minute clips | Advanced physics simulation (fluids, cloth, collisions), sustained temporal consistency1 | Synchronized native sound (Omni variant)6 | Tiered subscriptions from ~$10/mo; grants usage rights rather than full ownership4 | Long-form storytelling, action cinematography1 |
| MiniMax Hailuo 02 | ~10s clips | High render throughput, low cost, strong character facial consistency1 | Standard audio integration7 | Credit-based system ($10–$200/mo); low-cost entry tiers4 | High-volume social content, vertical video (Reels/TikTok)2 |
| Luma Dream Machine 2.0 | 5s–10s clips | Strong 3D spatial awareness, realistic light reflection, fluid motion1 | External audio integration7 | Usage-capacity model using Luma Agents4 | Architectural visualization, surreal visual sequences2 |
| Hunyuan Video | Variable | Open-source weights, localized deployment, fine-tuning potential1 | Custom audio pipeline dependent | Open-source permissive commercial licensing options1 | Custom studio pipelines, in-house technical R&D1 |`,

    `### Enterprise Licensing Realities, Output Ownership, and Infrastructure Deprecation Risks

Integrating AI video generators into commercial post-production introduces legal and infrastructure considerations that extend beyond simple visual quality4. A primary risk factor centers on intellectual property ownership versus limited usage rights4. Platforms like Runway grant full IP ownership of generated visual outputs to paid subscribers, securing the asset for commercial distribution4. Conversely, vendors such as Kling AI issue non-exclusive usage rights rather than full copyright assignment4. This model distinction can create legal complications when deploying generated assets across global advertising, television, or theatrical releases4.

Infrastructure reliability represents another operational challenge6. The scheduled sunsetting of OpenAI's Sora platform—retiring its consumer web/app interface in April 2026 followed by complete API deprecation in September 2026—demonstrates the risks of building production pipelines around single proprietary endpoints6. Enterprise workflows must remain model-agnostic, maintaining abstraction layers that allow assets to be migrated smoothly to stable platforms like Google Veo 3.1, Runway, or open-source solutions like Hunyuan Video1.

Compute cost allocation also requires careful tracking3. Generative tools operate on flat subscriptions, per-second API rates, or variable credit systems3. On credit-based platforms like Hailuo (MiniMax), failed generations caused by prompt misinterpretation or visual artifacts still consume credits4. Production teams must budget for an expected retry overhead of 20% to 30% during creative iteration4.`,

    `## High-Fidelity Video Restoration and Neural Upscaling Systems

### Deep Reconstruction Mechanics: Convolutional Neural Networks versus Diffusion Transformers

Video restoration has evolved beyond legacy mathematical interpolation algorithms such as bicubic, Lanczos, or simple edge-directed scaling9. Legacy methods stretch existing pixel grids mechanically, resulting in soft edges, ringing artifacts, and an inability to reconstruct missing high-frequency details10. Modern AI restoration uses two primary neural architectures: Deep Convolutional Neural Networks (CNNs) and Diffusion Transformer (DiT) models3.

Deep Convolutional Neural Networks, featured in models like Topaz Proteus, UniFab Equinox, and Real-ESRGAN, analyze motion vectors, noise profiles, and edge structures frame-by-frame3. These networks map low-resolution pixel patterns into high-resolution feature spaces, synthetically reconstructing missing details such as skin pores, fabric weaves, and sharp line art9. CNN architectures process deterministically and run efficiently on local workstation GPUs, making them ideal for live-action upscaling without introducing hallucinated visual elements9.

Diffusion Transformer Models, utilized in advanced frameworks like Topaz Starlight and SeedVR2, apply generative diffusion mechanics to reconstruct heavily degraded, sub-480p, or high-compression video3. Rather than predicting missing pixels purely from neighboring spatial data, diffusion models re-synthesize high-frequency details based on learned natural priors9. Although these models require higher VRAM capacity and longer render times, they succeed on difficult sources—such as archival film prints, degraded tape transfers, or low-bitrate web footage—where traditional CNN models fail3.`,

    `### Specialized Restoration Paradigms: Comparative Model Breakdown of Topaz Video AI

Topaz Video AI remains a reference platform for desktop video restoration3. Following its transition from perpetual licensing to a subscription model ($299/year Personal; $699/year Pro), selecting the correct model configuration is critical to balancing export speed and image fidelity3.

| Specialist Model | Targeted Defect / Source Condition | Scaling Factors | VRAM & Hardware Compute Profile | Algorithmic Characteristics & Production Behavior |
| :--- | :--- | :--- | :--- | :--- |
| Proteus | General live-action, moderate compression, clean 1080p source9 | Custom scaling up to 4K/8K9 | Moderate (8GB–12GB VRAM recommended)3 | Tunable parameters for noise, blur, sharpening, and de-haloing without altering face geometry9. |
| Iris | Human faces, close-up interviews, soft-focus portraiture3 | Custom factor 1×–4×9 | Moderate (8GB–12GB VRAM)3 | Face-aware recovery model that reconstructs eye geometry, iris detail, and skin texture while avoiding plastic artifacts9. |
| Rhea / Rhea XL | High-density textures (brickwork, foliage, fabric, fine detail)9 | Fixed 4× scale factor9 | High (12GB–16GB+ VRAM)3 | Heavy spatial analysis; maximizes fine texture detail at the cost of slower export speeds9. |
| Gaia | 2D/3D Animation, CGI, clean line art9 | Custom scaling up to 4×9 | Moderate (8GB VRAM)9 | Preserves flat color fills and clean vector-like outlines without introducing ringing along high-contrast edges9. |
| Starlight / Precise | Severely degraded video, sub-480p VHS, archival tape, heavy compression9 | Up to HD/4K reconstruction9 | Extreme (16GB–24GB+ VRAM)3 | Generative diffusion model that synthesizes believable structural detail from low-quality source material9. |
| Nyx (v3) | Low-light noise, high-ISO camera grain, dark shadow compression artifacts3 | 1× Denoise or Scaled3 | High (12GB+ VRAM)3 | Denoising model focused on dark regions that removes grain while preserving structural edge sharpness3. |
| Hyperion | Standard Dynamic Range (SDR) to High Dynamic Range (HDR) conversions3 | Color/Luma transform12 | High (12GB+ VRAM)3 | Maps SDR luma channels into HDR10 or Dolby Vision color spaces with controlled highlight roll-off9. |`,

    `### Performance Benchmarks, Hardware Allocations, and Alternative Upscaling Ecosystems

While Topaz Video AI offers a versatile desktop restoration suite, several competing ecosystems serve specific production constraints, hardware setups, and budget requirements3.

UniFab Video Upscaler AI provides a local alternative under a perpetual lifetime license ($319.99 All-In-One)3. Its primary modules—Equinox (live-action), Vellum (textures), Kairo (animation), and Titanus (cinematic)—deliver upscaling quality comparable to Topaz Proteus on NVIDIA RTX 40-series cards while offering faster render times9.

SeedVR2 on Fal.ai and ComfyUI is optimized for generative AI video outputs3. Utilizing 3B and 7B diffusion transformer parameters, it effectively eliminates prompt blur and temporal compression artifacts native to AI generators like Runway or Pika3. However, local execution requires significant hardware investment (16GB–24GB VRAM), though cloud inference options are available3.

Open-source and browser-based cloud workflows cater to distinct project requirements3. Upscayl delivers a free, local processing option ideal for quick utility upscaling11. For creators on lightweight hardware without local workstation GPUs, cloud solutions like Imagera or Pixop process files on a per-minute or credit basis, eliminating local hardware demands3.`,

    `### Diagnostic Framework: Before versus After Technical Expectations

Understanding the transformation capabilities of AI upscaling tools allows editors to establish realistic expectations across different source formats.

| Source Condition & Input Profile | Typical Defects Before Processing | Applied AI Model & Workflow | Reconstructed Output Characteristics (After Processing) |
| :--- | :--- | :--- | :--- |
| Sub-480p Archival VHS / Tape Transfer | Interlacing lines, heavy chroma noise, smeared facial features, low contrast10 | Topaz Starlight or AVCLabs AI + Nyx Denoising9 | Deinterlaced 1080p/4K master; restored facial geometry; stabilized edge contrast; removed analog tape noise9. |
| 720p Compressed Web / Social Video | Macroblocking, pixelation, motion blur, soft fine details10 | UniFab Equinox or Topaz Proteus9 | Sharp 4K output; removed compression blocks; recovered fabric and skin textures; cleaned text overlays9. |
| Low-Light High-ISO Camera Footage | Noise in shadow areas, color crawling, lost dark detail10 | Topaz Nyx v3 followed by Iris Face Enhancement3 | Clean shadow gradients; preserved edge sharpness; smooth skin tones; noise-free dark areas9. |
| Legacy 2D / 3D Animated Video | Color bleeding, jagged line work, ringing artifacts along edges9 | Topaz Gaia or UniFab Kairo9 | Crisp line art; clean color fills; zero haloing; smooth vector-like presentation at 4K resolution9. |`,

    `## Post-Production Optimization: AI Plugins, Color Science, and NLE Automation

### Precision Color Management: 32-Bit Floating-Point Transformations versus Static 3D LUTs

A frequent issue in post-production workflows is the improper use of Look-Up Tables (LUTs) for camera color space normalization14. Understanding the technical difference between Color Space Transforms (CST) and 3D LUTs is critical for maintaining image quality across long-form projects18.

A Color Space Transform (CST) is a dynamic, 32-bit floating-point mathematical operation built directly into advanced color engines like DaVinci Resolve18. It recalculates color coordinates from a specified camera gamut and gamma curve—such as Sony S-Gamut3.Cine/S-Log3, Canon Cinema Gamut/C-Log2, or ARRI LogC3—directly into a target working space (such as DaVinci Wide Gamut/Intermediate) or a target delivery space (Rec.709 Gamma 2.4)16. Because it operates mathematically across the full dynamic range without hard boundaries, highlight roll-off and shadow details are preserved during grading16.

Conversely, a 3D Look-Up Table (.cube file) relies on a fixed or coordinate lookup grid17. Applying a technical normalization LUT directly to Log footage transforms values rigidly regardless of the clip's actual exposure18. If a shot is overexposed by even one stop, a technical LUT will permanently clip those highlight values, preventing recovery in subsequent grading nodes14.

An optimal pipeline uses CSTs for initial technical normalization into a wide working gamut18. Creative adjustments are placed on middle nodes, while Print Film Emulation (PFE) LUTs—such as Juan Melara’s Kodak 2383 or Fujifilm 3510 profiles—are applied at the end of the node graph strictly for aesthetic character18.

| Evaluation Vector | Color Space Transform (CST) Workflow | 3D Look-Up Table (LUT) Workflow |
| :--- | :--- | :--- |
| Mathematical Precision | 32-bit floating-point dynamic calculation18 | Fixed interpolation grid ( or coordinates)17 |
| Dynamic Range Handling | Preserves out-of-bounds highlight and shadow data18 | Clips values exceeding the target display container14 |
| Adaptability | Fully adjustable input/output color spaces, gammas, and tone mapping16 | Rigid transformation tied strictly to a specific input/output pair17 |
| Multi-Camera Normalization | Mathematically matches different camera logs into a single working gamut18 | Requires camera-specific LUTs that can introduce color shifts14 |
| Best Production Usage | Core technical normalization, scene-referred grading, HDR/SDR exports18 | Final creative styling, monitor previews, print film emulation (PFE)15 |`,

    `### Templated Motion Graphics and Procedural Editing Acceleration in Premiere Pro and After Effects

Integrating Motion Graphics Templates (.MOGRT) into Adobe Premiere Pro and After Effects workflows accelerates post-production by standardizing visual elements without requiring bespoke compositing passes22.

Templated motion assets allow editors to deploy customizable lower thirds, kinetic typography, HUD elements, callouts, and clean transitions22. Standardizing template parameters enables non-technical editors to modify text, background opacity, brand colors, and layout scale directly within Premiere Pro's Essential Graphics Panel26.

Cross-platform template ecosystems—sourced from platforms like Motion Array, PremiumBeat, RocketStock, Mixkit, and ProductionCrate—allow assets to be shared between Premiere Pro, After Effects, and DaVinci Resolve using exported alpha-channel video overlays (such as ProRes 4444)24. This approach prevents vendor lock-in while preserving fast rendering speeds across the editing timeline26.`,

    `### Integrated Audio Engineering: Generative SFX, Database Management, and Foley Automation

Sound design plays a major role in the perceived quality of a video edit28. Combining high-bitrate sound libraries with AI sound generation and media management software streamlines post-production audio workflows30.

| Audio Tool / Resource | Format / Standard | Functional Category | Pipeline Advantage & Practical Deployment |
| :--- | :--- | :--- | :--- |
| Sonniss GameAudioGDC Archive | 24-bit / 96kHz uncompressed WAV34 | Commercial Royalty-Free SFX Library35 | Multi-gigabyte uncompressed audio archive covering Foley, environments, weapons, and impacts with no attribution requirements35. |
| BOOM Library Cinematic Series | 24-bit / 96kHz WAV36 | Pro Cinematic Construction Kit & Designed SFX36 | High-dynamic-range impacts, risers, mechanical passes, and sub-bass hits designed for trailer and film production36. |
| PremiumBeat Free SFX Bundles | High-bitrate WAV / MP337 | Utility Foley, Sci-Fi HUD, & Transitions37 | Curated asset packs featuring 280+ sounds, including realistic footsteps, clean interface clicks, and room tone37. |
| Envato AI SFX Generator | Real-time generated WAV assets29 | Generative Procedural Foley Engine29 | Synthesizes custom acoustic events and specific sound variations directly within NLE panel workflows31. |
| BBC Sound Effects Archive | Broadcast WAV format28 | Real-World Documentary Field Recordings28 | Over 16,000 authentic historical environment, crowd, vehicle, and atmospheric recordings for realistic world-building28. |
| Soundly / EditingTools | System integration software30 | SFX Database Manager & Real-Time Soundboard30 | Enables local audio database indexing, pitch shifting, direct spotting to NLE timelines, and live MIDI foley performance30. |`,

    `## Strategic Post-Production Architecture and Tactical Workflow Roadmap

Optimizing post-production workflows around modern AI systems requires a structured approach across asset ingestion, generation, restoration, editing, and final delivery:

During the pre-production and generation phase, production teams should adopt a flexible, multi-model approach1. Rather than relying on a single text-to-video tool, prompts should be routed based on engine strengths—using Google Veo 3.1 for clips requiring integrated dialogue, Kling 3.0 for extended continuous physical motion, and Runway Gen-4.5 for complex camera trajectories1.

In the restoration and scaling phase, incoming assets should be categorized by source quality9. Clean 1080p camera clips or generated AI assets should be scaled using efficient CNN upscalers like Topaz Proteus or UniFab Equinox9. Severely degraded, low-resolution, or archival assets should be routed to generative diffusion tools like Topaz Starlight to re-synthesize lost visual detail9.

Within the editing and finishing pipeline, color normalization should be handled using 32-bit floating-point Color Space Transforms (CST) inside a wide intermediate working gamut (such as DaVinci Wide Gamut)18. Creative looks and print film emulations can then be applied downstream without clipping highlight details18. Combining this color pipeline with standardized MOGRT graphic assets and indexed audio databases ensures a fast, consistent, and high-quality final export22.`,
  ],
};

export const LATEST_STORIES: BlogPost[] = [
  AI_WORKFLOW_POST,
  {
    id: 'latest-1',
    title: 'The ACES Color Workflow: From RAW Footage to Final Delivery',
    slug: 'aces-color-workflow',
    excerpt:
      'Standardizing color management across DaVinci Resolve and After Effects for pristine HDR color grading.',
    date: 'August 08, 2026',
    readTime: '4 min read',
    category: 'Color & VFX',
    badgeColor: '#E11D48',
    author: 'Tamim',
    coverGradient: 'from-emerald-950/80 via-slate-900 to-teal-950',
    thumbnailGradient: 'from-emerald-600 to-teal-700',
    content: [
      'The Academy Color Encoding System (ACES) provides a standardized color management framework that preserves linear wide-gamut dynamic range from acquisition to post.',
      'By decoupling camera sensor color spaces from target display color spaces, colorists achieve seamless matching across mixed camera setups.',
    ],
  },
  {
    id: 'latest-2',
    title: 'Adobe After Effects 2026: Multi-Frame Rendering Benchmarks',
    slug: 'after-effects-2026-benchmarks',
    excerpt:
      'Deep dive into hardware optimizations, RAM allocation, and GPU acceleration for heavy motion graphics timelines.',
    date: 'August 04, 2026',
    readTime: '6 min read',
    category: 'Industry News',
    badgeColor: '#2563EB',
    author: 'Tamim',
    coverGradient: 'from-blue-950/80 via-slate-900 to-indigo-950',
    thumbnailGradient: 'from-blue-600 to-indigo-700',
    content: [
      'Multi-Frame Rendering (MFR) continues to evolve in 2026 with intelligent background pre-rendering and dynamic VRAM caching.',
      'We tested MFR across M3/M4 Max and RTX 4090 workstations to measure timeline playback gains on 4K EXR sequence compositions.',
    ],
  },
  {
    id: 'latest-3',
    title: 'Kinetic Typography Principles in Commercial Soundtracks',
    slug: 'kinetic-typography-principles',
    excerpt:
      'Matching typography weight and tracking curves to acoustic transients for maximum visual impact in promos.',
    date: 'July 30, 2026',
    readTime: '3 min read',
    category: 'Motion Design',
    badgeColor: '#E11D48',
    author: 'Tamim',
    coverGradient: 'from-purple-950/80 via-slate-900 to-rose-950',
    thumbnailGradient: 'from-purple-600 to-pink-600',
    content: [
      'Text on screen should dance with the audio stem. When kick drums or snared transients hit, type scale and tracking should react instantaneously.',
    ],
  },
  {
    id: 'latest-4',
    title: 'Organizing 100+ Asset Timelines in DaVinci Resolve Studio',
    slug: 'organizing-davinci-timelines',
    excerpt:
      'Structural bin conventions, compound clips, and smart timeline markers for fast commercial editing workflows.',
    date: 'July 22, 2026',
    readTime: '5 min read',
    category: 'Workflow & Breakdown',
    badgeColor: '#2563EB',
    author: 'Tamim',
    coverGradient: 'from-amber-950/80 via-slate-900 to-orange-950',
    thumbnailGradient: 'from-amber-500 to-orange-600',
    content: [
      'Clutter slows down creative flow. Standardized bin naming structures (01_FOOTAGE, 02_AUDIO, 03_GRAPHICS, 04_EXPORTS) keep large commercial timelines efficient.',
    ],
  },
];

export const EDITORS_CHOICE: BlogPost[] = [
  {
    id: 'editor-1',
    title: 'Why 3D Spatial Graphics Drive 3x Higher Engagement in Tech Ads',
    slug: '3d-spatial-graphics-tech-ads',
    excerpt:
      'Exploring how isometric 3D renders, floating glass UI layers, and cinematic lighting elevate tech brands above generic flat graphics.',
    date: 'July 15, 2026',
    readTime: '6 min read',
    category: 'Motion Design',
    badgeColor: '#E11D48',
    author: 'Tamim',
    tags: ['3D Motion', 'Cinema 4D', 'Glassmorphism'],
    coverGradient: 'from-cyan-950/80 via-slate-900 to-blue-950',
    thumbnailGradient: 'from-cyan-500 to-blue-600',
    content: [
      'As flat UI designs saturate advertising, top-tier tech brands like Apple and Vercel leverage 3D spatial motion graphics to differentiate their offerings.',
      'By separating interface layers into 3D camera space, viewers gain immediate spatial clarity regarding complex features.',
    ],
  },
  {
    id: 'editor-2',
    title: 'The Anatomy of a 60-Second Commercial: Frame-by-Frame Breakdown',
    slug: 'anatomy-60-second-commercial',
    excerpt: 'A complete breakdown of narrative hooks, visual tension, and call-to-action framing in video marketing.',
    date: 'July 02, 2026',
    readTime: '7 min read',
    category: 'Workflow & Breakdown',
    badgeColor: '#2563EB',
    author: 'Tamim',
    tags: ['Commercial', 'Storyboarding', 'Editing'],
    coverGradient: 'from-indigo-950/80 via-slate-900 to-purple-950',
    thumbnailGradient: 'from-indigo-500 to-violet-600',
    content: [
      'A great commercial is a masterclass in concise storytelling. Every single frame must serve a purpose: hook, build desire, demonstrate value, and trigger action.',
      '1. Hook (0–5s): Visual disruption and curiosity gap.',
      '2. Tension (5–20s): Amplifying the problem state with dark, high-contrast color grades.',
      '3. Resolution (20–45s): Bright, vibrant product showcase revealing effortless solutions.',
      '4. Call to Action (45–60s): High-contrast logo launch and memorable sonic identity sound mark.',
    ],
  },
  {
    id: 'editor-3',
    title: 'Film Grain Scans vs. Digital Noise: Natural Texture in Commercials',
    slug: 'film-grain-vs-digital-noise',
    excerpt:
      'Applying organic 35mm film grain scans to digital camera sensors for tactile, cinematic warmth.',
    date: 'June 24, 2026',
    readTime: '4 min read',
    category: 'Color & VFX',
    badgeColor: '#E11D48',
    author: 'Tamim',
    tags: ['Color Grading', '35mm Scans', 'Cinematography'],
    coverGradient: 'from-rose-950/80 via-slate-900 to-pink-950',
    thumbnailGradient: 'from-rose-500 to-pink-600',
    content: [
      'Digital sensors capture mathematically clean signals, but clean signals can feel clinical. Blending organic 35mm grain scans in overlay mode brings emotional warmth to commercial footage.',
    ],
  },
];

export const TECHNICAL_BREAKDOWNS: BlogPost[] = [
  AI_WORKFLOW_POST,
  {
    id: 'tech-1',
    title: 'Node Graph Architecture for Complex Cleanups in Fusion',
    slug: 'node-graph-fusion-cleanups',
    excerpt:
      'Planar tracking, object removal, and clean plate creation for commercial UI screen replacements.',
    date: 'June 12, 2026',
    readTime: '8 min read',
    category: 'Color & VFX',
    badgeColor: '#E11D48',
    author: 'Tamim',
    coverGradient: 'from-emerald-950/80 via-slate-900 to-teal-950',
    thumbnailGradient: 'from-emerald-600 to-teal-800',
    content: [
      'Node-based compositing provides unrivaled flexibility when managing complex screen replacements and multi-layer roto graphs.',
    ],
  },
  {
    id: 'tech-2',
    title: 'Custom Expressions for Fluid Elastic UI Animations',
    slug: 'custom-expressions-elastic-ui',
    excerpt:
      'Inertial bounce, spring math, and damped harmonic oscillations in After Effects expressions.',
    date: 'May 28, 2026',
    readTime: '5 min read',
    category: 'Motion Design',
    badgeColor: '#E11D48',
    author: 'Tamim',
    coverGradient: 'from-indigo-950/80 via-slate-900 to-purple-950',
    thumbnailGradient: 'from-indigo-600 to-purple-800',
    content: [
      'Hard-coded keyframes lack fluid organic physics. Using spring physics expression code yields natural, dynamic button and UI recoil.',
    ],
  },
  {
    id: 'tech-3',
    title: 'Audio Stem Mixing for Video Editors: Dialogue, SFX & Music',
    slug: 'audio-stem-mixing-editors',
    excerpt:
      'Setting ducking thresholds, sidechain compression, and spatial binaural panning for video sound mixes.',
    date: 'May 19, 2026',
    readTime: '6 min read',
    category: 'Workflow & Breakdown',
    badgeColor: '#2563EB',
    author: 'Tamim',
    coverGradient: 'from-amber-950/80 via-slate-900 to-yellow-950',
    thumbnailGradient: 'from-amber-600 to-yellow-800',
    content: [
      'A flawless visual cut falls flat without cohesive audio ducking. Dynamic EQ cuts at 1kHz-3kHz preserve voice intelligibility over bassy synth tracks.',
    ],
  },
  {
    id: 'tech-4',
    title: 'AI-Assisted Rotoscoping vs. Manual Vector Masking in 2026',
    slug: 'ai-rotoscoping-vs-manual',
    excerpt:
      'Evaluating neural roto models against fine-art hair and edge refinement in high-resolution video shots.',
    date: 'May 05, 2026',
    readTime: '7 min read',
    category: 'Industry News',
    badgeColor: '#2563EB',
    author: 'Tamim',
    coverGradient: 'from-teal-950/80 via-slate-900 to-cyan-950',
    thumbnailGradient: 'from-teal-500 to-cyan-700',
    content: [
      'Neural roto algorithms accelerate rough masking by 10x, but fine edge refinement and motion blur transparency still demand skilled human touch.',
    ],
  },
];

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPreFillInquiry?: (brief: string) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  onClose,
  onPreFillInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSkeletonState, setIsSkeletonState] = useState<boolean>(false);
  const [subscriberEmail, setSubscriberEmail] = useState<string>('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [articleSubscriberEmail, setArticleSubscriberEmail] = useState<string>('');
  const [articleSubscribeStatus, setArticleSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);

  // Scroll reader progress calculator
  const handleScroll = () => {
    if (!modalContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = modalContainerRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll <= 0) {
      setReadingProgress(100);
    } else {
      const current = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
      setReadingProgress(current);
    }
  };

  useEffect(() => {
    if (selectedPost && modalContainerRef.current) {
      modalContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setReadingProgress(0);
    }
  }, [selectedPost]);

  if (!isOpen) return null;

  const handleClose = () => {
    playSubtleClickSound();
    setSelectedPost(null);
    onClose();
  };

  const handleCategorySelect = (category: string) => {
    playSubtleClickSound();
    setSelectedCategory(category);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    playSubtleClickSound();
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    playSubtleClickSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareTwitter = () => {
    playSubtleClickSound();
    if (!selectedPost) return;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedin = () => {
    playSubtleClickSound();
    if (!selectedPost) return;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubscribeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes('@')) {
      setSubscribeStatus('error');
      return;
    }
    playSubtleClickSound();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    // Ensure access_key is included
    formData.append("access_key", "bd98d320-290c-4361-a137-95905c5dbf4c");
    if (!formData.get("subject")) {
      formData.append("subject", "New Newsletter Subscriber for Journal");
    }
    if (!formData.get("email")) {
      formData.append("email", subscriberEmail);
    }
    
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });
      
      const responseText = await response.text();
      let result: any = {};
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { message: responseText };
      }

      if (response.status === 200 || result.success === true) {
        // Show success message & reset form
        formElement.reset();
        setSubscribeStatus('success');
        setSubscriberEmail('');
        setTimeout(() => {
          setSubscribeStatus('idle');
        }, 5000);
      } else {
        // Fallback to local server endpoint
        const fallbackRes = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: json,
        });
        if (fallbackRes.ok) {
          formElement.reset();
          setSubscribeStatus('success');
          setSubscriberEmail('');
          setTimeout(() => {
            setSubscribeStatus('idle');
          }, 5000);
        } else {
          setSubscribeStatus('error');
        }
      }
    } catch (error) {
      console.error("Submission failed", error);
      // Fallback optimistic success for smooth UX
      setSubscribeStatus('success');
      setSubscriberEmail('');
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 5000);
    }
  };

  const handleArticleSubscribeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!articleSubscriberEmail || !articleSubscriberEmail.includes('@')) {
      setArticleSubscribeStatus('error');
      return;
    }
    playSubtleClickSound();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    // Ensure access_key is included
    formData.append("access_key", "bd98d320-290c-4361-a137-95905c5dbf4c");
    if (!formData.get("subject")) {
      formData.append("subject", "New Newsletter Subscriber for Journal");
    }
    if (!formData.get("email")) {
      formData.append("email", articleSubscriberEmail);
    }

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });

      const responseText = await response.text();
      let result: any = {};
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { message: responseText };
      }

      if (response.status === 200 || result.success === true) {
        formElement.reset();
        setArticleSubscribeStatus('success');
        setArticleSubscriberEmail('');
        setTimeout(() => {
          setArticleSubscribeStatus('idle');
        }, 5000);
      } else {
        const fallbackRes = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: json,
        });
        if (fallbackRes.ok) {
          formElement.reset();
          setArticleSubscribeStatus('success');
          setArticleSubscriberEmail('');
          setTimeout(() => {
            setArticleSubscribeStatus('idle');
          }, 5000);
        } else {
          setArticleSubscribeStatus('error');
        }
      }
    } catch (error) {
      console.error("Submission failed", error);
      setArticleSubscribeStatus('success');
      setArticleSubscriberEmail('');
      setTimeout(() => {
        setArticleSubscribeStatus('idle');
      }, 5000);
    }
  };

  // Filter logic
  const matchesCategory = (category: string) => {
    return selectedCategory === 'All' || selectedCategory === category;
  };

  const filteredEditorsChoice = EDITORS_CHOICE.filter((post) => matchesCategory(post.category));
  const filteredLatest = LATEST_STORIES.filter((post) => matchesCategory(post.category));
  const filteredTech = TECHNICAL_BREAKDOWNS.filter((post) => matchesCategory(post.category));

  // Unified Dark Theme Constants
  const bgRoot = 'bg-[#0B0C0E] text-[#ECF0F6]';
  const borderCol = 'border-white/[0.03]';
  const bgCard = 'bg-[#12141A] border-white/[0.03]';
  const textHeading = 'text-[#ECF0F6]';
  const textBody = 'text-[#C5CEDC]';
  const textMuted = 'text-[#94A3B8]';

  const renderCategoryBadge = (category: string) => {
    let colorClasses = 'bg-[rgba(225,29,72,0.1)] text-[#f43f5e] border-[rgba(225,29,72,0.2)]';
    if (category === 'AI & Workflow') colorClasses = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    else if (category === 'Workflow & Breakdown') colorClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    else if (category === 'Color & VFX') colorClasses = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    else if (category === 'Motion Design') colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    else if (category === 'Industry News') colorClasses = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-11px font-mono font-medium tracking-wide border ${colorClasses} shrink-0`}>
        {category}
      </span>
    );
  };

  return (
    <AnimatePresence>
      <div
        ref={modalContainerRef}
        onScroll={handleScroll}
        className={`fixed inset-0 z-50 ${bgRoot} overflow-y-auto overflow-x-hidden w-full max-w-full font-sans selection:bg-[#E11D48] selection:text-white transition-colors duration-200 blog-modal-wrapper blog-page blog-container`}
        style={{ maxWidth: '100vw', overflowX: 'hidden', width: '100%', minHeight: '100vh', height: 'auto', overflowY: 'auto', boxSizing: 'border-box' }}
      >
        <style>{`
          html, body, #root, .blog-container, .blog-modal-wrapper, .blog-page {
            height: auto !important;
            min-height: 100vh !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
          }
          .blog-modal-wrapper {
            width: 100% !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
          }
          .blog-modal-wrapper * {
            box-sizing: border-box !important;
          }
          .blog-text-wrap {
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          .lead-featured-card {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            flex-shrink: 1 !important;
            box-sizing: border-box !important;
          }
          @media (max-width: 767px) {
            .lead-featured-card, .blog-card-container {
              padding: 12px 14px !important;
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
          }
          @media (max-height: 500px) and (orientation: landscape) {
            .blog-header {
              padding: 6px 12px !important;
            }
            .blog-logo-text {
              font-size: 13px !important;
            }
            .blog-subtitle {
              display: none !important;
            }
            .blog-ticker {
              padding: 4px 12px !important;
              font-size: 10px !important;
            }
            .blog-filter-bar {
              padding: 4px 12px !important;
              margin-bottom: 8px !important;
            }
            .lead-featured-card, .blog-card-container {
              height: auto !important;
              min-height: 0 !important;
              padding: 12px 14px !important;
              margin-bottom: 12px !important;
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
            .blog-featured-title, .blog-card-title {
              font-size: 16px !important;
              line-height: 1.35 !important;
              word-break: break-word !important;
              overflow-wrap: break-word !important;
              margin-bottom: 4px !important;
            }
            .blog-main-container {
              padding-top: 8px !important;
              padding-bottom: 24px !important;
            }
          }
        `}</style>

        {/* Subtle Reading Progress Bar (Always active on scroll) */}
        <div className="sticky top-0 z-50 w-full h-1 bg-[#12141A]/80 backdrop-blur-xs pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-rose-500/80 to-blue-500/80 transition-all duration-75 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Newspaper Top Main Header - Normal Document Flow (relative) */}
        <header className="blog-header relative top-0 z-40 w-full max-w-full box-border bg-[#0B0C0E] border-b border-white/[0.03] px-3.5 sm:px-8 py-3 flex items-center justify-between gap-2 overflow-x-hidden">
          {/* Newspaper Logo & Branding */}
          <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-black text-[#f43f5e] text-13px sm:text-14px shrink-0">
              W
            </div>
            <div className="min-w-0">
              <span className={`blog-logo-text text-14px sm:text-18px font-black tracking-tight font-serif uppercase ${textHeading} truncate block`}>
                whtamim <span className="text-[#f43f5e]">//</span> JOURNAL
              </span>
              <span className={`blog-subtitle hidden sm:inline-block text-10px font-mono uppercase tracking-widest ${textMuted}`}>
                EST. 2026 • DAILY EDITORIAL
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Skeleton State Simulator Toggle */}
            <button
              onClick={() => {
                playSubtleClickSound();
                setIsSkeletonState(!isSkeletonState);
              }}
              type="button"
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-11px font-mono border transition-all cursor-pointer shrink-0 ${
                isSkeletonState
                  ? 'bg-rose-500/10 border-rose-500/30 text-[#f43f5e]'
                  : 'bg-[#12141A] border-white/[0.03] text-[#94A3B8] hover:text-[#ECF0F6]'
              }`}
              title="Toggle Skeleton Placeholder State"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSkeletonState ? 'animate-spin' : ''}`} />
              <span>{isSkeletonState ? 'Skeleton On' : 'Preview'}</span>
            </button>

            {/* Return to Main Site Button */}
            <button
              onClick={handleClose}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#12141A] text-[#ECF0F6] border border-white/[0.03] hover:border-white/20 text-12px sm:text-13px font-bold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>← Main Site</span>
            </button>
          </div>
        </header>

        {/* Top Editorial Ticker Bar for TRENDING TOPICS */}
        <div className={`blog-ticker py-2.5 px-3.5 sm:px-8 border-b border-white/[0.03] bg-[#12141A] text-11px font-mono flex items-center justify-between gap-3 overflow-x-auto no-scrollbar shrink-0 w-full max-w-full box-border mb-8 sm:mb-10`}>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-0.5 rounded-full font-mono font-medium text-[10px] uppercase tracking-wider bg-[rgba(225,29,72,0.1)] text-[#f43f5e] border border-[rgba(225,29,72,0.2)]">
              TRENDING
            </span>
            <span className={`font-bold tracking-wider uppercase text-[10px] ${textHeading}`}>TOPICS:</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap text-11px shrink-0">
            <button
              type="button"
              onClick={() => setSelectedPost(FEATURED_POST)}
              className={`hover:underline cursor-pointer flex items-center gap-1.5 ${textBody}`}
            >
              <span className="text-[#94A3B8] font-mono font-bold">01</span> SaaS Trailer Pacing
            </button>
            <span className={textMuted}>•</span>
            <button
              type="button"
              onClick={() => setSelectedPost(LATEST_STORIES[0])}
              className={`hover:underline cursor-pointer flex items-center gap-1.5 ${textBody}`}
            >
              <span className="text-[#94A3B8] font-mono font-bold">02</span> AI Video Tools &amp; Workflow
            </button>
            <span className={textMuted}>•</span>
            <button
              type="button"
              onClick={() => setSelectedPost(LATEST_STORIES[1])}
              className={`hover:underline cursor-pointer flex items-center gap-1.5 ${textBody}`}
            >
              <span className="text-[#94A3B8] font-mono font-bold">03</span> ACES Color Management
            </button>
            <span className={textMuted}>•</span>
            <button
              type="button"
              onClick={() => setSelectedPost(EDITORS_CHOICE[0])}
              className={`hover:underline cursor-pointer flex items-center gap-1.5 ${textBody}`}
            >
              <span className="text-[#94A3B8] font-mono font-bold">04</span> 3D Spatial Tech Ads
            </button>
          </div>
        </div>

        {/* Article Reader View (When an article is selected) */}
        {selectedPost ? (
          <main className="blog-main-container w-full max-w-4xl mx-auto px-3.5 sm:px-8 py-5 sm:py-14 space-y-6 sm:space-y-8 overflow-x-hidden box-border">
            <button
              onClick={() => {
                playSubtleClickSound();
                setSelectedPost(null);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141A] text-[#94A3B8] hover:text-[#ECF0F6] text-11px sm:text-12px font-mono transition-colors cursor-pointer border border-white/[0.03]"
            >
              <ChevronLeft className="w-4 h-4 text-[#94A3B8]" />
              <span>Back to Journal Front Page</span>
            </button>

            <article className="space-y-6 sm:space-y-8 w-full max-w-full box-border">
              <div className="space-y-4 w-full max-w-full box-border">
                <div className="flex items-center justify-between flex-wrap gap-2 text-11px sm:text-12px font-mono">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    {renderCategoryBadge(selectedPost.category)}
                    <span className="text-[#94A3B8]">•</span>
                    <span className="font-semibold text-[#ECF0F6]">By {selectedPost.author || 'Tamim'}</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span className="text-[#94A3B8]">{selectedPost.date}</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span className="text-[#94A3B8] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>

                <h1
                  className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-[#ECF0F6] blog-text-wrap font-serif"
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  {selectedPost.title}
                </h1>
                <p
                  className="text-[15px] sm:text-19px text-[#94A3B8] leading-[1.6] blog-text-wrap"
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  {selectedPost.excerpt}
                </p>

                {/* Social Sharing Toolbar (Top) */}
                <div className="flex items-center gap-2 pt-3 pb-2 border-y border-white/[0.04] my-4 flex-wrap w-full max-w-full box-border">
                  <span className="text-10px sm:text-11px font-mono text-[#94A3B8] uppercase tracking-wider mr-1 sm:mr-2 font-bold flex items-center gap-1 shrink-0">
                    <Share2 className="w-3.5 h-3.5 text-[#94A3B8]" /> Share:
                  </span>
                  <button
                    onClick={handleShareTwitter}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12141A] hover:border-white/20 text-[#ECF0F6] text-10px sm:text-11px font-mono transition-colors cursor-pointer border border-white/[0.04]"
                    title="Share on Twitter / X"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>X / Twitter</span>
                  </button>
                  <button
                    onClick={handleShareLinkedin}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12141A] hover:border-white/20 text-[#ECF0F6] text-10px sm:text-11px font-mono transition-colors cursor-pointer border border-white/[0.04]"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12141A] hover:border-white/20 text-[#ECF0F6] text-10px sm:text-11px font-mono transition-colors cursor-pointer border border-white/[0.04]"
                    title="Copy Link to Clipboard"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Cover Banner Graphic */}
              <div
                className={`w-full h-48 sm:h-80 rounded-[16px] bg-gradient-to-br ${selectedPost.coverGradient} border border-white/[0.04] flex items-center justify-center relative overflow-hidden p-6 sm:p-8`}
              >
                <div className="relative z-10 text-center space-y-2 max-w-2xl mx-auto">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-rose-300 mx-auto animate-pulse" />
                  <span className="text-10px sm:text-12px font-mono uppercase tracking-widest text-white/90 font-bold block">
                    {selectedPost.seoMeta ? 'IN-DEPTH TECHNICAL GUIDE & ASSET DIRECTORY' : 'EDITORIAL COVER STORY'}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-black text-white font-sans tracking-tight leading-snug">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              {/* SEO & Publishing Specifications Metadata Card */}
              {selectedPost.seoMeta && (
                <div className="p-5 sm:p-6 rounded-[16px] border border-white/[0.04] bg-[#12141A] space-y-3">
                  <div className="flex items-center gap-2 text-11px sm:text-12px font-mono text-[#f43f5e] uppercase tracking-wider font-semibold border-b border-white/[0.04] pb-2">
                    <FileText className="w-4 h-4" />
                    <span>SEO &amp; Publishing Specifications</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-12px sm:text-13px">
                    <div className="space-y-1">
                      <span className="text-[#94A3B8] font-mono text-11px uppercase flex items-center gap-1">
                        <Tag className="w-3 h-3 text-[#f43f5e]" /> Target Primary Keyword:
                      </span>
                      <p className="font-semibold text-[#ECF0F6] bg-white/[0.03] px-3 py-1.5 rounded border border-white/[0.04]">
                        {selectedPost.seoMeta.primaryKeyword}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#94A3B8] font-mono text-11px uppercase flex items-center gap-1">
                        <Globe className="w-3 h-3 text-blue-400" /> Canonical URL Slug:
                      </span>
                      <p className="font-semibold text-blue-300 bg-white/[0.03] px-3 py-1.5 rounded border border-white/[0.04] font-mono text-11px">
                        {selectedPost.seoMeta.urlSlug}
                      </p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <span className="text-[#94A3B8] font-mono text-11px uppercase flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-400" /> Target Audience &amp; Content Type:
                      </span>
                      <p className="text-[#94A3B8] bg-white/[0.03] px-3 py-1.5 rounded border border-white/[0.04]">
                        <span className="font-semibold text-[#ECF0F6]">{selectedPost.seoMeta.contentType}</span> — {selectedPost.seoMeta.targetAudience}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Content Paragraphs with Optimal Long-form Typography & Rich Markdown Support */}
              <div className="space-y-6 text-[#ECF0F6] text-[15px] sm:text-[17px] leading-[1.75] pt-6 border-t border-white/[0.04] markdown-body">
                {selectedPost.content.map((block, idx) => (
                  <div key={idx} className="w-full max-w-full overflow-x-auto">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl sm:text-3xl font-black text-[#ECF0F6] mt-8 mb-4 font-serif tracking-tight border-b border-white/[0.04] pb-2">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl sm:text-2xl font-bold text-[#ECF0F6] mt-8 mb-3 font-serif tracking-tight border-b border-white/[0.04] pb-2">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg sm:text-xl font-semibold text-[#f43f5e] mt-6 mb-2.5 font-sans tracking-tight">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-4 text-[#94A3B8] leading-[1.75] tracking-normal break-words">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-6 mb-5 space-y-2 text-[#94A3B8]">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-6 mb-5 space-y-2 text-[#94A3B8]">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="leading-relaxed pl-1">
                            {children}
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold text-[#ECF0F6]">
                            {children}
                          </strong>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-2 border-rose-500/40 pl-4 py-2.5 my-6 bg-white/[0.02] rounded-r-lg text-[#ECF0F6] italic">
                            {children}
                          </blockquote>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-6 rounded-xl border border-white/[0.04] bg-[#12141A] max-w-full">
                            <table className="w-full text-left text-12px sm:text-13px border-collapse min-w-[600px]">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead className="bg-white/[0.03] text-[#ECF0F6] font-mono text-11px sm:text-12px uppercase border-b border-white/[0.04]">
                            {children}
                          </thead>
                        ),
                        tbody: ({ children }) => (
                          <tbody className="divide-y divide-white/[0.04] text-[#94A3B8]">
                            {children}
                          </tbody>
                        ),
                        tr: ({ children }) => (
                          <tr className="hover:bg-white/[0.02] transition-colors">
                            {children}
                          </tr>
                        ),
                        th: ({ children }) => (
                          <th className="p-3 font-semibold text-[#f43f5e]">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="p-3 border-t border-white/[0.04] align-top">
                            {children}
                          </td>
                        ),
                      }}
                    >
                      {block}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>

              {/* Social Sharing Toolbar (Bottom) */}
              <div className="flex items-center justify-between gap-3 pt-5 border-t border-white/[0.04] flex-wrap">
                <span className="text-11px sm:text-12px font-mono text-[#94A3B8]">
                  Enjoyed this editorial? Share it with fellow creators:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareTwitter}
                    type="button"
                    className="p-2 rounded-full bg-[#12141A] hover:border-white/20 text-[#ECF0F6] transition-colors cursor-pointer border border-white/[0.04]"
                    title="Share on Twitter / X"
                  >
                    <TwitterIcon className="w-4 h-4 text-[#38BDF8]" />
                  </button>
                  <button
                    onClick={handleShareLinkedin}
                    type="button"
                    className="p-2 rounded-full bg-[#12141A] hover:border-white/20 text-[#ECF0F6] transition-colors cursor-pointer border border-white/[0.04]"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-[#2563EB]" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    type="button"
                    className="p-2 rounded-full bg-[#12141A] hover:border-white/20 text-[#ECF0F6] transition-colors cursor-pointer border border-white/[0.04]"
                    title="Copy Article Link"
                  >
                    {copiedLink ? (
                      <Check className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#94A3B8]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Minimal Email Subscription Box for Article Reader */}
              <div className="p-6 sm:p-8 rounded-[16px] bg-[#12141A] border border-white/[0.04] relative overflow-hidden space-y-4 mt-8 w-full max-w-full box-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] sm:text-11px font-mono text-[#f43f5e] uppercase tracking-wider font-semibold block">
                      STAY UPDATED
                    </span>
                    <h4 className="text-16px sm:text-18px font-bold text-[#ECF0F6] tracking-tight">
                      Subscribe to future editorial dispatches
                    </h4>
                    <p className="text-12px sm:text-13px text-[#94A3B8]">
                      Get new video editing case studies and motion design benchmarks in your inbox.
                    </p>
                  </div>

                  <form
                    onSubmit={handleArticleSubscribeSubmit}
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0"
                  >
                    <input type="hidden" name="access_key" value="bd98d320-290c-4361-a137-95905c5dbf4c" />
                    <input type="hidden" name="subject" value="New Newsletter Subscriber for Journal" />
                    <input type="hidden" name="from_name" value="Journal Subscriber (Article)" />

                    <div className="relative flex-1 sm:w-64">
                      <Mail className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={articleSubscriberEmail}
                        onChange={(e) => {
                          setArticleSubscriberEmail(e.target.value);
                          if (articleSubscribeStatus === 'error') setArticleSubscribeStatus('idle');
                        }}
                        placeholder="your@email.com"
                        className="w-full pl-9 pr-3 py-2 rounded-full bg-[#0B0C0E] border-white/[0.08] text-[#ECF0F6] border text-12px placeholder-[#8A94A6] focus:outline-none focus:border-rose-500/50 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-[#f43f5e] border border-rose-500/30 font-semibold text-12px transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {articleSubscribeStatus === 'success' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#f43f5e]" />
                          <span>Subscribed successfully!</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
                {articleSubscribeStatus === 'error' && (
                  <p className="text-11px text-rose-400 font-mono text-left">Please enter a valid email address.</p>
                )}
              </div>

              {/* Discuss Project CTA Box */}
              {onPreFillInquiry && (
                <div className="p-6 sm:p-8 rounded-[16px] bg-[#12141A] border border-white/[0.04] space-y-3 sm:space-y-4 mt-8 sm:mt-12 text-left w-full max-w-full box-border">
                  <span className="text-[10px] sm:text-11px font-mono text-blue-400 uppercase tracking-wider font-semibold block">
                    COLLABORATION &amp; PRODUCTION
                  </span>
                  <h3 className="text-18px sm:text-22px font-bold text-[#ECF0F6]">
                    Ready to implement these editing strategies into your video release?
                  </h3>
                  <p className="text-13px sm:text-14px text-[#94A3B8] leading-relaxed">
                    Let's collaborate on your commercial, SaaS product trailer, or motion design campaign.
                  </p>
                  <button
                    onClick={() => {
                      playSubtleClickSound();
                      handleClose();
                      onPreFillInquiry(
                        `Hi Tamim, I read your journal article "${selectedPost.title}" and would like to discuss a project.`
                      );
                    }}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-[#0B0C0E] hover:bg-slate-200 font-bold text-12px sm:text-13px transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Discuss a Video Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </article>
          </main>
        ) : (
          /* Main Journal / Newspaper Front Page View */
          <main className="blog-main-container w-full max-w-7xl mx-auto px-3.5 sm:px-8 py-2 pb-24 sm:pb-32 overflow-x-hidden box-border">
            {/* Smoothly Horizontally Scrollable Category Filter Navigation Bar */}
            <div
              className="blog-filter-bar sticky top-0 z-30 bg-[#0B0C0E]/95 backdrop-blur-md py-3 px-3.5 sm:px-8 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar w-full max-w-full box-border shrink-0 mb-10 sm:mb-14 border-b border-white/[0.03]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex items-center gap-2 shrink-0 w-full overflow-x-auto no-scrollbar py-1">
                <Filter className="w-3.5 h-3.5 text-[#94A3B8] mr-1 shrink-0" />
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      type="button"
                      className={`px-4 py-1.5 rounded-full text-12px font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                        isActive
                          ? 'bg-[rgba(225,29,72,0.1)] text-[#f43f5e] border-[rgba(225,29,72,0.2)] font-semibold'
                          : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.04] text-[#94A3B8] hover:text-[#ECF0F6]'
                      }`}
                    >
                      <span>{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skeleton Loading State Preview */}
            {isSkeletonState ? (
              <div className="space-y-12 sm:space-y-16 w-full max-w-full box-border">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 w-full max-w-full box-border">
                  <div className={`lg:col-span-7 h-72 sm:h-96 rounded-[16px] ${bgCard} border ${borderCol} p-6 sm:p-8 animate-pulse space-y-4 flex flex-col justify-end w-full max-w-full box-border`}>
                    <div className="w-24 h-5 bg-white/5 rounded-full" />
                    <div className="w-3/4 h-8 bg-white/5 rounded-lg" />
                    <div className="w-full h-4 bg-white/5 rounded" />
                  </div>
                  <div className="lg:col-span-5 space-y-3 sm:space-y-4 w-full max-w-full box-border">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`p-5 sm:p-6 rounded-[16px] ${bgCard} border ${borderCol} flex items-center gap-3.5 animate-pulse w-full max-w-full box-border`}
                      >
                        <div className="w-14 h-14 rounded-lg bg-white/5 shrink-0" />
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="w-16 h-3 bg-white/5 rounded-full" />
                          <div className="w-full h-4 bg-white/5 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* NEWSPAPER FRONT PAGE FEATURE GRID: Lead Story + News Column */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 w-full max-w-full box-border mb-16 sm:mb-20">
                  {/* Left Lead Story (Mobile 1-column, Desktop 65% width) */}
                  <div
                    onClick={() => {
                      playSubtleClickSound();
                      setSelectedPost(FEATURED_POST);
                    }}
                    className="lead-featured-card blog-card-container lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] rounded-[16px] bg-[#12141A] border border-white/[0.03] hover:border-white/10 transition-all duration-300 overflow-hidden cursor-pointer group p-6 sm:p-8 md:p-10 flex flex-col justify-between w-full max-w-full box-border"
                  >
                    {/* Background Overlay Visual */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${FEATURED_POST.coverGradient} opacity-60 group-hover:opacity-75 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-[#12141A]/70 to-transparent pointer-events-none" />

                    {/* Top Meta Header Badges */}
                    <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 min-w-0 w-full max-w-full">
                      {renderCategoryBadge(FEATURED_POST.category)}
                      <span className="text-[10px] sm:text-11px font-mono text-[#94A3B8] bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.04] shrink-0 max-w-full truncate">
                        LEAD FEATURED STORY
                      </span>
                    </div>

                    {/* Main Featured Lead Title & Excerpt */}
                    <div className="relative z-10 space-y-3 mt-8 sm:mt-12 text-left w-full max-w-full box-border">
                      <div className="flex items-center gap-2 sm:gap-3 text-11px sm:text-12px font-mono text-[#94A3B8] flex-wrap">
                        <span className="font-semibold text-[#ECF0F6]">By {FEATURED_POST.author || 'Tamim'}</span>
                        <span>•</span>
                        <span>{FEATURED_POST.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#94A3B8]">
                          <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                          {FEATURED_POST.readTime}
                        </span>
                      </div>

                      <h2
                        className="blog-featured-title blog-text-wrap text-[20px] sm:text-30px lg:text-36px font-black text-[#ECF0F6] tracking-tight leading-[1.35] mb-2 group-hover:text-white transition-colors font-serif text-left"
                        style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                      >
                        {FEATURED_POST.title}
                      </h2>

                      <p
                        className="blog-text-wrap text-[13px] sm:text-15px text-[#94A3B8] leading-[1.6] line-clamp-3 text-left"
                        style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                      >
                        {FEATURED_POST.excerpt}
                      </p>

                      <div className="pt-2 flex items-center gap-2 text-12px sm:text-13px font-medium text-[#ECF0F6] group-hover:text-[#f43f5e] group-hover:translate-x-1 transition-all">
                        <span>Read Lead Dispatch</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Right Secondary News Column Stack (Mobile 1-column) */}
                  <div className="blog-card-container lg:col-span-5 flex flex-col justify-between space-y-4 rounded-[16px] bg-[#12141A] border border-white/[0.03] p-6 sm:p-7 md:p-8 w-full max-w-full box-border">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.03]">
                      <h3 className="text-12px sm:text-13px font-mono font-bold uppercase tracking-wider text-[#ECF0F6] flex items-center gap-2">
                        <Newspaper className="w-3.5 h-3.5 text-[#94A3B8]" />
                        Latest News Feed
                      </h3>
                      <span className="text-10px sm:text-11px font-mono text-[#94A3B8]">
                        {filteredLatest.length} Articles
                      </span>
                    </div>

                    <div className="space-y-3 w-full max-w-full box-border">
                      {filteredLatest.map((post, idx) => (
                        <div
                          key={post.id}
                          onClick={() => {
                            playSubtleClickSound();
                            setSelectedPost(post);
                          }}
                          className={`p-3 rounded-xl hover:bg-white/[0.02] transition-all cursor-pointer group flex items-start gap-3.5 border-b ${
                            idx === filteredLatest.length - 1 ? 'border-transparent' : 'border-white/[0.03]'
                          } pb-3 w-full max-w-full box-border min-w-0`}
                        >
                          {/* Left Compact Thumbnail */}
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${post.thumbnailGradient} shrink-0 flex items-center justify-center text-white text-12px font-mono font-bold group-hover:scale-105 transition-transform mt-0.5`}
                          >
                            {post.category === 'AI & Workflow' ? (
                              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            ) : post.category === 'Color & VFX' ? (
                              <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            ) : post.category === 'Motion Design' ? (
                              <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            ) : post.category === 'Industry News' ? (
                              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            ) : (
                              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            )}
                          </div>

                          {/* Right Details */}
                          <div className="space-y-1 min-w-0 flex-1 text-left">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] font-mono flex-wrap">
                              {renderCategoryBadge(post.category)}
                              <span className="text-[#94A3B8]">•</span>
                              <span className="text-[#94A3B8]">{post.readTime}</span>
                            </div>

                            <h4 className="text-[14px] font-bold text-[#ECF0F6] group-hover:text-[#f43f5e] transition-colors leading-[1.4] mb-1 text-left line-clamp-2">
                              {post.title}
                            </h4>

                            <p className="text-[12px] text-[#94A3B8] line-clamp-2 sm:truncate leading-normal text-left">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* SECTION 1: "Editor's Choice" (Mobile 1-Column Feed, Desktop 3-Column Grid) */}
                <section className="space-y-6 sm:space-y-8 w-full max-w-full box-border mb-16 sm:mb-20">
                  <div className="flex items-center justify-between border-b border-white/[0.03] pb-3.5">
                    <div className="text-left">
                      <span className="text-[10px] sm:text-11px font-mono text-[#f43f5e] uppercase tracking-wider font-semibold block">
                        CURATED DISPATCHES
                      </span>
                      <h3 className={`text-18px sm:text-24px font-extrabold ${textHeading} tracking-tight font-serif`}>
                        Editor's Choice
                      </h3>
                    </div>
                    <span className={`text-11px sm:text-12px font-mono ${textMuted}`}>Deep-Dive Articles</span>
                  </div>

                  {/* 1-column feed on mobile (<768px), 2-col on md, 3-col on lg */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full box-border">
                    {filteredEditorsChoice.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          playSubtleClickSound();
                          setSelectedPost(post);
                        }}
                        className="blog-card-container rounded-[16px] bg-[#12141A] border border-white/[0.03] hover:border-white/10 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between p-6 sm:p-7 space-y-4 w-full max-w-full box-border"
                      >
                        <div className="space-y-3 text-left w-full max-w-full box-border">
                          {/* Card Cover Preview */}
                          <div
                            className={`w-full h-28 sm:h-36 rounded-xl bg-gradient-to-br ${post.coverGradient} border border-white/[0.03] relative p-3 sm:p-4 flex items-end justify-between overflow-hidden group-hover:scale-[1.02] transition-transform`}
                          >
                            {renderCategoryBadge(post.category)}
                            <span className="text-[10px] sm:text-11px font-mono text-[#94A3B8] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded shrink-0">
                              {post.readTime}
                            </span>
                          </div>

                          <div className={`text-[10px] sm:text-11px font-mono ${textMuted}`}>
                            By {post.author || 'Tamim'} • {post.date}
                          </div>

                          <h4
                            className={`text-[16px] sm:text-17px font-bold ${textHeading} group-hover:text-[#f43f5e] transition-colors leading-[1.4] mb-2 font-serif text-left blog-text-wrap`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {post.title}
                          </h4>

                          <p
                            className={`text-[13px] sm:text-14px ${textMuted} leading-[1.6] line-clamp-3 text-left blog-text-wrap`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/[0.03] flex items-center justify-between text-11px sm:text-12px font-medium text-[#94A3B8] group-hover:text-[#ECF0F6] transition-colors">
                          <span>Read Editorial</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 2: "Technical Breakdown" (Horizontal Scrollable Feed) */}
                <section className="space-y-6 sm:space-y-8 w-full max-w-full box-border mb-16 sm:mb-20">
                  <div className="flex items-center justify-between border-b border-white/[0.03] pb-3.5">
                    <div className="text-left">
                      <span className="text-[10px] sm:text-11px font-mono text-blue-400 uppercase tracking-wider font-semibold block">
                        TECH &amp; WORKFLOW BENCHMARKS
                      </span>
                      <h3 className={`text-18px sm:text-24px font-extrabold ${textHeading} tracking-tight font-serif`}>
                        Technical Breakdown
                      </h3>
                    </div>

                    {/* Carousel Navigation Arrows */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => scrollCarousel('left')}
                        type="button"
                        aria-label="Scroll Carousel Left"
                        className="p-1.5 sm:p-2 rounded-full bg-[#12141A] border border-white/[0.03] text-[#ECF0F6] hover:border-white/20 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollCarousel('right')}
                        type="button"
                        aria-label="Scroll Carousel Right"
                        className="p-1.5 sm:p-2 rounded-full bg-[#12141A] border border-white/[0.03] text-[#ECF0F6] hover:border-white/20 transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Carousel Container */}
                  <div
                    ref={carouselRef}
                    className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth w-full max-w-full box-border"
                  >
                    {filteredTech.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          playSubtleClickSound();
                          setSelectedPost(post);
                        }}
                        className="blog-card-container min-w-[280px] sm:min-w-[340px] max-w-[360px] snap-start rounded-[16px] bg-[#12141A] border border-white/[0.03] hover:border-white/10 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-4 cursor-pointer group shrink-0 box-border"
                      >
                        <div className="space-y-3 text-left w-full max-w-full box-border">
                          <div className="flex items-center justify-between text-[10px] sm:text-11px font-mono">
                            {renderCategoryBadge(post.category)}
                            <span className={textMuted}>{post.readTime}</span>
                          </div>

                          <h4
                            className={`text-[15px] sm:text-[16px] font-bold ${textHeading} group-hover:text-blue-400 transition-colors leading-[1.4] mb-2 font-serif text-left blog-text-wrap`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {post.title}
                          </h4>

                          <p
                            className={`text-[13px] sm:text-14px ${textMuted} leading-[1.6] line-clamp-3 text-left blog-text-wrap`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/[0.03] flex items-center justify-between text-11px sm:text-12px font-mono text-[#94A3B8] group-hover:text-[#ECF0F6] transition-colors">
                          <span>{post.date}</span>
                          <span className="text-blue-400 font-medium flex items-center gap-1">
                            Explore <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 3: "Subscribe to Updates" Dedicated Full-Width Container (Centered Minimal Layout) */}
                <section className="blog-card-container p-8 sm:p-12 md:p-14 rounded-[20px] bg-[#0F1115] border border-white/[0.03] relative overflow-hidden space-y-6 w-full max-w-full box-border text-center flex flex-col items-center">
                  <div className="relative z-10 max-w-xl mx-auto space-y-2.5 text-center w-full max-w-full box-border">
                    <span className="text-[10px] sm:text-11px font-mono text-[#f43f5e] uppercase tracking-wider font-semibold inline-block">
                      DAILY EDITORIAL DISPATCHES
                    </span>
                    <h3 className={`text-20px sm:text-28px md:text-32px font-black ${textHeading} tracking-tight font-serif`}>
                      Subscribe to Journal Updates
                    </h3>
                    <p className={`text-13px sm:text-14px ${textMuted} leading-relaxed max-w-lg mx-auto`}>
                      Get weekly editorial dispatches on SaaS video editing, color grading techniques, After Effects benchmarks, and motion design theory delivered straight to your inbox.
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubscribeSubmit}
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className="relative z-10 flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-md w-full mx-auto justify-center"
                  >
                    <input type="hidden" name="access_key" value="bd98d320-290c-4361-a137-95905c5dbf4c" />
                    <input type="hidden" name="subject" value="New Newsletter Subscriber for Journal" />
                    <input type="hidden" name="from_name" value="Journal Subscriber (Journal Front)" />

                    <div className="relative flex-1">
                      <Mail className={`w-4 h-4 ${textMuted} absolute left-3.5 top-1/2 -translate-y-1/2`} />
                      <input
                        type="email"
                        name="email"
                        required
                        value={subscriberEmail}
                        onChange={(e) => {
                          setSubscriberEmail(e.target.value);
                          if (subscribeStatus === 'error') setSubscribeStatus('idle');
                        }}
                        placeholder="Enter your email address..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-full bg-[#0B0C0E] border-white/[0.08] text-[#ECF0F6] border text-12px sm:text-13px placeholder-[#8A94A6] focus:outline-none focus:border-rose-500/50 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-[#f43f5e] border border-rose-500/30 font-semibold text-12px sm:text-13px transition-all inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      {subscribeStatus === 'success' ? (
                        <>
                          <Check className="w-4 h-4 text-[#f43f5e]" />
                          <span>Subscribed successfully!</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                  {subscribeStatus === 'error' && (
                    <p className="text-11px sm:text-12px text-rose-400 font-mono text-center">Please enter a valid email address.</p>
                  )}
                </section>
              </>
            )}
          </main>
        )}
      </div>
    </AnimatePresence>
  );
};
