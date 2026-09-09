import { useEffect, useMemo, useRef, useState } from "react";

const LINES = [
  "import pandas as pd",
  "from sklearn.ensemble import RandomForestClassifier",
  "",
  "df = pd.read_csv('insights.csv')",
  "X, y = df.drop('target', axis=1), df['target']",
  "",
  "model = RandomForestClassifier(n_estimators=300)",
  "model.fit(X, y)",
  "print(f'accuracy: {model.score(X, y):.2%}')",
  "# >> accuracy: 96.4%",
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
        timer.current = window.setTimeout(() => {
          i = 0;
          setShown("");
          timer.current = window.setTimeout(tick, 600);
        }, 3800);
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
    <div className="group relative rounded-2xl border border-primary/25 bg-card/60 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_-25px_hsl(var(--primary)/0.6)]">
      {/* premium sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-70" />

      <div className="relative flex items-center gap-2 px-4 py-2.5 border-b border-primary/15 bg-primary/5">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
        <span className="ml-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          model_training.py
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          running
        </span>
      </div>

      <pre className="relative p-4 text-[12px] md:text-[13px] leading-relaxed font-mono min-h-[230px] whitespace-pre-wrap">
        {rendered.map((line, idx) => (
          <div key={idx} className="flex gap-3">
            <span className="select-none w-5 shrink-0 text-right text-muted-foreground/40">
              {idx + 1}
            </span>
            <span className="flex-1">
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
