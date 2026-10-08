"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Download } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { profile, about, skills, experience, t } from "@/lib/content";
import { caseStudies, ui2, tr } from "@/lib/site";

/* Currículo gerado do mesmo conteúdo do site. "Baixar PDF" usa a impressão
 * do navegador com CSS de print: sem dependência extra e sempre atualizado. */
export function ResumeView() {
  const { lang } = useLang();
  const print = () => window.print();

  return (
    <article className="container-x max-w-3xl pb-24 pt-28 print:max-w-none print:pt-0">
      <div className="hide-print mb-8 flex items-center justify-between">
        <Link href={`/${lang}`} className="mono inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> {tr(ui2.caseStudy.back, lang)}
        </Link>
        <div className="flex gap-2">
          <button type="button" onClick={print} className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm">
            <Printer size={14} /> {tr(ui2.resume.print, lang)}
          </button>
          <button type="button" onClick={print} className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background">
            <Download size={14} /> {tr(ui2.resume.download, lang)}
          </button>
        </div>
      </div>

      <header className="border-b border-border pb-6 print:border-black/20">
        <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-lg text-muted-foreground">{t(profile.role, lang)}</p>
        <p className="mono mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{profile.email}</span>
          <span>+{profile.whatsapp.slice(0, 2)} ({profile.whatsapp.slice(2, 4)}) {profile.whatsapp.slice(4, 9)}-{profile.whatsapp.slice(9)}</span>
          <span>{profile.github.replace("https://", "")}</span>
          <span>{profile.siteUrl.replace("https://", "")}</span>
          <span>{t(profile.location, lang)}</span>
        </p>
      </header>

      <Section title={tr(ui2.resume.summary, lang)}>
        <p>{t(profile.subheadline, lang)}</p>
        <p className="mt-2">{t(about.paragraphs[1], lang)}</p>
      </Section>

      <Section title={tr(ui2.resume.experience, lang)}>
        <ul className="space-y-5">
          {experience.map((j, i) => (
            <li key={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-semibold">
                  {t(j.role, lang)} <span className="font-normal text-muted-foreground">· {j.company}</span>
                </p>
                <p className="mono text-xs text-muted-foreground">{t(j.period, lang)}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t(j.description, lang)}</p>
              {j.highlights && (
                <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-sm">
                  {j.highlights.map((h, k) => (
                    <li key={k}>{t(h, lang)}</li>
                  ))}
                </ul>
              )}
              <p className="mono mt-1.5 text-[11px] text-muted-foreground">{j.stack.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={tr(ui2.resume.projects, lang)}>
        <ul className="space-y-3">
          {caseStudies.map((c) => (
            <li key={c.slug}>
              <p className="font-semibold">
                {c.title} <span className="font-normal text-muted-foreground">· {tr(c.subtitle, lang)}</span>
              </p>
              <p className="text-sm text-muted-foreground">{tr(c.solution, lang)}</p>
              <p className="mono mt-1 text-[11px] text-muted-foreground">
                {c.stack.join(" · ")}
                {c.demo && ` · ${c.demo.replace("https://", "")}`}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={tr(ui2.resume.skills, lang)}>
        <dl className="grid gap-2 sm:grid-cols-[140px_1fr]">
          {skills.map((g) => (
            <div key={g.category.en} className="contents">
              <dt className="font-medium">{t(g.category, lang)}</dt>
              <dd className="text-sm text-muted-foreground">{g.items.join(", ")}</dd>
            </div>
          ))}
          <dt className="font-medium">{tr(ui2.resume.languages, lang)}</dt>
          <dd className="text-sm text-muted-foreground">{tr(ui2.resume.languagesList, lang)}</dd>
        </dl>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-6 last:border-0 print:border-black/20 print:py-4">
      <h2 className="mono mb-3 text-[11px] uppercase tracking-[0.2em] text-brand print:text-black">{title}</h2>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}
