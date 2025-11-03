import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.section
      className="fixed inset-0 w-screen h-screen bg-destructive flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <motion.h1
        className="text-4xl sm:text-6xl md:text-9xl lg:text-[180px] xl:text-[250px] font-bold tracking-tight"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        Mobarok
      </motion.h1>
    </motion.section>
  );
};

export default Loader;
