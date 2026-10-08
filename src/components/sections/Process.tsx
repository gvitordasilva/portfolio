"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
  type TerminalLine,
} from "@/components/ui/terminal-animation";
import { useLang } from "@/lib/i18n";
import { principles, terminalTabs, ui2, tr } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Process() {
  const { lang } = useLang();
  const [key, setKey] = useState(0);

  return (
    <section id="process" className="container-x section-y">
      <SectionHeading
        eyebrow={tr(ui2.process.eyebrow, lang)}
        title={tr(ui2.process.title, lang)}
        sub={tr(ui2.process.sub, lang)}
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <TerminalAnimationRoot
            key={key}
            alwaysDark
            defaultActiveTab={0}
            hideCursorOnComplete={false}
            tabs={terminalTabs}
            className="relative w-full overflow-clip rounded-3xl border border-border bg-[#0a0c10]"
          >
            <button
              type="button"
              onClick={() => setKey((k) => k + 1)}
              aria-label="replay"
              className="absolute right-3 top-3 z-20 grid h-7 w-7 place-items-center rounded-md border border-white/15 bg-black/40 text-white/70 hover:text-white"
            >
              <RefreshCw size={12} />
            </button>
            <TerminalAnimationContainer className="max-w-none p-3 sm:p-5">
              <TerminalAnimationWindow className="rounded-2xl border border-white/10 bg-[#0d1016]">
                <TerminalAnimationContent className="min-h-[22rem] p-4 sm:p-5">
                  <div className="flex items-center gap-2 leading-relaxed">
                    <span className="mono select-none text-xs text-white/40">$</span>
                    <TerminalAnimationCommandBar className="mono text-xs text-white sm:text-sm" cursor={<TerminalAnimationBlinkingCursor />} />
                  </div>
                  <TerminalAnimationOutput
                    className="mt-1"
                    renderLine={(line: TerminalLine, _i: number, visible: boolean) =>
                      visible ? (
                        <div className="leading-relaxed">
                          <span className={cn("mono text-xs sm:text-sm", line.color ?? "text-white/60")}>{line.text || " "}</span>
                        </div>
                      ) : null
                    }
                  />
                  <TerminalAnimationTrailingPrompt className="mt-1 flex items-center gap-2 leading-relaxed">
                    <span className="mono select-none text-xs text-white/40">$</span>
                    <TerminalAnimationBlinkingCursor />
                  </TerminalAnimationTrailingPrompt>
                </TerminalAnimationContent>
                <div className="flex justify-center pb-4">
                  <TerminalAnimationTabList className="inline-flex items-center gap-0 rounded-lg border border-white/10 bg-white/5 p-1">
                    {terminalTabs.map((tab, i) => (
                      <TerminalAnimationTabTrigger
                        key={tab.label}
                        index={i}
                        className={cn(
                          "mono cursor-pointer rounded-md px-3 py-1 text-xs transition-all",
                          "data-[state=active]:bg-brand data-[state=active]:text-black data-[state=active]:font-medium",
                          "data-[state=inactive]:text-white/50 data-[state=inactive]:hover:text-white"
                        )}
                      >
                        {tab.label}
                      </TerminalAnimationTabTrigger>
                    ))}
                  </TerminalAnimationTabList>
                </div>
              </TerminalAnimationWindow>
            </TerminalAnimationContainer>
          </TerminalAnimationRoot>
        </motion.div>

        <ol className="flex flex-col gap-3">
          {principles.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group flex gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-brand/40"
            >
              <span className="mono mt-0.5 text-xs text-brand">0{i + 1}</span>
              <div>
                <h3 className="font-semibold tracking-tight">{tr(p.title, lang)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tr(p.body, lang)}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
