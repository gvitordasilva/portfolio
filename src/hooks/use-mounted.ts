"use client";

import { useSyncExternalStore } from "react";

/** true só depois da hidratação. Evita mismatch em coisas que dependem do client (tema, viewport). */
export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
