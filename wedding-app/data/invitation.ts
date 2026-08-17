// =============================================================
// DATA — Wedding Invitation
// data/invitation.ts
//
// Edit file ini untuk mengkustomisasi undangan.
// Semua komponen mengonsumsi data dari object ini.
// =============================================================

import type { InvitationData } from '@/types/invitation';

export const invitationData: InvitationData = {

  // ── MEMPELAI PRIA ────────────────────────────────────────
  groom: {
    name: 'Yogi Pratama',
    nickname: 'Yogi',
    parents: 'Putra dari Bapak Hendra Setiawan & Ibu Sri Wahyuni',
    photo: '/images/groom.webp',
    instagram: '@yogi.pratama',
    instagramUrl: 'https://instagram.com/yogi.pratama',
  },

  // ── MEMPELAI WANITA ──────────────────────────────────────
  bride: {
    name: 'Ratna Sari',
    nickname: 'Ratna',
    parents: 'Putri dari Bapak Ahmad Fauzi & Ibu Dewi Kusuma',
    photo: '/images/bride.webp',
    instagram: '@ratna.sari',
    instagramUrl: 'https://instagram.com/ratna.sari',
  },

  // ── INFO PERNIKAHAN ──────────────────────────────────────
  wedding: {
    date: '30 September 2026',
    dateNumeric: '30 · 09 · 2026',
    // ISO 8601 dengan timezone WITA (UTC+8)
    countdownDate: '2026-09-30T08:00:00+08:00',
  },

  // ── AKAD NIKAH ───────────────────────────────────────────
  akad: {
    title: 'Akad Nikah',
    date: '30 September 2026',
    time: '08.00 – 10.00 WITA',
  },

  // ── RESEPSI ───────────────────────────────────────────────
  resepsi: {
    title: 'Resepsi Pernikahan',
    date: '30 September 2026',
    time: '11.00 – 14.00 WITA',
  },

  // ── LOKASI ────────────────────────────────────────────────
  venue: {
    name: 'Hotel CLaro Kendari',
    address: 'Jl. Edi Sabara no 89',
    city: 'Kendari, Sulawesi Tenggara',
    mapsUrl: 'https://maps.google.com/?q=Hotel+Claro+Kendari',
    mapsEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.2452060376827!2d122.52591187497512!3d-3.969854296003895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d98f298666f001f%3A0x8e90cd3d68630781!2sCLARO%20Kendari!5e0!3m2!1sid!2sid!4v1786954389686!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin'
  },

  // ── GALERI ────────────────────────────────────────────────
  gallery: [
    { src: '/images/gallery-1.webp', alt: 'Foto prewedding di taman' },
    { src: '/images/gallery-2.webp', alt: 'Foto prewedding romantis' },
    { src: '/images/gallery-3.webp', alt: 'Foto prewedding outdoor' },
    { src: '/images/gallery-4.webp', alt: 'Foto prewedding indoor' },
    { src: '/images/gallery-5.webp', alt: 'Foto prewedding sunset' },
    { src: '/images/gallery-6.webp', alt: 'Foto prewedding formal' },
  ],

  // ── KISAH CINTA ───────────────────────────────────────────
  loveStory: [
    {
      year: '2022',
      title: 'Pertemuan Pertama',
      description:
        'Takdir mempertemukan kami di sebuah acara yang tidak pernah kami duga. Sejak saat itu, senyum dan kebaikanmu selalu terlintas di pikiranku.',
      photo: '/images/story-1.webp',
    },
    {
      year: '2023',
      title: 'Jatuh Cinta',
      description:
        'Waktu terus berjalan, dan rasa itu semakin dalam. Setiap momen bersamamu menjadi kenangan yang selalu ingin ku ulang.',
      photo: '/images/story-2.webp',
    },
    {
      year: '2024',
      title: 'Lamaran',
      description:
        'Dengan penuh keyakinan, ku mantapkan hati untuk memintamu menjadi pendamping hidupku selamanya. Dan kamu bilang... iya.',
      photo: '/images/story-3.webp',
    },
    {
      year: '2026',
      title: 'Hari Pernikahan',
      description:
        'Hari ini, di hadapan Allah dan semua orang yang kami cintai, kami resmi mengikat janji untuk selamanya.',
      photo: '/images/story-4.webp',
    },
  ],

  // ── WEDDING GIFT ─────────────────────────────────────────
  gift: {
    bank: 'BCA',
    accountNumber: '1234567890',
    accountName: 'Yogi Pratama',
    qrCode: '/images/qr-code.webp',
  },

  // ── UCAPAN & DOA ─────────────────────────────────────────
  wishes: [
    {
      name: 'Andi Saputra',
      message:
        'Selamat menempuh hidup baru, semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu!',
    },
    {
      name: 'Siti Rahayu',
      message:
        'Semoga pernikahan kalian dipenuhi keberkahan dan kebahagiaan yang tiada henti. Langgeng ya! 🌹',
    },
    {
      name: 'Budi Santoso',
      message:
        'Congrats! Semoga cinta kalian kekal abadi seperti bintang di langit malam. Selamat berbahagia.',
    },
    {
      name: 'Dewi Lestari',
      message:
        'Masyaa Allah, cantik banget acaranya! Selamat ya kak Ratna dan kak Yogi. Semoga segera dikaruniai momongan.',
    },
    {
      name: 'Rizky Firmansyah',
      message:
        'Selamat ya bro! Akhirnya resmi juga. Semoga bahagia sampai kakek-nenek!',
    },
    {
      name: 'Nurul Hidayah',
      message:
        'Semoga Allah meridhoi pernikahan kalian dan memberikan keberkahan di setiap langkah kehidupan bersama. Aamiin.',
    },
  ],

  // ── MUSIK ─────────────────────────────────────────────────
  music: {
    src: '/music/wedding.mp3',
    title: 'Wedding Song',
  },

  // ── QUOTE / AYAT ─────────────────────────────────────────
  quote: {
    text: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'Q.S. Ar-Rum: 21',
  },
};
