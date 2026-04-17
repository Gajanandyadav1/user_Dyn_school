import { create } from "zustand";
import { getPageContent, updateHomePageContent } from "../services/contentService";

function normalizeFixedHomeSections(homeContent, defaultHomeContent) {
  const fixedSections = [
    { key: "achievements", count: 4 },
    { key: "programs", count: 4 },
  ];
  const nextHome = { ...homeContent };

  fixedSections.forEach(({ key: sectionKey, count }) => {
    const defaultSection = defaultHomeContent?.[sectionKey] || {};
    const currentSection = nextHome?.[sectionKey] || {};
    const defaultBlocks = Array.isArray(defaultSection.blocks) ? defaultSection.blocks : [];
    const currentBlocks = Array.isArray(currentSection.blocks) ? currentSection.blocks : [];

    nextHome[sectionKey] = {
      ...defaultSection,
      ...currentSection,
      blocks: Array.from({ length: count }, (_, index) => ({
        ...(defaultBlocks[index] || {}),
        ...(currentBlocks[index] || {}),
      })),
    };
  });

  return nextHome;
}

const defaultPageContent = {
  home: {
    top_bar: {
      phone: "+91 98765 43210",
      email: "info@malhotraschool.edu",
      importantLine: "Admissions open for 2024-2025 academic year!"
    },
    hero: {
      blocks: [
        {
          heading: "Welcome to Malhotra Public School",
          subheading: "Learning Today, Leading Tomorrow",
          description: "We provide modern education with traditional values, preparing students for the challenges of tomorrow while instilling strong moral foundations.",
          image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920",
          button1Text: "Apply Now",
          button1Link: "/admissions",
          button2Text: "Learn More",
          button2Link: "/about"
        }
      ]
    },
    about_preview: {
      heading: "Nurturing Young Minds Since 2008",
      subheading: "About Us",
      description: "Malhotra Public School is committed to academic excellence and character development. Our holistic approach to education ensures that every child receives personalized attention.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
      buttonText: "Discover More",
      buttonLink: "/about"
    },
    difference_section: {
      heading: "What Makes Us Different",
      subheading: "Why Choose Us",
      middleText: "We don't just educate. We inspire, nurture, and empower every child to grow with confidence and curiosity.",
      blocks: [
        { icon: "GraduationCap", heading: "Expert Faculty", text: "Highly qualified and dedicated teachers who mentor students with care." },
        { icon: "BookOpen", heading: "Strong Curriculum", text: "Balanced academic programs designed for conceptual and practical learning." },
        { icon: "Shield", heading: "Safe Campus", text: "Secure, student-friendly spaces with a strong focus on wellbeing and discipline." }
      ]
    },
    achievements: {
      heading: "Our Legacy",
      subheading: "Years of Excellence",
      blocks: [
        { icon: "award", number: "18+", shortText: "Years of Excellence" },
        { icon: "users", number: "2500+", shortText: "Happy Students" },
        { icon: "book", number: "100%", shortText: "Pass Result" },
        { icon: "award", number: "35+", shortText: "Expert Faculty Members" }
      ]
    },
    programs: {
      heading: "Academic Programs",
      subheading: "What We Offer",
      description: "Providing a comprehensive curriculum designed to foster academic excellence and critical thinking.",
      blocks: [
        { image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", title: "Primary Education", description: "Foundation years focusing on core concepts.", buttonLink: "/programs/primary" },
        { image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", title: "Secondary Education", description: "Advanced curriculum with state-of-the-art labs.", buttonLink: "/programs/secondary" },
        { image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800", title: "STEM Learning", description: "Hands-on science, coding, and lab-based discovery programs.", buttonLink: "/programs/stem" },
        { image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", title: "Creative Arts", description: "Music, art, theatre, and expression-driven learning tracks.", buttonLink: "/programs/arts" }
      ]
    },
    gallery: {
      heading: "Campus Life",
      subheading: "Gallery Snapshot",
      shortText: "Explore our beautiful campus infrastructure.",
      buttonLink: "/gallery",
      blocks: [
        { image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800" },
        { image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800" }
      ]
    },
    notices: {
      heading: "Latest Updates",
      subheading: "Notices & Events",
      description: "Stay updated with the latest happenings at our school.",
      buttonText: "View All Notices",
      buttonLink: "/notices",
      blocks: [
        { title: "Annual Sports Meet", shortText: "Join us for the annual sports day.", date: "Oct 15, 2024", isHighlighted: "true", attachmentUrl: "" },
        { title: "Parent Teacher Meeting", shortText: "Schedule for the upcoming PTM.", date: "Oct 20, 2024", isHighlighted: "false", attachmentUrl: "" }
      ]
    },
    testimonials: {
      heading: "What Parents Say",
      subheading: "Testimonials",
      blocks: [
        { name: "Rahul Sharma", role: "Parent", image: "", reviewText: "The teachers here are amazing! My child has shown incredible progress." },
        { name: "Priya Singh", role: "Parent", image: "", reviewText: "Excellent facilities and a very supportive environment." }
      ]
    },
    admission: {
      heading: "Join Us Today",
      subheading: "Admissions Open",
      description: "Start the journey to a brighter future. Apply today for the upcoming academic session.",
      buttonLink: "/admissions/apply"
    },
    footer: {
      schoolName: "Malhotra Public School",
      tagline: "Learning Today, Leading Tomorrow",
      description: "Dedicated to providing world-class education with strong moral values.",
      address: "123 Education Boulevard, Knowledge City",
      phone: "+91 98765 43210",
      email: "info@malhotraschool.edu",
      blocks: [
        { type: "Social", label: "Facebook", url: "https://facebook.com/school" },
        { type: "QuickLink", label: "Admissions", url: "/admissions" },
        { type: "QuickLink", label: "Careers", url: "/careers" }
      ]
    }
  },
  about: {
    hero: { heading: "About Us", subheading: "Our Story", description: "", backgroundColor: "var(--site-primary)", backgroundImage: "" },
    section2: { heading: "Our History", subheading: "", description: "", image: "" },
    tabs: { heading: "Mission & Vision", subheading: "", description: "", blocks: [] },
    slider: { heading: "Core Values", subheading: "", description: "", blocks: [] },
    stats: { heading: "By the Numbers", subheading: "", description: "", blocks: [] }
  },
  contact: {
    header: { heading: "Contact Us", subheading: "Get in touch", backgroundImage: "" },
    formFields: { formTitle: "Send a Message", fields: "Name,Email,Phone,Message" },
    infoSide: { heading: "Reach Out", subheading: "We're here to help", description: "", blocks: [] }
  },
  team: {
    intro: { heading: "Our Team", subheading: "Meet Our Team", description: "Dedicated educators and staff." },
    memberLeft: { image: "", name: "Jane Doe", smallText: "Principal", heading: "Message from Principal", subheading: "Vision", description: "" },
    memberRight: { image: "", name: "John Smith", smallText: "Vice Principal", heading: "Message from Vice Principal", subheading: "Operations", description: "" },
    teamHeader: { heading: "Our Expert Faculty", subheading: "The backbone of our institution", description: "" },
    teamCards: { blocks: [] },
    supportStaff: { heading: "Support Staff", subheading: "Ensuring smooth operations", description: "", blocks: [] }
  },
  global: {
    newsletter: { heading: "Subscribe to Our Newsletter", subheading: "Stay updated with latest news and events", placeholder: "Enter your email", buttonText: "Subscribe" },
    footer: { logo: "", description: "Dedicated to providing world-class education with strong moral values.", address: "123 Education Boulevard", phone: "+91 98765 43210", email: "info@malhotraschool.edu", timing: "Mon - Sat: 8:00 AM - 4:00 PM" },
    quickLinks: { blocks: [ { label: "Admissions", url: "/admissions" }, { label: "Careers", url: "/careers" } ] },
    academicsLinks: { blocks: [ { label: "Academic Programs", url: "/programs" }, { label: "Campus Gallery", url: "/gallery" } ] }
  }
};

export const usePageStore = create((set, get) => ({
  content: defaultPageContent,
  isLoading: false,
  isSaving: false,
  error: null,

  fetchContent: async () => {
    set({ isLoading: true, error: null });
    try {
      const [homeData, globalData] = await Promise.all([
        getPageContent("home"),
        getPageContent("global")
      ]);
      
      const defaultHome = defaultPageContent.home || {};
      const apiHome = homeData || {};
      
      const defaultGlobal = defaultPageContent.global || {};
      const apiGlobal = globalData || {};

      set((state) => {
        return {
          content: {
            ...state.content,
            home: {
              ...normalizeFixedHomeSections({ ...defaultHome, ...apiHome }, defaultHome)
            },
            global: {
              newsletter: { ...defaultGlobal.newsletter, ...(apiGlobal.newsletter || {}) },
              footer: { ...defaultGlobal.footer, ...(apiGlobal.footer || {}) },
              quickLinks: apiGlobal.quickLinks || defaultGlobal.quickLinks,
              academicsLinks: apiGlobal.academicsLinks || defaultGlobal.academicsLinks
            }
          },
          isLoading: false
        };
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // User panel typically doesn't save, but we keep the method for consistency
  saveContent: async () => {
    console.warn("Save content called from UserPanel. Ignoring.");
  },

  updateSection: (page, section, data) =>
    set((state) => {
      const existingSection = state.content[page][section] || {};
      return {
        content: {
          ...state.content,
          [page]: {
            ...state.content[page],
            [section]: { ...existingSection, ...data },
          },
        },
      };
    }),

  addBlock: (page, section, block) =>
    set((state) => {
      const currentSection = state.content[page][section] || {};
      const blocks = currentSection.blocks || [];
      return {
        content: {
          ...state.content,
          [page]: {
            ...state.content[page],
            [section]: { ...currentSection, blocks: [...blocks, block] },
          },
        },
      };
    }),

  deleteBlock: (page, section, index) =>
    set((state) => {
      const currentSection = state.content[page][section] || {};
      const blocks = [...(currentSection.blocks || [])];
      blocks.splice(index, 1);
      return {
        content: {
          ...state.content,
          [page]: {
            ...state.content[page],
            [section]: { ...currentSection, blocks },
          },
        },
      };
    }),
    
  updateBlock: (page, section, index, blockData) =>
    set((state) => {
      const currentSection = state.content[page][section] || {};
      const blocks = [...(currentSection.blocks || [])];
      blocks[index] = { ...blocks[index], ...blockData };
      return {
        content: {
          ...state.content,
          [page]: {
            ...state.content[page],
            [section]: { ...currentSection, blocks },
          },
        },
      };
    }),
}));
