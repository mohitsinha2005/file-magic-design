// Voice assistant edge function: takes user text, returns assistant reply text + base64 mp3 audio.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are J.A.R.V.I.S., the professional voice assistant for Mohit Sinha's portfolio website. You speak in a warm, confident, professional tone — like a polished executive briefing. Keep replies concise (2-4 sentences) and naturally spoken (no markdown, no bullet symbols, no emojis, no URLs read aloud unless asked).

About Mohit Sinha:
- Name: Mohit Sinha. Aspiring Data Scientist and AI Researcher based in India.
- Education: Pursuing Bachelor of Computer Applications (BCA), in parallel with a Bachelor of Science in Data Science and Applications from IIT Madras.
- Focus areas: Artificial Intelligence, Machine Learning, Statistical Analysis, Data Visualization, and Predictive Modeling.
- Core skills: Python, SQL, Pandas, NumPy, Scikit-learn, TensorFlow, Power BI, Tableau, data preprocessing, EDA, and dashboarding.
- Certifications: Deloitte Data Analytics Job Simulation (Forage), British Airways Data Science Job Simulation (Forage), plus additional data analytics and AI credentials.
- Featured projects: MohitCloud (mohitcloud.in) — a personal cloud platform; MohitMedAI (mohitmedai11.netlify.app) — a medical AI assistant exploring healthcare applications of machine learning.
- Professional objective: Apply analytical skills and technical expertise in Data Science and AI to drive measurable business outcomes and contribute to impactful, data-driven products.
- Contact: Email sinhamohit9870@gmail.com. LinkedIn: mohit-sinha-5b5472255. GitHub: mohitsinha2005. Resume is available on the website.

When asked who you are, introduce yourself as Mohit's professional AI assistant. If a question is unrelated to Mohit, briefly redirect to his work, skills, projects, or how to get in touch.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, history = [] } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1) Chat completion
    const chatRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.slice(-8),
          { role: "user", content: message },
        ],
      }),
    });

    if (!chatRes.ok) {
      const errText = await chatRes.text();
      return new Response(JSON.stringify({ error: "Chat failed", detail: errText }), {
        status: chatRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const chatData = await chatRes.json();
    const reply: string =
      chatData?.choices?.[0]?.message?.content?.trim() ||
      "I'm sorry, I couldn't generate a response right now.";

    // 2) Text-to-speech (mp3)
    const ttsRes = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts",
        input: reply,
        voice: "onyx",
        response_format: "mp3",
        instructions:
          "Speak in a calm, confident, professional tone. Clear pacing, slight warmth, like a polished executive briefing.",
      }),
    });

    let audioBase64: string | null = null;
    if (ttsRes.ok) {
      const buf = new Uint8Array(await ttsRes.arrayBuffer());
      // Chunked base64 to avoid stack overflow on large buffers
      let binary = "";
      const chunk = 0x8000;
      for (let i = 0; i < buf.length; i += chunk) {
        binary += String.fromCharCode(...buf.subarray(i, i + chunk));
      }
      audioBase64 = btoa(binary);
    }

    return new Response(
      JSON.stringify({ reply, audio: audioBase64, mime: "audio/mpeg" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unhandled error", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
