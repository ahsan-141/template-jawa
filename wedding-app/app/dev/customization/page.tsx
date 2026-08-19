'use client';

// =============================================================
// DEV — Customization Preview Page
// app/dev/customization/page.tsx
//
// Halaman development untuk testing customization system.
// Panel kontrol di kiri, preview invitation di kanan.
// Perubahan pada kontrol langsung terlihat di preview.
//
// BUKAN dashboard production. Hanya untuk development/testing.
// =============================================================

import { useState, useMemo, useCallback } from 'react';
import { Suspense } from 'react';
import type { ThemeCustomization, SectionId } from '@/types/customization';
import { DEFAULT_SECTION_ORDER } from '@/types/customization';
import { THEME_LIST, getTheme } from '@/lib/theme/registry';
import { customizationExamples } from '@/data/customization-examples';
import { Invitation } from '@/components/invitation/Invitation';

// ── Section metadata for controls ─────────────────────────────
const SECTION_META: { id: SectionId; label: string }[] = [
  { id: 'cover',     label: 'Cover' },
  { id: 'hero',      label: 'Hero' },
  { id: 'quote',     label: 'Quote / Ayat' },
  { id: 'couple',    label: 'Couple' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'event',     label: 'Event' },
  { id: 'location',  label: 'Location' },
  { id: 'gallery',   label: 'Gallery' },
  { id: 'loveStory', label: 'Love Story' },
  { id: 'gift',      label: 'Gift' },
  { id: 'rsvp',      label: 'RSVP' },
  { id: 'wishes',    label: 'Wishes' },
  { id: 'closing',   label: 'Closing' },
];

export default function CustomizationDevPage() {
  // ── State ─────────────────────────────────────────────────
  const [themeId, setThemeId] = useState('jawa-merah');
  const [primaryColor, setPrimaryColor] = useState('');
  const [accentColor, setAccentColor] = useState('');
  const [coupleLayout, setCoupleLayout] = useState<'' | 'circle' | 'rectangle' | 'stacked'>('');
  const [galleryLayout, setGalleryLayout] = useState<'' | 'slider' | 'grid' | 'editorial'>('');
  const [animationIntensity, setAnimationIntensity] = useState<'' | 'subtle' | 'normal' | 'expressive'>('');
  const [parallax, setParallax] = useState<boolean | null>(null);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>([...DEFAULT_SECTION_ORDER]);
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  // ── Build customization object from state ─────────────────
  const customization = useMemo<ThemeCustomization>(() => {
    const c: ThemeCustomization = {};

    // Colors
    if (primaryColor || accentColor) {
      c.colors = {};
      if (primaryColor) c.colors.primary = primaryColor;
      if (accentColor) c.colors.accent = accentColor;
    }

    // Layout
    if (coupleLayout || galleryLayout) {
      c.layout = {};
      if (coupleLayout) c.layout.couple = coupleLayout;
      if (galleryLayout) c.layout.gallery = galleryLayout;
    }

    // Animation
    if (animationIntensity || parallax !== null) {
      c.animation = {};
      if (animationIntensity) c.animation.intensity = animationIntensity;
      if (parallax !== null) c.animation.parallax = parallax;
    }

    // Section visibility
    const hasVisibilityOverrides = Object.keys(sectionVisibility).length > 0;
    if (hasVisibilityOverrides) {
      c.sections = sectionVisibility as ThemeCustomization['sections'];
    }

    // Section order — only include if differs from default
    const isDefaultOrder = sectionOrder.every(
      (id, i) => DEFAULT_SECTION_ORDER[i] === id,
    );
    if (!isDefaultOrder) {
      c.sectionOrder = sectionOrder;
    }

    return c;
  }, [primaryColor, accentColor, coupleLayout, galleryLayout, animationIntensity, parallax, sectionVisibility, sectionOrder]);

  // ── Load preset ───────────────────────────────────────────
  const loadPreset = useCallback((presetId: string) => {
    const example = customizationExamples.find((e) => e.id === presetId);
    if (!example) return;

    setThemeId(example.themeId);
    const c = example.customization;

    setPrimaryColor(c.colors?.primary ?? '');
    setAccentColor(c.colors?.accent ?? '');
    setCoupleLayout((c.layout?.couple as typeof coupleLayout) ?? '');
    setGalleryLayout((c.layout?.gallery as typeof galleryLayout) ?? '');
    setAnimationIntensity((c.animation?.intensity as typeof animationIntensity) ?? '');
    setParallax(c.animation?.parallax ?? null);
    setSectionVisibility(c.sections ? { ...c.sections } : {});
    setSectionOrder(c.sectionOrder ?? [...DEFAULT_SECTION_ORDER]);
    setPreviewKey((k) => k + 1);
  }, []);

  // ── Reset ─────────────────────────────────────────────────
  const reset = useCallback(() => {
    setPrimaryColor('');
    setAccentColor('');
    setCoupleLayout('');
    setGalleryLayout('');
    setAnimationIntensity('');
    setParallax(null);
    setSectionVisibility({});
    setSectionOrder([...DEFAULT_SECTION_ORDER]);
    setPreviewKey((k) => k + 1);
  }, []);

  // ── Section visibility toggle ─────────────────────────────
  const toggleSection = (id: SectionId) => {
    setSectionVisibility((prev) => {
      const current = prev[id] ?? true; // default visible
      return { ...prev, [id]: !current };
    });
  };

  // ── Section reorder ───────────────────────────────────────
  const moveSection = (index: number, direction: 'up' | 'down') => {
    setSectionOrder((prev) => {
      const next = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  // ── JSON output ───────────────────────────────────────────
  const jsonOutput = useMemo(
    () => JSON.stringify(customization, null, 2),
    [customization],
  );

  // ── Styles ────────────────────────────────────────────────
  const labelClass = 'block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5';
  const selectClass = 'w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors';
  const inputClass = selectClass;

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-200 overflow-hidden">
      {/* ── Control Panel (left) ─────────────────────────────── */}
      <aside className="w-[340px] shrink-0 border-r border-neutral-800 overflow-y-auto">
        <div className="p-5 space-y-5">
          {/* Header */}
          <div>
            <h1 className="text-lg font-semibold text-white tracking-tight">
              Customization Preview
            </h1>
            <p className="text-[11px] text-neutral-500 mt-1">
              Development tool — bukan dashboard production
            </p>
          </div>

          {/* ── Presets ──────────────────────────────────────── */}
          <div>
            <label className={labelClass}>Preset</label>
            <select
              className={selectClass}
              onChange={(e) => loadPreset(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Pilih preset...
              </option>
              {customizationExamples.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>

          {/* ── Theme ────────────────────────────────────────── */}
          <div>
            <label className={labelClass}>Theme</label>
            <select
              className={selectClass}
              value={themeId}
              onChange={(e) => {
                setThemeId(e.target.value);
                setPreviewKey((k) => k + 1);
              }}
            >
              {THEME_LIST.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <hr className="border-neutral-800" />

          {/* ── Colors ───────────────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold text-neutral-300 mb-3 uppercase tracking-wider">
              Colors
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Primary</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={primaryColor || getTheme(themeId).colors.primary}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-8 h-8 rounded border border-neutral-700 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="default"
                    className={`${inputClass} flex-1 text-xs`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Accent</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={accentColor || getTheme(themeId).colors.accent}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded border border-neutral-700 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    placeholder="default"
                    className={`${inputClass} flex-1 text-xs`}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-neutral-800" />

          {/* ── Layout ───────────────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold text-neutral-300 mb-3 uppercase tracking-wider">
              Layout
            </p>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Couple Photo</label>
                <select
                  className={selectClass}
                  value={coupleLayout}
                  onChange={(e) => setCoupleLayout(e.target.value as typeof coupleLayout)}
                >
                  <option value="">Default (from theme)</option>
                  <option value="circle">Circle</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="stacked">Stacked</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Gallery</label>
                <select
                  className={selectClass}
                  value={galleryLayout}
                  onChange={(e) => setGalleryLayout(e.target.value as typeof galleryLayout)}
                >
                  <option value="">Default (Slider)</option>
                  <option value="slider">Slider</option>
                  <option value="grid">Grid</option>
                  <option value="editorial">Editorial</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-neutral-800" />

          {/* ── Animation ────────────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold text-neutral-300 mb-3 uppercase tracking-wider">
              Animation
            </p>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Intensity</label>
                <select
                  className={selectClass}
                  value={animationIntensity}
                  onChange={(e) => setAnimationIntensity(e.target.value as typeof animationIntensity)}
                >
                  <option value="">Default (from theme)</option>
                  <option value="subtle">Subtle</option>
                  <option value="normal">Normal</option>
                  <option value="expressive">Expressive</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={parallax ?? false}
                    onChange={(e) => setParallax(e.target.checked)}
                    className="w-4 h-4 rounded bg-neutral-800 border-neutral-600"
                  />
                  Parallax
                </label>
              </div>
            </div>
          </div>

          <hr className="border-neutral-800" />

          {/* ── Section Visibility ────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold text-neutral-300 mb-3 uppercase tracking-wider">
              Section Visibility
            </p>
            <div className="space-y-1.5">
              {SECTION_META.map(({ id, label }) => {
                const isVisible = sectionVisibility[id] ?? true;
                return (
                  <label
                    key={id}
                    className="flex items-center gap-2.5 cursor-pointer text-sm py-1 px-2 rounded-lg hover:bg-neutral-800/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={() => toggleSection(id)}
                      className="w-3.5 h-3.5 rounded bg-neutral-800 border-neutral-600"
                    />
                    <span className={isVisible ? 'text-neutral-200' : 'text-neutral-500 line-through'}>
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <hr className="border-neutral-800" />

          {/* ── Section Order ─────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Section Order
              </p>
              <button
                onClick={() => setShowOrderPanel(!showOrderPanel)}
                className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showOrderPanel ? 'Hide' : 'Show'}
              </button>
            </div>
            {showOrderPanel && (
              <div className="space-y-1">
                {sectionOrder.map((id, index) => {
                  const meta = SECTION_META.find((m) => m.id === id);
                  const isHidden = sectionVisibility[id] === false;
                  return (
                    <div
                      key={id}
                      className={`flex items-center gap-2 text-xs py-1.5 px-2 rounded-lg ${
                        isHidden ? 'bg-neutral-900/50 text-neutral-600' : 'bg-neutral-800/30 text-neutral-300'
                      }`}
                    >
                      <span className="w-5 text-neutral-600 text-[10px]">{index + 1}</span>
                      <span className="flex-1">{meta?.label ?? id}</span>
                      <button
                        onClick={() => moveSection(index, 'up')}
                        disabled={index === 0}
                        className="text-neutral-500 hover:text-white disabled:opacity-20 transition-colors px-1"
                        aria-label={`Pindah ${meta?.label} ke atas`}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveSection(index, 'down')}
                        disabled={index === sectionOrder.length - 1}
                        className="text-neutral-500 hover:text-white disabled:opacity-20 transition-colors px-1"
                        aria-label={`Pindah ${meta?.label} ke bawah`}
                      >
                        ↓
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <hr className="border-neutral-800" />

          {/* ── JSON Output ──────────────────────────────────── */}
          <div>
            <p className="text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
              Customization JSON
            </p>
            <pre className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-[10px] text-green-400 overflow-x-auto max-h-48 overflow-y-auto font-mono leading-relaxed">
              {jsonOutput}
            </pre>
          </div>

          {/* ── Actions ──────────────────────────────────────── */}
          <div className="flex gap-2 pb-4">
            <button
              onClick={reset}
              className="flex-1 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-sm rounded-lg transition-colors border border-neutral-700"
            >
              Reset
            </button>
            <button
              onClick={() => setPreviewKey((k) => k + 1)}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
            >
              Refresh Preview
            </button>
          </div>
        </div>
      </aside>

      {/* ── Preview (right) ──────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto bg-neutral-900">
        <div className="mx-auto max-w-[480px] min-h-screen shadow-2xl">
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen text-neutral-500 text-sm">
              Loading preview...
            </div>
          }>
            <Invitation
              key={previewKey}
              themeId={themeId}
              customization={customization}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
