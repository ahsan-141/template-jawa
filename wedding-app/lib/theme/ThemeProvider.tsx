'use client';

// =============================================================
// LIB — ThemeProvider
// lib/theme/ThemeProvider.tsx
//
// React Context Provider + useTheme hook.
//
// Responsibilities:
// 1. Merge baseTheme + customization via mergeTheme().
// 2. Resolve section order + visibility.
// 3. Inject CSS custom properties (--t-*) ke wrapper div.
// 4. Menyediakan ResolvedThemeContext ke component tree.
//
// useTheme() throw error yang jelas jika dipanggil di luar
// ThemeProvider — tidak ada default fallback yang diam-diam salah.
// =============================================================

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ThemeConfig } from '@/types/theme';
import type {
  ThemeCustomization,
  SectionId,
  ResolvedThemeContext,
} from '@/types/customization';
import { mergeTheme } from './mergeTheme';
import {
  resolveSectionOrder,
  isSectionVisible as checkSectionVisible,
} from './sectionOrder';

// ── Context ──────────────────────────────────────────────────
// Default null — memaksa useTheme() throw jika di luar provider.
// Ini lebih aman daripada default diam-diam yang bisa salah.
const ThemeCtx = createContext<ResolvedThemeContext | null>(null);

// Re-export context untuk edge cases yang butuh akses langsung
export { ThemeCtx as ThemeContext };

// ── Props ────────────────────────────────────────────────────
type ThemeProviderProps = {
  baseTheme: ThemeConfig;
  customization: ThemeCustomization;
  children: ReactNode;
};

// ── Provider ─────────────────────────────────────────────────
export function ThemeProvider({
  baseTheme,
  customization,
  children,
}: ThemeProviderProps) {
  // Memoize seluruh resolved context.
  // Hanya recompute jika baseTheme atau customization berubah ref.
  const value = useMemo<ResolvedThemeContext>(() => {
    const resolvedTheme = mergeTheme(baseTheme, customization);
    const sectionOrder = resolveSectionOrder(customization);
    return {
      baseTheme,
      customization,
      resolvedTheme,
      isSectionVisible: (id: SectionId) =>
        checkSectionVisible(id, customization),
      sectionOrder,
    };
  }, [baseTheme, customization]);

  // ── CSS Custom Properties ──────────────────────────────────
  // Diinjeksi ke wrapper div sehingga komponen bisa menggunakan
  // var(--t-*) dalam inline styles. Dibaca dari resolvedTheme
  // (sudah di-merge) bukan baseTheme.
  const { colors } = value.resolvedTheme;
  const cssVars = {
    // Primary
    '--t-primary':      colors.primary,
    '--t-primary-dark': colors.primaryDark,

    // Accent
    '--t-accent':       colors.accent,
    '--t-accent-light': colors.accentLight,
    '--t-accent-pale':  colors.accentPale,

    // Backgrounds
    '--t-bg':           colors.bg,
    '--t-bg-alt':       colors.bgAlt,
    '--t-bg-dark':      colors.bgDark,
    '--t-bg-dark2':     colors.bgDark2,

    // Text on light
    '--t-text':         colors.text,
    '--t-text-muted':   colors.textMuted,
    '--t-text-light':   colors.textLight,

    // Text on dark sections
    '--t-text-on-dark':   colors.textOnDark,
    '--t-accent-on-dark': colors.accentOnDark,
    '--t-card-bg-dark':   colors.cardBgOnDark,
    '--t-border-dark':    colors.borderOnDark,

    // Cover
    '--t-cover-text':       colors.coverText,
    '--t-cover-accent':     colors.coverAccent,
    '--t-cover-subtext':    colors.coverSubtext,
    '--t-cover-btn-border': colors.coverButtonBorder,
    '--t-cover-btn-hover':  colors.coverButtonHoverBg,

    // Borders
    '--t-border':       colors.border,

    // Forms
    '--t-input-border': colors.inputBorder,
    '--t-input-text':   colors.inputText,

    // Nav
    '--t-nav-bg':               colors.navBg,
    '--t-nav-border':           colors.navBorder,
    '--t-nav-text':             colors.navItemText,
    '--t-nav-text-active':      colors.navItemActiveText,
    '--t-nav-indicator':        colors.navIndicatorBg,
    '--t-nav-indicator-border': colors.navIndicatorBorder,

    // Music
    '--t-music-btn-bg':     colors.musicBtnBg,
    '--t-music-btn-border': colors.musicBtnBorder,
  } as React.CSSProperties;

  return (
    <ThemeCtx.Provider value={value}>
      <div
        data-theme={value.resolvedTheme.id}
        style={cssVars}
        className="min-h-screen w-full"
      >
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}

// ── Hooks ────────────────────────────────────────────────────

/**
 * useTheme — akses full ResolvedThemeContext.
 *
 * Returns: { baseTheme, customization, resolvedTheme,
 *            isSectionVisible, sectionOrder }
 *
 * Throws: Error jelas jika dipanggil di luar ThemeProvider.
 *
 * Usage:
 *   const { resolvedTheme, isSectionVisible } = useTheme();
 *   const { colors } = resolvedTheme;
 */
export function useTheme(): ResolvedThemeContext {
  const ctx = useContext(ThemeCtx);
  if (!ctx) {
    throw new Error(
      'useTheme() must be called inside a <ThemeProvider>. ' +
      'Wrap your component tree with <ThemeProvider baseTheme={...} customization={...}>.',
    );
  }
  return ctx;
}
