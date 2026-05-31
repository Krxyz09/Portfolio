import { Link } from "@tanstack/react-router";
import { useContentStore } from "@/store/content-store";

export function SiteFooter() {
  const profile = useContentStore((s) => s.profile);
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl md:text-4xl leading-tight">
              Let's build something <span className="text-primary italic">deliberate</span>.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
            >
              {profile.email} →
            </a>
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-primary">
                {s.label}
              </a>
            ))}
            <Link to="/admin/login" className="hover:text-primary">Admin</Link>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
