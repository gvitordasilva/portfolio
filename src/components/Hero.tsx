"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { profile, stats, ui, t } from "@/lib/content";
import { CodeCard } from "./CodeCard";
import { Magnetic } from "./Magnetic";

/* Valor de stat com contagem animada quando entra na tela ("6+" → 0..6+). */
function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, parseInt(match[1], 10), {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${Math.round(v)}${match[2]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{display}</span>;
}

export function Hero() {
  const { lang } = useLang();
  const headlineLines = t(profile.headline, lang).split("\n");

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25]" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]">
        <div className="blob-a absolute -top-32 left-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="blob-b absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-accent-2/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.available && (
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {t(ui.hero.badge, lang)}
              </span>
            )}

            <p className="mono mb-4 text-sm text-accent">
              {t(profile.role, lang)}
            </p>

            <h1 className="text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl">
              {headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {i === headlineLines.length - 1 ? (
                    <span className="serif italic font-normal text-gradient">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {t(profile.subheadline, lang)}
            </p>

            <p className="mono mt-4 text-sm text-faint">
              {t(profile.location, lang)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-block rounded-lg bg-accent px-6 py-3 font-medium text-[#04120c] shadow-glow"
                >
                  {t(ui.hero.ctaPrimary, lang)}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-block rounded-lg border border-border bg-surface/40 px-6 py-3 font-medium text-text backdrop-blur transition-colors hover:border-accent"
                >
                  {t(ui.hero.ctaSecondary, lang)}
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Code card — só em telas grandes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <CodeCard />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.value}>
              <div className="text-2xl font-bold text-text sm:text-3xl">
                <StatValue value={s.value} />
              </div>
              <div className="mt-1 text-xs text-muted">{t(s.label, lang)}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="mono flex flex-col items-center gap-2 text-xs text-faint"
        >
          {t(ui.hero.scroll, lang)}
          <span className="h-8 w-px bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
