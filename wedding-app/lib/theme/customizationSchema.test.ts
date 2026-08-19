// =============================================================
// TEST — customizationSchema (Zod)
// lib/theme/customizationSchema.test.ts
//
// Unit test untuk runtime validation Zod schema.
// Jalankan: npx tsx lib/theme/customizationSchema.test.ts
// =============================================================

import { ThemeCustomizationSchema } from './customizationSchema';

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

// ── Test 1: Empty object is valid ────────────────────────────
console.log('\nTest 1: Empty object is valid');
{
  const res = ThemeCustomizationSchema.safeParse({});
  assert(res.success === true, 'Empty object passes validation');
}

// ── Test 2: Valid partial customization ───────────────────────
console.log('\nTest 2: Valid partial customization');
{
  const data = {
    colors: { accent: '#D4AF37' },
    layout: { gallery: 'editorial', couple: 'rectangle' },
    sections: { quote: false, rsvp: true },
    animation: { intensity: 'subtle', parallax: true },
  };
  const res = ThemeCustomizationSchema.safeParse(data);
  assert(res.success === true, 'Valid partial customization passes');
}

// ── Test 3: Invalid layout enum fails ────────────────────────
console.log('\nTest 3: Invalid enum fails');
{
  const data = {
    layout: { gallery: 'invalid_gallery_layout' },
  };
  const res = ThemeCustomizationSchema.safeParse(data);
  assert(res.success === false, 'Invalid gallery layout rejected');
}

// ── Test 4: Invalid SectionId in sectionOrder fails ──────────
console.log('\nTest 4: Invalid SectionId in sectionOrder fails');
{
  const data = {
    sectionOrder: ['hero', 'not_a_valid_section'],
  };
  const res = ThemeCustomizationSchema.safeParse(data);
  assert(res.success === false, 'Invalid section in sectionOrder rejected');
}

// ── Test 5: Invalid animation intensity fails ────────────────
console.log('\nTest 5: Invalid animation intensity fails');
{
  const data = {
    animation: { intensity: 'super_fast' },
  };
  const res = ThemeCustomizationSchema.safeParse(data);
  assert(res.success === false, 'Invalid intensity rejected');
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ All customizationSchema tests passed!');
}
