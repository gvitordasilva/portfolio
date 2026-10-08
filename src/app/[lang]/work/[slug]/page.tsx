import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/site";
import { locales, type Locale } from "@/lib/locales";
import { CaseStudyView } from "@/components/work/CaseStudyView";
import { Footer } from "@/components/sections/Footer";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((lang) => caseStudies.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.subtitle[lang],
    openGraph: { title: c.title, description: c.subtitle[lang], url: `/${lang}/work/${slug}` },
    alternates: { canonical: `/${lang}/work/${slug}`, languages: { "pt-BR": `/pt/work/${slug}`, en: `/en/work/${slug}` } },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = (await params) as { lang: Locale; slug: string };
  const index = caseStudies.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const c = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <main>
        <CaseStudyView c={c} next={next} />
      </main>
      <Footer />
    </>
  );
}
