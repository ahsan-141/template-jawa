// =============================================================
// UI — FloralDivider
// components/ui/FloralDivider.tsx
//
// Botanical SVG divider — thin sprig with leaves.
// Digunakan di Hero, Quote, Closing untuk Floral Elegant theme.
// Pakai var(--t-accent) agar warna mengikuti theme.
// =============================================================

type FloralDividerProps = {
  className?: string;
  width?: number;
  opacity?: number;
  /** 'horizontal' = sprig di tengah garis | 'vertical' = stem pendek ke atas */
  variant?: 'horizontal' | 'sprig';
};

export function FloralDivider({
  className = '',
  width = 160,
  opacity = 0.6,
  variant = 'horizontal',
}: FloralDividerProps) {
  if (variant === 'sprig') {
    return (
      <div
        className={`flex justify-center ${className}`}
        aria-hidden="true"
        style={{ opacity }}
      >
        <svg
          viewBox="0 0 60 50"
          xmlns="http://www.w3.org/2000/svg"
          width={60}
          height={50}
          fill="none"
        >
          {/* Center stem */}
          <line x1="30" y1="48" x2="30" y2="10" stroke="var(--t-accent, #C9A6AC)" strokeWidth="0.8" strokeLinecap="round" />
          {/* Left leaf */}
          <path d="M30 32 Q18 28 16 18 Q24 22 30 32Z" fill="var(--t-accent, #C9A6AC)" opacity="0.7" />
          {/* Right leaf */}
          <path d="M30 26 Q42 22 44 12 Q36 16 30 26Z" fill="var(--t-accent, #C9A6AC)" opacity="0.7" />
          {/* Small left leaf */}
          <path d="M30 20 Q22 17 21 10 Q26 14 30 20Z" fill="var(--t-accent, #C9A6AC)" opacity="0.45" />
          {/* Top bud */}
          <ellipse cx="30" cy="8" rx="2.5" ry="4" fill="var(--t-accent, #C9A6AC)" opacity="0.8" />
        </svg>
      </div>
    );
  }

  // Horizontal: garis dengan sprig di tengah
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* Left line */}
      <svg
        viewBox="0 0 80 10"
        xmlns="http://www.w3.org/2000/svg"
        width={Math.floor(width * 0.35)}
        height={10}
        fill="none"
      >
        <line x1="0" y1="5" x2="80" y2="5" stroke="var(--t-accent, #C9A6AC)" strokeWidth="0.7" strokeLinecap="round" />
        <circle cx="2" cy="5" r="1.2" fill="var(--t-accent, #C9A6AC)" />
      </svg>

      {/* Center botanical motif */}
      <svg
        viewBox="0 0 36 24"
        xmlns="http://www.w3.org/2000/svg"
        width={36}
        height={24}
        fill="none"
      >
        {/* Stem */}
        <line x1="18" y1="22" x2="18" y2="4" stroke="var(--t-accent, #C9A6AC)" strokeWidth="0.7" strokeLinecap="round" />
        {/* Left leaf */}
        <path d="M18 16 Q10 13 9 6 Q14 10 18 16Z" fill="var(--t-accent, #C9A6AC)" opacity="0.75" />
        {/* Right leaf */}
        <path d="M18 11 Q26 8 27 1 Q22 5 18 11Z" fill="var(--t-accent, #C9A6AC)" opacity="0.75" />
        {/* Top bud */}
        <ellipse cx="18" cy="3" rx="2" ry="3" fill="var(--t-accent, #C9A6AC)" />
      </svg>

      {/* Right line */}
      <svg
        viewBox="0 0 80 10"
        xmlns="http://www.w3.org/2000/svg"
        width={Math.floor(width * 0.35)}
        height={10}
        fill="none"
      >
        <line x1="0" y1="5" x2="80" y2="5" stroke="var(--t-accent, #C9A6AC)" strokeWidth="0.7" strokeLinecap="round" />
        <circle cx="78" cy="5" r="1.2" fill="var(--t-accent, #C9A6AC)" />
      </svg>
    </div>
  );
}
