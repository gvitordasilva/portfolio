"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ShaderBackground } from "@/components/shader/ShaderBackground";
import { RollingNumber } from "@/components/ui/rolling-number";
import { SplitWords } from "@/components/SplitWords";
import { HaloButton } from "@/components/ui/halo-button";
import { HaloBadge } from "@/components/ui/halo-badge";
import { useLang } from "@/lib/i18n";
import { profile } from "@/lib/content";
import { products, ui2, tr } from "@/lib/site";
import { useVercelStatus } from "@/hooks/use-vercel-status";

function Stat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const v = inView ? value : 0;
  return (
    <div ref={ref} className="flex flex-col">
      <span className="flex items-baseline text-3xl font-semibold tracking-tight sm:text-4xl">
        <RollingNumber value={v} />
        <span className="text-brand">{suffix}</span>
      </span>
      <span className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}

export function Hero() {
  const { lang } = useLang();
  const status = useVercelStatus();
  const live = status?.available ? Object.values(status.projects).filter((p) => p.state === "READY").length : products.length;
  const deploys = status?.available ? status.deploys30d : 0;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
      <ShaderBackground />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {profile.available && (
              <HaloBadge live variant="outline" className="text-xs">
                {tr(ui2.now.available, lang)}
              </HaloBadge>
            )}
            <span className="mono text-xs text-muted-foreground">{tr(ui2.hero.eyebrow, lang)}</span>
          </div>

          <h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            <SplitWords text={tr(ui2.hero.headline, lang)} delay={0.15} highlightLast={lang === "pt" ? 3 : 2} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            {tr(ui2.hero.sub, lang)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <HaloButton type="button" onClick={() => scrollTo("products")} className="h-11 px-5 text-sm">
              {tr(ui2.hero.ctaWork, lang)}
            </HaloButton>
            <a
              href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
                lang === "pt" ? "Oi Gabriel, vi seu portfólio e quero conversar." : "Hi Gabriel, I saw your portfolio and would like to talk."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface/60 px-5 text-sm backdrop-blur transition-colors hover:border-brand/50 hover:text-foreground"
            >
              {tr(ui2.hero.ctaTalk, lang)}
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8"
          >
            <Stat value={profile.yearsExperience} suffix="+" label={tr(ui2.hero.statYears, lang)} />
            <Stat value={live} label={tr(ui2.hero.statLive, lang)} />
            <Stat value={deploys} label={tr(ui2.hero.statDeploys, lang)} />
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo("now")}
        aria-label={tr(ui2.hero.scroll, lang)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="hide-presenting absolute bottom-28 right-8 hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:flex"
      >
        {tr(ui2.hero.scroll, lang)}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}
