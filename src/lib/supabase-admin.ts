import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * Admin-specific Supabase client.
 *
 * Unlike the public client (supabase.ts), this one:
 *   - Persists the auth session in localStorage so the admin stays logged in
 *     across page refreshes.
 *   - Auto-refreshes the JWT token so sessions don't expire mid-session.
 *   - Detects auth callbacks in the URL (needed for magic-link fallback, if ever used).
 *
 * This client is ONLY imported by admin routes. The public contact form
 * continues to use the lightweight client in supabase.ts.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "usamedtravel_admin_session",
  },
});

/**
 * Check whether the currently logged-in user is in the admin_users allowlist.
 * Returns true if they are an admin, false otherwise.
 */
export async function isAdminUser(): Promise<boolean> {
  const {
    data: { user },
  } = await supabaseAdmin.auth.getUser();

  if (!user?.email) return false;

  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();

  console.log("isAdminUser check:", { 
    userEmail: user.email, 
    dbData: data, 
    dbError: error 
  });

  if (error || !data) return false;
  return true;
}
