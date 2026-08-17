'use client';

// components/invitation/Invitation.tsx
// Main orchestrator component

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'motion/react';

import { invitationData } from '@/data/invitation';
import { Cover } from './Cover';
import { Hero } from './Hero';
import { Quote } from './Quote';
import { Couple } from './Couple';
import { Countdown } from './Countdown';
import { EventSection } from './EventSection';
import { LocationSection } from './LocationSection';
import { Gallery } from './Gallery';
import { LoveStory } from './LoveStory';
import { Gift } from './Gift';
import { RSVP } from './RSVP';
import { Wishes } from './Wishes';
import { Closing } from './Closing';
import { MusicPlayer } from './MusicPlayer';
import { FloatingNav } from './FloatingNav';

export function Invitation() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Safely extract guest name from URL ?to=
  const guestName = useMemo(() => {
    const to = searchParams.get('to');
    if (!to || !to.trim()) {
      return 'Tamu Undangan';
    }
    return to.trim();
  }, [searchParams]);

  // Lock body scroll when cover is active
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

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-cream selection:bg-gold selection:text-maroon-dark">
      {/* Cover Screen */}
      <AnimatePresence>
        {!isOpen && (
          <Cover
            guestName={guestName}
            data={invitationData}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* Main Invitation Container - Full Width Backgrounds */}
      <main
        className={`w-full relative min-h-screen transition-opacity duration-700 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <Hero data={invitationData} />
        <Quote data={invitationData} />
        <Couple data={invitationData} />
        <Countdown data={invitationData} />
        <EventSection data={invitationData} />
        <LocationSection data={invitationData} />
        <Gallery data={invitationData} />
        <LoveStory data={invitationData} />
        <Gift data={invitationData} />
        <RSVP />
        <Wishes data={invitationData} />
        <Closing data={invitationData} />
      </main>

      {/* Floating Controls */}
      <MusicPlayer
        src={invitationData.music.src}
        isVisible={isOpen}
        shouldStart={isOpen}
      />
      <FloatingNav isVisible={isOpen} />
    </div>
  );
}
