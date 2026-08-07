import React from 'react';
import { motion } from 'motion/react';

interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  as?: 'section' | 'div' | 'article' | 'footer' | 'header' | 'main';
  style?: React.CSSProperties;
}

/**
 * Apple-style Framer Motion entrance reveal component.
 * Gently fades and slides sections upward as they enter the viewport,
 * following Apple's signature smooth motion design language.
 */
export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  as = 'section',
  style,
}) => {
  const Component = motion[as] || motion.section;

  return (
    <Component
      id={id}
      className={`${className} motion-blur-entrance`}
      style={style}
      initial={{ opacity: 0, y: 36, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.01, margin: '100px 0px 100px 0px' }}
      transition={{
        duration: 0.9,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Apple's signature custom exponential ease out
      }}
    >
      {children}
    </Component>
  );
};
