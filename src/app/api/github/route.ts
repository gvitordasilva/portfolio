import { NextResponse } from "next/server";

export const revalidate = 900;

const USER = "gvitordasilva";

type Event = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { commits?: { message: string; sha: string }[]; ref?: string };
};

/* Último push público e contagem de repositórios. Token opcional
 * (GITHUB_TOKEN) só aumenta o rate limit. */
export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "gvitordasilva-portfolio",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const [eventsRes, userRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}/events/public?per_page=50`, { headers, next: { revalidate: 900 } }),
      fetch(`https://api.github.com/users/${USER}`, { headers, next: { revalidate: 3600 } }),
    ]);
    if (!eventsRes.ok) return NextResponse.json({ available: false });

    const events = (await eventsRes.json()) as Event[];
    const push = events.find((e) => e.type === "PushEvent" && e.payload.commits?.length);
    const user = userRes.ok ? ((await userRes.json()) as { public_repos: number; followers: number }) : null;

    const lastCommit = push
      ? {
          repo: push.repo.name.replace(`${USER}/`, ""),
          message: push.payload.commits![push.payload.commits!.length - 1].message.split("\n")[0].slice(0, 80),
          at: push.created_at,
          url: `https://github.com/${push.repo.name}`,
        }
      : null;

    const pushes30d = events.filter(
      (e) => e.type === "PushEvent" && Date.now() - new Date(e.created_at).getTime() < 30 * 86400000
    ).length;

    return NextResponse.json(
      { available: true, lastCommit, publicRepos: user?.public_repos ?? null, pushes30d },
      { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" } }
    );
  } catch {
    return NextResponse.json({ available: false });
  }
}
