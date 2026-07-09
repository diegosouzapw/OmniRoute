/**
 * Content-Type guard for chat/message routes (#6414).
 *
 * OpenAI's reference API returns HTTP 415 `unsupported_media_type` when a POST to
 * /v1/chat/completions arrives with a non-JSON Content-Type (or none). OmniRoute
 * previously admitted such requests, silently parsed the body as JSON (via
 * `request.clone().json().catch(() => null)`), and let them fall through to the
 * provider-lookup layer — where they emerged as a misleading `model_not_found` /
 * generic error rather than the RFC 7231 §6.5.13-mandated 415. This guard closes
 * that gap at the route boundary, mirroring the pre-parse pattern already used by
 * `chatBodyAdmission.ts`.
 *
 * Returns a ready 415 Response when the request must be rejected, or `null` to
 * proceed. Only inspects the header — no body read, no I/O.
 *
 * @module shared/middleware/requireJsonContentType
 */

import { CORS_HEADERS } from "../utils/cors";

/**
 * Route-level guard. Rejects POST/PUT/PATCH requests whose `Content-Type` is not
 * `application/json` (a `; charset=…` suffix is permitted). A missing header is
 * treated as unsupported, matching the OpenAI reference behavior cited in #6414.
 */
export function requireJsonContentType(request: Request): Response | null {
  const method = request.method.toUpperCase();
  if (method !== "POST" && method !== "PUT" && method !== "PATCH") return null;

  const raw = request.headers.get("content-type");
  const ct = (raw ?? "").trim().toLowerCase();
  if (ct.startsWith("application/json")) return null;

  return new Response(
    JSON.stringify({
      error: {
        message: "Content-Type must be application/json",
        type: "invalid_request_error",
        code: "unsupported_media_type",
      },
    }),
    {
      status: 415,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    }
  );
}
