'use client';

// components/invitation/LoveStory.tsx
// Timeline kisah cinta — theme-aware.
// Jawa Merah: gold timeline line, maroon dot.
// Minimalist: gray timeline line, minimal dot.

import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData, StoryItem } from '@/types/invitation';

function TimelineItem({ item, index }: { item: StoryItem; index: number }) {
  const theme = useTheme();
  const { colors, timelineGradients, decoration, animation } = theme;
  const d = (base: number) => base * animation.durationMultiplier;

  return (
    <motion.li
      className="relative pl-10 pb-12 last:pb-0"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: d(0.7), delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-[10px] top-1.5 w-3.5 h-3.5 rounded-full border-2 z-10"
        style={{
          borderColor: colors.accent,
          background: decoration.enabled ? colors.primary : colors.bgAlt,
        }}
        whileInView={
          decoration.enabled
            ? { scale: [1, 1.3, 1.1], backgroundColor: [colors.primary, colors.accent, colors.accent] }
            : { scale: [1, 1.2, 1] }
        }
        viewport={{ once: true }}
        transition={{ duration: d(0.6), delay: 0.3 }}
      />

      {/* Year */}
      <p
        className="text-[0.65rem] font-medium tracking-[0.2em] uppercase mb-1"
        style={{ color: colors.accent }}
      >
        {item.year}
      </p>

      {/* Title */}
      <h3
        className="font-heading font-medium mb-2"
        style={{ fontSize: '1.3rem', color: colors.primary }}
      >
        {item.title}
      </h3>

      {/* Photo */}
      <motion.div
        className="w-full h-48 rounded-xl overflow-hidden relative mb-3"
        style={{ background: timelineGradients[index % timelineGradients.length] }}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: d(0.7), delay: 0.2 }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center font-heading text-2xl italic opacity-40"
          style={{ color: decoration.enabled ? colors.accentPale : colors.textLight }}
          aria-hidden="true"
        >
          {item.year}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.photo}
          alt={`${item.title} - ${item.year}`}
          className="absolute inset-0 w-full h-full object-cover z-10"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      </motion.div>

      <p className="text-[0.82rem] font-light leading-relaxed" style={{ color: colors.textMuted }}>
        {item.description}
      </p>
    </motion.li>
  );
}

export function LoveStory({ data }: { data: InvitationData }) {
  const { loveStory } = data;
  const { backgrounds } = useTheme();

  return (
    <section
      id="story"
      className="py-20 px-6"
      style={{ background: backgrounds.loveStory }}
      aria-label="Kisah cinta"
    >
      <div className="max-w-2xl mx-auto">
        <SectionHeading eyebrow="Our Story" title="Perjalanan Cinta Kami" />

        <div className="relative">
          {/* Vertical timeline line */}
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
