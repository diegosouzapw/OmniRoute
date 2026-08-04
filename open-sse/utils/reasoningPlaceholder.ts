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
 * (#8081). Removes all occurrences; returns "" when only whitespace remains so
 * callers can skip emission entirely.
 *
 * IMPORTANT (#5786): this runs per-delta on the streaming path, where a delta's
 * leading/trailing spaces are meaningful (e.g. "Hello, " + "world." + " Bye.").
 * Only collapse to "" when the placeholder WAS the whole content — never trim
 * real content, or streamed deltas glue together with their spaces eaten.
 */
export function stripInternalReasoningPlaceholder(value: string): string {
  const stripped = value.replaceAll(NON_ANTHROPIC_THINKING_PLACEHOLDER, "");
  return stripped.trim() === "" ? "" : stripped;
}
