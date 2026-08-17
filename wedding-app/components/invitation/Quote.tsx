'use client';

// components/invitation/Quote.tsx
// Quote / Ayat section

import { Reveal } from '@/components/ui/Reveal';
import { LotusOrnament } from '@/components/ui/OrnamentDivider';
import type { InvitationData } from '@/types/invitation';

type QuoteProps = { data: InvitationData };

export function Quote({ data }: QuoteProps) {
  const { quote } = data;

  return (
    <section
      id="quote"
      className="relative py-20 px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #4A0808 0%, #8B1A1A 100%)' }}
      aria-label="Ayat suci"
    >
      {/* Pattern overlay */}
      <div className="quote-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-lg mx-auto">
        <Reveal>
          <LotusOrnament className="mb-4" />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="font-heading text-gold opacity-30 leading-none mb-3 select-none"
            style={{ fontSize: '5rem', lineHeight: 0.5 }}
            aria-hidden="true"
          >
            &ldquo;
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <blockquote
            className="font-heading font-light italic text-gold-pale leading-[1.8] mb-5"
            style={{ fontSize: 'clamp(1rem, 3.5vw, 1.3rem)' }}
          >
            {quote.text}
          </blockquote>
        </Reveal>

        <Reveal delay={0.3}>
          <cite className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-gold not-italic">
            {quote.source}
          </cite>
        </Reveal>
      </div>
    </section>
  );
}
