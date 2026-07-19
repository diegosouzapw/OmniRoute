/**
 * Shared audio/speech HTTP response helpers.
 *
 * Extracted from `open-sse/handlers/audioSpeech.ts` so that both the handler
 * and any provider-specific adapter modules extracted alongside it (e.g.
 * `open-sse/executors/awsPollyTts.ts`) can share the same response-shaping
 * logic without importing from the (frozen, file-size-ratcheted) handler
 * itself — which would create a circular import.
 */
import { CORS_HEADERS } from "./cors.ts";

/**
 * Pull a human-readable error message out of a parsed upstream JSON error body.
 */
function extractUpstreamErrorMessage(parsed) {
  const detail = parsed?.detail;
  const candidates = [
    parsed?.err_msg,
    parsed?.error?.message,
    typeof parsed?.error === "string" ? parsed.error : null,
    parsed?.message,
    typeof detail === "string" ? detail : detail?.message,
  ];

  const raw = candidates.find(Boolean);
  return raw ? String(raw) : null;
}

/**
 * Return a CORS error response from an upstream fetch failure.
 */
export function upstreamErrorResponse(res: Response, errText: string): Response {
  // Always return JSON so the client can detect 401/credential errors reliably
  let errorMessage: string;
  try {
    const parsed = JSON.parse(errText);
    errorMessage =
      extractUpstreamErrorMessage(parsed) || errText || `Upstream error (${res.status})`;
  } catch {
    errorMessage = errText || `Upstream error (${res.status})`;
  }

  return Response.json(
    { error: { message: errorMessage, code: res.status } },
    {
      status: res.status,
      headers: { ...CORS_HEADERS },
    }
  );
}

/**
 * Return a CORS audio stream response.
 */
export function audioStreamResponse(res: Response, defaultContentType = "audio/mpeg"): Response {
  const contentType = res.headers.get("content-type") || defaultContentType;
  return new Response(res.body, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": contentType,
      "Transfer-Encoding": "chunked",
    },
  });
}
