// =============================================================
// UI — MinimalistDivider
// components/ui/MinimalistDivider.tsx
//
// Simple thin horizontal line divider untuk Minimalist theme.
// Menggantikan OrnamentDivider & LotusOrnament pada theme non-dekoratif.
// =============================================================

type MinimalistDividerProps = {
  className?: string;
  width?: number | string;
  opacity?: number;
};

export function MinimalistDivider({
  className = '',
  width = 80,
  opacity = 0.3,
}: MinimalistDividerProps) {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      aria-hidden="true"
    >
      <div
        style={{
          width,
          height: '1px',
          background: 'var(--t-accent, #A0A0A0)',
          opacity,
        }}
      />
    </div>
  );
}
