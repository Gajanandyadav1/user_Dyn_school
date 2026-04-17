/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Target, Eye, Award, Users, BookOpen, 
  GraduationCap, Calendar, Star, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSettings, listStatistics } from '@/api/adminClient';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

export default function About() {
  const { data: apiStats = [] } = useQuery({
    queryKey: ['stats'],
    queryFn: () => listStatistics(),
  });
  const { data: settings = {} } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => getSettings(),
  });

  const primaryColor = settings.primary_color || DEFAULT_PRIMARY;
  const accentColor = settings.accent_color || DEFAULT_ACCENT;

  // Default stats shown in About page (fallback when API has no data)
  const defaultStats = [
    { icon: GraduationCap, label: 'Students', value: '850+' },
    { icon: Users, label: 'Teachers', value: '25+' },
    { icon: Calendar, label: 'Years', value: '18' },
  ];

  // Use up to 3 stats from API, otherwise use defaults
  const displayStats = apiStats.length > 0
    ? apiStats.slice(0, 3).map((s, i) => ({
        icon: [GraduationCap, Users, Calendar][i] || GraduationCap,
        label: s.label,
        value: `${s.value}${s.suffix || ''}`,
      }))
    : defaultStats;

  const values = [
    { icon: Star, title: 'Excellence', description: 'Striving for the highest standards in education and character development.' },
    { icon: Users, title: 'Integrity', description: 'Building trust through honesty, transparency, and ethical conduct.' },
    { icon: BookOpen, title: 'Innovation', description: 'Embracing new ideas and methods to enhance learning experiences.' },
    { icon: Award, title: 'Respect', description: 'Fostering mutual respect among students, teachers, and parents.' },
  ];

  const milestones = [
    { year: '2008', title: 'School Founded', description: 'Malhotra Public School established with a vision for quality education.' },
    { year: '2012', title: 'CBSE Affiliation', description: 'Received official CBSE affiliation for academic programs.' },
    { year: '2015', title: 'New Campus', description: 'Expanded to a modern campus with state-of-the-art facilities.' },
    { year: '2018', title: 'Smart Classrooms', description: 'Introduced digital learning with smart classroom technology.' },
    { year: '2022', title: 'Excellence Award', description: 'Recognized as Best School in Kotputli region.' },
    { year: '2026', title: 'Continuing Growth', description: 'Expanding programs and facilities for future generations.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden" style={{ backgroundColor: primaryColor }}>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920)' }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${primaryColor}, ${withAlpha(primaryColor, 0.8, DEFAULT_PRIMARY)}, transparent)` }} />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >

            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: accentColor, color: primaryColor }}>
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Poppins']">
              Our Story
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Nurturing minds and shaping futures since 2008
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}

      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Welcome to <span style={{ color: primaryColor }}>Malhotra Public School</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Malhotra Public School is committed to academic excellence and character 
                development since 2008. We provide modern education with traditional values,
                preparing students for the challenges of tomorrow while instilling strong 
                moral foundations.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our holistic approach to education ensures that every child receives 
                personalized attention, enabling them to discover and nurture their unique 
                talents and abilities. With experienced faculty, modern infrastructure, and 
                a nurturing environment, we are dedicated to bringing out the best in every student.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Located in the heart of Kotputli, Rajasthan, our school serves as a beacon 
                of quality education in the region, combining the best of modern pedagogy 
                with time-tested values.
              </p>

              <div className="flex flex-wrap gap-6">
                {displayStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                      <stat.icon className="w-6 h-6" style={{ color: primaryColor }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: primaryColor }}>{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
                alt="Students Learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl -z-10" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT) }} />
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full -z-10" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY) }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border-t-4"
              style={{ borderTopColor: primaryColor }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: primaryColor }}>
                <Target className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To nurture responsible and innovative citizens who will contribute positively 
                to society. We aim to provide a comprehensive education that develops intellectual 
                curiosity, moral character, and social responsibility in our students.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-t-4"
              style={{ borderTopColor: accentColor }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: accentColor }}>
                <Eye className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become Rajasthan's leading educational institution, recognized for academic 
                excellence, innovative teaching methods, and producing well-rounded individuals 
                who are prepared to meet the challenges of the 21st century.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY), color: primaryColor }}>
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Poppins']">
              Core <span style={{ color: primaryColor }}>Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT) }}>
                  <value.icon className="w-10 h-10" style={{ color: primaryColor }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Poppins']">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT), color: accentColor }}>
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins']">
              Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden lg:block" style={{ backgroundColor: withAlpha(accentColor, 0.3, DEFAULT_ACCENT) }} />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:flex-row`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <span className="font-bold text-2xl" style={{ color: accentColor }}>{milestone.year}</span>
                      <h3 className="text-xl font-bold text-white mt-2 font-['Poppins']">{milestone.title}</h3>
                      <p className="text-gray-300 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full flex-shrink-0 hidden lg:block" style={{ backgroundColor: accentColor }} />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: accentColor }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']" style={{ color: primaryColor }}>
            Ready to Join Our Family?
          </h2>
          <p className="text-lg mb-8" style={{ color: withAlpha(primaryColor, 0.8, DEFAULT_PRIMARY) }}>
            Take the first step towards a bright future for your child
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:shadow-xl group"
            style={{ backgroundColor: primaryColor }}
          >
            Start Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
