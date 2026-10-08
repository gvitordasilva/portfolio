"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { projects, ui, t, type Project } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  );
}

/* Capa gerada para projetos sem screenshot — mantém o bento coeso. */
function GeneratedCover({ project }: { project: Project }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-bg-soft">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-accent/15 blur-[70px]" />
      <div className="absolute bottom-0 -left-10 h-40 w-40 rounded-full bg-accent-2/15 blur-[70px]" />
      <span className="mono relative text-lg text-muted transition-colors duration-500 group-hover:text-accent sm:text-xl">
        {"<"}
        <span className="text-text">{project.title.replace(/\s+/g, "")}</span>
        {" />"}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  large,
}: {
  project: Project;
  large: boolean;
}) {
  const { lang } = useLang();

  const cover = project.image ? (
    <Image
      src={project.image}
      alt={`${project.title} — screenshot`}
      fill
      sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />
  ) : (
    <GeneratedCover project={project} />
  );

  return (
    <div
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 transition-colors hover:border-accent/50"
    >
      {/* Cover */}
      <div
        className={`relative w-full overflow-hidden border-b border-border ${
          large ? "aspect-[16/8]" : "aspect-[16/9]"
        }`}
      >
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} — ${t(ui.projects.demo, lang)}`}
            className="absolute inset-0"
          >
            {cover}
          </a>
        ) : (
          cover
        )}
      </div>

      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx) var(--my), var(--color-accent-soft), transparent 70%)",
        }}
      />

      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mono mt-1 text-xs text-accent">
              {t(project.tagline, lang)}
            </p>
          </div>
          <div className="flex gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={t(ui.projects.repo, lang)}
                className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                </svg>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={t(ui.projects.demo, lang)}
                className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
          {t(project.description, lang)}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="mono rounded border border-border bg-bg/60 px-2 py-0.5 text-xs text-faint"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Bento: primeiro card grande (4/6) + par (2/6), depois fileiras de 3/6.
 * O índice 0 (projeto de destaque) ganha o card grande. */
const spans = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function Projects() {
  const { lang } = useLang();

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeading index="03" title={t(ui.sections.projects, lang)} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {projects.map((p, i) => (
          <Reveal
            key={p.title}
            delay={(i % 2) * 0.08}
            className={`h-full ${spans[i % spans.length]}`}
          >
            <ProjectCard project={p} large={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
