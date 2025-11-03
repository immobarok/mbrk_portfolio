"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/pages/About/About";
import Home from "@/pages/Home/Home";
import Loader from "@/components/loader/Loader";

const MainLayout = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let wasReload = false;
    try {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (nav) wasReload = nav.type === "reload";
      if (!wasReload && (performance as any).navigation) {
        wasReload = (performance as any).navigation.type === 1;
      }
    } catch {}

    try {
      const flag = sessionStorage.getItem("showLoaderOnNextLoad");
      if (flag === "1") {
        wasReload = true;
        sessionStorage.removeItem("showLoaderOnNextLoad");
      }
    } catch {}

    if (wasReload) {
      setShowLoader(true);
      const t = setTimeout(() => setShowLoader(false), 1600); // slightly longer for cinematic timing
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const onBeforeUnload = () => {
      try {
        sessionStorage.setItem("showLoaderOnNextLoad", "1");
      } catch {}
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Loader />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.9,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="flex flex-col min-h-screen w-screen bg-primary"
        >
          <Navbar />
          <main className="min-h-screen flex-1 bg-background">
            <Home />
            <About />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainLayout;
