"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { BrowserFrame } from "@/components/BrowserFrame";
import { StatusBadge } from "@/components/sections/Products";
import { RollingNumber } from "@/components/ui/rolling-number";
import { useLang } from "@/lib/i18n";
import { ui2, tr, type CaseStudy } from "@/lib/site";
import { useVercelStatus } from "@/hooks/use-vercel-status";

function Block({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className="grid gap-4 border-t border-border py-10 md:grid-cols-[200px_1fr]"
    >
      <h2 className="mono text-[11px] uppercase tracking-[0.2em] text-brand">{title}</h2>
      <div className="max-w-2xl text-base leading-relaxed text-foreground/90">{children}</div>
    </motion.section>
  );
}

function Result({ value, label }: { value: string; label: string }) {
  const num = /^\d+$/.test(value) ? parseInt(value, 10) : null;
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5">
      <p className="text-3xl font-semibold tracking-tight">
        {num !== null ? <RollingNumber value={num} /> : <span className="text-brand">{value}</span>}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function CaseStudyView({ c, next }: { c: CaseStudy; next: CaseStudy }) {
  const { lang } = useLang();
  const status = useVercelStatus();

  return (
    <article className="container-x pb-24 pt-28">
      <Link href={`/${lang}#work`} className="mono inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} /> {tr(ui2.caseStudy.back, lang)}
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end"
      >
        <div>
          <p className="mono text-xs uppercase tracking-[0.2em] text-brand">{tr(c.role, lang)} · {c.year}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{c.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{tr(c.subtitle, lang)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {c.demo && (
              <a
                href={c.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background"
              >
                {tr(ui2.caseStudy.openDemo, lang)} <ArrowUpRight size={14} />
              </a>
            )}
            {c.repo && (
              <a
                href={c.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm"
              >
                <GithubIcon className="h-3.5 w-3.5" /> {tr(ui2.caseStudy.openRepo, lang)}
              </a>
            )}
            <StatusBadge project={c.vercelProject} status={status} />
          </div>
        </div>

        {c.demo ? (
          <BrowserFrame url={c.demo} status={<StatusBadge project={c.vercelProject} status={status} compact />}>
            {c.image ? (
              <Image src={c.image} alt={c.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-top" />
            ) : (
              <iframe
                src={c.demo}
                title={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}
          </BrowserFrame>
        ) : c.image ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
            <Image src={c.image} alt={c.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-top" />
          </div>
        ) : null}
      </motion.header>

      <div className="mt-14">
        <Block title={tr(ui2.caseStudy.stack, lang)}>
          <div className="flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <span key={s} className="mono rounded-md border border-border bg-surface/60 px-2 py-1 text-xs">
                {s}
              </span>
            ))}
          </div>
        </Block>
        <Block title={tr(ui2.caseStudy.problem, lang)}>{tr(c.problem, lang)}</Block>
        <Block title={tr(ui2.caseStudy.solution, lang)}>{tr(c.solution, lang)}</Block>
        <Block title={tr(ui2.caseStudy.highlights, lang)}>
          <ul className="space-y-2">
            {c.highlights.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span className="mono mt-1 text-xs text-brand">0{i + 1}</span>
                <span>{tr(h, lang)}</span>
              </li>
            ))}
          </ul>
        </Block>
        {c.architecture && (
          <Block title={tr(ui2.caseStudy.architecture, lang)}>
            <p className="mono rounded-2xl border border-border bg-surface/60 p-4 text-sm leading-relaxed">{tr(c.architecture, lang)}</p>
          </Block>
        )}
        <Block title={tr(ui2.caseStudy.results, lang)}>
          <div className="grid gap-3 sm:grid-cols-3">
            {c.results.map((r, i) => (
              <Result key={i} value={r.value} label={tr(r.label, lang)} />
            ))}
          </div>
        </Block>
        <Block title={tr(ui2.caseStudy.lessons, lang)}>
          <p className="serif text-xl italic leading-relaxed">“{tr(c.lessons, lang)}”</p>
        </Block>
      </div>

      <Link
        href={`/${lang}/work/${next.slug}`}
        className="group mt-6 flex items-center justify-between rounded-3xl border border-border bg-surface/60 p-6 transition-colors hover:border-brand/40"
      >
        <div>
          <p className="mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{tr(ui2.caseStudy.next, lang)}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{next.title}</p>
        </div>
        <ArrowRight className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
