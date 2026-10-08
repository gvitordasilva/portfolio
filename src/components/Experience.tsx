"use client";

import { useLang } from "@/lib/i18n";
import { experience, ui, t } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  const { lang } = useLang();
  return (
    <section
      id="experience"
      className="border-y border-border bg-bg-soft/40 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="04" title={t(ui.sections.experience, lang)} />
        <div className="relative ml-2 border-l border-border pl-8">
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="relative pb-12 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-accent bg-bg">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <p className="mono text-xs text-faint">
                  {t(job.period, lang)}
                  {job.location && (
                    <span className="text-faint/70">
                      {" · "}
                      {t(job.location, lang)}
                    </span>
                  )}
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  {t(job.role, lang)}
                  <span className="text-accent"> @ {job.company}</span>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {t(job.description, lang)}
                </p>
                {job.highlights && (
                  <ul className="mt-3 max-w-2xl space-y-1.5">
                    {job.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex gap-2 text-sm leading-relaxed text-muted"
                      >
                        <span className="mono mt-0.5 text-accent">▸</span>
                        {t(h, lang)}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-3 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <li
                      key={s}
                      className="mono rounded border border-border bg-bg/60 px-2 py-0.5 text-xs text-faint"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
