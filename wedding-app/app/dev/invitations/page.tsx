import Link from 'next/link';
import { getAllInvitations } from '@/lib/invitations/getInvitation';

export default async function DevInvitationsPage() {
  const invitations = await getAllInvitations();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-xl font-semibold mb-1 text-white">
          Daftar Undangan (Dev)
        </h1>
        <p className="text-xs text-neutral-400 mb-6">
          Klik untuk membuka undangan dinamis per customer:
        </p>

        <div className="space-y-3">
          {invitations.map((inv) => (
            <div
              key={inv.slug}
              className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 hover:border-neutral-500 transition-all flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white text-base">
                  {inv.data.groom.nickname} &amp; {inv.data.bride.nickname}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  {inv.themeId}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Link
                  href={`/undangan/${inv.slug}`}
                  className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  /undangan/{inv.slug}
                </Link>
                <span className="text-neutral-600 text-xs">|</span>
                <Link
                  href={`/undangan/${inv.slug}?to=Andi+Pratama`}
                  className="text-xs text-neutral-400 hover:text-neutral-300"
                >
                  + ?to=Andi Pratama
                </Link>
              </div>
            </div>
          ))}

          {/* 404 test link */}
          <div className="p-3 rounded-xl bg-neutral-900 border border-dashed border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
            <span>Uji link tidak terdaftar:</span>
            <Link
              href="/undangan/not-found"
              className="text-red-400 hover:text-red-300 underline"
            >
              /undangan/not-found
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <Link
            href="/dev/customization"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            ← Live Customization Tool
          </Link>
          <Link
            href="/?theme=jawa-merah"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Direct Theme (?theme=) →
          </Link>
        </div>
      </div>
    </div>
  );
}
