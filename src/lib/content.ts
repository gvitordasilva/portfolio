import type { Locale } from "./i18n";

/* =============================================================================
 *  CONTEÚDO DO PORTFÓLIO  —  edite tudo por aqui.
 *  Campos { pt, en } têm as duas versões de idioma.
 * ========================================================================== */

type L = { pt: string; en: string };

export const profile = {
  name: "Gabriel Vitor da Silva",
  // Iniciais usadas no logo
  initials: "GV",
  role: {
    pt: "Desenvolvedor Full Stack",
    en: "Full Stack Developer",
  } as L,
  // headline grande do hero — a última linha ganha destaque tipográfico
  headline: {
    pt: "Construo produtos digitais\nrobustos, do back ao front.",
    en: "I build robust digital products,\nfrom back end to front end.",
  } as L,
  subheadline: {
    pt: "Especialista em Java & ecossistema Spring, com forte atuação em front-end moderno (React e Angular). 6+ anos transformando problemas complexos em software confiável.",
    en: "Java & Spring specialist with strong modern front-end work (React and Angular). 6+ years turning complex problems into reliable software.",
  } as L,
  location: {
    pt: "Brasil · Disponível para remoto",
    en: "Brazil · Available for remote",
  } as L,
  yearsExperience: 6,
  email: "gvitordasilva@gmail.com",
  whatsapp: "5547988632053", // só dígitos, com DDI+DDD (55 + 47 + número)
  github: "https://github.com/gvitordasilva",
  linkedin: "https://www.linkedin.com/in/gabriel-vitor-da-silva-5880b910a/",
  resumeUrl: "", // link do currículo em PDF — prioridade nº 1: recrutador procura isso primeiro
  available: true,
  // URL pública do site (usada em SEO/OG). Defina NEXT_PUBLIC_SITE_URL na Vercel.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gvitordasilva.vercel.app",
  // Chave gratuita do Web3Forms (https://web3forms.com) — cole aqui para que o
  // formulário envie a mensagem direto para o seu e-mail, sem backend.
  // Enquanto vazia, o formulário usa um fallback via mailto.
  web3formsKey: "",
};

/* ---- Métricas do hero — apenas fatos verificáveis pelo próprio site ---- */
export const stats: { value: string; label: L }[] = [
  { value: "6+", label: { pt: "Anos de experiência", en: "Years of experience" } },
  { value: "3", label: { pt: "Empresas de produto", en: "Product companies" } },
  { value: "2", label: { pt: "SaaS multi-tenant do zero", en: "Multi-tenant SaaS from scratch" } },
  { value: "PT·EN", label: { pt: "Comunicação de trabalho", en: "Working languages" } },
];

/* ---- Sobre ---- */
export const about: { paragraphs: L[] } = {
  paragraphs: [
    {
      pt: "Sou desenvolvedor há mais de 6 anos, com foco em construir sistemas escaláveis e bem arquitetados. Minha base é sólida em Java e no ecossistema Spring, mas transito com naturalidade pelo front-end moderno.",
      en: "I've been a developer for 6+ years, focused on building scalable, well-architected systems. My foundation is strong in Java and the Spring ecosystem, and I move naturally through modern front-end work.",
    },
    {
      pt: "Já atuei em toda a jornada de um produto: modelagem de dados (SQL e NoSQL), APIs REST, integrações, e interfaces reativas com React e Angular. Gosto de código limpo, testável e de decisões técnicas que envelhecem bem.",
      en: "I've worked across the full product journey: data modeling (SQL and NoSQL), REST APIs, integrations, and reactive interfaces with React and Angular. I care about clean, testable code and technical decisions that age well.",
    },
  ],
};

/* ---- Stack técnico ---- */
export const skills: { category: L; items: string[] }[] = [
  {
    category: { pt: "Back-end", en: "Back-end" },
    items: ["Java", "Spring Boot", "Spring Security", "Hibernate/JPA", "Quarkus", "Node.js", "REST APIs", "Microserviços"],
  },
  {
    category: { pt: "Front-end", en: "Front-end" },
    items: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS", "RxJS", "HTML & CSS"],
  },
  {
    category: { pt: "Dados", en: "Data" },
    items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "Elasticsearch"],
  },
  {
    category: { pt: "DevOps & Cloud", en: "DevOps & Cloud" },
    items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git", "Linux", "Kafka", "RabbitMQ"],
  },
];

/* ---- Projetos ----
 * image: screenshot em /public/projects (capturada do demo ao vivo).
 * Projetos sem image ganham uma capa gerada automaticamente no card.
 */
export type Project = {
  title: string;
  tagline: L;
  description: L;
  tags: string[];
  image?: string;
  repo?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "OrderFlow",
    tagline: {
      pt: "Back-end orientado a eventos (saga/coreografia)",
      en: "Event-driven back-end (saga/choreography)",
    },
    description: {
      pt: "Plataforma de processamento de pedidos orientada a eventos. A API em Spring Boot publica eventos no Kafka; serviços de estoque, pagamento e projeção de status consomem em coreografia (padrão saga), com idempotência e cache em Redis, persistência em PostgreSQL (Flyway) e travamento otimista. Sobe inteiro com um `docker compose up`, e o CI roda a suíte de integração completa via Testcontainers no GitHub Actions.",
      en: "Event-driven order processing platform. A Spring Boot API publishes events to Kafka; inventory, payment and status-projection services consume them in choreography (saga pattern), with Redis idempotency + cache, PostgreSQL persistence (Flyway) and optimistic locking. Boots end-to-end with a single `docker compose up`, and CI runs the full integration suite via Testcontainers on GitHub Actions.",
    },
    tags: [
      "Java 17",
      "Spring Boot 3",
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Testcontainers",
      "CI/CD",
    ],
    image: "/projects/orderflow.png",
    repo: "",
    demo: "",
    featured: true,
  },
  {
    title: "OrderFlow Dashboard",
    tagline: {
      pt: "Painel Angular em tempo real (SSE)",
      en: "Real-time Angular dashboard (SSE)",
    },
    description: {
      pt: "Front-end do OrderFlow em Angular 18: acompanha cada pedido percorrendo o saga ao vivo (PENDING → INVENTORY_RESERVED → CONFIRMED/FAILED) via Server-Sent Events. Componentes standalone, signals e ponte RxJS→signal (o stream SSE é modelado como Observable, acumulado com `scan` e exposto via `toSignal`), OnPush em tudo, formulário reativo e control flow moderno (@for/@if).",
      en: "Angular 18 front end for OrderFlow: watches each order move through the saga live (PENDING → INVENTORY_RESERVED → CONFIRMED/FAILED) over Server-Sent Events. Standalone components, signals and an RxJS→signal bridge (the SSE stream is modelled as an Observable, folded with `scan` and exposed via `toSignal`), OnPush throughout, reactive form and modern control flow (@for/@if).",
    },
    tags: [
      "Angular 18",
      "TypeScript",
      "RxJS",
      "Signals",
      "SSE",
      "Standalone",
    ],
    image: "/projects/orderflow-dashboard.png",
    repo: "",
    demo: "",
    featured: true,
  },
  {
    title: "VetCare",
    tagline: {
      pt: "Gestão completa para clínicas veterinárias",
      en: "Full management for veterinary clinics",
    },
    description: {
      pt: "Sistema full stack multi-tenant para clínicas veterinárias: prontuário de pacientes, agenda, consultas, carteira de vacinação com lembretes automáticos e módulo financeiro. Monorepo com API Fastify, front Next.js, JWT com refresh token, rate limiting e testes automatizados.",
      en: "Full stack multi-tenant system for veterinary clinics: patient records, scheduling, appointments, vaccination cards with automatic reminders and a finance module. Monorepo with a Fastify API, Next.js front end, JWT + refresh tokens, rate limiting and automated tests.",
    },
    tags: [
      "Next.js 14",
      "Fastify",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Zod",
      "Vitest",
    ],
    image: "/projects/vetcare.png",
    repo: "",
    demo: "https://vetcare-web-taupe.vercel.app/",
    featured: true,
  },
  {
    title: "ConstroManager",
    tagline: {
      pt: "SaaS multi-tenant para construtoras",
      en: "Multi-tenant SaaS for construction firms",
    },
    description: {
      pt: "Plataforma de gestão para construtoras: obras, equipe, ponto, materiais, fornecedores, contratos e financeiro em um só lugar. Arquitetura multi-tenant com isolamento de dados por empresa (extension do Prisma), autenticação com papéis e dashboards com gráficos.",
      en: "Management platform for construction companies: projects, team, time tracking, materials, suppliers, contracts and finance in one place. Multi-tenant architecture with per-company data isolation (Prisma extension), role-based auth and chart dashboards.",
    },
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Auth.js",
      "Tailwind CSS",
      "Multi-tenant",
    ],
    repo: "",
    demo: "",
    featured: true,
  },
  {
    title: "RD2 Engenharia",
    tagline: {
      pt: "Site institucional de construtora",
      en: "Construction company website",
    },
    description: {
      pt: "Site institucional para a RD2 Engenharia, construtora e incorporadora. Landing page de alta performance em JavaScript puro, com animações de scroll, comparador antes/depois e formulário de orçamento.",
      en: "Institutional website for RD2 Engenharia, a construction and development company. High-performance landing page in vanilla JavaScript, with scroll animations, a before/after slider and a quote form.",
    },
    tags: ["JavaScript", "HTML5", "CSS3", "Landing Page", "UI/UX"],
    image: "/projects/rd2.png",
    repo: "",
    demo: "https://gvitordasilva-site-rd2.vercel.app/",
    featured: true,
  },
  {
    title: "OLEA Sanctuary",
    tagline: {
      pt: "Landing page imersiva de bem-estar",
      en: "Immersive wellness landing page",
    },
    description: {
      pt: "Landing page para um estúdio de yoga somática e respiração. Foco em design editorial, tipografia expressiva e animações de revelação no scroll para transmitir calma e sofisticação.",
      en: "Landing page for a somatic yoga and breathwork studio. Focused on editorial design, expressive typography and scroll-reveal animations to convey calm and sophistication.",
    },
    tags: ["JavaScript", "HTML5", "CSS3", "Animações", "Landing Page"],
    repo: "",
    demo: "",
  },
];

/* ---- Experiência ----
 * highlights: bullets curtos e escaneáveis — recrutador lê isso, não parágrafo.
 * TODO(Gabriel): a timeline abaixo começa em 2023, mas o hero fala em 6+ anos.
 * Adicione as experiências anteriores a 2023 (mesmo que resumidas) para a
 * conta fechar aos olhos de quem cruza os dados — e, onde tiver números
 * reais (% de ganho, nº de clientes afetados), troque nos bullets.
 */
export type Job = {
  company: string;
  role: L;
  period: L;
  location?: L;
  description: L;
  highlights?: L[];
  stack: string[];
};

export const experience: Job[] = [
  {
    company: "Pulsati",
    role: { pt: "Software Developer III", en: "Software Developer III" },
    period: { pt: "mai 2026 — Presente", en: "May 2026 — Present" },
    location: { pt: "Remoto", en: "Remote" },
    description: {
      pt: "Desenvolvimento back-end em Java e Spring Boot, atuando de forma remota na evolução de produtos e serviços.",
      en: "Back-end development in Java and Spring Boot, working remotely on the evolution of products and services.",
    },
    stack: ["Java", "Spring Boot"],
  },
  {
    company: "TOTVS",
    role: { pt: "Software Developer II", en: "Software Developer II" },
    period: { pt: "out 2024 — mai 2026", en: "Oct 2024 — May 2026" },
    location: { pt: "Joinville, SC · Híbrido", en: "Joinville, SC · Hybrid" },
    description: {
      pt: "Evolução de aplicações Java 11+ em arquitetura de microsserviços, entregando soluções escaláveis para os produtos TOTVS.",
      en: "Java 11+ applications in a microservices architecture, delivering scalable solutions for TOTVS products.",
    },
    highlights: [
      {
        pt: "Refatorei código legado de módulos críticos com ganho de performance percebido pelos clientes do produto.",
        en: "Refactored legacy code in critical modules with performance gains felt by product customers.",
      },
      {
        pt: "Corrigi bugs críticos em produção e entreguei novas funcionalidades a cada sprint.",
        en: "Fixed critical production bugs and shipped new features every sprint.",
      },
      {
        pt: "Participação ativa nas cerimônias ágeis e nas decisões técnicas do time.",
        en: "Active role in agile ceremonies and the team's technical decisions.",
      },
    ],
    stack: ["Java 11+", "Spring Boot", "Microsserviços", "SQL", "Scrum"],
  },
  {
    company: "Softplan",
    role: { pt: "Software Developer I", en: "Software Developer I" },
    period: { pt: "mar 2024 — out 2024", en: "Mar 2024 — Oct 2024" },
    location: { pt: "Joinville, SC · Remoto", en: "Joinville, SC · Remote" },
    description: {
      pt: "Performance e desenvolvimento full stack em aplicações Java de grande porte.",
      en: "Performance work and full stack development on large Java applications.",
    },
    highlights: [
      {
        pt: "Otimizei consultas e reduzi o tempo de resposta de funcionalidades críticas da aplicação.",
        en: "Optimized queries and reduced response time of critical application features.",
      },
      {
        pt: "Corrigi bugs e melhorei usabilidade e segurança de um framework interno usado por múltiplos times.",
        en: "Fixed bugs and improved usability and security of an internal framework used by multiple teams.",
      },
      {
        pt: "Full stack com JavaWeb e JavaScript sobre PostgreSQL, SQL Server, Oracle e MongoDB.",
        en: "Full stack with JavaWeb and JavaScript over PostgreSQL, SQL Server, Oracle and MongoDB.",
      },
    ],
    stack: ["Java", "JavaScript", "PostgreSQL", "SQL Server", "Oracle", "MongoDB"],
  },
  {
    company: "Softplan",
    role: { pt: "Software Developer", en: "Software Developer" },
    period: { pt: "abr 2023 — mar 2024", en: "Apr 2023 — Mar 2024" },
    location: { pt: "Joinville, SC · Remoto", en: "Joinville, SC · Remote" },
    description: {
      pt: "Customizações Java Web para clientes enterprise, com múltiplos bancos de dados.",
      en: "Java Web customizations for enterprise clients, across multiple databases.",
    },
    highlights: [
      {
        pt: "Criei funcionalidades sob medida, formulários dinâmicos e regras de negócio complexas.",
        en: "Built tailor-made features, dynamic forms and complex business rules.",
      },
      {
        pt: "Integrações entre sistemas e relatórios gerenciais com JasperReports.",
        en: "System integrations and management reports with JasperReports.",
      },
      {
        pt: "Docker para ambientes consistentes entre desenvolvimento e produção.",
        en: "Docker for consistent environments between development and production.",
      },
    ],
    stack: ["Java Web", "JavaScript", "Docker", "JasperReports", "Oracle"],
  },
];

/* ---- Serviços (para clientes/freela) ---- */
export const services: { title: L; description: L }[] = [
  {
    title: { pt: "APIs & Back-end", en: "APIs & Back-end" },
    description: {
      pt: "Sistemas robustos em Java/Spring: APIs REST, microserviços, integrações e modelagem de dados.",
      en: "Robust Java/Spring systems: REST APIs, microservices, integrations and data modeling.",
    },
  },
  {
    title: { pt: "Interfaces Web", en: "Web Interfaces" },
    description: {
      pt: "Front-end moderno e performático com React, Next.js e Angular, focado em experiência do usuário.",
      en: "Modern, performant front-end with React, Next.js and Angular, focused on user experience.",
    },
  },
  {
    title: { pt: "Aplicações Full Stack", en: "Full Stack Apps" },
    description: {
      pt: "Do banco de dados à interface: entrego produtos completos, escaláveis e prontos para produção.",
      en: "From database to interface: I deliver complete, scalable, production-ready products.",
    },
  },
  {
    title: { pt: "Consultoria Técnica", en: "Technical Consulting" },
    description: {
      pt: "Revisão de arquitetura, performance e boas práticas para times que querem evoluir sua base de código.",
      en: "Architecture, performance and best-practices review for teams looking to evolve their codebase.",
    },
  },
];

/* ---- Recomendações / prova social ----
 * PLACEHOLDER: troque pelos textos reais das suas recomendações do LinkedIn
 * (ex-gestores/colegas da TOTVS, Softplan, Pulsati). `quote` é bilíngue — cole
 * o original em `pt` e uma tradução em `en` (ou repita o mesmo texto).
 * Se deixar a lista vazia, a seção some sozinha do site.
 */
export const testimonials: { quote: L; author: string; role: L }[] = [
  {
    quote: {
      pt: "[Placeholder] Cole aqui uma recomendação real. Ex.: “O Gabriel entrega código limpo e pensa na arquitetura antes de sair codando — resolveu gargalos de performance que travavam o time.”",
      en: "[Placeholder] Paste a real recommendation here. E.g.: “Gabriel writes clean code and thinks about architecture before diving in — he unblocked performance bottlenecks that were slowing the team down.”",
    },
    author: "Nome do Colega",
    role: { pt: "Tech Lead · TOTVS", en: "Tech Lead · TOTVS" },
  },
  {
    quote: {
      pt: "[Placeholder] Segunda recomendação. Foque em impacto e em como é trabalhar com você (comunicação, autonomia, senioridade).",
      en: "[Placeholder] Second recommendation. Focus on impact and what it's like to work with you (communication, autonomy, seniority).",
    },
    author: "Nome do Gestor",
    role: { pt: "Engineering Manager · Softplan", en: "Engineering Manager · Softplan" },
  },
  {
    quote: {
      pt: "[Placeholder] Terceira recomendação (opcional). Pode ser de um cliente de freela ou de um par de outro time.",
      en: "[Placeholder] Third recommendation (optional). Could be from a freelance client or a peer on another team.",
    },
    author: "Nome do Cliente",
    role: { pt: "Product Owner", en: "Product Owner" },
  },
];

/* ---- Textos de interface (i18n) ---- */
export const ui = {
  nav: {
    about: { pt: "Sobre", en: "About" },
    skills: { pt: "Stack", en: "Stack" },
    projects: { pt: "Projetos", en: "Projects" },
    experience: { pt: "Experiência", en: "Experience" },
    services: { pt: "Serviços", en: "Services" },
    testimonials: { pt: "Recomendações", en: "Testimonials" },
    contact: { pt: "Contato", en: "Contact" },
  },
  hero: {
    badge: { pt: "Disponível para novos projetos", en: "Available for new projects" },
    ctaPrimary: { pt: "Vamos conversar", en: "Let's talk" },
    ctaSecondary: { pt: "Ver projetos", en: "View projects" },
    scroll: { pt: "Role para explorar", en: "Scroll to explore" },
  },
  sections: {
    about: { pt: "Sobre mim", en: "About me" },
    skills: { pt: "Stack técnico", en: "Tech stack" },
    projects: { pt: "Projetos em destaque", en: "Featured projects" },
    experience: { pt: "Trajetória", en: "Experience" },
    services: { pt: "Como posso ajudar", en: "How I can help" },
    testimonials: { pt: "O que dizem de mim", en: "What people say" },
    contact: { pt: "Vamos trabalhar juntos", en: "Let's work together" },
  },
  projects: {
    repo: { pt: "Código", en: "Code" },
    demo: { pt: "Ver ao vivo", en: "Live demo" },
  },
  palette: {
    hint: { pt: "Buscar", en: "Search" },
    placeholder: { pt: "Digite um comando ou busque…", en: "Type a command or search…" },
    navigate: { pt: "Navegar", en: "Navigate" },
    actions: { pt: "Ações", en: "Actions" },
    copyEmail: { pt: "Copiar e-mail", en: "Copy email" },
    copied: { pt: "Copiado!", en: "Copied!" },
    openGithub: { pt: "Abrir GitHub", en: "Open GitHub" },
    openLinkedin: { pt: "Abrir LinkedIn", en: "Open LinkedIn" },
    openWhatsapp: { pt: "Abrir WhatsApp", en: "Open WhatsApp" },
    switchLang: { pt: "Switch to English", en: "Mudar para Português" },
    empty: { pt: "Nada encontrado.", en: "Nothing found." },
  },
  contact: {
    lead: {
      pt: "Tem um projeto em mente ou está montando um time? Me chama — respondo rápido.",
      en: "Have a project in mind or building a team? Reach out — I reply fast.",
    },
    emailLabel: { pt: "E-mail", en: "Email" },
    whatsappLabel: { pt: "WhatsApp", en: "WhatsApp" },
    formName: { pt: "Seu nome", en: "Your name" },
    formEmail: { pt: "Seu e-mail", en: "Your email" },
    formMessage: { pt: "Sua mensagem", en: "Your message" },
    formSend: { pt: "Enviar mensagem", en: "Send message" },
    formSending: { pt: "Enviando...", en: "Sending..." },
    formSuccess: {
      pt: "Mensagem enviada! Abri o WhatsApp já preenchido. 🚀",
      en: "Message sent! WhatsApp opened, pre-filled. 🚀",
    },
    formError: {
      pt: "Ops, algo falhou. Me chame direto no WhatsApp ou e-mail.",
      en: "Oops, something failed. Reach me directly on WhatsApp or email.",
    },
    helper: {
      pt: "Ao enviar, sua mensagem vai direto para o meu e-mail e abre o WhatsApp já preenchido.",
      en: "On send, your message goes straight to my email and opens WhatsApp pre-filled.",
    },
  },
  footer: {
    rights: { pt: "Todos os direitos reservados.", en: "All rights reserved." },
    built: { pt: "Feito com Next.js, Tailwind e Framer Motion.", en: "Built with Next.js, Tailwind and Framer Motion." },
  },
};

/* Helper curto para escolher idioma em componentes. */
export function t(pair: L, lang: Locale) {
  return pair[lang];
}
