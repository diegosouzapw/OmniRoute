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
import { errorResponse } from "./error.ts";
import { sanitizeErrorMessage } from "./errorSanitization.ts";

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
 *
 * #15159: this used to interpolate the raw upstream body into `error.message`. It is
 * called with `await res.text()` from ~35 provider call sites (audioSpeech, the TTS
 * executors, and every transcription provider), so anything a provider chose to return —
 * a stack frame, an absolute path, a credential echoed in its own error text — reached
 * the client verbatim. That is what the repo's own rule forbids:
 * `upstreamErrorResponse.ts:39-41` says an opaque body must not be echoed "even
 * sanitized fragments", and `moderations.ts` / `ocr.ts` already comply.
 *
 * Now:
 *  - a JSON body keeps its shape through `buildSanitizedUpstreamErrorResponse`, which
 *    runs `sanitizeUpstreamDetails` over every value (credentials, paths, stack tails,
 *    credential-shaped keys are dropped recursively);
 *  - an opaque / non-JSON body gets the canonical envelope with a fixed fallback, never
 *    the provider's text;
 *  - CORS is re-applied afterwards, because the canonical builders do not emit it and
 *    these routes set CORS only on the OPTIONS preflight.
 */
export function upstreamErrorResponse(res: Response, errText: string): Response {
  const status = res.status;
  const fallbackMessage = `Upstream error (${status})`;
  const text = errText ?? "";

  // Only a JSON body's own message is reused. An opaque body (HTML / plaintext — which
  // providers return constantly despite the JSON content type) is never echoed, per
  // upstreamErrorResponse.ts:39-41: such pages can carry credentials or implementation
  // details OUTSIDE the patterns the canonical sanitizer knows about, so echoing even a
  // "sanitized fragment" is unsafe.
  let upstreamMessage: string | null = null;
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed && typeof parsed === "object") {
      upstreamMessage = extractUpstreamErrorMessage(parsed);
    }
  } catch {
    upstreamMessage = null;
  }

  // `errorResponse` runs sanitizeErrorMessage internally, so the upstream's reason is
  // kept when it is safe prose ("Rate limit exceeded for this organization") and reduced
  // when it is not (stack frames, absolute paths, credential-shaped strings).
  const safeMessage = upstreamMessage ? sanitizeErrorMessage(upstreamMessage) : "";
  const response = errorResponse(status, safeMessage || fallbackMessage);

  // The canonical builders do not emit CORS, and these routes set it only on the OPTIONS
  // preflight — re-apply it or browser clients break (same trap as #15159 E-02).
  for (const [header, value] of Object.entries(CORS_HEADERS)) {
    response.headers.set(header, value);
  }
  return response;
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
