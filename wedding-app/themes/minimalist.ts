// =============================================================
// THEME — Minimalist
// themes/minimalist.ts
//
// Clean, editorial, luxurious.
// Tidak ada ornamen tradisional, tidak ada batik.
// Fokus pada tipografi besar, whitespace, dan garis tipis.
// =============================================================

import type { ThemeConfig } from '@/types/theme';

export const minimalistTheme: ThemeConfig = {
  name: 'Minimalist',
  id: 'minimalist',

  // ── Colors ──────────────────────────────────────────────────
  colors: {
    primary: '#1A1A1A',
    primaryDark: '#111111',

    accent: '#A0A0A0',
    accentLight: '#C0C0C0',
    accentPale: '#EEEEEE',

    bg: '#F8F7F3',
    bgAlt: '#FFFFFF',
    bgDark: '#111111',
    bgDark2: '#1A1A1A',

    text: '#1A1A1A',
    textMuted: '#777777',
    textLight: '#999999',
    textOnDark: '#F8F7F3',
    accentOnDark: '#A0A0A0',

    cardBgOnDark: 'rgba(255,255,255,0.04)',
    borderOnDark: 'rgba(160,160,160,0.2)',

    // Cover: light scheme (dark text on cream)
    coverText: '#1A1A1A',
    coverAccent: '#A0A0A0',
    coverSubtext: '#777777',
    coverButtonBorder: 'rgba(26,26,26,0.2)',
    coverButtonHoverBg: 'rgba(26,26,26,0.05)',

    border: 'rgba(26,26,26,0.1)',

    inputBorder: 'rgba(160,160,160,0.25)',
    inputText: '#F8F7F3',

    navBg: 'rgba(17,17,17,0.92)',
    navBorder: 'rgba(160,160,160,0.2)',
    navItemText: 'rgba(248,247,243,0.55)',
    navItemActiveText: '#F8F7F3',
    navIndicatorBg: 'rgba(160,160,160,0.12)',
    navIndicatorBorder: 'rgba(160,160,160,0.4)',

    musicBtnBg: '#1A1A1A',
    musicBtnBorder: 'rgba(160,160,160,0.25)',
  },

  // ── Fonts ────────────────────────────────────────────────────
  fonts: {
    heading: "var(--font-cormorant), 'Georgia', serif",
    body: "var(--font-inter), var(--font-poppins), 'Helvetica Neue', sans-serif",
  },

  // ── Decoration ───────────────────────────────────────────────
  decoration: {
    enabled: false,      // tidak ada ornamen Jawa
    style: 'none',
    coverScheme: 'light', // cover terang: cream bg, dark text
  },

  // ── Animation ─── lebih lambat, lebih subtle ─────────────────
  animation: {
    durationMultiplier: 1.3,
  },

  // ── Couple Photo ─────────────────────────────────────────────
  couplePhoto: {
    shape: 'rectangle',
    borderWidth: 1,
    borderColor: 'rgba(26,26,26,0.1)',
  },

  // ── Section Backgrounds ──────────────────────────────────────
  backgrounds: {
    cover: '#F8F7F3',
    hero: '#FFFFFF',
    quote: '#1A1A1A',
    couple: '#FFFFFF',
    countdown: '#111111',
    events: '#F8F7F3',
    gallery: '#FAFAFA',
    loveStory: '#F8F7F3',
    gift: '#FFFFFF',
    rsvp: '#1A1A1A',
    wishes: '#F8F7F3',
    closing: '#111111',
  },

  // ── Gallery Gradients ─── neutral grays ──────────────────────
  galleryGradients: [
    'linear-gradient(160deg, #EEECEA 0%, #E4E3DF 100%)',
    'linear-gradient(160deg, #E4E3DF 0%, #EEECEA 100%)',
    'linear-gradient(160deg, #E8E7E3 0%, #DCDBD7 100%)',
    'linear-gradient(160deg, #F0EFEB 0%, #E8E7E3 100%)',
    'linear-gradient(160deg, #DCDBD7 0%, #EEECEA 100%)',
    'linear-gradient(160deg, #E8E7E3 0%, #F0EFEB 100%)',
  ],

  // ── Timeline Gradients ───────────────────────────────────────
  timelineGradients: [
    'linear-gradient(135deg, #EEECEA 0%, #E4E3DF 100%)',
    'linear-gradient(135deg, #E4E3DF 0%, #EEECEA 100%)',
    'linear-gradient(135deg, #E8E7E3 0%, #DCDBD7 100%)',
    'linear-gradient(135deg, #F0EFEB 0%, #E8E7E3 100%)',
  ],

  galleryCaptionScheme: 'light',
};
