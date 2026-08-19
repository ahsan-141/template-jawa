// =============================================================
// UI — FloralCorner
// components/ui/FloralCorner.tsx
//
// Botanical corner decoration — digunakan di Cover, Couple, dll.
// SVG inline, no external asset required.
// Position via absolute positioning di parent (harus position:relative).
// =============================================================

type FloralCornerProps = {
  /** Posisi sudut yang didekorasi */
  position: 'tl' | 'tr' | 'bl' | 'br';
  /** Ukuran keseluruhan corner (px) */
  size?: number;
  opacity?: number;
  className?: string;
};

export function FloralCorner({
  position,
  size = 100,
  opacity = 0.55,
  className = '',
}: FloralCornerProps) {
  const isRight = position.includes('r');
  const isBottom = position.includes('b');

  // Positioning style
  const posStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    opacity,
    pointerEvents: 'none',
    ...(isBottom ? { bottom: 0 } : { top: 0 }),
    ...(isRight  ? { right: 0 } : { left: 0 }),
    // Flip SVG untuk posisi right & bottom
    transform: [
      isRight  ? 'scaleX(-1)' : '',
      isBottom ? 'scaleY(-1)' : '',
    ].filter(Boolean).join(' ') || undefined,
  };

  return (
    <div style={posStyle} className={className} aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
      >
        {/* Main branch from top-left corner */}
        <path
          d="M5 5 Q20 25 35 50 Q50 70 55 95"
          stroke="var(--t-accent, #C9A6AC)"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Secondary branch */}
        <path
          d="M5 5 Q30 15 55 20"
          stroke="var(--t-accent, #C9A6AC)"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Leaf 1 — off main branch */}
        <path d="M22 30 Q10 24 8 14 Q16 22 22 30Z" fill="var(--t-accent, #C9A6AC)" opacity="0.7" />
        {/* Leaf 2 */}
        <path d="M33 46 Q20 42 16 30 Q26 36 33 46Z" fill="var(--t-accent, #C9A6AC)" opacity="0.6" />
        {/* Leaf 3 — off horizontal branch */}
        <path d="M40 18 Q36 6 26 4 Q30 12 40 18Z" fill="var(--t-accent, #C9A6AC)" opacity="0.65" />
        {/* Leaf 4 */}
        <path d="M52 20 Q50 8 40 5 Q44 14 52 20Z" fill="var(--t-accent, #C9A6AC)" opacity="0.5" />

        {/* Small flower bud 1 */}
        <circle cx="14" cy="9" r="2.5" fill="var(--t-accent, #C9A6AC)" opacity="0.6" />
        <circle cx="14" cy="9" r="1.2" fill="var(--t-accentLight, #DBBFC4)" opacity="0.8" />

        {/* Small flower bud 2 */}
        <circle cx="46" cy="50" r="2" fill="var(--t-accent, #C9A6AC)" opacity="0.5" />

        {/* Tiny dots / berries */}
        <circle cx="28" cy="18" r="1" fill="var(--t-accent, #C9A6AC)" opacity="0.4" />
        <circle cx="18" cy="38" r="1" fill="var(--t-accent, #C9A6AC)" opacity="0.4" />
        <circle cx="42" cy="26" r="0.8" fill="var(--t-accent, #C9A6AC)" opacity="0.35" />
      </svg>
    </div>
  );
}
