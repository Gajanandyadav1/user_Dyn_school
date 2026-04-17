/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, 
  Facebook, Twitter, Instagram, Youtube, Linkedin, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getFooter, getSettings } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: footer = {} } = useQuery({
    queryKey: ['footerData'],
    queryFn: () => getFooter(),
  });
  const { data: settings = {} } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => getSettings(),
  });

  const address = settings.address || footer.address || 'NH-48, Kotputli, Rajasthan 303108';
  const phone = settings.phone || footer.phone || '+91 9876543210';
  const email = settings.email || footer.email || 'info@malhotrapublicschool.edu';
  const mapEmbed = settings.map_embed || footer.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.0!2d76.0!3d27.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzAwLjAiTiA3NsKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890';
  const primaryColor = settings.primary_color || "var(--site-primary)";
  const accentColor = settings.accent_color || "var(--site-accent)";

  const socialIconMap = { Facebook, Twitter, Instagram, Youtube, Linkedin };
  const settingsSocialLinks = [
    settings.facebook ? { platform: 'Facebook', url: settings.facebook } : null,
    settings.twitter ? { platform: 'Twitter', url: settings.twitter } : null,
    settings.instagram ? { platform: 'Instagram', url: settings.instagram } : null,
    settings.youtube ? { platform: 'Youtube', url: settings.youtube } : null,
    settings.linkedin ? { platform: 'Linkedin', url: settings.linkedin } : null,
  ].filter(Boolean);
  const socialLinks = footer.socialLinks?.length > 0
    ? footer.socialLinks
    : settingsSocialLinks.length > 0
      ? settingsSocialLinks
      : [
          { platform: 'Facebook', url: '#' },
          { platform: 'Twitter', url: '#' },
          { platform: 'Instagram', url: '#' },
          { platform: 'Youtube', url: '#' },
        ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const subject = encodeURIComponent(formData.subject || 'Website Inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    { icon: MapPin, title: 'Our Address', value: address },
    { icon: Phone, title: 'Phone Number', value: phone, link: `tel:${phone}` },
    { icon: Mail, title: 'Email Address', value: email, link: `mailto:${email}` },
    { icon: Clock, title: 'Office Hours', value: 'Monday - Saturday: 8:00 AM - 3:00 PM' },
  ];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Message Sent!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            }}
            className="text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Send Another Message
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden" style={{ backgroundColor: primaryColor }}>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1920)' }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}CC, transparent)` }} />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: accentColor, color: primaryColor }}>
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-200">
              We'd love to hear from you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Contact <span style={{ color: primaryColor }}>Information</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about admissions, academics, or our school? 
                We're here to help. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                      <item.icon className="w-6 h-6" style={{ color: primaryColor }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      {item.link ? (
                        <a href={item.link} className="text-gray-600 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = socialIconMap[social.platform];
                    if (!Icon) return null;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Poppins']">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Your Name *</Label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="John Doe"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Email Address *</Label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="email@example.com"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Subject *</Label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="Inquiry about..."
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Your Message *</Label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Write your message here..."
                      className="mt-2"
                      rows={5}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-white"
                    style={{ backgroundColor: primaryColor }}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 font-['Poppins']">
              Find <span style={{ color: primaryColor }}>Us</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl h-[400px]"
          >
            <iframe
              src={mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
