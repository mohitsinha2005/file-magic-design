import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw, Mic } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "mohit:voice-intro-played";

interface Props {
  delayMs?: number;
}

type Status = "loading" | "ready" | "playing" | "paused" | "ended" | "blocked" | "error";

const VoiceAssistant = ({ delayMs = 1200 }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [progress, setProgress] = useState(0);

  // Load audio + try autoplay
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    const init = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("voice-intro", { body: {} });
        if (error) throw error;
        const blob =
          data instanceof Blob
            ? data
            : new Blob([data as ArrayBuffer], { type: "audio/mpeg" });
        if (cancelled) return;

        objectUrl = URL.createObjectURL(blob);
        const audio = new Audio(objectUrl);
        audio.preload = "auto";
        audioRef.current = audio;

        audio.addEventListener("timeupdate", () => {
          if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
        });
        audio.addEventListener("ended", () => {
          setStatus("ended");
          setProgress(100);
          sessionStorage.setItem(STORAGE_KEY, "1");
        });
        audio.addEventListener("pause", () => {
          if (!audio.ended) setStatus((s) => (s === "playing" ? "paused" : s));
        });
        audio.addEventListener("play", () => setStatus("playing"));
        audio.addEventListener("error", () => setStatus("error"));

        const alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "1";
        if (alreadyPlayed) {
          setStatus("ended");
          return;
        }

        const t = setTimeout(async () => {
          try {
            await audio.play();
          } catch {
            setStatus("blocked");
          }
        }, delayMs);
        return () => clearTimeout(t);
      } catch (err) {
        console.warn("Voice intro failed:", err);
        setStatus("error");
      }
    };

    init();
    return () => {
      cancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [delayMs]);

  const handlePlay = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch {
      setStatus("error");
    }
  };

  const handlePause = () => audioRef.current?.pause();

  const handleReplay = async () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setProgress(0);
    try {
      await audioRef.current.play();
    } catch {
      setStatus("error");
    }
  };

  const handleMuteToggle = () => {
    if (!audioRef.current) return;
    const next = !muted;
    audioRef.current.muted = next;
    setMuted(next);
  };

  if (status === "error") return null;

  const isPlaying = status === "playing";

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in">
      {expanded ? (
        <div className="w-[300px] rounded-2xl border border-primary/30 bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-border">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Mic size={16} className="text-primary" />
              </div>
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse ring-2 ring-card" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">Voice Assistant</p>
              <p className="text-[11px] text-muted-foreground">
                {status === "loading" && "Preparing intro…"}
                {status === "ready" && "Ready"}
                {status === "playing" && "Speaking — about Mohit"}
                {status === "paused" && "Paused"}
                {status === "ended" && "Intro complete"}
                {status === "blocked" && "Tap play to listen"}
              </p>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors text-xs px-2 py-1 rounded-md hover:bg-muted"
              aria-label="Minimize voice assistant"
            >
              ✕
            </button>
          </div>

          {/* Waveform */}
          <div className="px-4 pt-3 pb-2 flex items-end gap-1 h-12">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={`flex-1 rounded-full bg-primary/70 transition-all ${isPlaying ? "animate-pulse" : "opacity-40"}`}
                style={{
                  height: `${
                    isPlaying
                      ? 20 + Math.abs(Math.sin((i + 1) * 1.3)) * 80
                      : 25 + Math.abs(Math.sin(i)) * 25
                  }%`,
                  animationDelay: `${i * 60}ms`,
                  animationDuration: "900ms",
                }}
              />
            ))}
          </div>

          {/* Progress */}
          <div className="px-4">
            <div className="h-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-1.5">
              {isPlaying ? (
                <button
                  onClick={handlePause}
                  className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Pause"
                >
                  <Pause size={15} />
                </button>
              ) : (
                <button
                  onClick={handlePlay}
                  disabled={status === "loading"}
                  className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                  aria-label="Play"
                >
                  <Play size={15} className="ml-0.5" />
                </button>
              )}
              <button
                onClick={handleReplay}
                disabled={status === "loading"}
                className="w-9 h-9 rounded-full bg-muted text-foreground flex items-center justify-center hover:bg-muted/70 transition-colors disabled:opacity-50"
                aria-label="Replay from start"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={handleMuteToggle}
                className="w-9 h-9 rounded-full bg-muted text-foreground flex items-center justify-center hover:bg-muted/70 transition-colors"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              AI Voice
            </span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-xl border border-primary/40 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Open voice assistant"
        >
          <Mic size={18} />
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping" />
          )}
        </button>
      )}
    </div>
  );
};

export default VoiceAssistant;
