/**
 * Token Usage Tracking - Extract, normalize, estimate and log token usage
 */

import { appendRequestLog } from "@/lib/usageDb";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getNoCacheTokens,
  getPromptCacheCreationTokens,
  getPromptCacheReadTokens,
} from "@/lib/usage/tokenAccounting";
import { FORMATS } from "../translator/formats.ts";
import { pickCacheCreationTokens } from "./pickCacheCreationTokens.ts";

export { pickCacheCreationTokens };

/** Nested `*_tokens_details` containers ({ cached_tokens, reasoning_tokens, … }). */
interface UsageTokenDetail {
  cached_tokens?: number;
  cache_creation_tokens?: number;
  cache_write_tokens?: number;
  reasoning_tokens?: number;
  thinking_tokens?: number;
  [field: string]: unknown;
}

/**
 * Loosely-shaped usage object accepted from any provider wire format.
 * Declared fields cover the numeric counters this module reads/writes;
 * everything else passes through untouched via the index signature.
 */
export interface UsageLike {
  estimated?: boolean;
  input_tokens?: number;
  output_tokens?: number;
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  cached_tokens?: number;
  no_cache_tokens?: number;
  reasoning_tokens?: number;
  cost_in_usd_ticks?: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
  /** OpenRouter / Devin Desktop / codex-chatgpt-web alias for cache creation. */
  cache_write_tokens?: number;
  prompt_cache_hit_tokens?: number;
  prompt_cache_miss_tokens?: number;
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  totalTokenCount?: number;
  cachedContentTokenCount?: number;
  thoughtsTokenCount?: number;
  context_budget_input_tokens?: number;
  context_budget_prompt_tokens?: number;
  context_budget_total_tokens?: number;
  prompt_tokens_details?: UsageTokenDetail;
  input_tokens_details?: UsageTokenDetail;
  completion_tokens_details?: UsageTokenDetail;
  output_tokens_details?: UsageTokenDetail;
  [field: string]: unknown;
}

/** SSE/JSON chunk shapes this module inspects for embedded usage containers. */
interface UsagePayloadLike {
  type?: string;
  done?: boolean;
  prompt_eval_count?: number;
  eval_count?: number;
  usage?: UsageLike;
  usageMetadata?: UsageLike;
  message?: { usage?: UsageLike; [field: string]: unknown };
  response?: { usage?: UsageLike; usageMetadata?: UsageLike; [field: string]: unknown };
  [field: string]: unknown;
}

// ANSI color codes
export const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

/**
 * Safety buffer added to reported token usage to prevent clients from hitting
 * context window limits. Accounts for overhead from system prompts,
 * tool definitions, and format translation that may not be reflected in raw usage.
 *
 * Configurable via:
 *   - Settings API / Dashboard: `usageTokenBuffer` (persisted in DB)
 *   - Environment variable: `USAGE_TOKEN_BUFFER`
 *   - Defaults to 2000 if neither is set
 *
 * Set to 0 to disable the buffer entirely (raw provider token counts).
 */
const DEFAULT_BUFFER_TOKENS = 2000;

let _cachedBuffer: number | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL_MS = 30_000; // Re-read from DB/env every 30s

function getBufferTokens(): number {
  const now = Date.now();
  const isExpired = _cachedBuffer !== null && now - _cacheTimestamp >= CACHE_TTL_MS;

  if (_cachedBuffer !== null && !isExpired) {
    return _cachedBuffer;
  }

  // Priority: env var > cached DB value > default
  const envVal = process.env.USAGE_TOKEN_BUFFER;
  if (envVal !== undefined) {
    const parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      _cachedBuffer = parsed;
      _cacheTimestamp = now;
      return parsed;
    }
  }

  // Return cached value or default; kick off async DB read to update cache.
  // On first call (_cachedBuffer is null), use the default.
  // On TTL expiry (_cachedBuffer is stale), continue returning the stale value
  // while refreshing asynchronously — prevents blocking the hot path.
  if (_cachedBuffer === null || isExpired) {
    if (_cachedBuffer === null) {
      _cachedBuffer = DEFAULT_BUFFER_TOKENS;
    }
    _cacheTimestamp = now;
    _loadBufferFromDb();
  }
  return _cachedBuffer;
}

async function _loadBufferFromDb(): Promise<void> {
  try {
    const { getSettings } = await import("@/lib/db/settings");
    const settings = await getSettings();
    const val = settings.usageTokenBuffer;
    if (typeof val === "number" && val >= 0) {
      _cachedBuffer = val;
      _cacheTimestamp = Date.now();
    }
  } catch {
    // DB not ready yet or settings unavailable — keep current value
  }
}

/** Force-refresh the buffer from settings (e.g. after a settings update). */
export function invalidateBufferTokensCache(): void {
  _cachedBuffer = null;
  _cacheTimestamp = 0;
}

/**
 * Directly set the cached buffer value — called by runtimeSettings after a
 * settings save so the new value is available synchronously on the next request
 * (no race window between invalidation and the async DB re-read).
 */
export function setBufferTokensCache(value: number): void {
  _cachedBuffer = value;
  _cacheTimestamp = Date.now();
}

// Get HH:MM:SS timestamp
function getTimeString() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Compute the context-window safety margin for a usage object, WITHOUT touching the
 * client-visible/metering fields (prompt_tokens/input_tokens/total_tokens).
 *
 * #8331: the buffer used to be added directly into those fields, so a real 69-token
 * request was reported to the client as 2069 while call_logs/the raw upstream body kept
 * the true 69 — a metering/billing discrepancy. The safety margin this function computes
 * is intentionally scoped to context-fit/CLI-headroom use only (see module docstring
 * above); it is surfaced here as separate `context_budget_*` fields so it never gets
 * confused with reported token accounting again. `filterUsageForFormat()` does not
 * allow-list these fields, so they are stripped before any response reaches a client.
 * @param {object} usage - Usage object (supported format)
 * @returns {object} Usage with context_budget_* fields added (metering fields unchanged)
 */
export function addBufferToUsage(usage: UsageLike | null | undefined) {
  if (!usage || typeof usage !== "object") return usage;

  // Heuristic estimates (web/cookie providers with no upstream metering) should
  // not get the safety buffer — otherwise a 6-token "hi"/"PONG" becomes a flat
  // ~2000 for every request and looks like fake metering.
  if ((usage as { estimated?: unknown }).estimated === true) {
    return usage;
  }

  const buffer = getBufferTokens();
  if (buffer === 0) return usage;

  const result = { ...usage };

  // Claude format
  if (result.input_tokens !== undefined) {
    result.context_budget_input_tokens = result.input_tokens + buffer;
  }

  // OpenAI format
  if (result.prompt_tokens !== undefined) {
    result.context_budget_prompt_tokens = result.prompt_tokens + buffer;
  }

  // Keep real total_tokens intact and calculate separate context-budget headroom.
  if (result.total_tokens !== undefined) {
    result.context_budget_total_tokens = result.total_tokens + buffer;
  } else if (result.prompt_tokens !== undefined && result.completion_tokens !== undefined) {
    // Calculate a real total if the provider omitted it.
    result.total_tokens = result.prompt_tokens + result.completion_tokens;
    result.context_budget_total_tokens = result.total_tokens + buffer;
  }

  return result;
}

export function filterUsageForFormat(usage: UsageLike | null | undefined, targetFormat: string) {
  if (!usage || typeof usage !== "object") return usage;

  // Cross-map between Claude-style and OpenAI-style field names before filtering.
  // Some providers return input_tokens/output_tokens even when using OpenAI format.
  const convertedUsage = { ...usage };
  if (targetFormat === FORMATS.CLAUDE || targetFormat === FORMATS.OPENAI_RESPONSES) {
    // OpenAI → Claude: prompt_tokens → input_tokens
    if (convertedUsage.prompt_tokens !== undefined && convertedUsage.input_tokens === undefined) {
      convertedUsage.input_tokens = convertedUsage.prompt_tokens;
    }
    if (
      convertedUsage.completion_tokens !== undefined &&
      convertedUsage.output_tokens === undefined
    ) {
      convertedUsage.output_tokens = convertedUsage.completion_tokens;
    }
  } else {
    // Claude → OpenAI: input_tokens → prompt_tokens
    if (convertedUsage.input_tokens !== undefined && convertedUsage.prompt_tokens === undefined) {
      convertedUsage.prompt_tokens = convertedUsage.input_tokens;
    }
    if (
      convertedUsage.output_tokens !== undefined &&
      convertedUsage.completion_tokens === undefined
    ) {
      convertedUsage.completion_tokens = convertedUsage.output_tokens;
    }
    // Ensure total_tokens is set
    if (
      convertedUsage.total_tokens === undefined &&
      convertedUsage.prompt_tokens !== undefined &&
      convertedUsage.completion_tokens !== undefined
    ) {
      convertedUsage.total_tokens = convertedUsage.prompt_tokens + convertedUsage.completion_tokens;
    }
    // Rebuild prompt_tokens_details.cached_tokens from flat cached_tokens / cache_read_input_tokens (#8171)
    const flatCached = convertedUsage.cached_tokens ?? convertedUsage.cache_read_input_tokens;
    if (flatCached !== undefined && !convertedUsage.prompt_tokens_details?.cached_tokens) {
      convertedUsage.prompt_tokens_details = {
        ...convertedUsage.prompt_tokens_details,
        cached_tokens: flatCached,
      };
    }
  }

  // Helper to pick only defined fields from usage
  const pickFields = (fields: string[]) => {
    const filtered: Record<string, unknown> = {};
    for (const field of fields) {
      if (convertedUsage[field] !== undefined) {
        filtered[field] = convertedUsage[field];
      }
    }
    return filtered;
  };

  // Define allowed fields for each format
  const formatFields: Record<string, string[]> = {
    [FORMATS.CLAUDE]: [
      "input_tokens",
      "output_tokens",
      "output_tokens_details",
      "cache_read_input_tokens",
      "cache_creation_input_tokens",
      "estimated",
      "tokens_per_second",
    ],
    [FORMATS.GEMINI]: [
      "promptTokenCount",
      "candidatesTokenCount",
      "totalTokenCount",
      "cachedContentTokenCount",
      "thoughtsTokenCount",
      "estimated",
      "tokens_per_second",
    ],
    [FORMATS.OPENAI_RESPONSES]: [
      "input_tokens",
      "output_tokens",
      "total_tokens",
      "input_tokens_details",
      "output_tokens_details",
      "estimated",
      "cost_in_usd_ticks",
      "server_side_tool_usage_details",
      "server_side_tool_usage",
      "tokens_per_second",
    ],
    // OpenAI format (default for OPENAI, CODEX, KIRO, etc.)
    default: [
      "prompt_tokens",
      "completion_tokens",
      "total_tokens",
      "cached_tokens",
      "reasoning_tokens",
      "prompt_tokens_details",
      "completion_tokens_details",
      "prompt_cache_hit_tokens",
      "prompt_cache_miss_tokens",
      "cache_read_input_tokens",
      "cache_creation_input_tokens",
      "estimated",
      "tokens_per_second",
    ],
  };

  // Get fields for target format
  let fields = formatFields[targetFormat];

  // Use same fields for similar formats
  if (targetFormat === FORMATS.ANTIGRAVITY) {
    fields = formatFields[FORMATS.GEMINI];
  } else if (targetFormat === FORMATS.OPENAI_RESPONSE) {
    fields = formatFields[FORMATS.OPENAI_RESPONSES];
  } else if (!fields) {
    fields = formatFields.default;
  }

  return pickFields(fields);
}

// Provider usage is normally authoritative, but compatibility gateways can return
// stale/cumulative cache counters. A token cannot encode less than one UTF-8 byte,
// so a stateless request's input count must remain related to the complete wire
// body. The 2x multiplier plus fixed allowance deliberately tolerates provider
// templates, tokenization differences, and format translation while still catching
// catastrophic values such as 336k tokens for a 115 KB request.
const INPUT_USAGE_BYTE_MULTIPLIER = 2;
const INPUT_USAGE_FIXED_ALLOWANCE = 8192;

const REMOTE_CONTEXT_REFERENCE_KEYS = new Set([
  "previous_response_id",
  "previousResponseId",
  "conversation_id",
  "conversationId",
  "thread_id",
  "threadId",
  "parent_message_id",
  "parentMessageId",
  "cached_content",
  "cachedContent",
  "file_id",
  "fileId",
  "image_url",
  "imageUrl",
  "audio_url",
  "audioUrl",
  "video_url",
  "videoUrl",
]);

function hasValue(value: unknown): boolean {
  if (value === null || value === undefined || value === false) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

function hasRemoteContextReference(value: unknown, depth = 0): boolean {
  if (!value || typeof value !== "object" || depth > 8) return false;

  if (Array.isArray(value)) {
    return value.some((item) => hasRemoteContextReference(item, depth + 1));
  }

  for (const [key, nested] of Object.entries(value)) {
    if (REMOTE_CONTEXT_REFERENCE_KEYS.has(key) && hasValue(nested)) {
      return true;
    }
    if (hasRemoteContextReference(nested, depth + 1)) {
      return true;
    }
  }
  return false;
}

function getSerializedBodyBytes(body: unknown): number | null {
  if (!body || typeof body !== "object" || hasRemoteContextReference(body)) return null;
  try {
    const serialized = JSON.stringify(body);
    if (!serialized) return null;
    return Buffer.byteLength(serialized, "utf8");
  } catch {
    return null;
  }
}

function tokenNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

/**
 * Return true when a provider-reported input count is plausible for this request.
 * `null`/unserializable bodies and server-side context references fail open.
 */
export function isInputTokenCountPlausible(inputTokens: unknown, body: unknown): boolean {
  if (typeof inputTokens !== "number" || !Number.isFinite(inputTokens) || inputTokens < 0) {
    return false;
  }

  const bodyBytes = getSerializedBodyBytes(body);
  if (bodyBytes === null) return true;
  const maximum = bodyBytes * INPUT_USAGE_BYTE_MULTIPLIER + INPUT_USAGE_FIXED_ALLOWANCE;
  return inputTokens <= maximum;
}

function resolveUsageFormat(usage: UsageLike | null | undefined, targetFormat: string | null) {
  if (targetFormat === FORMATS.CLAUDE) return FORMATS.CLAUDE;
  if (targetFormat === FORMATS.GEMINI || targetFormat === FORMATS.ANTIGRAVITY) {
    return FORMATS.GEMINI;
  }
  if (targetFormat === FORMATS.OPENAI_RESPONSES || targetFormat === FORMATS.OPENAI_RESPONSE) {
    return FORMATS.OPENAI_RESPONSES;
  }
  if (targetFormat === FORMATS.OPENAI) return FORMATS.OPENAI;

  if (usage?.promptTokenCount !== undefined || usage?.candidatesTokenCount !== undefined) {
    return FORMATS.GEMINI;
  }
  if (
    usage?.cache_read_input_tokens !== undefined ||
    usage?.cache_creation_input_tokens !== undefined
  ) {
    return FORMATS.CLAUDE;
  }
  if (usage?.input_tokens_details !== undefined) return FORMATS.OPENAI_RESPONSES;
  return FORMATS.OPENAI;
}

function getReportedInputTokens(usage: UsageLike, format: string): number {
  if (format === FORMATS.CLAUDE) {
    return (
      tokenNumber(usage.input_tokens) +
      tokenNumber(usage.cache_read_input_tokens) +
      tokenNumber(usage.cache_creation_input_tokens)
    );
  }
  if (format === FORMATS.GEMINI) {
    return tokenNumber(usage.promptTokenCount);
  }
  if (format === FORMATS.OPENAI_RESPONSES) {
    return tokenNumber(usage.input_tokens ?? usage.prompt_tokens);
  }
  return tokenNumber(usage.prompt_tokens ?? usage.input_tokens);
}

function clearCachedTokenDetail<T extends UsageTokenDetail | null | undefined>(value: T): T {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const result = { ...value };
  if (result.cached_tokens !== undefined) result.cached_tokens = 0;
  return result;
}

/**
 * Replace only physically implausible provider input/cache usage with the local
 * request estimate. Valid usage is returned by reference and remains untouched.
 */
export function sanitizeProviderUsageForRequest(
  usage: UsageLike | null | undefined,
  body: unknown,
  targetFormat: string | null = null
) {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return usage;

  const format = resolveUsageFormat(usage, targetFormat);
  const reportedInput = getReportedInputTokens(usage, format);
  // #10705: reportedInput === 0 was always accepted, on the theory this guard only
  // needed to catch providers over-reporting huge counts. But a real, non-trivial
  // request body can legitimately have its input tokens under-reported to exactly 0
  // by a relay provider. Only treat 0 as plausible when the request body itself is
  // trivial (no serialized body, or a body too small to plausibly need any tokens);
  // otherwise fall through to the same local-estimate repair used for over-reports.
  const bodyBytesForZeroCheck = reportedInput === 0 ? getSerializedBodyBytes(body) : null;
  const zeroIsPlausible =
    reportedInput === 0 && (bodyBytesForZeroCheck === null || bodyBytesForZeroCheck === 0);
  if (zeroIsPlausible || (reportedInput > 0 && isInputTokenCountPlausible(reportedInput, body))) {
    return usage;
  }

  const estimatedInput = Math.max(1, estimateInputTokens(body));
  const result = { ...usage };

  if (format === FORMATS.CLAUDE) {
    result.input_tokens = estimatedInput;
    result.cache_read_input_tokens = 0;
    result.cache_creation_input_tokens = 0;
    return result;
  }

  if (format === FORMATS.GEMINI) {
    const output =
      tokenNumber(result.candidatesTokenCount) + tokenNumber(result.thoughtsTokenCount);
    result.promptTokenCount = estimatedInput;
    result.cachedContentTokenCount = 0;
    if (result.totalTokenCount !== undefined) {
      result.totalTokenCount = estimatedInput + output;
    }
    return result;
  }

  if (format === FORMATS.OPENAI_RESPONSES) {
    result.input_tokens = estimatedInput;
    result.input_tokens_details = clearCachedTokenDetail(result.input_tokens_details);
    result.cache_read_input_tokens = 0;
    result.cache_creation_input_tokens = 0;
    if (result.total_tokens !== undefined) {
      result.total_tokens = estimatedInput + tokenNumber(result.output_tokens);
    }
    return result;
  }

  result.prompt_tokens = estimatedInput;
  result.cached_tokens = 0;
  result.cache_read_input_tokens = 0;
  result.cache_creation_input_tokens = 0;
  result.prompt_tokens_details = clearCachedTokenDetail(result.prompt_tokens_details);
  if (result.total_tokens !== undefined) {
    result.total_tokens = estimatedInput + tokenNumber(result.completion_tokens);
  }
  return result;
}

/**
 * Sanitize the usage container used by native provider responses/SSE events.
 * Returns true only when the payload was changed and must be re-serialized.
 */
export function sanitizeUsagePayloadForRequest(
  payload: UsagePayloadLike | null | undefined,
  body: unknown,
  targetFormat: string | null = null
): boolean {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return false;

  const replaceUsage = (
    owner: Record<string, unknown> | null | undefined,
    key: string,
    format: string | null
  ) => {
    if (!owner || typeof owner !== "object" || !owner[key]) return false;
    const sanitized = sanitizeProviderUsageForRequest(owner[key] as UsageLike, body, format);
    if (sanitized === owner[key]) return false;
    owner[key] = sanitized;
    return true;
  };

  if (payload.type === "message_start" && payload.message?.usage) {
    return replaceUsage(payload.message, "usage", FORMATS.CLAUDE);
  }
  if (payload.type === "message_delta" && payload.usage) {
    // message_delta is output-only by spec. #10705 0-input repair would
    // overwrite a valid message_start input count with an estimate.
    const delta = payload.usage;
    const deltaInput =
      tokenNumber(delta.input_tokens) +
      tokenNumber(delta.cache_read_input_tokens) +
      tokenNumber(delta.cache_creation_input_tokens);
    if (deltaInput === 0) return false;
    return replaceUsage(payload, "usage", FORMATS.CLAUDE);
  }
  if (payload.response?.usage) {
    return replaceUsage(payload.response, "usage", FORMATS.OPENAI_RESPONSES);
  }
  if (payload.response?.usageMetadata) {
    return replaceUsage(payload.response, "usageMetadata", FORMATS.GEMINI);
  }
  if (payload.usageMetadata) {
    return replaceUsage(payload, "usageMetadata", FORMATS.GEMINI);
  }
  if (payload.usage) {
    const format = payload.type === "message" ? FORMATS.CLAUDE : targetFormat;
    return replaceUsage(payload, "usage", format);
  }
  return false;
}

/**
 * Normalize usage object - ensure all values are valid numbers
 */
export function normalizeUsage(usage: UsageLike | null | undefined) {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return null;

  const normalized: Record<string, number> = {};
  const assignNumber = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;
    const numeric = Number(value);
    if (Number.isFinite(numeric)) normalized[key] = numeric;
  };

  assignNumber("prompt_tokens", usage?.prompt_tokens);
  assignNumber("completion_tokens", usage?.completion_tokens);
  assignNumber("total_tokens", usage?.total_tokens);
  assignNumber("input_tokens", usage?.input_tokens);
  assignNumber("output_tokens", usage?.output_tokens);
  assignNumber("cache_read_input_tokens", usage?.cache_read_input_tokens);
  assignNumber("cache_creation_input_tokens", pickCacheCreationTokens(usage));
  assignNumber("cached_tokens", usage?.cached_tokens);
  assignNumber("no_cache_tokens", usage?.no_cache_tokens);
  assignNumber("reasoning_tokens", usage?.reasoning_tokens);
  // xAI's exact provider-reported cost (port of decolua/9router#2453, capability A —
  // @ryanngit). Ticks → USD conversion happens in costCalculator.ts, not here.
  const exactCostTicks = usage?.cost_in_usd_ticks;
  if (
    typeof exactCostTicks === "number" &&
    Number.isFinite(exactCostTicks) &&
    exactCostTicks >= 0
  ) {
    normalized.cost_in_usd_ticks = exactCostTicks;
  }

  if (Object.keys(normalized).length === 0) return null;
  return normalized;
}

/**
 * Check if usage has valid token data
 * Valid = has at least one token field with value > 0
 * Invalid = empty object {}, null, undefined, no token fields, or all zeros
 */
export function hasValidUsage(usage: UsageLike | null | undefined) {
  if (!usage || typeof usage !== "object") return false;

  // Check for known token fields with value > 0
  const tokenFields = [
    "prompt_tokens",
    "completion_tokens",
    "total_tokens", // OpenAI
    "input_tokens",
    "output_tokens", // Claude
    "promptTokenCount",
    "candidatesTokenCount", // Gemini
    "totalTokenCount", // Gemini (was missing — caused !hasValid to misfire on {totalTokenCount:15})
  ];

  for (const field of tokenFields) {
    if (typeof usage[field] === "number" && usage[field] > 0) {
      return true;
    }
  }

  return false;
}

/** True when present but every token field zero/absent — web relays emit `{prompt_tokens:0, ...}`. */
export function isEmptyUsage(usage: unknown): boolean {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return true;
  const u = usage as Record<string, unknown>;
  for (const k of [
    "prompt_tokens",
    "completion_tokens",
    "total_tokens",
    "input_tokens",
    "output_tokens",
    "promptTokenCount",
    "candidatesTokenCount",
    "totalTokenCount",
  ]) {
    const v = u[k];
    if (typeof v === "number" && Number.isFinite(v)) {
      if (v > 0) return false;
    }
  }
  return true;
}

/**
 * Extract usage from supported formats (Claude, OpenAI, Gemini, Responses API)
 * Fast-path: return early for chunks without any usage-related fields.
 * Most streaming chunks (content deltas) have no usage — avoids property checks.
 */
export function extractUsage(chunk: UsagePayloadLike | null | undefined) {
  if (!chunk || typeof chunk !== "object") return null;

  // Fast-path: check for any usage-like fields before doing full extraction
  // Most chunks are content deltas with no usage — return null immediately.
  const c = chunk as Record<string, unknown>;
  const response = c.response as Record<string, unknown> | undefined;
  const message = c.message as Record<string, unknown> | undefined;
  if (
    !c.type &&
    c.usage === undefined &&
    c.usageMetadata === undefined &&
    response?.usage === undefined &&
    response?.usageMetadata === undefined &&
    message?.usage === undefined &&
    c.done !== true
  ) {
    return null;
  }

  // Claude/Antigravity streaming: message_start event carries INPUT tokens
  // FIX #74: This event was not handled — input_tokens were being dropped
  // Structure: { type: "message_start", message: { usage: { input_tokens: N, output_tokens: 0 } } }
  //
  // Note: Claude's input_tokens is only the non-cached portion.
  // Sum cache tokens into prompt_tokens for a correct total (consistent with
  // extractUsageFromResponse in usageExtractor.ts for non-streaming).
  if (chunk.type === "message_start" && chunk.message?.usage) {
    const u = chunk.message.usage;
    const inputTokens = u.input_tokens || u.prompt_tokens || 0;
    const cacheRead = u.cache_read_input_tokens || 0;
    const cacheCreation = u.cache_creation_input_tokens || 0;
    if (inputTokens > 0 || cacheRead > 0 || cacheCreation > 0) {
      return normalizeUsage({
        prompt_tokens: inputTokens + cacheRead + cacheCreation,
        completion_tokens: u.output_tokens || u.completion_tokens || 0,
        input_tokens: inputTokens + cacheRead + cacheCreation,
        output_tokens: u.output_tokens || u.completion_tokens || 0,
        cache_read_input_tokens: u.cache_read_input_tokens,
        cache_creation_input_tokens: u.cache_creation_input_tokens,
      });
    }
  }

  // Claude format (message_delta event) — typically carries OUTPUT tokens
  if (chunk.type === "message_delta" && chunk.usage && typeof chunk.usage === "object") {
    const deltaInput = chunk.usage.input_tokens || 0;
    const deltaCacheRead = chunk.usage.cache_read_input_tokens || 0;
    const deltaCacheCreation = chunk.usage.cache_creation_input_tokens || 0;
    return normalizeUsage({
      prompt_tokens: deltaInput + deltaCacheRead + deltaCacheCreation,
      completion_tokens: chunk.usage.output_tokens || 0,
      input_tokens: deltaInput + deltaCacheRead + deltaCacheCreation,
      output_tokens: chunk.usage.output_tokens || 0,
      cache_read_input_tokens: chunk.usage.cache_read_input_tokens,
      cache_creation_input_tokens: chunk.usage.cache_creation_input_tokens,
      reasoning_tokens: chunk.usage.output_tokens_details?.thinking_tokens,
    });
  }

  // OpenAI Responses API format (response.completed or response.done)
  if (
    (chunk.type === "response.completed" || chunk.type === "response.done") &&
    chunk.response?.usage &&
    typeof chunk.response.usage === "object"
  ) {
    const usage = chunk.response.usage;
    return normalizeUsage({
      prompt_tokens: usage.input_tokens || usage.prompt_tokens || 0,
      completion_tokens: usage.output_tokens || usage.completion_tokens || 0,
      cached_tokens:
        usage.input_tokens_details?.cached_tokens ??
        usage.prompt_tokens_details?.cached_tokens ??
        usage.cache_read_input_tokens,
      cache_creation_input_tokens: pickCacheCreationTokens(usage),
      reasoning_tokens:
        usage.output_tokens_details?.reasoning_tokens ??
        usage.completion_tokens_details?.reasoning_tokens ??
        usage.reasoning_tokens,
    });
  }

  // OpenAI format
  if (
    chunk.usage &&
    typeof chunk.usage === "object" &&
    (chunk.usage.prompt_tokens !== undefined || chunk.usage.input_tokens !== undefined)
  ) {
    return normalizeUsage({
      prompt_tokens: chunk.usage.prompt_tokens ?? chunk.usage.input_tokens ?? 0,
      completion_tokens: chunk.usage.completion_tokens ?? chunk.usage.output_tokens ?? 0,
      cached_tokens:
        chunk.usage.prompt_tokens_details?.cached_tokens ??
        chunk.usage.input_tokens_details?.cached_tokens ??
        chunk.usage.prompt_cache_hit_tokens ??
        chunk.usage.cached_tokens,
      cache_read_input_tokens: chunk.usage.cache_read_input_tokens,
      cache_creation_input_tokens: pickCacheCreationTokens(chunk.usage),
      no_cache_tokens: chunk.usage.no_cache_tokens,
      reasoning_tokens:
        chunk.usage.completion_tokens_details?.reasoning_tokens ??
        chunk.usage.output_tokens_details?.reasoning_tokens ??
        chunk.usage.reasoning_tokens,
      // xAI's exact provider-reported cost (port of decolua/9router#2453, capability A).
      cost_in_usd_ticks: chunk.usage.cost_in_usd_ticks,
    });
  }

  // Gemini format (Antigravity)
  // Antigravity wraps usageMetadata inside a `response` envelope:
  // { response: { usageMetadata: {...} } } — fall back to it so AG-shaped
  // chunks do not silently drop token usage.
  const usageMeta = chunk.usageMetadata || chunk.response?.usageMetadata;
  if (usageMeta && typeof usageMeta === "object") {
    // Gemini reports thoughts outside candidates. Fold them into completion so
    // every provider keeps reasoning as a subset of completion tokens.
    const thoughts = usageMeta.thoughtsTokenCount || 0;
    return normalizeUsage({
      prompt_tokens: usageMeta.promptTokenCount || 0,
      completion_tokens: (usageMeta.candidatesTokenCount || 0) + thoughts,
      total_tokens: usageMeta.totalTokenCount,
      cached_tokens: usageMeta.cachedContentTokenCount,
      reasoning_tokens: thoughts,
    });
  }

  // Ollama NDJSON format (raw from provider, before translation)
  // Ollama sends: { "model": "...", "done": true, "prompt_eval_count": N, "eval_count": M }
  if (chunk.done === true && typeof chunk.prompt_eval_count === "number") {
    const promptEvalCount = chunk.prompt_eval_count || 0;
    const evalCount = chunk.eval_count || 0;
    return normalizeUsage({
      prompt_tokens: promptEvalCount,
      completion_tokens: evalCount,
      total_tokens: promptEvalCount + evalCount,
    });
  }

  return null;
}

// Heuristic token estimation constants
const CHARS_PER_TOKEN_SCHEMA = 6; // ~6 chars/token for JSON schemas (more verbose per token)

/**
 * Improved token estimation heuristic (no dependency).
 * Splits text on common token boundaries (whitespace, punctuation, camelCase)
 * and applies a sub-word correction factor. Better accuracy for:
 * - English text (~4 chars/token)
 * - CJK text (~1 char/token for ideographs)
 * - Code (~3.5 chars/token, more punctuation-heavy)
 *
 * @param {string} text - Text to estimate tokens for
 * @returns {number} Estimated token count
 */
function estimateTokenCount(text: unknown) {
  if (!text || typeof text !== "string") return 0;

  // Count CJK ideographs separately — each is roughly 1 token
  const cjkMatches = text.match(/[\u3000-\u9fff\uf900-\ufaff\u{20000}-\u{2fa1f}]/gu);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;

  // Remove CJK chars for the remaining estimation
  const nonCJK = text.replace(/[\u3000-\u9fff\uf900-\ufaff]/g, " ");

  // Split on token boundaries: whitespace, punctuation, camelCase transitions
  const tokens = nonCJK
    .split(/(\s+|[^\w\s]|(?<=[a-z])(?=[A-Z]))/)
    .filter((t) => t && t.trim().length > 0);

  // Apply sub-word correction: BPE tokenizers often split long words
  // into sub-word pieces, so raw token count underestimates slightly
  const estimatedNonCJK = Math.ceil(tokens.length * 1.3);

  return cjkCount + estimatedNonCJK;
}

/**
 * Estimate input tokens from request body.
 * Separates tool definitions (JSON schemas) from message content
 * for more accurate estimation since JSON schemas are more verbose but
 * compress into fewer tokens than plain text.
 */
export function estimateInputTokens(body: unknown) {
  if (!body || typeof body !== "object") return 0;
  const record = body as Record<string, unknown>;

  try {
    let toolTokens = 0;
    let messageTokens = 0;

    // Separate tool definitions from the rest of the body
    if (record.tools && Array.isArray(record.tools)) {
      const toolStr = JSON.stringify(record.tools);
      toolTokens = Math.ceil(toolStr.length / CHARS_PER_TOKEN_SCHEMA);
      // Estimate messages without tools
      const { tools, ...bodyWithoutTools } = record;
      messageTokens = estimateTokenCount(JSON.stringify(bodyWithoutTools));
    } else {
      messageTokens = estimateTokenCount(JSON.stringify(record));
    }

    return messageTokens + toolTokens;
  } catch (err) {
    // Fallback if stringify fails
    return 0;
  }
}

/**
 * Estimate output tokens from content length.
 * Uses improved heuristic when possible, falls back to length-based estimation.
 */
export function estimateOutputTokens(contentLength: number | null | undefined) {
  if (!contentLength || contentLength <= 0) return 0;
  // When we only have a character count, use 4 chars/token with sub-word correction
  return Math.max(1, Math.ceil(contentLength / 3.5));
}

/**
 * Format usage object based on target format
 * @param {number} inputTokens - Input/prompt tokens
 * @param {number} outputTokens - Output/completion tokens
 * @param {string} targetFormat - Target format from FORMATS
 */
export function formatUsage(inputTokens: number, outputTokens: number, targetFormat: string) {
  // Claude format uses input_tokens/output_tokens
  if (targetFormat === FORMATS.CLAUDE) {
    return addBufferToUsage({
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      estimated: true,
    });
  }

  // Default: OpenAI format (works for openai, gemini, responses, etc.)
  return addBufferToUsage({
    prompt_tokens: inputTokens,
    completion_tokens: outputTokens,
    total_tokens: inputTokens + outputTokens,
    estimated: true,
  });
}

/**
 * Estimate full usage when provider doesn't return it
 * @param {object} body - Request body for input token estimation
 * @param {number} contentLength - Content length for output token estimation
 * @param {string} targetFormat - Target format from FORMATS constant
 */
export function estimateUsage(
  body: unknown,
  contentLength: number | null | undefined,
  targetFormat: string = FORMATS.OPENAI
) {
  return formatUsage(estimateInputTokens(body), estimateOutputTokens(contentLength), targetFormat);
}

/**
 * Log usage with cache info (green color)
 */
export function logUsage(
  provider: string | null | undefined,
  usage: UsageLike | null | undefined,
  model: string | null = null,
  connectionId: string | null = null,
  apiKeyInfo = null
) {
  if (!usage || typeof usage !== "object") return;

  const p = provider?.toUpperCase() || "UNKNOWN";

  // Support both formats:
  // - OpenAI: prompt_tokens, completion_tokens
  // - Claude: input_tokens, output_tokens
  const inTokens = getLoggedInputTokens(usage);
  const outTokens = getLoggedOutputTokens(usage);
  void apiKeyInfo;
  const normalizedConnectionId = typeof connectionId === "string" ? connectionId : undefined;
  const accountPrefix = normalizedConnectionId
    ? normalizedConnectionId.slice(0, 8) + "..."
    : "unknown";

  let msg = `[${getTimeString()}] 📊 ${COLORS.green}[USAGE] ${p} | in=${inTokens} | out=${outTokens} | account=${accountPrefix}${COLORS.reset}`;

  // Add estimated flag if present
  if (usage.estimated) {
    msg += ` ${COLORS.yellow}(estimated)${COLORS.reset}`;
  }

  // Add cache info if present (unified from different formats)
  const cacheRead = getPromptCacheReadTokens(usage);
  if (cacheRead) msg += ` | cache_read=${cacheRead}`;

  const cacheCreation = getPromptCacheCreationTokens(usage);
  if (cacheCreation) msg += ` | cache_create=${cacheCreation}`;

  // Non-cached (fresh) input tokens — informational only, already included in
  // prompt_tokens (Command Code reports inputTokenDetails.noCacheTokens).
  const noCache = getNoCacheTokens(usage);
  if (noCache) msg += ` | no_cache=${noCache}`;

  const reasoning = usage.reasoning_tokens;
  if (reasoning) msg += ` | reasoning=${reasoning}`;

  console.log(msg);

  // Streaming requests persist usage once in chatCore's completion callback.
  // Keep this helper side-effect free apart from console visibility.
  const tokens = {
    input: inTokens,
    output: outTokens,
    cacheRead: cacheRead || 0,
    cacheCreation: cacheCreation || 0,
    reasoning: reasoning || 0,
  };
  appendRequestLog({
    model: typeof model === "string" ? model : undefined,
    provider: typeof provider === "string" ? provider : undefined,
    connectionId: normalizedConnectionId,
    tokens,
    status: "200 OK",
  }).catch(() => {});
}
