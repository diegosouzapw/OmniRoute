import {
  containsSensitiveErrorCredential,
  sanitizePassthroughUpstreamDetails,
} from "./errorSanitization.ts";

/**
 * Selective upstream 4xx error passthrough (Claude Code auto-recover contract).
 *
 * Claude Code matches upstream error wording to auto-disable capabilities
 * (thinking / output_config) for the rest of the conversation. This path keeps
 * the wording and JSON shape required for that recovery after applying the
 * canonical recursive sanitizer. OmniRoute-generated errors MUST keep using
 * buildErrorBody() (Hard Rule #12).
 */
const PASSTHROUGH_MIN = 400;
const PASSTHROUGH_MAX = 499;
// 401/403/407: auth-adjacent — our own credential context may leak via provider
// echoes; keep those sanitized. 400/404/408/413/422/429 carry the capability and
// quota wording the client needs.
const EXCLUDED_STATUSES = new Set([401, 403, 407]);
const INTERNAL_LEAK_RE = /\sat\s\/|node_modules|omniroute\//i;
// #10898-sec / secret-in-error hardening: some providers echo the offending
// request (including an Authorization header or api key) inside a 400/422/429
// validation body. If the body carries a credential pattern, REFUSE passthrough
// before the recursive sanitizer so the caller falls back to buildErrorBody.
// Eligible JSON retains its safe shape and capability/quota wording after the
// recursive projection. Mirrors redactSensitiveErrorText in errorSanitization.ts.
const CREDENTIAL_LEAK_RE =
  /\b(?:Bearer|Basic)\s+[A-Za-z0-9._~+/=-]{8,}|\bsk-[A-Za-z0-9._-]{8,}|(?:api[_-]?key|access[_-]?token|refresh[_-]?token|authorization|cookie|secret)\\?["']?\s*[:=]\s*\\?["']?[^"'\\,\s}]{6,}/i;

export function shouldPassthroughUpstreamError(statusCode: number, upstreamBody: unknown): boolean {
  if (statusCode < PASSTHROUGH_MIN || statusCode > PASSTHROUGH_MAX) return false;
  if (EXCLUDED_STATUSES.has(statusCode)) return false;
  if (!upstreamBody || typeof upstreamBody !== "object") return false;
  let text: string | undefined;
  try {
    text = JSON.stringify(upstreamBody);
  } catch {
    // Relay only JSON-stable objects; cyclic/BigInt/hostile toJSON bodies fail closed.
    return false;
  }
  if (typeof text !== "string") return false;
  if (INTERNAL_LEAK_RE.test(text)) return false;
  // Refuse passthrough when the provider echoed a credential back to us.
  if (CREDENTIAL_LEAK_RE.test(text) || containsSensitiveErrorCredential(text)) return false;
  return true;
}

export function buildPassthroughErrorResponse(
  statusCode: number,
  upstreamBody: unknown,
  headers?: Record<string, string>
): Response | null {
  if (!shouldPassthroughUpstreamError(statusCode, upstreamBody)) return null;
  try {
    const sanitizedBody = sanitizePassthroughUpstreamDetails(upstreamBody);
    const publicBody =
      sanitizedBody && typeof sanitizedBody === "object"
        ? sanitizedBody
        : { error: { message: "Upstream error" } };
    return new Response(JSON.stringify(publicBody), {
      status: statusCode,
      headers: { "Content-Type": "application/json", ...(headers || {}) },
    });
  } catch {
    // A proxy/getter may behave differently between eligibility and projection.
    return null;
  }
}
