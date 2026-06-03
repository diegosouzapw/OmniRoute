"use client";

import { useEffect, useState } from "react";

export const DEFAULT_DISPLAY_BASE_URL = "http://localhost:20128";

function normalizeUrl(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

/**
 * Returns the public base URL to display in the dashboard.
 *
 * Resolution chain:
 *   1. NEXT_PUBLIC_BASE_URL (env, trimmed + slash-normalized) — wins if set.
 *   2. window.location.origin after client mount — when env is unset.
 *   3. DEFAULT_DISPLAY_BASE_URL ("http://localhost:20128") — SSR / first render fallback.
 *
 * DISPLAY ONLY — do NOT use this hook for OAuth `redirect_uri`.
 * OAuth callers must read `process.env.NEXT_PUBLIC_BASE_URL` directly to avoid
 * host-header attack surface. For server-side resolution, use
 * `src/shared/utils/resolveOmniRouteBaseUrl.ts` instead.
 */
export function useDisplayBaseUrl(): string {
  const envValue = normalizeUrl(process.env.NEXT_PUBLIC_BASE_URL);

  const [url, setUrl] = useState<string>(envValue ?? DEFAULT_DISPLAY_BASE_URL);

  useEffect(() => {
    if (envValue) return;
    const origin = normalizeUrl(window.location.origin) ?? DEFAULT_DISPLAY_BASE_URL;
    // Schedule via queueMicrotask so setState is called inside a callback,
    // not synchronously in the effect body (react-hooks/set-state-in-effect).
    // The unmounted guard prevents a stale setState on a torn-down root
    // (relevant under React strict mode's double-invoke, where cleanup runs
    // before the microtask fires on the first effect invocation).
    let unmounted = false;
    queueMicrotask(() => {
      if (!unmounted) setUrl(origin);
    });
    return () => {
      unmounted = true;
    };
  }, [envValue]);

  return url;
}
