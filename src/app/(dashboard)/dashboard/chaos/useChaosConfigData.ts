"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_CHAOS_PAGE_CONFIG,
  type ChaosPageConfig,
  type ChaosProviderInfo,
} from "./chaosPageTypes";

function pickProviderName(conn: any): string {
  return conn.provider || conn.name || conn.id || "";
}

function toProviderInfo(conn: any, providerName: string): ChaosProviderInfo {
  return {
    id: conn.id,
    name: conn.name || conn.provider || providerName,
    provider: conn.provider || providerName,
    defaultModel: conn.defaultModel || null,
  };
}

/** Extract a deduplicated ChaosProviderInfo[] from the /api/providers connections payload. */
function extractProvidersFromPayload(payload: unknown): ChaosProviderInfo[] {
  const allConnections = (payload as any)?.connections || (payload as any)?.data || payload;
  if (!Array.isArray(allConnections)) return [];

  const extracted: ChaosProviderInfo[] = [];
  const seenProvider = new Set<string>();
  for (const conn of allConnections) {
    const providerName = pickProviderName(conn);
    if (!providerName || seenProvider.has(providerName.toLowerCase())) continue;
    seenProvider.add(providerName.toLowerCase());
    extracted.push(toProviderInfo(conn, providerName));
  }
  return extracted;
}

/** Fetch the persisted chaos config, or null on failure (caller keeps the default). */
async function fetchChaosConfig(): Promise<ChaosPageConfig | null> {
  const res = await fetch("/api/chaos/config");
  if (!res.ok) return null;
  const data = await res.json();
  return data.config || DEFAULT_CHAOS_PAGE_CONFIG;
}

/** Fetch active provider connections, or [] on failure/empty. */
async function fetchChaosProviders(): Promise<ChaosProviderInfo[]> {
  const res = await fetch("/api/providers");
  if (!res.ok) return [];
  const data = await res.json();
  return extractProvidersFromPayload(data);
}

/**
 * Chaos config + provider-connection data loading for the Chaos Mode config
 * page. Extracted out of the page component to keep it under the
 * complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function useChaosConfigData() {
  const [config, setConfig] = useState<ChaosPageConfig>(DEFAULT_CHAOS_PAGE_CONFIG);
  const [providers, setProviders] = useState<ChaosProviderInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Build a unique list of provider names from active connections for the dropdown
  const availableProviders = useMemo(() => {
    const seen = new Set<string>();
    return providers.filter((p) => {
      const key = p.provider || p.name || p.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [providers]);

  // Fetch current config + providers on mount
  useEffect(() => {
    async function load() {
      try {
        const [nextConfig, nextProviders] = await Promise.all([
          fetchChaosConfig(),
          fetchChaosProviders(),
        ]);
        if (nextConfig) setConfig(nextConfig);
        if (nextProviders.length > 0) setProviders(nextProviders);
      } catch (err) {
        console.error("[chaos] Failed to load config", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { config, setConfig, availableProviders, loading };
}
