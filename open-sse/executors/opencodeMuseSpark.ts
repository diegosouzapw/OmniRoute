/**
 * Muse Spark output-budget floor and finish-reason normalisation.
 *
 * Moved out of `opencode.ts` unchanged: these are pure helpers with no dependency on the
 * executor, and `opencode.ts` re-exports the public ones so existing imports keep working.
 */

/**
 * muse-spark (opencode-go) burns its entire output budget on invisible
 * server-side reasoning before emitting any content. With small caller-set
 * budgets the upstream answers HTTP 200 with an empty message
 * (`{"message":{"role":"assistant"},"finish_reason":null}` and
 * `completion_tokens == max_tokens`) — chatCore then flags the fake success as
 * "Provider returned empty content" / 502 and burns a fallback attempt.
 *
 * Verified live 2026-08-23: max_tokens=64/100 → empty content;
 * 256/512/1024 → content present (hidden reasoning consumed 196–253 of it).
 *
 * Floor raised budgets only — explicit large budgets and non-muse-spark models
 * are untouched, and no budget is synthesized when the caller set none.
 */
export const MUSE_SPARK_MIN_OUTPUT_TOKENS = 512;

export function applyMuseSparkMinOutputTokens(model: string, body: Record<string, unknown>): void {
  if (!model.startsWith("muse-spark")) return;
  const current = body.max_tokens;
  if (typeof current !== "number" || !Number.isFinite(current)) return;
  if (current >= MUSE_SPARK_MIN_OUTPUT_TOKENS) return;
  body.max_tokens = MUSE_SPARK_MIN_OUTPUT_TOKENS;
}

/** The completion count to trust: the tracked one when the caller has it, else the payload's usage. */
function reportedCompletionTokens(
  payload: Record<string, unknown>,
  completionOverride: number | null | undefined
): number | null {
  if (typeof completionOverride === "number") return completionOverride;
  const usage = payload.usage as Record<string, unknown> | undefined;
  return typeof usage?.completion_tokens === "number" ? usage.completion_tokens : null;
}

/**
 * muse-spark's gateway reports `finish_reason:"length"` whenever its hidden
 * reasoning consumed part of the output budget — even when the visible
 * completion is tiny relative to the requested budget (observed: ~270
 * completion tokens on a 128000-token request). OpenAI-protocol clients map a
 * "length" stop onto the caller's own max-tokens cap, so Claude Code aborts a
 * fully-delivered answer with "response exceeded the 128000 output token
 * maximum".
 *
 * Rewrite `length` → `stop` when the reported completion count proves the real
 * token limit was never reached (<90% of the caller's budget). Genuine
 * truncations at the budget are preserved. Streaming frames carry usage before
 * the terminal finish frame, so the completion count is known in time.
 */
export function normalizeMuseSparkFinishReason(
  payload: Record<string, unknown>,
  requestedBudget: number | null,
  /** Streaming: usage arrives in an earlier frame than the finish frame — caller passes the tracked count here. */
  completionOverride?: number | null
): void {
  const choices = Array.isArray(payload.choices) ? payload.choices : [];
  for (const choice of choices) {
    if (!choice || typeof choice !== "object") continue;
    const record = choice as Record<string, unknown>;
    if (record.finish_reason !== "length") continue;
    if (requestedBudget === null || requestedBudget === undefined) continue;
    const completion = reportedCompletionTokens(payload, completionOverride);
    if (completion === null) continue;
    if (completion < Math.floor(requestedBudget * 0.9)) {
      record.finish_reason = "stop";
    }
  }
}

/** SSE line normalizer for muse-spark streams: tracks usage, rewrites finish frames. */
export function createMuseSparkStreamFinishNormalizer(
  requestedBudget: number | null
): (dataLine: string) => string {
  let completionTokens: number | null = null;
  return (line: string): string => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:") || trimmed.includes("[DONE]")) return line;
    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed.slice(5).trim());
    } catch {
      return line;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return line;
    const payload = parsed as Record<string, unknown>;
    const usage = payload.usage as Record<string, unknown> | undefined;
    if (usage && typeof usage.completion_tokens === "number") {
      completionTokens = usage.completion_tokens;
    }
    const hadFinish = Array.isArray(payload.choices)
      ? (payload.choices as Array<Record<string, unknown>>).some(
          (c) => c && c.finish_reason === "length"
        )
      : false;
    if (!hadFinish) return line;
    normalizeMuseSparkFinishReason(payload, requestedBudget, completionTokens);
    return `data: ${JSON.stringify(payload)}`;
  };
}

export function isResponsesTerminalLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data:")) return false;
  try {
    const payload = JSON.parse(trimmed.slice(5).trim()) as Record<string, unknown>;
    return payload.type === "response.completed";
  } catch {
    return false;
  }
}
