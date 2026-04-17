/* eslint-disable no-unused-vars */
 
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSettings, getUserPages, listNavItems } from "@/api/adminClient";
import { buildNavigation, isExternalLink } from "@/lib/siteNavigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const { data: pages = [] } = useQuery({
    queryKey: ["user-pages"],
    queryFn: getUserPages,
  });

  const { data: navItems = [] } = useQuery({
    queryKey: ["navItems"],
    queryFn: listNavItems,
  });

  const { data: settings = {} } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSettings,
  });

  const schoolName = settings.school_name || "School Name";
  const tagline = settings.tagline || "Tagline";
  const primaryColor = settings.primary_color || "var(--site-primary)";
  const accentColor = settings.accent_color || "var(--site-accent)";

  const baseNavigationItems = buildNavigation(navItems, pages).filter(
    (item) => !item.parent_id
  );

  const coreLinks = [
    { id: "nav-home", label: "Home", link: "/" },
    { id: "nav-about", label: "About", link: "/about" },
    { id: "nav-contact", label: "Contact", link: "/contact" },
    { id: "nav-team", label: "Our Team", link: "/team" },
  ];

  const galleryItem = {
    id: "nav-gallery",
    label: "Gallery",
    link: "/gallery",
  };

  const dynamicLinks = baseNavigationItems.filter(
    (i) => !["/", "/about", "/contact", "/team", "/gallery"].includes(i.link)
  );

  const navigationItems = [...coreLinks, ...dynamicLinks, galleryItem];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="relative flex items-center justify-between h-20">
          
          {/* Left Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              {settings.logo ? (
                <img
                  src={settings.logo}
                  alt={schoolName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  <GraduationCap
                    className="w-7 h-7"
                    style={{ color: accentColor }}
                  />
                </div>
              )}

              <div>
                <h1
                  className="font-bold text-lg"
                  style={{
                    color: isScrolled ? primaryColor : "#ffffff",
                  }}
                >
                  {schoolName}
                </h1>

                <p
                  className="text-xs tracking-widest"
                  style={{
                    color: isScrolled ? "#6b7280" : "#e5e7eb",
                  }}
                >
                  {tagline}
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navigationItems.map((item) => {
              const isActive = !isExternalLink(item.link) && currentPath === item.link;
              const defaultColor = isScrolled ? primaryColor : "#ffffff";
              
              return isExternalLink(item.link) ? (
                <a
                  key={item.id}
                  href={item.link}
                  className="font-medium transition"
                  style={{ color: defaultColor }}
                  onMouseEnter={(e) => (e.target.style.color = accentColor)}
                  onMouseLeave={(e) => (e.target.style.color = defaultColor)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.id}
                  to={item.link}
                  className={`font-medium transition relative pb-1`}
                  style={{ color: isActive ? accentColor : defaultColor }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.target.style.color = accentColor;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.target.style.color = defaultColor;
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact">
              <button
                className="px-6 py-3 rounded-xl font-semibold text-white transition"
                style={{ backgroundColor: accentColor, color: '#000' }}
              >
                Apply Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X
                style={{
                  color: isScrolled ? primaryColor : "#ffffff",
                }}
              />
            ) : (
              <Menu
                style={{
                  color: isScrolled ? primaryColor : "#ffffff",
                }}
              />
            )}
          </button>
        </div>
      </div>


      {/* Mobile Menu */}
{isMobileMenuOpen && (
  <div className="lg:hidden bg-white shadow-lg px-6 py-4 space-y-4">
    {navigationItems.map((item) =>
      isExternalLink(item.link) ? (
        <a
          key={item.id}
          href={item.link}
          className="block font-medium text-gray-700"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </a>
      ) : (
        <Link
          key={item.id}
          to={item.link}
          className="block font-medium text-gray-700"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      )
    )}

    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
      <button
        className="w-full px-6 py-3 rounded-xl font-semibold  "
        style={{ backgroundColor: accentColor, color: '#000' }}
      >
        Apply Now
      </button>
    </Link>
  </div>
)}
    </motion.nav>
  );
}