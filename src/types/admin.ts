export interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
}

export interface PortfolioItem {
  id: string;
  images: MediaItem[];
  title: string;
  year: string;
  category: string;
  description: string;
}

export interface Drop {
  id: string;
  images: MediaItem[];
  title: string;
  edition: number;
  price: number;
  status: "upcoming" | "available" | "sold_out";
  dropDate: string;
  description: string;
  remaining?: number;
}

export interface SiteSettings {
  brandTagline: string;
  email: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  aboutText: string;
  heroTitle: string;
  heroSubtitle: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  brandTagline: "Sculptural art that dwells in the space between darkness and elegance.",
  email: "contact@mrtz.art",
  instagram: "https://instagram.com/mrtz.art",
  twitter: "",
  tiktok: "",
  youtube: "",
  aboutText: "",
  heroTitle: "Sculpting the Shadows",
  heroSubtitle: "Where darkness meets elegance, form emerges from the void.",
};

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  { 
    id: "1", 
    images: [{ id: "1a", url: "/src/assets/sculpture-1.jpg", type: "image" }],
    title: "Emergence I", 
    year: "2024", 
    category: "Biomechanical", 
    description: "A meditation on organic and mechanical fusion." 
  },
  { 
    id: "2", 
    images: [{ id: "2a", url: "/src/assets/sculpture-2.jpg", type: "image" }],
    title: "Vessel of Shadows", 
    year: "2024", 
    category: "Organic Forms", 
    description: "Inspired by deep-sea creatures." 
  },
  { 
    id: "3", 
    images: [{ id: "3a", url: "/src/assets/sculpture-3.jpg", type: "image" }],
    title: "Silent Sentinel", 
    year: "2023", 
    category: "Figurative", 
    description: "A guardian figure emerging from darkness." 
  },
  { 
    id: "4", 
    images: [{ id: "4a", url: "/src/assets/sculpture-4.jpg", type: "image" }],
    title: "Nocturne", 
    year: "2024", 
    category: "Abstract", 
    description: "Pure form dancing with shadow." 
  },
];

export const DEFAULT_DROPS: Drop[] = [
  { 
    id: "1", 
    images: [{ id: "1a", url: "/src/assets/sculpture-3.jpg", type: "image" }],
    title: "The Awakening", 
    edition: 25, 
    price: 2500, 
    status: "upcoming", 
    dropDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
    description: "Limited edition series." 
  },
  { 
    id: "2", 
    images: [{ id: "2a", url: "/src/assets/sculpture-1.jpg", type: "image" }],
    title: "Biomech Series I", 
    edition: 50, 
    price: 1800, 
    status: "available", 
    remaining: 23, 
    dropDate: "", 
    description: "The first in a series of biomechanical explorations." 
  },
];
