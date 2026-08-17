'use client';

// components/invitation/Hero.tsx
// Hero / Intro section setelah cover terbuka

import { motion } from 'motion/react';
import { OrnamentDivider } from '@/components/ui/OrnamentDivider';
import type { InvitationData } from '@/types/invitation';

type HeroProps = {
  data: InvitationData;
};

export function Hero({ data }: HeroProps) {
  const { groom, bride, wedding } = data;

  return (
    <section
      id="hero"
      className="relative bg-ivory py-20 px-6 text-center overflow-hidden"
      aria-label="Intro pernikahan"
    >
      {/* Corner ornaments */}
      {['tl', 'tr', 'bl', 'br'].map((pos) => (
        <div
          key={pos}
          className={`absolute corner-ornament-${pos}`}
          style={{ width: 80, height: 80, ...(pos.includes('t') ? { top: 24 } : { bottom: 24 }), ...(pos.includes('l') ? { left: 24 } : { right: 24 }), position: 'absolute' }}
          aria-hidden="true"
        />
      ))}

      <div className="max-w-2xl mx-auto">
        <motion.p
          className="text-[0.7rem] font-light tracking-[0.3em] uppercase text-gold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          The Wedding of
        </motion.p>

        <motion.h2
          className="flex flex-col items-center font-heading font-light leading-none mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-maroon" style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)' }}>
            {groom.nickname}
          </span>
          <span className="font-heading italic text-gold" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', lineHeight: 1.4 }}>
            &amp;
          </span>
          <span className="text-maroon" style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)' }}>
            {bride.nickname}
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <OrnamentDivider className="my-4" />
        </motion.div>

        <motion.p
          className="text-[0.75rem] font-light tracking-[0.3em] text-gold-dark uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {wedding.dateNumeric}
        </motion.p>

        <motion.p
          className="text-[0.85rem] font-light text-text-medium leading-[1.9] max-w-sm mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Dengan memohon rahmat dan ridho Allah SWT,<br />
          kami mengundang Anda untuk hadir<br />
          di hari bahagia kami.
        </motion.p>
      </div>
    </section>
  );
}
