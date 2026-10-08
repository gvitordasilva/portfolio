"use client";

import { useEffect, useState } from "react";

export type DeployState = "READY" | "BUILDING" | "QUEUED" | "ERROR" | "CANCELED" | "INITIALIZING";

export type VercelStatus =
  | { available: false }
  | {
      available: true;
      fetchedAt: number;
      deploys30d: number;
      projects: Record<string, { state: DeployState; createdAt: number; url?: string }>;
    };

let cache: VercelStatus | null = null;
let inflight: Promise<VercelStatus> | null = null;

async function load(): Promise<VercelStatus> {
  if (cache) return cache;
  if (!inflight) {
    inflight = fetch("/api/vercel-status")
      .then((r) => (r.ok ? r.json() : { available: false }))
      .catch(() => ({ available: false }))
      .then((s: VercelStatus) => {
        cache = s;
        return s;
      });
  }
  return inflight;
}

/** Status de deploy dos produtos, compartilhado entre Hero, Produtos e estudos de caso. */
export function useVercelStatus() {
  const [status, setStatus] = useState<VercelStatus | null>(cache);
  useEffect(() => {
    let alive = true;
    load().then((s) => alive && setStatus(s));
    return () => {
      alive = false;
    };
  }, []);
  return status;
}
