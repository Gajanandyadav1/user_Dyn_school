import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, Loader2 } from 'lucide-react';
import { DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

// Skeleton Component
const SkeletonItem = () => (
  <div className="relative group overflow-hidden rounded-2xl bg-zinc-200 animate-pulse aspect-[4/3] flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
  </div>
);

export default function GalleryGrid({ images, isLoading }) {
  const primaryColor = DEFAULT_PRIMARY;

  if (!isLoading && (!images || images.length === 0)) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>No gallery images available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {images.map((img, index) => (
        <motion.div
          key={img.id || index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (index % 10) * 0.1 }}
          className="relative group overflow-hidden rounded-2xl bg-zinc-200 aspect-[4/3]"
        >
          {img.image_url ? (
            <img
              src={img.image_url}
              alt={img.title || `Gallery Image ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4" style={{ background: `linear-gradient(to top, ${withAlpha(primaryColor, 0.9, DEFAULT_PRIMARY)}, transparent, transparent)` }}>
             {img.title && (
               <h3 className="text-white font-semibold text-lg truncate translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                 {img.title}
               </h3>
             )}
          </div>

          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <ZoomIn className="w-4 h-4 md:w-5 md:h-5" style={{ color: primaryColor }} />
          </div>
        </motion.div>
      ))}

      {isLoading && (
        <>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </>
      )}
    </div>
  );
}
