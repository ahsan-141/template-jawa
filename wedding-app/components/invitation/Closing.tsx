'use client';

// components/invitation/Closing.tsx
// Footer / Closing section — theme-aware.
// jawa:   OrnamentDivider + gold text on dark
// floral: FloralDivider + botanical corners + rose accent on dark
// none:   MinimalistDivider + light text on dark

import { OrnamentDivider } from '@/components/ui/OrnamentDivider';
import { MinimalistDivider } from '@/components/ui/MinimalistDivider';
import { FloralDivider } from '@/components/ui/FloralDivider';
import { FloralCorner } from '@/components/ui/FloralCorner';
import { Reveal } from '@/components/ui/Reveal';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData } from '@/types/invitation';

export function Closing({ data }: { data: InvitationData }) {
  const { groom, bride, wedding } = data;
  const theme = useTheme();
  const { backgrounds, colors, decoration } = theme;
  const isJawa   = decoration.style === 'jawa';
  const isFloral = decoration.style === 'floral';

  return (
    <footer
      className="relative py-16 px-6 text-center flex flex-col items-center gap-3 overflow-hidden"
      style={{ background: backgrounds.closing }}
      aria-label="Penutup undangan"
    >
      {/* Floral: corner botanicals on closing */}
      {isFloral && (
        <>
          <FloralCorner position="tl" size={80} opacity={0.25} />
          <FloralCorner position="tr" size={80} opacity={0.2} />
          <FloralCorner position="br" size={70} opacity={0.18} />
        </>
      )}

      <Reveal>
        {isJawa ? (
          <OrnamentDivider width={200} className="mb-2" />
        ) : isFloral ? (
          <FloralDivider variant="sprig" className="mb-4" opacity={0.5} />
        ) : (
          <MinimalistDivider width={100} className="mb-4" opacity={0.25} />
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <p
          className="font-heading font-light italic"
          style={{
            fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
            color: colors.textOnDark,
          }}
        >
          {groom.nickname} &amp; {bride.nickname}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <p
          className="text-[0.7rem] font-light tracking-[0.25em] uppercase"
          style={{ color: colors.accentOnDark, opacity: 0.8 }}
        >
          {wedding.date}
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <p
          className="font-heading italic opacity-50 text-[0.95rem]"
          style={{ color: colors.textOnDark }}
        >
          Dengan Cinta &amp; Kebahagiaan
        </p>
      </Reveal>

      {/* Theme label */}
      <p
        className="text-[0.65rem] tracking-[0.05em] mt-4 opacity-20 relative z-10"
        style={{ color: colors.textOnDark }}
      >
        {isJawa ? 'Jawa Merah + Gold' : isFloral ? 'Floral Elegant' : 'Minimalist'} Template
      </p>
    </footer>
  );
}
