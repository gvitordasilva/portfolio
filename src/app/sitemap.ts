import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  const languages = { "pt-BR": `${base}/pt`, en: `${base}/en` };

  return [
    {
      url: `${base}/pt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${base}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
