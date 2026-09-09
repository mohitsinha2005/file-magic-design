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
  "# >> accuracy: 96.４%",
];

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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
        }, 3500);
        return;
      }
      const ch = full[i - 1];
      timer.current = window.setTimeout(tick, ch === "\n" ? 110 : 26);
    };
    timer.current = window.setTimeout(tick, 400);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [full]);

  return (
    <div className="rounded-xl border border-primary/25 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg shadow-primary/5">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/15 bg-primary/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[11px] tracking-widest uppercase text-muted-foreground">
          model_training.py
        </span>
      </div>
      <pre className="p-4 text-[12px] md:text-[13px] leading-relaxed font-mono text-primary/90 min-h-[210px] whitespace-pre-wrap">
        {shown}
        <span className="inline-block w-[7px] h-[14px] align-middle bg-primary animate-pulse ml-0.5" />
      </pre>
    </div>
  );
};

export default CodeTyping;
