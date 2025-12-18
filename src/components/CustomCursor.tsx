import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "hover" | "link" | "button" | "image" | "text";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [hoverText, setHoverText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  useEffect(() => {
    // Check if device has hover capability (not touch)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    setIsVisible(true);
    
    window.addEventListener("mousemove", moveCursor);
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Detect interactive elements
    const handleElementDetection = () => {
      const interactiveSelectors = [
        'a', 'button', '[role="button"]', 'input', 'textarea', 'select',
        '[data-cursor="link"]', '[data-cursor="button"]', '[data-cursor="image"]'
      ];

      interactiveSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.addEventListener("mouseenter", () => {
            if (el.hasAttribute("data-cursor")) {
              setVariant(el.getAttribute("data-cursor") as CursorVariant);
              const text = el.getAttribute("data-cursor-text");
              if (text) setHoverText(text);
            } else if (el.tagName === "A") {
              setVariant("link");
            } else if (el.tagName === "BUTTON" || el.getAttribute("role") === "button") {
              setVariant("button");
            } else if (el.tagName === "IMG") {
              setVariant("image");
            } else {
              setVariant("hover");
            }
          });
          el.addEventListener("mouseleave", () => {
            setVariant("default");
            setHoverText("");
          });
        });
      });

      // Handle images
      document.querySelectorAll("img, [data-cursor='image']").forEach(el => {
        el.addEventListener("mouseenter", () => {
          setVariant("image");
          setHoverText("View");
        });
        el.addEventListener("mouseleave", () => {
          setVariant("default");
          setHoverText("");
        });
      });
    };

    // Initial detection and re-run on DOM changes
    handleElementDetection();
    const observer = new MutationObserver(handleElementDetection);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [moveCursor]);

  const getVariantStyles = () => {
    switch (variant) {
      case "hover":
        return {
          width: 60,
          height: 60,
          backgroundColor: "hsla(var(--primary), 0.1)",
          borderColor: "hsl(var(--primary))",
          mixBlendMode: "difference" as const,
        };
      case "link":
        return {
          width: 80,
          height: 80,
          backgroundColor: "hsla(var(--primary), 0.15)",
          borderColor: "hsl(var(--primary))",
          scale: 1.2,
        };
      case "button":
        return {
          width: 70,
          height: 70,
          backgroundColor: "hsla(var(--primary), 0.2)",
          borderColor: "hsl(var(--primary))",
          borderWidth: 2,
        };
      case "image":
        return {
          width: 100,
          height: 100,
          backgroundColor: "hsla(var(--background), 0.8)",
          borderColor: "hsl(var(--primary))",
        };
      default:
        return {
          width: 20,
          height: 20,
          backgroundColor: "transparent",
          borderColor: "hsl(var(--primary))",
        };
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          ...getVariantStyles(),
          transition: { type: "spring", damping: 20, stiffness: 300 },
        }}
      >
        {/* Inner dot */}
        <motion.div
          className="rounded-full bg-primary"
          animate={{
            width: variant === "default" ? 4 : 0,
            height: variant === "default" ? 4 : 0,
            opacity: variant === "default" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Hover text */}
        {hoverText && variant === "image" && (
          <motion.span
            className="text-xs uppercase tracking-[0.2em] text-foreground font-body"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Trailing glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: 40,
          height: 40,
          background: "radial-gradient(circle, hsla(var(--primary), 0.15) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{
          scale: variant !== "default" ? 1.5 : 1,
          opacity: variant !== "default" ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
