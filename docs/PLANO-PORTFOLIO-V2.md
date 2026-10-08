# Plano — Portfólio v2 (Gabriel Vitor da Silva)

> Objetivo: um portfólio "fora do comum", publicável e divulgável, que prove na prática o que o Gabriel faz (full stack, SaaS multi-tenant, produtos reais no ar), usando **Refero** como fonte de referência de UI, **Cult UI** como biblioteca de componentes animados e **ShaderGradient** como identidade visual viva.

---

## 0. Diagnóstico do que existe hoje

| Item | Situação |
|---|---|
| Código | `Portifólio/` — Next 15.1 + React 19 + Tailwind 4 + framer-motion, i18n pt/en, Command Palette, seções Hero/About/Skills/Projects/Experience/Services/Testimonials/Contact |
| Git | **não é repositório git** |
| Vercel | **não existe projeto do portfólio** na conta `gvitordasilvas-projects`. Projetos atuais: atos20consultoria, dealeros, dealeros-homolog, confirma, gvitordasilva-site-rd2 (www.rd2arqeng.com), site-rd2, vetcare-web, v0-landing-page-para-advogado |
| Conteúdo | Bom e já bilíngue (`src/lib/content.ts`), mas vários projetos sem `repo`/`demo`; `resumeUrl` e `web3formsKey` vazios |
| Visual | Dark "developer" genérico: grid + blobs blur + grain. Funciona, mas não diferencia |

Conclusão: a base de conteúdo e i18n é aproveitável. O que muda é a **camada visual, as funcionalidades e a infra de publicação**.

---

## 1. Conceito

**"Produtos vivos, não screenshots."**
O diferencial do Gabriel não é só código: ele tem SaaS reais rodando (Confirma, Dealeros, VetCare, RD2, Atos20). O portfólio deve mostrar isso **ao vivo**: status de deploy, métricas reais, demos interativas embutidas e estudos de caso com decisões técnicas.

Direção estética (validar no Refero, ver §2):
- Fundo em **ShaderGradient** lento e escuro, com 3 cores (verde `#34e5a3` já da marca, azul `#38bdf8` e um roxo profundo). Sensação de profundidade líquida, não neon.
- Tipografia já boa (Inter + Instrument Serif itálico + JetBrains Mono). Manter.
- Superfícies **Cult UI** (Texture Card / Halo Card / Fluted Glass) por cima do shader, com borda luminosa sutil.
- Microinterações magnéticas, Dynamic Island como nav, Dock estilo macOS para atalhos.

---

## 2. Como usar o Refero (fase de pesquisa, 1 dia)

Refero (refero.design) é uma biblioteca de telas de produtos reais, filtrável por tipo de página, padrão de UX e elemento de UI. Não é biblioteca de código: é **referência para decidir layout** antes de codar.

Checklist de buscas no Refero:
1. **Page type → Personal website / Portfolio**: colher 10 referências de hero com texto + fundo generativo.
2. **Pattern → Case study**: estrutura de página de projeto (problema → solução → stack → resultado → aprendizados).
3. **Element → Bento grid**: para a seção "Agora" (status, stack, localização, disponibilidade).
4. **Pattern → Command palette / Dock**: navegação alternativa.
5. **Pattern → Changelog / Timeline**: para a experiência profissional.
6. **Flow → Contact / Booking**: formulário + agendamento.

Entregável: pasta `docs/refs/` com 15–20 prints e um `docs/refs/README.md` dizendo o que foi aproveitado de cada. Opcional: plugin do Refero no Figma para montar um wireframe rápido das 5 páginas.

---

## 3. Arquitetura de informação (rotas)

```
/[lang]                    Home (one-page longo, âncoras)
/[lang]/work               Grade de todos os projetos (filtro por stack)
/[lang]/work/[slug]        Estudo de caso (MDX) + demo embutida + status ao vivo
/[lang]/about              História, timeline, valores, foto, "uses"
/[lang]/lab                Experimentos / componentes interativos (playground)
/[lang]/contact            Formulário + agendamento + WhatsApp
/[lang]/resume             Currículo em HTML imprimível + botão PDF
/api/og                    OG image dinâmica por página
/api/github                Cache de stats do GitHub
/api/vercel-status         Status de deploy dos projetos (token read-only)
/api/chat                  "Pergunte sobre o Gabriel" (Claude API, RAG do conteúdo)
```

---

## 4. Seções da Home e componentes

Instalação Cult UI: `pnpm dlx shadcn@latest add @cult-ui/<slug>`

| # | Seção | Componentes Cult UI | Funcionalidade |
|---|---|---|---|
| 1 | **Hero** | ShaderGradientCanvas (fundo), `gradient-heading`, `text-animate`, `rolling-number`, `halo-button` / `border-beam-button` | Headline com reveal por palavra; stats contando (anos, SaaS no ar, deploys do mês via API); CTA "Ver projetos" + "Agendar conversa" |
| 2 | **Nav** | `dynamic-island` (topo) + `macos-dock` (rodapé, desktop) | Island mostra a seção atual, muda de tamanho ao rolar, expande para menu; Dock com atalhos (Home, Work, Lab, Contato, GitHub, LinkedIn, tema, idioma) |
| 3 | **Agora (bento)** | `minimal-card`, `texture-card`, `halo-badge`, `globe` (COBE), `timer` | Cards: localização no globo girando, "disponível para remoto", stack atual, último commit (GitHub API), horário local em tempo real |
| 4 | **Produtos no ar** | `browser-window`, `apple-iphone-17-pro-max`, `hover-video-player`, `halo-badge` | Cada produto num mockup de navegador com vídeo em hover; badge com último deploy da Vercel; link para estudo de caso |
| 5 | **Projetos (grade)** | `direction-aware-tabs`, `expandable-card`, `family-drawer` | Filtro por Java / Next / Angular / Infra; expandir sem sair da página; drawer no mobile |
| 6 | **Como eu trabalho** | `terminal-animation`, `code-block`, `feature-sticky-section` | Terminal animado rodando `docker compose up` do OrderFlow; sticky section com 4 princípios |
| 7 | **Experiência** | `intro-disclosure` + `shift-card` | Timeline Softplan → TOTVS → Pulsati com disclosure por cargo |
| 8 | **Depoimentos** | `3d-carousel` ou `tweet-grid` | Carrossel 3D de depoimentos |
| 9 | **Lab** | `shader-lens-blur`, `fluid-ai-workloads`, `distorted-glass` | Vitrine de experimentos (prova de domínio de front) |
| 10 | **Contato** | `popover-form`, `halo-input`, `halo-toast`, `metal-button` | Form com Zod → Resend; toast; botão WhatsApp; embed de agendamento |
| 11 | **Footer** | `logo-carousel`, `copy-button` | Carrossel de logos da stack; copiar e-mail com 1 clique |

Transversal:
- **Command Palette** (já existe) → trocar por `halo-search`, com ações: tema, idioma, copiar e-mail, abrir currículo, modo apresentação.
- **Cursor custom** com `illustration-cursor` em áreas interativas.
- `texture-overlay` substituindo o grain atual.

---

## 5. Funcionalidades "fora do comum"

1. **Status ao vivo dos produtos**: `/api/vercel-status` consulta a API da Vercel (token read-only em env) e mostra "deploy há 2h · OK" em cada card. Prova que os projetos existem e são mantidos.
2. **Pergunte sobre o Gabriel**: chat flutuante (`prompt-composer` + `speech-bubble`) com Claude API respondendo só a partir do conteúdo do site. Rate limit por IP, 20 mensagens/dia.
3. **Demos embutidas**: em cada estudo de caso, um `browser-window` com iframe do produto em modo demo (Confirma, VetCare) ou vídeo curto.
4. **Currículo gerado do mesmo conteúdo**: `/resume` em HTML e PDF via `@react-pdf/renderer`. Nunca mais currículo desatualizado.
5. **OG images dinâmicas**: `next/og` por rota, com o shader estático como fundo. Preview bonito no LinkedIn e WhatsApp.
6. **Modo apresentação**: tecla `P` esconde a nav, aumenta a tipografia e navega por seções com setas. Útil em entrevista.
7. **Easter eggs**: Konami code muda as cores do shader; `/lab` tem mini playground do ShaderGradient com controles (reusa a URL de shadergradient.co/customize).
8. **Guestbook**: visitantes deixam uma linha (login GitHub via Auth.js, Supabase como banco). Prova social orgânica.
9. **Métricas públicas**: página `/stats` com visitas (Vercel Analytics), commits dos últimos 90 dias (GitHub GraphQL) e uptime dos produtos.
10. **Tema com shader**: light/dark trocam as 3 cores do shader com transição suave; preferência em `localStorage`.

---

## 6. Stack e dependências

| Camada | Escolha | Nota |
|---|---|---|
| Framework | **Next 16** (App Router, RSC) | alinhar com Confirma/ConstroManager; migrar de 15.1 |
| UI base | shadcn/ui + **Cult UI** (registry `@cult-ui`) | Cult UI exige shadcn + Tailwind + `motion` |
| Animação | `motion` (framer-motion v12 já instalado) | Cult UI usa `motion/react` |
| Fundo | `@shadergradient/react` + `@react-three/fiber@9` + `three` + `three-stdlib` + `camera-controls` | R3F v9 é obrigatório com React 19 / App Router. Carregar com `next/dynamic` `ssr:false`, `pixelDensity` 1 no mobile, pausar fora da viewport |
| Conteúdo | MDX (`content-collections`) para estudos de caso | `content.ts` continua para dados estruturados |
| Form/e-mail | Zod + Resend | substitui Web3Forms |
| Banco | Supabase (guestbook, rate limit do chat) | já conhece |
| IA | Claude API (`claude-haiku-5-5`) | streaming via `ai` SDK |
| Deploy | Vercel, região `gru1`, domínio próprio (ex.: `gvitordasilva.dev`) | |
| Qualidade | ESLint, Prettier, Playwright smoke test, Lighthouse CI no PR | |

Performance (não negociável): Lighthouse ≥ 90 mobile. Shader só na Hero, `prefers-reduced-motion` desliga animações, imagens AVIF via `next/image`, fontes locais.

---

## 7. Design system (tokens)

```
bg          #06070a (mantém)
accent      #34e5a3 verde · accent-2 #38bdf8 azul · accent-3 #8b5cf6 roxo (novo)
shader      color1 #0b1a14 · color2 #0f2a3a · color3 #1b1038
            type waterPlane · uSpeed 0.2 · uStrength 2.5 · cDistance 3.6
radius      16px cards · 999px pills
glass       bg white/4% · border white/8% · blur 16px
```

Light mode: shader claro (#e9fdf5 / #e3f5ff / #efe9ff) e texto `#0b0d12`.

---

## 8. Fases e cronograma (≈ 4 semanas, meio período)

| Fase | Dias | Entrega |
|---|---|---|
| **F0 Infra** | 1 | `git init`, repo GitHub `gvitordasilva/portfolio`, projeto Vercel, envs, domínio, CI básico |
| **F1 Pesquisa** | 1 | Refero: 15–20 refs + wireframe das 5 páginas |
| **F2 Fundação** | 3 | Upgrade Next 16, shadcn init, registry Cult UI, tokens, ShaderGradient na Hero, Dynamic Island, Dock |
| **F3 Home** | 5 | Seções 1–11 da tabela §4; Command Palette estendido; tema light/dark |
| **F4 Estudos de caso** | 4 | MDX, 5 cases (Confirma, Dealeros, VetCare, OrderFlow, RD2) com demo embutida e status ao vivo |
| **F5 Funcionalidades** | 5 | Chat IA, guestbook, `/resume` + PDF, OG dinâmico, `/stats`, modo apresentação |
| **F6 Polimento** | 3 | Lighthouse, acessibilidade (axe), reduced-motion, mobile, Playwright, SEO (sitemap, JSON-LD Person) |
| **F7 Lançamento** | 1 | Domínio final, post no LinkedIn com vídeo de 30s, OG testado, Google Search Console |

---

## 9. Divulgação (pós-lançamento)

- Vídeo de 30–45s da Hero + Dynamic Island + status ao vivo → LinkedIn, X, Instagram.
- Post técnico "Como fiz o status ao vivo dos meus SaaS no portfólio" (dev.to / LinkedIn Article).
- Submeter em: Awwwards (Portfolio), Godly, Dark Mode Design, Refero (dá para submeter o próprio site), Land-book.
- README do repo público com GIF e stack: recrutador que chega pelo GitHub também vê.

---

## 10. Riscos e decisões pendentes

| Risco / decisão | Mitigação |
|---|---|
| Shader pesado no mobile | `pixelDensity` 1, pausar fora da viewport, fallback CSS gradient animado quando `reduced-motion` ou GPU fraca |
| Cult UI é copy-paste: muitos componentes = bundle grande | Importar só os ~20 da tabela; dynamic import no Lab |
| Token da Vercel exposto | Só em Route Handler server-side, escopo read-only, cache de 10 min |
| Custo do chat IA | Haiku, limite diário por IP, contexto curto |
| Domínio | Decidir `.dev` vs `.com.br`; `.dev` força HTTPS e passa imagem técnica |
| Projetos sem repo público (OrderFlow, ConstroManager) | Estudo de caso com vídeo + diagrama; tornar OrderFlow público é o ideal |

---

## 11. Próximos passos imediatos

1. Aprovar este plano (ou ajustar conceito/seções).
2. F0: criar repo + projeto Vercel (preciso de ok para `git init`, push e `vercel link`).
3. F1: sessão de Refero. Posso navegar e colher as referências se você logar no navegador embutido, ou você cola os links.

---

### Fontes consultadas
- Cult UI: https://www.cult-ui.com/docs/components · https://github.com/nolly-studio/cult-ui
- ShaderGradient: https://github.com/ruucm/shadergradient
- Refero: https://refero.design/
