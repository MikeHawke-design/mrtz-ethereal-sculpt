import { motion } from "framer-motion";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const SplitTextReveal = ({ text, className = "", delay = 0 }: SplitTextRevealProps) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      y: 100,
      opacity: 0,
      rotateX: -80,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: 1000 }}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em]">
          <motion.span
            variants={wordVariants}
            className="inline-block"
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default SplitTextReveal;
