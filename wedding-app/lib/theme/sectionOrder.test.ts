// =============================================================
// TEST — sectionOrder
// lib/theme/sectionOrder.test.ts
//
// Unit test untuk resolveSectionOrder & isSectionVisible.
// Jalankan: npx tsx lib/theme/sectionOrder.test.ts
// =============================================================

import { resolveSectionOrder, isSectionVisible } from './sectionOrder';
import { DEFAULT_SECTION_ORDER, SectionId } from '@/types/customization';

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

// ── Test 1: Undefined / empty sectionOrder ───────────────────
console.log('\nTest 1: Undefined / empty sectionOrder returns DEFAULT_SECTION_ORDER');
{
  const r1 = resolveSectionOrder({});
  assert(r1 === DEFAULT_SECTION_ORDER, 'undefined order returns exact DEFAULT reference');
  const r2 = resolveSectionOrder({ sectionOrder: [] });
  assert(r2 === DEFAULT_SECTION_ORDER, 'empty array returns exact DEFAULT reference');
}

// ── Test 2: Full custom sectionOrder ─────────────────────────
console.log('\nTest 2: Full custom sectionOrder is respected');
{
  const reversed = [...DEFAULT_SECTION_ORDER].reverse();
  const res = resolveSectionOrder({ sectionOrder: reversed });
  assert(res[0] === 'closing' && res[res.length - 1] === 'cover', 'Full reverse order preserved');
}

// ── Test 3: Partial custom sectionOrder (location before event)
console.log('\nTest 3: Partial order: location before event');
{
  const res = resolveSectionOrder({ sectionOrder: ['location', 'event'] });
  
  const locIdx = res.indexOf('location');
  const evtIdx = res.indexOf('event');
  const covIdx = res.indexOf('cover');
  const heroIdx = res.indexOf('hero');
  const galIdx = res.indexOf('gallery');

  assert(locIdx < evtIdx, 'location is placed before event');
  assert(covIdx < heroIdx && heroIdx < locIdx, 'predecessors (cover, hero) appear before location');
  assert(evtIdx < galIdx, 'successors (gallery) appear after event');
  assert(res.length === DEFAULT_SECTION_ORDER.length, 'all 13 sections present');
}

// ── Test 4: Partial custom sectionOrder (gallery placed first)
console.log('\nTest 4: Partial order: gallery at top');
{
  const res = resolveSectionOrder({ sectionOrder: ['gallery'] });
  
  assert(res[0] === 'cover', 'cover still comes first because it has no predecessors in custom');
  assert(res.length === DEFAULT_SECTION_ORDER.length, 'all 13 sections present');
}

// ── Test 5: isSectionVisible behavior ────────────────────────
console.log('\nTest 5: isSectionVisible defaults to true');
{
  assert(isSectionVisible('quote', {}) === true, 'default visible when customization empty');
  assert(isSectionVisible('quote', { sections: {} }) === true, 'default visible when sections empty');
  assert(isSectionVisible('quote', { sections: { quote: true } }) === true, 'visible when explicitly true');
  assert(isSectionVisible('quote', { sections: { quote: false } }) === false, 'hidden when explicitly false');
  assert(isSectionVisible('hero', { sections: { quote: false } }) === true, 'other sections unaffected by quote=false');
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ All sectionOrder tests passed!');
}
