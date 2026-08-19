// =============================================================
// TEST — mergeTheme
// lib/theme/mergeTheme.test.ts
//
// Unit test sederhana. Jalankan: npx tsx lib/theme/mergeTheme.test.ts
// Membuktikan bahwa partial override TIDAK menghapus field lain.
// =============================================================

import { mergeTheme } from './mergeTheme';
import { jawaMerahTheme } from '@/themes/jawa-merah';
import type { ThemeCustomization } from '@/types/customization';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// ── Test 1: Empty customization → identical output ───────────
console.log('\nTest 1: Empty customization returns base theme');
{
  const result = mergeTheme(jawaMerahTheme, {});
  assert(result === jawaMerahTheme, 'Should return exact same object reference');
  assert(result.colors.primary === '#8B1A1A', 'Primary color preserved');
  assert(result.colors.accent === '#C9A84C', 'Accent color preserved');
}

// ── Test 2: Partial color override keeps other colors ────────
console.log('\nTest 2: Partial color override does NOT delete other colors');
{
  const customization: ThemeCustomization = {
    colors: {
      accent: '#D4AF37',
    },
  };
  const result = mergeTheme(jawaMerahTheme, customization);

  assert(result.colors.accent === '#D4AF37', 'Accent overridden to #D4AF37');
  assert(result.colors.primary === '#8B1A1A', 'Primary preserved from base');
  assert(result.colors.primaryDark === '#4A0808', 'primaryDark preserved');
  assert(result.colors.accentLight === '#E8C97E', 'accentLight preserved');
  assert(result.colors.bg === '#FAF3E8', 'bg preserved');
  assert(result.colors.text === '#2C1810', 'text preserved');
  assert(result.colors.coverText === '#F5E6B8', 'coverText preserved');
  assert(result.colors.navBg === 'rgba(74,8,8,0.85)', 'navBg preserved');
  assert(result.colors.musicBtnBg !== undefined, 'musicBtnBg not deleted');
}

// ── Test 3: Partial backgrounds override keeps others ────────
console.log('\nTest 3: Partial backgrounds override keeps other sections');
{
  const customization: ThemeCustomization = {
    backgrounds: {
      cover: '#000000',
    },
  };
  const result = mergeTheme(jawaMerahTheme, customization);

  assert(result.backgrounds.cover === '#000000', 'cover bg overridden');
  assert(result.backgrounds.hero === '#FFFBF5', 'hero bg preserved');
  assert(result.backgrounds.quote === jawaMerahTheme.backgrounds.quote, 'quote bg preserved');
  assert(result.backgrounds.gallery === jawaMerahTheme.backgrounds.gallery, 'gallery bg preserved');
  assert(result.backgrounds.closing === jawaMerahTheme.backgrounds.closing, 'closing bg preserved');
}

// ── Test 4: Intensity mapping ────────────────────────────────
console.log('\nTest 4: Animation intensity maps to durationMultiplier');
{
  const subtle = mergeTheme(jawaMerahTheme, { animation: { intensity: 'subtle' } });
  const normal = mergeTheme(jawaMerahTheme, { animation: { intensity: 'normal' } });
  const expressive = mergeTheme(jawaMerahTheme, { animation: { intensity: 'expressive' } });

  assert(subtle.animation.durationMultiplier === 1.5, 'subtle → 1.5');
  assert(normal.animation.durationMultiplier === 1.0, 'normal → 1.0');
  assert(expressive.animation.durationMultiplier === 0.7, 'expressive → 0.7');
}

// ── Test 5: Couple layout → shape mapping ────────────────────
console.log('\nTest 5: layout.couple maps to couplePhoto.shape');
{
  const rect = mergeTheme(jawaMerahTheme, { layout: { couple: 'rectangle' } });
  const circle = mergeTheme(jawaMerahTheme, { layout: { couple: 'circle' } });
  const stacked = mergeTheme(jawaMerahTheme, { layout: { couple: 'stacked' } });

  assert(rect.couplePhoto.shape === 'rectangle', 'rectangle → rectangle');
  assert(circle.couplePhoto.shape === 'circle', 'circle → circle');
  assert(stacked.couplePhoto.shape === 'rectangle', 'stacked → rectangle');
  // borderWidth dan borderColor harus tetap
  assert(rect.couplePhoto.borderWidth === 2, 'borderWidth preserved');
  assert(rect.couplePhoto.borderColor === '#C9A84C', 'borderColor preserved');
}

// ── Test 6: baseTheme TIDAK dimutasi ─────────────────────────
console.log('\nTest 6: baseTheme is NOT mutated');
{
  const originalAccent = jawaMerahTheme.colors.accent;
  mergeTheme(jawaMerahTheme, { colors: { accent: '#FF0000' } });

  assert(jawaMerahTheme.colors.accent === originalAccent, 'baseTheme.colors.accent unchanged');
}

// ── Test 7: Multiple overrides at once ───────────────────────
console.log('\nTest 7: Multiple simultaneous overrides');
{
  const customization: ThemeCustomization = {
    colors: { primary: '#111111', accent: '#222222' },
    fonts: { heading: 'Comic Sans' },
    layout: { couple: 'rectangle' },
    animation: { intensity: 'expressive' },
    backgrounds: { hero: '#333333' },
    galleryCaptionScheme: 'light',
  };
  const result = mergeTheme(jawaMerahTheme, customization);

  assert(result.colors.primary === '#111111', 'primary overridden');
  assert(result.colors.accent === '#222222', 'accent overridden');
  assert(result.colors.bg === '#FAF3E8', 'bg preserved');
  assert(result.fonts.heading === 'Comic Sans', 'heading font overridden');
  assert(result.fonts.body === jawaMerahTheme.fonts.body, 'body font preserved');
  assert(result.couplePhoto.shape === 'rectangle', 'couple shape overridden');
  assert(result.animation.durationMultiplier === 0.7, 'animation expressive');
  assert(result.backgrounds.hero === '#333333', 'hero bg overridden');
  assert(result.backgrounds.couple === '#FAF3E8', 'couple bg preserved');
  assert(result.galleryCaptionScheme === 'light', 'caption scheme overridden');
  assert(result.name === 'Jawa Merah + Gold', 'name preserved');
  assert(result.id === 'jawa-merah', 'id preserved');
}

// ── Summary ──────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.error('❌ Some tests failed!');
  process.exit(1);
} else {
  console.log('✅ All tests passed!');
}
