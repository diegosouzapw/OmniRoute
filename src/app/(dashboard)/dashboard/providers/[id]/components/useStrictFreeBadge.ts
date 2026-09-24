"use client";

import { useEffect, useState } from "react";
import { FREE_BADGE_STRICT_FLAG } from "@/shared/utils/freeModels";

type FlagEntry = { key?: unknown; effectiveValue?: unknown };

/**
 * Reads the FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER feature flag for the provider-page
 * model lists. Fails closed: until the flag is loaded, and on any error, it returns
 * false — the historical badge rule.
 */
export function useStrictFreeBadge(): boolean {
  const [strict, setStrict] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/settings/feature-flags");
        if (!res.ok) return;
        const data = (await res.json()) as { flags?: FlagEntry[] };
        const entry = Array.isArray(data?.flags)
          ? data.flags.find((flag) => flag?.key === FREE_BADGE_STRICT_FLAG)
          : undefined;
        const value = String(entry?.effectiveValue ?? "").toLowerCase();
        if (!cancelled) setStrict(value === "true" || value === "1" || value === "on");
      } catch {
        // Keep the historical rule.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return strict;
}
