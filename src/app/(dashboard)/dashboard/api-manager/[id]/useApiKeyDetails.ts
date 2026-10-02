"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  parseKeyConfig,
  parseKeyQuota,
  parseSelfServiceView,
  parseTokenLimits,
} from "./apiKeyDetailsData";
import type { KeyConfig, KeyQuotaView, SelfServiceView, TokenLimitRow } from "./apiKeyDetailsData";

export type DetailsLoadError = "not_found" | "forbidden" | "failed";

export interface ApiKeyDetailsData {
  view: SelfServiceView;
  /** `null` when the endpoint failed; the section renders its own error. */
  keyConfig: KeyConfig | null;
  tokenLimits: TokenLimitRow[] | null;
  keyQuota: KeyQuotaView | null;
}

interface JsonResult {
  ok: boolean;
  status: number;
  body: unknown;
}

async function requestJson(url: string, init?: RequestInit): Promise<JsonResult> {
  try {
    const res = await fetch(url, init);
    const body: unknown = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, body };
  } catch {
    return { ok: false, status: 0, body: null };
  }
}

function fetchJson(url: string): Promise<JsonResult> {
  return requestJson(url, { cache: "no-store" });
}

/** JSON mutation used by the page controls; never throws (network errors become `ok: false`). */
export function sendJson(
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  payload?: unknown
): Promise<JsonResult> {
  return requestJson(url, {
    method,
    ...(payload !== undefined && {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  });
}

function classifyError(status: number): DetailsLoadError {
  if (status === 404) return "not_found";
  if (status === 401 || status === 403) return "forbidden";
  return "failed";
}

interface LoadResult {
  data: ApiKeyDetailsData | null;
  error: DetailsLoadError | null;
}

async function loadApiKeyDetails(keyId: string): Promise<LoadResult> {
  const id = encodeURIComponent(keyId);
  const [selfService, key, tokenLimits, keyQuota] = await Promise.all([
    fetchJson(`/api/keys/${id}/self-service`),
    fetchJson(`/api/keys/${id}`),
    fetchJson(`/api/usage/token-limits?apiKeyId=${id}`),
    fetchJson(`/api/usage/key-quota?apiKeyId=${id}`),
  ]);
  const view = selfService.ok ? parseSelfServiceView(selfService.body) : null;
  if (!view) {
    return { data: null, error: classifyError(selfService.ok ? 500 : selfService.status) };
  }
  return {
    error: null,
    data: {
      view,
      keyConfig: key.ok ? parseKeyConfig(key.body) : null,
      tokenLimits: tokenLimits.ok ? parseTokenLimits(tokenLimits.body) : null,
      keyQuota: keyQuota.ok ? parseKeyQuota(keyQuota.body) : null,
    },
  };
}

/**
 * Loads everything the per-key details page renders. `reload()` refetches all
 * sources; it is what every control calls after a successful save. A failed
 * reload keeps the last loaded data and only reports the error.
 */
export function useApiKeyDetails(keyId: string) {
  const [data, setData] = useState<ApiKeyDetailsData | null>(null);
  const [error, setError] = useState<DetailsLoadError | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const requestSeq = useRef(0);

  const applyResult = useCallback((seq: number, result: LoadResult) => {
    if (seq !== requestSeq.current) return;
    if (result.data) setData(result.data);
    setError(result.error);
    setLoading(false);
  }, []);

  useEffect(() => {
    const seq = ++requestSeq.current;
    void loadApiKeyDetails(keyId).then((result) => applyResult(seq, result));
  }, [keyId, applyResult]);

  const reload = useCallback(async () => {
    const seq = ++requestSeq.current;
    setRefreshing(true);
    try {
      applyResult(seq, await loadApiKeyDetails(keyId));
    } finally {
      setRefreshing(false);
    }
  }, [keyId, applyResult]);

  return { data, error, loading, refreshing, reload };
}
