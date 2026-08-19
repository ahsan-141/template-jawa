// =============================================================
// THEME — Jawa Merah + Gold
// themes/jawa-merah.ts
//
// Semua nilai warna dan konfigurasi visual untuk tema Jawa Merah.
// Nilai-nilai ini identik dengan tampilan template awal.
// =============================================================

import type { ThemeConfig } from '@/types/theme';

export const jawaMerahTheme: ThemeConfig = {
  name: 'Jawa Merah + Gold',
  id: 'jawa-merah',

  // ── Colors ──────────────────────────────────────────────────
  colors: {
    primary: '#8B1A1A',
    primaryDark: '#4A0808',

    accent: '#C9A84C',
    accentLight: '#E8C97E',
    accentPale: '#F5E6B8',

    bg: '#FAF3E8',
    bgAlt: '#FFFBF5',
    bgDark: '#2C1810',
    bgDark2: '#4A0808',

    text: '#2C1810',
    textMuted: '#5C3D2E',
    textLight: '#8B6B5E',
    textOnDark: '#F5E6B8',
    accentOnDark: '#E8C97E',

    cardBgOnDark: 'rgba(255,251,245,0.06)',
    borderOnDark: 'rgba(201,168,76,0.2)',

    // Cover: dark scheme (gold on maroon)
    coverText: '#F5E6B8',
    coverAccent: '#C9A84C',
    coverSubtext: 'rgba(245,230,184,0.7)',
    coverButtonBorder: 'rgba(201,168,76,0.5)',
    coverButtonHoverBg: 'rgba(201,168,76,0.12)',

    border: 'rgba(201,168,76,0.15)',

    inputBorder: 'rgba(201,168,76,0.25)',
    inputText: '#F5E6B8',

    navBg: 'rgba(74,8,8,0.85)',
    navBorder: 'rgba(201,168,76,0.3)',
    navItemText: 'rgba(245,230,184,0.65)',
    navItemActiveText: '#FFFBF5',
    navIndicatorBg:
      'linear-gradient(135deg, rgba(201,168,76,0.3) 0%, rgba(139,26,26,0.6) 100%)',
    navIndicatorBorder: 'rgba(201,168,76,0.5)',

    musicBtnBg: 'linear-gradient(135deg, #8B1A1A 0%, #4A0808 100%)',
    musicBtnBorder: 'rgba(201,168,76,0.3)',
  },

  // ── Fonts ────────────────────────────────────────────────────
  fonts: {
    heading: "var(--font-cormorant), 'Georgia', serif",
    body: "var(--font-poppins), 'Helvetica Neue', sans-serif",
  },

  // ── Decoration ───────────────────────────────────────────────
  decoration: {
    enabled: true,
    style: 'jawa',
    coverScheme: 'dark',
  },

  // ── Animation ────────────────────────────────────────────────
  animation: {
    durationMultiplier: 1.0,
  },

  // ── Couple Photo ─────────────────────────────────────────────
  couplePhoto: {
    shape: 'circle',
    borderWidth: 2,
    borderColor: '#C9A84C',
  },

  // ── Section Backgrounds ──────────────────────────────────────
  backgrounds: {
    cover: '#4A0808',
    hero: '#FFFBF5',
    quote: 'linear-gradient(160deg, #4A0808 0%, #8B1A1A 100%)',
    couple: '#FAF3E8',
    countdown: 'linear-gradient(160deg, #2C1810 0%, #4A0808 100%)',
    events: '#FFFBF5',
    gallery: 'linear-gradient(160deg, #4A0808 0%, #2C1810 100%)',
    loveStory: '#FFFBF5',
    gift: '#FAF3E8',
    rsvp: 'linear-gradient(160deg, #4A0808 0%, #8B1A1A 100%)',
    wishes: '#FAF3E8',
    closing: 'linear-gradient(160deg, #4A0808 0%, #2C1810 100%)',
  },

  // ── Gallery Gradients ────────────────────────────────────────
  galleryGradients: [
    'linear-gradient(160deg, #5C0A0A 0%, #C9A84C 100%)',
    'linear-gradient(160deg, #2C1810 0%, #8B1A1A 100%)',
    'linear-gradient(160deg, #7A5714 0%, #4A0808 100%)',
    'linear-gradient(160deg, #4A0808 0%, #8B6914 100%)',
    'linear-gradient(160deg, #3D2B1F 0%, #C9A84C 100%)',
    'linear-gradient(160deg, #8B1A1A 0%, #3D2B1F 100%)',
  ],

  // ── Timeline Gradients ───────────────────────────────────────
  timelineGradients: [
    'linear-gradient(135deg, #5C0A0A 0%, #C9A84C 100%)',
    'linear-gradient(135deg, #7A5714 0%, #8B1A1A 100%)',
    'linear-gradient(135deg, #3D2B1F 0%, #C9A84C 100%)',
    'linear-gradient(135deg, #8B1A1A 0%, #4A0808 100%)',
  ],

  galleryCaptionScheme: 'dark',
};
