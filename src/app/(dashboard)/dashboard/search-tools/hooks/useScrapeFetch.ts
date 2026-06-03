"use client";

import { useState, useCallback } from "react";
import type { ScrapeResult } from "@/shared/schemas/searchTools";

interface ScrapeFetchOptions {
  url: string;
  format?: "markdown" | "html" | "text";
  full_page?: boolean;
  provider?: string;
}

interface UseScrapeFetchState {
  result: ScrapeResult | null;
  loading: boolean;
  error: string | null;
  latencyMs: number | null;
}

export interface UseScrapeFetch extends UseScrapeFetchState {
  fetch: (opts: ScrapeFetchOptions) => Promise<void>;
  reset: () => void;
}

const INITIAL_STATE: UseScrapeFetchState = {
  result: null,
  loading: false,
  error: null,
  latencyMs: null,
};

export function useScrapeFetch(): UseScrapeFetch {
  const [state, setState] = useState<UseScrapeFetchState>(INITIAL_STATE);

  const performFetch = useCallback(async (opts: ScrapeFetchOptions) => {
    if (!opts.url.trim()) {
      setState((s) => ({ ...s, error: "URL is required", loading: false }));
      return;
    }

    setState({ result: null, loading: true, error: null, latencyMs: null });
    const start = Date.now();

    try {
      const body: Record<string, unknown> = {
        url: opts.url,
        format: opts.format ?? "markdown",
      };
      if (opts.full_page !== undefined) body.full_page = opts.full_page;
      if (opts.provider) body.provider = opts.provider;

      const res = await globalThis.fetch("/v1/web/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const latencyMs = Date.now() - start;
      const data = await res.json();

      if (!res.ok) {
        setState({
          result: null,
          loading: false,
          error: data?.error?.message ?? data?.error ?? `Error ${res.status}`,
          latencyMs,
        });
        return;
      }

      // Normalise to ScrapeResult shape
      const result: ScrapeResult = {
        provider: data.provider ?? "",
        url: data.url ?? opts.url,
        content: data.content ?? "",
        links: Array.isArray(data.links) ? data.links : [],
        metadata: data.metadata ?? null,
        screenshot_url: data.screenshot_url ?? null,
      };

      setState({ result, loading: false, error: null, latencyMs });
    } catch (err: unknown) {
      const latencyMs = Date.now() - start;
      const message = err instanceof Error ? err.message : "Network error";
      setState({ result: null, loading: false, error: message, latencyMs });
    }
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    fetch: performFetch,
    reset,
  };
}
