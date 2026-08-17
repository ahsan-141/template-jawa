'use client';

// components/invitation/Countdown.tsx
// Hitung mundur realtime — menggunakan useCountdown hook

import { useCountdown } from '@/hooks/useCountdown';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { InvitationData } from '@/types/invitation';

type CountdownProps = { data: InvitationData };

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center px-4 py-5 rounded-xl border backdrop-blur-sm min-w-[72px]"
      style={{ background: 'rgba(255,251,245,0.06)', borderColor: 'rgba(201,168,76,0.2)' }}
    >
      <span
        suppressHydrationWarning
        className="font-heading font-light text-gold-light leading-none tabular-nums"
        style={{ fontSize: 'clamp(2.4rem, 8vw, 3.5rem)' }}
        aria-label={`${value} ${label}`}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[0.6rem] font-medium tracking-[0.15em] uppercase mt-1.5 opacity-60 text-gold-pale">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ data }: CountdownProps) {
  const { wedding } = data;
  const timeLeft = useCountdown(wedding.countdownDate);

  return (
    <section
      id="countdown"
      className="relative py-20 px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #2C1810 0%, #4A0808 100%)' }}
      aria-label="Hitung mundur menuju hari pernikahan"
    >
      <div className="countdown-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <SectionHeading eyebrow="Menghitung Hari" title="Menuju Hari Bahagia" light />

        {timeLeft.isExpired ? (
          <p
            className="font-heading italic text-gold-light mb-6"
            style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}
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
            <CountdownUnit value={timeLeft.days}    label="Hari" />
            <span className="font-heading text-2xl text-gold opacity-40 pb-6 animate-pulse">:</span>
            <CountdownUnit value={timeLeft.hours}   label="Jam" />
            <span className="font-heading text-2xl text-gold opacity-40 pb-6 animate-pulse">:</span>
            <CountdownUnit value={timeLeft.minutes} label="Menit" />
            <span className="font-heading text-2xl text-gold opacity-40 pb-6 animate-pulse">:</span>
            <CountdownUnit value={timeLeft.seconds} label="Detik" />
          </div>
        )}

        <p className="text-[0.72rem] font-light tracking-[0.15em] opacity-50 text-gold-pale">
          {wedding.date}, 08:00 WITA
        </p>
      </div>
    </section>
  );
}
