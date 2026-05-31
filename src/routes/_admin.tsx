import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { ADMIN_SESSION_KEY } from "@/lib/admin-credentials";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_admin")({
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;
    const session = window.localStorage.getItem(ADMIN_SESSION_KEY);
    if (session !== "1" && location.pathname !== "/admin/login") {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const hydrate = useAdminStore((s) => s.hydrate);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    hydrate();
    setReady(true);
  }, [hydrate]);
  if (!ready) return null;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Outlet />
      <Toaster theme="dark" />
    </div>
  );
}
