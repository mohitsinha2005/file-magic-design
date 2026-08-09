import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TILT_SELECTOR = ".elevated-card, .cert-card, .project-card, [data-tilt]";
const PARALLAX_SELECTOR = ".section-title, .hero-image-frame, [data-parallax]";

const MAX_TILT = 7; // degrees
const MAX_LIFT = 10; // px

/**
 * Global depth layer: pointer-driven 3D tilt on cards plus scroll parallax on
 * headings and feature imagery. Disabled for touch devices and reduced motion.
 */
const Depth3D = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];
    const layers: HTMLElement[] = [];
    let raf = 0;

    const bindTilt = () => {
      if (!fine) return;
      document.querySelectorAll<HTMLElement>(TILT_SELECTOR).forEach((el) => {
        if (el.dataset.depth3d) return;
        el.dataset.depth3d = "tilt";
        el.classList.add("tilt-3d");

        let frame = 0;

        const onMove = (e: PointerEvent) => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(1100px) rotateX(${(-py * MAX_TILT).toFixed(
              2
            )}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-${MAX_LIFT}px) translateZ(0)`;
            el.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
            el.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
          });
        };

        const onEnter = () => el.classList.add("tilt-active");
        const onLeave = () => {
          if (frame) cancelAnimationFrame(frame);
          frame = 0;
          el.classList.remove("tilt-active");
          el.style.transform = "";
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
          el.style.transform = "";
          delete el.dataset.depth3d;
          el.classList.remove("tilt-3d", "tilt-active");
        });
      });
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      layers.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        const depth = Number(el.dataset.parallax || 1);
        const y = -progress * 18 * depth;
        const rot = progress * 2.5 * depth;
        el.style.transform = `perspective(1200px) translate3d(0, ${y.toFixed(
          2
        )}px, 0) rotateX(${rot.toFixed(2)}deg)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const bindParallax = () => {
      document.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR).forEach((el) => {
        if (el.dataset.parallaxBound || el.dataset.reveal) return;
        if (el.closest("nav, header, footer, [data-no-parallax]")) return;
        el.dataset.parallaxBound = "true";
        el.classList.add("parallax-layer");
        layers.push(el);
      });
      onScroll();
    };

    const scan = () => {
      bindTilt();
      bindParallax();
    };

    // Lazy routes mount late — rescan while the page settles.
    let debounce = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(scan, 80);
    });

    scan();
    mo.observe(document.body, { childList: true, subtree: true });
    const stop = window.setTimeout(() => mo.disconnect(), 6000);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.clearTimeout(debounce);
      window.clearTimeout(stop);
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      layers.forEach((el) => {
        el.style.transform = "";
        delete el.dataset.parallaxBound;
        el.classList.remove("parallax-layer");
      });
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
};

export default Depth3D;
