'use client';

// components/invitation/Gift.tsx
// Wedding gift — theme-aware.
// Jawa Merah: gradient header card, ornate border.
// Minimalist: simple bordered card, clean typography.

import { useState } from 'react';
import { Copy, Check, CreditCard } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useTheme } from '@/contexts/ThemeContext';
import type { InvitationData } from '@/types/invitation';

// Helper: copy to clipboard dengan fallback
async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fallback */
    }
  }
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(el);
  el.select();
  const success = document.execCommand('copy');
  document.body.removeChild(el);
  return success;
}

export function Gift({ data }: { data: InvitationData }) {
  const { gift } = data;
  const [copied, setCopied] = useState(false);
  const theme = useTheme();
  const { backgrounds, colors, decoration } = theme;

  const handleCopy = async () => {
    const ok = await copyToClipboard(gift.accountNumber);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section
      id="gift"
      className="py-20 px-6 text-center"
      style={{ background: backgrounds.gift }}
      aria-label="Wedding gift"
    >
      <div className="max-w-lg mx-auto">
        <SectionHeading eyebrow="Hadiah" title="Wedding Gift" />

        <Reveal delay={0.1}>
          <p
            className="text-[0.85rem] font-light leading-relaxed mb-8 -mt-4"
            style={{ color: colors.textMuted }}
          >
            Kehadiran dan doa restu Anda adalah hadiah terbaik bagi kami.<br />
            Namun jika Anda ingin memberikan hadiah:
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="rounded-2xl overflow-hidden shadow-lg border mb-7"
            style={{ borderColor: colors.border }}
          >
            {/* Card header */}
            <div
              className="px-7 py-5 flex items-center gap-3"
              style={{
                background: decoration.enabled
                  ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                  : colors.bgAlt,
                color: decoration.enabled ? colors.accentLight : colors.primary,
                borderBottom: decoration.enabled ? 'none' : `1px solid ${colors.border}`,
              }}
            >
              <CreditCard size={28} aria-hidden="true" />
              <span className="font-heading text-[1.6rem] font-light tracking-wide">
                {gift.bank}
              </span>
            </div>

            {/* Card body */}
            <div
              className="px-7 py-5 space-y-3"
              style={{ background: decoration.enabled ? colors.bgAlt : colors.bgAlt }}
            >
              <div
                className="flex justify-between items-center py-2 border-b"
                style={{ borderColor: colors.border }}
              >
                <span
                  className="text-[0.7rem] font-medium tracking-[0.1em] uppercase"
                  style={{ color: colors.textLight }}
                >
                  No. Rekening
                </span>
                <strong
                  className="font-heading text-[1.1rem] font-medium tracking-wide"
                  style={{ color: colors.primary }}
                >
                  {gift.accountNumber}
                </strong>
              </div>
              <div className="flex justify-between items-center py-2">
                <span
                  className="text-[0.7rem] font-medium tracking-[0.1em] uppercase"
                  style={{ color: colors.textLight }}
                >
                  Atas Nama
                </span>
                <strong
                  className="font-heading text-[1.1rem] font-medium"
                  style={{ color: colors.primary }}
                >
                  {gift.accountName}
                </strong>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-[0.8rem] font-medium tracking-wide transition-all duration-200"
              style={{
                background: decoration.enabled
                  ? copied
                    ? colors.bgDark
                    : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                  : copied
                    ? colors.bg
                    : colors.primary,
                color: decoration.enabled ? colors.accentLight : colors.bgAlt,
              }}
              aria-label="Salin nomor rekening ke clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  Nomor rekening berhasil disalin!
                </>
              ) : (
                <>
                  <Copy size={16} aria-hidden="true" />
                  Salin Nomor Rekening
                </>
              )}
            </button>
          </div>
        </Reveal>

        {/* QR Code placeholder */}
        <Reveal delay={0.3}>
          <div className="text-center">
            <p
              className="text-[0.72rem] font-light tracking-[0.1em] mb-3"
              style={{ color: colors.textLight }}
            >
              atau scan QR Code
            </p>
            <div
              className="inline-block p-4 rounded-xl border shadow-md"
              style={{ borderColor: colors.border, background: colors.bgAlt }}
            >
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                aria-label="QR Code placeholder"
              >
                <rect x="5" y="5" width="40" height="40" rx="3" fill="none" stroke={colors.primary} strokeWidth="3" />
                <rect x="15" y="15" width="20" height="20" fill={colors.primary} />
                <rect x="55" y="5" width="40" height="40" rx="3" fill="none" stroke={colors.primary} strokeWidth="3" />
                <rect x="65" y="15" width="20" height="20" fill={colors.primary} />
                <rect x="5" y="55" width="40" height="40" rx="3" fill="none" stroke={colors.primary} strokeWidth="3" />
                <rect x="15" y="65" width="20" height="20" fill={colors.primary} />
                <rect x="55" y="55" width="10" height="10" fill={colors.primary} />
                <rect x="70" y="55" width="10" height="10" fill={colors.primary} />
                <rect x="85" y="55" width="10" height="10" fill={colors.primary} />
                <rect x="55" y="70" width="10" height="10" fill={colors.primary} />
                <rect x="70" y="70" width="10" height="10" fill={colors.primary} />
                <rect x="55" y="85" width="10" height="10" fill={colors.primary} />
                <rect x="70" y="85" width="25" height="10" fill={colors.primary} />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
