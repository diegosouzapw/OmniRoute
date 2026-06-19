/**
 * AI SDK compatibility helpers (T26).
 */

export type StreamDefaultMode = "legacy" | "json";

export interface ResolveStreamFlagOptions {
  userAgent?: unknown;
  streamDefaultMode?: unknown;
}

function normalizeResolveStreamFlagOptions(optionsOrUserAgent?: unknown): ResolveStreamFlagOptions {
  if (
    optionsOrUserAgent &&
    typeof optionsOrUserAgent === "object" &&
    !Array.isArray(optionsOrUserAgent)
  ) {
    return optionsOrUserAgent as ResolveStreamFlagOptions;
  }
  return { userAgent: optionsOrUserAgent };
}

export function normalizeStreamDefaultMode(value: unknown): StreamDefaultMode {
  return value === "json" ? "json" : "legacy";
}

/**
 * Detects when a client explicitly prefers JSON (non-SSE) responses.
 */
export function clientWantsJsonResponse(acceptHeader: unknown): boolean {
  if (typeof acceptHeader !== "string") return false;
  const normalized = acceptHeader.toLowerCase();
  return normalized.includes("application/json") && !normalized.includes("text/event-stream");
}

/**
 * Resolves stream behavior from request body + Accept header.
 * Priority: explicit `stream: true/false` in body wins.
 * Accept header only acts as fallback when stream is not explicitly set.
 * Fixes #656: clients sending both `stream: true` and `Accept: application/json`
 * should still get streaming responses — body intent takes precedence.
 *
 * Optional `sourceFormat` argument lets callers apply spec-correct defaults
 * when both `stream` and `Accept` are ambiguous. The Anthropic Messages API
 * and the OpenAI Responses API both default to non-stream when the body omits
 * `stream`. Without this hint, OmniRoute previously routed those requests with
 * a curl-default wildcard Accept header through the streaming branch even
 * though upstream returned JSON, producing STREAM_EARLY_EOF / HTTP 502.
 */
export function resolveStreamFlag(
  bodyStream: unknown,
  acceptHeader: unknown,
  sourceFormat?: string,
  optionsOrUserAgent?: unknown
): boolean {
  // Explicit body value always wins
  if (bodyStream === true) return true;
  if (bodyStream === false) return false;

  const options = normalizeResolveStreamFlagOptions(optionsOrUserAgent);
  const streamDefaultMode = normalizeStreamDefaultMode(options.streamDefaultMode);

  const acceptsEventStream =
    typeof acceptHeader === "string" && /text\/event-stream/i.test(acceptHeader);

  // Anthropic Messages API and OpenAI Responses API both specify stream=false
  // when the body omits `stream`. Honor an explicit text/event-stream Accept
  // header as a streaming opt-in; otherwise default to non-stream so
  // spec-compliant upstreams that return JSON don't trigger STREAM_EARLY_EOF.
  if (sourceFormat === "claude" || sourceFormat === "openai-responses") {
    if (acceptsEventStream) return true;
    return false;
  }

  // Nextcloud's OpenAI/LocalAI integration sends synchronous JSON requests and
  // does not set `stream: false`. With a wildcard/empty Accept header, the legacy
  // OmniRoute fallback would force SSE upstream and fail JSON-only providers as
  // STREAM_EARLY_EOF before Nextcloud could receive a response.
  if (isKnownJsonOnlyClient(options.userAgent) && !acceptsEventStream) {
    return false;
  }

  // Per-key compatibility mode for synchronous OpenAI-compatible clients that
  // omit `stream`. This preserves legacy behavior by default while allowing an
  // API key to use the OpenAI-compatible JSON default unless SSE is explicit.
  if (streamDefaultMode === "json" && !acceptsEventStream) {
    return false;
  }

  // No explicit stream param — preserve OmniRoute's streaming default unless
  // the client explicitly asks for JSON and does not also accept SSE.
  return !clientWantsJsonResponse(acceptHeader);
}

export function isKnownJsonOnlyClient(userAgent: unknown): boolean {
  if (typeof userAgent !== "string") return false;
  return /nextcloud\s+openai\/localai\s+integration/i.test(userAgent);
}

/**
 * Resolves explicit stream aliases used by non-standard clients.
 * Returns:
 * - `true`  -> explicit streaming intent
 * - `false` -> explicit non-stream intent
 * - `undefined` -> no explicit alias present
 */
export function resolveExplicitStreamAlias(body: unknown): boolean | undefined {
  if (!body || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;

  if (b.streaming === true) return true;
  if (b.streaming === false) return false;
  if (b.non_stream === true) return false;
  if (b.disable_stream === true) return false;
  if (b.disable_streaming === true) return false;

  return undefined;
}

/**
 * Backward-compatible helper used by tests/legacy call sites.
 */
export function hasExplicitNoStreamParam(body: unknown): boolean {
  return resolveExplicitStreamAlias(body) === false;
}

/**
 * Removes surrounding markdown code fences when Claude wraps JSON payloads.
 * Example: ```json\n{"ok":true}\n``` -> {"ok":true}
 */
export function stripMarkdownCodeFence(text: unknown): unknown {
  if (typeof text !== "string") return text;
  const codeBlockRegex = /^```(?:json|javascript|typescript|js|ts)?\s*\n?([\s\S]*?)\n?```\s*$/i;
  const match = text.trim().match(codeBlockRegex);
  return match ? match[1].trim() : text;
}
