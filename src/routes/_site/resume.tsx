import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/_site/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Krish Jindal" },
      { name: "description", content: "Download or view Krish Jindal's resume." },
      { property: "og:title", content: "Resume — Krish Jindal" },
      { property: "og:description", content: "Download or view Krish Jindal's resume." },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <PageShell title="resume" subtitle="pdf">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="w-full border border-border bg-card overflow-hidden">
            <iframe
              src="/Resume.pdf#zoom=page-width"
              className="w-full h-[60vh] md:h-[80vh]"
              style={{ border: 0 }}
              title="Resume PDF"
            />
          </div>
        </div>
        <aside className="md:col-span-4 space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            A snapshot of experience, skills, and selected work. Download for your records or print.
          </p>
          <a
            href="/Resume.pdf"
            download
            className="group inline-flex items-center gap-3 rounded-full border border-primary px-6 py-3 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Download PDF
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="block text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
          >
            Open in new tab →
          </a>
        </aside>
      </div>
    </PageShell>
  );
}
