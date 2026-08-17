# Premium Javanese Wedding Invitation (Next.js 16 + Tailwind CSS v4 + Motion)

Template undangan pernikahan digital premium bertema **Jawa Merah + Gold** dengan arsitektur modern berbasis **Next.js 16.x App Router, TypeScript, Tailwind CSS 4.x, dan Motion for React**.

---

## Fitur Utama

- 🎨 **Tema Tradisional Jawa — Merah & Gold**: Visual mewah, romantis, dan elegan dengan ornamen batik dan floral khas Jawa.
- 📱 **Mobile-First Responsive**: Didesain khusus untuk tampilan smartphone dengan containment editorial yang proporsional di desktop.
- ✉️ **URL Parameter Tamu (`?to=`)**: Personalisasi nama tamu otomatis dari URL (misal: `/?to=Andi+Pratama`).
- 🎬 **Motion for React**: Animasi cover opening sinematik, scroll reveal, floating particles, dan timeline interaktif.
- ⏱️ **Realtime Countdown Hook**: Hitung mundur presisi ke tanggal acara dengan fallback hari-H yang elegan.
- 🖼️ **Swiper Gallery**: Carousel foto prewedding responsif dengan touch swipe, pagination emas, dan autoplay.
- 💌 **RSVP Frontend Form**: Validasi input, toggle jumlah tamu kondisional, feedback kirim, dan payload console ready-to-backend.
- 💳 **Digital Gift & Clipboard**: Salin nomor rekening satu-klik dengan visual feedback instan dan fallback QR Code.
- 🎵 **Floating Music Player**: Audio player interaktif yang dimulai otomatis setelah cover dibuka dengan animasi equalizer.
- 🧭 **Floating Bottom Nav**: Navigasi minimalis melayang dengan deteksi active section saat scroll.

---

## Struktur Proyek

```text
wedding-app/
├── app/
│   ├── layout.tsx           # Setup Google Fonts (Cormorant Garamond & Poppins) & Metadata
│   ├── page.tsx             # Root page dengan Suspense boundary
│   └── globals.css          # Tailwind CSS v4 `@theme` design tokens & custom utilities
├── components/
│   ├── invitation/
│   │   ├── Invitation.tsx   # Orchestrator utama & State Manager
│   │   ├── Cover.tsx        # Full-screen landing cover dengan Motion AnimatePresence
│   │   ├── Hero.tsx         # Intro nama pasangan & tanggal
│   │   ├── Quote.tsx        # Ayat suci Q.S. Ar-Rum: 21
│   │   ├── Couple.tsx       # Profil mempelai pria & wanita
│   │   ├── Countdown.tsx    # Realtime countdown timer
│   │   ├── EventSection.tsx # Kartu Akad Nikah & Resepsi
│   │   ├── LocationSection.tsx # Peta lokasi Google Maps embed & link
│   │   ├── Gallery.tsx      # Carousel foto Swiper.js
│   │   ├── LoveStory.tsx    # Timeline kisah cinta vertikal
│   │   ├── Gift.tsx         # Rekening bank, copy clipboard & QR
│   │   ├── RSVP.tsx         # Form konfirmasi kehadiran
│   │   ├── Wishes.tsx       # Daftar ucapan & doa restu tamu
│   │   ├── Closing.tsx      # Penutup & ucapan terima kasih
│   │   ├── MusicPlayer.tsx  # Floating audio player dengan equalizer
│   │   └── FloatingNav.tsx  # Floating bottom navigation
│   └── ui/
│       ├── Reveal.tsx       # Reusable Motion reveal component
│       ├── SectionHeading.tsx # Eyebrow label & section title
│       └── OrnamentDivider.tsx # SVG Ornaments & Dividers
├── data/
│   └── invitation.ts        # Pusat konfigurasi seluruh konten undangan
├── types/
│   └── invitation.ts        # TypeScript definitions
├── hooks/
│   └── useCountdown.ts      # Custom hook countdown timer
└── public/
    ├── images/              # Aset foto pengantin & galeri
    └── music/
        └── wedding.mp3      # Lagu latar belakang
```

---

## Cara Menjalankan

### 1. Development Mode

```bash
cd wedding-app
npm run dev
```

Buka browser di:
```text
http://localhost:3000
```

Untuk mencoba fitur nama tamu:
```text
http://localhost:3000/?to=Andi+Pratama
```

### 2. Production Build

```bash
npm run build
npm run start
```

---

## Cara Kustomisasi Data

Cukup edit satu file: **`data/invitation.ts`**.

```typescript
export const invitationData: InvitationData = {
  groom: {
    name: 'Yogi Pratama',
    nickname: 'Yogi',
    parents: 'Putra dari Bapak ... & Ibu ...',
    photo: '/images/groom.webp',
    instagram: '@yogi.pratama',
    instagramUrl: 'https://instagram.com/yogi.pratama',
  },
  bride: {
    name: 'Ratna Sari',
    nickname: 'Ratna',
    // ...
  },
  wedding: {
    date: '30 September 2026',
    dateNumeric: '30 · 09 · 2026',
    countdownDate: '2026-09-30T08:00:00+08:00',
  },
  // ...
};
```

---

## Teknologi yang Digunakan

- **Next.js 16.3 (App Router & Turbopack)**
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4.x** (CSS-first `@theme` configuration)
- **Motion for React** (`motion`)
- **Swiper 11**
- **Lucide React**
