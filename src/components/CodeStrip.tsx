import CodeRain from "./CodeRain";

// Global coding-effect strip pinned to the bottom of every page.
const CodeStrip = () => (
  <div
    aria-hidden
    className="fixed bottom-0 left-0 w-full h-36 md:h-44 z-0 pointer-events-none overflow-hidden"
    style={{
      maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
    }}
  >
    <CodeRain opacity={0.28} />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
  </div>
);

export default CodeStrip;
