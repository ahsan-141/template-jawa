// =============================================================
// LIB — Get Invitation
// lib/invitations/getInvitation.ts
//
// Helper function untuk mengambil invitation record berdasarkan slug.
// Single source of truth: registry data/invitations.
// =============================================================

import type { InvitationRecord } from '@/types/invitation';
import { INVITATIONS, INVITATION_LIST } from '@/data/invitations';

/**
 * getInvitationBySlug — mengambil record undangan berdasarkan slug.
 *
 * @param slug string identifier (e.g. 'yogi-ratna', 'andi-siti')
 * @returns InvitationRecord jika ditemukan dan published, atau null jika tidak ada.
 */
export async function getInvitationBySlug(
  slug: string,
): Promise<InvitationRecord | null> {
  const invitation = INVITATIONS[slug];
  if (!invitation || invitation.status !== 'published') {
    return null;
  }
  return invitation;
}

/**
 * getAllInvitations — mengambil semua list undangan yang published.
 */
export async function getAllInvitations(): Promise<InvitationRecord[]> {
  return INVITATION_LIST.filter((inv) => inv.status === 'published');
}
