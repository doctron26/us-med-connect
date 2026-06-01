import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabaseAdmin, isAdminUser } from "@/lib/supabase-admin";

// /admin → redirect to dashboard (if logged in) or login (if not)
export const Route = createFileRoute("/admin/")({
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

    throw redirect({ to: "/admin/dashboard" });
  },
  component: () => null,
});
