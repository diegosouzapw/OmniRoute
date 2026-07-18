const OPENAI_FINISH_REASONS = new Set([
  "stop",
  "length",
  "tool_calls",
  "content_filter",
  "function_call",
]);

const SAFETY_FINISH_REASONS = new Set([
  "safety",
  "recitation",
  "blocklist",
  "prohibited_content",
  "content_filtered",
  "policy_violation",
  "malformed_response",
]);

// Gemini/Antigravity finish reasons that mean the model ABORTED the turn before
// completing it — most commonly a tool call the model started narrating but
// Gemini could not parse/execute (MALFORMED_FUNCTION_CALL, UNEXPECTED_TOOL_CALL).
// Distinct from SAFETY_FINISH_REASONS: those are deliberate, deterministic
// content blocks; these are execution failures mid tool-call. Left un-mapped
// here (still passed through raw, e.g. "malformed_function_call") so an
// OpenAI-format client at least sees a non-standard-but-honest value instead of
// a misleading "stop" — downstream Claude translation classifies them via
// isAbortFinishReason() so it does not collapse them to a clean "end_turn"
// (9router#2462 sub-bug #2: an aborted tool call must not present to the client
// as a successful completion).
const ABORT_FINISH_REASONS = new Set([
  "malformed_function_call",
  "unexpected_tool_call",
  "finish_reason_unspecified",
  "other",
  "language",
  "no_image",
]);

export function isAbortFinishReason(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return ABORT_FINISH_REASONS.has(value.toLowerCase());
}

export function normalizeOpenAICompatibleFinishReason(value: unknown): unknown {
  if (typeof value !== "string") return value;

  const normalized = value.toLowerCase();
  if (OPENAI_FINISH_REASONS.has(normalized)) return normalized;
  if (normalized === "max_tokens") return "length";
  if (SAFETY_FINISH_REASONS.has(normalized)) return "content_filter";

  return normalized;
}

export function normalizeOpenAICompatibleFinishReasonString(
  value: unknown,
  fallback = "stop"
): string {
  const normalized = normalizeOpenAICompatibleFinishReason(value);
  return typeof normalized === "string" && normalized ? normalized : fallback;
}
