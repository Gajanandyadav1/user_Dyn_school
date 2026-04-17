/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, Lightbulb, Palette, Dumbbell, FlaskConical,
  GraduationCap, Award, CheckCircle2, ArrowRight, Monitor, Music
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSettings, listAcademicPrograms } from '@/api/adminClient';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

const PROGRAM_ICONS = [BookOpen, Lightbulb, GraduationCap, FlaskConical, Palette, Dumbbell, Users, Monitor];

export default function Academics() {
  const { data: apiPrograms = [] } = useQuery({
    queryKey: ['academicPrograms'],
    queryFn: () => listAcademicPrograms(),
  });
  const { data: settings = {} } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => getSettings(),
  });

  const primaryColor = settings.primary_color || DEFAULT_PRIMARY;
  const accentColor = settings.accent_color || DEFAULT_ACCENT;

  const defaultPrograms = [
    {
      title: 'Primary School (Nursery - Class 5)',
      description: 'Building strong foundations with play-based and activity-based learning. Our primary program focuses on developing fundamental skills in literacy, numeracy, and social interaction.',
      icon: BookOpen,
      grades: 'Nursery - Class 5',
      features: ['Activity-based learning', 'Smart classrooms', 'Phonics program', 'Art & craft activities', 'Physical education', 'Value education'],
    },
    {
      title: 'Middle School (Class 6 - Class 8)',
      description: 'Developing critical thinking and analytical skills through interactive teaching methods. Students explore various subjects and discover their interests.',
      icon: Lightbulb,
      grades: 'Class 6 - Class 8',
      features: ['CBSE curriculum', 'Science labs', 'Computer education', 'Library access', 'Sports activities', 'Cultural programs'],
    },
    {
      title: 'Senior Secondary (Class 9 - Class 12)',
      description: 'Preparing students for competitive exams and higher education with expert guidance. Streams available: Science, Commerce, and Arts.',
      icon: GraduationCap,
      grades: 'Class 9 - Class 12',
      features: ['Science/Commerce/Arts streams', 'Career counseling', 'Board exam preparation', 'Competitive exam coaching', 'Practical labs', 'Project-based learning'],
    },
  ];

  // Use API programs if available, otherwise fall back to defaults
  const programs = apiPrograms.length > 0
    ? apiPrograms.map((p, i) => ({
        title: p.title,
        description: p.description,
        grades: p.grades,
        icon: PROGRAM_ICONS[i % PROGRAM_ICONS.length],
        features: [],
      }))
    : defaultPrograms;

  const facilities = [
    { icon: FlaskConical, title: 'Science Labs', description: 'Well-equipped Physics, Chemistry, and Biology labs' },
    { icon: Monitor, title: 'Computer Lab', description: 'Modern computers with internet connectivity' },
    { icon: BookOpen, title: 'Library', description: 'Extensive collection of books and periodicals' },
    { icon: Dumbbell, title: 'Sports Complex', description: 'Indoor and outdoor sports facilities' },
    { icon: Music, title: 'Music Room', description: 'Dedicated space for music education' },
    { icon: Palette, title: 'Art Studio', description: 'Creative space for visual arts' },
  ];

  const curriculum = [
    { subject: 'Languages', details: 'English, Hindi, Sanskrit' },
    { subject: 'Mathematics', details: 'NCERT curriculum with additional practice' },
    { subject: 'Science', details: 'Physics, Chemistry, Biology with practical sessions' },
    { subject: 'Social Studies', details: 'History, Geography, Civics, Economics' },
    { subject: 'Computer Science', details: 'Programming, Digital literacy' },
    { subject: 'Physical Education', details: 'Sports, Yoga, Health education' },
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
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920)' }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${primaryColor}, ${withAlpha(primaryColor, 0.8, DEFAULT_PRIMARY)}, transparent)` }} />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: accentColor, color: primaryColor }}>
              Academics
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Poppins']">
              Academic Excellence
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              CBSE affiliated comprehensive education for holistic development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY), color: primaryColor }}>
              Our Programs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Poppins']" >
              Academic <span style={{ color: primaryColor }}>Programs</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${withAlpha(primaryColor, 0.75, DEFAULT_PRIMARY)})` }} />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors" style={{ backgroundColor: accentColor }}>
                    <program.icon className="w-8 h-8" style={{ color: primaryColor }} />
                  </div>
                  {program.grades && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY), color: primaryColor }}>
                      {program.grades}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Poppins'] group-hover:text-white transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-200 transition-colors">
                    {program.description}
                  </p>
                  {program.features.length > 0 && (
                    <div className="grid grid-cols-1 gap-2 mt-4">
                      {program.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
                          <span className="text-gray-700 text-sm group-hover:text-gray-200 transition-colors">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT), color: primaryColor }}>
              CBSE Curriculum
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Poppins']">
              Subjects <span style={{ color: primaryColor }}>Offered</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold mb-2 font-['Poppins']" style={{ color: primaryColor }}>
                  {item.subject}
                </h3>
                <p className="text-gray-600">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT), color: accentColor }}>
              Infrastructure
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins']">
              Our Facilities
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: accentColor }}>
                  <facility.icon className="w-8 h-8" style={{ color: primaryColor }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Poppins']">
                  {facility.title}
                </h3>
                <p className="text-gray-300">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: accentColor }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']" style={{ color: primaryColor }}>
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg mb-8" style={{ color: withAlpha(primaryColor, 0.8, DEFAULT_PRIMARY) }}>
            Join Malhotra Public School and give your child the gift of quality education
          </p>
          <Link
            to={('/admissions')}
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:shadow-xl group"
            style={{ backgroundColor: primaryColor }}
          >
            Apply Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
