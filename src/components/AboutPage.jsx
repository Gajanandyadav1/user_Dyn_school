 


/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Star, Target, Shield, CheckCircle2, Award } from 'lucide-react';
import { getPageContent } from '../services/contentService';
import { usePageStore } from '../store/pageContentStore';
import FixedImage from './ui/FixedImage';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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
        <Loader2 className="h-10 w-10 animate-spin text-[var(--site-primary)]" />
        <p className="font-semibold text-lg animate-pulse tracking-wide font-['Poppins']">Loading About Us...</p>
      </div>
    );
  }

  // EXACT STRUCTURE ENFORCEMENT
  const hero = data?.hero || {};
  const section2 = data?.section2 || {};
  const tabs = data?.tabs || {};
  const slider = data?.slider || {};
  const history = data?.history || {};

  console.log("ABOUT DATA:", data);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* 1. HERO BLOCK */}
      <section className="relative w-full bg-[var(--site-primary)] overflow-hidden flex items-center justify-center min-h-[300px]"  >
        {hero?.backgroundImage ? (
           <FixedImage src={hero.backgroundImage} ratio="28/9" className="opacity-40 mix-blend-overlay w-full" />
        ) : (
           <div className="w-full text-transparent" style={{ aspectRatio: '16/9' }}>.</div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-white z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-['Poppins'] tracking-tight" style={{color:'#fff'}}>{hero?.heading}</h1>
          {hero?.subheading && <p className="mt-4 md:mt-6 text-xl md:text-2xl font-medium text-yellow-300 drop-shadow-md">{hero.subheading}</p>}
          {hero?.description && <p className="mt-4 md:mt-6 text-lg md:text-xl drop-shadow max-w-3xl mx-auto opacity-95">{hero.description}</p>}
        </div>
      </section>

      {/* 2. IMAGE LEFT + CONTENT RIGHT */}
      <section className="bg-slate-50 my-8">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {section2?.image ? (
              <div className="shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
                 <FixedImage src={section2.image} ratio="4/4" />
              </div>
            ) : (
              <div className="shadow-2xl rounded-2xl bg-white aspect-[4/3] flex items-center justify-center text-slate-300 border border-slate-100">Image goes here</div>
            )}
            <div className="flex flex-col justify-center space-y-6">
              
              <h2 className="text-4xl font-bold   font-['Poppins']"  style={{color:'#000'}}>{section2?.heading || "Our Story"}</h2>
              {section2?.subheading && <h3 className="text-xl font-medium text-[var(--site-primary)]" style={{color:'#65758b'}}>{section2.subheading}</h3>}
              <p className="text-lg  leading-relaxed whitespace-pre-wrap" style={{color:'#65758b'}}>{section2?.description || "Discover our journey..."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TABS (MISSION / VISION) */}
      {tabs?.blocks?.length > 0 && (
        <section className="bg-white">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold font-['Poppins'] mb-4" style={{color:'black'}}>{tabs?.heading || "Mission & Vision"}</h2>
              {tabs?.subheading && <p className="text-xl  font-medium mb-4" style={{color:'black'}}>{tabs.subheading}</p>}  
              {tabs?.description && <p className="text-lg  " style={{color:'black'}}>{tabs.description}</p>}
            </div>

            <div className="flex justify-center space-x-2 md:space-x-8 mb-12 overflow-x-auto p-2">
              {tabs.blocks.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap shadow-sm ${
                    activeTab === idx 
                      ? "bg-[var(--site-primary)] text-white shadow-md transform -translate-y-1" 
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
                    <h2 className="text-xl  font-bold  font-['Poppins']" style={{color:'black'}}>{tabs.blocks[activeTab].mainHeading}</h2> 
                    <h5 className=" mb-0 font-semibold text-[var(--site-primary)]" style={{color:'black'}}>{tabs.blocks[activeTab].mainSubheading}</h5>
                    <p className="   leading-relaxed" style={{color:'black'}}>{tabs.blocks[activeTab].mainDescription}</p>
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
                        <p className="  font-medium pt-3" style={{color:'black'}}>{card.text}</p>
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
  <section className="bg-[var(--site-primary)] text-white py-20">
    <div className="section-container">
      
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-4xl font-bold font-['Poppins'] mb-4" style={{color:'#fff'}}>
          {slider?.heading || "Core Values"}
        </h2>

        {slider?.subheading && (
          <p className="text-xl text-yellow-300 font-medium mb-4">
            {slider.subheading}  
          </p>
        )}

        {slider?.description && (
          <p className="text-lg opacity-90">
            {slider.description}
          </p> 
        )}
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={25}
        autoplay={{ delay: 2500 }}
        loop={true}
        pagination={{ clickable: true }}
        className="pb-14"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {slider.blocks.map((card, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl text-slate-800 hover:-translate-y-2 transition-transform duration-300 group">
              
              <FixedImage
                src={card.image}
                ratio="1/1"
                className="group-hover:scale-105 transition-transform duration-500"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold font-['Poppins']   mb-3" style={{color:'black'}}>
                  {card.title}
                </h3>

                <p className="  line-clamp-3" style={{color:'black'}}>
                  {card.shortText}
                </p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  </section>
)}
      {/* 5. HISTORY TIMELINE */}
  {history?.blocks?.length > 0 && (
  <section className="bg-slate-50 py-24 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 lg:px-8">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2
          className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']"
          style={{ color: "black" }}
        >
          {history?.heading || "Our Journey"}
        </h2>


        {history?.subheading && (
          <p className="text-xl font-medium text-[var(--site-primary)] mb-3">
            {history.subheading}
          </p>
        )}

        {history?.description && (
          <p className="text-lg text-slate-500 leading-relaxed">
            {history.description}
          </p>
        )}
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Center Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 md:-translate-x-1/2"></div>

        <div className="space-y-14">
          {history.blocks.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const circleText = item.year?.slice(-2) || "00";

            return (
              <div
                key={idx}
                className="relative flex flex-col md:flex-row items-center"
              >
                {/* Left Card */}
                <div className="w-full md:w-1/2 px-0 md:px-8">
                  {isLeft && (
                    <div className="ml-16 md:ml-0 md:mr-14">
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {item.heading}
                        </h3>
                        <p className="text-slate-500 leading-7 text-[15px]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Center Dot */}
                <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm shadow-lg md:-translate-x-1/2">
                  {circleText}
                </div>

                {/* Year */}
                <div
                  className={`absolute top-3 text-sm md:text-base font-bold text-[#2563eb]
                  ${
                    isLeft
                      ? "left-16 md:left-1/2 md:ml-10"
                      : "left-16 md:right-1/2 md:mr-10 md:left-auto"
                  }`}
                >
                  {item.year}
                </div>

                {/* Right Card */}
                <div className="w-full md:w-1/2 px-0 md:px-8">
                  {!isLeft && (
                    <div className="ml-16 md:ml-14">
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {item.heading}
                        </h3>
                        <p className="text-slate-500 leading-7 text-[15px]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  </section>
)}
    </motion.div>
  );
}
