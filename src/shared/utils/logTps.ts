/**
 * Shared tokens-per-second helpers for logged/ranked calls (#13130).
 *
 * The metric is GENERATION throughput, not end-to-end wall clock:
 * `open-sse/utils/generationThroughput.ts` documents that tok/s MUST exclude
 * TTFT. Two inputs that callers had been getting wrong converge here:
 *
 * 1. Denominator: use `durationMs - ttftMs` when TTFT is known and sane,
 *    otherwise fall back to full duration (better than hiding the number).
 * 2. Numerator: providers are expected to fold reasoning/thinking tokens into
 *    `completion_tokens` (OpenAI reasoning models, Anthropic thinking blocks,
 *    Gemini thoughts all do). A provider that instead reports reasoning only in
 *    `completion_tokens_details.reasoning_tokens` leaves `tokens_out`
 *    undercounted. `max(tokensOut, tokensReasoning)` covers both shapes
 *    without double counting: when reasoning is a subset of tokensOut the max
 *    is tokensOut; when the provider excluded it, the recorded reasoning count
 *    is the better available lower bound.
 *
 * Pure + dependency-free; safe for client components, server code, and tests.
 */

/** Non-negative finite number, else 0. */
function nonNegative(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * Generation-time window in ms: full duration minus TTFT when TTFT is known
 * and strictly inside the request; full duration otherwise (or null when the
 * duration itself is unusable).
 */
export function resolveGenerationMs(
  durationMs: number | null | undefined,
  ttftMs: number | null | undefined
): number | null {
  const duration = nonNegative(durationMs);
  if (duration <= 0) return null;
  const ttft = nonNegative(ttftMs);
  if (ttft > 0 && ttft < duration) return duration - ttft;
  return duration;
}

/** Best available output-token count for TPS: never double-counts reasoning (#13130). */
export function resolveTpsOutputTokens(
  tokensOut: number | null | undefined,
  tokensReasoning: number | null | undefined
): number {
  return Math.max(nonNegative(tokensOut), nonNegative(tokensReasoning));
}

/**
 * Tokens per second for one logged call. Returns 0 (not null) when the inputs
 * cannot produce a rate — matches the historical `getLogTps()` display
 * contract in RequestLoggerV2.
 */
export function computeLogTps(
  tokensOut: number | null | undefined,
  tokensReasoning: number | null | undefined,
  durationMs: number | null | undefined,
  ttftMs?: number | null | undefined
): number {
  const tokens = resolveTpsOutputTokens(tokensOut, tokensReasoning);
  const generationMs = resolveGenerationMs(durationMs, ttftMs);
  if (tokens <= 0 || generationMs === null || generationMs <= 0) return 0;
  return tokens / (generationMs / 1000);
}
