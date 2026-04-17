/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

export default function FAQ({ data }) {
  const content = data;
  const primaryColor = DEFAULT_PRIMARY;
  // eslint-disable-next-line no-unused-vars
  const accentColor = DEFAULT_ACCENT;

  const [openIndex, setOpenIndex] = useState(null);

  if (!content) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {content.subheading && (
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY), color: primaryColor }}>
              {content.subheading}
            </span>
          )}
          {content.heading && (
            <h2 className="text-3xl md:text-5xl font-bold font-['Poppins']  mb-6" style={{color:'black'}}>
              {content.heading}
            </h2>
          )}
          {content.description && (
            <p className="text-lg  max-w-2xl mx-auto leading-relaxed" style={{color:'black'}}>
              {content.description}
            </p>
          )}
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {content?.blocks && content.blocks.length > 0 ? (
            content.blocks.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold font-['Poppins'] " style={{color:'black'}}>
                      {faq.question || faq.title} 
                    </h3>
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 border ${isOpen ? 'rotate-180' : ''}`}
                      style={isOpen ? { backgroundColor: primaryColor, color: 'white', borderColor: primaryColor } : { backgroundColor: 'transparent', color: primaryColor, borderColor: primaryColor }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6   leading-relaxed border-t border-slate-100 pt-4"  style={{color:'black'}}>
                          {faq.answer || faq.shortText || faq.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
             <div className="p-8 text-center text-gray-500 border border-gray-200 rounded-2xl bg-white shadow-sm">
               No FAQs available at the moment.
             </div>
          )}
        </div>
      </div>
    </section>
  );
}
