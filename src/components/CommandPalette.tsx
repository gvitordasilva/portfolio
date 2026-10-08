"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { profile, ui, t } from "@/lib/content";
import { nav, caseStudies, ui2, tr } from "@/lib/site";
import { nextPalette } from "@/components/shader/shader-store";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void | Promise<void>;
};

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function CommandPalette() {
  const { lang, toggle } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const goSection = (id: string) => {
      close();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else router.push(`/${lang}#${id}`);
    };

    const navItems: Item[] = nav.map((n, i) => ({
      id: `nav-${n.id}`,
      group: t(ui.palette.navigate, lang),
      label: tr(n.label, lang),
      hint: `0${i + 1}`,
      run: () => goSection(n.id),
    }));

    const cases: Item[] = caseStudies.map((c) => ({
      id: `case-${c.slug}`,
      group: tr(ui2.work.eyebrow, lang),
      label: c.title,
      hint: tr(c.subtitle, lang),
      run: () => {
        close();
        router.push(`/${lang}/work/${c.slug}`);
      },
    }));

    const actions: Item[] = [
      {
        id: "copy-email",
        group: t(ui.palette.actions, lang),
        label: t(ui.palette.copyEmail, lang),
        hint: profile.email,
        run: async () => {
          await navigator.clipboard.writeText(profile.email);
          toast(t(ui.palette.copied, lang));
          close();
        },
      },
      {
        id: "resume",
        group: t(ui.palette.actions, lang),
        label: tr(ui2.resume.title, lang),
        hint: "/resume",
        run: () => {
          close();
          router.push(`/${lang}/resume`);
        },
      },
      {
        id: "theme",
        group: t(ui.palette.actions, lang),
        label: tr(ui2.dock.theme, lang),
        hint: resolvedTheme === "dark" ? "light" : "dark",
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          close();
        },
      },
      {
        id: "lang",
        group: t(ui.palette.actions, lang),
        label: t(ui.palette.switchLang, lang),
        hint: lang === "pt" ? "EN" : "PT",
        run: () => {
          toggle();
          close();
        },
      },
      {
        id: "present",
        group: t(ui.palette.actions, lang),
        label: lang === "pt" ? "Modo apresentação" : "Presentation mode",
        hint: "P",
        run: () => {
          document.documentElement.classList.toggle("presenting");
          close();
        },
      },
      {
        id: "shader",
        group: t(ui.palette.actions, lang),
        label: lang === "pt" ? "Remixar shader" : "Remix shader",
        hint: "↑↑↓↓←→←→BA",
        run: () => {
          nextPalette();
          close();
        },
      },
      {
        id: "github",
        group: t(ui.palette.actions, lang),
        label: t(ui.palette.openGithub, lang),
        hint: "github.com/gvitordasilva",
        run: () => {
          window.open(profile.github, "_blank", "noopener");
          close();
        },
      },
      {
        id: "linkedin",
        group: t(ui.palette.actions, lang),
        label: t(ui.palette.openLinkedin, lang),
        run: () => {
          window.open(profile.linkedin, "_blank", "noopener");
          close();
        },
      },
      {
        id: "whatsapp",
        group: t(ui.palette.actions, lang),
        label: t(ui.palette.openWhatsapp, lang),
        run: () => {
          window.open(`https://wa.me/${profile.whatsapp}`, "_blank", "noopener");
          close();
        },
      },
    ];

    return [...navItems, ...cases, ...actions];
  }, [lang, close, router, toggle, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return items;
    return items.filter((i) => normalize(`${i.label} ${i.hint ?? ""} ${i.group}`).includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[index]?.run();
    }
  };

  const groups = useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach((i) => map.set(i.group, [...(map.get(i.group) ?? []), i]));
    return [...map.entries()];
  }, [filtered]);

  let flat = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/60 p-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="glass w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <span className="mono text-xs text-brand">⌘K</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder={t(ui.palette.placeholder, lang)}
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="mono rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {groups.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">{t(ui.palette.empty, lang)}</p>
              )}
              {groups.map(([group, list]) => (
                <div key={group} className="mb-1">
                  <p className="mono px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{group}</p>
                  {list.map((item) => {
                    flat += 1;
                    const i = flat;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => item.run()}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          i === index ? "bg-brand/15 text-foreground" : "text-foreground/80 hover:bg-muted"
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.hint && <span className="mono ml-4 truncate text-[11px] text-muted-foreground">{item.hint}</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
