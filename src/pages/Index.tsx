import { GrainOverlay, CursorGlow, OrganicShapes } from "@/components/VisualEffects";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import GalleryPreview from "@/components/GalleryPreview";
import DropsPreview from "@/components/DropsPreview";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Visual Effects */}
      <GrainOverlay />
      <CursorGlow />
      <OrganicShapes />
      <ScrollProgress />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <HeroSection />
        <GalleryPreview />
        <DropsPreview />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
