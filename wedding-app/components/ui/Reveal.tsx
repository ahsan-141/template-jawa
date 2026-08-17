'use client';

// components/ui/Reveal.tsx
// Reusable Motion reveal wrapper — digunakan di semua section

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'none';

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 32 },
  left:  { x: -32 },
  right: { x: 32 },
  none:  {},
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  amount?: number;
};

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.15,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
