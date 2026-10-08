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
  if (!value.includes(NON_ANTHROPIC_THINKING_PLACEHOLDER)) return value;

  const stripped = value.replaceAll(NON_ANTHROPIC_THINKING_PLACEHOLDER, "");
  return stripped.trim() === "" ? "" : stripped;
}

/**
 * Upstreams that reject an ABSENT reasoning_content on replay turns, so the
 * placeholder must survive the cache miss.
 *
 * #9573/#9610 removed the placeholder globally because the model echoed it as
 * its own reasoning and stopped (empty turns). That holds for DeepSeek, where
 * an absent field was verified to be accepted — but Xiaomi MiMo still 400s
 * ("Param Incorrect: The reasoning_content in the thinking mode must be passed
 * back to the API", 9router#1321/#1337), so omitting the field there trades one
 * live bug for another. The opencode console gateways (opencode-go /
 * opencode-zen / opencode) enforce the same contract on their Responses
 * transport for deepseek/glm thinking models (production: 54× 400 "The
 * reasoning_text in the thinking mode must be passed back to the API" in one
 * day). Keep the placeholder only for those providers; the echo that comes
 * back is still stripped on the way in by isInternalReasoningPlaceholder(), so
 * it never re-poisons cache or history.
 */
export function requiresReasoningContentPresence(provider: unknown, model: unknown): boolean {
  const normalizedProvider = String(provider ?? "")
    .trim()
    .toLowerCase();
  const normalizedModel = String(model ?? "")
    .trim()
    .toLowerCase();
  return (
    normalizedProvider === "xiaomi-mimo" ||
    /(^|\/)mimo/i.test(normalizedModel) ||
    ["opencode", "opencode-go", "opencode-zen"].includes(normalizedProvider)
  );
}
