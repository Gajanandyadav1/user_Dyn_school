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
    <section className="bg-[#f8fbff] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          {data.subheading && (
            <span
              className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
              style={{ backgroundColor: withAlpha(primaryColor, 0.08, DEFAULT_PRIMARY), color: primaryColor }}
            >
              {data.subheading}
            </span>
          )}
          {data.heading && (
            <h2 className="mt-5 font-['Poppins'] text-4xl font-bold tracking-[-0.04em] text-slate-900 md:text-5xl">
              {data.heading}
            </h2>
          )}
          {data.middleText && (
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-slate-600 md:text-[22px]">
              {data.middleText}
            </p>
          )}
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || iconMap[String(card.icon || '').toLowerCase()] || GraduationCap;

            return (
              <motion.article
                key={`${card.heading || 'feature'}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
              >
                <div
                  className="mb-7 flex h-[72px] w-[72px] items-center justify-center rounded-[22px]"
                  style={{ backgroundColor: withAlpha(primaryColor, 0.08, DEFAULT_PRIMARY) }}
                >
                  <Icon className="h-8 w-8" style={{ color: primaryColor }} />
                </div>
                <h3 className="font-['Poppins'] text-2xl font-bold tracking-[-0.03em] text-slate-900">
                  {card.heading}
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  {card.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}



 