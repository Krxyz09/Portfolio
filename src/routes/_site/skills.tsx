import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useContentStore } from "@/store/content-store";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_site/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Krish Jindal" },
      { name: "description", content: "Languages, frameworks, and tools Krish Jindal builds with." },
      { property: "og:title", content: "Skills — Krish Jindal" },
      { property: "og:description", content: "Languages, frameworks, and tools Krish Jindal builds with." },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const skills = useContentStore((s) => s.skills);
  return (
    <PageShell title="skills" subtitle="toolkit">
      <div className="divide-y divide-border/60 border-y border-border/60">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="grid gap-6 py-10 md:grid-cols-12 md:items-baseline"
          >
            <h2 className="md:col-span-3 font-display text-3xl md:text-4xl">{group.category}</h2>
            <ul className="md:col-span-9 flex flex-wrap gap-x-6 gap-y-3 text-lg md:text-xl text-muted-foreground">
              {group.items.map((item) => (
                <li key={item} className="hover:text-primary transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
