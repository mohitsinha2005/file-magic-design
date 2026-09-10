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
        {/* slim progress line — restrained, professional */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteSweep;
