"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { Moon, Sun, X, ArrowUpRight, Languages } from "lucide-react";
import {
  DynamicContainer,
  DynamicIsland,
  DynamicIslandProvider,
  useDynamicIslandSize,
} from "@/components/ui/dynamic-island";
import { useLang } from "@/lib/i18n";
import { profile } from "@/lib/content";
import { nav, ui2, tr } from "@/lib/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = nav.map((n) => n.id);

function Island() {
  const { lang, toggle } = useLang();
  const { setSize } = useDynamicIslandSize();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const isHome = /^\/(pt|en)\/?$/.test(pathname ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSize(open ? "tall" : "compact");
  }, [open, setSize]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = nav.find((n) => n.id === active) ?? nav[0];

  const go = (id: string) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${lang}#${id}`);
    }
  };

  return (
    <DynamicIsland id="island-nav">
      {!open ? (
        <DynamicContainer
          key="compact"
          className="flex h-full w-full cursor-pointer items-center justify-between px-3 text-white"
        >
          <button
            type="button"
            aria-label={tr(ui2.island.menu, lang)}
            onClick={() => setOpen(true)}
            className="flex h-full w-full items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-[10px] font-bold text-black">
                {profile.initials}
              </span>
              <span className="text-[13px] font-semibold tracking-tight">
                {scrolled && isHome ? tr(current.label, lang) : profile.name.split(" ")[0]}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              {profile.available && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
              )}
              <span className="mono text-[10px] text-white/50">{lang.toUpperCase()}</span>
            </span>
          </button>
        </DynamicContainer>
      ) : (
        <DynamicContainer key="menu" className="flex h-full w-full flex-col p-3 text-left text-white">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              {tr(ui2.island.menu, lang)}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={tr(ui2.island.close, lang)}
              className="grid h-6 w-6 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X size={12} />
            </button>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-1.5">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                className={cn(
                  "rounded-xl px-2 py-2 text-[12px] font-medium transition-colors",
                  active === n.id && isHome ? "bg-brand text-black" : "bg-white/8 hover:bg-white/15"
                )}
              >
                {tr(n.label, lang)}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/8 py-2 text-[12px] hover:bg-white/15"
            >
              {resolvedTheme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
              {tr(ui2.dock.theme, lang)}
            </button>
            <button
              type="button"
              onClick={() => {
                toggle();
                setOpen(false);
              }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/8 py-2 text-[12px] hover:bg-white/15"
            >
              <Languages size={13} />
              {tr(ui2.dock.lang, lang)}
            </button>
            <a
              href={`/${lang}/resume`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/8 py-2 text-[12px] hover:bg-white/15"
            >
              {tr(ui2.dock.resume, lang)}
              <ArrowUpRight size={13} />
            </a>
          </div>
        </DynamicContainer>
      )}
    </DynamicIsland>
  );
}

export function IslandNav() {
  return (
    <div className="hide-presenting pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <div className="pointer-events-auto">
        <DynamicIslandProvider initialSize="compact">
          <Island />
        </DynamicIslandProvider>
      </div>
      <AnimatePresence>
        <motion.div
          key="progress"
          className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-brand/60"
          style={{ scaleX: 0 }}
          id="scroll-progress"
        />
      </AnimatePresence>
    </div>
  );
}
