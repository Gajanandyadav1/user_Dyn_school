import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  FileText,
  Bell,
  Users,
  Settings,
  Home,
  ImageIcon,
  X,
  PanelLeft,
  LogOut
} from "lucide-react";

export default function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "AdminDashboard" },
    { icon: Home, label: "Home Page", page: "AdminHomePage" },
    { icon: ImageIcon, label: "Banners", page: "AdminBanners" },
    { icon: Image, label: "Gallery", page: "AdminGallery" },
    { icon: Bell, label: "Notices", page: "AdminNotices" },
    { icon: Users, label: "Admissions", page: "AdminAdmissions" },
    { icon: FileText, label: "Pages", page: "AdminPages" },
    { icon: Settings, label: "Settings", page: "AdminSettings" },
  ];

  const isActive = (page) => location.pathname === "/" + page;

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0 h-screen
        bg-[var(--site-primary)] text-white z-40
        transform transition-transform duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Mobile Close Button */}
       

      {/* Logo Section */}
     {/* Top Header Row */}
<div className="flex items-center justify-between px-4 py-5 border-b border-white/10">

  {/* Left Side → Logo + Text */}
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
      <span className="text-blue-900 font-bold text-lg">M</span>
    </div>

    {!isCollapsed && (
      <div>
        <h1 className="font-bold text-lg leading-none">MPS Admin</h1>
        <p className="text-xs text-gray-300">School CMS</p>
      </div>
    )}
  </div>

  {/* Right Side → Close (Mobile) + Collapse (Desktop) */}
  <div className="flex items-center gap-2">

    {/* Mobile Close */}
    <button
      onClick={() => setIsMobileOpen(false)}
      className="lg:hidden"
    >
      <X className="w-5 h-5" />
    </button>

    {/* Desktop Collapse */}
    <button
      onClick={() => setIsCollapsed(!isCollapsed)}
      className="hidden lg:block"
    >
      <PanelLeft className="w-5 h-5" />
    </button>

  </div>
</div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.page}
            to={"/" + item.page}
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive(item.page)
                ? "bg-yellow-400 text-blue-900"
                : "hover:bg-white/10"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>



      <div className="p-4 border-t border-white/10">
  <button
    onClick={() => {
      setIsMobileOpen(false);
      console.log("Logout clicked");
    }}
    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-500/20 transition"
  >
    <LogOut className="w-5 h-5" />
    {!isCollapsed && <span>Logout</span>}
  </button>
</div>
    </aside>
  );
}