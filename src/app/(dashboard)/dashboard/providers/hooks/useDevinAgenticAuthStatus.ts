"use client";

import { useEffect, useState } from "react";

/** Reads only the authenticated boolean; the server never returns CLI account PII. */
export function useDevinAgenticAuthStatus(enabled: boolean): boolean {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetch("/api/providers/devin-cli-agentic/auth-status", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as { status?: string };
      })
      .then((result) => {
        if (!cancelled) setAuthenticated(result?.status === "authenticated");
      })
      .catch(() => {
        if (!cancelled) setAuthenticated(false);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return enabled && authenticated;
}
