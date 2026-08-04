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

// Subset of ABORT_FINISH_REASONS that specifically means "the model attempted a
// tool call and Gemini's parser rejected it" (as opposed to language/no_image/
// other, which aren't about tool calls at all). Live incident (dashboard log id
// 1784489701456-d8c0e9): passing "malformed_function_call" through raw as
// finish_reason left a real OpenAI-format client (OpenClaw) with a value it has
// no handling for at all — no tool_calls array, no recognized terminal state — so
// it silently never noticed the turn failed. gemini-to-openai.ts uses this to
// synthesize a tool_calls entry and finish_reason: "tool_calls" instead, routing
// the failure into the ordinary "tool call arguments didn't parse" path every
// OpenAI-compatible agent loop already has to handle.
const MALFORMED_TOOL_CALL_FINISH_REASONS = new Set([
  "malformed_function_call",
  "unexpected_tool_call",
]);

export function isMalformedToolCallFinishReason(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return MALFORMED_TOOL_CALL_FINISH_REASONS.has(value.toLowerCase());
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
