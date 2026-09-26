import React, { useState } from 'react';

interface AboutSectionProps {
  theme?: 'light' | 'dark';
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const [imageSrc, setImageSrc] = useState('https://drive.google.com/uc?export=view&id=152qRCxzC0hKJJfmFosct5OeJ6u5bCfCh');

  return (
    <section 
      id="about" 
      className="w-full min-h-screen bg-white flex items-center justify-center p-0 m-0 overflow-hidden" 
      style={{ backgroundColor: '#ffffff' }}
    >
      <img 
        src={imageSrc} 
        alt="About" 
        className="w-full h-full min-h-screen object-contain"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => {
          if (!imageSrc.includes('lh3.googleusercontent.com')) {
            setImageSrc('https://lh3.googleusercontent.com/d/152qRCxzC0hKJJfmFosct5OeJ6u5bCfCh');
          }
        }}
      />
    </section>
  );
};

export default AboutSection;
