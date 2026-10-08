"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { nav, ui2, tr } from "@/lib/site";
import { nextPalette } from "@/components/shader/shader-store";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/* Atalhos globais:
 *  P            → modo apresentação (esconde nav/dock, tipografia maior)
 *  ←/→ ou J/K   → navega entre seções no modo apresentação
 *  Konami code  → remixa as cores do shader
 *  ⌘K           → paleta de comandos (tratado no CommandPalette)
 */
export function Shortcuts() {
  const { lang } = useLang();

  useEffect(() => {
    let buffer: string[] = [];
    const ids = nav.map((n) => n.id);

    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
    };

    const step = (dir: 1 | -1) => {
      const y = window.scrollY + window.innerHeight * 0.4;
      const positions = ids
        .map((id) => ({ id, top: (document.getElementById(id)?.offsetTop ?? -1) }))
        .filter((p) => p.top >= 0)
        .sort((a, b) => a.top - b.top);
      let idx = positions.findIndex((p, i) => p.top <= y && (positions[i + 1]?.top ?? Infinity) > y);
      if (idx < 0) idx = 0;
      const next = positions[Math.min(Math.max(idx + dir, 0), positions.length - 1)];
      document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth" });
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTyping()) return;

      buffer = [...buffer, e.key].slice(-KONAMI.length);
      if (buffer.join(",") === KONAMI.join(",")) {
        nextPalette();
        toast(tr(ui2.island.konami, lang));
        buffer = [];
      }

      const html = document.documentElement;
      if (e.key.toLowerCase() === "p" && !e.metaKey && !e.ctrlKey) {
        const on = html.classList.toggle("presenting");
        if (on) toast(tr(ui2.island.presenting, lang));
      }
      if (e.key === "Escape") html.classList.remove("presenting");

      if (html.classList.contains("presenting")) {
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "j") step(1);
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "k") step(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lang]);

  return null;
}
