'use client';

// =============================================================
// EXAMPLE — InvitationView (Client Component)
// app/[slug]/InvitationView.tsx
//
// Contoh komponen section yang menggunakan useTheme() dari
// lib/theme/ThemeProvider untuk:
// - Cek isSectionVisible()
// - Ambil warna dari resolvedTheme
// - Membaca section order
// =============================================================

import {
  ThemeProvider,
  useTheme,
} from '@/lib/theme/ThemeProvider';
import type { ThemeConfig } from '@/types/theme';
import type { ThemeCustomization } from '@/types/customization';

// ── Props dari server component ──────────────────────────────
type InvitationViewProps = {
  theme: ThemeConfig;
  customization: ThemeCustomization;
};

// ── Client wrapper ───────────────────────────────────────────
export function InvitationView({ theme, customization }: InvitationViewProps) {
  return (
    <ThemeProvider baseTheme={theme} customization={customization}>
      <InvitationContent />
    </ThemeProvider>
  );
}

// ── Contoh section component ─────────────────────────────────
// Mendemonstrasikan penggunaan useTheme() dari lib/theme/ThemeProvider.
function InvitationContent() {
  // useTheme() dari lib/theme/ThemeProvider returns ResolvedThemeContext
  const {
    resolvedTheme,
    isSectionVisible,
    sectionOrder,
  } = useTheme();

  const { colors } = resolvedTheme;

  return (
    <main style={{ background: colors.bg, color: colors.text }}>
      {sectionOrder.map((sectionId) => {
        // Skip section yang di-hide via customization
        if (!isSectionVisible(sectionId)) return null;

        // Render section berdasarkan id
        // (di production, ini diganti switch ke real components)
        return (
          <section
            key={sectionId}
            id={sectionId}
            className="py-16 px-6 text-center border-b"
            style={{
              borderColor: colors.border,
              background: resolvedTheme.backgrounds[
                sectionId as keyof typeof resolvedTheme.backgrounds
              ] ?? colors.bg,
            }}
          >
            <h2
              className="text-2xl font-light"
              style={{
                fontFamily: resolvedTheme.fonts.heading,
                color: colors.primary,
              }}
            >
              {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
            </h2>
            <p
              className="text-sm mt-2"
              style={{ color: colors.textMuted }}
            >
              Section rendered via customization system
            </p>
          </section>
        );
      })}
    </main>
  );
}
