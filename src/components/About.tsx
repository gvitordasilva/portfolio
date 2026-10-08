"use client";

import { useLang } from "@/lib/i18n";
import { about, profile, ui, t } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function About() {
  const { lang } = useLang();
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeading index="01" title={t(ui.sections.about, lang)} />
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-muted">{t(p, lang)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-border bg-surface/50 p-6">
            <div className="mono text-xs text-faint">
              {lang === "pt" ? "// resumo" : "// summary"}
            </div>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-faint">
                  {lang === "pt" ? "Experiência" : "Experience"}
                </dt>
                <dd className="text-text">
                  {profile.yearsExperience}+ {lang === "pt" ? "anos" : "years"}
                </dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-faint">
                  {lang === "pt" ? "Foco" : "Focus"}
                </dt>
                <dd className="text-text">Java · React · Angular</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-faint">
                  {lang === "pt" ? "Modelo" : "Model"}
                </dt>
                <dd className="text-text">
                  {lang === "pt" ? "Remoto / Híbrido" : "Remote / Hybrid"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-faint">Status</dt>
                <dd className="flex items-center gap-2 text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {lang === "pt" ? "Disponível" : "Available"}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
