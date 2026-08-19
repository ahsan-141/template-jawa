'use client';

// components/invitation/Invitation.tsx
// Main orchestrator — merender seluruh halaman undangan.
//
// Menerima prop `invitation` (InvitationRecord) yang berisi:
//   - themeId: id tema (misal: 'jawa-merah', 'minimalist', 'floral-elegant')
//   - customization: override konfigurasi visual spesifik customer
//   - data: isi konten undangan (groom, bride, events, gallery, dsb)
//
// Backward compatible: Jika prop `invitation` tidak dikirim,
// tetap bisa fallback ke query param `?theme=` dan `?customize=` untuk dev/testing.

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'motion/react';

import { invitationData as defaultInvitationData } from '@/data/invitation';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { useCustomization } from '@/contexts/ThemeContext';
import type { ThemeCustomization, SectionId } from '@/types/customization';
import type { InvitationRecord, InvitationData } from '@/types/invitation';
import { getTheme } from '@/lib/theme/registry';

// ── Components ────────────────────────────────────────────────
import { Cover }           from './Cover';
import { Hero }            from './Hero';
import { Quote }           from './Quote';
import { Couple }          from './Couple';
import { Countdown }       from './Countdown';
import { EventSection }    from './EventSection';
import { LocationSection } from './LocationSection';
import { Gallery }         from './Gallery';
import { LoveStory }       from './LoveStory';
import { Gift }            from './Gift';
import { RSVP }            from './RSVP';
import { Wishes }          from './Wishes';
import { Closing }         from './Closing';
import { MusicPlayer }     from './MusicPlayer';
import { FloatingNav }     from './FloatingNav';

// ── Props ─────────────────────────────────────────────────────
type InvitationProps = {
  /** Record undangan spesifik customer */
  invitation?: InvitationRecord;
  /** Programmatic customization override (dev/testing fallback) */
  customization?: ThemeCustomization;
  /** Programmatic theme ID override (dev/testing fallback) */
  themeId?: string;
  /** Programmatic data override (dev/testing fallback) */
  data?: InvitationData;
};

// ── Inner Content ─────────────────────────────────────────────
function InvitationContent({
  isOpen,
  guestName,
  data,
  onOpen,
}: {
  isOpen: boolean;
  guestName: string;
  data: InvitationData;
  onOpen: () => void;
}) {
  const { sectionOrder, isSectionVisible, customization } = useCustomization();

  // Resolve music source dari customization override atau data bawaan
  const musicSrc = customization.music?.source ?? data.music.src;

  // Cover di-handle khusus (fixed overlay)
  const coverVisible = isSectionVisible('cover');
  const mainSections = sectionOrder.filter(
    (id) => id !== 'cover' && isSectionVisible(id),
  );

  return (
    <>
      {/* Cover Screen — fixed overlay */}
      {coverVisible && (
        <AnimatePresence>
          {!isOpen && (
            <Cover
              guestName={guestName}
              data={data}
              onOpen={onOpen}
            />
          )}
        </AnimatePresence>
      )}

      {/* Main Invitation Container — sections dirender sesuai customizable order */}
      <main
        className={`w-full relative min-h-screen transition-opacity duration-700 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {mainSections.map((sectionId) => (
          <InvitationSection key={sectionId} sectionId={sectionId} data={data} />
        ))}
      </main>

      {/* Floating Controls */}
      <MusicPlayer
        src={musicSrc}
        isVisible={isOpen}
        shouldStart={isOpen}
      />
      <FloatingNav isVisible={isOpen} />
    </>
  );
}

// ── Individual section component ──────────────────────────────
function InvitationSection({
  sectionId,
  data,
}: {
  sectionId: SectionId;
  data: InvitationData;
}) {
  switch (sectionId) {
    case 'hero':        return <Hero data={data} />;
    case 'quote':       return <Quote data={data} />;
    case 'couple':      return <Couple data={data} />;
    case 'countdown':   return <Countdown data={data} />;
    case 'event':       return <EventSection data={data} />;
    case 'location':    return <LocationSection data={data} />;
    case 'gallery':     return <Gallery data={data} />;
    case 'loveStory':   return <LoveStory data={data} />;
    case 'gift':        return <Gift data={data} />;
    case 'rsvp':        return <RSVP />;
    case 'wishes':      return <Wishes data={data} />;
    case 'closing':     return <Closing data={data} />;
    default:            return null;
  }
}

// ── Main Invitation ───────────────────────────────────────────
export function Invitation({
  invitation,
  customization: propCustomization,
  themeId: propThemeId,
  data: propData,
}: InvitationProps = {}) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Guest name dari URL ?to= dengan safe fallback
  const guestName = useMemo(() => {
    const to = searchParams.get('to');
    if (!to || !to.trim()) return 'Tamu Undangan';
    return to.trim();
  }, [searchParams]);

  // Data undangan: invitation.data > propData > default fallback
  const activeData = useMemo(() => {
    return invitation?.data ?? propData ?? defaultInvitationData;
  }, [invitation, propData]);

  // Theme selection: invitation.themeId > propThemeId > URL ?theme= > default 'jawa-merah'
  const currentTheme = useMemo(() => {
    const id = invitation?.themeId ?? propThemeId ?? searchParams.get('theme');
    return getTheme(id);
  }, [invitation, propThemeId, searchParams]);

  // Customization: invitation.customization > propCustomization > URL ?customize= > {}
  const customization = useMemo<ThemeCustomization>(() => {
    if (invitation?.customization) return invitation.customization;
    if (propCustomization) return propCustomization;
    const raw = searchParams.get('customize');
    if (raw) {
      try {
        return JSON.parse(decodeURIComponent(raw)) as ThemeCustomization;
      } catch {
        console.warn('Invalid ?customize= JSON, using empty customization');
      }
    }
    return {};
  }, [invitation, propCustomization, searchParams]);

  // Lock body scroll saat cover aktif
  useEffect(() => {
    if (!isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleOpenInvitation = () => setIsOpen(true);

  return (
    <ThemeProvider theme={currentTheme} customization={customization}>
      <InvitationContent
        isOpen={isOpen}
        guestName={guestName}
        data={activeData}
        onOpen={handleOpenInvitation}
      />
    </ThemeProvider>
  );
}
