"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  ApiKeyUsageLimitPayload,
  ApiKeyUsageLimitSavePayload,
} from "./components/ApiKeyUsageLimitCard";

export function useApiKeyUsageLimits(selectedApiKeyId: string | null) {
  const [payload, setPayload] = useState<ApiKeyUsageLimitPayload | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!selectedApiKeyId) {
      setPayload(null);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `/api/keys/${encodeURIComponent(selectedApiKeyId)}/usage-limits`
      );
      if (!response.ok) throw new Error("Failed to load API key usage limits");
      setPayload((await response.json()) as ApiKeyUsageLimitPayload);
    } catch {
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [selectedApiKeyId]);

  const save = useCallback(
    async (next: ApiKeyUsageLimitSavePayload) => {
      if (!selectedApiKeyId) return;
      const response = await fetch(`/api/keys/${encodeURIComponent(selectedApiKeyId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!response.ok) throw new Error("Failed to save API key usage limits");
      await load();
    },
    [load, selectedApiKeyId]
  );

  useEffect(() => {
    void load();
  }, [load]);

  return { payload, loading, save };
}
