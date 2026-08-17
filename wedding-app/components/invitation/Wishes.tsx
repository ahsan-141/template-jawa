'use client';

// components/invitation/Wishes.tsx
// Kartu ucapan & doa tamu

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { InvitationData, WishItem } from '@/types/invitation';

function WishCard({ wish, delay }: { wish: WishItem; delay: number }) {
  return (
    <Reveal delay={delay}>
      <li
        className="bg-ivory rounded-xl p-5 border shadow-sm"
        style={{ borderColor: 'rgba(201,168,76,0.15)' }}
      >
        <p className="font-heading text-maroon font-medium text-lg mb-2">{wish.name}</p>
        <p className="text-[0.82rem] font-light text-text-medium leading-relaxed italic">
          &ldquo;{wish.message}&rdquo;
        </p>
      </li>
    </Reveal>
  );
}

export function Wishes({ data }: { data: InvitationData }) {
  const { wishes } = data;

  return (
    <section
      id="ucapan"
      className="bg-cream py-20 px-6"
      aria-label="Ucapan dan doa"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Ucapan" title="Doa & Ucapan" />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Daftar ucapan tamu">
          {wishes.map((wish, i) => (
            <WishCard key={i} wish={wish} delay={i * 0.06} />
          ))}
        </ul>
      </div>
    </section>
  );
}
