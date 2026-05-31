import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useContentStore } from "@/store/content-store";
import { CursorTrail } from "@/components/ui/cursor-trail";
export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Krish Jindal — Software engineer & product builder" },
      { name: "description", content: "Portfolio of Krish Jindal — full-stack engineer crafting calm, deliberate product surfaces." },
      { property: "og:title", content: "Krish Jindal — Portfolio" },
      { property: "og:description", content: "Full-stack engineer crafting calm, deliberate product surfaces." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const profile = useContentStore((s) => s.profile);
  const projects = useContentStore((s) => s.projects).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <CursorTrail />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-20 md:px-10 md:pt-32 md:pb-32">          <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span>(01) — Portfolio · {new Date().getFullYear()}</span>
            <span className="font-display text-base text-primary">✶</span>
            <span className="hidden md:block">{profile.location}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-display mt-12 text-[20vw] md:text-[14rem] leading-[0.82] tracking-tighter"
          >
            <span className="italic text-primary">K</span>rish
            <sup className="font-display text-lg md:text-3xl align-top opacity-50 ml-3">(jindal)</sup>
          </motion.h1>

          <div className="mt-12 grid gap-12 md:grid-cols-12">
            <p className="md:col-span-5 md:col-start-1 text-sm uppercase tracking-[0.18em] text-muted-foreground leading-relaxed">
              B.Tech Mathematics and Computing<br />
              Full Stack Developer | ML Enthusiast<br />
              {/* A quiet passion for craft, type, & details. */}
              Problem Solving | System Design 
            </p>
            <p className="md:col-span-5 md:col-start-8 font-display text-2xl md:text-3xl leading-snug">
              {profile.tagline}
            </p>
          </div>
        </div>

        {/* marquee strip */}
        <div className="border-y border-border/60 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap font-display text-6xl md:text-8xl py-6"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="mr-12">
                System <span className="italic text-primary">·</span> Build <span className="italic text-primary">·</span> Optimize <span className="italic text-primary">·</span> Scale <span className="italic text-primary">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="flex items-baseline justify-between mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">(02) — Selected Work</span>
            <Link to="/projects" className="text-xs uppercase tracking-[0.2em] hover:text-primary">
              View all →
            </Link>
          </div>

          <ul className="divide-y divide-border/60 border-y border-border/60">
            {projects.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group flex items-center justify-between py-8 md:py-12"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-xs text-muted-foreground tabular-nums">{p.year}</span>
                    <h3 className="font-display text-4xl md:text-7xl leading-none transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                  </div>
                  <span className="hidden md:inline text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary">
                    {p.summary}
                  </span>
                  <span className="text-primary text-2xl">→</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION TEASERS */}
      <section className="bg-cream text-cream-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 grid gap-12 md:grid-cols-3">
          {[
            { to: "/about", label: "about", sub: "the story" },
            { to: "/skills", label: "skills", sub: "the toolkit" },
            { to: "/contact", label: "contact", sub: "say hi" },
          ].map((t) => (
            <Link key={t.to} to={t.to} className="group block">
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">{t.sub}</span>
              <p className="font-display text-7xl md:text-8xl leading-none mt-3 transition-transform group-hover:-translate-y-1">
                {t.label}
                <sup className="font-display text-base opacity-40 ml-1">→</sup>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
