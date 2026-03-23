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
 * OpenAI-compatible behavior: stream only when `stream: true` and client did not force JSON.
 */
export function resolveStreamFlag(bodyStream: unknown, acceptHeader: unknown): boolean {
  return bodyStream === true && !clientWantsJsonResponse(acceptHeader);
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
