import React, { useState, useEffect } from 'react';

export const WeatherStatus: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading...' });

  useEffect(() => {
    // ঢাকা/ময়মনসিংহের অক্ষাংশ ও দ্রাঘিমাংশ (Latitude & Longitude)
    const lat = 24.7471; // Mymensingh / Dhaka Latitude
    const lon = 90.4203; // Longitude

    // ফ্রি Open-Meteo API থেকে ডেটা ফেচ করা (কোনো API Key লাগবে না)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          const code = data.current_weather.weathercode;
          
          // ওয়েদার কোড অনুযায়ী টেক্সট সেট করা
          let condition = 'Clear Sky';
          if (code >= 1 && code <= 3) condition = 'Partly Cloudy';
          else if (code >= 45 && code <= 48) condition = 'Foggy';
          else if (code >= 51 && code <= 67) condition = 'Rainy';
          else if (code >= 80 && code <= 82) condition = 'Showers';

          setWeather({ temp: `${temp}°C`, condition });
        } else {
          setWeather({ temp: '28°C', condition: 'Clear Sky' });
        }
      })
      .catch(() => setWeather({ temp: '28°C', condition: 'Clear Sky' }));
  }, []);

  return (
    <div className={`weather-badge inline-flex items-center gap-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md px-3.5 py-1 rounded-full text-xs text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-800 shadow-xs transition-all duration-300 ${className}`}>
      <span className="text-sm select-none">🌤️</span>
      <span className="font-medium tracking-tight">{weather.condition}</span>
      <span className="opacity-40">•</span>
      <span className="font-bold font-mono">{weather.temp}</span>
    </div>
  );
};

export default WeatherStatus;
