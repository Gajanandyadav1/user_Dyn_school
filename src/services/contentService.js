import { Base_Url } from "../config";

const API_BASE = Base_Url.replace(/\/$/, "");

function getAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("admin_token");
  } catch {
    return null;
  }
}

export async function getPageContent(pageKey) {
  try {
    const res = await fetch(`${API_BASE}/content/${pageKey}`);
    if (!res.ok) throw new Error(`Failed to fetch ${pageKey} content`);
    const json = await res.json();
    return json?.data || json; 
  } catch (err) {
    console.error(`Error fetching ${pageKey} content:`, err);
    return null;
  }
}

export async function updateHomePageContent(payload) {
  try {
    const headers = { "Content-Type": "application/json" };
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/content/home`, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update home page content");
    const json = await res.json();
    return json?.data || json;
  } catch (err) {
    console.error("Error updating homepage content:", err);
    throw err;
  }
}
