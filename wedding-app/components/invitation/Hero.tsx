'use client';

// components/invitation/Hero.tsx
// Hero / Intro section setelah cover terbuka — theme-aware.
// decoration.style: 'jawa' → OrnamentDivider + corner ornaments
//                  'floral' → FloralDivider + FloralCorner (subtle)
//                  'none' → MinimalistDivider

import { motion } from 'motion/react';
import { OrnamentDivider } from '@/components/ui/OrnamentDivider';
import { MinimalistDivider } from '@/components/ui/MinimalistDivider';
import { FloralDivider } from '@/components/ui/FloralDivider';
import { FloralCorner } from '@/components/ui/FloralCorner';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData } from '@/types/invitation';

export function Hero({ data }: { data: InvitationData }) {
  const { groom, bride, wedding } = data;
  const theme = useTheme();
  const { decoration, backgrounds, colors, animation } = theme;
  const isJawa   = decoration.style === 'jawa';
  const isFloral = decoration.style === 'floral';
  const d = (base: number) => base * animation.durationMultiplier;

  return (
    <section
      id="hero"
      className="relative py-20 px-6 text-center overflow-hidden"
      style={{ background: backgrounds.hero }}
      aria-label="Intro pernikahan"
    >
      {/* Jawa Merah: corner ornaments */}
      {isJawa &&
        ['tl', 'tr', 'bl', 'br'].map((pos) => (
          <div
            key={pos}
            className={`corner-ornament-${pos}`}
            style={{
              ...(pos.includes('t') ? { top: 24 } : { bottom: 24 }),
              ...(pos.includes('l') ? { left: 24 } : { right: 24 }),
              position: 'absolute',
              width: 80,
              height: 80,
            }}
            aria-hidden="true"
          />
        ))}

      {/* Floral: subtle botanical corners */}
      {isFloral && (
        <>
          <FloralCorner position="tl" size={80} opacity={0.3} />
          <FloralCorner position="tr" size={80} opacity={0.25} />
        </>
      )}

      <div className="max-w-2xl mx-auto">
        <motion.p
          className="text-[0.7rem] font-light tracking-[0.3em] uppercase mb-4"
          style={{ color: colors.accent }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.8), delay: 0.1 }}
        >
          The Wedding of
        </motion.p>

        <motion.h2
          className="flex flex-col items-center font-heading font-light leading-none mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: d(1), delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)', color: colors.primary }}>
            {groom.nickname}
          </span>
          <span
            className="font-heading italic"
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              lineHeight: 1.4,
              color: colors.accent,
            }}
          >
            &amp;
          </span>
          <span style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)', color: colors.primary }}>
            {bride.nickname}
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: d(0.8), delay: 0.6 }}
        >
          {isJawa ? (
            <OrnamentDivider className="my-4" />
          ) : isFloral ? (
            <FloralDivider className="my-5" width={160} opacity={0.7} />
          ) : (
            <MinimalistDivider className="my-6" width={100} opacity={0.35} />
          )}
        </motion.div>

        <motion.p
          className="text-[0.75rem] font-light tracking-[0.3em] uppercase mb-6"
          style={{ color: colors.textMuted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: d(0.8), delay: 0.8 }}
        >
          {wedding.dateNumeric}
        </motion.p>

        <motion.p
          className="text-[0.85rem] font-light leading-[1.9] max-w-sm mx-auto"
          style={{ color: colors.textMuted }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.8), delay: 1 }}
        >
          Dengan memohon rahmat dan ridho Allah SWT,<br />
          kami mengundang Anda untuk hadir<br />
          di hari bahagia kami.
        </motion.p>
      </div>
    </section>
  );
}
