import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ZoomIn, Loader2, PlayCircle, X } from 'lucide-react';
import { DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

// Skeleton Component
const SkeletonItem = () => (
  <div className="relative group overflow-hidden rounded-2xl bg-zinc-200 animate-pulse aspect-[4/3] flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
  </div>
);

export default function GalleryGrid({ images, isLoading }) {
  const primaryColor = DEFAULT_PRIMARY;
  const [playingVideo, setPlayingVideo] = useState(null);

  if (!isLoading && (!images || images.length === 0)) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>No media available</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((img, index) => {
          const isVideo = img.type === 'video';
          
          return (
            <motion.div
              key={img.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 10) * 0.1 }}
              className="relative group overflow-hidden rounded-2xl bg-zinc-200 aspect-[4/5] cursor-pointer"
              onClick={() => isVideo && setPlayingVideo(img.id)}
            >
              {img.image_url ? (
                isVideo ? (
                  <div className="w-full h-full relative">
                    <video 
                      src={img.image_url} 
                      preload="metadata" 
                      loop
                      muted
                      playsInline
                      onMouseOver={(e) => e.target.play()}
                      onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-300 group-hover:scale-110">
                      <PlayCircle className="w-16 h-16 text-white drop-shadow-md opacity-80 group-hover:opacity-100" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={img.image_url}
                    alt={img.title || `Gallery Image ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Media
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none z-20" style={{ background: `linear-gradient(to top, ${withAlpha(primaryColor, 0.9, DEFAULT_PRIMARY)}, transparent, transparent)` }}>
                 {img.title && (
                   <h3 className="text-white font-semibold text-lg truncate translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     {img.title}  
                   </h3>
                 )}
              </div>

              {/* Zoom Icon (only for images) */}
              {!isVideo && (
                <div className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 md:w-5 md:h-5" style={{ color: primaryColor }} />
                </div>
              )}
            </motion.div>
          );
        })}

        {isLoading && (
          <>
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </>
        )}
      </div>

      {/* Fullscreen Video Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full hover:bg-black/40" 
            onClick={() => setPlayingVideo(null)}
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          
          <div className="w-full max-w-6xl relative shadow-2xl rounded-xl overflow-hidden bg-black flex flex-col">
            <video 
              src={images.find(img => img.id === playingVideo)?.image_url} 
              controls 
              autoPlay 
              className="w-full max-h-[85vh] object-contain" 
            />
            
            {images.find(img => img.id === playingVideo)?.title && (
              <div className="p-4 bg-zinc-900 border-t border-zinc-800 text-white">
                <h3 className="text-lg font-semibold">{images.find(img => img.id === playingVideo)?.title}</h3>
                {images.find(img => img.id === playingVideo)?.description && (
                  <p className="text-zinc-400 text-sm mt-1">{images.find(img => img.id === playingVideo)?.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
