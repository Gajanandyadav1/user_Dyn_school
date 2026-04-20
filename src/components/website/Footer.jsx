/* eslint-disable no-unused-vars */
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
  Map
} from 'lucide-react';
import FixedImage from '../ui/FixedImage';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY } from '@/lib/siteTheme';
import { isExternalLink, normalizeSiteLink } from '@/lib/siteNavigation';

export default function Footer({ data, settings = {} }) {
  const content = data?.footer || {};
  const quickLinks = data?.quickLinks?.blocks || [];
  const academicsLinks = data?.academicsLinks?.blocks || [];

  
  if (!data) return null;

  // eslint-disable-next-line no-unused-vars
  const primaryColor = settings.primary_color || DEFAULT_PRIMARY;
  // eslint-disable-next-line no-unused-vars
  const accentColor = settings.accent_color || DEFAULT_ACCENT;
  const schoolName = settings.school_name || content.schoolName || 'Malhotra Public School';
  const tagline = settings.tagline || content.tagline || '';
  const footerLogo = content.logo || settings.logo || '';
  const description = content.description || settings.meta_description || '';
  const address = content.address || settings.address || '';
  const phone = content.phone || settings.phone || '';
  const email = content.email || settings.email || '';
  const mapEmbed = settings.map_embed || '';
  const timing = content.timing || '';

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
    const isEx = isExternalLink(item.url);
    const Tag = isEx ? 'a' : Link;
    const props = isEx ? { href: item.url, target: '_blank', rel: 'noreferrer' } : { to: normalizeSiteLink(item.url) };

    return (
      <Tag
        {...props}
        className="group flex items-center gap-3 text-white/70 transition-all hover:text-white"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-[var(--site-accent)]">
          <ChevronRight className="h-3 w-3 transition-colors group-hover:text-black" />
        </span>
        <span className="font-medium">{item.label}</span>
      </Tag>
    );
  };

  return (
    <footer className="relative overflow-hidden bg-[var(--site-primary)] text-white">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-[0.03]">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[var(--site-accent)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 md:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-16">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-4">
              
              {footerLogo ? (
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg sm:h-16 sm:w-16">
                  <FixedImage src={footerLogo} ratio="1/1" className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--site-accent)] shadow-lg sm:h-16 sm:w-16">
                  <GraduationCap className="h-8 w-8 text-[var(--site-primary)]" />
                </div>
              )}
              <div>
                <h3 className="font-['Poppins'] text-lg font-bold leading-tight tracking-wide text-white sm:text-xl" style={{color:'#fff'}}>
                  {schoolName} 
                </h3>
                {tagline && <p className="text-sm font-medium text-[var(--site-accent)]">{tagline}</p>}
              </div>
            </div>

            {description && (
              <p className="mb-8 text-sm leading-relaxed text-white/80">
                {description}
              </p>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = socialIconMap[item.label];
                  if (!Icon) return null;
                  return (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-[var(--site-accent)] hover:shadow-[0_4px_15px_rgba(250,204,21,0.4)]"
                    >
                      <Icon className="h-4 w-4 text-white transition-colors group-hover:text-black" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-6 font-['Poppins'] text-lg font-bold tracking-wide text-white" style={{color:'#fff'}}>
              Quick Links
              <span className="mt-2 block h-1 w-12 rounded bg-[var(--site-accent)]" />
            </h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link, index) => (
                <li key={index}>{renderNavLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academics */}
          <div>
            <h4 className="mb-6 font-['Poppins'] text-lg font-bold tracking-wide text-white" style={{color:'#fff'}}>
              Academics
              <span className="mt-2 block h-1 w-12 rounded bg-[var(--site-accent)]" />
            </h4>
            <ul className="flex flex-col gap-4">
              {academicsLinks.map((link, index) => (
                <li key={index}>{renderNavLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Maps */}
          <div>
            <h4 className="mb-6 font-['Poppins'] text-lg font-bold tracking-wide text-white"  style={{color:'#fff'}}>
              Get in Touch
              <span className="mt-2 block h-1 w-12 rounded bg-[var(--site-accent)]" />
            </h4>
            
            <ul className="mb-6 flex flex-col gap-4">
              {address && (
                <li className="flex items-start gap-4 text-sm text-white/80 transition-colors hover:text-white">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <MapPin className="h-4 w-4 text-[var(--site-accent)]" />
                  </div>
                  <span className="mt-1 leading-tight">{address}</span>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-4 text-sm text-white/80 transition-colors hover:text-white">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Phone className="h-4 w-4 text-[var(--site-accent)]" />
                  </div>
                  <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-4 text-sm text-white/80 transition-colors hover:text-white">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Mail className="h-4 w-4 text-[var(--site-accent)]" />
                  </div>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
              {timing && (
                <li className="flex items-start gap-4 text-sm text-white/80 transition-colors hover:text-white">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Clock className="h-4 w-4 text-[var(--site-accent)]" />
                  </div>
                  <span className="mt-1 leading-tight">{timing}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-10">
          <p className="text-center text-xs font-medium text-white/60 md:text-left">
            {copyrightText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold tracking-wide text-white/60">
            <Link to="/privacy" className="transition hover:text-[var(--site-accent)]">Privacy Policy</Link>
            <span className="h-1 w-1 rounded-full bg-white/20"></span>
            <Link to="/terms" className="transition hover:text-[var(--site-accent)]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
