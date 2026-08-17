'use client';

// components/invitation/Closing.tsx
// Footer / Closing section

import { OrnamentDivider } from '@/components/ui/OrnamentDivider';
import { Reveal } from '@/components/ui/Reveal';
import type { InvitationData } from '@/types/invitation';

export function Closing({ data }: { data: InvitationData }) {
  const { groom, bride, wedding } = data;

  return (
    <footer
      className="py-16 px-6 text-center flex flex-col items-center gap-3"
      style={{ background: 'linear-gradient(160deg, #4A0808 0%, #2C1810 100%)' }}
      aria-label="Penutup undangan"
    >
      <Reveal>
        <OrnamentDivider width={200} className="mb-2" />
      </Reveal>

      <Reveal delay={0.1}>
        <p
          className="font-heading font-light italic text-gold-pale"
          style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)' }}
        >
          {groom.nickname} &amp; {bride.nickname}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-[0.7rem] font-light tracking-[0.25em] uppercase text-gold opacity-80">
          {wedding.date}
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="font-heading italic opacity-50 text-[0.95rem]" style={{ color: '#F5E6B8' }}>
          Dengan Cinta &amp; Kebahagiaan
        </p>
      </Reveal>

      <p className="text-[0.65rem] tracking-[0.05em] mt-4 opacity-20 text-gold-pale">
        Jawa Merah + Gold Template
      </p>
    </footer>
  );
}
