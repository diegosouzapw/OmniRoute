/**
 * Request-body resolution helpers for the chat handler.
 *
 * Kept dependency-free (no DB / executor imports) so it can be unit-tested in
 * isolation without pulling the full chat pipeline.
 */

/**
 * Resolve the chat request body, preferring a body already parsed upstream (#4380).
 *
 * The /v1/chat/completions route parses the body once for the prompt-injection guard,
 * then hands it here via `preParsedBody` so a large coding-agent payload (270-550 KB) is
 * not JSON-parsed a second time on the hot path — the double parse materialized the body
 * twice in heap and fed the OOM crash-loop under concurrent load. Callers that don't
 * pre-parse (most routes) pass `null`/`undefined` and the body is parsed from the request
 * as before.
 */
export async function resolveChatRequestBody(
  request: { json: () => Promise<unknown> },
  preParsedBody: unknown = null
): Promise<unknown> {
  if (preParsedBody != null) return preParsedBody;
  return await request.json();
}
