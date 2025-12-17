import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import MRTZLogo from "./MRTZLogo";
import RevealOnScroll from "./RevealOnScroll";
import sculpture1 from "@/assets/sculpture-1.jpg";
import sculpture2 from "@/assets/sculpture-2.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <motion.img
          src={sculpture1}
          alt=""
          className="absolute w-[40%] h-[70%] object-cover right-[5%] top-[15%] opacity-20"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        />
        <motion.img
          src={sculpture2}
          alt=""
          className="absolute w-[35%] h-[60%] object-cover left-[8%] bottom-[10%] opacity-15"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-8"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-body">
            Sculptural Arts
          </span>
        </motion.div>

        <MRTZLogo size="lg" animated />

        <motion.div
          className="mt-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="line-ornament w-24 mx-auto mb-8" />
          <p className="font-display text-xl md:text-2xl text-muted-foreground italic">
            Where darkness meets elegance
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            className="group flex items-center gap-3 mx-auto text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            whileHover={{ y: 5 }}
            onClick={() => {
              document.getElementById("gallery-preview")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Enter the Gallery</span>
            <ArrowDown className="w-4 h-4 group-hover:animate-bounce" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
    </section>
  );
};

export default HeroSection;
