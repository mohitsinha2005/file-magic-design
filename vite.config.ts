import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env };
  // Fallback Supabase publishable credentials so deploys (e.g. Netlify) work
  // even when env vars aren't configured. These are the public anon key — safe for the browser.
  const SUPABASE_URL = env.VITE_SUPABASE_URL || "https://mbosvdbojhhcgnbafshw.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY =
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ib3N2ZGJvamhoY2duYmFmc2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NDk0NzQsImV4cCI6MjA5ODMyNTQ3NH0.6wc5f0wKPGGln0oHlMgrbXHvMolKXAqrKp1xcJ4qcpQ";
  const SUPABASE_PROJECT_ID = env.VITE_SUPABASE_PROJECT_ID || "mbosvdbojhhcgnbafshw";

  return {
    server: { host: "::", port: 8080 },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(SUPABASE_URL),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(SUPABASE_PUBLISHABLE_KEY),
      "import.meta.env.VITE_SUPABASE_PROJECT_ID": JSON.stringify(SUPABASE_PROJECT_ID),
    },
  };
});

