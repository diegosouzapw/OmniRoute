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
 */
export function resolveStreamFlag(bodyStream: unknown, acceptHeader: unknown): boolean {
  // Explicit body value always wins
  if (bodyStream === true) return true;
  if (bodyStream === false) return false;
  // No explicit stream param — fall back to Accept header heuristic
  return !clientWantsJsonResponse(acceptHeader);
}

/**
 * Detects explicit aliases meaning "do not stream".
 * Useful for clients that do not send OpenAI's canonical `stream: false` field.
 */
export function hasExplicitNoStreamParam(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  if (b.non_stream === true) return true;
  if (b.disable_stream === true) return true;
  if (b.disable_streaming === true) return true;
  if (b.streaming === false) return true;

  return false;
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
