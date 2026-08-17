'use client';

// components/invitation/LoveStory.tsx
// Timeline kisah cinta — scroll-triggered dengan Motion

import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { InvitationData, StoryItem } from '@/types/invitation';

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #5C0A0A 0%, #C9A84C 100%)',
  'linear-gradient(135deg, #7A5714 0%, #8B1A1A 100%)',
  'linear-gradient(135deg, #3D2B1F 0%, #C9A84C 100%)',
  'linear-gradient(135deg, #8B1A1A 0%, #4A0808 100%)',
];

function TimelineItem({ item, index }: { item: StoryItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.li
      className="relative pl-10 pb-12 last:pb-0"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Titik timeline */}
      <motion.div
        className="absolute left-[10px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-gold z-10"
        style={{ background: '#8B1A1A' }}
        whileInView={{ scale: [1, 1.3, 1.1], backgroundColor: ['#8B1A1A', '#C9A84C', '#C9A84C'] }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold mb-1">
        {item.year}
      </p>
      <h3 className="font-heading font-medium text-maroon text-[1.3rem] mb-2">
        {item.title}
      </h3>

      {/* Foto */}
      <motion.div
        className="w-full h-48 rounded-xl overflow-hidden relative mb-3"
        style={{ background: PLACEHOLDER_GRADIENTS[index % 4] }}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="absolute inset-0 flex items-center justify-center font-heading text-2xl italic opacity-40 text-ivory" aria-hidden="true">
          {item.year}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.photo}
          alt={`${item.title} - ${item.year}`}
          className="absolute inset-0 w-full h-full object-cover z-10"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </motion.div>

      <p className="text-[0.82rem] font-light text-text-medium leading-relaxed">
        {item.description}
      </p>
    </motion.li>
  );
}

export function LoveStory({ data }: { data: InvitationData }) {
  const { loveStory } = data;

  return (
    <section
      id="story"
      className="bg-ivory py-20 px-6"
      aria-label="Kisah cinta"
    >
      <div className="max-w-2xl mx-auto">
        <SectionHeading eyebrow="Our Story" title="Perjalanan Cinta Kami" />

        <div className="relative">
          {/* Garis vertikal timeline */}
          <div
            className="timeline-line absolute left-[17px] top-0 bottom-0 w-px"
            aria-hidden="true"
          />

          <ol className="relative pl-2" aria-label="Timeline kisah cinta">
            {loveStory.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
