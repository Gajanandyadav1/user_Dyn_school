import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@/api/adminClient';

export default function TopBar({ data }) {
  const { data: settings = {} } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSettings,
  });

  if (!data) return null;

  const phone = data.phone || settings.phone;
  const email = data.email || settings.email;
  const primaryColor = settings.primary_color || "#1E3A8A";

  return (
    <div className="py-2 hidden md:block text-white relative z-50" style={{ backgroundColor: primaryColor }}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[13px]">
        <div className="flex items-center gap-6">
          <a href={`tel:${phone}`} className="flex items-center gap-2 transition-opacity hover:opacity-80 font-medium" style={{ color: "white" }}>
            <Phone className="w-3.5 h-3.5" />
            {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-2 transition-opacity hover:opacity-80 font-medium" style={{ color: "white" }}>
            <Mail className="w-3.5 h-3.5" />
            {email}
          </a>
        </div>
        <div className="text-white/90 font-semibold tracking-wide uppercase">
          {data.importantLine}
        </div>
      </div>
    </div>
  );
}
