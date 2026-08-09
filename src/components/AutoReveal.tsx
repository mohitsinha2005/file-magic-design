import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SELECTOR = [
  "main section > *",
  "main .elevated-card",
  "main .cert-card",
  "main .project-card",
].join(", ");

/**
 * Adds a subtle scroll-reveal to page content that isn't already animated,
 * so every route shares the same motion language.
 */
const AutoReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver | null = null;

    const timer = window.setTimeout(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
        (el) => !el.dataset.reveal && !el.closest("[data-no-reveal]")
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.classList.add("reveal-in");
              observer?.unobserve(el);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );

      nodes.forEach((el, i) => {
        el.dataset.reveal = "true";
        el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
        el.classList.add("reveal");
        observer?.observe(el);
      });
    }, 120);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
};

export default AutoReveal;
