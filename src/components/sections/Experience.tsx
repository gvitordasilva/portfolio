"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import { HaloBadge } from "@/components/ui/halo-badge";
import { useLang } from "@/lib/i18n";
import { experience, t } from "@/lib/content";
import { ui2, tr } from "@/lib/site";

export function Experience() {
  const { lang } = useLang();

  return (
    <section id="experience" className="container-x section-y">
      <SectionHeading eyebrow={tr(ui2.experience.eyebrow, lang)} title={tr(ui2.experience.title, lang)} />

      <ol className="relative ml-2 border-l border-border pl-8">
        {experience.map((job, i) => (
          <motion.li
            key={`${job.company}-${i}`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
            className="relative pb-12 last:pb-0"
          >
            <span className="absolute -left-[2.35rem] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-border bg-background">
              <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-brand" : "bg-muted-foreground/50"}`} />
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold tracking-tight">{t(job.role, lang)}</h3>
              <span className="text-muted-foreground">· {job.company}</span>
              {i === 0 && (
                <HaloBadge live variant="outline" className="text-[10px]">
                  {tr(ui2.experience.present, lang)}
                </HaloBadge>
              )}
            </div>
            <p className="mono mt-1 text-xs text-muted-foreground">
              {t(job.period, lang)}
              {job.location && ` · ${t(job.location, lang)}`}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{t(job.description, lang)}</p>
            {job.highlights && (
              <ul className="mt-3 max-w-2xl space-y-1.5 text-sm">
                {job.highlights.map((h, k) => (
                  <li key={k} className="flex gap-2">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-brand" />
                    <span>{t(h, lang)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <span key={s} className="mono rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
