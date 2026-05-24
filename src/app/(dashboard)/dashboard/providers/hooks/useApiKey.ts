"use client";

import { useState, useEffect } from "react";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  isActive?: boolean;
  createdAt?: string;
}

interface UseApiKeyOptions {
  preferredId?: string;
}

interface UseApiKeyResult {
  apiKey: string;
  setApiKey: (key: string) => void;
  keys: ApiKey[];
  loading: boolean;
}

/**
 * useApiKey — fetch OmniRoute API keys from /api/keys and expose the first
 * active key (or the one matching `preferredId`) as `apiKey`.
 *
 * The hook only fetches once on mount.  Use the returned `setApiKey` to let
 * the user pick a different key from a <select> control.
 */
export function useApiKey(opts?: UseApiKeyOptions): UseApiKeyResult {
  const [apiKey, setApiKey] = useState<string>("");
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const preferredId = opts?.preferredId;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/keys");
        if (!res.ok) return;
        const data = (await res.json()) as { keys?: ApiKey[] };
        const list: ApiKey[] = data.keys ?? [];
        if (cancelled) return;
        setKeys(list);
        const active = preferredId
          ? list.find((k) => k.id === preferredId)
          : list.find((k) => k.isActive !== false);
        setApiKey(active?.key ?? "");
      } catch {
        // silently ignore — the playground is non-critical
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [preferredId]);

  return { apiKey, setApiKey, keys, loading };
}
