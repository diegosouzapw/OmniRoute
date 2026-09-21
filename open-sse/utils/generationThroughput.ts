/**
 * Gateway-measured generation throughput (#12616).
 *
 * tok/s MUST exclude TTFT. `output_tokens / total_latency` includes queueing and
 * first-token wait and is not generation speed. When TTFT is unknown (typical
 * non-streaming JSON), omit the field rather than guessing.
 */
export function generationDurationMs(
  totalMs: number,
  ttftMs: number | null | undefined
): number | null {
  if (!Number.isFinite(totalMs) || totalMs <= 0) return null;
  if (ttftMs == null || !Number.isFinite(ttftMs) || ttftMs < 0) return null;
  const generationMs = totalMs - ttftMs;
  return generationMs > 0 ? generationMs : null;
}

export function tokensPerSecond(
  outputTokens: number,
  generationMs: number | null | undefined
): number | null {
  if (generationMs == null || !Number.isFinite(generationMs) || generationMs <= 0) return null;
  if (!Number.isFinite(outputTokens) || outputTokens <= 0) return null;
  return outputTokens / (generationMs / 1000);
}

function outputTokenCount(usage: Record<string, unknown>): number {
  const raw =
    usage.completion_tokens ??
    usage.output_tokens ??
    usage.candidatesTokenCount ??
    usage.outputTokens ??
    usage.completionTokens;
  const n = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : 0;
}

/** Attach `tokens_per_second` when generation duration (excluding TTFT) is known. */
export function attachTokensPerSecond<T>(usage: T, generationMs: number | null | undefined): T {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return usage;
  const tps = tokensPerSecond(outputTokenCount(usage as Record<string, unknown>), generationMs);
  if (tps == null) return usage;
  return { ...(usage as Record<string, unknown>), tokens_per_second: Number(tps.toFixed(3)) } as T;
}
