import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import AboutPage from "./components/AboutPage";
import Academics from "./components/Academics";
import Admissions from "./components/Admissions";
import ContactPage from "./components/ContactPage";
import Notices from "./components/Notices";
import TeamPage from "./components/TeamPage";
import DynamicPage from "./components/DynamicPage";
import Layout from "./components/admin/AdminLayout";
import GalleryPage from "./components/GalleryPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="academics" element={<Academics />} />
        <Route path="programs" element={<Academics />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="admissions/apply" element={<Admissions />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="notices" element={<Notices />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path=":slug" element={<DynamicPage />} />

      </Route>
    </Routes>
  );
};

export default App;
