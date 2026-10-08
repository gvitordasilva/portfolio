"use client";

import { useLang } from "@/lib/i18n";
import { profile } from "@/lib/content";
import { ui2, tr } from "@/lib/site";

export function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="hide-print container-x border-t border-border py-10 pb-28 md:pb-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="serif text-2xl italic">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            © {year} · {tr(ui2.footer.rights, lang)}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm md:items-end">
          <div className="flex gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-brand">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand">LinkedIn</a>
            <a href="https://github.com/gvitordasilva/portfolio" target="_blank" rel="noreferrer" className="hover:text-brand">
              {tr(ui2.footer.source, lang)}
            </a>
          </div>
          <p className="mono text-xs text-muted-foreground">{tr(ui2.footer.built, lang)}</p>
          <p className="mono hidden text-[11px] text-muted-foreground md:block">
            {tr(ui2.footer.shortcuts, lang)}: <kbd className="rounded border border-border px-1">⌘K</kbd>{" "}
            <kbd className="rounded border border-border px-1">P</kbd>{" "}
            <kbd className="rounded border border-border px-1">↑↑↓↓←→←→BA</kbd>
          </p>
        </div>
      </div>
    </footer>
  );
}
