'use client';

// components/invitation/Wishes.tsx
// Kartu ucapan & doa — theme-aware.
// Floral: FloralDivider di section header

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FloralDivider } from '@/components/ui/FloralDivider';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData, WishItem } from '@/types/invitation';

function WishCard({ wish, delay }: { wish: WishItem; delay: number }) {
  const { colors } = useTheme();

  return (
    <Reveal delay={delay}>
      <li
        className="rounded-xl p-5 border shadow-sm"
        style={{
          borderColor: colors.border,
          background: colors.bgAlt,
        }}
      >
        <p className="font-heading font-medium text-lg mb-2" style={{ color: colors.primary }}>
          {wish.name}
        </p>
        <p
          className="text-[0.82rem] font-light leading-relaxed italic"
          style={{ color: colors.textMuted }}
        >
          &ldquo;{wish.message}&rdquo;
        </p>
      </li>
    </Reveal>
  );
}

export function Wishes({ data }: { data: InvitationData }) {
  const { wishes } = data;
  const { backgrounds, decoration } = useTheme();
  const isFloral = decoration.style === 'floral';

  return (
    <section
      id="ucapan"
      className="py-20 px-6"
      style={{ background: backgrounds.wishes }}
      aria-label="Ucapan dan doa"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Ucapan" title="Doa & Ucapan" />

        {/* Floral: botanical divider setelah heading */}
        {isFloral && (
          <Reveal>
            <FloralDivider className="mb-8 -mt-6" width={120} opacity={0.5} />
          </Reveal>
        )}

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Daftar ucapan tamu"
        >
          {wishes.map((wish, i) => (
            <WishCard key={i} wish={wish} delay={i * 0.06} />
          ))}
        </ul>
      </div>
    </section>
  );
}
