import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import sculpture3 from "@/assets/sculpture-3.jpg";

const DropsPreview = () => {
  // Simulated next drop date
  const nextDropDate = new Date();
  nextDropDate.setDate(nextDropDate.getDate() + 7);

  return (
    <section className="py-32 relative bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <RevealOnScroll direction="left">
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body block mb-4">
              Limited Editions
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Timed Drops
            </h2>
            <div className="line-ornament w-16 mb-8" />
            <p className="text-muted-foreground font-body leading-relaxed mb-8 max-w-md">
              Exclusive releases of limited edition sculptures. Each piece is numbered 
              and authenticated. Sign up for notifications to never miss a drop.
            </p>

            {/* Next Drop Countdown */}
            <div className="bg-card border border-border p-6 inline-block mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Next Drop
                </span>
              </div>
              <div className="flex gap-6">
                {["Days", "Hours", "Min"].map((label, i) => (
                  <div key={label} className="text-center">
                    <span className="font-display text-3xl text-foreground block">
                      {[7, 12, 45][i]}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/drops"
              className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-primary hover:text-primary/80 transition-colors duration-300 group"
            >
              <span>View All Drops</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </RevealOnScroll>

          {/* Image */}
          <RevealOnScroll direction="right" delay={0.2}>
            <div className="relative">
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <img
                  src={sculpture3}
                  alt="Featured drop piece"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-4 py-2 text-xs tracking-[0.2em] uppercase">
                  Coming Soon
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs tracking-[0.2em] uppercase text-primary block mb-2">
                    Edition of 10
                  </span>
                  <h3 className="font-display text-2xl text-foreground">
                    The Awakening
                  </h3>
                </div>
              </motion.div>

              {/* Decorative border */}
              <div className="absolute -inset-4 border border-border/30 -z-10" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default DropsPreview;
