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
 */

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
