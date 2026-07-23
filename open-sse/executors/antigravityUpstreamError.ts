/**
 * Build a sanitized OpenAI-style error body for a non-ok Antigravity/agy upstream
 * response (#3229).
 *
 * The non-streaming executor path previously fed 4xx/5xx responses into the SSE
 * collector, which produced a synthetic `{"object":"chat.completion","content":""}`
 * success envelope — masking the real error. Route non-ok responses through
 * `buildErrorBody` instead so the client sees a proper error (hard rule #12).
 */
import { buildErrorBody } from "../utils/error.ts";

export function buildAntigravityUpstreamError(
  status: number,
  statusText: string,
  rawBody: string
) {
  let upstreamDetails: unknown;
  try {
    upstreamDetails = JSON.parse(rawBody);
  } catch {
    // upstream body is not JSON (e.g. HTML error page) — omit structured details
  }
  const suffix = statusText ? `: ${statusText}` : "";
  return buildErrorBody(status, `Antigravity upstream error (${status})${suffix}`, upstreamDetails);
}
