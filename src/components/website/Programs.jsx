/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Lightbulb,
  Palette,
  Dumbbell,
  FlaskConical,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import {
  DEFAULT_ACCENT,
  DEFAULT_PRIMARY,
  withAlpha,
} from '@/lib/siteTheme';

const iconMap = {
  BookOpen,
  Users,
  Lightbulb,
  Palette,
  Dumbbell,
  FlaskConical,
  book: BookOpen,
  users: Users,
  lightbulb: Lightbulb,
  palette: Palette,
  dumbbell: Dumbbell,
  flask: FlaskConical,
};

export default function Programs({ data }) {
  const content = data;
  const primaryColor = DEFAULT_PRIMARY;
  const accentColor = DEFAULT_ACCENT;

  if (!content) return null;

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span
              className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4"
              style={{
                backgroundColor: withAlpha(primaryColor, 0.1),
                color: primaryColor,
              }}
            >
              {content.subheading}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4 font-['Poppins']" style={{color:'black'}}>
              {content.heading}
            </h2>

            <p className=" text-lg max-w-2xl mx-auto whitespace-pre-wrap" style={{color:'black'}}>
              {content.description}
            </p>
          </motion.div>

          {/* Slider */}
          <div className="relative pb-16">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={3}
              spaceBetween={25}
              loop={true}
              speed={6000}
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1280: { slidesPerView: 3, spaceBetween: 25 },
              }}
            >
              {(content.blocks || []).slice(0, 4).map((program, index) => {
                const IconComponent =
                  iconMap[program.icon?.toLowerCase()] || BookOpen;

                return (
                  <SwiperSlide key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full"
                    >
                      {/* Hover Background */}
                      <div
                        
                      />

                      <div className="relative z-10">
                        {/* Image / Icon */}
                        {program.image ? (
                          <div className="w-full h-40 rounded-sm overflow-hidden mb-6 bg-slate-100 group-hover:ring-4 ring-white/30 transition-all">
                            <img
                              src={program.image}
                              alt={program.title}
                              className="w-full h-full object-cover " />
                          </div>
                        ) : (
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors"
                            style={{ backgroundColor: accentColor }}
                          >
                            <IconComponent
                              className="w-8 h-8"
                              style={{ color: primaryColor }}
                            />
                          </div>
                        )}

                        <h3 className="text-xl font-bold   mb-3 font-['Poppins'] group-hover:text-white transition-colors" style={{color:'black'}}>
                          {program.title}
                        </h3>

                        <p className="  mb-6 group-hover:text-gray-200 transition-colors line-clamp-3" style={{color:'black'}}>
                          {program.description}
                        </p>

                        {program.buttonLink && (
                          <Link
                            to={program.buttonLink}
                            className="inline-flex items-center gap-2 font-semibold group-hover:text-white transition-colors"
                            style={{ color: primaryColor }}
                          >
                            {program.buttonText}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .swiper {
          padding-bottom: 55px;
        }

        .swiper-pagination {
          bottom: 0 !important;
          text-align: center;
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
          margin: 0 5px !important;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          background: ${primaryColor};
        }

        .swiper-slide {
          height: auto;
        }
      `}</style>
    </>
  );
}