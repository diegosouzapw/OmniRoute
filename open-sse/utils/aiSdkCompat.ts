/**
 * AI SDK compatibility helpers (T26).
 */

export type StreamDefaultMode = "legacy" | "json";

export interface ResolveStreamFlagOptions {
  userAgent?: unknown;
  streamDefaultMode?: unknown;
  /**
   * When true, the provider rejects non-streaming requests (e.g. forceStream providers
   * such as CodeBuddy). resolveStreamFlag will keep streaming even when the client sends
   * Accept: application/json or stream:false; the caller is responsible for accumulating
   * the stream and converting it to a JSON response for the client. (#2081)
   */
  providerRequiresStreaming?: boolean;
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
 * Route-level Accept-header streaming opt-in (#302). A client that OMITS `stream`
 * in the body but sends `Accept: text/event-stream` is asking for SSE (curl/httpx
 * and similar non-SDK clients). But a client that ALSO lists `application/json`
 * is using the OpenAI / Vercel AI SDK non-stream signature
 * (`Accept: application/json, text/event-stream` with the body omitting `stream`)
 * and expects a JSON object — do NOT force SSE for it (#5305). An explicit body
 * `stream` value (true or false) always wins and is never overridden.
 */
export function acceptHeaderForcesStream(acceptHeader: unknown, bodyStream: unknown): boolean {
  if (bodyStream !== undefined) return false;
  if (typeof acceptHeader !== "string") return false;
  const normalized = acceptHeader.toLowerCase();
  return normalized.includes("text/event-stream") && !normalized.includes("application/json");
}

/**
 * Resolves stream behavior from request body + Accept header.
 * Priority: explicit `stream: true/false` in body wins, UNLESS the provider
 * requires streaming (`providerRequiresStreaming: true`) — in that case the
 * result is always `true` regardless of client preference (#2081).
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
  const options = normalizeResolveStreamFlagOptions(optionsOrUserAgent);

  // Stream-only providers must keep streaming even when the client asked for JSON;
  // OmniRoute accumulates the provider stream and converts it to JSON for the client
  // downstream (handleForcedSSEToJson). Sending stream:false to such a provider
  // returns HTTP 400. (#2081)
  if (options.providerRequiresStreaming) return true;

  // Explicit body value always wins (for non-stream-only providers)
  if (bodyStream === true) return true;
  if (bodyStream === false) return false;

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

  // An Accept header that explicitly lists `application/json` is a JSON opt-in,
  // even when it ALSO lists `text/event-stream`. That is the OpenAI / Vercel AI
  // SDK non-stream signature (`Accept: application/json, text/event-stream` with
  // the body omitting `stream`): doGenerate()/generateText() send it and parse
  // the response as JSON. Default such requests to non-stream so they don't get
  // an SSE body they can't parse (#5305). Pure-SSE clients (text/event-stream
  // with no application/json) and clients with no/`*/*` Accept still stream.
  if (typeof acceptHeader === "string" && /application\/json/i.test(acceptHeader)) {
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
