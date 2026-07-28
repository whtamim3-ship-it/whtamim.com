import { useState, useEffect } from 'react';

export interface StudioTimeState {
  timeString: string;          // e.g. "08:42:15 AM"
  shortTimeString: string;     // e.g. "08:42 AM"
  location: string;            // "Dhaka, Bangladesh"
  periodKey: 'sunrise' | 'morning' | 'afternoon' | 'sunset' | 'evening' | 'midnight';
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
  const totalMinutes = hours * 60 + minutes;

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

  // Time periods in Bangladesh (Asia/Dhaka)
  // Sunrise: 5:30 AM (330m) to 7:00 AM (420m)
  // Morning: 7:00 AM (420m) to 11:30 AM (690m)
  // Afternoon: 11:30 AM (690m) to 4:30 PM (990m)
  // Sunset: 4:30 PM (990m) to 6:30 PM (1110m)
  // Evening: 6:30 PM (1110m) to 10:00 PM (1320m)
  // Midnight: 10:00 PM (1320m) to 5:30 AM (330m)

  if (totalMinutes >= 330 && totalMinutes < 420) {
    // 🌅 Sunrise
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'sunrise',
      iconEmoji: '🌅',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Good Morning',
      statusMessage: 'Sunrise in Studio',
      availabilityText: 'Usually replies within 1–2 hours',
      presenceState: 'available',
      presenceBadgeText: 'Currently Available',
      presenceDotColor: '#10B981',
      accentColor: '#F59E0B',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.22) 0%, rgba(245, 158, 11, 0) 70%)',
      borderColor: 'rgba(245, 158, 11, 0.35)',
    };
  } else if (totalMinutes >= 420 && totalMinutes < 690) {
    // ☀️ Morning
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'morning',
      iconEmoji: '☀️',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Good Morning',
      statusMessage: 'Working Hours',
      availabilityText: 'Usually replies within 1–2 hours',
      presenceState: 'available',
      presenceBadgeText: 'Currently Available',
      presenceDotColor: '#10B981',
      accentColor: '#007AFF',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(0, 122, 255, 0.2) 0%, rgba(0, 122, 255, 0) 70%)',
      borderColor: 'rgba(0, 122, 255, 0.3)',
    };
  } else if (totalMinutes >= 690 && totalMinutes < 990) {
    // 🌤️ Afternoon
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'afternoon',
      iconEmoji: '🌤️',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Good Afternoon',
      statusMessage: 'In Studio & Editing',
      availabilityText: 'Usually replies within 1–2 hours',
      presenceState: 'available',
      presenceBadgeText: 'Currently Available',
      presenceDotColor: '#10B981',
      accentColor: '#3B82F6',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
    };
  } else if (totalMinutes >= 990 && totalMinutes < 1110) {
    // 🌇 Sunset
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'sunset',
      iconEmoji: '🌇',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Golden Hour',
      statusMessage: "Wrapping up today's work",
      availabilityText: 'Usually replies within 2–3 hours',
      presenceState: 'available',
      presenceBadgeText: 'Currently Available',
      presenceDotColor: '#10B981',
      accentColor: '#F97316',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.22) 0%, rgba(249, 115, 22, 0) 70%)',
      borderColor: 'rgba(249, 115, 22, 0.35)',
    };
  } else if (totalMinutes >= 1110 && totalMinutes < 1320) {
    // 🌙 Evening
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'evening',
      iconEmoji: '🌙',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Good Evening',
      statusMessage: 'Evening Studio Session',
      availabilityText: 'Usually replies within 2–4 hours',
      presenceState: 'deep_work',
      presenceBadgeText: 'Deep Work Session',
      presenceDotColor: '#F59E0B',
      accentColor: '#6366F1',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%)',
      borderColor: 'rgba(99, 102, 241, 0.38)',
    };
  } else {
    // 🌌 Midnight / Night
    return {
      timeString: formattedTime12,
      shortTimeString: formattedShort12,
      location,
      periodKey: 'midnight',
      iconEmoji: '🌙',
      periodTitle: 'Studio — Dhaka, Bangladesh',
      headline: 'Late Night Creative Session',
      statusMessage: 'Quiet Hours in Studio',
      availabilityText: 'Responses may be slower until morning.',
      presenceState: 'offline',
      presenceBadgeText: 'Studio Offline',
      presenceDotColor: '#818CF8',
      accentColor: '#818CF8',
      glowGradient: 'radial-gradient(circle at 50% 0%, rgba(129, 140, 248, 0.25) 0%, rgba(129, 140, 248, 0) 70%)',
      borderColor: 'rgba(129, 140, 248, 0.35)',
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
