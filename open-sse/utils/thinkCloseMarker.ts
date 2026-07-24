/**
 * `</think>` close-marker client policy.
 *
 * When OmniRoute translates a Claude-native streamed response to OpenAI Chat
 * Completions shape (`claude-to-openai.ts`), it historically emitted a single
 * `</think>` close marker as `delta.content` so clients that scan content for
 * the marker (Claude Code, Cursor) could split reasoning from the final answer
 * — see #4633.
 *
 * Modern Chat Completions clients already receive reasoning on the separate
 * `reasoning_content` field. Emitting the in-band marker by default now
 * corrupts that split (literal `</think>` in visible content) for ordinary
 * OpenAI clients — see #8245. OpenCode / Antigravity had the same leak earlier
 * (#5245 / #1061).
 *
 * Policy (#8245):
 *   - Default: SUPPRESS the marker on OpenAI Chat Completions.
 *   - Explicit opt-in: `x-omniroute-thinking-marker: on` force-keeps it for the
 *     shrinking set of content-scanning clients (#4633).
 *   - Explicit opt-out: `x-omniroute-thinking-marker: off` (same as default).
 *   - Responses API (`openai-responses`): always suppress (#7747) — wins over
 *     the header; there is no legitimate marker consumer on that path.
 *
 * The User-Agent allowlist below is retained for diagnostics / callers that
 * still query `shouldSuppressThinkCloseMarker` directly; the resolved default
 * no longer depends on UA.
 */

import { FORMATS } from "../translator/formats.ts";

/** Header clients send to explicitly opt in/out of the `</think>` close marker. */
export const THINKING_MARKER_HEADER = "x-omniroute-thinking-marker";

// Lowercased User-Agent substrings of clients that historically rendered the
// textual `</think>` marker verbatim (#5245 / #1061). Kept for direct callers;
// resolveSuppressThinkClose no longer needs UA to decide the default (#8245).
const SUPPRESS_THINK_CLOSE_UA_MARKERS = ["opencode", "antigravity"];

/**
 * Whether the streamed `</think>` close marker should be suppressed for the
 * given inbound client User-Agent. Prefer `resolveSuppressThinkClose` for
 * request policy — UA alone is no longer the Chat Completions default (#8245).
 */
export function shouldSuppressThinkCloseMarker(userAgent: string | null | undefined): boolean {
  if (!userAgent || typeof userAgent !== "string") return false;
  const ua = userAgent.toLowerCase();
  return SUPPRESS_THINK_CLOSE_UA_MARKERS.some((marker) => ua.includes(marker));
}

/**
 * Interpret the explicit `x-omniroute-thinking-marker` request header.
 * Returns `true` (suppress the marker), `false` (force-keep the marker), or
 * `null` when the header is absent/unrecognized (defer to the default policy).
 */
export function thinkingMarkerHeaderSignal(
  headerValue: string | null | undefined
): boolean | null {
  if (typeof headerValue !== "string") return null;
  const value = headerValue.trim().toLowerCase();
  if (value === "off" || value === "false" || value === "0" || value === "suppress") return true;
  if (value === "on" || value === "true" || value === "1" || value === "keep") return false;
  return null;
}

/**
 * Resolve whether the streamed `</think>` close marker should be suppressed for
 * this request.
 *
 * Precedence:
 *   1. Responses API format → always suppress (#7747)
 *   2. Explicit `x-omniroute-thinking-marker` header → honor on/off (#5312)
 *   3. Default → suppress on Chat Completions (#8245)
 */
export function resolveSuppressThinkClose(opts: {
  userAgent?: string | null;
  thinkingMarkerHeader?: string | null;
  clientResponseFormat?: string | null;
}): boolean {
  // The marker only exists for Chat Completions clients that scan content for
  // it; Responses API clients receive reasoning as structured items instead.
  // This wins over the explicit header: there is no legitimate marker consumer
  // in the Responses format.
  if (opts.clientResponseFormat === FORMATS.OPENAI_RESPONSES) return true;
  const headerSignal = thinkingMarkerHeaderSignal(opts.thinkingMarkerHeader);
  if (headerSignal !== null) return headerSignal;
  // #8245: suppress by default. Reasoning already ships as reasoning_content.
  // Legacy content-scanning clients opt in with x-omniroute-thinking-marker: on.
  return true;
}
