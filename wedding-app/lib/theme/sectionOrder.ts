// =============================================================
// LIB — Section Order & Visibility
// lib/theme/sectionOrder.ts
//
// resolveSectionOrder — menggabungkan partial custom order
//                       dengan DEFAULT_SECTION_ORDER.
// isSectionVisible    — cek apakah section harus dirender.
// =============================================================

import type { ThemeCustomization, SectionId } from '@/types/customization';
import { DEFAULT_SECTION_ORDER } from '@/types/customization';

/**
 * resolveSectionOrder — resolve custom partial order menjadi full order.
 *
 * ## Behavior
 *
 * 1. Jika `customization.sectionOrder` TIDAK diisi (undefined):
 *    → return DEFAULT_SECTION_ORDER langsung.
 *
 * 2. Jika diisi LENGKAP (13 section):
 *    → return apa adanya.
 *
 * 3. Jika diisi PARTIAL (tidak semua section disebutkan):
 *    → Section yang disebutkan di custom order menjadi "anchor".
 *    → Section yang TIDAK disebutkan tetap ditampilkan dan
 *      disisipkan berdasarkan posisi relatif mereka di DEFAULT_SECTION_ORDER.
 *
 * ## Algoritma Partial Order (stable merge)
 *
 * Contoh:
 *   DEFAULT: [A, B, C, D, E, F, G]
 *   CUSTOM (partial): [F, D]   ← user ingin F sebelum D
 *
 * Langkah:
 *   1. Mulai dengan result = [F, D] (section yang di-specify)
 *   2. Identifikasi missing sections: [A, B, C, E, G]
 *   3. Untuk tiap missing section (dalam urutan DEFAULT):
 *      a. Cari semua section yang muncul SEBELUMNYA di DEFAULT
 *      b. Dari predecessors tersebut, cari yang TERAKHIR muncul di result
 *      c. Sisipkan missing section TEPAT SETELAH predecessor tersebut
 *      d. Jika tidak ada predecessor di result → sisipkan di posisi 0
 *
 * Hasil: [A, B, C, F, D, E, G]
 *   - A, B, C tetap di depan (default order)
 *   - F sebelum D (custom order)
 *   - E, G tetap setelah D (default order)
 *
 * Contoh real:
 *   DEFAULT: [cover, hero, quote, couple, countdown, event, location, gallery, ...]
 *   CUSTOM:  [location, event]  ← user ingin location sebelum event
 *
 * Hasil: [cover, hero, quote, couple, countdown, location, event, gallery, ...]
 *   - Semua section sebelum event/location tetap di depan
 *   - location dipindah sebelum event
 *   - Semua section setelahnya tetap mengikuti
 */
export function resolveSectionOrder(
  customization: ThemeCustomization,
): SectionId[] {
  const customOrder = customization.sectionOrder;

  // Case 1: tidak ada custom order → gunakan default
  if (!customOrder || customOrder.length === 0) {
    return DEFAULT_SECTION_ORDER;
  }

  // Case 2: custom order lengkap → gunakan langsung
  // (deduplicate dan filter hanya SectionId yang valid)
  const validCustom = deduplicateValid(customOrder);
  if (validCustom.length === DEFAULT_SECTION_ORDER.length) {
    return validCustom;
  }

  // Case 3: partial order → stable merge dengan default
  return stableMerge(validCustom);
}

/**
 * stableMerge — sisipkan section yang tidak disebutkan di custom order
 * ke posisi "natural" mereka berdasarkan DEFAULT_SECTION_ORDER.
 *
 * Invariant: section yang ada di customOrder mempertahankan urutan
 * relatif mereka. Section yang tidak ada disisipkan tanpa mengubah
 * urutan relatif section yang sudah di-specify.
 */
function stableMerge(customOrder: SectionId[]): SectionId[] {
  const specified = new Set(customOrder);
  const result = [...customOrder];

  // Ambil section yang TIDAK disebutkan, dalam urutan DEFAULT
  const missing = DEFAULT_SECTION_ORDER.filter((id) => !specified.has(id));

  for (const section of missing) {
    // Cari posisi default section ini
    const defaultIndex = DEFAULT_SECTION_ORDER.indexOf(section);

    // Cari semua section yang muncul SEBELUM section ini di DEFAULT
    const predecessors = DEFAULT_SECTION_ORDER.slice(0, defaultIndex);

    // Dari predecessors, cari yang TERAKHIR muncul di result saat ini
    let insertAfter = -1;
    for (const pred of predecessors) {
      const idx = result.indexOf(pred);
      if (idx > insertAfter) {
        insertAfter = idx;
      }
    }

    // Sisipkan tepat setelah predecessor terakhir.
    // Jika tidak ada predecessor di result → sisipkan di awal.
    result.splice(insertAfter + 1, 0, section);
  }

  return result;
}

/**
 * deduplicateValid — hapus duplikat dan filter hanya SectionId yang valid.
 */
function deduplicateValid(order: SectionId[]): SectionId[] {
  const validSet = new Set(DEFAULT_SECTION_ORDER);
  const seen = new Set<SectionId>();
  const result: SectionId[] = [];

  for (const id of order) {
    if (validSet.has(id) && !seen.has(id)) {
      seen.add(id);
      result.push(id);
    }
  }

  return result;
}

// ── Section Visibility ───────────────────────────────────────

/**
 * isSectionVisible — cek apakah section harus dirender.
 *
 * Default: true (visible).
 * Hanya false jika customization.sections[sectionId] === false.
 * undefined / tidak disebutkan = visible.
 */
export function isSectionVisible(
  sectionId: SectionId,
  customization: ThemeCustomization,
): boolean {
  if (!customization.sections) return true;
  const value = customization.sections[sectionId];
  // undefined → default visible. Hanya explicit false → hidden.
  return value !== false;
}
