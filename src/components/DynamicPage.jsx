import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSettings, getUserPages } from "@/api/adminClient";
import { isExternalLink, normalizeSiteLink } from "@/lib/siteNavigation";

function HeroSection({ section, title, primaryColor, accentColor }) {
  return (
    <section className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: primaryColor }}>
      {section.image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${section.image})` }}
        />
      )}
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${primaryColor}E6, ${primaryColor}BF, ${primaryColor}73)` }} />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: accentColor }}>
            Dynamic Page
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">{section.title || title}</h1>
          {section.subtitle && <p className="mt-4 max-w-3xl text-lg text-slate-200">{section.subtitle}</p>}
          {section.content && <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">{section.content}</p>}
          {section.buttons?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {section.buttons.map((button, index) =>
                isExternalLink(button.link) ? (
                  <a
                    key={`${button.label}-${index}`}
                    href={button.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`rounded-full px-6 py-3 font-semibold transition ${
                      index === 0
                        ? "bg-[#FACC15] text-[#1E3A8A] hover:bg-[#fde68a]"
                        : "border border-white/60 text-white hover:bg-white/10"
                    }`}
                    style={index === 0 ? { backgroundColor: accentColor, color: primaryColor } : undefined}
                  >
                    {button.label}
                  </a>
                ) : (
                  <Link
                    key={`${button.label}-${index}`}
                    to={normalizeSiteLink(button.link)}
                    className={`rounded-full px-6 py-3 font-semibold transition ${
                      index === 0
                        ? "bg-[#FACC15] text-[#1E3A8A] hover:bg-[#fde68a]"
                        : "border border-white/60 text-white hover:bg-white/10"
                    }`}
                    style={index === 0 ? { backgroundColor: accentColor, color: primaryColor } : undefined}
                  >
                    {button.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContentSection({ section }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="whitespace-pre-line leading-8 text-slate-600">{section.text}</p>
      </div>
    </section>
  );
}

function GallerySection({ section }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Gallery</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {section.images.map((image, index) => (
            <div key={`${image.url}-${index}`} className="overflow-hidden rounded-2xl bg-slate-50">
              <img src={image.url} alt={image.category || `Gallery ${index + 1}`} className="h-56 w-full object-cover" />
              <div className="p-4">
                <p className="font-medium text-slate-900">{image.category || "General"}</p>
                <p className="mt-1 text-sm text-slate-500">Image from the managed gallery section.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtraSection({ section, primaryColor }) {
  const gridClass = section.layout === "grid-2" ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className={`grid gap-6 ${gridClass}`}>
        {section.stats?.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Stats</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {section.stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`} className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.15em] text-slate-500">{stat.label}</p>
                  <p className="mt-3 text-3xl font-bold" style={{ color: primaryColor }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.testimonials?.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Testimonials</h2>
            <div className="mt-6 space-y-4">
              {section.testimonials.map((testimonial, index) => (
                <blockquote key={`${testimonial.name}-${index}`} className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-slate-600">"{testimonial.quote}"</p>
                  <footer className="mt-3 font-semibold text-slate-900">{testimonial.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function renderSection(pageTitle, section, primaryColor, accentColor) {
  switch (section.type) {
    case "hero":
      return <HeroSection key={section.order} section={section} title={pageTitle} primaryColor={primaryColor} accentColor={accentColor} />;
    case "content":
      return <ContentSection key={section.order} section={section} />;
    case "gallery":
      return <GallerySection key={section.order} section={section} />;
    case "extra":
      return <ExtraSection key={section.order} section={section} primaryColor={primaryColor} />;
    default:
      return null;
  }
}

export default function DynamicPage() {
  const { slug } = useParams();
  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["user-pages"],
    queryFn: getUserPages,
  });
  const { data: settings = {} } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSettings,
  });

  const primaryColor = settings.primary_color || "#1E3A8A";
  const accentColor = settings.accent_color || "#FACC15";

  if (isLoading) {
    return <div className="mx-auto max-w-6xl px-4 py-20 text-slate-500">Loading page...</div>;
  }

  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Page not available</h1>
          <p className="mt-4 text-slate-600">This page is hidden or does not have any sections yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      {page.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => renderSection(page.title, section, primaryColor, accentColor))}
    </div>
  );
}
