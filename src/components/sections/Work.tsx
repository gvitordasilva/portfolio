"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { useLang } from "@/lib/i18n";
import { caseStudies, caseCategories, ui2, tr, type CaseStudy } from "@/lib/site";
import { cn } from "@/lib/utils";

function CaseCard({ c, index }: { c: CaseStudy; index: number }) {
  const { lang } = useLang();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Link
        href={`/${lang}/work/${c.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 transition-colors hover:border-brand/40"
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface-2">
          {c.image ? (
            <Image
              src={c.image}
              alt={c.title}
              fill
              sizes="(min-width:1024px) 33vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-transparent to-brand-3/15">
              <div className="absolute inset-0 grid-bg opacity-70" />
              <span className="serif absolute bottom-4 left-5 text-3xl italic">{c.title}</span>
            </div>
          )}
          <span className="mono absolute right-3 top-3 rounded-full border border-border bg-background/70 px-2 py-0.5 text-[10px] backdrop-blur">
            {c.year}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-brand">{tr(c.role, lang)}</p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">{c.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{tr(c.subtitle, lang)}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {c.stack.slice(0, 4).map((s) => (
              <span key={s} className="mono rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {s}
              </span>
            ))}
            {c.stack.length > 4 && <span className="mono text-[10px] text-muted-foreground">+{c.stack.length - 4}</span>}
          </div>
          <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium group-hover:text-brand">
            {tr(ui2.work.read, lang)}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function Work() {
  const { lang } = useLang();
  const [cat, setCat] = useState<(typeof caseCategories)[number]["id"]>("all");
  const list = caseStudies.filter((c) => cat === "all" || c.category === cat);

  return (
    <section id="work" className="container-x section-y">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={tr(ui2.work.eyebrow, lang)}
          title={tr(ui2.work.title, lang)}
          sub={tr(ui2.work.sub, lang)}
          className="mb-0"
        />
        <div className="glass flex w-fit rounded-full p-1">
          {caseCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                cat === c.id ? "text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat === c.id && (
                <motion.span layoutId="work-pill" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{tr(c.label, lang)}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((c, i) => (
            <CaseCard key={c.slug} c={c} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
