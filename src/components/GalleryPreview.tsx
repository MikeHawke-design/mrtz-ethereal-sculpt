import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SculptureCard from "./SculptureCard";
import sculpture1 from "@/assets/sculpture-1.jpg";
import sculpture2 from "@/assets/sculpture-2.jpg";
import sculpture3 from "@/assets/sculpture-3.jpg";
import sculpture4 from "@/assets/sculpture-4.jpg";

const featuredWorks = [
  {
    image: sculpture1,
    title: "Emergence I",
    year: "2024",
    category: "Biomechanical",
  },
  {
    image: sculpture2,
    title: "Vessel of Shadows",
    year: "2024",
    category: "Organic Forms",
  },
  {
    image: sculpture3,
    title: "Silent Sentinel",
    year: "2023",
    category: "Figurative",
  },
  {
    image: sculpture4,
    title: "Nocturne",
    year: "2024",
    category: "Abstract",
  },
];

const GalleryPreview = () => {
  return (
    <section id="gallery-preview" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body block mb-4">
            Selected Works
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6">
            The Collection
          </h2>
          <div className="line-ornament w-16 mx-auto" />
        </RevealOnScroll>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredWorks.map((work, index) => (
            <SculptureCard
              key={work.title}
              image={work.image}
              title={work.title}
              year={work.year}
              category={work.category}
              index={index}
            />
          ))}
        </div>

        {/* View All Link */}
        <RevealOnScroll className="text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <span>View Full Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default GalleryPreview;
