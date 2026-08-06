import { useState, useEffect } from 'react';

export type SkyPhase = 'night' | 'dawn' | 'day' | 'evening' | 'sunset';

// Sky phase calculation based on Dhaka sunrise (~5:30 AM / 5.5) and sunset (~6:30 PM / 18.5)
export function getSkyPhase(hour: number, sunriseHour: number = 5.5, sunsetHour: number = 18.5): SkyPhase {
  if (hour < sunriseHour - 1) return 'night';
  if (hour < sunriseHour + 1) return 'dawn';
  if (hour < sunsetHour - 2) return 'day';
  if (hour < sunsetHour) return 'evening';
  if (hour < sunsetHour + 1) return 'sunset';
  return 'night';
}

export interface StudioTimeState {
  timeString: string;          // e.g. "08:42:15 AM"
  shortTimeString: string;     // e.g. "08:42 AM"
  location: string;            // "Dhaka, Bangladesh"
  periodKey: 'sunrise' | 'morning' | 'afternoon' | 'sunset' | 'evening' | 'midnight';
  
  // Dynamic Sky Phase Properties
  skyPhase: SkyPhase;
  skyName: string;
  skyGradient: string;
  sunMoonPosition: { x: number; y: number }; // percentage 0-100
  sunMoonType: 'sun' | 'moon';
  starOpacity: number;
  cloudOpacity: number;

  iconEmoji: string;
  periodTitle: string;
  headline: string;
  statusMessage: string;
  availabilityText: string;
  presenceState: 'available' | 'deep_work' | 'offline';
  presenceBadgeText: string;
  presenceDotColor: string;
  
  // Ambient styling
  accentColor: string;
  glowGradient: string;
  borderColor: string;
}

export function getStudioTimeData(now: Date = new Date()): StudioTimeState {
  // Convert current time to Asia/Dhaka timezone
  const dhakaTimeString = now.toLocaleString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const [hoursStr, minutesStr, secondsStr] = dhakaTimeString.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);
  const totalMinutes = hours * 60 + minutes;
  const decimalHour = hours + minutes / 60 + seconds / 3600;

  // Format 12-hour display time
  const formattedTime12 = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedShort12 = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const location = 'Dhaka, Bangladesh';

  // Calculate sky phase using requested logic (sunrise: 5.5, sunset: 18.5)
  const skyPhase = getSkyPhase(decimalHour, 5.5, 18.5);

  // Celestial sun/moon position arc
  const isDaytime = decimalHour >= 5.5 && decimalHour < 18.5;
  let sunMoonType: 'sun' | 'moon' = isDaytime ? 'sun' : 'moon';
  let posX = 50;
  let posY = 50;

  if (isDaytime) {
    const progress = Math.max(0, Math.min(1, (decimalHour - 5.5) / 13));
    posX = 10 + progress * 80;
    posY = 75 - Math.sin(progress * Math.PI) * 55;
  } else {
    const progress = decimalHour >= 18.5
      ? (decimalHour - 18.5) / 11
      : (decimalHour + 24 - 18.5) / 11;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    posX = 10 + clampedProgress * 80;
    posY = 75 - Math.sin(clampedProgress * Math.PI) * 50;
  }

  // Sky styling parameters
  let skyName = 'Starlit Sky';
  let skyGradient = 'linear-gradient(180deg, #040714 0%, #0c122c 45%, #181d3d 80%, #201a36 100%)';
  let starOpacity = 0.9;
  let cloudOpacity = 0.25;

  switch (skyPhase) {
    case 'dawn':
      skyName = 'Dawn Twilight Sky';
      skyGradient = 'linear-gradient(180deg, #0f152a 0%, #2a1b38 30%, #682c44 60%, #c45d55 85%, #f5a36c 100%)';
      starOpacity = 0.35;
      cloudOpacity = 0.45;
      break;
    case 'day':
      skyName = 'Daylight Blue Sky';
      skyGradient = 'linear-gradient(180deg, #0e487a 0%, #1e6fa8 35%, #4ea3dd 70%, #9bcbf5 100%)';
      starOpacity = 0;
      cloudOpacity = 0.8;
      break;
    case 'evening':
      skyName = 'Dusk Evening Sky';
      skyGradient = 'linear-gradient(180deg, #151d2a 0%, #28374a 35%, #8c4e28 75%, #ca6834 100%)';
      starOpacity = 0.15;
      cloudOpacity = 0.55;
      break;
    case 'sunset':
      skyName = 'Golden Sunset Sky';
      skyGradient = 'linear-gradient(180deg, #1d0e2e 0%, #4a154b 28%, #9e2a4b 58%, #df573e 82%, #f39c12 100%)';
      starOpacity = 0.2;
      cloudOpacity = 0.65;
      break;
    case 'night':
    default:
      skyName = 'Starlit Night Sky';
      skyGradient = 'linear-gradient(180deg, #040714 0%, #0c122c 45%, #181d3d 80%, #201a36 100%)';
      starOpacity = 0.9;
      cloudOpacity = 0.25;
      break;
  }

  // Time periods in Bangladesh (Asia/Dhaka)
  if (totalMinutes >= 330 && totalMinutes < 420) {
    // 🌅 Sunrise
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'sunrise',
      skyPhase,
      skyName,
      skyGradient,
      sunMoonPosition: { x: posX, y: posY },
      sunMoonType,
      starOpacity,
      cloudOpacity,
      iconEmoji: '🌅',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Good Morning',
      statusMessage: 'Sunrise in Studio',
      availabilityText: 'Usually replies within 1–2 hours',
      presenceState: 'available',
      presenceBadgeText: 'Currently Available',
      presenceDotColor: '#10B981',
      accentColor: '#F59E0B',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0) 70%)',
      borderColor: 'rgba(245, 158, 11, 0.4)',
    };
  } else if (totalMinutes >= 420 && totalMinutes < 690) {
    // ☀️ Morning
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'morning',
      skyPhase,
      skyName,
      skyGradient,
      sunMoonPosition: { x: posX, y: posY },
      sunMoonType,
      starOpacity,
      cloudOpacity,
      iconEmoji: '☀️',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Good Morning',
      statusMessage: 'Working Hours',
      availabilityText: 'Usually replies within 1–2 hours',
      presenceState: 'available',
      presenceBadgeText: 'Currently Available',
      presenceDotColor: '#10B981',
      accentColor: '#007AFF',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(0, 122, 255, 0.25) 0%, rgba(0, 122, 255, 0) 70%)',
      borderColor: 'rgba(0, 122, 255, 0.35)',
    };
  } else if (totalMinutes >= 690 && totalMinutes < 990) {
    // 🌤️ Afternoon
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'afternoon',
      skyPhase,
      skyName,
      skyGradient,
      sunMoonPosition: { x: posX, y: posY },
      sunMoonType,
      starOpacity,
      cloudOpacity,
      iconEmoji: '🌤️',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Good Afternoon',
      statusMessage: 'In Studio & Editing',
      availabilityText: 'Usually replies within 1–2 hours',
      presenceState: 'available',
      presenceBadgeText: 'Currently Available',
      presenceDotColor: '#10B981',
      accentColor: '#3B82F6',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0) 70%)',
      borderColor: 'rgba(59, 130, 246, 0.35)',
    };
  } else if (totalMinutes >= 990 && totalMinutes < 1110) {
    // 🌇 Sunset
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'sunset',
      skyPhase,
      skyName,
      skyGradient,
      sunMoonPosition: { x: posX, y: posY },
      sunMoonType,
      starOpacity,
      cloudOpacity,
      iconEmoji: '🌇',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Golden Hour',
      statusMessage: "Wrapping up today's work",
      availabilityText: 'Usually replies within 2–3 hours',
      presenceState: 'available',
      presenceBadgeText: 'Currently Available',
      presenceDotColor: '#10B981',
      accentColor: '#F97316',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.28) 0%, rgba(249, 115, 22, 0) 70%)',
      borderColor: 'rgba(249, 115, 22, 0.4)',
    };
  } else if (totalMinutes >= 1110 && totalMinutes < 1320) {
    // 🌙 Evening
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'evening',
      skyPhase,
      skyName,
      skyGradient,
      sunMoonPosition: { x: posX, y: posY },
      sunMoonType,
      starOpacity,
      cloudOpacity,
      iconEmoji: '🌙',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Good Evening',
      statusMessage: 'Evening Studio Session',
      availabilityText: 'Usually replies within 2–4 hours',
      presenceState: 'deep_work',
      presenceBadgeText: 'Deep Work Session',
      presenceDotColor: '#F59E0B',
      accentColor: '#6366F1',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.28) 0%, rgba(99, 102, 241, 0) 70%)',
      borderColor: 'rgba(99, 102, 241, 0.4)',
    };
  } else {
    // 🌌 Midnight / Night
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'midnight',
      skyPhase,
      skyName,
      skyGradient,
      sunMoonPosition: { x: posX, y: posY },
      sunMoonType,
      starOpacity,
      cloudOpacity,
      iconEmoji: '🌙',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Late Night Creative Session',
      statusMessage: 'Quiet Hours in Studio',
      availabilityText: 'Responses may be slower until morning.',
      presenceState: 'offline',
      presenceBadgeText: 'Studio Offline',
      presenceDotColor: '#818CF8',
      accentColor: '#818CF8',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(129, 140, 248, 0.28) 0%, rgba(129, 140, 248, 0) 70%)',
      borderColor: 'rgba(129, 140, 248, 0.4)',
    };
  }
}

export function useStudioTime(): StudioTimeState {
  const [timeData, setTimeData] = useState<StudioTimeState>(() => getStudioTimeData());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeData(getStudioTimeData());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeData;
}
