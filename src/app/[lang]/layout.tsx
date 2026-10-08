import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LangProvider } from "@/lib/i18n";
import { locales, type Locale } from "@/lib/locales";
import { profile } from "@/lib/content";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Qualquer segmento fora de /pt e /en vira 404.
export const dynamicParams = false;

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const title = `${profile.name} — ${profile.role[lang]}`;
  const description = profile.subheadline[lang];

  return {
    metadataBase: new URL(profile.siteUrl),
    title,
    description,
    keywords: [
      lang === "pt" ? "desenvolvedor full stack" : "full stack developer",
      "Java",
      "Spring Boot",
      "React",
      "Angular",
      "TypeScript",
      profile.name,
    ],
    authors: [{ name: profile.name, url: profile.github }],
    creator: profile.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    },
    openGraph: {
      title,
      description,
      url: `/${lang}`,
      siteName: profile.name,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [
        { url: `/og/og-${lang}.png`, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og/og-${lang}.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { lang } = (await params) as { lang: Locale };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `${profile.siteUrl}/${lang}`,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role[lang],
    knowsLanguage: ["pt-BR", "en"],
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      className={`${inter.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider initial={lang}>{children}</LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
