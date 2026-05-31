import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAdminStore } from "@/store/admin-store";
import { useContentStore } from "@/store/content-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — Dashboard" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

type Tab = "overview" | "profile" | "skills" | "projects" | "messages";

function AdminDashboard() {
  const navigate = useNavigate();
  const logout = useAdminStore((s) => s.logout);
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-10 flex items-center justify-between">
          <Link to="/" className="font-display text-xl">krish<span className="text-primary">.</span></Link>
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-primary">View site →</Link>
            <button
              onClick={() => {
                logout();
                toast("Signed out.");
                navigate({ to: "/" });
              }}
              className="hover:text-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-20">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">(admin) — dashboard</p>
        <h1 className="font-display text-6xl md:text-9xl leading-[0.85] tracking-tighter mt-6">
          control<sup className="font-display text-lg opacity-50 ml-1">(panel)</sup>
        </h1>

        <div className="mt-6 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
          Edits are <span className="text-primary">session-only</span> — they reset on refresh. Enable Lovable Cloud to persist content.
        </div>

        <nav className="mt-12 flex flex-wrap gap-2 border-b border-border/60 pb-2">
          {(["overview", "profile", "skills", "projects", "messages"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                tab === t ? "border border-primary text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="mt-10">
          {tab === "overview" && <Overview />}
          {tab === "profile" && <ProfileEditor />}
          {tab === "skills" && <SkillsEditor />}
          {tab === "projects" && <ProjectsEditor />}
          {tab === "messages" && <MessagesViewer />}
        </div>
      </main>
    </div>
  );
}

function Overview() {
  const { profile, skills, projects } = useContentStore();
  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Skill categories", value: skills.length },
    { label: "Total skills", value: skills.reduce((n, g) => n + g.items.length, 0) },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="border border-border p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.label}</p>
          <p className="font-display text-7xl mt-2 tabular-nums">{s.value}</p>
        </div>
      ))}
      <div className="md:col-span-3 border border-border p-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Showing as</p>
        <p className="font-display text-3xl mt-2">{profile.name}</p>
        <p className="text-muted-foreground mt-2">{profile.tagline}</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full bg-transparent border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary";

function ProfileEditor() {
  const profile = useContentStore((s) => s.profile);
  const setProfile = useContentStore((s) => s.setProfile);
  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
      <Field label="Name">
        <input className={inputClass} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
      </Field>
      <Field label="Location">
        <input className={inputClass} value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
      </Field>
      <Field label="Email">
        <input className={inputClass} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
      </Field>
      <Field label="Short name">
        <input className={inputClass} value={profile.shortName} onChange={(e) => setProfile({ ...profile, shortName: e.target.value })} />
      </Field>
      <div className="md:col-span-2">
        <Field label="Tagline">
          <textarea className={inputClass} rows={2} value={profile.tagline} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="Bio (one paragraph per line)">
          <textarea
            className={inputClass}
            rows={6}
            value={profile.bio.join("\n")}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value.split("\n").filter(Boolean) })}
          />
        </Field>
      </div>
    </div>
  );
}

function SkillsEditor() {
  const skills = useContentStore((s) => s.skills);
  const setSkills = useContentStore((s) => s.setSkills);
  return (
    <div className="space-y-6 max-w-3xl">
      {skills.map((group, idx) => (
        <div key={idx} className="border border-border p-4 space-y-3">
          <Field label="Category">
            <input
              className={inputClass}
              value={group.category}
              onChange={(e) => {
                const next = [...skills];
                next[idx] = { ...group, category: e.target.value };
                setSkills(next);
              }}
            />
          </Field>
          <Field label="Items (comma separated)">
            <input
              className={inputClass}
              value={group.items.join(", ")}
              onChange={(e) => {
                const next = [...skills];
                next[idx] = { ...group, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                setSkills(next);
              }}
            />
          </Field>
          <button
            onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-destructive"
          >
            Remove category
          </button>
        </div>
      ))}
      <button
        onClick={() => setSkills([...skills, { category: "New category", items: [] }])}
        className="rounded-full border border-primary px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground"
      >
        + Add category
      </button>
    </div>
  );
}

function ProjectsEditor() {
  const projects = useContentStore((s) => s.projects);
  const setProjects = useContentStore((s) => s.setProjects);
  return (
    <div className="space-y-6 max-w-3xl">
      {projects.map((p, idx) => (
        <div key={idx} className="border border-border p-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Title">
              <input className={inputClass} value={p.title} onChange={(e) => {
                const next = [...projects]; next[idx] = { ...p, title: e.target.value }; setProjects(next);
              }} />
            </Field>
            <Field label="Slug">
              <input className={inputClass} value={p.slug} onChange={(e) => {
                const next = [...projects]; next[idx] = { ...p, slug: e.target.value }; setProjects(next);
              }} />
            </Field>
            <Field label="Year">
              <input className={inputClass} value={p.year} onChange={(e) => {
                const next = [...projects]; next[idx] = { ...p, year: e.target.value }; setProjects(next);
              }} />
            </Field>
          </div>
          <Field label="Summary">
            <input className={inputClass} value={p.summary} onChange={(e) => {
              const next = [...projects]; next[idx] = { ...p, summary: e.target.value }; setProjects(next);
            }} />
          </Field>
          <Field label="Description">
            <textarea className={inputClass} rows={3} value={p.description} onChange={(e) => {
              const next = [...projects]; next[idx] = { ...p, description: e.target.value }; setProjects(next);
            }} />
          </Field>
          <Field label="Tech (comma separated)">
            <input className={inputClass} value={p.tech.join(", ")} onChange={(e) => {
              const next = [...projects]; next[idx] = { ...p, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }; setProjects(next);
            }} />
          </Field>
          <button
            onClick={() => setProjects(projects.filter((_, i) => i !== idx))}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-destructive"
          >
            Remove project
          </button>
        </div>
      ))}
      <button
        onClick={() => setProjects([...projects, { slug: `new-${Date.now()}`, title: "Untitled", year: `${new Date().getFullYear()}`, summary: "", description: "", tech: [] }])}
        className="rounded-full border border-primary px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground"
      >
        + Add project
      </button>
    </div>
  );
}

function MessagesViewer() {
  const [messages, setMessages] = useState<Array<{ id: number; name: string; email: string; message: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/messages")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load messages.");
        }
        const data = await response.json();
        if (mounted) {
          setMessages(data.messages ?? []);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Unable to load messages.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border border-border p-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Contact submissions</p>
          <p className="font-display text-3xl mt-2">Message inbox</p>
        </div>
        <p className="text-sm text-muted-foreground">{messages.length} message{messages.length === 1 ? "" : "s"}</p>
      </div>

      {loading && <div className="border border-border p-6 text-sm text-muted-foreground">Loading messages…</div>}
      {error && <div className="border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">{error}</div>}
      {!loading && !error && messages.length === 0 && (
        <div className="border border-border p-6 text-sm text-muted-foreground">No messages yet.</div>
      )}

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="border border-border p-6 rounded-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{message.name}</p>
                <a href={`mailto:${message.email}`} className="text-sm text-primary underline-offset-2 hover:underline">{message.email}</a>
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{new Date(message.created_at).toLocaleString()}</p>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
