/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  listGalleryCategories,
  listGalleryImagesByCategory,
} from "@/api/adminClient";
import GalleryGrid from "./website/GalleryGrid";
import { getPageContent } from "../services/contentService";
import {
  DEFAULT_ACCENT,
  DEFAULT_PRIMARY,
  withAlpha,
} from "../lib/siteTheme";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("images"); // 'images' or 'videos'
  const [activeCategory, setActiveCategory] = useState("all");
  const [pageData, setPageData] = useState(null);

  const loadGalleryData = async (category) => {
    try {
      setLoading(true);

      const [categoryData, imageData, contentData] = await Promise.all([
        listGalleryCategories(),
        listGalleryImagesByCategory(category),
        getPageContent("gallery"),
      ]);

      setCategories(categoryData || []);
      setImages(imageData || []);
      setPageData(contentData || {});
    } catch (error) {
      console.error("Error fetching gallery data:", error);
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
      className="bg-gray-50 min-h-screen"
    >
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative h-[70vh] min-h-[350px] overflow-hidden"
        style={{ backgroundColor: DEFAULT_PRIMARY }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              pageData?.hero?.backgroundImage ||
              pageData?.hero?.image ||
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920"
            })`,
          }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${withAlpha(
              DEFAULT_PRIMARY,
              0.92
            )}, ${withAlpha(DEFAULT_PRIMARY, 0.75)}, ${withAlpha(
              DEFAULT_PRIMARY,
              0.88
            )})`,
          }}
        />

        {/* Center Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl"
          >
            {pageData?.hero?.subheading && (
              <span
                className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-5"
                style={{
                  // backgroundColor: DEFAULT_ACCENT,
                  // color: DEFAULT_PRIMARY,
                  color:'#fff'
                }}
              >
                {pageData.hero.subheading}
              </span>
            )}

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Poppins']" style={{color:'#ffffff'}}>
              {pageData?.hero?.heading || "Gallery"}
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-8">
              {pageData?.hero?.description ||
                "A glimpse into our life and events."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Tabs (Images/Videos) */}
        <div className="flex justify-center mb-10 gap-4">
          <button
            onClick={() => setActiveTab('images')}
            className={`px-8 py-3 rounded-full font-bold text-base transition-all ${
              activeTab === 'images' ? 'bg-[var(--site-primary)] text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-8 py-3 rounded-full font-bold text-base transition-all ${
              activeTab === 'videos' ? 'bg-[var(--site-primary)] text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            Videos
          </button>
        </div>

        {/* Category Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeCategory === "all"
                ? "text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:border-[var(--site-primary)] hover:text-[var(--site-primary)]"
            }`}
            style={
              activeCategory === "all"
                ? { backgroundColor: DEFAULT_PRIMARY }
                : {}
            }
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
                  ? "text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-[var(--site-primary)] hover:text-[var(--site-primary)]"
              }`}
              style={
                activeCategory === category.slug
                  ? { backgroundColor: DEFAULT_PRIMARY }
                  : {}
              }
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <GalleryGrid 
           images={images.filter(img => (img.type || 'image') === (activeTab === 'images' ? 'image' : 'video'))} 
           isLoading={loading} 
        />
      </div>
    </motion.div>
  );
}