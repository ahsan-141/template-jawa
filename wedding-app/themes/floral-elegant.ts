// =============================================================
// THEME — Floral Elegant
// themes/floral-elegant.ts
//
// Romantic, soft, botanical, editorial, luxurious.
// Tidak ada ornamen Jawa. Tidak ada batik.
// Dekorasi: botanical SVG corners + petal particles.
// Typography: Cormorant Garamond (heading) + Inter (body).
// =============================================================

import type { ThemeConfig } from '@/types/theme';

export const floralElegantTheme: ThemeConfig = {
  name: 'Floral Elegant',
  id: 'floral-elegant',

  // ── Colors ──────────────────────────────────────────────────
  colors: {
    // Primary: dusky rose — warm, feminine, premium
    primary: '#8F6670',
    primaryDark: '#6E4D55',

    // Accent: soft mauve
    accent: '#C9A6AC',
    accentLight: '#DBBFC4',
    accentPale: '#F0E6E8',

    // Light section backgrounds
    bg: '#FBF7F3',        // warm cream
    bgAlt: '#FFFFFF',

    // Dark section backgrounds (RSVP, Countdown, Quote, Closing)
    bgDark: '#2D2829',    // warm dark — NOT cold charcoal
    bgDark2: '#3A3233',

    // Text on light
    text: '#2D2829',
    textMuted: '#7B7173',
    textLight: '#A89899',

    // Text on dark sections
    textOnDark: '#F5EEF0',
    accentOnDark: '#DBBFC4',

    // Glass cards on dark sections
    cardBgOnDark: 'rgba(255,245,247,0.05)',
    borderOnDark: 'rgba(201,166,172,0.2)',

    // Cover: floral scheme (warm cream bg, rose text + botanical)
    coverText: '#2D2829',
    coverAccent: '#C9A6AC',
    coverSubtext: '#7B7173',
    coverButtonBorder: 'rgba(143,102,112,0.25)',
    coverButtonHoverBg: 'rgba(143,102,112,0.06)',

    // Light section borders
    border: 'rgba(201,166,172,0.18)',

    // Form inputs (on dark RSVP bg)
    inputBorder: 'rgba(201,166,172,0.25)',
    inputText: '#F5EEF0',

    // Floating nav — warm dark translucent
    navBg: 'rgba(45,40,41,0.9)',
    navBorder: 'rgba(201,166,172,0.25)',
    navItemText: 'rgba(245,238,240,0.55)',
    navItemActiveText: '#F5EEF0',
    navIndicatorBg: 'rgba(201,166,172,0.15)',
    navIndicatorBorder: 'rgba(201,166,172,0.4)',

    // Music player button
    musicBtnBg: '#2D2829',
    musicBtnBorder: 'rgba(201,166,172,0.3)',
  },

  // ── Fonts ────────────────────────────────────────────────────
  fonts: {
    heading: "var(--font-cormorant), 'Georgia', serif",
    body: "var(--font-inter), var(--font-poppins), 'Helvetica Neue', sans-serif",
  },

  // ── Decoration ───────────────────────────────────────────────
  decoration: {
    enabled: true,
    style: 'floral',
    coverScheme: 'floral',  // cream bg, rose text, botanical corners
  },

  // ── Animation — slow & organic ───────────────────────────────
  animation: {
    durationMultiplier: 1.2,
  },

  // ── Couple Photo — portrait rectangle, thin rose border ──────
  couplePhoto: {
    shape: 'rectangle',
    borderWidth: 1,
    borderColor: 'rgba(201,166,172,0.4)',
  },

  // ── Section Backgrounds ──────────────────────────────────────
  backgrounds: {
    cover: '#FBF7F3',                                    // warm cream
    hero: '#FFFFFF',
    quote: '#2D2829',                                    // warm dark
    couple: '#FBF7F3',
    countdown: '#3A3233',                                // warm dark alt
    events: '#FFFFFF',
    gallery: '#FBF7F3',                                  // light — editorial feel
    loveStory: '#FFFFFF',
    gift: '#FBF7F3',
    rsvp: '#2D2829',                                     // warm dark
    wishes: '#FBF7F3',
    closing: '#2D2829',
  },

  // ── Gallery Gradients — soft warm botanical tones ────────────
  galleryGradients: [
    'linear-gradient(160deg, #F0E6E8 0%, #E8DDD5 100%)',
    'linear-gradient(160deg, #E8DDD5 0%, #DBBFC4 100%)',
    'linear-gradient(160deg, #D4E0CF 0%, #C9A6AC 100%)',  // sage → rose
    'linear-gradient(160deg, #C9A6AC 0%, #E8DDD5 100%)',
    'linear-gradient(160deg, #E8DDD5 0%, #D4E0CF 100%)',  // cream → sage
    'linear-gradient(160deg, #DBBFC4 0%, #F0E6E8 100%)',
  ],

  // ── Timeline Gradients ───────────────────────────────────────
  timelineGradients: [
    'linear-gradient(135deg, #F0E6E8 0%, #DBBFC4 100%)',
    'linear-gradient(135deg, #D4E0CF 0%, #C9A6AC 100%)',
    'linear-gradient(135deg, #E8DDD5 0%, #DBBFC4 100%)',
    'linear-gradient(135deg, #DBBFC4 0%, #D4E0CF 100%)',
  ],

  galleryCaptionScheme: 'rose',
};
