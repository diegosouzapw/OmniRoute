/**
 * Selective upstream 4xx error passthrough (Claude Code auto-recover contract).
 *
 * Claude Code matches the upstream error WORDING to auto-disable capabilities
 * (thinking / output_config) for the rest of the conversation. Wrapping the body
 * via buildErrorBody() truncates the message and breaks that recovery. For
 * upstream-originated 4xx errors the body is the provider's public API message —
 * not our internals — so it is safe and required to relay it verbatim.
 * OmniRoute-generated errors MUST keep using buildErrorBody() (Hard Rule #12).
 */
const PASSTHROUGH_MIN = 400;
const PASSTHROUGH_MAX = 499;
// 401/403/407: auth-adjacent — our own credential context may leak via provider
// echoes; keep those sanitized. 400/404/408/413/422/429 carry the capability and
// quota wording the client needs.
const EXCLUDED_STATUSES = new Set([401, 403, 407]);
const INTERNAL_LEAK_RE = /\sat\s\/|node_modules|omniroute\//i;

export function shouldPassthroughUpstreamError(statusCode: number, upstreamBody: unknown): boolean {
  if (statusCode < PASSTHROUGH_MIN || statusCode > PASSTHROUGH_MAX) return false;
  if (EXCLUDED_STATUSES.has(statusCode)) return false;
  if (!upstreamBody || typeof upstreamBody !== "object") return false;
  const text = JSON.stringify(upstreamBody);
  if (INTERNAL_LEAK_RE.test(text)) return false;
  return true;
}

export function buildPassthroughErrorResponse(
  statusCode: number,
  upstreamBody: unknown,
  headers?: Record<string, string>
): Response | null {
  if (!shouldPassthroughUpstreamError(statusCode, upstreamBody)) return null;
  return new Response(JSON.stringify(upstreamBody), {
    status: statusCode,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
  });
}
