"use client";

import { useSyncExternalStore } from "react";

export type ShaderPalette = {
  c1: string;
  c2: string;
  c3: string;
  speed: number;
  strength: number;
  brightness: number;
};

/* Paletas base. O Konami code e o Lab trocam a paleta em runtime. */
export const palettes: Record<"dark" | "light", ShaderPalette[]> = {
  dark: [
    { c1: "#0b2a1f", c2: "#0a2238", c3: "#1a0f3a", speed: 0.18, strength: 2.2, brightness: 1.0 },
    { c1: "#2a0b2a", c2: "#38150a", c3: "#0f1a3a", speed: 0.25, strength: 3, brightness: 1.1 },
    { c1: "#061f33", c2: "#0b3b2e", c3: "#2a1a08", speed: 0.2, strength: 2.6, brightness: 1.05 },
    { c1: "#1b1b1b", c2: "#2b2b2b", c3: "#0e2a1e", speed: 0.15, strength: 1.8, brightness: 0.9 },
  ],
  light: [
    { c1: "#d6f8e9", c2: "#d6ecff", c3: "#e8dfff", speed: 0.18, strength: 2.0, brightness: 1.25 },
    { c1: "#ffe3f1", c2: "#ffe9d6", c3: "#dfe6ff", speed: 0.25, strength: 2.6, brightness: 1.25 },
    { c1: "#d9ecff", c2: "#d9fff1", c3: "#fff0d9", speed: 0.2, strength: 2.4, brightness: 1.25 },
    { c1: "#ececec", c2: "#f4f4f4", c3: "#dff5ea", speed: 0.15, strength: 1.6, brightness: 1.2 },
  ],
};

let index = 0;
const listeners = new Set<() => void>();

export function nextPalette() {
  index = (index + 1) % palettes.dark.length;
  listeners.forEach((l) => l());
  return index;
}

export function setPaletteIndex(i: number) {
  index = ((i % palettes.dark.length) + palettes.dark.length) % palettes.dark.length;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useShaderPalette(theme: "dark" | "light"): ShaderPalette {
  const i = useSyncExternalStore(
    subscribe,
    () => index,
    () => 0
  );
  return palettes[theme][i];
}

export function usePaletteIndex() {
  return useSyncExternalStore(
    subscribe,
    () => index,
    () => 0
  );
}
