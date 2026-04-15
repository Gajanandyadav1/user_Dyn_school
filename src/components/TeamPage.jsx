// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Loader2 } from 'lucide-react';
// import { getPageContent } from '../services/contentService';
// import { usePageStore } from '../store/pageContentStore';
// import FixedImage from './ui/FixedImage';

// export default function TeamPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const defaultTeam = usePageStore(state => state.content.team);

//   useEffect(() => {
//     async function loadData() {
//       const apiData = await getPageContent("team");
//       setData({ ...defaultTeam, ...(apiData || {}) });
//       setLoading(false);
//     }
//     loadData();
//   }, [defaultTeam]);

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-slate-500">
//         <Loader2 className="h-10 w-10 animate-spin text-[#1E3A8A]" />
//         <p className="font-semibold text-lg animate-pulse tracking-wide font-['Poppins']">Loading Our Team...</p>
//       </div>
//     );
//   }

//   const { intro = {}, memberLeft = {}, memberRight = {}, teamHeader = {}, teamCards = {}, supportStaff = {} } = data || {};

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24">
//       {/* 1. Intro Block */}
//       <section className="bg-slate-50 border-b border-slate-200 py-20 text-center px-4">
//         <h1 className="text-4xl md:text-5xl font-bold font-['Poppins'] text-[#1E3A8A] mb-4">{intro.heading || "Our Team"}</h1>
//         {intro.subheading && <p className="text-xl font-medium text-slate-500 max-w-2xl mx-auto mb-2 uppercase tracking-widest">{intro.subheading}</p>}
//         {intro.description && <p className="text-lg text-slate-600 max-w-3xl mx-auto">{intro.description}</p>}
//       </section>

//       {/* 2. Member (Image Left) */}
//       {(memberLeft.heading || memberLeft.image) && (
//         <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row gap-12 items-center">
//             <div className="w-full md:w-5/12 shrink-0 relative">
//                <div className="w-full shadow-2xl rounded-2xl overflow-hidden border-4 border-white bg-white hover:scale-[1.02] transition-transform duration-500">
//                   <FixedImage src={memberLeft.image} ratio="3/4" />
//                </div>
//                {memberLeft.name && (
//                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-4 text-center border border-white/20">
//                     <h3 className="text-xl font-bold text-gray-900 font-['Poppins']">{memberLeft.name}</h3>
//                     {memberLeft.smallText && <p className="text-sm font-medium text-[#1E3A8A] mt-1">{memberLeft.smallText}</p>}
//                  </div>
//                )}
//             </div>
//             <div className="w-full md:w-7/12 flex flex-col justify-center space-y-6">
//                <h2 className="text-4xl font-bold text-gray-900 font-['Poppins']">{memberLeft.heading}</h2>
//                {memberLeft.subheading && <h3 className="text-2xl font-medium text-slate-500">{memberLeft.subheading}</h3>}
//                <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">{memberLeft.description}</p>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* 3. Member (Image Right) */}
//       {(memberRight.heading || memberRight.image) && (
//         <section className="py-24 bg-slate-50">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
//               <div className="w-full md:w-5/12 shrink-0 relative">
//                  <div className="w-full shadow-2xl rounded-2xl overflow-hidden border-4 border-white bg-white hover:scale-[1.02] transition-transform duration-500">
//                     <FixedImage src={memberRight.image} ratio="3/4" />
//                  </div>
//                  {memberRight.name && (
//                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-4 text-center border border-white/20">
//                       <h3 className="text-xl font-bold text-gray-900 font-['Poppins']">{memberRight.name}</h3>
//                       {memberRight.smallText && <p className="text-sm font-medium text-[#1E3A8A] mt-1">{memberRight.smallText}</p>}
//                    </div>
//                  )}
//               </div>
//               <div className="w-full md:w-7/12 flex flex-col justify-center space-y-6">
//                  <h2 className="text-4xl font-bold text-gray-900 font-['Poppins']">{memberRight.heading}</h2>
//                  {memberRight.subheading && <h3 className="text-2xl font-medium text-slate-500">{memberRight.subheading}</h3>}
//                  <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">{memberRight.description}</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* 4. Team Header */}
//       {(teamHeader.heading || teamCards?.blocks?.length > 0) && (
//         <section className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
//           {teamHeader.subheading && <p className="text-sm font-bold tracking-[0.2em] uppercase text-[#1E3A8A] mb-4">{teamHeader.subheading}</p>}
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Poppins'] mb-6">{teamHeader.heading || "Meet Our Extended Team"}</h2>
//           {teamHeader.description && <p className="text-xl text-slate-600 max-w-3xl mx-auto">{teamHeader.description}</p>}
//         </section>
//       )}

//       {/* 5. Team Cards (3 per row) */}
//       {teamCards?.blocks && teamCards.blocks.length > 0 && (
//         <section className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {teamCards.blocks.map((card, idx) => (
//               <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(30,58,138,0.08)] transition-all duration-300 border border-slate-100 group">
//                 <div className="relative">
//                   <FixedImage src={card.image} ratio="1/1" className="group-hover:scale-105 transition-transform duration-700" />
//                   {card.roleText && (
//                     <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-[#1E3A8A] uppercase shadow-sm">
//                       {card.roleText}
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-8 text-center flex flex-col h-full bg-white relative z-10">
//                   <h3 className="text-2xl font-bold font-['Poppins'] text-gray-900">{card.name}</h3>
//                   {card.subheading && <p className="text-[#1E3A8A] font-medium mt-1 mb-6">{card.subheading}</p>}

//                   {/* Meta details */}
//                   <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
//                     <div>
//                        {card.leftText && <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{card.leftText}</p>}
//                        {card.leftBoldText && <p className="font-semibold text-slate-700">{card.leftBoldText}</p>}
//                     </div>
//                     <div>
//                        {card.rightText && <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{card.rightText}</p>}
//                        {card.rightBoldText && <p className="font-semibold text-slate-700">{card.rightBoldText}</p>}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* 6. Support Staff */}
//       {supportStaff?.blocks && supportStaff.blocks.length > 0 && (
//         <section className="py-24 bg-slate-900 text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center max-w-3xl mx-auto mb-16">
//               {supportStaff.subheading && <p className="text-sm font-bold tracking-[0.2em] uppercase text-yellow-300 mb-4">{supportStaff.subheading}</p>}
//               <h2 className="text-4xl font-bold font-['Poppins'] mb-6">{supportStaff.heading || "Support Staff"}</h2>
//               {supportStaff.description && <p className="text-lg text-slate-400 max-w-2xl mx-auto">{supportStaff.description}</p>}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                {supportStaff.blocks.map((support, idx) => (
//                  <div key={idx} className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 hover:bg-slate-800 transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center">
//                     <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#1E3A8A] flex items-center justify-center font-bold text-2xl text-white shadow-inner">
//                       {support.name ? support.name.substring(0, 2).toUpperCase() : "ST"}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold font-['Poppins']">{support.name}</h3>
//                       <p className="text-yellow-400 font-medium text-sm mt-1 mb-2">{support.role}</p>
//                       <p className="text-slate-300 text-sm">{support.workDescription}</p>
//                     </div>
//                  </div>
//                ))}
//             </div>
//           </div>
//         </section>
//       )}

//     </motion.div>
//   );
// }

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getPageContent } from "../services/contentService";
import { usePageStore } from "../store/pageContentStore";
import FixedImage from "./ui/FixedImage";

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24"
    >
      {/* ================= INTRO ================= */}
      <section className="py-20 text-center bg-slate-50">
        <h1 className="text-4xl font-bold text-[#1E3A8A]">
          {intro.heading || "Our Team"}
        </h1>

        {intro.subheading && (
          <p className="text-gray-500 mt-2">{intro.subheading}</p>
        )}

        {intro.description && (
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {intro.description}
          </p>
        )}
      </section>

      {/* ================= MEMBER LEFT ================= */}
      {(memberLeft.heading || memberLeft.image) && (
        <section className="py-20 max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-5/12">
            <FixedImage src={memberLeft.image} ratio="3/4" />
          </div>

          <div className="w-full md:w-7/12">
            <h2 className="text-3xl font-bold">{memberLeft.heading}</h2>

            <p className="text-gray-500 mt-2">{memberLeft.subheading}</p>

            <p className="mt-4 text-gray-700">{memberLeft.description}</p>
          </div>
        </section>
      )}

      {/* ================= MEMBER RIGHT ================= */}
      {(memberRight.heading || memberRight.image) && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row-reverse gap-10 items-center">
            <div className="w-full md:w-5/12">
              <FixedImage src={memberRight.image} ratio="3/4" />
            </div>

            <div className="w-full md:w-7/12">
              <h2 className="text-3xl font-bold">{memberRight.heading}</h2>

              <p className="text-gray-500 mt-2">{memberRight.subheading}</p>

              <p className="mt-4 text-gray-700">{memberRight.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* ================= TEAM HEADER ================= */}
      {(teamHeader.heading || teamCards?.blocks?.length > 0) && (
        <section className="py-16 text-center">
          <h2 className="text-4xl font-bold">
            {teamHeader.heading || "Our Team Members"}
          </h2>

          {teamHeader.description && (
            <p className="text-gray-600 mt-4">{teamHeader.description}</p>
          )}
        </section>
      )}

      {/* ================= TEAM CARDS ================= */}
      {teamCards?.blocks?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamCards.blocks.map((card, idx) => {
              // 🔥 FIX: ADMIN → FRONTEND FIELD MAPPING
              const leftText = card.leftText || card.leftDetailsLabel || "";

              const leftBoldText =
                card.leftBoldText || card.leftDetailsValue || "";

              const rightText = card.rightText || card.rightDetailsLabel || "";

              const rightBoldText =
                card.rightBoldText || card.rightDetailsValue || "";

              return (
                <div
                  key={idx}
                  className="bg-white border rounded-2xl p-6 shadow hover:shadow-lg transition"
                >
                  <FixedImage src={card.image} ratio="1/1" />

                  <h3 className="text-xl font-bold mt-4">
                    {card.name || "No Name"}
                  </h3>

                  <p className="text-blue-700">{card.subheading}</p>

                  <p className="text-sm text-gray-500">{card.roleText}</p>

                  {/* META DETAILS */}
                  <div className="grid grid-cols-2 gap-4 mt-4 border-t pt-4">
                    <div>
                      <p className="text-xs text-gray-400">{leftText || "—"}</p>
                      <p className="font-semibold">{leftBoldText || "—"}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        {rightText || "—"}
                      </p>
                      <p className="font-semibold">{rightBoldText || "—"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= SUPPORT STAFF ================= */}
      {supportStaff?.blocks?.length > 0 && (
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl text-center font-bold mb-10">
              {supportStaff.heading || "Support Staff"}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {supportStaff.blocks.map((s, i) => (
                <div key={i} className="bg-slate-800 p-5 rounded-xl">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="text-yellow-400">{s.role}</p>
                  <p className="text-sm text-gray-300">{s.workDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
