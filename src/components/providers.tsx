"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LangProvider, type Locale } from "@/lib/i18n";

export function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LangProvider initial={lang}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: "glass !rounded-2xl !text-foreground !border-border",
          }}
        />
      </LangProvider>
    </ThemeProvider>
  );
}
