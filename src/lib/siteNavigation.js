export function isExternalLink(link = "") {
  return /^https?:\/\//i.test(link) || /^mailto:/i.test(link) || /^tel:/i.test(link);
}

export function normalizeSiteLink(link = "") {
  const value = String(link || "").trim();
  if (!value) return "/";
  if (isExternalLink(value)) return value;
  return value.startsWith("/") ? value : `/${value}`;
}

export function getPageLink(userPages = [], slug = "", fallback = "/") {
  const cleanSlug = String(slug || "").replace(/^\/+/, "").trim();
  if (!cleanSlug) return fallback;
  const exists = (userPages || []).some(
    (page) => String(page?.slug || "").replace(/^\/+/, "") === cleanSlug
  );
  return exists ? `/${cleanSlug}` : fallback;
}

export function getFallbackNavigation(userPages = []) {
  const dynamicPages = (userPages || [])
    .filter((page) => page?.slug)
    .sort((a, b) => Number(a.order || 999) - Number(b.order || 999))
    .map((page) => ({
      id: page._id || page.id || page.slug,
      label: page.title,
      link: `/${page.slug}`,
      isExternal: false,
      order: Number(page.order || 999),
      parent_id: "",
    }));

  return [{ id: "home", label: "Home", link: "/", isExternal: false, order: -1, parent_id: "" }, ...dynamicPages];
}

export function buildNavigation(navItems = [], userPages = []) {
  const activeItems = (navItems || []).filter((item) => item.is_active !== false);
  const builtInRoutes = [
    "/about",
    "/academics",
    "/programs",
    "/admissions",
    "/admissions/apply",
    "/contact",
    "/team",
    "/gallery",
    "/notices",
  ];
  const validInternalLinks = new Set([
    "/",
    ...builtInRoutes,
    ...(userPages || [])
      .filter((page) => page?.slug)
      .map((page) => `/${String(page.slug).replace(/^\/+/, "")}`),
  ]);

  if (activeItems.length === 0) {
    return getFallbackNavigation(userPages);
  }

  return activeItems
    .map((item) => ({
      ...item,
      link: normalizeSiteLink(item.link),
    }))
    .filter((item) => isExternalLink(item.link) || validInternalLinks.has(item.link))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}
