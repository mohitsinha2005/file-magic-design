import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

/** Build a short terminal command line for the current route. */
const routeCommand = (pathname: string) => {
  const name = pathname === "/" ? "home" : pathname.replace(/^\//, "").split("/")[0] || "home";
  return `$ mohit@jarvis:~$ open ./${name}.tsx`;
};

const TYPE_MS = 14; // per character
const HOLD_MS = 160; // pause after typing before reveal

/**
 * "Code enter" page effect: a small terminal card types a command for the
 * page being opened, then the page is revealed. Fast, clean, professional.
 */
const PageTransition = ({ children }: Props) => {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const command = useMemo(() => routeCommand(pathname), [pathname]);

  const [typed, setTyped] = useState(reduceMotion ? command.length : 0);
  const [done, setDone] = useState(!!reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setTyped(command.length);
      setDone(true);
      return;
    }
    setTyped(0);
    setDone(false);
    let i = 0;
    const typer = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= command.length) {
        window.clearInterval(typer);
        window.setTimeout(() => setDone(true), HOLD_MS);
      }
    }, TYPE_MS);
    return () => window.clearInterval(typer);
  }, [command, reduceMotion]);

  return (
    <div className="relative">
      {/* Page content fades in once the command finishes typing */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 12 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* Terminal card overlay */}
      <AnimatePresence>
        {!done && !reduceMotion && (
          <motion.div
            key={`term-${pathname}`}
            className="fixed inset-0 z-[90] grid place-items-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
          >
            <div className="w-[min(92vw,560px)] rounded-xl border border-border/60 bg-card/90 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[11px] font-medium tracking-wide text-muted-foreground">
                  jarvis — terminal
                </span>
              </div>
              <div className="px-4 py-3 font-mono text-sm text-primary">
                <span>{command.slice(0, typed)}</span>
                <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
