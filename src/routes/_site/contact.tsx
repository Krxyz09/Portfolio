import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useContentStore } from "@/store/content-store";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Krish Jindal" },
      { name: "description", content: "Get in touch with Krish Jindal." },
      { property: "og:title", content: "Contact — Krish Jindal" },
      { property: "og:description", content: "Get in touch with Krish Jindal." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message required").max(1000),
});

function ContactPage() {
  const profile = useContentStore((s) => s.profile);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Thanks — I'll be in touch soon.");
    }, 600);
  };

  return (
    <PageShell eyebrow="(contact) — say hello" title="hello" subtitle="say hi" tone="cream">
      <div className="grid gap-12 md:grid-cols-12">
        <form onSubmit={onSubmit} className="md:col-span-7 space-y-8">
          {(["name", "email"] as const).map((field) => (
            <div key={field}>
              <label className="text-[10px] uppercase tracking-[0.3em] opacity-60">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="mt-2 w-full bg-transparent border-b border-cream-foreground/30 py-3 font-display text-3xl focus:outline-none focus:border-primary"
                maxLength={field === "email" ? 255 : 100}
              />
              {errors[field] && <p className="mt-1 text-xs text-destructive">{errors[field]}</p>}
            </div>
          ))}
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] opacity-60">message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              maxLength={1000}
              className="mt-2 w-full bg-transparent border-b border-cream-foreground/30 py-3 text-lg leading-relaxed focus:outline-none focus:border-primary resize-none"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-3 rounded-full border border-cream-foreground px-6 py-3 text-xs uppercase tracking-[0.25em] hover:bg-cream-foreground hover:text-cream transition-colors disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Send message"}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">
            Form is local — not stored or emailed yet. Enable Lovable Cloud or Resend to wire delivery.
          </p>
        </form>

        <aside className="md:col-span-4 md:col-start-9 space-y-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Email</p>
            <a href={`mailto:${profile.email}`} className="font-display text-2xl block mt-2 underline-offset-4 hover:underline">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Elsewhere</p>
            <ul className="mt-2 space-y-1 font-display text-2xl">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                    {s.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
