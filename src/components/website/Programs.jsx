/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb, Palette, Dumbbell, FlaskConical, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

// Try to map to available icons, fallback to BookOpen
const iconMap = {
  BookOpen, Users, Lightbulb, Palette, Dumbbell, FlaskConical,
  book: BookOpen, users: Users, lightbulb: Lightbulb, palette: Palette, 
  dumbbell: Dumbbell, flask: FlaskConical
};

export default function Programs({ data }) {
  const content = data;
  const primaryColor = DEFAULT_PRIMARY;
  const accentColor = DEFAULT_ACCENT;

  if (!content) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY), color: primaryColor }}>
            {content.subheading}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Poppins']">
            {content.heading}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto whitespace-pre-wrap">
            {content.description}
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {(content.blocks || []).slice(0, 4).map((program, index) => {
            const IconComponent = iconMap[program.icon?.toLowerCase()] || BookOpen;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Hover Background Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${withAlpha(primaryColor, 0.75, DEFAULT_PRIMARY)})` }} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Image/Icon Block */}
                  {program.image ? (
                     <div className="w-full h-40 rounded-xl overflow-hidden mb-6 bg-slate-100 group-hover:ring-4 ring-white/30 transition-all">
                       <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                     </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors" style={{ backgroundColor: accentColor }}>
                      <IconComponent className="w-8 h-8" style={{ color: primaryColor }} />
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Poppins'] group-hover:text-white transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-gray-600 mb-6 group-hover:text-gray-200 transition-colors line-clamp-3">
                    {program.description}
                  </p>

                  {program.buttonLink && (
                    <Link
                      to={program.buttonLink}
                      className="inline-flex items-center gap-2 font-semibold transition-colors"
                      style={{ color: primaryColor }}
                    >
                      {program.buttonText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform group-hover:text-white" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
