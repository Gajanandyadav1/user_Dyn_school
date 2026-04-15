/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, GraduationCap } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import { getSettings, getUserPages, listNavItems } from "@/api/adminClient";
// import { buildNavigation, isExternalLink } from "@/lib/siteNavigation";

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const { data: pages = [] } = useQuery({
//     queryKey: ["user-pages"],
//     queryFn: getUserPages,
//   });
  
//   const { data: navItems = [] } = useQuery({
//     queryKey: ["navItems"],
//     queryFn: listNavItems,
//   });
  
//   const { data: settings = {} } = useQuery({
//     queryKey: ["site-settings"],
//     queryFn: getSettings,
//   });

//   const schoolName = settings.school_name || "Malhotra Public School";
//   const tagline = settings.tagline || "Learning Today, Leading Tomorrow";
//   const primaryColor = settings.primary_color || "#1E3A8A";
//   const accentColor = settings.accent_color || "#FACC15";

//   const baseNavigationItems = buildNavigation(navItems, pages).filter((item) => !item.parent_id);
//   const coreLinks = [
//     { id: 'nav-home', label: 'Home', link: '/' },
//     { id: 'nav-about', label: 'About', link: '/about' },
//     { id: 'nav-contact', label: 'Contact', link: '/contact' },
//     { id: 'nav-team', label: 'Our Team', link: '/team' },
//   ];
//   const galleryItem = { id: 'nav-gallery', label: 'Gallery', link: '/gallery' };
  
//   // Filter out any dynamic links that conflict with our core strict links
//   const dynamicLinks = baseNavigationItems.filter(i => 
//     !['/', '/about', '/contact', '/team', '/gallery'].includes(i.link)
//   );

//   const navigationItems = [...coreLinks, ...dynamicLinks, galleryItem];

//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>

//       <motion.nav
//         className={`sticky top-0 z-50 transition-all duration-300 ${
//           isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white shadow-sm"
//         }`}
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between items-center h-20">
//             <Link to="/" className="flex items-center gap-3 group">
//               {settings.logo ? (
//                 <img src={settings.logo} alt={schoolName} className="h-12 w-12 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
//               ) : (
//                 <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm" style={{ backgroundColor: primaryColor }}>
//                   <GraduationCap className="w-7 h-7" style={{ color: accentColor }} />
//                 </div>
//               )}
//               <div>
//                 <h1 className="font-bold text-lg" style={{ color: primaryColor }}>{schoolName}</h1>
//                 <p className="text-xs text-gray-500">{tagline}</p>
//               </div>
//             </Link>

//             <div className="hidden lg:flex items-center gap-2">
//               {navigationItems.map((item) =>
//                 isExternalLink(item.link) ? (
//                   <a
//                     key={item.id}
//                     href={item.link}
//                     target={item.open_in_new_tab ? "_blank" : undefined}
//                     rel={item.open_in_new_tab ? "noreferrer" : undefined}
//                     className="px-4 py-2 text-gray-700 font-medium hover:text-[#1E3A8A] transition-colors"
//                   >
//                     {item.label}
//                   </a>
//                 ) : (
//                   <Link
//                     key={item.id}
//                     to={item.link}
//                     className="px-4 py-2 text-gray-700 font-medium hover:text-[#1E3A8A] transition-colors"
//                   >
//                     {item.label}
//                   </Link>
//                 )
//               )}
//             </div>

//             <button className="lg:hidden" onClick={() => setIsMobileMenuOpen((open) => !open)}>
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6" style={{ color: primaryColor }} />
//               ) : (
//                 <Menu className="w-6 h-6" style={{ color: primaryColor }} />
//               )}
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="lg:hidden bg-white border-t"
//             >
//               <div className="max-w-7xl mx-auto px-4 py-4">
//                 {navigationItems.map((item) =>
//                   isExternalLink(item.link) ? (
//                     <a
//                       key={item.id}
//                       href={item.link}
//                       target={item.open_in_new_tab ? "_blank" : undefined}
//                       rel={item.open_in_new_tab ? "noreferrer" : undefined}
//                       className="block py-3 text-gray-700 border-b"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                     >
//                       {item.label}
//                     </a>
//                   ) : (
//                     <Link
//                       key={item.id}
//                       to={item.link}
//                       className="block py-3 text-gray-700 border-b"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                     >
//                       {item.label}
//                     </Link>
//                   )
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSettings, getUserPages, listNavItems } from "@/api/adminClient";
import { buildNavigation, isExternalLink } from "@/lib/siteNavigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  const primaryColor = settings.primary_color || "#1E3A8A";
  const accentColor = settings.accent_color || "#FACC15";

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

          {/* Center Menu */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navigationItems.map((item) =>
              isExternalLink(item.link) ? (
                <a
                  key={item.id}
                  href={item.link}
                  className="font-medium transition"
                  style={{
                    color: isScrolled ? primaryColor : "#ffffff",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = accentColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = isScrolled
                      ? primaryColor
                      : "#ffffff")
                  }
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.id}
                  to={item.link}
                  className="font-medium transition"
                  style={{
                    color: isScrolled ? primaryColor : "#ffffff",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = accentColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = isScrolled
                      ? primaryColor
                      : "#ffffff")
                  }
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact">
              <button
                className="px-6 py-3 rounded-xl font-semibold text-white transition"
                style={{ backgroundColor: accentColor }}
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
    </motion.nav>
  );
}