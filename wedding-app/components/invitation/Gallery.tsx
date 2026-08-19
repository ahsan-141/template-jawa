'use client';

// components/invitation/Gallery.tsx
// Gallery section — theme-aware + layout variants.
//
// Variants (via customization.layout.gallery):
//   'slider'    — Swiper carousel (default, existing behavior)
//   'grid'      — CSS grid responsive masonry-like
//   'editorial' — Alternating large/small magazine layout
//
// galleryCaptionScheme: 'dark' | 'light' | 'rose'
// Gallery background + gradients dari theme config.

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { useTheme, useCustomization } from '@/contexts/ThemeContext';
import type { InvitationData, GalleryImage } from '@/types/invitation';

// Caption overlay styles per scheme
const captionStyles: Record<
  'dark' | 'light' | 'rose',
  { color: string; background: string }
> = {
  dark: {
    color: 'rgba(255,251,245,0.85)',
    background: 'linear-gradient(0deg, rgba(44,24,16,0.65) 0%, transparent 100%)',
  },
  light: {
    color: 'rgba(26,26,26,0.75)',
    background: 'linear-gradient(0deg, rgba(255,255,255,0.88) 0%, transparent 100%)',
  },
  rose: {
    color: 'rgba(45,40,41,0.8)',
    background: 'linear-gradient(0deg, rgba(240,230,232,0.82) 0%, transparent 100%)',
  },
};

// ── Shared image card ─────────────────────────────────────────
function GalleryCard({
  item,
  index,
  height,
  gradients,
  borderRadius,
  caption,
}: {
  item: GalleryImage;
  index: number;
  height: number;
  gradients: string[];
  borderRadius: string;
  caption: { color: string; background: string };
}) {
  return (
    <div
      className="relative overflow-hidden flex items-end"
      style={{
        height,
        background: gradients[index % gradients.length],
        borderRadius,
      }}
      role="img"
      aria-label={item.alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover z-10"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      {/* Caption overlay */}
      <div
        className="relative z-20 w-full px-6 py-5 font-heading text-lg italic"
        style={{ color: caption.color, background: caption.background }}
      >
        {item.alt}
      </div>
    </div>
  );
}

// ── Slider variant (existing Swiper behavior) ─────────────────
function GallerySlider({
  gallery,
  gradients,
  borderRadius,
  caption,
}: {
  gallery: GalleryImage[];
  gradients: string[];
  borderRadius: string;
  caption: { color: string; background: string };
}) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      loop={false}
      centeredSlides
      slidesPerView={1.1}
      spaceBetween={16}
      autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      navigation
      className="gallery-swiper pb-12!"
      breakpoints={{
        640:  { slidesPerView: 1.6, spaceBetween: 20 },
        1024: { slidesPerView: 2.6, spaceBetween: 28 },
        1280: { slidesPerView: 3.2, spaceBetween: 32 },
      }}
      a11y={{ prevSlideMessage: 'Foto sebelumnya', nextSlideMessage: 'Foto berikutnya' }}
    >
      {gallery.map((item, index) => (
        <SwiperSlide key={index}>
          <GalleryCard
            item={item}
            index={index}
            height={380}
            gradients={gradients}
            borderRadius={borderRadius}
            caption={caption}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// ── Grid variant ──────────────────────────────────────────────
function GalleryGrid({
  gallery,
  gradients,
  borderRadius,
  caption,
}: {
  gallery: GalleryImage[];
  gradients: string[];
  borderRadius: string;
  caption: { color: string; background: string };
}) {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {gallery.map((item, index) => (
          <GalleryCard
            key={index}
            item={item}
            index={index}
            height={260}
            gradients={gradients}
            borderRadius={borderRadius}
            caption={caption}
          />
        ))}
      </div>
    </div>
  );
}

// ── Editorial variant ─────────────────────────────────────────
function GalleryEditorial({
  gallery,
  gradients,
  borderRadius,
  caption,
}: {
  gallery: GalleryImage[];
  gradients: string[];
  borderRadius: string;
  caption: { color: string; background: string };
}) {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="space-y-4">
        {gallery.map((item, index) => {
          // Alternating: even = full width large, odd = 2-column
          const isLarge = index % 3 === 0;

          if (isLarge) {
            return (
              <GalleryCard
                key={index}
                item={item}
                index={index}
                height={420}
                gradients={gradients}
                borderRadius={borderRadius}
                caption={caption}
              />
            );
          }

          // Pair items for 2-column rows
          const nextItem = gallery[index + 1];
          if (index % 3 === 1) {
            return (
              <div key={index} className="grid grid-cols-2 gap-4">
                <GalleryCard
                  item={item}
                  index={index}
                  height={300}
                  gradients={gradients}
                  borderRadius={borderRadius}
                  caption={caption}
                />
                {nextItem && (
                  <GalleryCard
                    item={nextItem}
                    index={index + 1}
                    height={300}
                    gradients={gradients}
                    borderRadius={borderRadius}
                    caption={caption}
                  />
                )}
              </div>
            );
          }

          // index % 3 === 2 already rendered as part of the pair
          return null;
        })}
      </div>
    </div>
  );
}

// ── Main Gallery ──────────────────────────────────────────────
export function Gallery({ data }: { data: InvitationData }) {
  const { gallery } = data;
  const theme = useTheme();
  const { customization } = useCustomization();
  const { backgrounds, galleryGradients, decoration, galleryCaptionScheme } = theme;

  // Resolve gallery variant: customization > default 'slider'
  const variant = customization.layout?.gallery ?? 'slider';

  // Jawa: dark section bg → light heading. Floral + Minimalist: light bg → dark heading.
  const lightHeading = decoration.style === 'jawa';
  const caption = captionStyles[galleryCaptionScheme];
  const borderRadius = decoration.style === 'floral' ? '12px' : '16px';

  return (
    <section
      id="galeri"
      className="py-20 overflow-hidden"
      style={{ background: backgrounds.gallery }}
      aria-label="Galeri foto prewedding"
    >
      <div className="max-w-2xl mx-auto px-6 mb-6">
        <SectionHeading
          eyebrow="Galeri"
          title="Momen Bersama"
          light={lightHeading}
        />
      </div>

      {variant === 'grid' ? (
        <GalleryGrid
          gallery={gallery}
          gradients={galleryGradients}
          borderRadius={borderRadius}
          caption={caption}
        />
      ) : variant === 'editorial' ? (
        <GalleryEditorial
          gallery={gallery}
          gradients={galleryGradients}
          borderRadius={borderRadius}
          caption={caption}
        />
      ) : (
        <GallerySlider
          gallery={gallery}
          gradients={galleryGradients}
          borderRadius={borderRadius}
          caption={caption}
        />
      )}
    </section>
  );
}
