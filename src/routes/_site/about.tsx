import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useContentStore } from "@/store/content-store";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About — Krish Jindal" },
      { name: "description", content: "About Krish Jindal — the story, the values, the way of working." },
      { property: "og:title", content: "About — Krish Jindal" },
      { property: "og:description", content: "About Krish Jindal — the story, the values, the way of working." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const profile = useContentStore((s) => s.profile);
  return (
    <PageShell eyebrow="(about) — the story" title="about" subtitle="krish" tone="cream">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7 space-y-6 text-lg md:text-xl leading-relaxed">
          {profile.bio.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
        <aside className="md:col-span-4 md:col-start-9 space-y-8 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Situated in</p>
            <p className="font-display text-3xl mt-2">{profile.location}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Currently</p>
            <p className="font-display text-3xl mt-2">Available <span className="italic">for work</span></p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Reach out</p>
            <a href={`mailto:${profile.email}`} className="font-display text-2xl mt-2 block underline-offset-4 hover:underline">
              {profile.email}
            </a>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
