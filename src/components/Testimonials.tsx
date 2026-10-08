"use client";

import { useLang } from "@/lib/i18n";
import { testimonials, ui, t } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function QuoteMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-accent/40"
      aria-hidden
    >
      <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 0 1 7.17 9.5V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83H15.5a1.67 1.67 0 0 1 1.67-1.67V6Z" />
    </svg>
  );
}

export function Testimonials() {
  const { lang } = useLang();

  // Sem recomendações cadastradas, a seção simplesmente não aparece.
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeading index="06" title={t(ui.sections.testimonials, lang)} />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((tm, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent/50">
              <QuoteMark />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {t(tm.quote, lang)}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="font-medium text-text">{tm.author}</div>
                <div className="mono mt-0.5 text-xs text-accent">
                  {t(tm.role, lang)}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
