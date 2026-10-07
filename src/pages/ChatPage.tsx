import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Send, Mail, Linkedin, MessageSquare } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type Turn = { role: "user" | "jarvis"; text: string };

const WELCOME =
  "Hello, I'm Jarvis — Mohit's assistant. I'm here to help. Ask me about his skills, projects, internship, certifications, or how to get in touch.";

const SUGGESTIONS = [
  "Tell me about Mohit's experience",
  "What projects has he built?",
  "Is he available for hiring?",
  "How can I contact him?",
];

const ChatPage = () => {
  const [turns, setTurns] = useState<Turn[]>([{ role: "jarvis", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (!conversation) return;
    conversation.scrollTo({ top: conversation.scrollHeight, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [turns, loading]);

  const send = async (raw: string) => {
    const clean = raw.trim();
    if (!clean || loading) return;
    const next: Turn[] = [...turns, { role: "user", text: clean }];
    setTurns(next);
    setInput("");
    setLoading(true);
    try {
      const history = next
        .filter((t) => t.text !== WELCOME)
        .map((t) => ({ role: t.role === "user" ? "user" : "assistant", content: t.text }));
      const { data, error } = await supabase.functions.invoke("jarvis-chat", {
        body: { messages: history },
      });
      if (error) throw error;
      setTurns((prev) => [
        ...prev,
        { role: "jarvis", text: data?.reply ?? data?.error ?? "Something went wrong." },
      ]);
    } catch {
      setTurns((prev) => [
        ...prev,
        {
          role: "jarvis",
          text: "I couldn't reach the assistant right now. You can email Mohit directly at sinhamohit9870@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Chat with Mohit Sinha | AI & Data Science Professional</title>
        <meta
          name="description"
          content="Chat directly about projects, collaboration, internships and hiring with Mohit Sinha's AI assistant, or reach him by email."
        />
      </Helmet>

      <Navigation />

      <main className="flex-1 pt-24 md:pt-28 pb-12 md:pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <MessageSquare size={18} />
              <span className="text-sm font-medium">Live Conversation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-3">
              Let&apos;s <span className="gradient-text">Talk</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start a conversation instantly. Jarvis answers on Mohit&apos;s behalf, and anything
              important is followed up personally by email.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md overflow-hidden shadow-xl shadow-primary/5">
            <div ref={conversationRef} role="log" aria-label="Conversation with Jarvis" aria-live="polite" className="h-[300px] sm:h-[420px] max-h-[55dvh] overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 break-words">
              {turns.map((t, i) => (
                <div
                  key={i}
                  className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      t.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm leading-relaxed"
                        : "max-w-[85%] text-foreground text-sm leading-relaxed"
                    }
                  >
                    {t.role === "jarvis" && (
                      <span className="block text-xs font-medium text-primary mb-1">Jarvis</span>
                    )}
                    {t.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-sm text-muted-foreground animate-pulse">Thinking…</div>
              )}
            </div>

            <div className="border-t border-border/60 p-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <Button
                    variant="outline"
                    key={s}
                    onClick={() => send(s)}
                    disabled={loading}
                    className="h-auto min-h-10 px-3 py-2 text-xs whitespace-normal text-left rounded-full border-border/70 text-muted-foreground hover:text-primary hover:border-primary/60"
                  >
                    {s}
                  </Button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message…"
                  aria-label="Message to Jarvis"
                  className="min-w-0 flex-1 rounded-lg bg-background border border-border/70 px-3 py-3 text-base text-foreground outline-none focus:border-primary/70 transition-colors"
                />
                <Button
                  size="icon"
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-lg h-12 w-12 shrink-0"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:sinhamohit9870@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/70 text-sm text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
            >
              <Mail size={16} /> sinhamohit9870@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/mohit-sinha-5b5472255"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/70 text-sm text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
            >
              <Linkedin size={16} /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatPage;
