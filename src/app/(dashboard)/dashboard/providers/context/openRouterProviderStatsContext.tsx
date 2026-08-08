"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { OpenRouterProviderStatsEntry } from "../providerPageUtils";

/**
 * Makes OpenRouter provider popularity/identity enrichment available to every
 * ProviderCard without prop-drilling it through the ~15 render sites in
 * page.tsx (one per auth-type section). Looked up by provider slug — cards
 * for providers OpenRouter doesn't know about simply get `undefined`.
 */
const EMPTY_STATS_MAP: ReadonlyMap<string, OpenRouterProviderStatsEntry> = new Map();
const Context = createContext<ReadonlyMap<string, OpenRouterProviderStatsEntry>>(EMPTY_STATS_MAP);

export function OpenRouterProviderStatsProvider({
  entries,
  children,
}: {
  entries: OpenRouterProviderStatsEntry[];
  children: ReactNode;
}) {
  const bySlug = useMemo(() => new Map(entries.map((entry) => [entry.slug, entry])), [entries]);
  return <Context.Provider value={bySlug}>{children}</Context.Provider>;
}

export function useOpenRouterProviderStat(
  providerId: string | undefined
): OpenRouterProviderStatsEntry | undefined {
  const bySlug = useContext(Context);
  return providerId ? bySlug.get(providerId) : undefined;
}
