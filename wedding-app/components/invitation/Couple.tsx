'use client';

// components/invitation/Couple.tsx
// Profil mempelai — dua kartu dengan foto placeholder elegan

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { InvitationData, Person } from '@/types/invitation';

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

type CoupleProps = { data: InvitationData };

// ── Card mempelai tunggal ──────────────────────────────────
function PersonCard({ person, role, initials, direction }: {
  person: Person;
  role: string;
  initials: string;
  direction: 'left' | 'right';
}) {
  return (
    <Reveal direction={direction}>
      <article
        className="bg-ivory rounded-2xl p-7 text-center shadow-lg border relative overflow-hidden"
        style={{ borderColor: 'rgba(201,168,76,0.15)' }}
        aria-label={`Profil ${role}`}
      >
        {/* Corner ornament kiri atas */}
        <div className="absolute top-3 left-3 w-12 h-12 pointer-events-none" aria-hidden="true">
          <span className="absolute top-0 left-0 block w-7 h-0.5 bg-gold opacity-40" />
          <span className="absolute top-0 left-0 block w-0.5 h-7 bg-gold opacity-40" />
        </div>

        {/* Foto */}
        <div className="flex justify-center mb-5">
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold shadow-lg transition-transform duration-300 hover:scale-[1.04]"
            style={{ background: direction === 'left'
              ? 'linear-gradient(135deg, #8B1A1A 0%, #4A0808 100%)'
              : 'linear-gradient(135deg, #5C3D2E 0%, #8B1A1A 100%)'
            }}
          >
            {/* Placeholder inisial */}
            <div className="absolute inset-0 flex items-center justify-center font-heading text-3xl font-light text-gold-pale opacity-70 z-0" aria-hidden="true">
              {initials}
            </div>
            {/* Foto asli — tampil di atas placeholder jika ada */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.photo}
              alt={`Foto ${person.name}`}
              className="absolute inset-0 w-full h-full object-cover z-10"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>

        {/* Info */}
        <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-1">
          {role}
        </p>
        <h3 className="font-heading text-maroon font-medium mb-3" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}>
          {person.name}
        </h3>
        <p className="text-[0.75rem] font-light text-text-medium leading-relaxed mb-4 whitespace-pre-line">
          {person.parents}
        </p>

        {person.instagramUrl && (
          <a
            href={person.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.72rem] text-maroon border rounded-full px-3.5 py-1.5 transition-all duration-200 hover:bg-maroon hover:text-gold-light hover:border-maroon"
            style={{ borderColor: 'rgba(139,26,26,0.2)' }}
            aria-label={`Instagram ${person.name}`}
          >
            <InstagramIcon size={14} />
            <span>{person.instagram}</span>
          </a>
        )}
      </article>
    </Reveal>
  );
}

// ── Separator tengah ──────────────────────────────────────
function CoupleSeparator() {
  return (
    <div className="flex items-center justify-center pt-16" aria-hidden="true">
      <svg viewBox="0 0 40 120" xmlns="http://www.w3.org/2000/svg" width="40" height="120">
        <line x1="20" y1="0" x2="20" y2="45" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
        <path d="M10 60 L20 50 L30 60 L20 70 Z" fill="#C9A84C" opacity="0.7" />
        <circle cx="20" cy="60" r="3" fill="#C9A84C" />
        <line x1="20" y1="75" x2="20" y2="120" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
      </svg>
    </div>
  );
}

export function Couple({ data }: CoupleProps) {
  const { groom, bride } = data;

  return (
    <section
      id="mempelai"
      className="bg-cream py-20 px-6"
      aria-label="Profil mempelai"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Mempelai" title="Dua Insan Bersatu" />

        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
          <PersonCard
            person={groom}
            role="Mempelai Pria"
            initials="YP"
            direction="left"
          />
          <CoupleSeparator />
          <PersonCard
            person={bride}
            role="Mempelai Wanita"
            initials="RS"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
}
