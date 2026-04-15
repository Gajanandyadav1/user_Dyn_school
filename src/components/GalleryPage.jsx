import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { listGalleryCategories, listGalleryImagesByCategory } from '@/api/adminClient';
import GalleryGrid from './website/GalleryGrid';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const loadGalleryData = async (category) => {
    try {
      setLoading(true);
      const [categoryData, imageData] = await Promise.all([
        listGalleryCategories(),
        listGalleryImagesByCategory(category),
      ]);

      setCategories(categoryData || []);
      setImages(imageData || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryData(activeCategory);
  }, [activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A glimpse into our life and events.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeCategory === 'all'
                ? 'bg-[#1E3A8A] text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category.slug
                  ? 'bg-[#1E3A8A] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <GalleryGrid images={images} isLoading={loading} />
      </div>
    </motion.div>
  );
}
