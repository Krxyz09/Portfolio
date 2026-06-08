import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "cream";
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={`${dark ? "bg-background text-foreground" : "bg-cream text-cream-foreground"} relative overflow-hidden`}
    >
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:px-10 md:pt-32 md:pb-24">
        <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.3em] opacity-60">
          {eyebrow ? <span>{eyebrow}</span> : <span />}
          <span className="font-display text-base opacity-70">✶</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-display mt-10 text-[18vw] md:text-[12rem] leading-[0.85] tracking-tighter"
        >
          {title}
          <sup className="font-display text-lg md:text-2xl align-top opacity-50 ml-2">
            ({subtitle ?? "—"})
          </sup>
        </motion.h1>
        {children && <div className="mt-16">{children}</div>}
      </div>
    </section>
  );
}
