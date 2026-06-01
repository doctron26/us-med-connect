import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/second-opinion")({
  component: () => <Outlet />,
});
