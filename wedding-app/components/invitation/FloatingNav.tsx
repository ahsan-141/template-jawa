'use client';

// components/invitation/FloatingNav.tsx
// Minimal floating bottom navigation with active section indicator

import { useEffect, useState } from 'react';
import { Home, Users, Calendar, Image, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'mempelai', label: 'Couple', icon: Users },
  { id: 'acara', label: 'Acara', icon: Calendar },
  { id: 'galeri', label: 'Galeri', icon: Image },
  { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
];

export function FloatingNav({ isVisible }: { isVisible: boolean }) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full border backdrop-blur-md shadow-2xl flex items-center gap-1 sm:gap-2 max-w-[90vw]"
      style={{
        background: 'rgba(74, 8, 8, 0.85)',
        borderColor: 'rgba(201, 168, 76, 0.3)',
      }}
      aria-label="Navigasi undangan"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative px-3 py-1.5 rounded-full flex flex-col items-center gap-0.5 text-xs transition-colors duration-200"
            style={{
              color: isActive ? '#FFFBF5' : 'rgba(245, 230, 184, 0.65)',
            }}
            aria-label={item.label}
          >
            {isActive && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute inset-0 rounded-full z-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.3) 0%, rgba(139,26,26,0.6) 100%)',
                  border: '1px solid rgba(201,168,76,0.5)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              <Icon size={16} />
            </span>
            <span className="relative z-10 text-[0.65rem] tracking-wider font-light">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
