'use client';

// components/invitation/Gallery.tsx
// Swiper gallery dengan placeholder gradients

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { SectionHeading } from '@/components/ui/SectionHeading';
import type { InvitationData } from '@/types/invitation';

const GRADIENT_CLASSES = ['gp-1', 'gp-2', 'gp-3', 'gp-4', 'gp-5', 'gp-6'] as const;

export function Gallery({ data }: { data: InvitationData }) {
  const { gallery } = data;

  return (
    <section
      id="galeri"
      className="py-20 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #4A0808 0%, #2C1810 100%)' }}
      aria-label="Galeri foto prewedding"
    >
      <div className="max-w-2xl mx-auto px-6 mb-6">
        <SectionHeading eyebrow="Galeri" title="Momen Bersama" light />
      </div>

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
          640: { slidesPerView: 1.6, spaceBetween: 20 },
          1024: { slidesPerView: 2.6, spaceBetween: 28 },
          1280: { slidesPerView: 3.2, spaceBetween: 32 },
        }}
        a11y={{ prevSlideMessage: 'Foto sebelumnya', nextSlideMessage: 'Foto berikutnya' }}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative rounded-2xl overflow-hidden flex items-end ${GRADIENT_CLASSES[index % 6]}`}
              style={{ height: 380 }}
              role="img"
              aria-label={item.alt}
            >
              {/* Foto asli — tampil jika ada */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover z-10"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Label overlay */}
              <div
                className="relative z-20 w-full px-6 py-5 font-heading text-lg italic"
                style={{
                  color: 'rgba(255,251,245,0.8)',
                  background: 'linear-gradient(0deg, rgba(44,24,16,0.6) 0%, transparent 100%)',
                }}
              >
                {item.alt}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
