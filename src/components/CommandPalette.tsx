"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { profile, ui, t } from "@/lib/content";

type Item = {
  id: string;
  group: "navigate" | "actions";
  label: string;
  hint?: string;
  run: () => void | Promise<void>;
};

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function CommandPalette() {
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    setCopied(false);
  }, []);

  const items = useMemo<Item[]>(() => {
    const nav = (["about", "skills", "projects", "experience", "services", "testimonials", "contact"] as const).map(
      (id, i) => ({
        id,
        group: "navigate" as const,
        label: t(ui.nav[id], lang),
        hint: `0${i + 1}`,
        run: () => {
          close();
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        },
      })
    );

    const actions: Item[] = [
      {
        id: "copy-email",
        group: "actions",
        label: copied ? t(ui.palette.copied, lang) : t(ui.palette.copyEmail, lang),
        hint: profile.email,
        run: async () => {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          setTimeout(close, 900);
        },
      },
      {
        id: "lang",
        group: "actions",
        label: t(ui.palette.switchLang, lang),
        hint: lang === "pt" ? "EN" : "PT",
        run: () => {
          toggle();
          close();
        },
      },
      {
        id: "github",
        group: "actions",
        label: t(ui.palette.openGithub, lang),
        hint: "↗",
        run: () => {
          window.open(profile.github, "_blank", "noopener,noreferrer");
          close();
        },
      },
      {
        id: "linkedin",
        group: "actions",
        label: t(ui.palette.openLinkedin, lang),
        hint: "↗",
        run: () => {
          window.open(profile.linkedin, "_blank", "noopener,noreferrer");
          close();
        },
      },
      {
        id: "whatsapp",
        group: "actions",
        label: t(ui.palette.openWhatsapp, lang),
        hint: "↗",
        run: () => {
          window.open(`https://wa.me/${profile.whatsapp}`, "_blank", "noopener,noreferrer");
          close();
        },
      },
    ];

    return [...nav, ...actions];
  }, [lang, copied, close, toggle]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = normalize(query);
    return items.filter((i) => normalize(i.label).includes(q));
  }, [items, query]);

  // Atalho global Ctrl/⌘+K + evento disparado pelo botão do nav.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpenEvent);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  function onInputKey(e: React.KeyboardEvent) {
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
  }

  const groups: { key: Item["group"]; label: string }[] = [
    { key: "navigate", label: t(ui.palette.navigate, lang) },
    { key: "actions", label: t(ui.palette.actions, lang) },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-bg/70 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-[18vh] w-[min(560px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-surface shadow-glow"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              placeholder={t(ui.palette.placeholder, lang)}
              className="w-full border-b border-border bg-transparent px-5 py-4 text-sm text-text placeholder:text-faint outline-none"
            />
            <div className="max-h-[46vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-faint">
                  {t(ui.palette.empty, lang)}
                </p>
              )}
              {groups.map((g) => {
                const groupItems = filtered.filter((i) => i.group === g.key);
                if (groupItems.length === 0) return null;
                return (
                  <div key={g.key} className="mb-1">
                    <p className="mono px-3 pb-1 pt-2 text-[10px] uppercase tracking-widest text-faint">
                      {g.label}
                    </p>
                    {groupItems.map((item) => {
                      const i = filtered.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          onClick={() => item.run()}
                          onMouseEnter={() => setIndex(i)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            i === index
                              ? "bg-accent-soft text-accent"
                              : "text-muted"
                          }`}
                        >
                          {item.label}
                          {item.hint && (
                            <span className="mono text-xs text-faint">
                              {item.hint}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="mono flex items-center gap-4 border-t border-border px-5 py-2.5 text-[10px] text-faint">
              <span>↑↓</span>
              <span>↵</span>
              <span>esc</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
