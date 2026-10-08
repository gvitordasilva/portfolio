"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { profile, ui, t } from "@/lib/content";

const links = [
  { id: "about", label: ui.nav.about },
  { id: "skills", label: ui.nav.skills },
  { id: "projects", label: ui.nav.projects },
  { id: "experience", label: ui.nav.experience },
  { id: "services", label: ui.nav.services },
  { id: "testimonials", label: ui.nav.testimonials },
  { id: "contact", label: ui.nav.contact },
];

export function Nav() {
  const { lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    setIsMac(/mac/i.test(navigator.userAgent));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="group flex items-center gap-2 text-sm font-semibold"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface font-bold text-accent transition-colors group-hover:border-accent">
            {profile.initials}
          </span>
          <span className="hidden whitespace-nowrap 2xl:inline">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="nav-link text-sm text-muted transition-colors hover:text-text"
            >
              <span className="mono mr-1 text-xs text-faint">
                0{i + 1}
              </span>
              {t(l.label, lang)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            aria-label="Command palette"
            className="mono hidden items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-text md:flex"
          >
            {t(ui.palette.hint, lang)}
            <kbd className="rounded border border-border bg-bg/60 px-1.5 py-0.5 text-[10px] text-faint">
              {isMac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>

          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="mono rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-text"
          >
            <span className={lang === "pt" ? "text-accent" : ""}>PT</span>
            <span className="mx-1 text-faint">/</span>
            <span className={lang === "en" ? "text-accent" : ""}>EN</span>
          </button>

          <a
            href="#contact"
            className="hidden whitespace-nowrap rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-[#04120c] transition-transform hover:-translate-y-0.5 lg:inline-block"
          >
            {t(ui.hero.ctaPrimary, lang)}
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface md:hidden"
          >
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-4 bg-text transition-transform ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-text transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-text transition-transform ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {links.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-3 text-muted transition-colors hover:text-text"
              >
                <span className="mono text-xs text-faint">0{i + 1}</span>
                {t(l.label, lang)}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
      />
    </header>
  );
}
