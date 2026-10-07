import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/chat", label: "Chat" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setIsScrolled(window.scrollY > 30);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const media = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,box-shadow] duration-300 ${
        isScrolled || open ? "glass border-b border-border shadow-lg" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-heading text-lg sm:text-xl font-bold text-foreground">
            Mohit <span className="gradient-text">Sinha</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3 py-2 nav-link ${active ? "text-primary" : ""}`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="phone-navigation"
            className="lg:hidden text-foreground h-11 w-11 -mr-2 active:scale-95 transition-transform"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "calc(100dvh - 4rem)", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            id="phone-navigation"
            className="lg:hidden overflow-y-auto overscroll-contain bg-background/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-2xl font-heading font-semibold border-b border-border/40 ${
                      location.pathname === link.href ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
