'use client';

// components/invitation/EventSection.tsx
// Kartu Akad Nikah & Resepsi — theme-aware.
// jawa:   heavy card dengan icon circle + gradient
// floral: editorial layout dengan botanical sprig antara event
// none:   clean text layout dengan thin divider

import { Calendar, Clock, MapPin } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FloralDivider } from '@/components/ui/FloralDivider';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData, WeddingEvent } from '@/types/invitation';

// ── Jawa: Full EventCard ──────────────────────────────────
function EventCard({
  event,
  venue,
  direction,
  icon,
}: {
  event: WeddingEvent;
  venue: InvitationData['venue'];
  direction: 'left' | 'right';
  icon: React.ReactNode;
}) {
  const { colors } = useTheme();

  return (
    <Reveal direction={direction}>
      <article
        className="rounded-2xl p-8 text-center border shadow-lg flex flex-col items-center gap-3"
        style={{ borderColor: colors.border, background: colors.bg }}
        aria-label={event.title}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            color: colors.accentPale,
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3 className="font-heading font-medium text-2xl" style={{ color: colors.primary }}>
          {event.title}
        </h3>
        <div
          className="w-10 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}
          aria-hidden="true"
        />
        <div className="flex items-center gap-2 text-[0.78rem]" style={{ color: colors.textMuted }}>
          <Calendar size={14} className="shrink-0" style={{ color: colors.accent }} aria-hidden="true" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 font-heading text-lg" style={{ color: colors.primary }}>
          <Clock size={15} className="shrink-0" style={{ color: colors.accent }} aria-hidden="true" />
          <span>{event.time}</span>
        </div>
        <div className="flex flex-col items-center text-center mt-1">
          <div className="flex items-start gap-2">
            <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: colors.accent }} aria-hidden="true" />
            <div>
              <p className="text-[0.8rem] font-medium" style={{ color: colors.text }}>{venue.name}</p>
              <p className="text-[0.72rem] font-light leading-relaxed mt-0.5" style={{ color: colors.textLight }}>
                {venue.address}, {venue.city}
              </p>
            </div>
          </div>
        </div>
        <a
          href="#maps"
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[0.78rem] font-light transition-all duration-200 hover:-translate-y-0.5"
          style={{ borderColor: colors.accent, color: colors.primary }}
          aria-label={`Lihat lokasi ${event.title}`}
        >
          Lihat Lokasi
        </a>
      </article>
    </Reveal>
  );
}

// ── Minimalist / Floral: Editorial text item ──────────────
function EditorialEventItem({
  event,
  index,
  showVenue = false,
}: {
  event: WeddingEvent;
  index: number;
  showVenue?: boolean;
}) {
  const { colors, decoration } = useTheme();
  const isFloral = decoration.style === 'floral';

  return (
    <Reveal delay={index * 0.15}>
      <div className="text-center py-10">
        <p
          className="text-[0.62rem] font-medium tracking-[0.35em] uppercase mb-4"
          style={{ color: colors.accent }}
        >
          {event.title}
        </p>
        <p
          className="font-heading font-light tracking-widest mb-2"
          style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', color: colors.primary }}
        >
          {event.date}
        </p>
        <p
          className="text-[0.9rem] tracking-[0.12em]"
          style={{ color: colors.textMuted }}
        >
          {event.time}
        </p>
        {/* Floral: show WITA label */}
        {isFloral && (
          <p
            className="text-[0.65rem] font-light tracking-[0.15em] mt-1 opacity-60"
            style={{ color: colors.textMuted }}
          >
            WITA
          </p>
        )}
      </div>
    </Reveal>
  );
}

// ── Main EventSection ─────────────────────────────────────
export function EventSection({ data }: { data: InvitationData }) {
  const { akad, resepsi, venue } = data;
  const theme = useTheme();
  const { decoration, backgrounds, colors } = theme;
  const isJawa   = decoration.style === 'jawa';
  const isFloral = decoration.style === 'floral';

  return (
    <section
      id="acara"
      className="py-20 px-6"
      style={{ background: backgrounds.events }}
      aria-label="Acara pernikahan"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Acara" title="Rangkaian Acara" />

        {isJawa ? (
          /* Jawa: card layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <EventCard
              event={akad}
              venue={venue}
              direction="left"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              }
            />
            <EventCard
              event={resepsi}
              venue={venue}
              direction="right"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              }
            />
          </div>
        ) : (
          /* Minimalist / Floral: editorial text layout */
          <div className="max-w-sm mx-auto">
            <EditorialEventItem event={akad} index={0} />
            {/* Separator between events */}
            {isFloral ? (
              <FloralDivider variant="horizontal" width={160} opacity={0.6} className="mx-auto" />
            ) : (
              <div
                className="mx-auto"
                style={{ width: 60, height: '1px', background: colors.border }}
                aria-hidden="true"
              />
            )}
            <EditorialEventItem event={resepsi} index={1} />
          </div>
        )}
      </div>
    </section>
  );
}
