import { z } from "zod";

/**
 * Standardization layer for the canonical `effort` + `thinking` request params (#6241).
 *
 * OmniRoute already has a mature, per-provider reasoning-mapping pipeline: the translators
 * consume `reasoning_effort` / `reasoning.effort` / `thinking` and fan them out to the
 * Anthropic thinking blocks, Gemini `thinkingConfig`, xAI `reasoning.effort`, and the
 * Responses API. This module is a THIN normalization layer on top of that plumbing — it
 * does NOT re-implement any provider mapping. It only exposes a single, documented,
 * provider-agnostic pair of request fields and folds them onto the fields the existing
 * mappers already read.
 *
 * The provider-agnostic vocabulary remains five values. Provider-native additions such as
 * Codex GPT-5.6 Max and Ultra are exposed separately without widening this request contract.
 */
export const CANONICAL_EFFORT_VALUES = ["none", "low", "medium", "high", "xhigh"] as const;

export type CanonicalEffort = (typeof CANONICAL_EFFORT_VALUES)[number];

/** Use provider-native GPT-5.6 effort levels without widening the global request vocabulary. */
export function extendCodexGpt56EffortValues(
  provider: string | null | undefined,
  model: string | null | undefined,
  baseValues: readonly string[]
): string[] {
  const values = [...baseValues];
  const normalizedProvider = provider?.trim().toLowerCase();
  const normalizedModel = model
    ?.trim()
    .toLowerCase()
    .replace(/^(?:codex|cx)\//, "");
  if (!normalizedModel || (normalizedProvider !== "codex" && normalizedProvider !== "cx")) {
    return values;
  }

  const match = normalizedModel.match(
    /^gpt-5\.6-(sol|terra|luna)(?:-(?:none|low|medium|high|xhigh|max|ultra))?$/
  );
  if (!match) return values;

  const nativeValues = ["low", "medium", "high", "xhigh", "max"];
  return match[1] === "luna" ? nativeValues : [...nativeValues, "ultra"];
}

/**
 * UI-facing tier synonyms mapped onto the canonical set. The issue (#6241) requested a
 * 5-tier UI vocabulary (Low / Medium / High / Extra / Max); that request collapses onto
 * the existing 5-value canonical set. "extra" and "max" are both synonyms for the top
 * reasoning tier and map to canonical `xhigh`. The per-provider mappers already down-shift
 * `xhigh` to `high` for models that do not support it (see
 * `open-sse/translator/request/openai-to-claude.ts`), so a caller can always request the
 * highest tier without knowing which models support `xhigh`.
 */
const EFFORT_TIER_ALIASES: Record<string, CanonicalEffort> = {
  extra: "xhigh",
  max: "xhigh",
};

/**
 * Normalize an arbitrary effort value onto the canonical vocabulary. Accepts the canonical
 * values plus the UI tier synonyms (`extra`/`max` → `xhigh`), case-insensitively. Returns
 * `undefined` for anything unrecognized so callers can leave the request untouched.
 */
export function normalizeEffort(value: unknown): CanonicalEffort | undefined {
  if (typeof value !== "string") return undefined;
  const lowered = value.trim().toLowerCase();
  if (!lowered) return undefined;
  if (lowered in EFFORT_TIER_ALIASES) return EFFORT_TIER_ALIASES[lowered];
  return (CANONICAL_EFFORT_VALUES as readonly string[]).includes(lowered)
    ? (lowered as CanonicalEffort)
    : undefined;
}

/**
 * Zod schema for the canonical `effort` request field. Accepts the canonical values plus
 * the UI tier synonyms (case-insensitively) and normalizes them onto the canonical set.
 * Unrecognized strings are rejected with a clear enum error.
 */
export const effortRequestSchema = z.preprocess(
  (value) => normalizeEffort(value) ?? value,
  z.enum(CANONICAL_EFFORT_VALUES)
);

/**
 * Zod schema for the canonical `thinking` request field: a simple boolean toggle. Kept as
 * a union with an object so the existing Anthropic-style `thinking: { type, budget_tokens }`
 * object shape that clients already send keeps validating (backward compatible) — the
 * normalizer only acts on the boolean form.
 */
export const thinkingRequestSchema = z.union([z.boolean(), z.record(z.string(), z.unknown())]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Fold the canonical `effort` / `thinking` request params onto the per-provider reasoning
 * fields the existing translators already consume (`reasoning_effort`, `reasoning.effort`,
 * `thinking`). Pure function — returns the same reference untouched when there is nothing
 * to normalize, otherwise a shallow copy with the derived fields populated.
 *
 * Backward compatibility rules (an explicit client signal ALWAYS wins):
 *  - `reasoning_effort` / `reasoning.effort` explicitly set by the client are never
 *    overwritten by the canonical `effort`.
 *  - An explicit object-shaped `thinking` (the Anthropic `{ type, budget_tokens }` config)
 *    is never overwritten by the canonical boolean `thinking`.
 */
export function normalizeReasoningRequest<T>(body: T): T {
  if (!isPlainObject(body)) return body;

  const canonicalEffort = normalizeEffort(body.effort);
  const canonicalThinking = body.thinking;
  const hasCanonicalThinkingBool = typeof canonicalThinking === "boolean";

  if (canonicalEffort === undefined && !hasCanonicalThinkingBool) return body;

  const reasoning = body.reasoning;
  const clientSetReasoningEffort = body.reasoning_effort !== undefined;
  const clientSetReasoningObjEffort = isPlainObject(reasoning) && reasoning.effort !== undefined;

  const next: Record<string, unknown> = { ...body };

  // Canonical effort → the fields the mappers read. Skip entirely if the client already
  // expressed a reasoning effort (either shape) so client intent is preserved.
  if (canonicalEffort !== undefined && !clientSetReasoningEffort && !clientSetReasoningObjEffort) {
    next.reasoning_effort = canonicalEffort;
    next.reasoning = {
      ...(isPlainObject(reasoning) ? reasoning : {}),
      effort: canonicalEffort,
    };
  }

  // Canonical boolean `thinking` → keep the truthy toggle the mappers read. Only when the
  // client did NOT provide an explicit object-shaped thinking config (that always wins).
  if (hasCanonicalThinkingBool) {
    next.thinking = canonicalThinking;
  }

  return next as T;
}
