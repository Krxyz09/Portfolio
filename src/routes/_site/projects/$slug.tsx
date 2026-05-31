import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useContentStore } from "@/store/content-store";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_site/projects/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Krish Jindal` },
      { name: "description", content: `Project details for ${params.slug}.` },
      { property: "og:title", content: `${params.slug} — Krish Jindal` },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = useContentStore((s) => s.projects.find((p) => p.slug === slug));

  if (!project) throw notFound();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-24 md:px-10 md:pt-32 md:pb-32">
        <Link to="/projects" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
          ← All work
        </Link>
        <div className="flex items-baseline gap-6 mt-10">
          <span className="text-xs text-muted-foreground tabular-nums">{project.year}</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-6xl md:text-9xl leading-[0.85] tracking-tighter"
          >
            {project.title}
          </motion.h1>
        </div>
        <p className="mt-10 font-display text-2xl md:text-3xl leading-snug max-w-3xl">{project.summary}</p>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-3xl">{project.description}</p>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.15em]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Links</p>
            <div className="mt-3 flex flex-col gap-2 font-display text-2xl">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-primary underline-offset-4 hover:underline">
                  Live →
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" className="hover:text-primary underline-offset-4 hover:underline">
                  Repository →
                </a>
              )}
              {!project.live && !project.repo && <span className="text-muted-foreground text-base">Private project</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
