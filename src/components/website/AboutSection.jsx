/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

export default function AboutSection({ data }) {
  const content = data;
  const primaryColor = DEFAULT_PRIMARY;
  const accentColor = DEFAULT_ACCENT;

  if (!content) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                <img
                  src={content.image}
                  alt="About Us"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-72 h-72 rounded-2xl -z-10" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY) }} />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full -z-10" style={{ backgroundColor: withAlpha(accentColor, 0.3, DEFAULT_ACCENT) }} />
            </div>
          </motion.div>

          {/* Content Side */} 
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT), color: primaryColor }}>
              {content.subheading}  
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Poppins'] leading-tight">
              {content.heading}
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed whitespace-pre-wrap">
              {content.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {content.buttonText && (
                <Link
                  to={content.buttonLink || "#"}
                  className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 group"
                  style={{ backgroundColor: primaryColor }}
                >
                  {content.buttonText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
