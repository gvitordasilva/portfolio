import { NextResponse } from "next/server";
import { profile } from "@/lib/content";

type Body = { name?: string; email?: string; message?: string; website?: string };

const hits = new Map<string, { n: number; t: number }>();

function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 3600000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 5;
}

/* Formulário de contato → Resend (RESEND_API_KEY). Sem chave, responde
 * { ok: false, fallback: true } e o front abre WhatsApp/e-mail. */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as Body;
  // honeypot
  if (body.website) return NextResponse.json({ ok: true });

  const name = body.name?.trim().slice(0, 120);
  const email = body.email?.trim().slice(0, 160);
  const message = body.message?.trim().slice(0, 4000);
  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: false, fallback: true });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfólio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? profile.email],
      reply_to: email,
      subject: `[Portfólio] ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
  return NextResponse.json({ ok: true });
}
