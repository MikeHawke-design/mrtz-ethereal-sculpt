import { motion } from "framer-motion";
import { useState } from "react";

interface SculptureCardProps {
  image: string;
  title: string;
  year?: string;
  category?: string;
  onClick?: () => void;
  index?: number;
}

const SculptureCard = ({
  image,
  title,
  year,
  category,
  onClick,
  index = 0,
}: SculptureCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.article
      className="group relative cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoaded(true)}
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-2">
            {category && (
              <span className="text-xs tracking-[0.2em] uppercase text-primary">
                {category}
              </span>
            )}
            <h3 className="font-display text-2xl text-foreground">{title}</h3>
            {year && (
              <span className="text-sm text-muted-foreground">{year}</span>
            )}
          </div>
        </motion.div>

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-colors duration-500"
        />
      </div>
    </motion.article>
  );
};

export default SculptureCard;
