'use client';

// components/invitation/Countdown.tsx
// Hitung mundur realtime — theme-aware.

import { useCountdown } from '@/hooks/useCountdown';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData } from '@/types/invitation';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const { colors } = useTheme();

  return (
    <div
      className="flex flex-col items-center px-4 py-5 rounded-xl border backdrop-blur-sm min-w-[72px]"
      style={{
        background: colors.cardBgOnDark,
        borderColor: colors.borderOnDark,
      }}
    >
      <span
        suppressHydrationWarning
        className="font-heading font-light leading-none tabular-nums"
        style={{
          fontSize: 'clamp(2.4rem, 8vw, 3.5rem)',
          color: colors.accentLight,
        }}
        aria-label={`${value} ${label}`}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        className="text-[0.6rem] font-medium tracking-[0.15em] uppercase mt-1.5 opacity-60"
        style={{ color: colors.textOnDark }}
      >
        {label}
      </span>
    </div>
  );
}

export function Countdown({ data }: { data: InvitationData }) {
  const { wedding } = data;
  const timeLeft = useCountdown(wedding.countdownDate);
  const theme = useTheme();
  const { backgrounds, colors, decoration } = theme;

  return (
    <section
      id="countdown"
      className="relative py-20 px-6 text-center overflow-hidden"
      style={{ background: backgrounds.countdown }}
      aria-label="Hitung mundur menuju hari pernikahan"
    >
      {/* Pattern — Jawa Merah only */}
      {decoration.enabled && (
        <div
          className="countdown-pattern absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-2xl mx-auto">
        <SectionHeading eyebrow="Menghitung Hari" title="Menuju Hari Bahagia" light />

        {timeLeft.isExpired ? (
          <p
            className="font-heading italic mb-6"
            style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              color: colors.accentOnDark,
            }}
            aria-live="assertive"
          >
            ✦ The Wedding Day Has Arrived ✦
          </p>
        ) : (
          <div
            className="flex items-center justify-center gap-2 mb-6 flex-wrap"
            aria-live="polite"
            aria-label="Waktu hitung mundur"
          >
            <CountdownUnit value={timeLeft.days} label="Hari" />
            <span
              className="font-heading text-2xl pb-6 animate-pulse"
              style={{ color: colors.accent, opacity: 0.4 }}
            >
              :
            </span>
            <CountdownUnit value={timeLeft.hours} label="Jam" />
            <span
              className="font-heading text-2xl pb-6 animate-pulse"
              style={{ color: colors.accent, opacity: 0.4 }}
            >
              :
            </span>
            <CountdownUnit value={timeLeft.minutes} label="Menit" />
            <span
              className="font-heading text-2xl pb-6 animate-pulse"
              style={{ color: colors.accent, opacity: 0.4 }}
            >
              :
            </span>
            <CountdownUnit value={timeLeft.seconds} label="Detik" />
          </div>
        )}

        <p
          className="text-[0.72rem] font-light tracking-[0.15em] opacity-50"
          style={{ color: colors.textOnDark }}
        >
          {wedding.date}, 08:00 WITA
        </p>
      </div>
    </section>
  );
}
