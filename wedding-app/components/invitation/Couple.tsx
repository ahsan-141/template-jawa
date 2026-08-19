'use client';

// components/invitation/Couple.tsx
// Profil mempelai — theme-aware.
// jawa:   circle photo, gold border, corner L-ornament, diamond SVG separator
// floral: rectangle portrait, rose border, botanical corner, FloralDivider separator
// none:   rectangle portrait, clean border, thin line separator

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FloralCorner } from '@/components/ui/FloralCorner';
import { FloralDivider } from '@/components/ui/FloralDivider';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData, Person } from '@/types/invitation';

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ── PersonCard ────────────────────────────────────────────
function PersonCard({
  person,
  role,
  initials,
  direction,
}: {
  person: Person;
  role: string;
  initials: string;
  direction: 'left' | 'right';
}) {
  const theme = useTheme();
  const { colors, decoration, couplePhoto } = theme;
  const isJawa   = decoration.style === 'jawa';
  const isFloral = decoration.style === 'floral';
  const isCircle = couplePhoto.shape === 'circle';

  // Placeholder gradient based on direction + theme
  const placeholderGradient = isJawa
    ? direction === 'left'
      ? 'linear-gradient(135deg, #8B1A1A 0%, #4A0808 100%)'
      : 'linear-gradient(135deg, #5C3D2E 0%, #8B1A1A 100%)'
    : isFloral
    ? direction === 'left'
      ? 'linear-gradient(135deg, #F0E6E8 0%, #DBBFC4 100%)'
      : 'linear-gradient(135deg, #D4E0CF 0%, #C9A6AC 100%)'
    : direction === 'left'
    ? 'linear-gradient(135deg, #E8E7E3 0%, #D8D7D3 100%)'
    : 'linear-gradient(135deg, #D8D7D3 0%, #E8E7E3 100%)';

  return (
    <Reveal direction={direction}>
      <article
        className="rounded-2xl p-7 text-center shadow-sm border relative overflow-hidden"
        style={{
          borderColor: colors.border,
          background: colors.bgAlt,
        }}
        aria-label={`Profil ${role}`}
      >
        {/* Jawa: corner L-marks */}
        {isJawa && (
          <div className="absolute top-3 left-3 w-12 h-12 pointer-events-none" aria-hidden="true">
            <span className="absolute top-0 left-0 block w-7 h-0.5 opacity-40" style={{ background: colors.accent }} />
            <span className="absolute top-0 left-0 block w-0.5 h-7 opacity-40" style={{ background: colors.accent }} />
          </div>
        )}

        {/* Floral: tiny botanical corner */}
        {isFloral && (
          <FloralCorner position="tl" size={52} opacity={0.28} />
        )}

        {/* Photo */}
        <div className="flex justify-center mb-5">
          <div
            className="relative overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
            style={{
              width: isCircle ? 128 : 110,
              height: isCircle ? 128 : 155,
              borderRadius: isCircle ? '50%' : isFloral ? '8px' : '6px',
              border: `${couplePhoto.borderWidth}px solid ${couplePhoto.borderColor}`,
              background: placeholderGradient,
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center font-heading text-3xl font-light opacity-60 z-0"
              style={{
                color: isJawa ? colors.accentPale : isFloral ? '#8F6670' : colors.textLight,
              }}
              aria-hidden="true"
            >
              {initials}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.photo}
              alt={`Foto ${person.name}`}
              className="absolute inset-0 w-full h-full object-cover z-10"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Role label */}
        <p
          className="text-[0.65rem] font-medium tracking-[0.2em] uppercase mb-1"
          style={{ color: colors.accent }}
        >
          {role}
        </p>

        {/* Name */}
        <h3
          className="font-heading font-medium mb-3"
          style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', color: colors.primary }}
        >
          {person.name}
        </h3>

        {/* Parents */}
        <p
          className="text-[0.75rem] font-light leading-relaxed mb-4 whitespace-pre-line"
          style={{ color: colors.textMuted }}
        >
          {person.parents}
        </p>

        {/* Instagram */}
        {person.instagramUrl && (
          <a
            href={person.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.72rem] rounded-full px-3.5 py-1.5 transition-all duration-200 border"
            style={{ color: colors.primary, borderColor: colors.border }}
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

// ── Couple Separator ──────────────────────────────────────
function CoupleSeparator() {
  const { colors, decoration } = useTheme();
  const isJawa   = decoration.style === 'jawa';
  const isFloral = decoration.style === 'floral';

  if (isJawa) {
    return (
      <div className="flex items-center justify-center pt-16" aria-hidden="true">
        <svg viewBox="0 0 40 120" xmlns="http://www.w3.org/2000/svg" width="40" height="120">
          <line x1="20" y1="0" x2="20" y2="45" stroke={colors.accent} strokeWidth="0.8" opacity="0.5" />
          <path d="M10 60 L20 50 L30 60 L20 70 Z" fill={colors.accent} opacity="0.7" />
          <circle cx="20" cy="60" r="3" fill={colors.accent} />
          <line x1="20" y1="75" x2="20" y2="120" stroke={colors.accent} strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>
    );
  }

  if (isFloral) {
    return (
      <div className="flex items-center justify-center pt-16" aria-hidden="true">
        <FloralDivider variant="sprig" opacity={0.6} />
      </div>
    );
  }

  // Minimalist: thin vertical line
  return (
    <div className="flex items-center justify-center pt-16" aria-hidden="true">
      <div style={{ width: '1px', height: 80, background: colors.border }} />
    </div>
  );
}

// ── Main Couple Section ───────────────────────────────────
export function Couple({ data }: { data: InvitationData }) {
  const { groom, bride } = data;
  const { backgrounds } = useTheme();

  return (
    <section
      id="mempelai"
      className="py-20 px-6"
      style={{ background: backgrounds.couple }}
      aria-label="Profil mempelai"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Mempelai" title="Dua Insan Bersatu" />

        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
          <PersonCard person={groom} role="Mempelai Pria" initials="YP" direction="left" />
          <CoupleSeparator />
          <PersonCard person={bride} role="Mempelai Wanita" initials="RS" direction="right" />
        </div>
      </div>
    </section>
  );
}
