import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const topOpacity = useTransform(scrollYProgress, [0.1, 0.5], [1, 0]);
  const topY = useTransform(scrollYProgress, [0.1, 0.5], [0, 80]);
  const bottomOpacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0]);
  const bottomY = useTransform(scrollYProgress, [0.2, 0.7], [0, 60]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const staggerVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full min-h-[200vh]"
      initial="hidden"
      animate="visible"
    >
      {/* ensure the hero background is dark so fading the video doesn't reveal white */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black/90">
        <motion.video
          src={"/video/bannner.mp4"}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
          style={{
            opacity: videoOpacity,
          }}
        />

        {/* Top Right Text */}
        <motion.div
          className="absolute top-36 right-8 z-20 text-right"
          variants={containerVariants}
          style={{
            opacity: topOpacity,
            y: topY,
          }}
        >
          <motion.div
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            variants={containerVariants}
          >
            {["Beyond", "Visuals.", "Built with", "Vision."].map(
              (line, index) => (
                <motion.span
                  key={line}
                  className={`block ${
                    index === 0 || index === 1 ? "text-muted-foreground" : ""
                  }`}
                  variants={staggerVariants}
                  custom={index}
                >
                  {line}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute left-8 bottom-8 z-20 max-w-2xl"
          variants={containerVariants}
          style={{
            opacity: bottomOpacity,
            y: bottomY,
          }}
        >
          <motion.p
            className="font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl leading-11"
            variants={staggerVariants}
          >
            <motion.span className="ml-12" variants={staggerVariants}>
              We build brands, websites, and digital experiences
            </motion.span>
            <motion.span
              className="ml-2 text-muted-foreground"
              variants={staggerVariants}
            >
              with intention, clarity and care.
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            opacity: scrollIndicatorOpacity,
          }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-white text-sm font-light tracking-widest">
              SCROLL
            </span>
            <motion.div
              className="w-px h-8 bg-white/80"
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
