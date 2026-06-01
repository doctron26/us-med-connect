import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Minimal /admin layout.
 *
 * This intentionally has NO auth guard because it wraps BOTH the
 * public login page AND the protected dashboard/pricing pages.
 * The actual auth guard lives in `admin/_authenticated.tsx`.
 */
export const Route = createFileRoute("/admin")({
  component: () => <Outlet />,
});
