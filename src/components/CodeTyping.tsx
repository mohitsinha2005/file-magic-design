import { useEffect, useMemo, useRef, useState } from "react";

const LINES = [
  "features = data.drop(columns='target')",
  "model.fit(features, target)",
  "predictions = model.predict(features)",
];

const KEYWORDS = /\b(import|from|as|def|return|for|in|if|else|print|None|True|False)\b/;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Tiny token highlighter — semantic tokens only, no hardcoded colors.
const highlight = (line: string) => {
  if (line.trimStart().startsWith("#")) {
    return <span className="text-muted-foreground/70 italic">{line}</span>;
  }
  const parts = line.split(/('[^']*'|"[^"]*"|\b\d+(?:\.\d+)?\b|\W)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (/^['"]/.test(p)) return <span key={i} className="text-accent">{p}</span>;
    if (/^\d/.test(p)) return <span key={i} className="text-accent/90">{p}</span>;
    if (KEYWORDS.test(p)) return <span key={i} className="text-primary font-semibold">{p}</span>;
    if (/^[(){}[\].,:=+\-*/<>]+$/.test(p)) return <span key={i} className="text-primary/60">{p}</span>;
    return <span key={i} className="text-foreground/85">{p}</span>;
  });
};

const CodeTyping = () => {
  const full = useMemo(() => LINES.join("\n"), []);
  const [shown, setShown] = useState(prefersReduced() ? full : "");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    let i = 0;
    const tick = () => {
      i += 1;
      setShown(full.slice(0, i));
      if (i >= full.length) {
        return;
      }
      const ch = full[i - 1];
      timer.current = window.setTimeout(tick, ch === "\n" ? 120 : 22 + Math.random() * 26);
    };
    timer.current = window.setTimeout(tick, 400);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [full]);

  const rendered = shown.split("\n");

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <span className="truncate font-mono text-xs text-muted-foreground">model_training.py</span>
        <span className="shrink-0 text-[10px] text-primary">Python</span>
      </div>

      <pre className="p-3 font-mono text-xs leading-5 whitespace-pre-wrap">
        {rendered.map((line, idx) => (
          <div key={idx} className="flex gap-3">
            <span className="select-none w-5 shrink-0 text-right text-muted-foreground/40">
              {idx + 1}
            </span>
            <span className="min-w-0 flex-1 break-words">
              {highlight(line)}
              {idx === rendered.length - 1 && (
                <span className="inline-block w-[7px] h-[13px] align-middle bg-primary ml-0.5 animate-pulse" />
              )}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
};

export default CodeTyping;
