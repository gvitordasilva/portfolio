"use client";

import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12 flex items-end gap-4">
      <span className="mono text-sm text-accent">{index}</span>
      <div className="flex-1">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      <span className="mb-2 hidden h-px flex-1 bg-border sm:block" />
    </Reveal>
  );
}
