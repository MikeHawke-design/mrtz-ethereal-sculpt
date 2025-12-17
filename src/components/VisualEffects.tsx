import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DarkVignette = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1]" 
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, hsl(var(--background)) 100%),
          linear-gradient(to bottom, hsl(var(--background) / 0.3) 0%, transparent 20%, transparent 80%, hsl(var(--background) / 0.5) 100%)
        `,
      }}
    />
  );
};

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="cursor-glow hidden md:block"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
    />
  );
};

const OrganicShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <motion.div
        className="organic-shape w-[600px] h-[600px] -top-[200px] -left-[200px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="organic-shape w-[400px] h-[400px] top-[40%] -right-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="organic-shape w-[500px] h-[500px] -bottom-[150px] left-[30%]"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export { DarkVignette, CursorGlow, OrganicShapes };
