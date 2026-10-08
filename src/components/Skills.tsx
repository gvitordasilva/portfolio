"use client";

import { useLang } from "@/lib/i18n";
import { skills, ui, t } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills() {
  const { lang } = useLang();
  return (
    <section
      id="skills"
      className="border-y border-border bg-bg-soft/40 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="02" title={t(ui.sections.skills, lang)} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, gi) => (
            <Reveal key={gi} delay={gi * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent/50">
                <h3 className="mono mb-4 text-sm text-accent">
                  {t(group.category, lang)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-bg/60 px-2.5 py-1 text-sm text-muted transition-colors group-hover:text-text"
                    >
                      {item}
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
