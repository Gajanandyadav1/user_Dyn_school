/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Calendar, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY } from '@/lib/siteTheme';

export default function Admission({ data }) {
  const content = data || {};
  const primaryColor = DEFAULT_PRIMARY;
  const accentColor = "var(--site-accent)";

  const phone = content.phone || "+91 98765 43210";
  const bgPattern = content.backgroundImage || "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E3A8A' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  if (!content || !content.heading) return null;

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: accentColor }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: `url("${bgPattern}")` }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `${primaryColor}1A` }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 font-semibold rounded-full mb-4 bg-white/50" style={{ color: primaryColor }}>
               {content.subheading}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-['Poppins'] leading-tight" style={{ color: primaryColor }}>
              {content.heading}
            </h2>
            <p className="text-lg mb-8 whitespace-pre-wrap" style={{ color: `${primaryColor}CC` }}>
              {content.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {content.buttonLink && (
                <Link
                  to={content.buttonLink}
                  className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:shadow-xl hover:-translate-y-1 group"
                  style={{ backgroundColor: primaryColor }}
                >
                  {content.buttonText || "Apply Now"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              {content.phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white font-semibold rounded-full hover:shadow-xl transition-all"
                  style={{ color: primaryColor }}
                >
                  <Phone className="w-5 h-5" />
                  {content.callButtonText || "Call Us Now"}
                </a>
              )}
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {(content.admissionDatesTitle || content.admissionDatesText) && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${primaryColor}1A` }}>
                  <Calendar className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <h3 className="font-bold  mb-2 font-['Poppins']" style={{color:'black'}}>
                  {content.admissionDatesTitle || "Admission Dates"} 
                </h3>
                <p className=" text-sm" style={{color:'black'}}>
                  {content.admissionDatesText || "Open for Current Session"}
                </p>
              </div>
            )}

            {(content.contactTitle || content.phone) && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${primaryColor}1A` }}>
                  <Phone className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <h3 className="font-bold   mb-2 font-['Poppins']" style={{color:'black'}}>
                  {content.contactTitle || "Contact Admissions"}
                </h3>
                <p className="  text-sm" style={{color:'black'}}>
                  {content.phone} 
                </p>
              </div>
            )}

            {(content.scholarshipTitle || content.scholarshipText) && (
              <div className="sm:col-span-2 rounded-2xl p-6 text-white" style={{ backgroundColor: primaryColor }}>
                <h3 className="font-bold mb-2 font-['Poppins']" style={{color:'white'}}>
                  {content.scholarshipTitle || "🎓 Scholarship Available"}
                </h3>
                <p className=" text-sm" style={{color:'white'}}>
                  {content.scholarshipText || "Merit-based scholarships for outstanding students. Contact us to learn more."}
                </p>
              </div>
              
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
