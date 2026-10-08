"use client";

import { useLang } from "@/lib/i18n";
import { services, ui, t } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Services() {
  const { lang } = useLang();
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeading index="05" title={t(ui.sections.services, lang)} />
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="group flex h-full gap-5 rounded-2xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent/50">
              <span className="mono text-lg text-accent/70 transition-colors group-hover:text-accent">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{t(s.title, lang)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(s.description, lang)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
