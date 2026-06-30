import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Auto-play voice assistant that greets the visitor.
 * Browsers block autoplay-with-sound until the user interacts, so:
 *  1) We try to play immediately.
 *  2) If blocked, we show a small "Tap to hear intro" button.
 *  3) Once played in a session, we don't repeat (sessionStorage flag).
 */
const STORAGE_KEY = "mohit:voice-intro-played";

interface Props {
  /** Delay before attempting autoplay (ms) — wait for intro to finish */
  delayMs?: number;
}

const VoiceAssistant = ({ delayMs = 1200 }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "blocked" | "done" | "error">("idle");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    const run = async () => {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setStatus("done");
        return;
      }
      setStatus("loading");
      try {
        const { data, error } = await supabase.functions.invoke("voice-intro", {
          body: {},
        });
        if (error) throw error;
        // supabase.functions.invoke returns a Blob for non-JSON responses
        const blob = data instanceof Blob ? data : new Blob([data as ArrayBuffer], { type: "audio/mpeg" });
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        const audio = new Audio(objectUrl);
        audio.preload = "auto";
        audioRef.current = audio;
        audio.addEventListener("ended", () => {
          setStatus("done");
          sessionStorage.setItem(STORAGE_KEY, "1");
        });
        audio.addEventListener("error", () => setStatus("error"));
        try {
          await audio.play();
          setStatus("playing");
        } catch {
          // Autoplay blocked — wait for user gesture
          setStatus("blocked");
        }
      } catch (err) {
        console.warn("Voice intro failed:", err);
        setStatus("error");
      }
    };

    const t = setTimeout(run, delayMs);
    return () => {
      cancelled = true;
      clearTimeout(t);
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
      setStatus("playing");
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

  if (status === "idle" || status === "loading" || status === "done" || status === "error") return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in">
      {status === "blocked" ? (
        <button
          onClick={handlePlay}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform border border-primary/40 backdrop-blur"
          aria-label="Play voice introduction"
        >
          <Play size={16} />
          <span className="text-sm font-medium">Tap to hear intro</span>
        </button>
      ) : (
        <button
          onClick={handleMuteToggle}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/80 text-foreground shadow-lg border border-border backdrop-blur hover:bg-card transition-colors"
          aria-label={muted ? "Unmute voice" : "Mute voice"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-primary animate-pulse" />}
          <span className="text-xs font-medium">{muted ? "Muted" : "Speaking…"}</span>
        </button>
      )}
    </div>
  );
};

export default VoiceAssistant;
