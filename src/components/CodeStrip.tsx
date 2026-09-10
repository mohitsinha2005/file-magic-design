import CodeRain from "./CodeRain";

// Global coding-effect layer shown at the bottom of every page.
const CodeStrip = () => (
  <div
    aria-hidden
    className="fixed bottom-0 left-0 w-full h-44 md:h-56 z-0 pointer-events-none overflow-hidden"
    style={{
      maskImage: "linear-gradient(to top, black 25%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to top, black 25%, transparent 100%)",
    }}
  >
    <CodeRain opacity={0.26} />
    {/* subtle scanline texture for a terminal feel */}
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(165,216,255,0.35) 0px, rgba(165,216,255,0.35) 1px, transparent 1px, transparent 4px)",
      }}
    />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
  </div>
);

export default CodeStrip;
