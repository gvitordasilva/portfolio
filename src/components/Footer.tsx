"use client";

import { useLang } from "@/lib/i18n";
import { profile, ui, t } from "@/lib/content";

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t(ui.footer.rights, lang)}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mono text-xs transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mono text-xs transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <p className="mono text-xs">{t(ui.footer.built, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
