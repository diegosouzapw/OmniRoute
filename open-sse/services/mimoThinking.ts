type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * Normalize chain-of-thought control to Xiaomi MiMo's native request shape.
 *
 * MiMo controls thinking ONLY via a top-level `thinking: { type: "enabled" | "disabled" }`
 * object (mimo.mi.com .../usage-guide/text-generation/deep-thinking). It does NOT
 * understand OpenAI's `reasoning_effort` / `reasoning`, and its request validator is
 * strict ("400 Param Incorrect"). OmniRoute's OpenAI path otherwise carries reasoning
 * intent as `reasoning_effort`, and the claude→openai translator may leave a
 * Claude-shaped `thinking:{type, budget_tokens}` — forwarding either verbatim means the
 * client's on/off choice is silently dropped AND unknown keys (`budget_tokens`,
 * `reasoning_effort`) ride along as extra params the validator can reject.
 *
 * This returns a NEW object only when it changes the body:
 *   - an existing `thinking` object  → reduced to just `{type}`; `"disabled"` stays
 *     disabled, anything else (`enabled` / `adaptive` / unknown) becomes `"enabled"`.
 *     This strips `budget_tokens` / `keep` / … that MiMo does not accept.
 *   - `reasoning_effort` / `reasoning` → removed (MiMo's unknown params).
 *
 * It deliberately does NOT synthesize `thinking:{type:"enabled"}` from a bare
 * `reasoning_effort`: `mimo-v2-omni` is documented as non-thinking, so forcing thinking
 * on from an effort hint could turn a silently-ignored param into a hard error. Clients
 * enable thinking by sending MiMo's `thinking:{type:"enabled"}` (or relying on the
 * per-model default) and disable it with `thinking:{type:"disabled"}` — both now reach
 * MiMo cleanly. When neither a thinking object nor `reasoning_effort` / `reasoning` is
 * present, the body is returned untouched so MiMo keeps its documented per-model default.
 *
 * Scope: the native `xiaomi-mimo` provider only (callers gate on provider id). This is a
 * separate concern from the OpenRouter/native reasoning_effort tier mapping in
 * `sanitizeReasoningEffortForProvider` (base.ts), which runs later and becomes a no-op
 * here once `reasoning_effort` has been removed.
 */
export function normalizeMimoThinking<T extends Record<string, unknown>>(body: T): T {
  const record = asRecord(body);
  if (!record) return body;

  const thinking = asRecord(record.thinking);
  const hasReasoningEffort = record.reasoning_effort !== undefined;
  const hasReasoning = record.reasoning !== undefined;
  if (!thinking && !hasReasoningEffort && !hasReasoning) return body;

  const next: JsonRecord = { ...record };
  if (thinking) {
    next.thinking = { type: thinking.type === "disabled" ? "disabled" : "enabled" };
  }
  delete next.reasoning_effort;
  delete next.reasoning;
  return next as T;
}
