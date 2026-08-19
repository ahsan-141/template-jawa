// =============================================================
// LIB — Customization Schema (Zod)
// lib/theme/customizationSchema.ts
//
// Runtime validation untuk ThemeCustomization.
// Digunakan untuk memvalidasi data yang masuk dari form/API
// sebelum disimpan ke database.
//
// Semua field optional sesuai type aslinya.
// Enum values divalidasi ketat.
// =============================================================

import { z } from 'zod';

// ── SectionId ────────────────────────────────────────────────
export const SectionIdSchema = z.enum([
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
]);

// ── Layout variant enums ─────────────────────────────────────
const CoupleLayoutSchema = z.enum(['circle', 'rectangle', 'stacked']);
const GalleryLayoutSchema = z.enum(['slider', 'grid', 'editorial']);
const EventLayoutSchema = z.enum(['cards', 'editorial']);
const HeroLayoutSchema = z.enum(['centered', 'split']);

// ── Animation intensity enum ─────────────────────────────────
const AnimationIntensitySchema = z.enum(['subtle', 'normal', 'expressive']);

// ── Gallery caption scheme enum ──────────────────────────────
const GalleryCaptionSchemeSchema = z.enum(['dark', 'light', 'rose']);

// ── Couple photo shape enum ──────────────────────────────────
const CouplePhotoShapeSchema = z.enum(['circle', 'rectangle']);

// ── CSS color string — permissive (hex, rgb, rgba, hsl, named) ──
// Tidak overvalidate — biarkan browser yang handle.
const CssColorString = z.string().min(1);

// ── CSS value string (gradients, font-family, etc) ───────────
const CssValueString = z.string().min(1);

// ── Colors schema ────────────────────────────────────────────
// Partial<ThemeColors> — setiap color optional.
const ColorsSchema = z.object({
  primary:           CssColorString,
  primaryDark:       CssColorString,
  accent:            CssColorString,
  accentLight:       CssColorString,
  accentPale:        CssColorString,
  bg:                CssColorString,
  bgAlt:             CssColorString,
  bgDark:            CssColorString,
  bgDark2:           CssColorString,
  text:              CssColorString,
  textMuted:         CssColorString,
  textLight:         CssColorString,
  textOnDark:        CssColorString,
  accentOnDark:      CssColorString,
  cardBgOnDark:      CssColorString,
  borderOnDark:      CssColorString,
  coverText:         CssColorString,
  coverAccent:       CssColorString,
  coverSubtext:      CssColorString,
  coverButtonBorder: CssColorString,
  coverButtonHoverBg:CssColorString,
  border:            CssColorString,
  inputBorder:       CssColorString,
  inputText:         CssColorString,
  navBg:             CssColorString,
  navBorder:         CssColorString,
  navItemText:       CssColorString,
  navItemActiveText: CssColorString,
  navIndicatorBg:    CssColorString,
  navIndicatorBorder:CssColorString,
  musicBtnBg:        CssColorString,
  musicBtnBorder:    CssColorString,
}).partial();

// ── Fonts schema ─────────────────────────────────────────────
const FontsSchema = z.object({
  heading: CssValueString,
  body:    CssValueString,
}).partial();

// ── Decoration schema ────────────────────────────────────────
const DecorationSchema = z.object({
  enabled:     z.boolean(),
  topImage:    z.string(),
  bottomImage: z.string(),
  cornerImage: z.string(),
}).partial();

// ── Layout schema ────────────────────────────────────────────
const LayoutSchema = z.object({
  couple:  CoupleLayoutSchema,
  gallery: GalleryLayoutSchema,
  event:   EventLayoutSchema,
  hero:    HeroLayoutSchema,
}).partial();

// ── Sections visibility schema ───────────────────────────────
// Partial<Record<SectionId, boolean>>
const SectionsSchema = z.object({
  cover:     z.boolean(),
  hero:      z.boolean(),
  quote:     z.boolean(),
  couple:    z.boolean(),
  countdown: z.boolean(),
  event:     z.boolean(),
  location:  z.boolean(),
  gallery:   z.boolean(),
  loveStory: z.boolean(),
  gift:      z.boolean(),
  rsvp:      z.boolean(),
  wishes:    z.boolean(),
  closing:   z.boolean(),
}).partial();

// ── Animation schema ─────────────────────────────────────────
const AnimationSchema = z.object({
  intensity:           AnimationIntensitySchema,
  parallax:            z.boolean(),
  floatingDecorations: z.boolean(),
}).partial();

// ── Background schema ────────────────────────────────────────
const BackgroundSchema = z.object({
  image:   z.string(),
  overlay: CssColorString,
  opacity: z.number().min(0).max(1),
}).partial();

// ── Per-section backgrounds schema ───────────────────────────
const SectionBackgroundsSchema = z.object({
  cover:     CssValueString,
  hero:      CssValueString,
  quote:     CssValueString,
  couple:    CssValueString,
  countdown: CssValueString,
  events:    CssValueString,
  gallery:   CssValueString,
  loveStory: CssValueString,
  gift:      CssValueString,
  rsvp:      CssValueString,
  wishes:    CssValueString,
  closing:   CssValueString,
}).partial();

// ── Music schema ─────────────────────────────────────────────
const MusicSchema = z.object({
  source: z.string(),
}).partial();

// ── Couple photo schema ──────────────────────────────────────
const CouplePhotoSchema = z.object({
  shape:       CouplePhotoShapeSchema,
  borderWidth: z.number().min(0),
  borderColor: CssColorString,
}).partial();

// ══════════════════════════════════════════════════════════════
// MAIN SCHEMA — ThemeCustomizationSchema
// ══════════════════════════════════════════════════════════════
// Validates the complete ThemeCustomization structure.
// All top-level fields are optional.
// Enum values are strictly validated.
//
// Usage:
//   const result = ThemeCustomizationSchema.safeParse(dataFromApi);
//   if (result.success) {
//     const customization: ThemeCustomization = result.data;
//   } else {
//     console.error(result.error.issues);
//   }
// ══════════════════════════════════════════════════════════════

export const ThemeCustomizationSchema = z.object({
  colors:               ColorsSchema.optional(),
  fonts:                FontsSchema.optional(),
  decoration:           DecorationSchema.optional(),
  layout:               LayoutSchema.optional(),
  sections:             SectionsSchema.optional(),
  sectionOrder:         z.array(SectionIdSchema).optional(),
  animation:            AnimationSchema.optional(),
  background:           BackgroundSchema.optional(),
  backgrounds:          SectionBackgroundsSchema.optional(),
  music:                MusicSchema.optional(),
  couplePhoto:          CouplePhotoSchema.optional(),
  galleryCaptionScheme: GalleryCaptionSchemeSchema.optional(),
});

// ── Type inference ───────────────────────────────────────────
// Ini harus cocok dengan ThemeCustomization di types/customization.ts.
// Jika ada mismatch, TypeScript akan error di sini.
export type ValidatedCustomization = z.infer<typeof ThemeCustomizationSchema>;
