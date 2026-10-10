"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 520);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const lenis = (window as Window & { __portfolioLenis?: { scrollTo: (target: number) => void } }).__portfolioLenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="fixed bottom-5 right-[5.25rem] z-50 grid size-11 place-items-center rounded-full border border-white/15 bg-[#10131b]/90 text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-cyan-200/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:right-[5.75rem]"
        >
          <ChevronUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
