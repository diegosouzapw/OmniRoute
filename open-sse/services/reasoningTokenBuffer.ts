import {
  getExplicitModelOutputCap,
  getResolvedModelCapabilities,
} from "../../src/lib/modelCapabilities.ts";

/**
 * Below this caller-supplied `max_tokens`, the request is treated as a probe
 * (e.g. Claude Code's `/model` capability check sends `max_tokens: 1`) rather
 * than a genuine reasoning budget, so no headroom is added. Keeping it a named
 * constant makes the threshold easy to tune. See issue #6274 (probe inflated to
 * 1001 upstream) vs. issue #3587 (headroom for real reasoning budgets).
 */
export const REASONING_BUFFER_MIN_TRIGGER = 256;

export function toPositiveInteger(value: unknown): number | null {
  const numericValue =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : null;
  if (numericValue === null || !Number.isFinite(numericValue)) return null;
  const normalized = Math.floor(numericValue);
  return normalized > 0 ? normalized : null;
}

export function resolveReasoningBufferedMaxTokens(
  modelStr: string,
  currentMaxTokens: unknown,
  options: { enabled?: boolean } = {}
): number | null {
  if (options.enabled === false) return null;

  const current = toPositiveInteger(currentMaxTokens);
  if (current === null) return null;

  const capabilities = getResolvedModelCapabilities(modelStr);
  if (capabilities.supportsThinking !== true) return null;

  const maxOutputTokens = toPositiveInteger(getExplicitModelOutputCap(modelStr));
  if (maxOutputTokens === null) return null;
  if (current > maxOutputTokens) return maxOutputTokens;

  // Issue #6274: a tiny explicit budget is a capability probe, not a reasoning
  // request. Respect it verbatim instead of inflating (e.g. 1 -> 1001).
  if (current < REASONING_BUFFER_MIN_TRIGGER) return current;

  // Issue #9507: never enlarge a client's explicit max_tokens. The #3587
  // headroom heuristic (Math.ceil(current * 1.5)) silently rewrote reasoning
  // budgets upward (64000 -> 96000 on claude-opus-5), violating the #1761
  // contract that upward adjustment must be opt-in. The over-cap clamp above
  // (line 42) already narrows, and the model's own output cap is the only
  // legitimate ceiling; any headroom beyond the client-declared value is a
  // silent cost increase the client did not authorize.
  return current;
}
