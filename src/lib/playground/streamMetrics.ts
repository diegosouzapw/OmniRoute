// src/lib/playground/streamMetrics.ts
// Pure function — no React dependency. Reusable outside of hooks.

import type { StreamMetrics } from "@/shared/schemas/playground";
import { resolveGenerationMs } from "@/shared/utils/logTps";

export interface ComputeMetricsArgs {
  /** ms timestamp of when the request was dispatched. null = not started. */
  startedAt: number | null;
  /** ms timestamp of when the first SSE chunk was received. null = not received yet. */
  firstChunkAt: number | null;
  /** ms timestamp of when the stream finished. null = not finished yet. */
  finishedAt: number | null;
  /** Number of input/prompt tokens. */
  tokensIn: number;
  /** Number of output/completion tokens accumulated. */
  tokensOut: number;
  /**
   * Optional pricing to compute costUsd.
   * `estimated: true` marks that this is a client-side estimate (D13).
   */
  pricing?: {
    inUsdPer1k: number;
    outUsdPer1k: number;
    estimated: true;
  };
}

/**
 * Computes client-perceived streaming metrics from timing + token counts.
 *
 * All timing values are "client-perceived" (D12) — measured from the browser's
 * perspective, not the server's. UI should label these "(client-side estimate)".
 *
 * #13130: `tps` is GENERATION throughput — tokens over (totalMs - ttftMs) when
 * the first chunk timing is known, matching the gateway rule in
 * open-sse/utils/generationThroughput.ts ("tok/s MUST exclude TTFT"). Without
 * a first-chunk timestamp it falls back to the full client-perceived window.
 */
export function computeMetrics(args: ComputeMetricsArgs): StreamMetrics {
  const { startedAt, firstChunkAt, finishedAt, tokensIn, tokensOut, pricing } = args;

  const ttftMs = firstChunkAt != null && startedAt != null ? firstChunkAt - startedAt : null;

  const totalMs = finishedAt != null && startedAt != null ? finishedAt - startedAt : null;

  const generationMs = resolveGenerationMs(totalMs, ttftMs);
  const tps =
    generationMs != null && generationMs > 0 && tokensOut > 0
      ? tokensOut / (generationMs / 1000)
      : null;

  const costUsd =
    pricing != null
      ? (tokensIn * pricing.inUsdPer1k + tokensOut * pricing.outUsdPer1k) / 1000
      : null;

  return {
    ttftMs,
    totalMs,
    tokensIn,
    tokensOut,
    tps,
    costUsd,
  };
}
