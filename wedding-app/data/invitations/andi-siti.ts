// =============================================================
// INVITATION — Andi & Siti
// data/invitations/andi-siti.ts
//
// Template: Minimalist
// Customization: Subtle animation, gallery grid
// =============================================================

import type { InvitationRecord, InvitationData } from '@/types/invitation';

const andiSitiData: InvitationData = {
  groom: {
    name: 'Andi Pratama',
    nickname: 'Andi',
    parents: 'Putra dari Bapak Bambang Susilo & Ibu Endang Lestari',
    photo: '/images/groom.webp',
    instagram: '@andi.pratama',
    instagramUrl: 'https://instagram.com/andi.pratama',
  },
  bride: {
    name: 'Siti Nurhaliza',
    nickname: 'Siti',
    parents: 'Putri dari Bapak Mansyur Hidayat & Ibu Nurjanah',
    photo: '/images/bride.webp',
    instagram: '@siti.nurhaliza',
    instagramUrl: 'https://instagram.com/siti.nurhaliza',
  },
  wedding: {
    date: '15 November 2026',
    dateNumeric: '15 · 11 · 2026',
    countdownDate: '2026-11-15T09:00:00+07:00',
  },
  akad: {
    title: 'Akad Nikah',
    date: '15 November 2026',
    time: '08.00 – 10.00 WIB',
  },
  resepsi: {
    title: 'Resepsi Pernikahan',
    date: '15 November 2026',
    time: '11.00 – 14.00 WIB',
  },
  venue: {
    name: 'The Glass House Jakarta',
    address: 'Jl. Kemang Raya No. 12',
    city: 'Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=The+Glass+House+Jakarta',
    mapsEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1',
  },
  gallery: [
    { src: '/images/gallery-1.webp', alt: 'Momen berdua di galeri seni' },
    { src: '/images/gallery-2.webp', alt: 'Prewedding monokrom' },
    { src: '/images/gallery-3.webp', alt: 'Editorial potret' },
    { src: '/images/gallery-4.webp', alt: 'Prewedding studio' },
    { src: '/images/gallery-5.webp', alt: 'Candid senja' },
    { src: '/images/gallery-6.webp', alt: 'Elegan formal' },
  ],
  loveStory: [
    {
      year: '2021',
      title: 'Awal Mula',
      description: 'Berjumpa di sebuah pameran arsitektur di Bandung.',
      photo: '/images/story-1.webp',
    },
    {
      year: '2023',
      title: 'Langkah Bersama',
      description: 'Memutuskan untuk melangkah bersama mengarungi masa depan.',
      photo: '/images/story-2.webp',
    },
    {
      year: '2025',
      title: 'Pertunangan',
      description: 'Pertemuan dua keluarga besar dalam ikatan suci pertunangan.',
      photo: '/images/story-3.webp',
    },
    {
      year: '2026',
      title: 'Hari Bahagia',
      description: 'Mengucap janji setia seumur hidup.',
      photo: '/images/story-4.webp',
    },
  ],
  gift: {
    bank: 'Bank Mandiri',
    accountNumber: '1400019283746',
    accountName: 'Andi Pratama',
    qrCode: '/images/qr-code.webp',
  },
  wishes: [
    {
      name: 'Rian & Maya',
      message: 'Selamat menempuh hidup baru Mas Andi & Mbak Siti! Semoga selalu berbahagia.',
    },
    {
      name: 'Dimas Aditya',
      message: 'Happy wedding brother! Sakinah mawaddah warahmah.',
    },
    {
      name: 'Clara Sinta',
      message: 'Congrats cantik! Lancar sampai hari H dan selamanya yaaa 🤍',
    },
  ],
  music: {
    src: '/music/wedding.mp3',
    title: 'Minimalist Romantic Acoustic',
  },
  quote: {
    text: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.',
    source: 'Q.S. Ar-Rum: 21',
  },
};

export const andiSitiInvitation: InvitationRecord = {
  id: 'inv_andi_siti_02',
  slug: 'andi-siti',
  themeId: 'minimalist',
  customization: {
    layout: {
      gallery: 'grid',
    },
    animation: {
      intensity: 'subtle',
      parallax: false,
    },
  },
  data: andiSitiData,
  status: 'published',
  createdAt: '2026-08-05T10:00:00Z',
};
