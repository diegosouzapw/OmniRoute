/**
 * `</think>` close-marker client policy.
 *
 * When OmniRoute translates a Claude-native streamed response to OpenAI Chat
 * Completions shape (`claude-to-openai.ts`), it emits a single `</think>`
 * close marker as `delta.content` so clients that scan content for the marker
 * (Claude Code, Cursor) can split reasoning from the final answer — see #4633.
 *
 * Some OpenAI-compatible consumers do NOT parse that marker and render it
 * verbatim, so a bare `</think>` leaks into the visible reply (#5245). OpenCode
 * is one such client.
 *
 * Policy is conservative and opt-OUT by allowlist: the marker stays ON by
 * default (preserving #4633 for Claude Code / Cursor and any unrecognized
 * client), and is suppressed ONLY for known clients that render it literally.
 * Detection is by inbound `User-Agent`.
 *
 * Clients that DO render the marker verbatim but are not in the UA allowlist
 * (e.g. Cursor's reasoning_content-native OpenAI path — #5312 / #5245) can opt
 * in explicitly with the request header `x-omniroute-thinking-marker: off`,
 * which suppresses the marker regardless of User-Agent. `on` forces it kept
 * (overriding the UA allowlist). The default (header absent) is byte-identical
 * to the UA-only policy, so #4633 / #5123 are never regressed.
 */

/** Header clients send to explicitly opt in/out of the `</think>` close marker. */
export const THINKING_MARKER_HEADER = "x-omniroute-thinking-marker";

// Lowercased User-Agent substrings of clients that render the textual
// `</think>` marker verbatim and therefore want it suppressed.
const SUPPRESS_THINK_CLOSE_UA_MARKERS = ["opencode"];

/**
 * Whether the streamed `</think>` close marker should be suppressed for the
 * given inbound client. Returns false (emit the marker) for unknown clients and
 * for Claude Code / Cursor, so #4633 is never regressed.
 */
export function shouldSuppressThinkCloseMarker(userAgent: string | null | undefined): boolean {
  if (!userAgent || typeof userAgent !== "string") return false;
  const ua = userAgent.toLowerCase();
  return SUPPRESS_THINK_CLOSE_UA_MARKERS.some((marker) => ua.includes(marker));
}

/**
 * Interpret the explicit `x-omniroute-thinking-marker` request header.
 * Returns `true` (suppress the marker), `false` (force-keep the marker), or
 * `null` when the header is absent/unrecognized (defer to the UA policy).
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
 * this request. An explicit `x-omniroute-thinking-marker` header wins; absent
 * that, the conservative User-Agent allowlist policy applies. With no header and
 * an unrecognized UA the result is `false` (marker kept), so #4633 / #5123 stay
 * byte-identical by default.
 */
export function resolveSuppressThinkClose(opts: {
  userAgent?: string | null;
  thinkingMarkerHeader?: string | null;
}): boolean {
  const headerSignal = thinkingMarkerHeaderSignal(opts.thinkingMarkerHeader);
  if (headerSignal !== null) return headerSignal;
  return shouldSuppressThinkCloseMarker(opts.userAgent);
}
