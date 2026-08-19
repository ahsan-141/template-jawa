// =============================================================
// TYPES — Wedding Invitation
// types/invitation.ts
// =============================================================

export type Person = {
  name: string;
  nickname: string;
  parents: string;
  photo: string;
  instagram?: string;
  instagramUrl?: string;
};

export type WeddingEvent = {
  title: string;
  date: string;
  time: string;
};

export type Venue = {
  name: string;
  address: string;
  city: string;
  mapsUrl: string;
  mapsEmbedSrc: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type StoryItem = {
  year: string;
  title: string;
  description: string;
  photo: string;
};

export type GiftAccount = {
  bank: string;
  accountNumber: string;
  accountName: string;
  qrCode?: string;
};

export type WishItem = {
  name: string;
  message: string;
};

export type MusicConfig = {
  src: string;
  title: string;
};

export type QuoteConfig = {
  text: string;
  source: string;
};

export type WeddingInfo = {
  date: string;
  dateNumeric: string;
  countdownDate: string;
};

export type InvitationData = {
  groom: Person;
  bride: Person;
  wedding: WeddingInfo;
  akad: WeddingEvent;
  resepsi: WeddingEvent;
  venue: Venue;
  gallery: GalleryImage[];
  loveStory: StoryItem[];
  gift: GiftAccount;
  wishes: WishItem[];
  music: MusicConfig;
  quote: QuoteConfig;
};

// ── Countdown ──────────────────────────────────────────────
export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

// ── RSVP Form ──────────────────────────────────────────────
export type RSVPFormData = {
  name: string;
  attendance: 'hadir' | 'tidak-hadir' | '';
  guests: number;
  message: string;
};

// ── Invitation Record ──────────────────────────────────────
import type { ThemeCustomization } from './customization';

export type InvitationRecord = {
  id: string;
  slug: string;
  themeId: string;
  customization: ThemeCustomization;
  data: InvitationData;
  status: 'draft' | 'published';
  createdAt: string;
};

