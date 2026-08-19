// =============================================================
// LIB — mergeTheme
// lib/theme/mergeTheme.ts
//
// Deep-merge customization overrides ke baseTheme.
// Menghasilkan ThemeConfig baru TANPA memutasi baseTheme.
//
// Kenapa manual, bukan lodash/deepmerge?
// 1. Struktur ThemeConfig well-defined, max 2 level deep.
// 2. Kita butuh behavior spesifik (intensity→durationMultiplier,
//    layout.couple→couplePhoto.shape) yang generic merge tidak bisa.
// 3. Menghindari dependency eksternal untuk logic sederhana.
// =============================================================

import type { ThemeConfig } from '@/types/theme';
import type { ThemeCustomization } from '@/types/customization';

// ── Intensity → durationMultiplier ───────────────────────────
const INTENSITY_MAP = {
  subtle:     1.5,   // lebih lambat = lebih subtle
  normal:     1.0,   // default speed
  expressive: 0.7,   // lebih cepat = lebih energik
} as const satisfies Record<NonNullable<ThemeCustomization['animation']>['intensity'] & string, number>;

/**
 * shallowMerge — gabungkan partial override ke base object.
 *
 * Hanya merge 1 level: tiap key di `override` yang bukan undefined
 * menggantikan key yang sama di `base`. Key yang tidak disebutkan
 * di override TETAP dipertahankan dari base.
 *
 * Contoh:
 *   shallowMerge({ a: 1, b: 2, c: 3 }, { b: 99 })
 *   → { a: 1, b: 99, c: 3 }          ← a dan c tidak hilang
 */
function shallowMerge<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T> | undefined,
): T {
  if (!override) return base;
  const result = { ...base };
  for (const key of Object.keys(override) as Array<keyof T>) {
    const val = override[key];
    if (val !== undefined) {
      result[key] = val as T[keyof T];
    }
  }
  return result;
}

/**
 * mergeTheme — deep-merge customization di atas baseTheme.
 *
 * Precedence: CUSTOMIZATION > THEME DEFAULT
 *
 * Rules:
 * - customization = {} → return baseTheme as-is (fast path).
 * - Hanya field yang diisi di customization yang di-override.
 * - Nested objects (colors, fonts, backgrounds, couplePhoto)
 *   di-merge dengan shallowMerge sehingga partial override
 *   tidak menghapus field lain.
 * - baseTheme TIDAK dimutasi (immutable).
 *
 * Special mappings:
 * - customization.animation.intensity → animation.durationMultiplier
 * - customization.layout.couple → couplePhoto.shape
 */
export function mergeTheme(
  baseTheme: ThemeConfig,
  customization: ThemeCustomization,
): ThemeConfig {
  // Fast path: customization kosong → theme tidak berubah
  if (!customization || Object.keys(customization).length === 0) {
    return baseTheme;
  }

  // ── Colors ───────────────────────────────────────────────
  // Partial<ThemeColors> → setiap color yang diisi menggantikan
  // default, sisanya tetap dari baseTheme.colors
  const colors = shallowMerge(baseTheme.colors, customization.colors);

  // ── Fonts ────────────────────────────────────────────────
  const fonts = shallowMerge(baseTheme.fonts, customization.fonts);

  // ── Decoration ───────────────────────────────────────────
  // Hanya `enabled` yang bisa di-override lewat customization.
  // `style` dan `coverScheme` tetap milik theme (identitas visual).
  // topImage/bottomImage/cornerImage disimpan di customization
  // dan dibaca langsung oleh komponen ornament.
  const decoration = customization.decoration?.enabled !== undefined
    ? { ...baseTheme.decoration, enabled: customization.decoration.enabled }
    : baseTheme.decoration;

  // ── Animation ────────────────────────────────────────────
  // intensity string → numeric durationMultiplier via INTENSITY_MAP.
  // Jika tidak ada intensity override, pakai base animation.
  const animation = customization.animation?.intensity
    ? {
        ...baseTheme.animation,
        durationMultiplier: INTENSITY_MAP[customization.animation.intensity],
      }
    : baseTheme.animation;

  // ── Couple Photo ─────────────────────────────────────────
  // 1. Merge explicit couplePhoto overrides (borderWidth, borderColor)
  // 2. layout.couple override → couplePhoto.shape mapping
  //    'stacked' maps ke 'rectangle' karena stacked adalah concern
  //    layout (ditangani CSS), bukan concern shape foto.
  let couplePhoto = shallowMerge(baseTheme.couplePhoto, customization.couplePhoto);
  if (customization.layout?.couple) {
    const shape =
      customization.layout.couple === 'circle' ? ('circle' as const) : ('rectangle' as const);
    couplePhoto = { ...couplePhoto, shape };
  }

  // ── Backgrounds ──────────────────────────────────────────
  const backgrounds = shallowMerge(baseTheme.backgrounds, customization.backgrounds);

  // ── Gallery Caption Scheme ───────────────────────────────
  const galleryCaptionScheme =
    customization.galleryCaptionScheme ?? baseTheme.galleryCaptionScheme;

  // ── Assemble ─────────────────────────────────────────────
  // galleryGradients dan timelineGradients tidak di-override
  // karena mereka adalah array kompleks yang terikat ke palette
  // theme. Override individual warna sudah cukup.
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
