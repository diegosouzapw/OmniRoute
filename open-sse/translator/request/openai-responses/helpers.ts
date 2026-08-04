// Pure shared primitives for the OpenAI Responses <-> Chat Completions request
// translators. Extracted verbatim from openai-responses.ts (no host imports).

export type JsonRecord = Record<string, unknown>;
export const RESPONSES_STORE_MARKER = "_omnirouteResponsesStore";
export const COPILOT_REASONING_SUMMARY_MARKER = "_omnirouteCopilotReasoningSummary";

// Forward-compatible regex: matches web_search, web_search_20250305, and future versioned names.
export const WEB_SEARCH_TOOL_TYPES = /^web_search/;
// tool_search is a Responses API built-in sent by newer Codex clients; it has no Chat Completions
// equivalent and must be silently dropped (not rejected with 400).
export const TOOL_SEARCH_TOOL_TYPES = /^tool_search/;
// image_generation is a Responses API hosted tool that Codex Desktop injects into every request
// (even text-only ones); it has no Chat Completions equivalent and must be silently dropped (#2950).
export const IMAGE_GENERATION_TOOL_TYPES = /^image_generation/;

// GPT-5 output verbosity: `verbosity` on Chat Completions, `text.verbosity` on the
// Responses API. Only these three levels are valid upstream; anything else is dropped.
export const VERBOSITY_LEVELS = new Set(["low", "medium", "high"]);
export function normalizeVerbosity(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const level = value.toLowerCase();
  return VERBOSITY_LEVELS.has(level) ? level : undefined;
}

export function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

// The Responses API rejects call_id values longer than 64 characters (9router#396).
// Clamp deterministically so a function_call and its matching function_call_output keep
// the same id and stay paired through the orphaned-output filter below.
export const MAX_CALL_ID_LEN = 64;
export function clampCallId(id: string): string {
  return id.length > MAX_CALL_ID_LEN ? id.slice(0, MAX_CALL_ID_LEN) : id;
}

export function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function imageUrlToText(value: unknown): string {
  if (typeof value === "string") return value;
  const record = toRecord(value);
  return toString(record.url);
}

const CODEX_GPT_5_6_MODEL_PATTERN =
  /^gpt-5\.6-(?:sol|terra|luna)(?:-(?:none|low|medium|high|xhigh|max|ultra))?$/;

function supportsNativeMaxReasoningEffort(model: unknown): boolean {
  const normalizedModel = toString(model)
    .trim()
    .toLowerCase()
    .replace(/^(?:codex|cx)\//, "");
  return CODEX_GPT_5_6_MODEL_PATTERN.test(normalizedModel);
}

export function normalizeResponsesReasoningEffort(value: unknown, model?: unknown): string {
  const effort = toString(value).toLowerCase();
  if (effort !== "max") return effort;
  return supportsNativeMaxReasoningEffort(model) ? "max" : "xhigh";
}

export function shouldRequestClaudeSummarizedThinking(value: unknown): boolean {
  const summary = toString(value).toLowerCase();
  return !!summary && summary !== "off" && summary !== "none" && summary !== "disabled";
}

export function unsupportedFeature(
  message: string
): Error & { statusCode: number; errorType: string } {
  const error = new Error(message) as Error & { statusCode: number; errorType: string };
  error.statusCode = 400;
  error.errorType = "unsupported_feature";
  return error;
}
