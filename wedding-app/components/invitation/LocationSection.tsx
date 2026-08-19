'use client';

// components/invitation/LocationSection.tsx
// Peta lokasi + tombol Google Maps — theme-aware.

import { MapPin, ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData } from '@/types/invitation';

export function LocationSection({ data }: { data: InvitationData }) {
  const { venue } = data;
  const theme = useTheme();
  const { backgrounds, colors, decoration } = theme;

  return (
    <section
      id="maps"
      className="py-20 px-6 text-center"
      style={{ background: backgrounds.hero }} // location shares hero bg (both "alt" sections)
      aria-label="Lokasi acara"
    >
      <div className="max-w-2xl mx-auto">
        <SectionHeading eyebrow="Lokasi" title="Petunjuk Lokasi" />

        {/* Venue info card */}
        <Reveal delay={0.1}>
          <div
            className="flex items-start gap-3 rounded-xl p-4 mb-5 text-left border"
            style={{ borderColor: colors.border, background: colors.bgAlt }}
          >
            <MapPin
              className="shrink-0 mt-0.5"
              size={20}
              style={{ color: colors.primary }}
              aria-hidden="true"
            />
            <div>
              <p className="text-[0.85rem] font-medium mb-1" style={{ color: colors.primary }}>
                {venue.name}
              </p>
              <p
                className="text-[0.75rem] font-light leading-relaxed"
                style={{ color: colors.textMuted }}
              >
                {venue.address}, {venue.city}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Google Maps embed */}
        <Reveal delay={0.2}>
          <div
            className="rounded-xl overflow-hidden border-2 mb-5 shadow-lg"
            style={{ borderColor: colors.border }}
          >
            <iframe
              title="Lokasi Gedung Pernikahan"
              src={venue.mapsEmbedSrc}
              className="w-full border-0 block"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>

        {/* Open Maps button */}
        <Reveal delay={0.3}>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[0.8rem] font-light tracking-wide shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: decoration.enabled
                ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                : colors.primary,
              color: decoration.enabled ? colors.accentPale : colors.bgAlt,
            }}
            aria-label="Buka Google Maps"
          >
            <MapPin size={16} aria-hidden="true" />
            Buka Google Maps
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
