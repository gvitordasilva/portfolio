"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { useShaderPalette } from "./shader-store";

/* O ShaderGradient usa WebGL/three. Carregamos só no client e só quando a
 * Hero está visível. Fora da viewport (ou com reduced-motion) cai para um
 * gradiente CSS estático com as mesmas cores. */
const Canvas = dynamic(() => import("./ShaderCanvas"), { ssr: false });

export function ShaderBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // true só no client após hidratar (evita carregar three no SSR/primeiro paint)
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const reduce = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const palette = useShaderPalette(resolvedTheme === "light" ? "light" : "dark");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fallback = {
    background: `radial-gradient(120% 90% at 20% 10%, ${palette.c1} 0%, transparent 55%),
      radial-gradient(90% 80% at 80% 30%, ${palette.c2} 0%, transparent 60%),
      radial-gradient(100% 100% at 50% 100%, ${palette.c3} 0%, transparent 60%)`,
  };

  const useWebGL = ready && !reduce && visible;

  return (
    <div ref={ref} aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 transition-opacity duration-700" style={fallback} />
      {useWebGL && (
        <div className="absolute inset-0 animate-in fade-in duration-1000">
          <Canvas palette={palette} />
        </div>
      )}
      {/* vinheta para o texto respirar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_30%,var(--background)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
