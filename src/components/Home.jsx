/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { Loader2, AlertCircle } from 'lucide-react';
import { usePageStore } from '../store/pageContentStore';


import HeroSlider from './website/HeroSlider';
import AboutSection from './website/AboutSection';
import DifferenceSection from './website/DifferenceSection';
import Achievements from './website/Achievements';
import Programs from './website/Programs';
import FAQ from './website/FAQ';
import Testimonials from './website/Testimonials';
import Admission from './website/Admission';

export default function Home() {
  const fetchContent = usePageStore((state) => state.fetchContent);
  const isLoading = usePageStore((state) => state.isLoading);
  const error = usePageStore((state) => state.error);
  const content = usePageStore((state) => state.content);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-slate-500">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--site-primary)]" />
        <p className="font-semibold text-lg animate-pulse tracking-wide font-['Poppins']">Loading Experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3 text-rose-500">
        <AlertCircle className="h-10 w-10" />
        <p className="font-bold text-xl font-['Poppins']">Failed to load content.</p>
        <p className="text-sm opacity-80">{error}</p>
        <button 
          onClick={() => fetchContent()} 
          className="mt-4 text-white bg-rose-500 px-6 py-2.5 rounded-full font-semibold hover:bg-rose-600 transition hover:shadow-lg"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSlider data={content?.home?.hero} />
      <AboutSection data={content?.home?.about_preview} />
      <DifferenceSection data={content?.home?.difference_section} />
      <Achievements data={content?.home?.achievements} />
      <Programs data={content?.home?.programs} />
      <FAQ data={content?.home?.faq || content?.home?.notices} />
      <Testimonials data={content?.home?.testimonials} />
      <Admission data={content?.home?.admission} />
    </motion.div>
  );
}
