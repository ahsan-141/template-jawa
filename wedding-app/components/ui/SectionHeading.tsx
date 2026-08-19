'use client';

// components/ui/SectionHeading.tsx
// Eyebrow label + section title dengan animasi reveal
// Membaca warna dari ThemeContext — agnostic terhadap semua tema.

import { Reveal } from './Reveal';
import { useTheme } from '@/contexts/ThemeContext';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** light = true untuk section dengan background gelap */
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  light = false,
  className = '',
}: SectionHeadingProps) {
  const { colors } = useTheme();

  return (
    <div className={`text-center ${className}`}>
      <Reveal>
        <p
          className="text-[0.7rem] font-medium tracking-[0.25em] uppercase mb-3"
          style={{ color: light ? colors.accentOnDark : colors.accent }}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className="font-heading text-[clamp(1.8rem,5vw,2.6rem)] font-light leading-tight mb-10"
          style={{ color: light ? colors.textOnDark : colors.primary }}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
