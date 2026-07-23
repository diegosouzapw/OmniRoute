/**
 * #6453 — Provider-family auto combos.
 *
 * `auto/<family>` (e.g. `auto/glm`, `auto/minimax`) is a NEW axis alongside the
 * existing task-mode (`auto/best-coding`) and category:tier (`auto/coding:fast`)
 * combos: instead of grouping by routing intent, it groups by underlying MODEL
 * FAMILY and materializes an on-demand virtual combo spanning whatever installed
 * backends currently expose that family, degrading gracefully as backends
 * rotate — same on-demand mechanism (`createVirtualAutoCombo`), a different
 * candidate filter.
 *
 * Kept as a pure, dependency-free module so `detectModelFamily` is unit-testable
 * in isolation without touching the DB/registry-backed virtual factory.
 */

export type ModelFamily = "glm" | "minimax" | "mimo" | "zai" | "gemma" | "llama" | "gemini";

export const MODEL_FAMILIES: readonly ModelFamily[] = [
  "glm",
  "minimax",
  "mimo",
  "zai",
  "gemma",
  "llama",
  "gemini",
];

const MODEL_FAMILY_SET: ReadonlySet<string> = new Set(MODEL_FAMILIES);

/** Model-id prefix → family. Matched against the bare model id (provider prefix, if
 * any, stripped) so both `glm-5.2` and `zai/glm-5.2` resolve the same way. */
const FAMILY_ID_PATTERNS: ReadonlyArray<{ family: ModelFamily; pattern: RegExp }> = [
  { family: "glm", pattern: /^glm-/i },
  { family: "minimax", pattern: /^minimax-/i },
  { family: "mimo", pattern: /^mimo-/i },
  { family: "gemma", pattern: /^gemma-/i },
  { family: "llama", pattern: /^llama-/i },
  { family: "gemini", pattern: /^gemini-/i },
];

/**
 * `zai` is deliberately NOT a model-id prefix rule: Zhipu's z.ai hosted API serves
 * the same `glm-*` model ids as every other GLM backend (`glm` provider, custom
 * OpenAI/Anthropic-compatible connections, etc — see
 * `open-sse/config/providers/registry/zai/index.ts`). Aliasing `auto/zai` to a
 * model-name prefix would make it identical to `auto/glm`, so instead it is
 * resolved by PROVIDER id: "route to my z.ai backend specifically", distinct from
 * `auto/glm` ("route to any connected provider currently serving a GLM model,
 * z.ai included"). Documented here rather than deferred because the distinction
 * is meaningful and the rule is a one-line lookup.
 */
export const FAMILY_PROVIDER_OVERRIDE: Readonly<Partial<Record<ModelFamily, string>>> = {
  zai: "zai",
};

export function isValidModelFamily(value: string | null | undefined): value is ModelFamily {
  return typeof value === "string" && MODEL_FAMILY_SET.has(value);
}

/**
 * Detect the model family from a bare or provider-prefixed model id.
 * Returns `null` when the id doesn't match any known family prefix — including
 * `zai`, which is never detected from a model id (see `FAMILY_PROVIDER_OVERRIDE`).
 */
export function detectModelFamily(modelId: string | null | undefined): ModelFamily | null {
  if (typeof modelId !== "string" || modelId.trim().length === 0) return null;
  const bare = modelId.includes("/") ? modelId.slice(modelId.lastIndexOf("/") + 1) : modelId;
  for (const { family, pattern } of FAMILY_ID_PATTERNS) {
    if (pattern.test(bare)) return family;
  }
  return null;
}

interface FamilyPoolCandidate {
  provider: string;
  model: string;
}

/**
 * Build the candidate filter for `auto/<family>`. Provider-override families
 * (currently only `zai`) filter by connection provider id; every other family
 * filters by `detectModelFamily(model) === family`.
 */
export function buildFamilyCandidateFilter(
  family: ModelFamily
): (candidate: FamilyPoolCandidate) => boolean {
  const providerOverride = FAMILY_PROVIDER_OVERRIDE[family];
  if (providerOverride) {
    return (candidate) => candidate.provider === providerOverride;
  }
  return (candidate) => detectModelFamily(candidate.model) === family;
}

/** Advertised `auto/<family>` catalog ids (#6453), e.g. `auto/glm`, `auto/minimax`. */
export const AUTO_FAMILY_IDS: readonly string[] = MODEL_FAMILIES.map((family) => `auto/${family}`);
