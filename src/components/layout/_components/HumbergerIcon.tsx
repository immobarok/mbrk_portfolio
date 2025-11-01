import { motion } from "framer-motion";
import { useState } from "react";

export const HamburgerIcon = () => {
  const [hovered, setHovered] = useState(false);

  const topBarVariants = {
    normal: { rotate: 0, y: 0 },
    hover: { rotate: 45, y: 6 },
  };

  const middleBarVariants = {
    normal: { opacity: 1, scaleX: 1 },
    hover: { opacity: 0, scaleX: 0 },
  };

  const bottomBarVariants = {
    normal: { rotate: 0, y: 0 },
    hover: { rotate: -45, y: -6 },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-[5px] h-6 w-6 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Open menu"
      tabIndex={0}
      role="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        className="block h-1 bg-accent rounded-full w-7"
        variants={topBarVariants}
        initial="normal"
        animate={hovered ? "hover" : "normal"}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      <motion.span
        className="block h-1 bg-accent rounded-full w-7"
        variants={middleBarVariants}
        initial="normal"
        animate={hovered ? "hover" : "normal"}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      />

      <motion.span
        className="block h-1 bg-accent rounded-full w-7"
        variants={bottomBarVariants}
        initial="normal"
        animate={hovered ? "hover" : "normal"}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </motion.div>
  );
};
