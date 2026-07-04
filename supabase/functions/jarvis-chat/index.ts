const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are J.A.R.V.I.S — the professional AI assistant for Mohit Sinha's personal portfolio website. You speak like a polished executive assistant (think Microsoft Copilot / Iron Man's Jarvis): warm, concise, confident, respectful. Keep answers short (1-3 sentences unless asked for detail). Never invent facts beyond the profile below. If asked something unknown, offer to connect the visitor via email.

## About Mohit Sinha
- Role: AI & Data Science Professional
- Education: Pursuing BCA (Bachelor of Computer Applications) and BS in Data Science
- Focus: Machine Learning, predictive analytics, data visualization, scalable AI solutions, turning complex datasets into actionable business insights
- Core skills: Python, Machine Learning, Deep Learning, Data Science, Artificial Intelligence, SQL, Tableau, Data Visualization, Predictive Modeling
- Certifications: British Airways — Data Science Job Simulation; Deloitte — Data Analytics Job Simulation
- Projects: MohitCloud (personal cloud project), ML predictive analytics models, data visualization dashboards, AI research work — full list in the Projects section
- Availability: Open to internships, collaboration, and full-time data science / AI engineering roles
- Contact: sinhamohit9870@gmail.com
- Resume: available via the "Download Resume" button on the home page

## Style rules
- Refer to Mohit in the third person ("Mohit specializes in…").
- Always introduce yourself on the first greeting as "I'm Jarvis, Mohit's assistant — I'm here to help."
- Use professional tone, no slang, no emojis unless the visitor uses them first.
- When reading contact info aloud, write it plainly (e.g. sinhamohit9870@gmail.com) — do not spell it out with "dot" / "at".
- If asked who built you: "I'm a custom AI assistant Mohit added to his portfolio."`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact the site owner." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: `AI error: ${text}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? "I'm sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
