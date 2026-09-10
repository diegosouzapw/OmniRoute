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
 * The provider-agnostic vocabulary is `none|low|medium|high|xhigh|max`. Provider-native
 * additions such as Codex GPT-5.6 Ultra remain exposed separately.
 */
export const CANONICAL_EFFORT_VALUES = ["none", "low", "medium", "high", "xhigh", "max"] as const;

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
    .replace(/^(?:codex|cx|kiro|kr)\//, "");
  if (!normalizedModel) return values;

  const match = normalizedModel.match(
    /^gpt-5\.6-(sol|terra|luna)(?:-(?:none|low|medium|high|xhigh|max|ultra))?$/
  );
  if (!match) return values;

  const isKiroProvider = normalizedProvider === "kiro" || normalizedProvider === "kr";
  if (isKiroProvider) {
    return values.includes("max") ? values : [...values, "max"];
  }

  if (normalizedProvider !== "codex" && normalizedProvider !== "cx") return values;

  const nativeValues = ["low", "medium", "high", "xhigh", "max"];
  return match[1] === "luna" ? nativeValues : [...nativeValues, "ultra"];
}

/**
 * UI-facing tier synonyms mapped onto the canonical set. "extra" is a synonym for `xhigh`.
 * `max` is a first-class canonical value and passes through natively.
 */
const EFFORT_TIER_ALIASES: Record<string, CanonicalEffort> = {
  extra: "xhigh",
};

/**
 * DeepSeek V4 exposes a native `max` reasoning tier ABOVE its `high` tier.
 *
 * Per https://api-docs.deepseek.com/api/create-chat-completion the accepted
 * `reasoning_effort` values are `low`, `high` and `max`, the default is `high`,
 * and **`medium` / `xhigh` are both mapped to `high` upstream**. Canonical
 * `max` is first-class (#11875) so `{"effort":"max"}` reaches DeepSeek's
 * native top tier instead of collapsing onto `xhigh` → upstream `high`.
 *
 * Mirrors extendCodexGpt56EffortValues: keep catalog advertising of the native
 * tier idempotent when `max` is already in the base vocabulary.
 */
export function extendDeepSeekEffortValues(
  provider: string | null | undefined,
  model: string | null | undefined,
  baseValues: readonly string[]
): string[] {
  const values = [...baseValues];
  if (!isDeepSeekNativeMaxModel(provider, model)) return values;
  return values.includes("max") ? values : [...values, "max"];
}

/**
 * Whether `<provider>/<model>` is a DeepSeek V4 model served by the native
 * DeepSeek provider (registry id `deepseek`, alias `ds`).
 *
 * Deliberately scoped to the native provider: routed namespaces such as
 * `openrouter/deepseek/...` or `oc/deepseek-v4-flash-free` terminate at a different
 * upstream whose accepted effort vocabulary we do not control.
 */
export function isDeepSeekNativeMaxModel(
  provider: string | null | undefined,
  model: string | null | undefined
): boolean {
  const rawModel = model?.trim().toLowerCase();
  if (!rawModel) return false;

  // The provider is not always resolved yet at the point the canonical request
  // params are folded in (see chat.ts), so accept either an explicit provider or
  // a `<prefix>/<model>` id carrying the native DeepSeek prefix.
  const prefixMatch = rawModel.match(/^(deepseek|ds)\//);
  const normalizedProvider = provider?.trim().toLowerCase() || prefixMatch?.[1];
  if (normalizedProvider !== "deepseek" && normalizedProvider !== "ds") return false;

  const normalizedModel = rawModel.replace(/^(?:deepseek|ds)\//, "");
  if (!normalizedModel) return false;
  return /^deepseek-v4-(?:pro|flash)(?:-(?:none|minimal|low|medium|high|xhigh|max))?$/.test(
    normalizedModel
  );
}

/**
 * Normalize an arbitrary effort value onto the canonical vocabulary. Accepts the canonical
 * values plus the UI tier synonym (`extra` → `xhigh`), case-insensitively. Returns
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

/** Read a request body's `model` field when it is a usable string. */
function asModelId(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
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
export function normalizeReasoningRequest<T>(body: T, provider?: string | null): T {
  if (!isPlainObject(body)) return body;

  // DeepSeek V4 has a native `max` tier above `high`. Canonical `max` normally
  // collapses to `xhigh`, which DeepSeek maps back down to `high` — so preserve
  // the literal value for those models instead of round-tripping it away.
  const rawEffort = typeof body.effort === "string" ? body.effort.trim().toLowerCase() : undefined;
  const canonicalEffort =
    rawEffort === "max" && isDeepSeekNativeMaxModel(provider, asModelId(body.model))
      ? ("max" as const)
      : normalizeEffort(body.effort);
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
