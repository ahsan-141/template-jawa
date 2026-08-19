// =============================================================
// LIB — Theme Registry
// lib/theme/registry.ts
//
// Registry terpusat untuk semua theme yang tersedia.
// Digunakan oleh Invitation.tsx dan dev preview page.
// Untuk menambah theme baru: import + daftarkan di THEMES map.
// =============================================================

import type { ThemeConfig } from '@/types/theme';
import { jawaMerahTheme }     from '@/themes/jawa-merah';
import { minimalistTheme }    from '@/themes/minimalist';
import { floralElegantTheme } from '@/themes/floral-elegant';

// ── Theme Map ────────────────────────────────────────────────
export const THEMES: Record<string, ThemeConfig> = {
  'jawa-merah':     jawaMerahTheme,
  'minimalist':     minimalistTheme,
  'floral-elegant': floralElegantTheme,
};

export type ThemeId = keyof typeof THEMES;

// ── Theme list for UI ────────────────────────────────────────
export const THEME_LIST = Object.entries(THEMES).map(([id, theme]) => ({
  id,
  name: theme.name,
}));

// ── Validator ────────────────────────────────────────────────
export function isValidThemeId(id: string | null): id is string {
  return id !== null && id in THEMES;
}

// ── Getter ───────────────────────────────────────────────────
export function getTheme(id: string | null): ThemeConfig {
  if (id && isValidThemeId(id)) return THEMES[id];
  return THEMES['jawa-merah'];
}

// ── Default theme ID ─────────────────────────────────────────
export const DEFAULT_THEME_ID = 'jawa-merah';
