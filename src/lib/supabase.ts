import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qqxttufhegnujodcnjvq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxeHR0dWZoZWdudWpvZGNuanZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTg1NTcsImV4cCI6MjA5NTYzNDU1N30.jCUGWE_7A2FKkBiUHA4DIiC7eR-IQJk5lHgNbhnMaFs";

if (supabaseUrl === "https://qqxttufhegnujodcnjvq.supabase.co") {
  console.warn("Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
}

// Disable all background Supabase services:
// - No Realtime WebSocket connection (we don't subscribe to any channels)
// - No auth session persistence (this is an anonymous contact form)
// - No token auto-refresh loop (no logged-in users)
// These background tasks compete with React re-renders during form input
// and cause "Page Unresponsive" on the live site.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: undefined,
  },
  realtime: {
    params: {
      eventsPerSecond: 0,
    },
    log_level: "info",
  },
  global: {
    fetch: (...args) => globalThis.fetch(...args),
  },
});
