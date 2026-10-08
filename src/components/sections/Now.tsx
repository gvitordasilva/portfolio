"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, useInView } from "motion/react";
import { useTheme } from "next-themes";
import { GitCommitHorizontal, MapPin, Hammer, BookOpen, Clock } from "lucide-react";
import { HaloBadge } from "@/components/ui/halo-badge";
import { useLang } from "@/lib/i18n";
import { skills } from "@/lib/content";
import { ui2, tr, timeAgo } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ---- Globo COBE, leve, marcador em Joinville ---- */
function Globe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { margin: "100px" });
  const { resolvedTheme } = useTheme();
  const phi = useRef(0);

  useEffect(() => {
    if (!ref.current || !inView) return;
    const dark = resolvedTheme !== "light";
    const size = ref.current.offsetWidth;
    const globe = createGlobe(ref.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.25,
      dark: dark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: dark ? 6 : 3,
      baseColor: dark ? [0.12, 0.14, 0.18] : [0.9, 0.92, 0.96],
      markerColor: [0.2, 0.9, 0.64],
      glowColor: dark ? [0.05, 0.08, 0.1] : [0.85, 0.9, 0.95],
      markers: [{ location: [-26.3, -48.85], size: 0.08 }],
    });
    let raf = 0;
    const loop = () => {
      phi.current += 0.004;
      globe.update({ phi: phi.current });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
    };
  }, [inView, resolvedTheme]);

  return (
    <div ref={wrap} className={cn("relative aspect-square w-full", className)}>
      <canvas ref={ref} className="h-full w-full" style={{ contain: "layout paint size" }} />
    </div>
  );
}

function LocalClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="mono tabular-nums">{time}</span>;
}

type GH = {
  available: boolean;
  lastCommit?: { repo: string; message: string; at: string; url: string } | null;
  pushes30d?: number;
  publicRepos?: number | null;
};

function Card({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface/70 p-5 backdrop-blur",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function Label({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className="mono mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      <span className="text-brand">{icon}</span>
      {children}
    </p>
  );
}

export function Now() {
  const { lang } = useLang();
  const [gh, setGh] = useState<GH | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : { available: false }))
      .then(setGh)
      .catch(() => setGh({ available: false }));
  }, []);

  const stackNow = ["Next.js 16", "Supabase", "Inngest", "Java 17", "Spring Boot", "Kafka"];

  return (
    <section id="now" className="container-x section-y !pt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* Localização + globo */}
        <Card className="md:col-span-2 md:row-span-2">
          <Label icon={<MapPin size={12} />}>{tr(ui2.now.location, lang)}</Label>
          <Globe className="mx-auto max-w-[260px]" />
          <div className="mt-2 flex items-center justify-between">
            <HaloBadge live variant="outline" className="text-[11px]">
              {tr(ui2.now.available, lang)}
            </HaloBadge>
            <span className="mono text-xs text-muted-foreground">UTC-3</span>
          </div>
        </Card>

        {/* Horário */}
        <Card className="md:col-span-2" delay={0.05}>
          <Label icon={<Clock size={12} />}>{tr(ui2.now.localTime, lang)}</Label>
          <p className="text-3xl font-semibold tracking-tight">
            <LocalClock />
          </p>
          <p className="mt-1 text-xs text-muted-foreground">America/Sao_Paulo</p>
        </Card>

        {/* Construindo */}
        <Card className="md:col-span-2" delay={0.1}>
          <Label icon={<Hammer size={12} />}>{tr(ui2.now.building, lang)}</Label>
          <p className="text-lg font-medium leading-snug">{tr(ui2.now.buildingWhat, lang)}</p>
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand/20 blur-2xl" />
        </Card>

        {/* Último commit */}
        <Card className="md:col-span-2" delay={0.15}>
          <Label icon={<GitCommitHorizontal size={12} />}>{tr(ui2.now.lastCommit, lang)}</Label>
          {gh?.available && gh.lastCommit ? (
            <a href={gh.lastCommit.url} target="_blank" rel="noreferrer" className="group block">
              <p className="mono truncate text-sm group-hover:text-brand">{gh.lastCommit.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {gh.lastCommit.repo} · {timeAgo(gh.lastCommit.at, lang)}
                {typeof gh.pushes30d === "number" && ` · ${gh.pushes30d} pushes / 30d`}
              </p>
            </a>
          ) : gh?.available ? (
            <a href="https://github.com/gvitordasilva" target="_blank" rel="noreferrer" className="group block">
              <p className="mono text-sm group-hover:text-brand">github.com/gvitordasilva</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {typeof gh.publicRepos === "number" && `${gh.publicRepos} repos`}
                {typeof gh.pushes30d === "number" && ` · ${gh.pushes30d} pushes / 30d`}
              </p>
            </a>
          ) : (
            <p className="mono text-sm text-muted-foreground">{gh === null ? "…" : "github.com/gvitordasilva"}</p>
          )}
        </Card>

        {/* Stack do momento */}
        <Card className="md:col-span-2" delay={0.2}>
          <Label icon={<BookOpen size={12} />}>{tr(ui2.now.stack, lang)}</Label>
          <div className="flex flex-wrap gap-1.5">
            {stackNow.map((s) => (
              <span key={s} className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {tr(ui2.now.reading, lang)}: {tr(ui2.now.readingWhat, lang)}
          </p>
        </Card>
      </div>

      {/* Marquee da stack completa */}
      <div className="relative mt-6 w-full max-w-full overflow-hidden rounded-2xl border border-border bg-surface/40 py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-8">
              {skills.flatMap((g) => g.items).map((s, i) => (
                <span key={`${k}-${i}`} className="mono text-xs text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
