import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useContentStore } from "@/store/content-store";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_site/projects/")({
  head: () => ({
    meta: [
      { title: "Work — Krish Jindal" },
      { name: "description", content: "Selected projects by Krish Jindal." },
      { property: "og:title", content: "Work — Krish Jindal" },
      { property: "og:description", content: "Selected projects by Krish Jindal." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = useContentStore((s) => s.projects);
  return (
    <PageShell eyebrow="(work) — selected projects" title="work" subtitle={`${projects.length}`}>
      <ul className="divide-y divide-border/60 border-y border-border/60">
        {projects.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group grid gap-4 py-10 md:grid-cols-12 md:items-baseline"
            >
              <span className="md:col-span-1 text-xs text-muted-foreground tabular-nums">{p.year}</span>
              <h3 className="md:col-span-5 font-display text-5xl md:text-7xl leading-none transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <p className="md:col-span-5 text-muted-foreground text-base leading-relaxed">{p.summary}</p>
              <span className="md:col-span-1 text-right text-primary text-2xl">→</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </PageShell>
  );
}
