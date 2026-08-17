'use client';

// =============================================================
// HOOK — useCountdown
// hooks/useCountdown.ts
// =============================================================

import { useState, useEffect, useCallback } from 'react';
import type { TimeLeft } from '@/types/invitation';

function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isExpired: false,
  };
}

const initialTimeLeft: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: false,
};

export function useCountdown(targetDate: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);
  const [isMounted, setIsMounted] = useState(false);

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
  }, [targetDate]);

  useEffect(() => {
    setIsMounted(true);
    tick();

    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  if (!isMounted) {
    return calculateTimeLeft(targetDate);
  }

  return timeLeft;
}
