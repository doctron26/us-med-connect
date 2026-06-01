import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Activity, AlertCircle } from "lucide-react";
import { supabaseAdmin, isAdminUser } from "@/lib/supabase-admin";

// If already logged in as admin, skip straight to dashboard
export const Route = createFileRoute("/admin/login")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabaseAdmin.auth.getSession();

    if (session) {
      const admin = await isAdminUser();
      if (admin) throw redirect({ to: "/admin/dashboard" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Invalid email or password.");
        return;
      }

      // Check allowlist
      const admin = await isAdminUser();
      if (!admin) {
        await supabaseAdmin.auth.signOut();
        setError("Access denied. Your account is not authorized as an admin.");
        return;
      }

      navigate({ to: "/admin/dashboard" });
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-[#0d1426] border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="size-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Activity className="size-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold text-white leading-tight">USAMedTravel</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">Admin Access</div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-white mb-1 text-center">Welcome back</h1>
          <p className="text-sm text-white/40 text-center mb-6">Sign in to manage inquiries & pricing</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" id="admin-login-form">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder-white/25 text-sm focus:outline-none focus:border-teal-400/60 focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder-white/25 text-sm focus:outline-none focus:border-teal-400/60 focus:bg-white/[0.08] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-[#0a0f1e] font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none shadow-lg shadow-teal-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-5">
          Admin access only. Unauthorized attempts are logged.
        </p>
      </div>
    </div>
  );
}
