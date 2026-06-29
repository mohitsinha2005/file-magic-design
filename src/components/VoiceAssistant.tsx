import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff, Volume2, X, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

// Browser SpeechRecognition typing
const getSpeechRecognition = (): any => {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
};

const VoiceAssistant = () => {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const SR = getSpeechRecognition();
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (e: any) => {
      let finalText = "";
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else interim += t;
      }
      setTranscript(finalText || interim);
      if (finalText) {
        rec.stop();
        handleSend(finalText.trim());
      }
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);

    recognitionRef.current = rec;
    return () => {
      try { rec.abort(); } catch { /* noop */ }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSpeaking(false);
  };

  const handleSend = useCallback(async (text: string) => {
    if (!text) return;
    stopAudio();
    setMessages((m) => [...m, { role: "user", content: text }]);
    setTranscript("");
    setThinking(true);
    try {
      const { data, error } = await supabase.functions.invoke("voice-assistant", {
        body: {
          message: text,
          history: messages.slice(-8),
        },
      });
      if (error) throw error;
      const reply = (data as any)?.reply ?? "Sorry, no response.";
      const audioB64 = (data as any)?.audio;
      const mime = (data as any)?.mime ?? "audio/mpeg";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);

      if (audioB64) {
        const audio = new Audio(`data:${mime};base64,${audioB64}`);
        audioRef.current = audio;
        setSpeaking(true);
        audio.onended = () => setSpeaking(false);
        audio.onerror = () => setSpeaking(false);
        await audio.play().catch(() => setSpeaking(false));
      }
    } catch (err: any) {
      toast.error("Voice assistant error", { description: err?.message ?? "Try again." });
    } finally {
      setThinking(false);
    }
  }, [messages]);

  const toggleListen = async () => {
    if (!supported) {
      toast.error("Voice input not supported", {
        description: "Try Chrome, Edge, or Safari on desktop/Android.",
      });
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    stopAudio();
    setTranscript("");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current?.start();
      setListening(true);
    } catch {
      toast.error("Microphone permission denied");
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      // Auto greet on first open (text-only, no auto-speak to respect autoplay rules)
      setMessages([
        {
          role: "assistant",
          content:
            "Hello, I'm J.A.R.V.I.S., Mohit Sinha's professional AI assistant. Tap the microphone and ask me about his skills, projects, certifications, or how to get in touch.",
        },
      ]);
    }
  };

  const handleClose = () => {
    stopAudio();
    if (listening) recognitionRef.current?.stop();
    setOpen(false);
  };

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open voice assistant"
          className="fixed bottom-24 right-6 z-40 group"
        >
          <span className="absolute inset-0 rounded-full bg-primary/40 blur-xl animate-pulse" aria-hidden />
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/40 border border-primary/40 group-hover:scale-110 transition-transform">
            <Mic className="w-6 h-6" />
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(380px,calc(100vw-2rem))] rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl shadow-primary/20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-primary" />
                {speaking && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">J.A.R.V.I.S.</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {listening ? "Listening…" : thinking ? "Thinking…" : speaking ? "Speaking…" : "Voice Assistant"}
                </p>
              </div>
            </div>
            <button onClick={handleClose} aria-label="Close" className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Transcript */}
          <div className="max-h-72 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed ${
                  m.role === "user"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <span className="text-[10px] uppercase tracking-widest mr-2 text-primary/80">
                  {m.role === "user" ? "You" : "JARVIS"}
                </span>
                {m.content}
              </div>
            ))}
            {transcript && (
              <div className="text-sm italic text-foreground/70">…{transcript}</div>
            )}
            {thinking && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="w-3 h-3 animate-spin" /> Generating professional response…
              </div>
            )}
          </div>

          {/* Mic control */}
          <div className="px-4 py-4 border-t border-border bg-background/60 flex items-center justify-between gap-3">
            <button
              onClick={toggleListen}
              disabled={thinking}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                listening
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-primary text-primary-foreground hover:scale-105"
              } disabled:opacity-50`}
              aria-label={listening ? "Stop listening" : "Start listening"}
            >
              {listening && <span className="absolute inset-0 rounded-full bg-destructive/40 animate-ping" />}
              {listening ? <MicOff className="w-5 h-5 relative" /> : <Mic className="w-5 h-5 relative" />}
            </button>
            <div className="flex-1 text-xs text-muted-foreground">
              {listening
                ? "Speak now. I'll reply professionally about Mohit."
                : speaking
                ? "Playing audio response…"
                : "Tap the mic and ask anything about Mohit."}
            </div>
            {speaking && (
              <button
                onClick={stopAudio}
                aria-label="Stop audio"
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
