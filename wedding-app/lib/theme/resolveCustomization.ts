// =============================================================
// LIB — Resolve Customization
// lib/theme/resolveCustomization.ts
//
// Utility terpusat untuk deep-merge customization di atas
// theme default. Satu fungsi, satu tempat.
//
// Precedence: CUSTOMIZATION → THEME → SYSTEM DEFAULT
// =============================================================

import type { ThemeConfig } from '@/types/theme';
import type {
  ThemeCustomization,
  SectionId,
  ResolvedThemeContext,
} from '@/types/customization';
import { DEFAULT_SECTION_ORDER } from '@/types/customization';

// ── Intensity → durationMultiplier mapping ───────────────────
const INTENSITY_MAP: Record<'subtle' | 'normal' | 'expressive', number> = {
  subtle: 1.5,
  normal: 1.0,
  expressive: 0.7,
};

// ── Deep merge helper (2-level) ──────────────────────────────
// Menggabungkan source ke base tanpa menghilangkan field base
// yang tidak ada di source. Hanya merge 1 level deep objects.
function mergeShallow<T extends Record<string, unknown>>(
  base: T,
  source: Partial<T> | undefined,
): T {
  if (!source) return base;
  return { ...base, ...source };
}

// ── Main resolve function ────────────────────────────────────
/**
 * resolveTheme — merge customization overrides di atas theme default.
 *
 * Rules:
 * - Jika customization kosong {} → hasilnya identik dengan theme.
 * - Hanya field yang diisi di customization yang di-override.
 * - Deep merge aman: nested objects tidak hilang.
 * - Tidak mengmutasi baseTheme.
 */
export function resolveTheme(
  baseTheme: ThemeConfig,
  customization: ThemeCustomization,
): ThemeConfig {
  // Fast path: jika customization kosong, return base langsung
  if (!customization || Object.keys(customization).length === 0) {
    return baseTheme;
  }

  // ── Colors ───────────────────────────────────────────────
  const colors = mergeShallow(baseTheme.colors, customization.colors);

  // ── Fonts ────────────────────────────────────────────────
  const fonts = mergeShallow(baseTheme.fonts, customization.fonts);

  // ── Decoration ───────────────────────────────────────────
  // Decoration customization hanya override enabled (on/off).
  // topImage/bottomImage/cornerImage disimpan di customization,
  // dibaca langsung oleh components yang membutuhkannya.
  const decoration = customization.decoration?.enabled !== undefined
    ? { ...baseTheme.decoration, enabled: customization.decoration.enabled }
    : baseTheme.decoration;

  // ── Animation ────────────────────────────────────────────
  const animation = customization.animation?.intensity
    ? {
        ...baseTheme.animation,
        durationMultiplier: INTENSITY_MAP[customization.animation.intensity],
      }
    : baseTheme.animation;

  // ── Couple Photo ─────────────────────────────────────────
  // layout.couple override → couplePhoto.shape
  let couplePhoto = mergeShallow(baseTheme.couplePhoto, customization.couplePhoto);
  if (customization.layout?.couple) {
    // 'stacked' maps to 'rectangle' shape (stacked is a layout concern, not shape)
    const shapeMap: Record<string, 'circle' | 'rectangle'> = {
      circle: 'circle',
      rectangle: 'rectangle',
      stacked: 'rectangle',
    };
    couplePhoto = {
      ...couplePhoto,
      shape: shapeMap[customization.layout.couple] ?? couplePhoto.shape,
    };
  }

  // ── Backgrounds ──────────────────────────────────────────
  const backgrounds = mergeShallow(baseTheme.backgrounds, customization.backgrounds);

  // ── Gallery Caption Scheme ───────────────────────────────
  const galleryCaptionScheme =
    customization.galleryCaptionScheme ?? baseTheme.galleryCaptionScheme;

  // ── Assemble resolved theme ──────────────────────────────
  return {
    name: baseTheme.name,
    id: baseTheme.id,
    colors,
    fonts,
    decoration,
    animation,
    couplePhoto,
    backgrounds,
    galleryGradients: baseTheme.galleryGradients,
    timelineGradients: baseTheme.timelineGradients,
    galleryCaptionScheme,
  };
}

// ── Section visibility helper ────────────────────────────────
/**
 * isSectionVisible — cek apakah section tertentu harus dirender.
 * Default: true (semua section visible).
 */
export function isSectionVisible(
  customization: ThemeCustomization,
  section: SectionId,
): boolean {
  if (!customization.sections) return true;
  const value = customization.sections[section];
  // undefined = visible (default true)
  return value !== false;
}

// ── Section order helper ─────────────────────────────────────
/**
 * getSectionOrder — mendapatkan urutan section final.
 * Jika customization.sectionOrder ada → gunakan itu.
 * Jika tidak → gunakan DEFAULT_SECTION_ORDER.
 * Section yang visibility-nya false tetap ada di order
 * (filtering dilakukan saat render).
 */
export function getSectionOrder(
  customization: ThemeCustomization,
): SectionId[] {
  return customization.sectionOrder ?? DEFAULT_SECTION_ORDER;
}

// ── Build full resolved context ──────────────────────────────
/**
 * buildResolvedContext — convenience function untuk membuat
 * ResolvedThemeContext lengkap dari theme + customization.
 */
export function buildResolvedContext(
  baseTheme: ThemeConfig,
  customization: ThemeCustomization,
): ResolvedThemeContext {
  return {
    baseTheme,
    customization,
    resolvedTheme: resolveTheme(baseTheme, customization),
    isSectionVisible: (section: SectionId) =>
      isSectionVisible(customization, section),
    sectionOrder: getSectionOrder(customization),
  };
}
