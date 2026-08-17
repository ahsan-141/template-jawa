'use client';

// components/invitation/LocationSection.tsx
// Peta lokasi + tombol Google Maps

import { MapPin, ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { InvitationData } from '@/types/invitation';

export function LocationSection({ data }: { data: InvitationData }) {
  const { venue } = data;

  return (
    <section
      id="maps"
      className="bg-cream py-20 px-6 text-center"
      aria-label="Lokasi acara"
    >
      <div className="max-w-2xl mx-auto">
        <SectionHeading eyebrow="Lokasi" title="Petunjuk Lokasi" />

        {/* Info venue */}
        <Reveal delay={0.1}>
          <div
            className="flex items-start gap-3 bg-ivory rounded-xl p-4 mb-5 text-left border"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}
          >
            <MapPin className="text-maroon shrink-0 mt-0.5" size={20} aria-hidden="true" />
            <div>
              <p className="text-[0.85rem] font-medium text-maroon mb-1">{venue.name}</p>
              <p className="text-[0.75rem] font-light text-text-medium leading-relaxed">
                {venue.address}, {venue.city}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Maps embed */}
        <Reveal delay={0.2}>
          <div
            className="rounded-xl overflow-hidden border-2 mb-5 shadow-lg"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}
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

        {/* Tombol buka Maps */}
        <Reveal delay={0.3}>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body text-[0.8rem] font-light tracking-wide text-gold-light shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #4A0808 100%)' }}
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
