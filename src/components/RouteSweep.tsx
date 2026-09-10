import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic sweep that plays on every route change — a glowing scan bar
 * crossing the screen plus a quick tinted wipe.
 */
const RouteSweep = () => {
  const { pathname } = useLocation();
  const [key, setKey] = useState(0);
  const [enabled] = useState(
    () => !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!enabled) return;
    setKey((k) => k + 1);
  }, [pathname, enabled]);

  if (!enabled || key === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={key}
        aria-hidden
        className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* tinted wipe */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/25 via-background/70 to-accent/25 backdrop-blur-[2px]"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
        />
        {/* scan bar */}
        <motion.div
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-primary to-transparent blur-md"
          initial={{ x: "-20vw", opacity: 0.9 }}
          animate={{ x: "105vw", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteSweep;
