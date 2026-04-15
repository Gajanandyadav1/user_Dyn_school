import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

export default function Newsletter({ data, settings = {}, emailFallback }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  if (!data) return null;

  const primaryColor = settings.primary_color || DEFAULT_PRIMARY;
  const accentColor = settings.accent_color || DEFAULT_ACCENT;
  const textColor = settings.text_color || DEFAULT_PRIMARY;

  const handleNewsletterSubscribe = () => {
    if (!newsletterEmail.trim()) return;
    const recipient = emailFallback || 'info@school.edu';
    const subject = encodeURIComponent(`Newsletter Subscription`);
    const body = encodeURIComponent(`Please subscribe this email to updates: ${newsletterEmail.trim()}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="py-12" style={{ backgroundColor: accentColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-['Poppins']" style={{ color: primaryColor }}>
              {data.heading}
            </h3>
            {data.subheading && (
              <p style={{ color: withAlpha(textColor, 0.8, DEFAULT_PRIMARY) }}>{data.subheading}</p>
            )}
          </div>
          <div className="flex w-full md:w-auto overflow-hidden rounded-full shadow-md">
            <input
              type="email"
              placeholder={data.placeholder || "Enter your email"}
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              className="px-6 py-3 w-full md:w-80 text-gray-800 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleNewsletterSubscribe}
              className="px-6 py-3 text-white transition-colors flex items-center gap-2 hover:brightness-110"
              style={{ backgroundColor: primaryColor }}
            >
              <Send className="w-5 h-5 hidden sm:block" />
              <span className="font-semibold">{data.buttonText || "Subscribe"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
