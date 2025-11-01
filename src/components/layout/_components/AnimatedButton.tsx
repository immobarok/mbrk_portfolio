import { motion } from "framer-motion";
import { useState } from "react";

export const AnimatedButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const texts = ["Reach out", "Let's talk"];

  return (
    <motion.a
      href="/contact"
      className="inline-block border border-border px-18 bg-transparent py-3 rounded-full relative overflow-hidden group transition-colors hover:border-border hover:bg-accent/10"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label="Reach out"
    >
      <div className="relative h-6 flex items-center justify-center">
        <motion.span
          className="text-accent font-bold text-lg absolute inset-0 flex items-center justify-center whitespace-nowrap"
          animate={{
            y: isHovered ? -25 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {texts[0]}
        </motion.span>
        <motion.span
          className="text-accent font-bold text-lg  absolute inset-0 flex items-center justify-center whitespace-nowrap"
          animate={{
            y: isHovered ? 0 : 25,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {texts[1]}
        </motion.span>
      </div>
    </motion.a>
  );
};
