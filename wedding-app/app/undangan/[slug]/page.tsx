// =============================================================
// ROUTE — /undangan/[slug]
// app/undangan/[slug]/page.tsx
//
// Dynamic invitation page per customer.
// Server Component yang mengambil data berdasarkan slug,
// menghasilkan metadata dinamis, dan merender Invitation.
// =============================================================

import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getInvitationBySlug, getAllInvitations } from '@/lib/invitations/getInvitation';
import { Invitation } from '@/components/invitation/Invitation';

type Props = {
  params: Promise<{ slug: string }>;
};

// ── Static Params ────────────────────────────────────────────
// Pre-render static paths untuk semua undangan yang terdaftar
export async function generateStaticParams() {
  const invitations = await getAllInvitations();
  return invitations.map((inv) => ({
    slug: inv.slug,
  }));
}

// ── Dynamic Metadata ─────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    return {
      title: 'Undangan Tidak Ditemukan',
    };
  }

  const { groom, bride, wedding } = invitation.data;
  const title = `${groom.nickname} & ${bride.nickname} — The Wedding`;
  const description = `The Wedding of ${groom.name} & ${bride.name} — ${wedding.date}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

// ── Page Component ───────────────────────────────────────────
export default async function UndanganPage({ params }: Props) {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <Invitation invitation={invitation} />
    </Suspense>
  );
}
