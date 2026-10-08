import { NextResponse } from "next/server";
import { products, caseStudies } from "@/lib/site";

export const revalidate = 600;

type Deployment = {
  uid: string;
  name: string;
  state: string;
  readyState?: string;
  created: number;
  createdAt?: number;
  url: string;
  target?: string | null;
};

const TOKEN = process.env.VERCEL_TOKEN;
const TEAM = process.env.VERCEL_TEAM_ID;

async function vercel<T>(path: string): Promise<T | null> {
  if (!TOKEN) return null;
  const url = new URL(`https://api.vercel.com${path}`);
  if (TEAM) url.searchParams.set("teamId", TEAM);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: 600 },
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

/* Status de produção dos produtos listados em `site.ts`, consultado na API da
 * Vercel com token read-only. Sem token, devolve `available: false` e o site
 * degrada para "status indisponível". */
export async function GET() {
  if (!TOKEN) return NextResponse.json({ available: false });

  const names = Array.from(
    new Set([
      ...products.map((p) => p.vercelProject),
      ...caseStudies.map((c) => c.vercelProject),
      "portfolio",
    ].filter((n): n is string => Boolean(n)))
  );

  const since = Date.now() - 30 * 24 * 60 * 60 * 1000;

  const [perProject, recent] = await Promise.all([
    Promise.all(
      names.map(async (name) => {
        const data = await vercel<{ deployments: Deployment[] }>(
          `/v6/deployments?app=${encodeURIComponent(name)}&target=production&limit=1`
        );
        const d = data?.deployments?.[0];
        return [name, d] as const;
      })
    ),
    vercel<{ deployments: Deployment[] }>(`/v6/deployments?limit=100&since=${since}`),
  ]);

  const projects: Record<string, { state: string; createdAt: number; url?: string }> = {};
  for (const [name, d] of perProject) {
    if (!d) continue;
    projects[name] = {
      state: (d.readyState ?? d.state ?? "READY").toUpperCase(),
      createdAt: d.createdAt ?? d.created,
      url: d.url ? `https://${d.url}` : undefined,
    };
  }

  const deploys30d = recent?.deployments?.filter((d) => (d.createdAt ?? d.created) >= since).length ?? 0;

  return NextResponse.json(
    { available: true, fetchedAt: Date.now(), deploys30d, projects },
    { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" } }
  );
}
