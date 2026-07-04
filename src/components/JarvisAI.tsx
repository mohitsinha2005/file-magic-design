import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// JARVIS-style voice assistant powered by Lovable AI (Gemini) via edge function.
// Uses Web Speech API for mic input and speechSynthesis for spoken replies.

const WELCOME =
  "Hello, I'm Jarvis — Mohit's personal AI assistant. I'm here to help you. Ask me anything about Mohit's skills, projects, education, or how to get in touch.";


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
  const [thinking, setThinking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [supported, setSupported] = useState(true);
  const [turns, setTurns] = useState<Turn[]>([
    { role: "jarvis", text: WELCOME },
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

  const handleQuery = useCallback(async (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setTurns(prev => [...prev, { role: "user", text: clean }]);
    setInput("");
    setThinking(true);
    try {
      const history = turns
        .filter(t => t.text !== WELCOME)
        .map(t => ({ role: t.role === "user" ? "user" : "assistant", content: t.text }));
      const { data, error } = await supabase.functions.invoke("jarvis-chat", {
        body: { messages: [...history, { role: "user", content: clean }] },
      });
      if (error) throw error;
      const reply: string = data?.reply ?? data?.error ?? "I'm sorry, something went wrong.";
      setTurns(prev => [...prev, { role: "jarvis", text: reply }]);
      speak(reply);
    } catch (err) {
      const msg = "I'm having trouble reaching my systems right now. Please try again in a moment.";
      setTurns(prev => [...prev, { role: "jarvis", text: msg }]);
      speak(msg);
    } finally {
      setThinking(false);
    }
  }, [speak, turns]);

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
                  {listening ? "Listening…" : thinking ? "Thinking…" : speaking ? "Speaking…" : "Online • Ready to help"}
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
