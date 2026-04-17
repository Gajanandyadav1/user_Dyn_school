/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  Shield,
  Trophy,
  Users,
  Leaf,
  Sparkles,
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

const iconMap = {
  BookOpen,
  bookopen: BookOpen,
  GraduationCap,
  graduationcap: GraduationCap,
  Shield,
  shield: Shield,
  Trophy,
  trophy: Trophy,
  Users,
  users: Users,
  Leaf,
  leaf: Leaf,
  Sparkles,
  sparkles: Sparkles,
};

export default function DifferenceSection({ data }) {
  if (!data) return null;

  const primaryColor = DEFAULT_PRIMARY;
  const cards = Array.isArray(data.blocks) ? data.blocks : [];

  return (
    <>
      <section className="bg-[#fff] py-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            {data.subheading && (
              <span
                className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: withAlpha(primaryColor, 0.08),
                  color: primaryColor,
                }}
              >
                {data.subheading}
              </span>
            )}

            <h2 className="mt-5 text-4xl font-bold  md:text-5xl"  style={{color:'black'}}>
              {data.heading}  
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-9   md:text-[20px]" style={{color:'black'}}>
              {data.middleText}
            </p>
          </motion.div>

          {/* Slider */}
          <div className="mt-14 relative pb-16">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              speed={3500}
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
                1280: { slidesPerView: 3, spaceBetween: 30 },
              }}
            >
              {cards.map((card, index) => {
                const Icon =
                  iconMap[card.icon] ||
                  iconMap[String(card.icon || '').toLowerCase()] ||
                  GraduationCap;

                return (
                  <SwiperSlide key={index}>
                    <motion.article
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)] h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                      {/* Icon */}
                      <div
                        className="mb-7 flex h-[65px] w-[65px] items-center justify-center rounded-[22px] transition-all duration-300 group-hover:scale-100 group-hover:rotate-6"
                        style={{
                          backgroundColor: withAlpha(primaryColor, 0.08),
                        }}
                      >
                        <Icon
                          className="h-8 w-8 transition-all duration-300 group-hover:scale-125"
                          style={{ color: primaryColor }}
                        />
                      </div>

                      <h3 className="text-2xl font-bold " style={{color:'black'}}>
                        {card.heading}
                      </h3>

                      <p className="mt-4 text-md leading-8  " style={{color:'black'}}>
                        {card.text}
                      </p>
                    </motion.article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Custom Pagination */}
      <style jsx global>{`
        .swiper {
          padding-bottom: 50px;
        }

        .swiper-pagination {
          bottom: 0px !important;
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