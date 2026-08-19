// =============================================================
// TYPES — Theme Configuration
// types/theme.ts
//
// ThemeConfig mendefinisikan semua visual token untuk satu tema.
// Tambahkan properti baru di sini jika dibutuhkan oleh tema baru.
// =============================================================

// ── Colors ──────────────────────────────────────────────────
export type ThemeColors = {
  // Primary brand color
  primary: string;         // e.g. #8B1A1A (maroon) / #1A1A1A (dark)
  primaryDark: string;     // e.g. #4A0808 / #111111

  // Accent / highlight
  accent: string;          // e.g. #C9A84C (gold) / #A0A0A0 (gray)
  accentLight: string;     // e.g. #E8C97E / #C0C0C0
  accentPale: string;      // e.g. #F5E6B8 / #F0F0F0

  // Light section backgrounds
  bg: string;              // e.g. #FAF3E8 (cream) / #F8F7F3
  bgAlt: string;           // e.g. #FFFBF5 (ivory) / #FFFFFF

  // Dark section backgrounds (used in gradient strings)
  bgDark: string;          // darker stop
  bgDark2: string;         // lighter stop for gradient end

  // Text on LIGHT sections
  text: string;            // e.g. #2C1810 / #1A1A1A
  textMuted: string;       // e.g. #5C3D2E / #777777
  textLight: string;       // e.g. #8B6B5E / #999999

  // Text / accent on DARK sections
  textOnDark: string;      // e.g. #F5E6B8 / #F8F7F3
  accentOnDark: string;    // e.g. #E8C97E / #A0A0A0

  // Glass cards on dark sections
  cardBgOnDark: string;    // e.g. rgba(255,251,245,0.06)
  borderOnDark: string;    // e.g. rgba(201,168,76,0.2)

  // Cover screen colors
  coverText: string;       // names / main text on cover
  coverAccent: string;     // accent on cover
  coverSubtext: string;    // muted/secondary on cover
  coverButtonBorder: string;
  coverButtonHoverBg: string;

  // Light section borders
  border: string;          // e.g. rgba(201,168,76,0.15)

  // Form inputs
  inputBorder: string;
  inputText: string;       // text color inside inputs (on dark rsvp bg)

  // Floating nav
  navBg: string;
  navBorder: string;
  navItemText: string;
  navItemActiveText: string;
  navIndicatorBg: string;
  navIndicatorBorder: string;

  // Music player button
  musicBtnBg: string;
  musicBtnBorder: string;
};

// ── Fonts ────────────────────────────────────────────────────
export type ThemeFonts = {
  heading: string;   // CSS font-family string
  body: string;      // CSS font-family string
};

// ── Decoration ───────────────────────────────────────────────
export type ThemeDecoration = {
  /** Master switch — false = no ornaments, patterns, or Jawa motifs */
  enabled: boolean;
  /** Discriminant for which decoration style to render:
   *  'jawa'   = batik patterns, lotus/CoverOrnament SVGs, gold particles
   *  'floral' = botanical SVG corners, petal particles, rose accents
   *  'none'   = no decorative elements */
  style: 'jawa' | 'floral' | 'none';
  /** 'dark'   = dark bg on cover + light text (Jawa Merah)
   *  'light'  = light bg on cover + dark text (Minimalist)
   *  'floral' = warm cream bg + dusky rose text + botanical corners */
  coverScheme: 'dark' | 'light' | 'floral';
};

// ── Animation ────────────────────────────────────────────────
export type ThemeAnimation = {
  /** Multiplier applied to all motion durations. 1.0 = default speed. */
  durationMultiplier: number;
};

// ── Couple Photo ─────────────────────────────────────────────
export type ThemeCouplePhoto = {
  shape: 'circle' | 'rectangle';
  borderWidth: number;
  borderColor: string;
};

// ── Per-section Backgrounds ───────────────────────────────────
export type SectionBackgrounds = {
  cover: string;
  hero: string;
  quote: string;
  couple: string;
  countdown: string;
  events: string;
  gallery: string;
  loveStory: string;
  gift: string;
  rsvp: string;
  wishes: string;
  closing: string;
};

// ── Main ThemeConfig ─────────────────────────────────────────
export type ThemeConfig = {
  name: string;
  id: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  decoration: ThemeDecoration;
  animation: ThemeAnimation;
  couplePhoto: ThemeCouplePhoto;
  backgrounds: SectionBackgrounds;
  /** Gradient strings for gallery placeholder slots */
  galleryGradients: string[];
  /** Gradient strings for love story timeline photo placeholder slots */
  timelineGradients: string[];
  /** Controls gallery caption overlay color scheme:
   *  'dark'  = dark gradient + light text (Jawa Merah)
   *  'light' = white gradient + dark text (Minimalist)
   *  'rose'  = soft rose/cream gradient + warm text (Floral Elegant) */
  galleryCaptionScheme: 'dark' | 'light' | 'rose';
};
