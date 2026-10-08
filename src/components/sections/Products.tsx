"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { BrowserFrame } from "@/components/BrowserFrame";
import { HaloBadge } from "@/components/ui/halo-badge";
import { useLang } from "@/lib/i18n";
import { products, caseStudies, ui2, tr, timeAgo } from "@/lib/site";
import { useVercelStatus, type VercelStatus } from "@/hooks/use-vercel-status";
import { cn } from "@/lib/utils";

export function StatusBadge({
  project,
  status,
  compact = false,
}: {
  project?: string;
  status: VercelStatus | null;
  compact?: boolean;
}) {
  const { lang } = useLang();
  if (!project) return null;
  if (!status || !status.available) {
    return (
      <HaloBadge variant="ghost" className="text-[10px] text-muted-foreground">
        {status ? tr(ui2.products.statusUnknown, lang) : "…"}
      </HaloBadge>
    );
  }
  const p = status.projects[project];
  if (!p) {
    return (
      <HaloBadge variant="ghost" className="text-[10px] text-muted-foreground">
        {tr(ui2.products.statusUnknown, lang)}
      </HaloBadge>
    );
  }
  const ok = p.state === "READY";
  const building = p.state === "BUILDING" || p.state === "QUEUED" || p.state === "INITIALIZING";
  const label = ok ? ui2.products.statusReady : building ? ui2.products.statusBuilding : ui2.products.statusError;
  return (
    <HaloBadge
      live={ok || building}
      variant={ok ? "outline" : building ? "secondary" : "destructive"}
      className={cn("text-[10px]", ok && "text-brand")}
    >
      {tr(label, lang)}
      {!compact && ok && <span className="ml-1 text-muted-foreground">· {timeAgo(p.createdAt, lang)}</span>}
    </HaloBadge>
  );
}

const accentBg: Record<string, string> = {
  brand: "from-brand/30 via-brand/5 to-transparent",
  "brand-2": "from-brand-2/30 via-brand-2/5 to-transparent",
  "brand-3": "from-brand-3/30 via-brand-3/5 to-transparent",
};

export function Products() {
  const { lang } = useLang();
  const status = useVercelStatus();
  const featured = products.slice(0, 3);
  const rest = products.slice(3);

  return (
    <section id="products" className="container-x section-y">
      <SectionHeading
        eyebrow={tr(ui2.products.eyebrow, lang)}
        title={tr(ui2.products.title, lang)}
        sub={tr(ui2.products.sub, lang)}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {featured.map((p, i) => {
          const cs = caseStudies.find((c) => c.slug === p.slug);
          return (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col"
            >
              <a href={p.url} target="_blank" rel="noreferrer" className="block">
                <BrowserFrame
                  url={p.url}
                  status={<StatusBadge project={p.vercelProject} status={status} compact />}
                  className="transition-transform duration-500 group-hover:-translate-y-1"
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className={cn("absolute inset-0 bg-gradient-to-br", accentBg[p.accent])}>
                      <div className="absolute inset-0 grid-bg opacity-60" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="serif text-4xl italic tracking-tight">{p.name}</p>
                      </div>
                    </div>
                  )}
                </BrowserFrame>
              </a>

              <div className="mt-5 flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                    <p className="mono mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{tr(p.kind, lang)}</p>
                  </div>
                  <StatusBadge project={p.vercelProject} status={status} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{tr(p.tagline, lang)}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="mono rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-4 pt-5 text-sm">
                  <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium hover:text-brand">
                    {tr(ui2.products.open, lang)} <ArrowUpRight size={14} />
                  </a>
                  {cs && (
                    <Link href={`/${lang}/work/${cs.slug}`} className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                      <FileText size={14} /> {tr(ui2.products.caseStudy, lang)}
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {rest.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rest.map((p, i) => (
            <motion.a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-border bg-surface/60 p-4 transition-colors hover:border-brand/40"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-medium">
                  {p.name}
                  <ArrowUpRight size={14} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
                <p className="truncate text-sm text-muted-foreground">{tr(p.tagline, lang)}</p>
              </div>
              <StatusBadge project={p.vercelProject} status={status} compact />
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
