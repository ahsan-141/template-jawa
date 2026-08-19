'use client';

// components/invitation/RSVP.tsx
// Form konfirmasi kehadiran — theme-aware.
// Background gelap di kedua tema (maroon / dark charcoal).

import { useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { useTheme } from '@/contexts/ThemeContext';
import type { RSVPFormData } from '@/types/invitation';

const initialForm: RSVPFormData = {
  name: '',
  attendance: '',
  guests: 1,
  message: '',
};

export function RSVP() {
  const [form, setForm] = useState<RSVPFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const { backgrounds, colors, decoration } = theme;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: name === 'guests' ? Number(value) : value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (!form.name.trim()) {
        setError('Mohon isi nama Anda.');
        return;
      }
      if (!form.attendance) {
        setError('Mohon pilih konfirmasi kehadiran.');
        return;
      }
      // Data siap dikirim ke API — uncomment saat backend tersedia:
      // await fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(form) });
      console.log('RSVP Data:', { ...form, timestamp: new Date().toISOString() });
      setSubmitted(true);
    },
    [form]
  );

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-[0.875rem] font-light outline-none transition-colors duration-200 placeholder:opacity-35 border';
  const inputStyle = {
    borderColor: colors.inputBorder,
    background: colors.cardBgOnDark,
    color: colors.inputText,
  };

  return (
    <section
      id="rsvp"
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: backgrounds.rsvp }}
      aria-label="Konfirmasi kehadiran RSVP"
    >
      {/* Pattern overlay — Jawa Merah only */}
      {decoration.enabled && (
        <div className="quote-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />
      )}

      <div className="relative z-10 max-w-lg mx-auto">
        <SectionHeading eyebrow="Konfirmasi" title="Konfirmasi Kehadiran" light />

        <Reveal delay={0.1}>
          <p
            className="text-[0.85rem] font-light text-center mb-8 -mt-4 leading-relaxed"
            style={{ color: colors.textOnDark, opacity: 0.7 }}
          >
            Mohon konfirmasi kehadiran Anda sebelum tanggal 20 September 2026.
          </p>
        </Reveal>

        {submitted ? (
          /* Success state */
          <Reveal>
            <div className="text-center py-12" role="alert" aria-live="assertive">
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                  style={{ borderColor: colors.accent }}
                >
                  <Check size={32} style={{ color: colors.accent }} />
                </div>
              </div>
              <h3
                className="font-heading text-2xl font-light mb-3"
                style={{ color: colors.textOnDark }}
              >
                Terima Kasih!
              </h3>
              <p
                className="text-[0.85rem] font-light leading-relaxed"
                style={{ color: colors.textOnDark, opacity: 0.7 }}
              >
                Terima kasih atas konfirmasi Anda. Kami sangat menantikan
                kehadiran Anda di hari bahagia kami.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl p-6 backdrop-blur-sm space-y-5 border"
              style={{
                background: colors.cardBgOnDark,
                borderColor: colors.borderOnDark,
              }}
              aria-label="Form konfirmasi kehadiran"
            >
              {/* Nama */}
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block text-[0.72rem] font-medium tracking-[0.1em] uppercase mb-2"
                  style={{ color: colors.accentOnDark }}
                >
                  Nama Lengkap
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  required
                  autoComplete="name"
                  className={inputClass}
                  style={{ ...inputStyle, borderColor: `${colors.inputBorder}` }}
                />
              </div>

              {/* Kehadiran */}
              <fieldset>
                <legend
                  className="block text-[0.72rem] font-medium tracking-[0.1em] uppercase mb-2"
                  style={{ color: colors.accentOnDark }}
                >
                  Kehadiran
                </legend>
                <div className="flex gap-5 flex-wrap">
                  {(['hadir', 'tidak-hadir'] as const).map((val) => (
                    <label
                      key={val}
                      className="flex items-center gap-2.5 cursor-pointer text-[0.875rem] font-light"
                      style={{ color: colors.textOnDark }}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={val}
                        checked={form.attendance === val}
                        onChange={handleChange}
                        className="radio-input sr-only"
                        aria-label={val === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                      />
                      <span
                        className="radio-dot w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-200"
                        style={{
                          borderColor:
                            form.attendance === val ? colors.accent : colors.borderOnDark,
                          background:
                            form.attendance === val ? colors.accent : 'transparent',
                          boxShadow:
                            form.attendance === val
                              ? `inset 0 0 0 3px ${backgrounds.rsvp}`
                              : 'none',
                        }}
                        aria-hidden="true"
                      />
                      {val === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Jumlah tamu */}
              {form.attendance === 'hadir' && (
                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="block text-[0.72rem] font-medium tracking-[0.1em] uppercase mb-2"
                    style={{ color: colors.accentOnDark }}
                  >
                    Jumlah Tamu
                  </label>
                  <input
                    id="rsvp-guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={10}
                    value={form.guests}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    aria-describedby="guest-hint"
                  />
                  <p
                    id="guest-hint"
                    className="text-[0.7rem] mt-1 opacity-50"
                    style={{ color: colors.textOnDark }}
                  >
                    Termasuk diri Anda
                  </p>
                </div>
              )}

              {/* Ucapan */}
              <div>
                <label
                  htmlFor="rsvp-message"
                  className="block text-[0.72rem] font-medium tracking-[0.1em] uppercase mb-2"
                  style={{ color: colors.accentOnDark }}
                >
                  Ucapan &amp; Doa
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tulis ucapan atau doa untuk pasangan..."
                  rows={4}
                  className={`${inputClass} resize-y min-h-[100px]`}
                  style={inputStyle}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-[0.78rem] text-red-300 font-light" role="alert">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-[0.8rem] font-medium tracking-wide shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                style={{
                  background: decoration.enabled
                    ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                    : colors.primary,
                  color: decoration.enabled ? colors.accentLight : colors.bgAlt,
                }}
              >
                Kirim Konfirmasi
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
