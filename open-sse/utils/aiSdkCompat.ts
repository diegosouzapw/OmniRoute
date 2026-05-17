/**
 * AI SDK compatibility helpers (T26).
 */

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
 * defaults to non-stream when the body omits `stream`, regardless of Accept
 * header. Without this hint, OmniRoute previously routed Anthropic /v1/messages
 * requests with a curl-default wildcard Accept header through the streaming
 * branch even though upstream returned JSON, producing STREAM_EARLY_EOF /
 * HTTP 502 errors.
 */
export function resolveStreamFlag(
  bodyStream: unknown,
  acceptHeader: unknown,
  sourceFormat?: string
): boolean {
  // Explicit body value always wins
  if (bodyStream === true) return true;
  if (bodyStream === false) return false;

  // Anthropic Messages API spec: stream defaults to false when body omits it.
  // Only honor an explicit text/event-stream Accept header as a streaming opt-in
  // for /v1/messages — otherwise default to non-stream so upstream JSON responses
  // are surfaced correctly instead of triggering stream_early_eof.
  if (sourceFormat === "claude") {
    if (typeof acceptHeader === "string" && /text\/event-stream/i.test(acceptHeader)) {
      return true;
    }
    return false;
  }

  // No explicit stream param — preserve OmniRoute's streaming default unless
  // the client explicitly asks for JSON and does not also accept SSE.
  return !clientWantsJsonResponse(acceptHeader);
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
