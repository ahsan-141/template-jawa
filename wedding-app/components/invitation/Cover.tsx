'use client';

// components/invitation/Cover.tsx
// Full-screen cover dengan AnimatePresence & Motion

import { useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { CoverOrnament } from '@/components/ui/OrnamentDivider';
import type { InvitationData } from '@/types/invitation';

type CoverProps = {
  guestName: string;
  data: InvitationData;
  onOpen: () => void;
};

export function Cover({ guestName, data, onOpen }: CoverProps) {
  const { groom, bride, wedding } = data;

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <motion.section
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-maroon-dark"
      aria-label="Cover undangan pernikahan"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Batik background pattern */}
      <div className="batik-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(74,8,8,0.2) 0%, rgba(74,8,8,0.72) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Ornamen atas */}
      <motion.div
        className="absolute top-[clamp(16px,5vh,48px)] left-0 right-0 w-[min(360px,100%)] mx-auto px-4"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <CoverOrnament />
      </motion.div>

      {/* Konten cover */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-4">

        {/* Label */}
        <motion.p
          className="text-[0.65rem] font-light tracking-[0.4em] uppercase text-gold-light opacity-80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          The Wedding of
        </motion.p>

        {/* Nama pasangan */}
        <motion.h1
          className="flex flex-col items-center gap-1 leading-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-heading font-light text-gold-pale tracking-[0.05em]"
            style={{ fontSize: 'clamp(3rem, 14vw, 5.5rem)', lineHeight: 1 }}
          >
            {groom.nickname}
          </span>
          <span
            className="font-heading font-light italic text-gold"
            style={{ fontSize: 'clamp(1.6rem, 6vw, 2.8rem)', lineHeight: 1.2 }}
            aria-hidden="true"
          >
            &amp;
          </span>
          <span
            className="font-heading font-light text-gold-pale tracking-[0.05em]"
            style={{ fontSize: 'clamp(3rem, 14vw, 5.5rem)', lineHeight: 1 }}
          >
            {bride.nickname}
          </span>
        </motion.h1>

        {/* Tanggal */}
        <motion.p
          className="text-[0.75rem] font-light tracking-[0.3em] text-gold-light opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {wedding.dateNumeric}
        </motion.p>

        {/* Garis dekoratif */}
        <motion.div
          className="flex items-center gap-3 w-[min(200px,80%)]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          aria-hidden="true"
        >
          <span className="flex-1 h-px opacity-60" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
          <span className="text-gold text-[0.5rem]">◆</span>
          <span className="flex-1 h-px opacity-60" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
        </motion.div>

        {/* Nama tamu */}
        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          aria-live="polite"
        >
          <p className="text-[0.65rem] font-light tracking-[0.2em] uppercase text-gold-light opacity-70">
            Kepada
          </p>
          <p className="font-heading font-light italic text-gold-pale text-center leading-snug max-w-[280px]"
            style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)' }}>
            {guestName}
          </p>
        </motion.div>

        {/* Tombol buka undangan */}
        <motion.button
          onClick={handleOpen}
          className="mt-2 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border text-gold-pale font-body font-light text-[0.78rem] tracking-[0.2em] uppercase cursor-pointer transition-all duration-300"
          style={{ borderColor: 'rgba(201,168,76,0.5)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{
            backgroundColor: 'rgba(201,168,76,0.12)',
            borderColor: '#C9A84C',
            y: -2,
          }}
          whileTap={{ scale: 0.97 }}
          aria-label="Buka undangan pernikahan"
        >
          <span>Buka Undangan</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </motion.button>
      </div>

      {/* Ornamen bawah */}
      <motion.div
        className="absolute bottom-[clamp(16px,5vh,48px)] left-0 right-0 w-[min(360px,100%)] mx-auto px-4"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        aria-hidden="true"
      >
        <CoverOrnament flip />
      </motion.div>

      {/* Floating particles */}
      {[15, 35, 60, 75, 88].map((left, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold pointer-events-none"
          style={{
            width: i % 2 === 0 ? 4 : 3,
            height: i % 2 === 0 ? 4 : 3,
            left: `${left}%`,
            opacity: 0.12,
          }}
          animate={{ y: [100, -20], opacity: [0, 0.15, 0.1, 0] }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear',
          }}
          aria-hidden="true"
        />
      ))}
    </motion.section>
  );
}
