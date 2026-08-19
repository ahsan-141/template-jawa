// =============================================================
// INVITATION — Budi & Citra
// data/invitations/budi-citra.ts
//
// Template: Floral Elegant
// Customization: Botanical theme, location before event, gallery grid
// =============================================================

import type { InvitationRecord, InvitationData } from '@/types/invitation';

const budiCitraData: InvitationData = {
  groom: {
    name: 'Budi Santoso',
    nickname: 'Budi',
    parents: 'Putra dari Bapak Ir. H. Gunawan & Ibu Hj. Ratnawati',
    photo: '/images/groom.webp',
    instagram: '@budi.santoso',
    instagramUrl: 'https://instagram.com/budi.santoso',
  },
  bride: {
    name: 'Citra Dewi',
    nickname: 'Citra',
    parents: 'Putri dari Bapak Dr. Sudirman & Ibu dr. Maria Ulfa',
    photo: '/images/bride.webp',
    instagram: '@citra.dewi',
    instagramUrl: 'https://instagram.com/citra.dewi',
  },
  wedding: {
    date: '12 Desember 2026',
    dateNumeric: '12 · 12 · 2026',
    countdownDate: '2026-12-12T10:00:00+08:00',
  },
  akad: {
    title: 'Akad Nikah',
    date: '12 Desember 2026',
    time: '08.00 – 10.00 WITA',
  },
  resepsi: {
    title: 'Resepsi Pernikahan',
    date: '12 Desember 2026',
    time: '11.00 – 15.00 WITA',
  },
  venue: {
    name: 'The Botanical Pavilion Bali',
    address: 'Jl. Raya Uluwatu No. 88',
    city: 'Jimbaran, Bali',
    mapsUrl: 'https://maps.google.com/?q=The+Botanical+Pavilion+Bali',
    mapsEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.0!2d115.15!3d-8.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDcnMjQuMCJTIDExNcKwMDknMDAuMCJF!5e0!3m2!1sid!2sid!4v1',
  },
  gallery: [
    { src: '/images/gallery-1.webp', alt: 'Taman bunga mekar' },
    { src: '/images/gallery-2.webp', alt: 'Momen keemasan senja Bali' },
    { src: '/images/gallery-3.webp', alt: 'Potret tepi pantai' },
    { src: '/images/gallery-4.webp', alt: 'Tawa bahagia berdua' },
    { src: '/images/gallery-5.webp', alt: 'Keindahan alam tropis' },
    { src: '/images/gallery-6.webp', alt: 'Menatap masa depan' },
  ],
  loveStory: [
    {
      year: '2020',
      title: 'Pertemuan di Pulau Dewata',
      description: 'Pertama kali bertegur sapa di sebuah kafe tepi pantai Sanur.',
      photo: '/images/story-1.webp',
    },
    {
      year: '2022',
      title: 'Tumbuh Bersama',
      description: 'Dua jiwa yang saling melengkapi dan mendukung impian satu sama lain.',
      photo: '/images/story-2.webp',
    },
    {
      year: '2024',
      title: 'Sebuah Janji',
      description: 'Momen matahari terbenam menjadi saksi lamaran yang penuh haru.',
      photo: '/images/story-3.webp',
    },
    {
      year: '2026',
      title: 'Pernikahan Impian',
      description: 'Menyatukan cinta kami dalam ikatan suci pernikahan.',
      photo: '/images/story-4.webp',
    },
  ],
  gift: {
    bank: 'Bank BNI',
    accountNumber: '9876543210',
    accountName: 'Citra Dewi',
    qrCode: '/images/qr-code.webp',
  },
  wishes: [
    {
      name: 'Dr. Kevin Sanjaya',
      message: 'Selamat untuk Budi & Citra! Semoga rukun selalu dan bahagia dunia akhirat.',
    },
    {
      name: 'Nadia Putri',
      message: 'Aaaaa happy wedding my bestie Citra! So happy for both of you 🌸✨',
    },
    {
      name: 'Faisal & Keluarga',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khoir.',
    },
  ],
  music: {
    src: '/music/wedding.mp3',
    title: 'Floral Romance Piano & Strings',
  },
  quote: {
    text: 'Cinta sejati bukan menemukan seseorang yang sempurna, melainkan melihat seseorang yang tidak sempurna dengan cara yang sempurna.',
    source: 'Sam Keen',
  },
};

export const budiCitraInvitation: InvitationRecord = {
  id: 'inv_budi_citra_03',
  slug: 'budi-citra',
  themeId: 'floral-elegant',
  customization: {
    layout: {
      gallery: 'grid',
    },
    sectionOrder: [
      'cover',
      'hero',
      'quote',
      'couple',
      'countdown',
      'location',   // Lokasi sebelum acara
      'event',      // Acara setelah lokasi
      'gallery',
      'loveStory',
      'gift',
      'rsvp',
      'wishes',
      'closing',
    ],
    animation: {
      intensity: 'subtle',
      floatingDecorations: true,
    },
  },
  data: budiCitraData,
  status: 'published',
  createdAt: '2026-08-10T12:00:00Z',
};
