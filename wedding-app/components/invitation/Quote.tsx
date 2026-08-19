'use client';

// components/invitation/Quote.tsx
// Quote / Ayat section — theme-aware.
// jawa:   lotus ornament + large quote mark
// floral: FloralDivider.sprig + soft styling
// none:   thin line dividers

import { Reveal } from '@/components/ui/Reveal';
import { LotusOrnament } from '@/components/ui/OrnamentDivider';
import { MinimalistDivider } from '@/components/ui/MinimalistDivider';
import { FloralDivider } from '@/components/ui/FloralDivider';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData } from '@/types/invitation';

export function Quote({ data }: { data: InvitationData }) {
  const { quote } = data;
  const theme = useTheme();
  const { decoration, backgrounds, colors } = theme;
  const isJawa   = decoration.style === 'jawa';
  const isFloral = decoration.style === 'floral';

  return (
    <section
      id="quote"
      className="relative py-20 px-6 text-center overflow-hidden"
      style={{ background: backgrounds.quote }}
      aria-label="Ayat suci"
    >
      {/* Decorative pattern — Jawa Merah only */}
      {isJawa && (
        <div
          className="quote-pattern absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Top ornament / divider */}
        <Reveal>
          {isJawa ? (
            <LotusOrnament className="mb-4" />
          ) : isFloral ? (
            <FloralDivider variant="sprig" className="mb-6" opacity={0.65} />
          ) : (
            <MinimalistDivider className="mb-10" width={60} opacity={0.3} />
          )}
        </Reveal>

        {/* Large quote mark — Jawa Merah only */}
        {isJawa && (
          <Reveal delay={0.1}>
            <div
              className="font-heading opacity-30 leading-none mb-3 select-none"
              style={{ fontSize: '5rem', lineHeight: 0.5, color: colors.accentOnDark }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
          </Reveal>
        )}

        {/* Floral: small open quote mark, more subtle */}
        {isFloral && (
          <Reveal delay={0.1}>
            <div
              className="font-heading opacity-20 leading-none mb-2 select-none"
              style={{ fontSize: '4rem', lineHeight: 0.5, color: colors.accentOnDark }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <blockquote
            className="font-heading font-light italic leading-[1.8] mb-5"
            style={{
              fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
              color: colors.textOnDark,
            }}
          >
            {quote.text}
          </blockquote>
        </Reveal>

        <Reveal delay={0.3}>
          <cite
            className="text-[0.7rem] font-medium tracking-[0.2em] uppercase not-italic"
            style={{ color: colors.accentOnDark }}
          >
            {quote.source}
          </cite>
        </Reveal>

        {/* Bottom divider — non-Jawa */}
        {!isJawa && (
          <Reveal delay={0.4}>
            {isFloral ? (
              <FloralDivider variant="sprig" className="mt-8" opacity={0.5} />
            ) : (
              <MinimalistDivider className="mt-10" width={60} opacity={0.3} />
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
