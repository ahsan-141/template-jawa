'use client';

// =============================================================
// CONTEXT — Theme (Backward Compatibility Layer)
// contexts/ThemeContext.tsx
//
// Re-export layer yang menjaga backward compatibility.
// Semua 16+ existing components import useTheme() dari sini
// dan mengharapkan return type ThemeConfig.
//
// New code should import from '@/lib/theme/ThemeProvider' directly
// to get the full ResolvedThemeContext via useTheme().
// =============================================================

import { useTheme as useFullTheme } from '@/lib/theme/ThemeProvider';
import type { ThemeConfig } from '@/types/theme';
import type { ResolvedThemeContext } from '@/types/customization';

// Re-export ThemeContext for edge cases
export { ThemeContext } from '@/lib/theme/ThemeProvider';

/**
 * useTheme — backward compatible hook.
 *
 * Returns: ThemeConfig (resolvedTheme saja, bukan full context).
 * Ini menjaga kompatibilitas dengan 16+ komponen yang sudah ada:
 *   const theme = useTheme();
 *   const { colors, decoration } = theme;
 *
 * Untuk akses full context (isSectionVisible, sectionOrder, dll),
 * gunakan useCustomization() atau import useTheme dari
 * '@/lib/theme/ThemeProvider'.
 */
export function useTheme(): ThemeConfig {
  return useFullTheme().resolvedTheme;
}

/**
 * useCustomization — akses full ResolvedThemeContext.
 *
 * Returns: { baseTheme, customization, resolvedTheme,
 *            isSectionVisible, sectionOrder }
 */
export function useCustomization(): ResolvedThemeContext {
  return useFullTheme();
}
