import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles } from "lucide-react";

// JARVIS-style voice assistant using Web Speech API (no backend required).
// Provides visitors with a spoken tour of Mohit Sinha's profile.

const KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["name", "who", "you", "yourself", "about"],
    answer:
      "I am Jarvis, the AI assistant for Mohit Sinha. Mohit is a dedicated AI and Data Science professional pursuing a Bachelor of Computer Applications and a Bachelor of Science in Data Science.",
  },
  {
    keywords: ["skill", "expertise", "tech", "stack", "know"],
    answer:
      "Mohit specializes in Python, Machine Learning, Data Science, Artificial Intelligence, SQL, Tableau, predictive analytics, and data visualization. He builds scalable AI solutions and turns complex data into actionable insights.",
  },
  {
    keywords: ["project", "work", "portfolio", "build"],
    answer:
      "Mohit has worked on several projects including MohitCloud, predictive analytics models, machine learning pipelines, and data visualization dashboards. You can view all of them in the Projects section.",
  },
  {
    keywords: ["education", "study", "degree", "college", "university", "bca", "bs"],
    answer:
      "Mohit is currently pursuing a Bachelor of Computer Applications and a Bachelor of Science in Data Science, combining strong programming fundamentals with rigorous analytical training.",
  },
  {
    keywords: ["certif", "course", "learn"],
    answer:
      "Mohit holds certifications from British Airways in Data Science and from Deloitte in Data Analytics, both showcased in the Certifications section.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "connect"],
    answer:
      "You can reach Mohit directly by email at sinhamohit9870 at gmail dot com. He is open to collaboration, internships, and full-time opportunities.",
  },
  {
    keywords: ["experience", "role", "job", "career"],
    answer:
      "Mohit focuses on machine learning research, predictive analytics, and building production-ready AI systems. He is actively seeking data science and AI engineering roles.",
  },
  {
    keywords: ["resume", "cv", "download"],
    answer:
      "You can download Mohit's resume from the Download Resume button on the home page.",
  },
  {
    keywords: ["hello", "hi", "hey", "greet"],
    answer:
      "Hello, and welcome. I am Jarvis. Ask me anything about Mohit's skills, projects, education, certifications, or how to get in touch.",
  },
  {
    keywords: ["goal", "vision", "mission", "aim"],
    answer:
      "Mohit's goal is to leverage data and artificial intelligence to solve real world problems and to deliver scalable, ethical AI solutions.",
  },
];

const FALLBACK =
  "I can share Mohit's skills, projects, education, certifications, and contact details. Try asking, what are his skills, or how can I contact him.";

function findAnswer(query: string): string {
  const q = query.toLowerCase();
  let best: { score: number; answer: string } | null = null;
  for (const entry of KNOWLEDGE) {
    const score = entry.keywords.reduce((s, k) => (q.includes(k) ? s + 1 : s), 0);
    if (score > 0 && (!best || score > best.score)) best = { score, answer: entry.answer };
  }
  return best?.answer ?? FALLBACK;
}

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const getRecognition = (): SpeechRecognitionLike | null => {
  if (typeof window === "undefined") return null;
  const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  const r = new Ctor() as SpeechRecognitionLike;
  r.lang = "en-US";
  r.interimResults = false;
  r.continuous = false;
  return r;
};

interface Turn {
  role: "user" | "jarvis";
  text: string;
}

const JarvisAI = () => {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [supported, setSupported] = useState(true);
  const [turns, setTurns] = useState<Turn[]>([
    { role: "jarvis", text: "Systems online. I am Jarvis. How may I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = getRecognition();
    if (!r) setSupported(false);
    recognitionRef.current = r;
    return () => {
      try { r?.stop(); } catch {}
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  const speak = useCallback((text: string) => {
    if (muted || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 0.9;
    u.lang = "en-US";
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => /male|daniel|google uk english male/i.test(v.name)) || voices.find(v => v.lang.startsWith("en"));
    if (preferred) u.voice = preferred;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }, [muted]);

  const handleQuery = useCallback((text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const answer = findAnswer(clean);
    setTurns(prev => [...prev, { role: "user", text: clean }, { role: "jarvis", text: answer }]);
    speak(answer);
  }, [speak]);

  const startListening = useCallback(() => {
    const r = recognitionRef.current;
    if (!r) return;
    try { window.speechSynthesis?.cancel(); } catch {}
    r.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript as string;
      handleQuery(transcript);
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    try {
      r.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, [handleQuery]);

  const stopListening = () => {
    try { recognitionRef.current?.stop(); } catch {}
    setListening(false);
  };

  const toggleMute = () => {
    if (!muted) window.speechSynthesis?.cancel();
    setMuted(m => !m);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open Jarvis AI assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-violet-500 shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Sparkles className="text-white" size={22} />
        {speaking && <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(92vw,380px)] bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/20 to-violet-500/20 border-b border-primary/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">J.A.R.V.I.S</div>
                <div className="text-[10px] uppercase tracking-widest text-primary">
                  {listening ? "Listening…" : speaking ? "Speaking…" : "Standing by"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={toggleMute} className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground" aria-label="Toggle voice">
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground" aria-label="Close">
                <X size={16} />
              </button>
            </div>
          </div>

          <div ref={listRef} className="h-64 overflow-y-auto p-4 space-y-3 text-sm">
            {turns.map((t, i) => (
              <div key={i} className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl ${
                  t.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-primary/10 border border-primary/20 text-foreground rounded-bl-sm"
                }`}>
                  {t.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-primary/20 space-y-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") { handleQuery(input); setInput(""); }
                }}
                placeholder="Ask Jarvis anything…"
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:border-primary focus:outline-none"
              />
              <button
                onClick={listening ? stopListening : startListening}
                disabled={!supported}
                aria-label={listening ? "Stop listening" : "Start voice input"}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  listening
                    ? "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse"
                    : "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40"
                }`}
              >
                {listening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>
            {!supported && (
              <p className="text-[10px] text-muted-foreground">
                Voice input not supported in this browser. Type your question instead.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JarvisAI;
