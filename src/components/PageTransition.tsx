import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/** Cinematic page-level enter/exit transition used for every route. */
const PageTransition = ({ children }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -18, scale: 0.99, filter: "blur(8px)" }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: "50% 30%" }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
