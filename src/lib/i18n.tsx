"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Locale } from "./locales";

export type { Locale };
export { locales, defaultLocale, isLocale } from "./locales";

type LangContextValue = {
  lang: Locale;
  setLang: (l: Locale) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

const COOKIE_KEY = "portfolio-lang";

/* Troca de idioma instantânea no client: atualiza estado + URL (/pt ↔ /en)
 * sem re-navegar. O cookie guarda a preferência para o middleware
 * redirecionar certo na próxima visita. */
function persist(l: Locale) {
  document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  document.cookie = `${COOKIE_KEY}=${l};path=/;max-age=31536000;samesite=lax`;
  window.history.replaceState(null, "", `/${l}${window.location.hash}`);
}

export function LangProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial: Locale;
}) {
  const [lang, setLangState] = useState<Locale>(initial);

  useEffect(() => {
    persist(lang);
  }, [lang]);

  const setLang = useCallback((l: Locale) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((p) => (p === "pt" ? "en" : "pt")),
    []
  );

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Pick a localized value from a { pt, en } pair. */
export function pick<T>(pair: { pt: T; en: T }, lang: Locale): T {
  return pair[lang];
}
