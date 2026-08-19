// =============================================================
// INVITATION — Yogi & Ratna
// data/invitations/yogi-ratna.ts
//
// Template: Jawa Merah
// Customization: Gold accent override, rectangle couple, editorial gallery
// =============================================================

import type { InvitationRecord } from '@/types/invitation';
import { invitationData } from '@/data/invitation';

export const yogiRatnaInvitation: InvitationRecord = {
  id: 'inv_yogi_ratna_01',
  slug: 'yogi-ratna',
  themeId: 'jawa-merah',
  customization: {
    colors: {
      accent: '#D4AF37',
      accentLight: '#E8C97E',
      accentPale: '#F5E6B8',
    },
    layout: {
      couple: 'rectangle',
      gallery: 'editorial',
    },
    sections: {
      quote: true,
      loveStory: true,
      gift: true,
    },
    animation: {
      intensity: 'normal',
    },
  },
  data: invitationData,
  status: 'published',
  createdAt: '2026-08-01T08:00:00Z',
};
