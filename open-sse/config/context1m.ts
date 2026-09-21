/**
 * Model eligibility for the `context-1m-2025-08-07` long-context `anthropic-beta`.
 *
 * Only a subset of Claude models qualify for the 1M-context beta. Forwarding the
 * beta to a non-qualifying model (e.g. claude-haiku-4-5-20251001) is a hard 400
 * from the Messages API: "long context beta is not yet available for this
 * subscription". A client can negotiate the beta for one member of a combo and
 * have the SAME request re-routed (combo/fallback) to a less capable sibling, so
 * beta forwarding must be gated on the RESOLVED target model — never blind.
 *
 * Neutral module (no imports) so both `anthropicHeaders.ts` (the merge path) and
 * `claudeCodeCompatible.ts` (the `[1m]`-suffix path) share one source of truth
 * without importing each other.
 */
export const CONTEXT_1M_SUPPORTED_MODELS = [
  "claude-fable-5",
  "claude-sonnet-5",
  "claude-sonnet-4-6",
  "claude-opus-4-8",
  "claude-opus-4-7",
  "claude-opus-4-6",
] as const;

/**
 * True when the (resolved upstream) model qualifies for the long-context beta.
 * Normalizes case and strips a trailing dated alias (`-20251001`) so both bare and
 * dated model ids match. SHA-256 of the reference implementation in
 * `claudeCodeCompatible.ts` (moved here).
 */
export function modelSupportsContext1mBeta(model: string | null | undefined): boolean {
  const normalizedModel = String(model || "")
    .trim()
    .toLowerCase()
    .replace(/-\d{8}$/, "");

  return CONTEXT_1M_SUPPORTED_MODELS.some(
    (supported) =>
      normalizedModel === supported ||
      (normalizedModel.startsWith(`${supported}-`) &&
        !/^\d/.test(normalizedModel.slice(supported.length + 1)))
  );
}
