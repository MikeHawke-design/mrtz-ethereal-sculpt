import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GrainOverlay, CursorGlow, OrganicShapes } from "@/components/VisualEffects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import sculpture1 from "@/assets/sculpture-1.jpg";
import sculpture2 from "@/assets/sculpture-2.jpg";
import sculpture3 from "@/assets/sculpture-3.jpg";
import sculpture4 from "@/assets/sculpture-4.jpg";

const portfolioItems = [
  { id: 1, image: sculpture1, title: "Emergence I", year: "2024", category: "Biomechanical", description: "A meditation on organic and mechanical fusion, exploring the boundaries between flesh and machine." },
  { id: 2, image: sculpture2, title: "Vessel of Shadows", year: "2024", category: "Organic Forms", description: "Inspired by deep-sea creatures, this piece captures the mystery of unexplored depths." },
  { id: 3, image: sculpture3, title: "Silent Sentinel", year: "2023", category: "Figurative", description: "A guardian figure emerging from primordial darkness, watching over realms unseen." },
  { id: 4, image: sculpture4, title: "Nocturne", year: "2024", category: "Abstract", description: "Pure form dancing with shadow, an exploration of negative space and presence." },
  { id: 5, image: sculpture1, title: "Metamorphosis", year: "2023", category: "Biomechanical", description: "The eternal cycle of transformation, frozen in a moment of becoming." },
  { id: 6, image: sculpture2, title: "Whispers of Bone", year: "2022", category: "Organic Forms", description: "Skeletal structures reimagined as architectural poetry." },
  { id: 7, image: sculpture3, title: "The Dreamer", year: "2023", category: "Figurative", description: "A figure lost in eternal reverie, suspended between worlds." },
  { id: 8, image: sculpture4, title: "Void Echo", year: "2024", category: "Abstract", description: "Sound made visible, silence given form." },
];

const categories = ["All", "Biomechanical", "Organic Forms", "Figurative", "Abstract"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const currentIndex = selectedItem ? filteredItems.findIndex(item => item.id === selectedItem.id) : -1;

  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <CursorGlow />
      <OrganicShapes />
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <RevealOnScroll className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body block mb-4">
              Portfolio
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-6">
              The Gallery
            </h1>
            <div className="line-ornament w-24 mx-auto mb-8" />
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              A curated collection of sculptural works exploring the boundaries of form, 
              shadow, and organic architecture.
            </p>
          </RevealOnScroll>

          {/* Category Filter */}
          <RevealOnScroll className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
                  selectedCategory === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </RevealOnScroll>

          {/* Gallery Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative cursor-pointer overflow-hidden"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                    >
                      <span className="text-xs tracking-[0.2em] uppercase text-primary mb-2">
                        {item.category}
                      </span>
                      <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                      <span className="text-sm text-muted-foreground">{item.year}</span>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-10"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            {currentIndex > 0 && (
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}
            {currentIndex < filteredItems.length - 1 && (
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            {/* Content */}
            <motion.div
              className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-primary block mb-4">
                  {selectedItem.category}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                  {selectedItem.title}
                </h2>
                <span className="text-muted-foreground mb-6 block">{selectedItem.year}</span>
                <div className="line-ornament w-16 mb-6" />
                <p className="text-muted-foreground font-body leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
