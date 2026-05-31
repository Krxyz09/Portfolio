import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ADMIN_CREDENTIALS } from "@/lib/admin-credentials";
import { useAdminStore } from "@/store/admin-store";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin — Login" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useAdminStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      login();
      toast.success("Welcome back.");
      navigate({ to: "/admin" });
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-10 flex items-center justify-between">
          <Link to="/" className="font-display text-xl">krish<span className="text-primary">.</span></Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">admin · restricted</span>
        </div>
      </header>
      <main className="flex-1 grid place-items-center px-6">
        <div className="w-full max-w-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">(00) — Authenticate</p>
          <h1 className="font-display text-7xl md:text-8xl leading-none mt-4 tracking-tighter">
            login<sup className="font-display text-lg opacity-50 ml-1">(admin)</sup>
          </h1>
          <form onSubmit={onSubmit} className="mt-12 space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-2 w-full bg-transparent border-b border-border py-3 font-display text-2xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-2 w-full bg-transparent border-b border-border py-3 font-display text-2xl focus:outline-none focus:border-primary"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              className="group inline-flex items-center gap-3 rounded-full border border-primary px-6 py-3 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Sign in
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
          <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            Credentials are stored locally and visible in the source bundle. Cosmetic only.
          </p>
        </div>
      </main>
    </div>
  );
}
