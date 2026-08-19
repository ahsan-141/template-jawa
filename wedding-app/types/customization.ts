// =============================================================
// TYPES — Theme Customization
// types/customization.ts
//
// ThemeCustomization mendefinisikan override spesifik customer.
// Semua properti optional — customer hanya menyimpan field yang
// berbeda dari theme default.
//
// Serializable: tidak menyimpan function, React component,
// atau object kompleks. Future-proof untuk database JSON.
// =============================================================

import type {
  ThemeColors,
  ThemeFonts,
  ThemeCouplePhoto,
  SectionBackgrounds,
  ThemeConfig,
} from './theme';

// ── Section Identifiers ──────────────────────────────────────
// Semua section yang ada di invitation, termasuk section "inti".
// Semuanya bisa di-hide dan di-reorder via customization.
export type SectionId =
  | 'cover'
  | 'hero'
  | 'quote'
  | 'couple'
  | 'countdown'
  | 'event'
  | 'location'
  | 'gallery'
  | 'loveStory'
  | 'gift'
  | 'rsvp'
  | 'wishes'
  | 'closing';

// ── Default section order ────────────────────────────────────
export const DEFAULT_SECTION_ORDER: SectionId[] = [
  'cover',
  'hero',
  'quote',
  'couple',
  'countdown',
  'event',
  'location',
  'gallery',
  'loveStory',
  'gift',
  'rsvp',
  'wishes',
  'closing',
];

// ── Theme Customization ──────────────────────────────────────
export type ThemeCustomization = {
  // ── Color overrides ──────────────────────────────────────
  // Partial ThemeColors — hanya field yang diisi yang di-override.
  colors?: Partial<ThemeColors>;

  // ── Typography overrides ─────────────────────────────────
  fonts?: Partial<ThemeFonts>;

  // ── Decoration / ornament overrides ──────────────────────
  decoration?: {
    enabled?: boolean;
    topImage?: string;      // custom top ornament asset path
    bottomImage?: string;   // custom bottom ornament asset path
    cornerImage?: string;   // custom corner ornament asset path
  };

  // ── Layout variant overrides ─────────────────────────────
  layout?: {
    couple?: 'circle' | 'rectangle' | 'stacked';
    gallery?: 'slider' | 'grid' | 'editorial';
    event?: 'cards' | 'editorial';
    hero?: 'centered' | 'split';
  };

  // ── Section visibility ───────────────────────────────────
  // Boolean per section. Default: true (visible).
  // Jika false → section tidak dirender.
  sections?: Partial<Record<SectionId, boolean>>;

  // ── Section ordering ─────────────────────────────────────
  // Array SectionId yang menentukan urutan section.
  // Jika tidak diisi → gunakan DEFAULT_SECTION_ORDER.
  // Section yang ada di sini tetapi sections[id] = false
  // akan di-skip saat render.
  sectionOrder?: SectionId[];

  // ── Animation overrides ──────────────────────────────────
  animation?: {
    intensity?: 'subtle' | 'normal' | 'expressive';
    parallax?: boolean;
    floatingDecorations?: boolean;
  };

  // ── Background overrides ─────────────────────────────────
  background?: {
    image?: string;         // custom background image path
    overlay?: string;       // overlay color/gradient
    opacity?: number;       // overlay opacity (0–1)
  };

  // ── Per-section background overrides ─────────────────────
  backgrounds?: Partial<SectionBackgrounds>;

  // ── Music override ───────────────────────────────────────
  music?: {
    source?: string;        // custom music file path
  };

  // ── Couple photo overrides ───────────────────────────────
  couplePhoto?: Partial<ThemeCouplePhoto>;

  // ── Gallery caption scheme override ──────────────────────
  galleryCaptionScheme?: 'dark' | 'light' | 'rose';
};

// ── Resolved Theme Context ───────────────────────────────────
// Disediakan oleh ThemeProvider. Komponen bisa akses:
// - baseTheme: theme default (immutable)
// - customization: override object
// - resolvedTheme: hasil merge (yang dipakai untuk rendering)
// - isSectionVisible: helper function
// - sectionOrder: urutan section final
export type ResolvedThemeContext = {
  baseTheme: ThemeConfig;
  customization: ThemeCustomization;
  resolvedTheme: ThemeConfig;
  isSectionVisible: (section: SectionId) => boolean;
  sectionOrder: SectionId[];
};
