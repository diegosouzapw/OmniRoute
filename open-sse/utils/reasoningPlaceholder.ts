/**
 * Internal replay sentinel used when an upstream requires non-empty reasoning content but the
 * original reasoning summary is unavailable. It is valid request scaffolding, never user-visible
 * reasoning, so response translators must suppress it before emitting client-facing events.
 */
export const NON_ANTHROPIC_THINKING_PLACEHOLDER = "(prior reasoning summary unavailable)";

export function isInternalReasoningPlaceholder(value: unknown): boolean {
  return typeof value === "string" && value.trim() === NON_ANTHROPIC_THINKING_PLACEHOLDER;
}

/**
 * Strip the internal placeholder from user-visible content. Models sometimes
 * echo the sentinel through ordinary `message.content` / `delta.content`
 * (#8081). Removes all occurrences and trims; returns "" when nothing
 * meaningful remains so callers can skip emission entirely.
 *
 * The trim only applies when the sentinel was actually present. This is
 * called per streaming `delta.content` chunk, not on the fully-assembled
 * message — tokenizers routinely emit sub-word tokens with a leading space
 * as part of the token (e.g. " en", " riktig"), so unconditionally trimming
 * every chunk silently ate the space between words for the (overwhelming)
 * majority of chunks that never contain the sentinel at all, producing
 * streamed text with words run together ("Bilden är en" -> "Bildenären").
 */
export function stripInternalReasoningPlaceholder(value: string): string {
  if (!value.includes(NON_ANTHROPIC_THINKING_PLACEHOLDER)) return value;
  return value.replaceAll(NON_ANTHROPIC_THINKING_PLACEHOLDER, "").trim();
}
