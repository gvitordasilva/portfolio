import Anthropic from "@anthropic-ai/sdk";
import { profile, about, skills, experience, services } from "@/lib/content";
import { products, caseStudies, principles } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.CHAT_MODEL ?? "claude-opus-5-5";
const DAILY_LIMIT = 20;

const hits = new Map<string, { n: number; day: string }>();
function limited(ip: string) {
  const day = new Date().toISOString().slice(0, 10);
  const h = hits.get(ip);
  if (!h || h.day !== day) {
    hits.set(ip, { n: 1, day });
    return false;
  }
  h.n += 1;
  return h.n > DAILY_LIMIT;
}

/* Contexto estável (cacheável) montado a partir do conteúdo do site. */
function buildContext() {
  const bl = (pair: { pt: string; en: string }) => `${pair.pt} / ${pair.en}`;
  const parts: string[] = [];
  parts.push(`# ${profile.name}\nCargo: ${bl(profile.role)}\nResumo: ${bl(profile.subheadline)}\nLocal: ${bl(profile.location)}\nAnos de experiência: ${profile.yearsExperience}+\nDisponível para remoto: ${profile.available ? "sim" : "não"}\nE-mail: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}`);
  parts.push(`## Sobre\n${about.paragraphs.map((p) => p.pt).join("\n")}`);
  parts.push(`## Stack\n${skills.map((g) => `${g.category.pt}: ${g.items.join(", ")}`).join("\n")}`);
  parts.push(
    `## Experiência\n${experience
      .map(
        (j) =>
          `- ${j.role.pt} @ ${j.company} (${j.period.pt}${j.location ? `, ${j.location.pt}` : ""}): ${j.description.pt}${
            j.highlights ? "\n  " + j.highlights.map((h) => `• ${h.pt}`).join("\n  ") : ""
          }\n  Stack: ${j.stack.join(", ")}`
      )
      .join("\n")}`
  );
  parts.push(`## Produtos no ar\n${products.map((p) => `- ${p.name} (${p.url}): ${p.tagline.pt}. Stack: ${p.stack.join(", ")}`).join("\n")}`);
  parts.push(
    `## Estudos de caso\n${caseStudies
      .map(
        (c) =>
          `### ${c.title} (${c.year}, ${c.role.pt})\nProblema: ${c.problem.pt}\nSolução: ${c.solution.pt}\nDecisões: ${c.highlights.map((h) => h.pt).join(" | ")}\nStack: ${c.stack.join(", ")}\nAprendizado: ${c.lessons.pt}`
      )
      .join("\n")}`
  );
  parts.push(`## Serviços\n${services.map((s) => `- ${s.title.pt}: ${s.description.pt}`).join("\n")}`);
  parts.push(`## Princípios de trabalho\n${principles.map((p) => `- ${p.title.pt}: ${p.body.pt}`).join("\n")}`);
  return parts.join("\n\n");
}

const CONTEXT = buildContext();

const SYSTEM = `Você é o assistente do portfólio de ${profile.name}. Responde a recrutadores, clientes e curiosos sobre a experiência, projetos, stack e disponibilidade do Gabriel.

Regras:
- Responda SOMENTE com base no contexto abaixo. Se a informação não estiver lá, diga que não sabe e sugira falar direto com o Gabriel pelo e-mail ${profile.email} ou WhatsApp.
- Responda no idioma da pergunta (português ou inglês). Seja direto: 2 a 5 frases, sem listas longas.
- Fale do Gabriel na terceira pessoa. Não invente números, clientes, salários ou datas.
- Se perguntarem algo fora do escopo (receitas, política, código genérico), redirecione gentilmente para o portfólio.

# Contexto
${CONTEXT}`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ available: false }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (limited(ip)) return Response.json({ error: "rate" }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as { messages?: { role: "user" | "assistant"; content: string }[] };
  const history = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
  if (!history.length || history[history.length - 1].role !== "user") {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 600,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low" },
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: history,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("\n\n(Não consigo responder isso aqui. Fale direto com o Gabriel.)"));
        }
      } catch (err) {
        const msg = err instanceof Anthropic.APIError ? `API error ${err.status}` : "error";
        controller.enqueue(encoder.encode(`\n\n[${msg}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
