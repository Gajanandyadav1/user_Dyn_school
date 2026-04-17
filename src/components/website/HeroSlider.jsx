/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY } from '@/lib/siteTheme';
import { Calendar } from 'lucide-react';
export default function HeroSlider({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const primaryColor = DEFAULT_PRIMARY || "var(--site-primary)";
  const accentColor = DEFAULT_ACCENT || "var(--site-accent)";

  const content = data;

  const slides =
    content?.blocks && content.blocks.length > 0
      ? content.blocks
      : content?.heading
      ? [content]
      : [];

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentIndex];

  return (
    <section className="relative h-[95vh] min-h-[600px] overflow-hidden bg-slate-900 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(${
                slide?.image ||
                'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920'
              })`,
            }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${primaryColor}E6, ${primaryColor}99, transparent)`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center z-10">
            <div className="max-w-2xl ml-6 md:ml-16 lg:ml-24">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Poppins'] leading-tight"
            style={{color:'#fff', fontWeight:'600'}}    >
                {slide?.heading}
              </motion.h1>

              {slide?.subheading && (
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl md:text-3xl text-yellow-300 font-semibold mb-4"
                  style={{color:"var(--site-accent)"}}
                >
                  {slide.subheading}
                </motion.h2>
              )}

              {slide?.description && (
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed whitespace-pre-wrap"
                >
                  {slide.description}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {slide?.button1Text && (
                  <Link
                    to={slide?.button1Link || '#'}
                    className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-xl transition-all hover:shadow-xl hover:-translate-y-1 group/btn hover:bg-yellow-400"
                    style={{
                      backgroundColor: accentColor,
                      color: primaryColor,
                    }}
                  >
                    {slide.button1Text}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                )}

                {slide?.button2Text && (
              <Link
  to={slide?.button2Link || '#'}
  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white transition-all hover:text-[var(--site-primary)]"
>
  <Calendar className="w-5 h-5" />
  {slide.button2Text}
</Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 text-white backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 text-white backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-yellow-300'
                    : 'w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}