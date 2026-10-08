"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useInView } from "framer-motion";

/* Snippet tokenizado — cada token com sua cor, digitado caractere a caractere. */
type Token = { text: string; className: string };

const kw = "text-accent-2";
const str = "text-accent";
const id = "text-text";
const pn = "text-muted";
const cm = "text-faint italic";

const tokens: Token[] = [
  { text: "const", className: kw },
  { text: " dev", className: id },
  { text: " = {", className: pn },
  { text: "\n  name", className: id },
  { text: ": ", className: pn },
  { text: '"Gabriel Vitor"', className: str },
  { text: ",", className: pn },
  { text: "\n  stack", className: id },
  { text: ": [", className: pn },
  { text: '"Java"', className: str },
  { text: ", ", className: pn },
  { text: '"Spring"', className: str },
  { text: ", ", className: pn },
  { text: '"React"', className: str },
  { text: ", ", className: pn },
  { text: '"Angular"', className: str },
  { text: "],", className: pn },
  { text: "\n  experience", className: id },
  { text: ": ", className: pn },
  { text: "6", className: str },
  { text: ", ", className: pn },
  { text: "// anos", className: cm },
  { text: "\n  remote", className: id },
  { text: ": ", className: pn },
  { text: "true", className: kw },
  { text: ",", className: pn },
  { text: "\n  ship", className: id },
  { text: ": (", className: pn },
  { text: "idea", className: id },
  { text: ") => ", className: pn },
  { text: "production", className: id },
  { text: "(", className: pn },
  { text: "idea", className: id },
  { text: "),", className: pn },
  { text: "\n};", className: pn },
];

const totalLength = tokens.reduce((acc, t) => acc + t.text.length, 0);

export function CodeCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(totalLength);
      return;
    }
    const interval = window.setInterval(() => {
      setCount((c) => {
        if (c >= totalLength) {
          window.clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 22);
    return () => window.clearInterval(interval);
  }, [inView]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -6,
      y: ((e.clientX - r.left) / r.width - 0.5) * 6,
    });
  }

  // Fatia os tokens até o caractere `count`, preservando as cores.
  let remaining = count;
  const visible: Token[] = [];
  for (const token of tokens) {
    if (remaining <= 0) break;
    visible.push(
      remaining >= token.text.length
        ? token
        : { ...token, text: token.text.slice(0, remaining) }
    );
    remaining -= token.text.length;
  }
  const done = count >= totalLength;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 200ms ease-out",
      }}
      className="rounded-2xl border border-border bg-surface/70 shadow-glow backdrop-blur"
    >
      {/* Barra de janela */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mono ml-3 text-xs text-faint">gabriel.ts</span>
      </div>

      <pre className="mono min-h-[13.5rem] overflow-x-auto p-5 text-sm leading-relaxed">
        <code>
          {visible.map((token, i) => (
            <span key={i} className={token.className}>
              {token.text}
            </span>
          ))}
          {!done && <span className="caret" aria-hidden />}
        </code>
      </pre>
    </div>
  );
}
