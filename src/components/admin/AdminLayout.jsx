import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/api/adminClient";
import Navbar from "../website/Navbar";
import TopBar from "../website/TopBar";
import Footer from "../website/Footer";
import Newsletter from "../website/Newsletter";
import { usePageStore } from '../../store/pageContentStore';
  
const Layout = () => {
  const fetchContent = usePageStore((state) => state.fetchContent);
  const content = usePageStore((state) => state.content);

  const { data: settings = {} } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSettings,
  });

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    const schoolName = settings.school_name || "Malhotra Public School";
    document.title = settings.meta_title || schoolName;

    if (settings.meta_description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", settings.meta_description);
    }

    if (settings.meta_keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", settings.meta_keywords);
    }

    if (settings.favicon) {
      let favicon = document.querySelector("link[rel='icon']");
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.setAttribute("rel", "icon");
        document.head.appendChild(favicon);
      }
      favicon.setAttribute("href", settings.favicon);
    }

    if (settings.primary_color) {
      document.documentElement.style.setProperty("--site-primary", settings.primary_color);
    }
    if (settings.accent_color) {
      document.documentElement.style.setProperty("--site-accent", settings.accent_color);
    }
    if (settings.text_color) {
      document.documentElement.style.setProperty("--site-text", settings.text_color);
      document.documentElement.style.setProperty("--site-heading", settings.text_color);
      document.documentElement.style.setProperty("--site-muted-text", `${settings.text_color}CC`);
    }
    if (settings.font_family) {
      document.documentElement.style.setProperty("--site-font-family", settings.font_family);
    }
  }, [settings]);

  return (
    <div data-site-theme="true">
      {/* <TopBar data={content?.home?.top_bar} /> */}
      <Navbar />
      
      <Outlet />

      <Newsletter data={content?.global?.newsletter} settings={settings} emailFallback={settings.email} />
      <Footer data={content?.global} settings={settings} />
    </div>
  );
};

export default Layout;
