import { motion } from "framer-motion";

interface MRTZLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeMap = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl md:text-8xl",
};

const MRTZLogo = ({ className = "", size = "md", animated = true }: MRTZLogoProps) => {
  const elements = ["+", " ", "M", "R", "T", "Z", " ", "+"];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: -90,
      filter: "blur(10px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const crossVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  if (!animated) {
    return (
      <span className={`font-display font-light tracking-[0.2em] text-gold-gradient ${sizeMap[size]} ${className}`}>
        + MRTZ +
      </span>
    );
  }

  return (
    <motion.div
      className={`font-display font-light tracking-[0.2em] ${sizeMap[size]} ${className} flex items-center justify-center gap-2 md:gap-4`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {elements.map((char, index) => {
        if (char === " ") {
          return <span key={index} className="w-2 md:w-4" />;
        }
        
        const isCross = char === "+";
        
        return (
          <motion.span
            key={index}
            className={`inline-block text-gold-gradient ${isCross ? 'opacity-60' : ''}`}
            variants={isCross ? crossVariants : letterVariants}
            whileHover={{
              scale: 1.15,
              textShadow: "0 0 60px hsl(38 35% 55% / 0.8)",
              transition: { duration: 0.3 },
            }}
            style={{
              textShadow: isCross ? "0 0 30px hsl(38 35% 55% / 0.3)" : undefined,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default MRTZLogo;
