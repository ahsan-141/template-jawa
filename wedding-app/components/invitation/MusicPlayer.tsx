'use client';

// components/invitation/MusicPlayer.tsx
// Floating music control button — theme-aware.

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type MusicPlayerProps = {
  src: string;
  isVisible: boolean;
  shouldStart: boolean;
};

export function MusicPlayer({ src, isVisible, shouldStart }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { colors } = useTheme();

  // Inisialisasi Audio element
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.5;

    audio.addEventListener('error', () => {
      setHasError(true);
      console.info('File musik tidak ditemukan:', src);
    });

    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [src]);

  // Play otomatis setelah cover terbuka
  useEffect(() => {
    if (!shouldStart || hasError || !audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Autoplay diblokir browser — user bisa klik manual
    });
  }, [shouldStart, hasError]);

  const toggle = useCallback(() => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, hasError]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.button
        onClick={toggle}
        className="fixed bottom-24 right-5 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-xl border transition-colors duration-200"
        style={{
          background: colors.musicBtnBg,
          borderColor: colors.musicBtnBorder,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: hasError ? 0.4 : 1, scale: 1 }}
        whileHover={!hasError ? { scale: 1.08 } : {}}
        whileTap={!hasError ? { scale: 0.94 } : {}}
        aria-label={isPlaying ? 'Jeda musik latar' : 'Putar musik latar'}
        aria-pressed={isPlaying}
        disabled={hasError}
        title={hasError ? 'Musik tidak tersedia' : isPlaying ? 'Jeda musik' : 'Putar musik'}
      >
        {isPlaying ? (
          <>
            {/* Animasi equalizer saat playing */}
            <motion.div className="flex items-end gap-0.5 absolute" initial={false}>
              {[1, 0.5, 0.8, 0.4, 1].map((h, i) => (
                <motion.span
                  key={i}
                  className="block w-0.5 rounded-sm"
                  style={{ background: colors.accentOnDark, height: 14 }}
                  animate={{ scaleY: [h, h * 0.3, h, h * 0.6, h] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
            <span className="sr-only">Sedang memutar</span>
          </>
        ) : (
          <Music size={18} style={{ color: colors.accentOnDark }} aria-hidden="true" />
        )}
      </motion.button>
    </AnimatePresence>
  );
}
