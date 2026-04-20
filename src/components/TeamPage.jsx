/* eslint-disable no-unused-vars */
 
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Award } from "lucide-react";
import { getPageContent } from "../services/contentService";
import { usePageStore } from "../store/pageContentStore";
import FixedImage from "./ui/FixedImage";
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from "../lib/siteTheme";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function TeamPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultTeam = usePageStore((state) => state.content.team);

  useEffect(() => {
    async function loadData() {
      const apiData = await getPageContent("team");

      console.log("API DATA:", apiData);
      console.log("DEFAULT DATA:", defaultTeam);

      setData({ ...defaultTeam, ...(apiData || {}) });
      setLoading(false);
    }

    loadData();
  }, [defaultTeam]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center flex-col gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-blue-800" />
        <p>Loading Team...</p>
      </div>
    );
  }

  const {
    intro = {},
    memberLeft = {},
    memberRight = {},
    teamHeader = {},
    teamCards = {},
    supportStaff = {},
  } = data || {};

  console.log("TEAM CARDS:", teamCards?.blocks);
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24"
    >
      {/* ================= INTRO ================= */}
      {/* ================= INTRO ================= */}
      <section className="relative h-[70vh] min-h-[350px] overflow-hidden bg-[var(--site-primary)]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${
              intro.backgroundImage ||
              intro.image ||
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920"
            })`,
          }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--site-primary)] via-[var(--site-primary)]/80 to-transparent"
        />

  {/* Center Content */}
  <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center max-w-3xl"
    >
      {intro.subheading && (
        <span
          className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4"
          style={{
             color:'#fff'
          }}
        >
          {intro.subheading}
        </span>
      )}

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Poppins']" style={{color:'#fff'}}>
        {intro.heading || "Our Team"} 
      </h1>

      {intro.description && (
        <p className="text-xl text-gray-200 leading-8">
          {intro.description}
        </p>
      )}
    </motion.div>
  </div>
</section>
      {/* ================= MEMBER LEFT ================= */}
{(memberLeft.heading || memberLeft.image) && (
  <section className="py-20 md:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
      
      {/* Image Side */}
      <div className="relative group">
        <div
          className="absolute -inset-3 rounded-[32px] blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500 bg-[var(--site-primary)]"
        ></div>

        <div className="relative rounded-[32px] overflow-hidden bg-white border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
          <FixedImage src={memberLeft.image} ratio="5/5" />

          {/* Floating Badge */}
          {memberLeft.smallText && (
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-sm font-semibold shadow-xl text-white bg-[var(--site-primary)]"
            >
              {memberLeft.smallText}
            </div>
          )}
        </div>
      </div>

      {/* Content Side */}
      <div>
        <span
          className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[2px] uppercase mb-5 bg-[var(--site-primary)]/10 text-[var(--site-primary)]"
        >
          Leadership Message
        </span>

        {memberLeft.name && (
          <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] leading-tight" style={{color:'#2b2a2a'}}>
            {memberLeft.name}
          </h2>
        )}

        {memberLeft.subheading && (
          <p className="mt-3 text-xl font-medium" style={{color:'#000'}}>
            {memberLeft.subheading}
          </p>
        )}

        {memberLeft.heading && (
          <p
            className="mt-4 text-lg font-semibold text-[var(--site-primary)]"
          >
            {memberLeft.heading}
          </p>
        )}

        {memberLeft.description && (
          <div className="mt-8 border-l-4 pl-6 italic leading-8 text-lg border-[var(--site-primary)] text-[#65758b]"
          >
            {memberLeft.description}
          </div>
        )}
      </div>
    </div>
  </section>
)}

{/* ================= MEMBER RIGHT ================= */}
{(memberRight.heading || memberRight.image) && (
  <section className="py-20 md:py-28 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
      
      {/* Image Side */}
      <div className="relative group md:order-2">
        <div
          className="absolute -inset-3 rounded-[32px] blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500 bg-[var(--site-primary)]"
        ></div>

        <div className="relative rounded-[32px] overflow-hidden bg-white border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
          <FixedImage src={memberRight.image} ratio="5/4" />

          {/* Floating Badge */}
          {memberRight.smallText && (
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-sm font-semibold shadow-xl text-white bg-[var(--site-primary)]"
            >
              {memberRight.smallText}
            </div>
          )}
        </div>
      </div>

      {/* Content Side */}
      <div className="md:order-1">
        <span
          className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[2px] uppercase mb-5 bg-[var(--site-primary)]/10 text-[var(--site-primary)]"
        >
          From The Principal's Desk
        </span>

        {memberRight.name && (
          <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] leading-tight" style={{color:'#2b2a2a'}}>
            {memberRight.name}
          </h2>
        )}

        {memberRight.subheading && (
          <p className="mt-3 text-xl font-medium" style={{color:'#000'}}>
            {memberRight.subheading}
          </p>
        )}

        {memberRight.heading && (
          <p
            className="mt-4 text-lg font-semibold text-[var(--site-primary)]"
          >
            {memberRight.heading}
          </p>
        )}

        {memberRight.description && (
          <div
            className="mt-8 border-l-4 pl-6 italic leading-8 text-lg border-[var(--site-primary)] text-[#65758b]"
          >
            {memberRight.description}
          </div>
        )}
      </div>
    </div>
  </section>
)}
      {/* ================= TEAM HEADER ================= */}
      {(teamHeader.heading || teamCards?.blocks?.length > 0) && (
        <section className="py-16 text-center">
          <h2 className="text-4xl font-bold" style={{color:'#000000'}}>
            {teamHeader.heading || "Our Team Members"}
          </h2>

          {teamHeader.description && (
            <p className="text-gray-600 mt-4" style={{color:"#000"}}>{teamHeader.description}</p>
          )}
        </section>
      )}

      {/* ================= TEAM CARDS ================= */}
     {teamCards?.blocks?.length > 0 && (
  <section className="max-w-7xl mx-auto px-4 pb-20 mt-12">
    <Slider {...settings}>
      {teamCards.blocks
        .filter((card) => card.isActive !== "false")
        .sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99))
        .map((card, idx) => {
          const name = card.name || "No Name";
          const initials = name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

          const roleOrSubject =
            card.roleText || card.subheading || "";

          const leftLabel =
            card.leftText || "Qualification";
          const leftValue =
            card.leftBoldText || "Not specified";

          const rightLabel =
            card.rightText || "Experience";
          const rightValue =
            card.rightBoldText || "0 years";

          return (
            <div key={idx} className="px-3 py-4">
              <div className="bg-white border border-slate-100 rounded-[28px] p-8 pb-10 shadow-sm hover:shadow-[0_15px_35px_rgba(30,58,138,0.12)] transition-all duration-300 flex flex-col items-center text-center relative group min-h-[420px]">
                
                {/* Image */}
                <div className="w-28 h-28 mb-5 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-slate-400">
                      {initials}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold mb-1 text-black">
                  {name}
                </h3>

                {/* Role */}
                {roleOrSubject && (
                  <p
                    className="text-sm font-semibold tracking-wide mb-3"
                    style={{ color: DEFAULT_PRIMARY }}
                  >
                    {roleOrSubject}
                  </p>
                )}

                {/* Description */}
                {card.description && (
                  <p className="text-xs text-slate-500 line-clamp-3 mb-4">
                    {card.description}
                  </p>
                )}

                {/* Bottom Details */}
                <div className="w-full grid grid-cols-2 gap-2 mt-auto border-t border-slate-100 pt-5">
                  <div className="flex flex-col gap-1 items-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-black">
                      {leftLabel}
                    </span>
                    <span className="text-sm font-semibold text-black">
                      {leftValue}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 items-center border-l border-slate-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-black">
                      {rightLabel}
                    </span>
                    <span className="text-sm font-semibold text-black">
                      {rightValue}
                    </span>
                  </div>
                </div>

                {/* Social */}
                {(card.facebook ||
                  card.twitter ||
                  card.linkedin) && (
                  <div className="absolute -bottom-5 flex gap-2">
                    {card.facebook && (
                      <a
                        href={card.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
                      >
                        f
                      </a>
                    )}

                    {card.twitter && (
                      <a
                        href={card.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg"
                      >
                        𝕏
                      </a>
                    )}

                    {card.linkedin && (
                      <a
                        href={card.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center shadow-lg"
                      >
                        in
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </Slider>
  </section>
)}

     {/* ================= SUPPORT STAFF ================= */}
{supportStaff?.blocks?.length > 0 && (
  <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
    {/* Background Glow */}
    <div
      className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10"
      style={{ background: DEFAULT_PRIMARY }}
    ></div>
    <div
      className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10"
      style={{ background: DEFAULT_PRIMARY }}
    ></div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span
          className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[2px] uppercase mb-5"
          style={{
            background: withAlpha(DEFAULT_PRIMARY, 0.08),
            color: DEFAULT_PRIMARY,
          }}
        >
          Support Staff
        </span>

        <h2 className="text-4xl md:text-6xl font-bold  font-['Poppins'] leading-tight" style={{color:'#000'}}>
          {supportStaff.heading || "The Pillars Behind the Scenes"}
        </h2>

        <p className="  text-lg mt-5 leading-8"  style={{color:'#000'}}>
          {supportStaff.description ||
            "Our dedicated administrative and support staff ensure smooth operations every single day."}
        </p>
      </div>

      {/* Slider */}
      <Slider
        dots={true}
        infinite={true}
        autoplay={true}
        speed={600}
        autoplaySpeed={4500}
        slidesToShow={3}
        slidesToScroll={1}
        arrows={false}
        responsive={[
          {
            breakpoint: 1024,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 640,
            settings: { slidesToShow: 1 },
          },
        ]}
      >
        {supportStaff.blocks.map((s, i) => {
          const initials =
            s.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase() || "ST";

          return (
            <div key={i} className="px-3">
              <div className="group bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[130px]">
                
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: withAlpha(DEFAULT_PRIMARY, 0.08),
                    color: DEFAULT_PRIMARY,
                  }}
                >
                  {initials}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-lg font-bold  truncate"  style={{color:'#000'}}>
                    {s.name}
                  </h3>

                  <p
                    className="text-sm font-medium"
                    style={{ color: DEFAULT_PRIMARY }}
                  >
                    {s.role}
                  </p>

                  {s.workDescription && (
                    <p className="text-sm  mt-1 line-clamp-2" style={{color:'#000'}}>
                      {s.workDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  </section>
)}
    </motion.div>
  );
}
