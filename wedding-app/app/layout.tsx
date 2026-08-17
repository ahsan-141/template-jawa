import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Poppins } from 'next/font/google';
import './globals.css';

// ── Font Setup ────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

// ── Viewport ──────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: '#4A0808',
  width: 'device-width',
  initialScale: 1,
};

// ── Metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'The Wedding of Yogi & Ratna | 30 September 2026',
  description: 'Undangan pernikahan digital Yogi Pratama & Ratna Sari – 30 September 2026 di Makassar',
  openGraph: {
    title: 'The Wedding of Yogi & Ratna',
    description: 'Kami mengundang Anda untuk hadir di hari bahagia kami',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
