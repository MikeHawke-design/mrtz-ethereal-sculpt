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
  const letters = ["M", "R", "T", "Z"];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  if (!animated) {
    return (
      <span className={`font-display font-light tracking-[0.3em] text-gold-gradient ${sizeMap[size]} ${className}`}>
        MRTZ
      </span>
    );
  }

  return (
    <motion.div
      className={`font-display font-light tracking-[0.3em] ${sizeMap[size]} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block text-gold-gradient"
          variants={letterVariants}
          whileHover={{
            scale: 1.1,
            textShadow: "0 0 40px hsl(38 35% 55% / 0.5)",
            transition: { duration: 0.2 },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default MRTZLogo;
