'use client';

// components/ui/SectionHeading.tsx
// Eyebrow label + section title dengan animasi reveal

import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  light?: boolean;  // mode teks terang untuk section gelap
  className?: string;
};

export function SectionHeading({ eyebrow, title, light = false, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <Reveal>
        <p
          className={`text-[0.7rem] font-medium tracking-[0.25em] uppercase mb-3 ${
            light ? 'text-gold-light' : 'text-gold'
          }`}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={`font-heading text-[clamp(1.8rem,5vw,2.6rem)] font-light leading-tight mb-10 ${
            light ? 'text-gold-pale' : 'text-maroon'
          }`}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
