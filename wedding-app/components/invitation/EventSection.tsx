'use client';

// components/invitation/EventSection.tsx
// Kartu Akad Nikah & Resepsi

import { Calendar, Clock, MapPin } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { InvitationData, WeddingEvent } from '@/types/invitation';

type EventCardProps = {
  event: WeddingEvent;
  venue: InvitationData['venue'];
  direction: 'left' | 'right';
  icon: React.ReactNode;
};

function EventCard({ event, venue, direction, icon }: EventCardProps) {
  return (
    <Reveal direction={direction}>
      <article
        className="bg-cream rounded-2xl p-8 text-center border shadow-lg flex flex-col items-center gap-3"
        style={{ borderColor: 'rgba(201,168,76,0.2)' }}
        aria-label={event.title}
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-gold-light"
          style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #4A0808 100%)' }}
          aria-hidden="true"
        >
          {icon}
        </div>

        <h3 className="font-heading font-medium text-maroon text-2xl">{event.title}</h3>

        {/* Garis dekoratif */}
        <div className="w-10 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} aria-hidden="true" />

        <div className="flex items-center gap-2 text-text-medium text-[0.78rem]">
          <Calendar size={14} className="text-gold shrink-0" aria-hidden="true" />
          <span>{event.date}</span>
        </div>

        <div className="flex items-center gap-2 font-heading text-maroon text-lg">
          <Clock size={15} className="text-gold shrink-0" aria-hidden="true" />
          <span>{event.time}</span>
        </div>

        <div className="flex flex-col items-center text-center mt-1">
          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-[0.8rem] font-medium text-text-dark">{venue.name}</p>
              <p className="text-[0.72rem] font-light text-text-light leading-relaxed mt-0.5">{venue.address}, {venue.city}</p>
            </div>
          </div>
        </div>

        <a
          href="#maps"
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-maroon text-[0.78rem] font-light transition-all duration-200 hover:bg-gold hover:text-maroon-dark hover:-translate-y-0.5"
          style={{ borderColor: '#C9A84C' }}
          aria-label={`Lihat lokasi ${event.title}`}
        >
          Lihat Lokasi
        </a>
      </article>
    </Reveal>
  );
}

export function EventSection({ data }: { data: InvitationData }) {
  const { akad, resepsi, venue } = data;

  return (
    <section
      id="acara"
      className="bg-ivory py-20 px-6"
      aria-label="Acara pernikahan"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Acara" title="Rangkaian Acara" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EventCard
            event={akad}
            venue={venue}
            direction="left"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
          />
          <EventCard
            event={resepsi}
            venue={venue}
            direction="right"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>}
          />
        </div>
      </div>
    </section>
  );
}
