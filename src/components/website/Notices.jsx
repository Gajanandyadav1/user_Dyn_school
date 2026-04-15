import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Bell, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listNotices } from '@/api/adminClient';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

export default function Notices({ data }) {
  const content = data;
  const primaryColor = DEFAULT_PRIMARY;
  const accentColor = DEFAULT_ACCENT;

  const { data: apiNotices = [], isLoading } = useQuery({
    queryKey: ['notices'],
    queryFn: listNotices,
  });

  if (!content) return null;

  const manualNotices = Array.isArray(content.blocks)
    ? content.blocks
        .filter((notice) => notice?.title || notice?.shortText)
        .map((notice, index) => ({
          id: `manual-${index}`,
          title: notice.title || 'Untitled Notice',
          description: notice.shortText || '',
          date: notice.date || '',
          is_highlighted: String(notice.isHighlighted || '').trim().toLowerCase() === 'true',
          attachment_url: notice.attachmentUrl || '',
        }))
    : [];

  // Use page-builder cards when provided; otherwise fall back to managed notices API.
  const publishedNotices = manualNotices.length > 0
    ? manualNotices
    : apiNotices.filter((n) => n.is_published).slice(0, 5);

  const buttonText = content.buttonText || 'View All Notices';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Section Header & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {content.subheading && (
              <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY), color: primaryColor }}>
                {content.subheading}
              </span>
            )}
            {content.heading && (
              <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] text-gray-900 mb-4">
                {content.heading}
              </h2>
            )}
            {content.description && (
              <p className="text-lg text-gray-600 mb-8">
                {content.description}
              </p>
            )}

            <div className="flex items-center gap-4 p-6 rounded-2xl mb-6" style={{ backgroundColor: withAlpha(accentColor, 0.1, DEFAULT_ACCENT) }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <Bell className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Subscribe. to Updates</p>
                <p className="text-sm text-gray-600">Get notified about new notices</p>
              </div>
            </div>

            {content.buttonLink && (
              <Link
                to={content.buttonLink}
                className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                style={{ color: primaryColor }}
              >
                {buttonText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </motion.div>

          {/* Notices List */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="py-12 flex items-center justify-center">
                 <p className="text-gray-500 font-medium animate-pulse">Loading notices...</p>
              </div>
            ) : publishedNotices.length > 0 ? (
              publishedNotices.map((notice, index) => {
                const dateRaw = new Date(notice.date);
                const day = isNaN(dateRaw) ? notice.date?.substring(8,10) : dateRaw.getDate();
                const month = isNaN(dateRaw) ? "JAN" : dateRaw.toLocaleString('default', { month: 'short' });

                return (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-6 rounded-2xl border transition-all hover:shadow-lg cursor-pointer group ${
                      notice.is_highlighted
                        ? 'border-l-4 border-t-0 border-r-0 border-b-0'
                        : 'bg-white border-gray-100'
                    }`}
                    style={notice.is_highlighted
                      ? { background: `linear-gradient(to right, ${withAlpha(primaryColor, 0.05, DEFAULT_PRIMARY)}, transparent)`, borderLeftColor: accentColor }
                      : { borderColor: '#f3f4f6' }}
                  >
                    {notice.is_highlighted && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                        <Star className="w-4 h-4" style={{ color: primaryColor }} fill="currentColor" />
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Date Badge */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white bg-slate-800" style={{ backgroundColor: primaryColor }}>
                        <span className="text-2xl font-bold">
                          {day}
                        </span>
                        <span className="text-xs uppercase">
                          {month}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors font-['Poppins']" style={{ color: notice.is_highlighted ? primaryColor : undefined }}>
                          {notice.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {notice.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-2 font-medium">{notice.date}</p>
                      </div>

                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-all flex-shrink-0" style={{ color: primaryColor }} />
                    </div>
                  </motion.div>
                );
              })
            ) : (
               <div className="p-8 text-center text-gray-500 border border-gray-100 rounded-2xl bg-gray-50">
                 No notices available at the moment.
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
