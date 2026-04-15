import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Star, Target, Shield, CheckCircle2, Award } from 'lucide-react';
import { getPageContent } from '../services/contentService';
import { usePageStore } from '../store/pageContentStore';
import FixedImage from './ui/FixedImage';

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  
  const defaultAbout = usePageStore(state => state.content.about);

  useEffect(() => {
    async function loadData() {
      const apiData = await getPageContent("about");
      setData({ ...defaultAbout, ...(apiData || {}) });
      setLoading(false);
    }
    loadData();
  }, [defaultAbout]);

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-slate-500">
        <Loader2 className="h-10 w-10 animate-spin text-[#1E3A8A]" />
        <p className="font-semibold text-lg animate-pulse tracking-wide font-['Poppins']">Loading About Us...</p>
      </div>
    );
  }

  // EXACT STRUCTURE ENFORCEMENT
  const hero = data?.hero || {};
  const section2 = data?.section2 || {};
  const tabs = data?.tabs || {};
  const slider = data?.slider || {};
  const stats = data?.stats || {};

  console.log("ABOUT DATA:", data);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* 1. HERO BLOCK */}
      <section className="relative w-full bg-[#1E3A8A] overflow-hidden flex items-center justify-center min-h-[300px]">
        {hero?.backgroundImage ? (
           <FixedImage src={hero.backgroundImage} ratio="16/9" className="opacity-40 mix-blend-overlay w-full" />
        ) : (
           <div className="w-full text-transparent" style={{ aspectRatio: '16/9' }}>.</div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-white z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-['Poppins'] tracking-tight">{hero?.heading}</h1>
          {hero?.subheading && <p className="mt-4 md:mt-6 text-xl md:text-2xl font-medium text-yellow-300 drop-shadow-md">{hero.subheading}</p>}
          {hero?.description && <p className="mt-4 md:mt-6 text-lg md:text-xl drop-shadow max-w-3xl mx-auto opacity-95">{hero.description}</p>}
        </div>
      </section>

      {/* 2. IMAGE LEFT + CONTENT RIGHT */}
      <section className="bg-slate-50">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {section2?.image ? (
              <div className="shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
                 <FixedImage src={section2.image} ratio="4/3" />
              </div>
            ) : (
              <div className="shadow-2xl rounded-2xl bg-white aspect-[4/3] flex items-center justify-center text-slate-300 border border-slate-100">Image goes here</div>
            )}
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 font-['Poppins']">{section2?.heading || "Our Story"}</h2>
              {section2?.subheading && <h3 className="text-xl font-medium text-[#1E3A8A]">{section2.subheading}</h3>}
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">{section2?.description || "Discover our journey..."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TABS (MISSION / VISION) */}
      {tabs?.blocks?.length > 0 && (
        <section className="bg-white">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 font-['Poppins'] mb-4">{tabs?.heading || "Mission & Vision"}</h2>
              {tabs?.subheading && <p className="text-xl text-[#1E3A8A] font-medium mb-4">{tabs.subheading}</p>}
              {tabs?.description && <p className="text-lg text-gray-600">{tabs.description}</p>}
            </div>

            <div className="flex justify-center space-x-2 md:space-x-8 mb-12 overflow-x-auto p-2">
              {tabs.blocks.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 whitespace-nowrap shadow-sm ${
                    activeTab === idx 
                      ? "bg-[#1E3A8A] text-white shadow-md transform -translate-y-1" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.title || `Tab ${idx + 1}`}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 shadow-inner border border-slate-100">
              {tabs.blocks[activeTab] && (
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                >
                  <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 font-['Poppins']">{tabs.blocks[activeTab].mainHeading}</h3>
                    <h4 className="text-lg font-semibold text-[#1E3A8A]">{tabs.blocks[activeTab].mainSubheading}</h4>
                    <p className="text-slate-600 text-lg leading-relaxed">{tabs.blocks[activeTab].mainDescription}</p>
                  </div>
                  <div className="space-y-6 flex flex-col justify-center">
                    {[
                      { icon: tabs.blocks[activeTab].icon1, text: tabs.blocks[activeTab].text1 },
                      { icon: tabs.blocks[activeTab].icon2, text: tabs.blocks[activeTab].text2 }
                    ].map((card, i) => card.text && (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex items-start space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex flex-shrink-0 items-center justify-center text-yellow-600">
                           {card.icon?.toLowerCase().includes("star") ? <Star className="w-6 h-6" /> : 
                            card.icon?.toLowerCase().includes("target") ? <Target className="w-6 h-6" /> : 
                            card.icon?.toLowerCase().includes("shield") ? <Shield className="w-6 h-6" /> : 
                            card.icon?.toLowerCase().includes("award") ? <Award className="w-6 h-6" /> : 
                            <CheckCircle2 className="w-6 h-6" />}
                        </div>
                        <p className="text-gray-800 font-medium pt-3">{card.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. SLIDER CARDS */}
      {slider?.blocks?.length > 0 && (
        <section className="bg-[#1E3A8A] text-white">
          <div className="section-container" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <div className="text-center max-w-3xl mx-auto mb-16 px-4">
              <h2 className="text-4xl font-bold font-['Poppins'] mb-4">{slider?.heading || "Core Values"}</h2>
              {slider?.subheading && <p className="text-xl text-yellow-300 font-medium mb-4">{slider.subheading}</p>}
              {slider?.description && <p className="text-lg opacity-90">{slider.description}</p>}
            </div>
            
            {/* Horizontal Slider Layout Fixed Width */}
            <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide py-4 px-4 sm:px-8 w-full max-w-[1200px] mx-auto">
              {slider.blocks.map((card, idx) => (
                <div key={idx} className="snap-center shrink-0 w-[280px] md:w-[320px] bg-white rounded-2xl overflow-hidden shadow-xl text-slate-800 hover:-translate-y-2 transition-transform duration-300 group">
                  <FixedImage src={card.image} ratio="1/1" className="group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-['Poppins'] text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-slate-600 line-clamp-3">{card.shortText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. STATS CARDS */}
      {stats?.blocks?.length > 0 && (
        <section className="bg-slate-50">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-gray-900 font-['Poppins'] mb-4">{stats?.heading || "By the Numbers"}</h2>
              {stats?.subheading && <p className="text-xl text-[#1E3A8A] font-medium mb-4">{stats.subheading}</p>}
              {stats?.description && <p className="text-lg text-gray-600">{stats.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column Stats */}
              <div className="space-y-6">
                {stats.blocks.filter(b => b?.side?.toLowerCase() === 'left').map((stat, idx) => (
                  <div key={`l-${idx}`} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="text-5xl font-black text-yellow-500 mb-4 tracking-tighter">{stat.number}</div>
                    <h3 className="text-2xl font-bold text-gray-900 font-['Poppins'] mb-2">{stat.heading}</h3>
                    {stat.subheading && <h4 className="text-lg font-medium text-[#1E3A8A] mb-3">{stat.subheading}</h4>}
                    <p className="text-slate-600 text-lg leading-relaxed">{stat.text}</p>
                  </div>
                ))}
              </div>

              {/* Right Column Stats */}
              <div className="space-y-6 md:mt-12">
                {stats.blocks.filter(b => b?.side?.toLowerCase() !== 'left').map((stat, idx) => (
                  <div key={`r-${idx}`} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="text-5xl font-black text-yellow-500 mb-4 tracking-tighter">{stat.number}</div>
                    <h3 className="text-2xl font-bold text-gray-900 font-['Poppins'] mb-2">{stat.heading}</h3>
                    {stat.subheading && <h4 className="text-lg font-medium text-[#1E3A8A] mb-3">{stat.subheading}</h4>}
                    <p className="text-slate-600 text-lg leading-relaxed">{stat.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
