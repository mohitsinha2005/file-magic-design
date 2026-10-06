import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SELECTOR = [
  "section > *",
  ".elevated-card",
  ".cert-card",
  ".project-card",
].join(", ");

const EXCLUDE = "nav, header, footer, [data-no-reveal], .fixed, canvas";

/**
 * Adds a subtle 3D scroll-reveal to page content that isn't already animated,
 * so every route shares the same motion language.
 */
const AutoReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("reveal-in");
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    let index = 0;
    const scan = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
        (el) =>
          !el.dataset.reveal &&
          !el.dataset.parallaxBound &&
          !el.closest(EXCLUDE)
      );
      nodes.forEach((el) => {
        el.dataset.reveal = "true";
        el.style.transitionDelay = `${Math.min(index++, 6) * 60}ms`;
        el.classList.add("reveal");
        observer.observe(el);
      });
    };

    const firstScan = window.requestAnimationFrame(scan);
    const settledScan = window.setTimeout(scan, 300);
    let pendingScan = 0;
    const addedContent = new MutationObserver((mutations) => {
      if (!mutations.some(({ addedNodes }) =>
        Array.from(addedNodes).some((node) => node instanceof HTMLElement &&
          (node.matches("section, main") || node.querySelector("section, main"))))) return;
      if (!pendingScan) pendingScan = requestAnimationFrame(() => {
        pendingScan = 0;
        scan();
      });
    });
    addedContent.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(firstScan);
      window.clearTimeout(settledScan);
      addedContent.disconnect();
      if (pendingScan) cancelAnimationFrame(pendingScan);
      observer.disconnect();
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => delete el.dataset.reveal);
    };
  }, [pathname]);

  return null;
};

export default AutoReveal;
