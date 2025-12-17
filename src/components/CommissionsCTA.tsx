import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import sculpture4 from "@/assets/sculpture-4.jpg";

const CommissionsCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <RevealOnScroll direction="left" className="order-2 lg:order-1">
            <div className="relative">
              <motion.img
                src={sculpture4}
                alt="Custom commission example"
                className="w-full aspect-[4/5] object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              />
              <div className="absolute -inset-4 border border-primary/20 -z-10" />
              
              {/* Floating accent */}
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24 border border-primary/30 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Content */}
          <RevealOnScroll direction="right" delay={0.2} className="order-1 lg:order-2">
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body block mb-4">
              Bespoke Creations
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Commission a Piece
            </h2>
            <div className="line-ornament w-16 mb-8" />
            <p className="text-muted-foreground font-body leading-relaxed mb-6 max-w-md">
              Transform your vision into sculptural reality. Each commission is a 
              collaborative journey, resulting in a unique piece that speaks to your 
              aesthetic and space.
            </p>
            
            {/* Process highlights */}
            <ul className="space-y-3 mb-8">
              {["Consultation & Concept Development", "Material Selection", "Creation & Documentation", "Delivery & Installation"].map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 border border-border flex items-center justify-center text-xs text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>

            <Link
              to="/commission"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300 group"
            >
              <span>Start Your Commission</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default CommissionsCTA;
