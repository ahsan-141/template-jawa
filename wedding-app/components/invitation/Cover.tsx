'use client';

// components/invitation/Cover.tsx
// Full-screen cover — theme-aware via decoration.style & coverScheme.
//
// jawa-merah:     dark maroon bg, gold ornaments, batik pattern, gold particles
// minimalist:     light cream bg, no ornaments, thin border lines
// floral-elegant: warm cream bg, botanical SVG corners, soft petal particles

import { useCallback } from 'react';
import { motion } from 'motion/react';
import { CoverOrnament } from '@/components/ui/OrnamentDivider';
import { FloralCorner } from '@/components/ui/FloralCorner';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData } from '@/types/invitation';

type CoverProps = {
  guestName: string;
  data: InvitationData;
  onOpen: () => void;
};

export function Cover({ guestName, data, onOpen }: CoverProps) {
  const { groom, bride, wedding } = data;
  const theme = useTheme();
  const { decoration, backgrounds, colors, animation, fonts } = theme;
  const isDark    = decoration.coverScheme === 'dark';
  const isFloral  = decoration.style === 'floral';
  const isJawa    = decoration.style === 'jawa';
  const d = (base: number) => base * animation.durationMultiplier;

  const handleOpen = useCallback(() => onOpen(), [onOpen]);

  return (
    <motion.section
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: backgrounds.cover }}
      aria-label="Cover undangan pernikahan"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Jawa Merah: Batik pattern ──────────────────────── */}
      {isJawa && (
        <div className="batik-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />
      )}

      {/* ── Jawa Merah: Radial gradient overlay ─────────────── */}
      {isJawa && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(74,8,8,0.2) 0%, rgba(74,8,8,0.72) 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Floral: Soft radial gradient vignette ────────────── */}
      {isFloral && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(251,247,243,0) 30%, rgba(232,221,213,0.3) 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Jawa Merah: Top CoverOrnament ────────────────────── */}
      {isJawa && (
        <motion.div
          className="absolute top-[clamp(16px,5vh,48px)] left-0 right-0 w-[min(360px,100%)] mx-auto px-4"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <CoverOrnament />
        </motion.div>
      )}

      {/* ── Floral: Botanical corners ─────────────────────────── */}
      {isFloral && (
        <>
          <motion.div
            className="absolute top-0 left-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: d(1.4), delay: 0.1 }}
          >
            <FloralCorner position="tl" size={110} opacity={0.55} />
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: d(1.4), delay: 0.2 }}
          >
            <FloralCorner position="tr" size={110} opacity={0.45} />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: d(1.4), delay: 0.3 }}
          >
            <FloralCorner position="bl" size={90} opacity={0.4} />
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: d(1.4), delay: 0.25 }}
          >
            <FloralCorner position="br" size={90} opacity={0.35} />
          </motion.div>
        </>
      )}

      {/* ── Minimalist: Subtle border lines ──────────────────── */}
      {!isJawa && !isFloral && (
        <>
          <div
            className="absolute top-0 left-0 right-0"
            style={{ height: '1px', background: colors.coverAccent, opacity: 0.2 }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '1px', background: colors.coverAccent, opacity: 0.2 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-4">

        {/* Label */}
        <motion.p
          className="text-[0.65rem] font-light tracking-[0.4em] uppercase"
          style={{ color: colors.coverAccent, opacity: 0.8 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: d(1), delay: 0.2 }}
        >
          The Wedding of
        </motion.p>

        {/* Couple names */}
        <motion.h1
          className="flex flex-col items-center gap-1 leading-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: d(1.2), delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-heading font-light tracking-[0.05em]"
            style={{
              fontSize: 'clamp(3rem, 14vw, 5.5rem)',
              lineHeight: 1,
              color: colors.coverText,
            }}
          >
            {groom.nickname}
          </span>
          <span
            className="font-heading font-light italic"
            style={{
              fontSize: 'clamp(1.6rem, 6vw, 2.8rem)',
              lineHeight: 1.2,
              color: colors.coverAccent,
            }}
            aria-hidden="true"
          >
            &amp;
          </span>
          <span
            className="font-heading font-light tracking-[0.05em]"
            style={{
              fontSize: 'clamp(3rem, 14vw, 5.5rem)',
              lineHeight: 1,
              color: colors.coverText,
            }}
          >
            {bride.nickname}
          </span>
        </motion.h1>

        {/* Date */}
        <motion.p
          className="text-[0.75rem] font-light tracking-[0.3em]"
          style={{ color: colors.coverSubtext, opacity: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: d(0.8), delay: 0.7 }}
        >
          {wedding.dateNumeric}
        </motion.p>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-3 w-[min(200px,80%)]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: d(0.8), delay: 0.9 }}
          aria-hidden="true"
        >
          {isJawa ? (
            <>
              <span
                className="flex-1 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${colors.coverAccent}, transparent)` }}
              />
              <span className="text-[0.5rem]" style={{ color: colors.coverAccent }}>◆</span>
              <span
                className="flex-1 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, ${colors.coverAccent}, transparent)` }}
              />
            </>
          ) : isFloral ? (
            <>
              <span className="flex-1 h-px" style={{ background: colors.coverAccent, opacity: 0.3 }} />
              <span className="text-[0.55rem]" style={{ color: colors.coverAccent, opacity: 0.7 }}>❧</span>
              <span className="flex-1 h-px" style={{ background: colors.coverAccent, opacity: 0.3 }} />
            </>
          ) : (
            <span className="flex-1 h-px" style={{ background: colors.coverAccent, opacity: 0.25 }} />
          )}
        </motion.div>

        {/* Guest name */}
        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.8), delay: 1.1 }}
          aria-live="polite"
        >
          <p
            className="text-[0.65rem] font-light tracking-[0.2em] uppercase"
            style={{ color: colors.coverSubtext, opacity: isDark ? 0.7 : 1 }}
          >
            Kepada
          </p>
          <p
            className="font-heading font-light italic text-center leading-snug max-w-[280px]"
            style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)', color: colors.coverText }}
          >
            {guestName}
          </p>
        </motion.div>

        {/* Buka Undangan button */}
        <motion.button
          onClick={handleOpen}
          className="mt-2 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border cursor-pointer transition-all duration-300"
          style={{
            borderColor: colors.coverButtonBorder,
            color: colors.coverText,
            fontFamily: fonts.body,
            fontSize: '0.78rem',
            fontWeight: 300,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.8), delay: 1.3 }}
          whileHover={{
            backgroundColor: colors.coverButtonHoverBg,
            borderColor: colors.coverAccent,
            y: -2,
          }}
          whileTap={{ scale: 0.97 }}
          aria-label="Buka undangan pernikahan"
        >
          <span>Buka Undangan</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </motion.button>
      </div>

      {/* ── Jawa Merah: Bottom CoverOrnament ─────────────────── */}
      {isJawa && (
        <motion.div
          className="absolute bottom-[clamp(16px,5vh,48px)] left-0 right-0 w-[min(360px,100%)] mx-auto px-4"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          aria-hidden="true"
        >
          <CoverOrnament flip />
        </motion.div>
      )}

      {/* ── Jawa Merah: Gold particles ────────────────────────── */}
      {isJawa &&
        [15, 35, 60, 75, 88].map((left, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: i % 2 === 0 ? 4 : 3,
              height: i % 2 === 0 ? 4 : 3,
              left: `${left}%`,
              background: colors.coverAccent,
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

      {/* ── Floral: Soft petal particles ──────────────────────── */}
      {isFloral &&
        [10, 25, 50, 70, 85, 40].map((left, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
              height: i % 3 === 0 ? 9 : i % 3 === 1 ? 6 : 4,
              left: `${left}%`,
              background: colors.coverAccent,
              opacity: 0.18,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              transform: `rotate(${i * 35}deg)`,
            }}
            animate={{
              y: [0, 120],
              opacity: [0, 0.2, 0.15, 0],
              rotate: [i * 35, i * 35 + 180],
            }}
            transition={{
              duration: 10 + i * 2.5,
              repeat: Infinity,
              delay: i * 1.8,
              ease: 'linear',
            }}
            aria-hidden="true"
          />
        ))}
    </motion.section>
  );
}
