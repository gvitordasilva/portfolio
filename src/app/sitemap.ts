import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";
import { caseStudies } from "@/lib/site";
import { locales } from "@/lib/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  const now = new Date();
  const alt = (path: string) => ({ languages: { "pt-BR": `${base}/pt${path}`, en: `${base}/en${path}` } });

  const entries: MetadataRoute.Sitemap = [];
  for (const lang of locales) {
    entries.push({ url: `${base}/${lang}`, lastModified: now, changeFrequency: "weekly", priority: 1, alternates: alt("") });
    entries.push({ url: `${base}/${lang}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.7, alternates: alt("/resume") });
    for (const c of caseStudies) {
      entries.push({
        url: `${base}/${lang}/work/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alt(`/work/${c.slug}`),
      });
    }
  }
  return entries;
}
