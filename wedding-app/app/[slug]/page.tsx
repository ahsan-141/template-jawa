// =============================================================
// EXAMPLE — Cara pakai ThemeProvider di route dinamis
// app/[slug]/page.tsx
//
// Contoh ini menunjukkan alur lengkap:
//   1. Server component mengambil data dari database
//   2. Validasi customization dengan Zod schema
//   3. Wrap client component dengan ThemeProvider
//   4. Client component menggunakan useTheme()
//
// NOTE: File ini adalah contoh — sesuaikan getInvitationBySlug()
// dengan database / API yang digunakan nanti.
// =============================================================

import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { InvitationView } from './InvitationView';
import { ThemeCustomizationSchema } from '@/lib/theme/customizationSchema';
import { getTheme } from '@/lib/theme/registry';
import type { ThemeCustomization } from '@/types/customization';

// ── Tipe data dari database ──────────────────────────────────
type InvitationRecord = {
  id: string;
  slug: string;
  theme_id: string;
  customization: unknown;  // JSON dari database — belum divalidasi
  invitation_data: unknown;
  status: 'draft' | 'published';
};

// ── Mock: ambil data dari database ───────────────────────────
// Ganti dengan query database sesungguhnya (Prisma, Drizzle, dsb)
async function getInvitationBySlug(
  slug: string,
): Promise<InvitationRecord | null> {
  // TODO: replace with actual database query
  // return await db.invitation.findUnique({ where: { slug } });

  // Dummy data untuk development
  if (slug === 'yogi-ratna') {
    return {
      id: '1',
      slug: 'yogi-ratna',
      theme_id: 'jawa-merah',
      customization: {
        colors: { accent: '#D4AF37' },
        layout: { gallery: 'editorial', couple: 'rectangle' },
        sections: { gift: false },
        sectionOrder: ['cover', 'hero', 'couple', 'quote', 'countdown',
                       'location', 'event', 'gallery', 'loveStory',
                       'rsvp', 'wishes', 'closing'],
      },
      invitation_data: { /* ... */ },
      status: 'published',
    };
  }

  return null;
}

// ── Server Component: Page ───────────────────────────────────
// File ini adalah SERVER component (tidak ada "use client").
// Data fetching dan validasi terjadi di server.
export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = await getInvitationBySlug(slug);

  if (!record || record.status !== 'published') {
    notFound();
  }

  // ── Validasi customization dengan Zod ────────────────────
  // Data dari database bisa berisi apapun — validasi dulu
  // sebelum diteruskan ke ThemeProvider.
  const parseResult = ThemeCustomizationSchema.safeParse(
    record.customization,
  );

  const customization: ThemeCustomization = parseResult.success
    ? parseResult.data
    : {}; // fallback ke empty jika invalid

  if (!parseResult.success) {
    // Log error di server, jangan crash di user
    console.error(
      `[${slug}] Invalid customization:`,
      parseResult.error.issues,
    );
  }

  // ── Resolve theme ────────────────────────────────────────
  const theme = getTheme(record.theme_id);

  // ── Render ───────────────────────────────────────────────
  // ThemeProvider dan komponen invitation adalah client components.
  // Kita pass data sebagai props dari server → client.
  return (
    <Suspense fallback={null}>
      <InvitationView
        theme={theme}
        customization={customization}
      />
    </Suspense>
  );
}
