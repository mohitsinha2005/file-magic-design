import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic page-change effect — a soft diagonal wipe glides across the
 * screen with a glowing edge, finished by a slim progress line at the top.
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
        {/* diagonal wipe panel */}
        <motion.div
          className="absolute inset-y-0 -left-[20%] w-[140%] bg-gradient-to-r from-transparent via-primary/12 to-transparent"
          style={{ skewX: "-12deg" }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* glowing edge that leads the wipe */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_24px_4px_hsl(var(--primary)/0.6)]"
          style={{ skewX: "-12deg" }}
          initial={{ x: "-10vw", opacity: 1 }}
          animate={{ x: "110vw", opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* slim progress line — restrained, professional */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteSweep;
