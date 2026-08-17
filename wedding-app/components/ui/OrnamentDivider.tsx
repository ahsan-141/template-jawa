// components/ui/OrnamentDivider.tsx
// SVG ornament divider — lotus motif gold

type OrnamentDividerProps = {
  className?: string;
  width?: number;
};

export function OrnamentDivider({ className = '', width = 280 }: OrnamentDividerProps) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 280 30"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width, height: 'auto' }}
      >
        <line x1="0" y1="15" x2="100" y2="15" stroke="#C9A84C" strokeWidth="0.7" opacity="0.7" />
        <path d="M108 15 L116 8 L124 15 L116 22 Z" fill="#C9A84C" opacity="0.8" />
        <circle cx="140" cy="15" r="4" fill="#C9A84C" />
        <path d="M156 15 L164 8 L172 15 L164 22 Z" fill="#C9A84C" opacity="0.8" />
        <line x1="180" y1="15" x2="280" y2="15" stroke="#C9A84C" strokeWidth="0.7" opacity="0.7" />
      </svg>
    </div>
  );
}

// ── Lotus Ornament (vertical, untuk quote / hero) ──────────
export function LotusOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg" width="80" height="60">
        <ellipse cx="40" cy="35" rx="6" ry="18" opacity="0.5" fill="#E8C97E" transform="rotate(-20 40 35)" />
        <ellipse cx="40" cy="35" rx="6" ry="18" opacity="0.5" fill="#E8C97E" />
        <ellipse cx="40" cy="35" rx="6" ry="18" opacity="0.5" fill="#E8C97E" transform="rotate(20 40 35)" />
        <circle cx="40" cy="52" r="4" fill="#E8C97E" />
      </svg>
    </div>
  );
}

// ── Top/Bottom Cover Ornament ──────────────────────────────
export function CoverOrnament({ flip = false }: { flip?: boolean }) {
  const base = flip ? 18 : 72;
  const lotusCy = flip ? 40 : 50;
  const branchY = flip ? 20 : 70;
  const leftCurveY1 = flip ? 38 : 52;
  const rightCurveY1 = flip ? 38 : 52;
  const branchEndY = flip ? 30 : 60;

  return (
    <svg
      viewBox="0 0 360 90"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto' }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#C9A84C" opacity="0.85">
        <line x1="0" y1={base} x2="130" y2={base} strokeWidth="0.6" />
        <line x1="230" y1={base} x2="360" y2={base} strokeWidth="0.6" />
        <circle cx="130" cy={base} r="2" fill="#C9A84C" />
        <circle cx="230" cy={base} r="2" fill="#C9A84C" />
        <ellipse cx="180" cy={lotusCy} rx="7" ry="22" opacity="0.7" transform={`rotate(-20 180 ${lotusCy})`} fill="#C9A84C" />
        <ellipse cx="180" cy={lotusCy} rx="7" ry="22" opacity="0.7" fill="#C9A84C" />
        <ellipse cx="180" cy={lotusCy} rx="7" ry="22" opacity="0.7" transform={`rotate(20 180 ${lotusCy})`} fill="#C9A84C" />
        <circle cx="180" cy={branchY} r="5" fill="#C9A84C" />
        <path d={`M172 ${branchY} Q150 ${leftCurveY1} 118 ${branchEndY}`} strokeWidth="1" stroke="#C9A84C" />
        <ellipse cx="138" cy={branchEndY - 4} rx="14" ry="5" fill="#C9A84C" opacity="0.5" transform={`rotate(${flip ? 18 : -18} 138 ${branchEndY - 4})`} />
        <path d={`M188 ${branchY} Q210 ${rightCurveY1} 242 ${branchEndY}`} strokeWidth="1" stroke="#C9A84C" />
        <ellipse cx="222" cy={branchEndY - 4} rx="14" ry="5" fill="#C9A84C" opacity="0.5" transform={`rotate(${flip ? -18 : 18} 222 ${branchEndY - 4})`} />
        <circle cx="60" cy={base} r="1.5" fill="#C9A84C" opacity="0.5" />
        <circle cx="80" cy={base} r="1" fill="#C9A84C" opacity="0.4" />
        <circle cx="100" cy={base} r="1.5" fill="#C9A84C" opacity="0.5" />
        <circle cx="260" cy={base} r="1.5" fill="#C9A84C" opacity="0.5" />
        <circle cx="280" cy={base} r="1" fill="#C9A84C" opacity="0.4" />
        <circle cx="300" cy={base} r="1.5" fill="#C9A84C" opacity="0.5" />
      </g>
    </svg>
  );
}
