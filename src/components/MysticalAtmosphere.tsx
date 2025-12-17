import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import sculpture1 from "@/assets/sculpture-1.jpg";
import sculpture2 from "@/assets/sculpture-2.jpg";
import sculpture3 from "@/assets/sculpture-3.jpg";
import sculpture4 from "@/assets/sculpture-4.jpg";

const images = [sculpture1, sculpture2, sculpture3, sculpture4];

interface FloatingImageProps {
  src: string;
  delay: number;
  duration: number;
  side: "left" | "right";
  yPosition: number;
  scale: number;
}

const FloatingImage = ({ src, delay, duration, side, yPosition, scale }: FloatingImageProps) => {
  const startX = side === "left" ? "-40%" : "140%";
  const endX = side === "left" ? "140%" : "-40%";
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${yPosition}%`,
        width: `${20 + scale * 15}%`,
        maxWidth: "400px",
      }}
      initial={{ 
        x: startX, 
        opacity: 0,
        filter: "blur(8px)",
        scale: 0.8,
      }}
      animate={{ 
        x: [startX, endX],
        opacity: [0, 0.12, 0.15, 0.12, 0],
        filter: ["blur(8px)", "blur(2px)", "blur(0px)", "blur(2px)", "blur(8px)"],
        scale: [0.8, 1, 1.05, 1, 0.8],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.15, 0.5, 0.85, 1],
      }}
    >
      <div className="relative">
        {/* Smoke trail effect */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at center, hsl(var(--gold) / 0.1) 0%, transparent 70%)`,
            filter: "blur(40px)",
            transform: "scale(2)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1.8, 2.2, 1.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <img
          src={src}
          alt=""
          className="w-full h-auto object-cover rounded-sm opacity-80"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          }}
        />
      </div>
    </motion.div>
  );
};

const SmokeParticle = ({ delay }: { delay: number }) => {
  const side = Math.random() > 0.5 ? "left" : "right";
  const startX = side === "left" ? -100 : window.innerWidth + 100;
  
  return (
    <motion.div
      className="absolute w-32 h-32 md:w-64 md:h-64 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, hsl(var(--gold) / 0.03) 0%, transparent 70%)`,
        filter: "blur(40px)",
        top: `${20 + Math.random() * 60}%`,
      }}
      initial={{ 
        x: startX,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x: side === "left" ? [startX, window.innerWidth + 100] : [startX, -100],
        opacity: [0, 0.6, 0.8, 0.6, 0],
        scale: [0.5, 1, 1.5, 1, 0.5],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const AmbientGlow = () => {
  return (
    <>
      {/* Central mystical glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, hsl(var(--gold) / 0.04) 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Corner vignettes */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--gold)/0.02)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,_hsl(var(--gold)/0.02)_0%,_transparent_50%)]" />
      
      {/* Top atmospheric fade */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-b from-background via-background/50 to-transparent" />
    </>
  );
};

const MysticalAtmosphere = () => {
  const floatingImages = [
    { src: images[0], delay: 0, duration: 35, side: "left" as const, yPosition: 15, scale: 1 },
    { src: images[1], delay: 8, duration: 40, side: "right" as const, yPosition: 55, scale: 0.8 },
    { src: images[2], delay: 16, duration: 38, side: "left" as const, yPosition: 35, scale: 0.9 },
    { src: images[3], delay: 24, duration: 42, side: "right" as const, yPosition: 70, scale: 0.7 },
    { src: images[0], delay: 32, duration: 36, side: "right" as const, yPosition: 20, scale: 0.85 },
    { src: images[2], delay: 40, duration: 44, side: "left" as const, yPosition: 60, scale: 0.75 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <AmbientGlow />
      
      {/* Smoke particles */}
      {[...Array(6)].map((_, i) => (
        <SmokeParticle key={`smoke-${i}`} delay={i * 5} />
      ))}
      
      {/* Floating sculpture images */}
      {floatingImages.map((props, index) => (
        <FloatingImage key={index} {...props} />
      ))}
      
      {/* Subtle horizontal lines */}
      <motion.div
        className="absolute top-1/4 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.1), transparent)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.08), transparent)",
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scaleX: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default MysticalAtmosphere;
