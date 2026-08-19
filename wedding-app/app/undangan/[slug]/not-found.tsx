import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 px-6 text-center">
      <h1 className="text-6xl font-light text-amber-500 mb-4 font-serif">404</h1>
      <h2 className="text-2xl font-medium mb-3">Undangan tidak ditemukan</h2>
      <p className="text-neutral-400 text-sm max-w-md mb-8">
        Link undangan yang Anda tuju tidak tersedia atau belum dipublikasikan.
      </p>
      <Link
        href="/dev/invitations"
        className="px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm transition-colors border border-neutral-700"
      >
        Lihat Daftar Undangan
      </Link>
    </div>
  );
}
