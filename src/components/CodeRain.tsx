import { useEffect, useRef } from "react";

// Lightweight canvas "code rain" — subtle data-science themed motion layer.
const GLYPHS = "01{}[]()<>=+-*/;:πΣμσ∑λ∆ABCDEFdfXynp";

const CodeRain = ({ opacity = 0.22 }: { opacity?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let active = true;
    let cols = 0;
    let drops: number[] = [];
    const fontSize = 14;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.max(1, Math.floor(canvas.width / fontSize));
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!active || document.visibilityState !== "visible") return;
      if (t - last < 55) return;
      last = t;
      ctx.fillStyle = "rgba(5, 9, 20, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      for (let i = 0; i < cols; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.96 ? "#a5d8ff" : "#3b82f6";
        ctx.fillText(char, i * fontSize, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry?.isIntersecting ?? false;
    }, { rootMargin: "100px" });
    observer.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
};

export default CodeRain;
