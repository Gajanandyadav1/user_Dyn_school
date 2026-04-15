/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

export default function Gallery({ data }) {
  const content = data;
  const primaryColor = DEFAULT_PRIMARY;
  const accentColor = DEFAULT_ACCENT;

  if (!content) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT), color: primaryColor }}>
            {content.subheading}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Poppins']">
            {content.heading}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {content.shortText}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {(content.blocks || []).slice(0, 6).map((imageBlock, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              } bg-zinc-200`}
            >
              {imageBlock.image ? (
                <img
                  src={imageBlock.image}
                  alt={`Gallery ${index}`}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    index === 0 ? 'h-64 md:h-full' : 'h-48 md:h-64'
                  }`}
                />
              ) : (
                <div className={`w-full ${index === 0 ? 'h-64 md:h-full' : 'h-48 md:h-64'}`} />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" style={{ background: `linear-gradient(to top, ${withAlpha(primaryColor, 0.8, DEFAULT_PRIMARY)}, transparent, transparent)` }}>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <ZoomIn className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {content.buttonLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to={content.buttonLink}
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 group"
              style={{ backgroundColor: primaryColor }}
            >
              View Full Gallery
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
