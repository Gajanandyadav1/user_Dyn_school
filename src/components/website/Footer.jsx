import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import FixedImage from '../ui/FixedImage';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';
import { isExternalLink, normalizeSiteLink } from '@/lib/siteNavigation';

export default function Footer({ data, settings = {} }) {
  const content = data?.footer || {};
  const quickLinks = data?.quickLinks?.blocks || [];
  const academicsLinks = data?.academicsLinks?.blocks || [];

  if (!data) return null;

  const primaryColor = settings.primary_color || DEFAULT_PRIMARY;
  const accentColor = settings.accent_color || DEFAULT_ACCENT;
  const schoolName = settings.school_name || content.schoolName || 'Malhotra Public School';
  const tagline = settings.tagline || content.tagline || '';
  const footerLogo = content.logo || settings.logo || '';
  const description = content.description || settings.meta_description || '';
  const address = content.address || settings.address || '';
  const phone = content.phone || settings.phone || '';
  const email = content.email || settings.email || '';

  const socialIconMap = { Facebook, Twitter, Instagram, Youtube, Linkedin };
  const socialLinks = [
    settings.facebook ? { label: 'Facebook', url: settings.facebook } : null,
    settings.twitter ? { label: 'Twitter', url: settings.twitter } : null,
    settings.instagram ? { label: 'Instagram', url: settings.instagram } : null,
    settings.youtube ? { label: 'Youtube', url: settings.youtube } : null,
    settings.linkedin ? { label: 'Linkedin', url: settings.linkedin } : null,
  ].filter(Boolean);

  const copyrightText = `Copyright ${new Date().getFullYear()} ${schoolName}. All Rights Reserved.`;

  const renderNavLink = (item) => {
    if (!item?.label || !item?.url) return null;

    if (isExternalLink(item.url)) {
      return (
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4" />
          {item.label}
        </a>
      );
    }

    return (
      <Link to={normalizeSiteLink(item.url)} className="text-gray-300 flex items-center gap-2">
        <ChevronRight className="w-4 h-4" />
        {item.label}
      </Link>
    );
  };

  return (
    <footer className="text-white" style={{ backgroundColor: primaryColor }}>
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="mb-6 flex items-center gap-3">
                {footerLogo ? (
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-1">
                    <FixedImage src={footerLogo} ratio="1/1" className="h-full w-full object-contain" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-lg font-bold text-white">{schoolName}</p>
                  {tagline && <p className="text-sm text-white/70">{tagline}</p>}
                </div>
              </div>

              {description && (
                <p className="mb-6 whitespace-pre-wrap leading-relaxed text-gray-300">
                  {description}
                </p>
              )}

              {socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((item) => {
                    const Icon = socialIconMap[item.label];
                    if (!Icon) return null;

                    return (
                      <a
                        key={item.label}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold font-['Poppins']" style={{color:'#fff'}}>Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>{renderNavLink(link)}</li>
                  
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold font-['Poppins']" style={{color:'#fff'}}>Academics</h4>
              <ul className="space-y-3">
                {academicsLinks.map((link, index) => (
                  <li key={index}>{renderNavLink(link)}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold font-['Poppins']" style={{color:'#fff'}}>Contact Us</h4>
              <ul className="space-y-4">
                {address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
                    <span className="text-gray-300">{address}</span>
                  </li>
                )}
                {phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
                    <a href={`tel:${phone}`} className="text-gray-300">
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
                    <a href={`mailto:${email}`} className="text-gray-300">
                      {email}
                    </a>
                  </li>
                )}
                {content.timing && (
                  <li className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
                    <span className="text-gray-300">{content.timing}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-sm text-gray-300">{copyrightText}</p>
          {tagline && (
            <p className="text-sm" style={{ color: withAlpha('#ffffff', 0.7, '#ffffff') }}>
              {tagline}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
