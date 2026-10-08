"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { useLang } from "@/lib/i18n";
import { testimonials, t } from "@/lib/content";
import { ui2, tr } from "@/lib/site";

export function Testimonials() {
  const { lang } = useLang();
  // Só aparece quando houver depoimentos reais em content.ts (sem "[Placeholder]").
  const real = testimonials.filter((q) => !/placeholder/i.test(q.quote.pt + q.quote.en + q.author));
  if (!real.length) return null;

  return (
    <section id="testimonials" className="container-x section-y !pt-0">
      <SectionHeading eyebrow={tr(ui2.testimonials.eyebrow, lang)} title={tr(ui2.testimonials.title, lang)} />
      <div className="grid gap-4 md:grid-cols-3">
        {real.map((q, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 18, rotate: i % 2 ? 0.6 : -0.6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="relative flex flex-col rounded-3xl border border-border bg-surface/60 p-6"
          >
            <Quote size={18} className="mb-4 text-brand" />
            <blockquote className="serif text-lg italic leading-relaxed">“{t(q.quote, lang)}”</blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-medium">{q.author}</span>
              <span className="block text-muted-foreground">{t(q.role, lang)}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
