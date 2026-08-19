// =============================================================
// INVITATIONS REGISTRY (Local Data)
// data/invitations/index.ts
//
// Single source of truth untuk semua record undangan lokal.
// =============================================================

import type { InvitationRecord } from '@/types/invitation';
import { yogiRatnaInvitation } from './yogi-ratna';
import { andiSitiInvitation } from './andi-siti';
import { budiCitraInvitation } from './budi-citra';

export const INVITATIONS: Record<string, InvitationRecord> = {
  'yogi-ratna': yogiRatnaInvitation,
  'andi-siti': andiSitiInvitation,
  'budi-citra': budiCitraInvitation,
};

export const INVITATION_LIST: InvitationRecord[] = Object.values(INVITATIONS);

export { yogiRatnaInvitation, andiSitiInvitation, budiCitraInvitation };
