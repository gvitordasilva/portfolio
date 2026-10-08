/* =============================================================================
 *  CONTEÚDO V2 — produtos ao vivo, estudos de caso, princípios, navegação.
 *  Complementa `content.ts` (perfil, skills, experiência, depoimentos).
 * ========================================================================== */
import type { Locale } from "./locales";

export type L = { pt: string; en: string };

export const nav: { id: string; label: L; href?: string }[] = [
  { id: "top", label: { pt: "Início", en: "Home" } },
  { id: "products", label: { pt: "Produtos", en: "Products" } },
  { id: "work", label: { pt: "Projetos", en: "Work" } },
  { id: "process", label: { pt: "Processo", en: "Process" } },
  { id: "experience", label: { pt: "Trajetória", en: "Experience" } },
  { id: "contact", label: { pt: "Contato", en: "Contact" } },
];

/* ---- Produtos no ar: SaaS reais, com projeto Vercel para status ao vivo ---- */
export type Product = {
  slug: string;
  name: string;
  /** Nome do projeto na Vercel (para /api/vercel-status). */
  vercelProject?: string;
  url: string;
  tagline: L;
  kind: L;
  stack: string[];
  /** Screenshot em /public/products (1600x1000). Opcional. */
  image?: string;
  accent: "brand" | "brand-2" | "brand-3";
};

export const products: Product[] = [
  {
    slug: "confirma",
    name: "Confirma",
    vercelProject: "confirma",
    url: "https://confirma-sigma.vercel.app",
    tagline: {
      pt: "Agendamento e cobrança pelo WhatsApp com Pix, para pequenos negócios.",
      en: "WhatsApp scheduling and billing with Pix, for small businesses.",
    },
    kind: { pt: "SaaS · multi-tenant", en: "SaaS · multi-tenant" },
    stack: ["Next.js 16", "Supabase", "Inngest", "WhatsApp Cloud API", "Asaas"],
    accent: "brand",
  },
  {
    slug: "dealeros",
    name: "Dealeros",
    vercelProject: "dealeros",
    url: "https://dealeros-gvitordasilvas-projects.vercel.app",
    tagline: {
      pt: "Gestão de estoque, propostas e vendas para revendas de veículos.",
      en: "Inventory, proposals and sales management for car dealerships.",
    },
    kind: { pt: "SaaS · multi-tenant", en: "SaaS · multi-tenant" },
    stack: ["Next.js", "PostgreSQL", "Prisma", "Auth.js"],
    accent: "brand-2",
  },
  {
    slug: "vetcare",
    name: "VetCare",
    vercelProject: "vetcare-web",
    url: "https://vetcare-web-taupe.vercel.app",
    tagline: {
      pt: "Prontuário, agenda, vacinas e financeiro para clínicas veterinárias.",
      en: "Records, scheduling, vaccines and finance for veterinary clinics.",
    },
    kind: { pt: "SaaS · multi-tenant", en: "SaaS · multi-tenant" },
    stack: ["Next.js 14", "Fastify", "Prisma", "JWT"],
    image: "/projects/vetcare.png",
    accent: "brand-3",
  },
  {
    slug: "atos20",
    name: "Atos20 Consultoria",
    vercelProject: "atos20consultoria",
    url: "https://atos20consultoria.vercel.app",
    tagline: {
      pt: "Presença digital e captação de leads para consultoria contábil.",
      en: "Digital presence and lead capture for an accounting consultancy.",
    },
    kind: { pt: "Site · leads", en: "Website · leads" },
    stack: ["Next.js", "Tailwind", "Vercel"],
    accent: "brand",
  },
  {
    slug: "rd2",
    name: "RD2 Engenharia",
    vercelProject: "gvitordasilva-site-rd2",
    url: "https://www.rd2arqeng.com",
    tagline: {
      pt: "Site institucional de construtora com comparador antes/depois e orçamento.",
      en: "Construction company website with before/after slider and quote form.",
    },
    kind: { pt: "Site · domínio próprio", en: "Website · custom domain" },
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/projects/rd2.png",
    accent: "brand-2",
  },
];

/* ---- Estudos de caso ---- */
export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: L;
  year: string;
  role: L;
  category: "saas" | "backend" | "frontend" | "web";
  stack: string[];
  /** Screenshot principal. */
  image?: string;
  demo?: string;
  repo?: string;
  /** Projeto Vercel para status ao vivo. */
  vercelProject?: string;
  problem: L;
  solution: L;
  highlights: L[];
  architecture?: L;
  results: { value: string; label: L }[];
  lessons: L;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "confirma",
    title: "Confirma",
    subtitle: {
      pt: "Agendamento e cobrança via WhatsApp e Pix para pequenos negócios",
      en: "WhatsApp + Pix scheduling and billing for small businesses",
    },
    year: "2026",
    role: { pt: "Fundador · Full stack", en: "Founder · Full stack" },
    category: "saas",
    stack: ["Next.js 16", "React 19", "Supabase", "Inngest", "WhatsApp Cloud API", "Asaas", "Vercel"],
    demo: "https://confirma-sigma.vercel.app",
    vercelProject: "confirma",
    problem: {
      pt: "Salões, clínicas e prestadores de serviço perdem dinheiro com faltas. Confirmar horário manualmente pelo WhatsApp não escala, e cobrar sinal antecipado exige integração com pagamento que esses negócios não têm.",
      en: "Salons, clinics and service providers lose money to no-shows. Confirming appointments manually over WhatsApp doesn't scale, and charging a deposit requires payment integrations these businesses don't have.",
    },
    solution: {
      pt: "Um SaaS multi-tenant onde o negócio cadastra a agenda, o cliente recebe a confirmação pelo WhatsApp com link de Pix, e o sistema cuida dos lembretes, reagendamentos e baixa automática do pagamento.",
      en: "A multi-tenant SaaS where the business sets up its schedule, the customer gets a WhatsApp confirmation with a Pix link, and the system handles reminders, rescheduling and automatic payment reconciliation.",
    },
    highlights: [
      {
        pt: "Jobs duráveis com Inngest: lembretes, expiração de Pix e retries sem cron frágil.",
        en: "Durable jobs with Inngest: reminders, Pix expiry and retries without fragile cron.",
      },
      {
        pt: "Isolamento por tenant com Row Level Security no Supabase.",
        en: "Per-tenant isolation with Supabase Row Level Security.",
      },
      {
        pt: "Webhooks idempotentes da Meta e do Asaas, com assinatura verificada.",
        en: "Idempotent Meta and Asaas webhooks with verified signatures.",
      },
      {
        pt: "Regras de negócio documentadas (RN-xx) e PRDs por feature.",
        en: "Documented business rules (RN-xx) and per-feature PRDs.",
      },
    ],
    architecture: {
      pt: "Next.js App Router na Vercel (gru1) → Supabase Postgres com RLS → Inngest para workflows assíncronos → WhatsApp Cloud API e Asaas via webhooks assinados.",
      en: "Next.js App Router on Vercel (gru1) → Supabase Postgres with RLS → Inngest for async workflows → WhatsApp Cloud API and Asaas through signed webhooks.",
    },
    results: [
      { value: "4", label: { pt: "módulos em produção", en: "modules in production" } },
      { value: "0", label: { pt: "cron jobs frágeis", en: "fragile cron jobs" } },
      { value: "RLS", label: { pt: "isolamento por tenant", en: "tenant isolation" } },
    ],
    lessons: {
      pt: "Integrações externas são o verdadeiro produto. Modelar cada webhook como evento idempotente desde o início evitou retrabalho quando a Meta e o Asaas mandaram eventos duplicados.",
      en: "External integrations are the real product. Modeling every webhook as an idempotent event from day one avoided rework when Meta and Asaas sent duplicate events.",
    },
  },
  {
    slug: "orderflow",
    title: "OrderFlow",
    subtitle: {
      pt: "Processamento de pedidos orientado a eventos com saga coreografada",
      en: "Event-driven order processing with choreographed saga",
    },
    year: "2025",
    role: { pt: "Back-end · Arquitetura", en: "Back end · Architecture" },
    category: "backend",
    stack: ["Java 17", "Spring Boot 3", "Apache Kafka", "Redis", "PostgreSQL", "Flyway", "Docker", "Testcontainers"],
    image: "/projects/orderflow.png",
    problem: {
      pt: "Fluxos de pedido monolíticos travam quando pagamento ou estoque ficam lentos, e um erro no meio do caminho deixa o sistema inconsistente.",
      en: "Monolithic order flows stall when payment or inventory slow down, and a mid-way failure leaves the system inconsistent.",
    },
    solution: {
      pt: "A API publica eventos no Kafka; serviços de estoque, pagamento e projeção de status reagem em coreografia (padrão saga) com compensação. Idempotência e cache em Redis, travamento otimista no Postgres.",
      en: "The API publishes events to Kafka; inventory, payment and status-projection services react in choreography (saga pattern) with compensation. Redis idempotency and cache, optimistic locking in Postgres.",
    },
    highlights: [
      {
        pt: "Sobe inteiro com um docker compose up.",
        en: "Boots end-to-end with a single docker compose up.",
      },
      {
        pt: "Suíte de integração completa com Testcontainers no GitHub Actions.",
        en: "Full integration suite with Testcontainers on GitHub Actions.",
      },
      {
        pt: "Dashboard Angular 18 com SSE acompanhando o saga em tempo real.",
        en: "Angular 18 dashboard following the saga live over SSE.",
      },
    ],
    architecture: {
      pt: "API Spring Boot → Kafka (tópicos por domínio) → consumidores independentes → projeção de status em Redis/Postgres → SSE para o dashboard.",
      en: "Spring Boot API → Kafka (per-domain topics) → independent consumers → status projection in Redis/Postgres → SSE to the dashboard.",
    },
    results: [
      { value: "3", label: { pt: "serviços desacoplados", en: "decoupled services" } },
      { value: "1", label: { pt: "comando para subir tudo", en: "command to boot it all" } },
      { value: "100%", label: { pt: "integração em CI", en: "integration in CI" } },
    ],
    lessons: {
      pt: "Coreografia dá autonomia aos serviços, mas sem uma projeção de status centralizada ninguém sabe onde o pedido está. A projeção virou a peça mais importante do sistema.",
      en: "Choreography gives services autonomy, but without a central status projection nobody knows where an order is. The projection became the most important piece of the system.",
    },
  },
  {
    slug: "vetcare",
    title: "VetCare",
    subtitle: {
      pt: "Gestão completa para clínicas veterinárias",
      en: "Full management for veterinary clinics",
    },
    year: "2025",
    role: { pt: "Full stack", en: "Full stack" },
    category: "saas",
    stack: ["Next.js 14", "Fastify", "Node.js", "Prisma", "PostgreSQL", "JWT", "Zod", "Vitest"],
    image: "/projects/vetcare.png",
    demo: "https://vetcare-web-taupe.vercel.app/",
    vercelProject: "vetcare-web",
    problem: {
      pt: "Clínicas pequenas controlam prontuário, vacinas e caixa em planilhas e cadernos. Lembrete de vacina atrasado vira cliente perdido.",
      en: "Small clinics track records, vaccines and cash in spreadsheets and notebooks. A late vaccine reminder becomes a lost customer.",
    },
    solution: {
      pt: "Monorepo com API Fastify e front Next.js: prontuário por paciente, agenda, carteira de vacinação com lembretes automáticos e módulo financeiro, tudo multi-tenant.",
      en: "Monorepo with a Fastify API and Next.js front end: per-patient records, scheduling, vaccination card with automatic reminders and a finance module, all multi-tenant.",
    },
    highlights: [
      { pt: "JWT com refresh token e rate limiting.", en: "JWT with refresh tokens and rate limiting." },
      { pt: "Validação ponta a ponta com Zod.", en: "End-to-end validation with Zod." },
      { pt: "Testes automatizados com Vitest.", en: "Automated tests with Vitest." },
    ],
    results: [
      { value: "5", label: { pt: "módulos", en: "modules" } },
      { value: "API", label: { pt: "separada do front", en: "decoupled from the front end" } },
    ],
    lessons: {
      pt: "Separar API e front custou mais no início, mas permitiu evoluir o back-end sem travar a interface.",
      en: "Splitting API and front end cost more upfront, but let the back end evolve without blocking the UI.",
    },
  },
  {
    slug: "constromanager",
    title: "ConstroManager",
    subtitle: {
      pt: "SaaS multi-tenant para construtoras",
      en: "Multi-tenant SaaS for construction firms",
    },
    year: "2025",
    role: { pt: "Full stack", en: "Full stack" },
    category: "saas",
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "Tailwind CSS"],
    problem: {
      pt: "Construtoras gerenciam obras, equipe, ponto, materiais e contratos em ferramentas separadas, sem visão consolidada.",
      en: "Construction firms manage projects, teams, timesheets, materials and contracts in separate tools, with no consolidated view.",
    },
    solution: {
      pt: "Plataforma única com isolamento por empresa via extension do Prisma, autenticação com papéis e dashboards com gráficos.",
      en: "A single platform with per-company isolation through a Prisma extension, role-based auth and chart dashboards.",
    },
    highlights: [
      { pt: "Tenant injetado automaticamente em toda query (Prisma extension).", en: "Tenant injected into every query automatically (Prisma extension)." },
      { pt: "Papéis e permissões por módulo.", en: "Per-module roles and permissions." },
    ],
    results: [
      { value: "7", label: { pt: "módulos integrados", en: "integrated modules" } },
      { value: "1", label: { pt: "ponto de isolamento", en: "isolation point" } },
    ],
    lessons: {
      pt: "Centralizar o isolamento multi-tenant numa única extension elimina a classe inteira de bug de vazamento entre empresas.",
      en: "Centralizing multi-tenant isolation in one extension removes the entire class of cross-company data leaks.",
    },
  },
  {
    slug: "rd2",
    title: "RD2 Engenharia",
    subtitle: {
      pt: "Site institucional de construtora, em domínio próprio",
      en: "Construction company website on a custom domain",
    },
    year: "2025",
    role: { pt: "Design · Front-end", en: "Design · Front end" },
    category: "web",
    stack: ["JavaScript", "HTML5", "CSS3", "Vercel"],
    image: "/projects/rd2.png",
    demo: "https://www.rd2arqeng.com",
    vercelProject: "gvitordasilva-site-rd2",
    problem: {
      pt: "A construtora precisava de presença digital que transmitisse solidez e gerasse pedidos de orçamento.",
      en: "The firm needed a digital presence that conveyed solidity and generated quote requests.",
    },
    solution: {
      pt: "Landing page de alta performance em JavaScript puro: animações de scroll, comparador antes/depois e formulário de orçamento.",
      en: "High-performance vanilla JavaScript landing page: scroll animations, before/after slider and a quote form.",
    },
    highlights: [
      { pt: "Zero framework: carrega em menos de 1s.", en: "Zero framework: loads in under 1s." },
      { pt: "Domínio próprio e SEO configurados.", en: "Custom domain and SEO configured." },
    ],
    results: [
      { value: "<1s", label: { pt: "carregamento", en: "load time" } },
      { value: "100", label: { pt: "Lighthouse performance", en: "Lighthouse performance" } },
    ],
    lessons: {
      pt: "Nem tudo precisa de React. Para uma landing page, HTML e CSS bem feitos ganham em performance e manutenção.",
      en: "Not everything needs React. For a landing page, well-crafted HTML and CSS win on performance and maintenance.",
    },
  },
];

export const caseCategories: { id: CaseStudy["category"] | "all"; label: L }[] = [
  { id: "all", label: { pt: "Todos", en: "All" } },
  { id: "saas", label: { pt: "SaaS", en: "SaaS" } },
  { id: "backend", label: { pt: "Back-end", en: "Back end" } },
  { id: "web", label: { pt: "Web", en: "Web" } },
];

/* ---- Princípios (seção Processo) ---- */
export const principles: { title: L; body: L }[] = [
  {
    title: { pt: "Produto antes de código", en: "Product before code" },
    body: {
      pt: "Começo por regras de negócio e PRD curto. Código sem problema claro vira retrabalho.",
      en: "I start with business rules and a short PRD. Code without a clear problem becomes rework.",
    },
  },
  {
    title: { pt: "Sobe com um comando", en: "Boots with one command" },
    body: {
      pt: "Docker Compose, seed e CI desde o primeiro dia. Se não roda na máquina do outro, não está pronto.",
      en: "Docker Compose, seeds and CI from day one. If it doesn't run on someone else's machine, it isn't done.",
    },
  },
  {
    title: { pt: "Idempotente por padrão", en: "Idempotent by default" },
    body: {
      pt: "Webhooks, jobs e eventos são reprocessáveis sem efeito colateral. Falha é esperada, não exceção.",
      en: "Webhooks, jobs and events can be replayed without side effects. Failure is expected, not exceptional.",
    },
  },
  {
    title: { pt: "Decisões que envelhecem bem", en: "Decisions that age well" },
    body: {
      pt: "Prefiro o padrão chato que o time inteiro entende ao truque esperto que só eu mantenho.",
      en: "I prefer the boring pattern the whole team understands over the clever trick only I can maintain.",
    },
  },
];

/* ---- Terminal da seção Processo ---- */
export const terminalTabs = [
  {
    label: "compose",
    command: "docker compose up -d",
    lines: [
      { text: "", delay: 80 },
      { text: " ✔ Network orderflow_default      Created", color: "text-brand", delay: 180 },
      { text: " ✔ Container orderflow-postgres   Healthy", color: "text-brand", delay: 220 },
      { text: " ✔ Container orderflow-redis      Healthy", color: "text-brand", delay: 180 },
      { text: " ✔ Container orderflow-kafka      Healthy", color: "text-brand", delay: 260 },
      { text: " ✔ Container orderflow-api        Started", color: "text-brand", delay: 200 },
      { text: " ✔ Container inventory-service    Started", color: "text-brand", delay: 160 },
      { text: " ✔ Container payment-service      Started", color: "text-brand", delay: 160 },
      { text: " ✔ Container status-projection    Started", color: "text-brand", delay: 160 },
      { text: "", delay: 80 },
      { text: "API ready at http://localhost:8080", color: "text-muted-foreground", delay: 200 },
    ],
  },
  {
    label: "order",
    command: "curl -X POST localhost:8080/orders -d @order.json",
    lines: [
      { text: "", delay: 80 },
      { text: '{ "id": "ord_7f3a", "status": "PENDING" }', color: "text-brand-2", delay: 300 },
      { text: "", delay: 80 },
      { text: "→ OrderCreated          published to orders.created", color: "text-muted-foreground", delay: 220 },
      { text: "→ InventoryReserved     inventory-service", color: "text-muted-foreground", delay: 320 },
      { text: "→ PaymentApproved       payment-service", color: "text-muted-foreground", delay: 360 },
      { text: "→ OrderConfirmed        status-projection", color: "text-brand", delay: 300 },
      { text: "", delay: 80 },
      { text: "saga completed in 412ms", color: "text-brand", delay: 200 },
    ],
  },
  {
    label: "test",
    command: "./mvnw verify",
    lines: [
      { text: "", delay: 80 },
      { text: "[INFO] Testcontainers: starting postgres:16, redis:7, kafka:3.7", color: "text-muted-foreground", delay: 300 },
      { text: "[INFO] OrderSagaIT ........................ 12 tests", color: "text-muted-foreground", delay: 420 },
      { text: "[INFO] IdempotencyIT ...................... 6 tests", color: "text-muted-foreground", delay: 260 },
      { text: "[INFO] CompensationIT ..................... 5 tests", color: "text-muted-foreground", delay: 260 },
      { text: "", delay: 80 },
      { text: "[INFO] Tests run: 23, Failures: 0, Errors: 0", color: "text-brand", delay: 300 },
      { text: "[INFO] BUILD SUCCESS", color: "text-brand", delay: 200 },
    ],
  },
  {
    label: "deploy",
    command: "vercel --prod",
    lines: [
      { text: "", delay: 80 },
      { text: "Vercel CLI 60.1.3", color: "text-muted-foreground", delay: 200 },
      { text: "🔍 Inspect: vercel.com/gvitordasilva/confirma/…", color: "text-muted-foreground", delay: 260 },
      { text: "✓ Building (gru1)", color: "text-brand", delay: 420 },
      { text: "✓ Uploading", color: "text-brand", delay: 220 },
      { text: "✓ Finalizing", color: "text-brand", delay: 220 },
      { text: "", delay: 80 },
      { text: "✅ Production: https://confirma-sigma.vercel.app", color: "text-brand-2", delay: 260 },
    ],
  },
];

/* ---- Strings de UI da v2 ---- */
export const ui2 = {
  hero: {
    eyebrow: { pt: "Full stack · Java, Spring, React, Next", en: "Full stack · Java, Spring, React, Next" },
    headline: {
      pt: "Construo produtos digitais que ficam no ar.",
      en: "I build digital products that stay live.",
    },
    sub: {
      pt: "Back-end sólido em Java e Spring, front moderno em React e Next. SaaS multi-tenant em produção, integrações reais e decisões técnicas que envelhecem bem.",
      en: "Solid Java and Spring back end, modern React and Next front end. Multi-tenant SaaS in production, real integrations and technical decisions that age well.",
    },
    ctaWork: { pt: "Ver produtos no ar", en: "See live products" },
    ctaTalk: { pt: "Agendar conversa", en: "Book a call" },
    statYears: { pt: "anos construindo", en: "years building" },
    statLive: { pt: "produtos no ar", en: "products live" },
    statDeploys: { pt: "deploys nos últimos 30 dias", en: "deploys in the last 30 days" },
    scroll: { pt: "Role", en: "Scroll" },
  },
  now: {
    title: { pt: "Agora", en: "Now" },
    location: { pt: "Joinville, SC · Brasil", en: "Joinville, SC · Brazil" },
    available: { pt: "Disponível para remoto", en: "Available for remote" },
    localTime: { pt: "Horário local", en: "Local time" },
    building: { pt: "Construindo", en: "Building" },
    buildingWhat: { pt: "Confirma: WhatsApp em produção", en: "Confirma: WhatsApp in production" },
    lastCommit: { pt: "Último commit", en: "Last commit" },
    stack: { pt: "Stack do momento", en: "Current stack" },
    reading: { pt: "Aprendendo", en: "Learning" },
    readingWhat: { pt: "Event sourcing · Inngest · RLS", en: "Event sourcing · Inngest · RLS" },
  },
  products: {
    eyebrow: { pt: "Produtos no ar", en: "Live products" },
    title: { pt: "Não é screenshot. Está rodando.", en: "Not a screenshot. It's running." },
    sub: {
      pt: "Status de deploy consultado ao vivo na Vercel. Clique para abrir o produto ou ler o estudo de caso.",
      en: "Deploy status fetched live from Vercel. Click to open the product or read the case study.",
    },
    open: { pt: "Abrir", en: "Open" },
    caseStudy: { pt: "Estudo de caso", en: "Case study" },
    statusReady: { pt: "no ar", en: "live" },
    statusBuilding: { pt: "publicando", en: "deploying" },
    statusError: { pt: "falhou", en: "failed" },
    statusUnknown: { pt: "status indisponível", en: "status unavailable" },
    deployedAgo: { pt: "deploy há", en: "deployed" },
  },
  work: {
    eyebrow: { pt: "Projetos", en: "Work" },
    title: { pt: "Problema, decisão, resultado.", en: "Problem, decision, result." },
    sub: {
      pt: "Cada estudo de caso explica o porquê das escolhas técnicas, não só a lista de tecnologias.",
      en: "Each case study explains why the technical choices were made, not just the stack list.",
    },
    read: { pt: "Ler estudo de caso", en: "Read case study" },
    allWork: { pt: "Todos os projetos", en: "All work" },
  },
  caseStudy: {
    back: { pt: "Voltar", en: "Back" },
    problem: { pt: "O problema", en: "The problem" },
    solution: { pt: "A solução", en: "The solution" },
    highlights: { pt: "Decisões técnicas", en: "Technical decisions" },
    architecture: { pt: "Arquitetura", en: "Architecture" },
    results: { pt: "Resultado", en: "Results" },
    lessons: { pt: "O que aprendi", en: "What I learned" },
    openDemo: { pt: "Abrir produto", en: "Open product" },
    openRepo: { pt: "Ver código", en: "View code" },
    next: { pt: "Próximo estudo", en: "Next case study" },
    stack: { pt: "Stack", en: "Stack" },
    role: { pt: "Papel", en: "Role" },
    year: { pt: "Ano", en: "Year" },
  },
  process: {
    eyebrow: { pt: "Processo", en: "Process" },
    title: { pt: "Como eu trabalho", en: "How I work" },
    sub: {
      pt: "Do docker compose up ao deploy em produção. O terminal ao lado é o fluxo real do OrderFlow e do Confirma.",
      en: "From docker compose up to production deploy. The terminal is the real OrderFlow and Confirma flow.",
    },
  },
  experience: {
    eyebrow: { pt: "Trajetória", en: "Experience" },
    title: { pt: "Onde construí", en: "Where I've built" },
    present: { pt: "Atual", en: "Current" },
  },
  testimonials: {
    eyebrow: { pt: "Recomendações", en: "Testimonials" },
    title: { pt: "Quem trabalhou comigo", en: "People I've worked with" },
  },
  contact: {
    eyebrow: { pt: "Contato", en: "Contact" },
    title: { pt: "Vamos construir algo.", en: "Let's build something." },
    sub: {
      pt: "Projeto, vaga ou só uma ideia. Respondo em até um dia útil.",
      en: "A project, a role or just an idea. I reply within one business day.",
    },
    name: { pt: "Seu nome", en: "Your name" },
    email: { pt: "Seu e-mail", en: "Your email" },
    message: { pt: "Conte rápido o que precisa", en: "Tell me briefly what you need" },
    send: { pt: "Enviar", en: "Send" },
    sending: { pt: "Enviando…", en: "Sending…" },
    sent: { pt: "Recebido! Respondo em breve.", en: "Got it! I'll reply soon." },
    error: { pt: "Falhou. Me chama no WhatsApp ou e-mail.", en: "Failed. Reach me on WhatsApp or email." },
    whatsapp: { pt: "Chamar no WhatsApp", en: "Message on WhatsApp" },
    copyEmail: { pt: "Copiar e-mail", en: "Copy email" },
  },
  footer: {
    built: {
      pt: "Next.js 16 · Cult UI · ShaderGradient · Vercel",
      en: "Next.js 16 · Cult UI · ShaderGradient · Vercel",
    },
    rights: { pt: "Todos os direitos reservados.", en: "All rights reserved." },
    source: { pt: "Código deste site", en: "This site's source" },
    shortcuts: { pt: "Atalhos", en: "Shortcuts" },
  },
  dock: {
    home: { pt: "Início", en: "Home" },
    work: { pt: "Projetos", en: "Work" },
    resume: { pt: "Currículo", en: "Resume" },
    contact: { pt: "Contato", en: "Contact" },
    github: { pt: "GitHub", en: "GitHub" },
    linkedin: { pt: "LinkedIn", en: "LinkedIn" },
    theme: { pt: "Tema", en: "Theme" },
    lang: { pt: "English", en: "Português" },
    search: { pt: "Buscar (⌘K)", en: "Search (⌘K)" },
  },
  island: {
    menu: { pt: "Menu", en: "Menu" },
    close: { pt: "Fechar", en: "Close" },
    presenting: { pt: "Modo apresentação · ESC para sair", en: "Presentation mode · ESC to exit" },
    konami: { pt: "Shader remixado ✨", en: "Shader remixed ✨" },
  },
  chat: {
    title: { pt: "Pergunte sobre o Gabriel", en: "Ask about Gabriel" },
    placeholder: { pt: "Ex.: ele já trabalhou com Kafka?", en: "E.g. has he worked with Kafka?" },
    hint: { pt: "Respostas geradas a partir do conteúdo deste site.", en: "Answers generated from this site's content." },
    offline: {
      pt: "Chat indisponível no momento. Me chama no WhatsApp.",
      en: "Chat unavailable right now. Reach me on WhatsApp.",
    },
    send: { pt: "Enviar", en: "Send" },
    open: { pt: "Perguntar", en: "Ask" },
    suggestions: {
      pt: ["Qual a experiência dele com Java?", "Ele já fez SaaS multi-tenant?", "Está disponível para remoto?"],
      en: ["What's his Java experience?", "Has he built multi-tenant SaaS?", "Is he available for remote?"],
    },
  },
  resume: {
    title: { pt: "Currículo", en: "Resume" },
    download: { pt: "Baixar PDF", en: "Download PDF" },
    print: { pt: "Imprimir", en: "Print" },
    summary: { pt: "Resumo", en: "Summary" },
    experience: { pt: "Experiência", en: "Experience" },
    projects: { pt: "Projetos selecionados", en: "Selected projects" },
    skills: { pt: "Stack", en: "Stack" },
    contact: { pt: "Contato", en: "Contact" },
    languages: { pt: "Idiomas", en: "Languages" },
    languagesList: { pt: "Português (nativo) · Inglês (profissional)", en: "Portuguese (native) · English (professional)" },
  },
  common: {
    viewAll: { pt: "Ver todos", en: "View all" },
    live: { pt: "ao vivo", en: "live" },
    ago: { pt: "atrás", en: "ago" },
  },
};

export function tr(pair: L, lang: Locale) {
  return pair[lang];
}

export function timeAgo(iso: string | number, lang: Locale): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (lang === "pt") {
    if (m < 1) return "agora";
    if (m < 60) return `${m} min`;
    if (h < 24) return `${h} h`;
    return `${d} d`;
  }
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}
