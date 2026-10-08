"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <p className="mono mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand">
          <span className="inline-block h-px w-6 bg-brand/60" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </motion.div>
  );
}
