import { createFileRoute, Outlet, redirect, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutDashboard, DollarSign, LogOut, Activity, FileText } from "lucide-react";
import { supabaseAdmin, isAdminUser } from "@/lib/supabase-admin";

// ─── Route guard: fires ONLY for children of this layout ──────────────────────
export const Route = createFileRoute("/admin/_authenticated")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabaseAdmin.auth.getSession();

    if (!session) {
      throw redirect({ to: "/admin/login" });
    }

    const admin = await isAdminUser();
    if (!admin) {
      await supabaseAdmin.auth.signOut();
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AuthenticatedLayout,
});

// ─── Admin shell with sidebar ──────────────────────────────────────────────────
function AuthenticatedLayout() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState<string>("");

  useEffect(() => {
    supabaseAdmin.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setAdminEmail(user.email);
    });
  }, []);

  const handleSignOut = async () => {
    await supabaseAdmin.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  const navItems = [
    { to: "/admin/dashboard" as const, label: "Inquiries", icon: LayoutDashboard },
    { to: "/admin/pricing" as const, label: "Pricing", icon: DollarSign },
    { to: "/admin/blogs" as const, label: "Blogs", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#0d1426] border-r border-white/[0.08] flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg">
              <Activity className="size-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">USAMedTravel</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200 [&.active]:text-teal-400 [&.active]:bg-teal-400/10"
              activeProps={{ className: "active" }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User info + sign out */}
        <div className="p-4 border-t border-white/[0.08]">
          <div className="px-3 py-2 mb-2">
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">Logged in as</div>
            <div className="text-xs text-white/70 truncate">{adminEmail}</div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
