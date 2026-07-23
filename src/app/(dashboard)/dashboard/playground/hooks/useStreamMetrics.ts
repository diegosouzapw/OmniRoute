// src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts
"use client";

import { useRef, useState } from "react";
import type { StreamMetrics } from "@/shared/schemas/playground";
import { computeMetrics } from "@/lib/playground/streamMetrics";

/**
 * Mede TTFT/TPS client-perceived (D12). `start()` ao disparar request,
 * `onFirstChunk()` ao receber 1º chunk SSE, `onChunk(tokens)` ao processar
 * cada chunk com tokens, `finish(usage?)` ao stream completar (com optional
 * usage do upstream para tokensIn/tokensOut precisos).
 */
export interface UseStreamMetrics {
  metrics: StreamMetrics;
  start: () => void;
  onFirstChunk: () => void;
  onChunk: (tokensInThisChunk: number) => void;
  finish: (usage?: { prompt_tokens?: number; completion_tokens?: number }) => void;
  reset: () => void;
}

const INITIAL_METRICS: StreamMetrics = {
  ttftMs: null,
  totalMs: null,
  tokensIn: 0,
  tokensOut: 0,
  tps: null,
  costUsd: null,
};

interface TimingRefs {
  startedAt: number | null;
  firstChunkAt: number | null;
  finishedAt: number | null;
  tokensIn: number;
  tokensOut: number;
}

/**
 * React hook for tracking client-perceived stream metrics.
 *
 * @param modelPricing Optional pricing for cost estimation (D13 — labeled "(estimated)").
 */
export function useStreamMetrics(modelPricing?: {
  inUsdPer1k: number;
  outUsdPer1k: number;
}): UseStreamMetrics {
  const [metrics, setMetrics] = useState<StreamMetrics>(INITIAL_METRICS);

  const refs = useRef<TimingRefs>({
    startedAt: null,
    firstChunkAt: null,
    finishedAt: null,
    tokensIn: 0,
    tokensOut: 0,
  });

  function start(): void {
    const now = Date.now();
    refs.current = {
      startedAt: now,
      firstChunkAt: null,
      finishedAt: null,
      tokensIn: 0,
      tokensOut: 0,
    };
    setMetrics(
      computeMetrics({
        startedAt: now,
        firstChunkAt: null,
        finishedAt: null,
        tokensIn: 0,
        tokensOut: 0,
        pricing: modelPricing
          ? { ...modelPricing, estimated: true }
          : undefined,
      }),
    );
  }

  function onFirstChunk(): void {
    if (refs.current.firstChunkAt != null) {
      // Only record the first chunk once.
      return;
    }
    const now = Date.now();
    refs.current.firstChunkAt = now;
    setMetrics(
      computeMetrics({
        ...refs.current,
        pricing: modelPricing
          ? { ...modelPricing, estimated: true }
          : undefined,
      }),
    );
  }

  function onChunk(tokensInThisChunk: number): void {
    refs.current.tokensOut += tokensInThisChunk;
    // Intentionally no setState here to avoid flooding renders — UI can read
    // periodic updates or wait for finish(). Callers that need live tps should
    // call setMetrics themselves or use a throttled update strategy.
  }

  function finish(usage?: { prompt_tokens?: number; completion_tokens?: number }): void {
    const now = Date.now();
    refs.current.finishedAt = now;
    if (usage != null) {
      if (usage.prompt_tokens != null) {
        refs.current.tokensIn = usage.prompt_tokens;
      }
      if (usage.completion_tokens != null) {
        refs.current.tokensOut = usage.completion_tokens;
      }
    }
    setMetrics(
      computeMetrics({
        ...refs.current,
        pricing: modelPricing
          ? { ...modelPricing, estimated: true }
          : undefined,
      }),
    );
  }

  function reset(): void {
    refs.current = {
      startedAt: null,
      firstChunkAt: null,
      finishedAt: null,
      tokensIn: 0,
      tokensOut: 0,
    };
    setMetrics(INITIAL_METRICS);
  }

  return {
    metrics,
    start,
    onFirstChunk,
    onChunk,
    finish,
    reset,
  };
}
