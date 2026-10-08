"use client";

import { motion } from "motion/react";

/* Reveal palavra a palavra, mantendo a tag semântica do pai (h1, p...). */
export function SplitWords({
  text,
  delay = 0,
  className,
  highlightLast = 0,
}: {
  text: string;
  delay?: number;
  className?: string;
  /** Quantas palavras finais recebem o estilo serif/gradiente. */
  highlightLast?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => {
        const hl = i >= words.length - highlightLast;
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={hl ? "serif inline-block italic font-normal text-gradient" : "inline-block"}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </motion.span>
  );
}
