// =============================================================
// DATA — Customization Examples
// data/customization-examples.ts
//
// Contoh konfigurasi customization untuk development & testing.
// Masing-masing menunjukkan skenario berbeda:
// 1. Default (tanpa override)
// 2. Jawa Gold Custom (color + layout overrides)
// 3. Minimalist Custom (accent + gallery grid + hide sections)
// 4. Floral Custom (animation subtle + gallery grid + reorder)
// =============================================================

import type { ThemeCustomization } from '@/types/customization';

export type CustomizationExample = {
  id: string;
  name: string;
  description: string;
  themeId: string;
  customization: ThemeCustomization;
};

export const customizationExamples: CustomizationExample[] = [
  // ── 1. Default ──────────────────────────────────────────────
  {
    id: 'default',
    name: 'Jawa Merah Default',
    description: 'Theme Jawa Merah tanpa customization apapun.',
    themeId: 'jawa-merah',
    customization: {},
  },

  // ── 2. Jawa Gold Custom ─────────────────────────────────────
  {
    id: 'jawa-gold',
    name: 'Jawa Gold Custom',
    description: 'Jawa Merah dengan accent gold darker, couple rectangle, gallery editorial.',
    themeId: 'jawa-merah',
    customization: {
      colors: {
        accent: '#D4AF37',
        accentLight: '#E8C97E',
        accentPale: '#F5E6B8',
        primary: '#9B7A38',
      },
      layout: {
        couple: 'rectangle',
        gallery: 'editorial',
      },
      sections: {
        quote: true,
        loveStory: true,
      },
      animation: {
        intensity: 'normal',
      },
    },
  },

  // ── 3. Minimalist Custom ────────────────────────────────────
  {
    id: 'minimalist-custom',
    name: 'Minimalist Custom',
    description: 'Minimalist dengan accent warm, gallery grid, tanpa quote dan love story.',
    themeId: 'minimalist',
    customization: {
      colors: {
        accent: '#8C7A7A',
        accentLight: '#A89898',
      },
      layout: {
        gallery: 'grid',
      },
      sections: {
        quote: false,
        loveStory: false,
      },
      animation: {
        intensity: 'subtle',
      },
    },
  },

  // ── 4. Floral Custom ────────────────────────────────────────
  {
    id: 'floral-custom',
    name: 'Floral Custom',
    description: 'Floral Elegant dengan gallery grid, animation subtle, urutan section diubah (location sebelum event).',
    themeId: 'floral-elegant',
    customization: {
      layout: {
        gallery: 'grid',
      },
      sections: {
        gift: false,
      },
      sectionOrder: [
        'cover',
        'hero',
        'quote',
        'couple',
        'countdown',
        'location',   // ← sebelum event
        'event',       // ← setelah location
        'gallery',
        'loveStory',
        'gift',
        'rsvp',
        'wishes',
        'closing',
      ],
      animation: {
        intensity: 'subtle',
        parallax: false,
        floatingDecorations: false,
      },
    },
  },

  // ── 5. Reordered Sections ───────────────────────────────────
  {
    id: 'reordered',
    name: 'Jawa Merah — Reordered',
    description: 'Jawa Merah dengan urutan section yang diubah: Gallery sebelum Couple.',
    themeId: 'jawa-merah',
    customization: {
      sectionOrder: [
        'cover',
        'hero',
        'quote',
        'gallery',     // ← dipindah ke atas
        'couple',      // ← setelah gallery
        'countdown',
        'event',
        'location',
        'loveStory',
        'gift',
        'rsvp',
        'wishes',
        'closing',
      ],
    },
  },
];
