/**
 * Learned Reasoning-Effort Caps — reactive capability memory for providers/models
 * OmniRoute has no static registry entry for (custom OpenAI-compatible connections,
 * or any registered provider whose registry entry carries no reasoning metadata).
 *
 * Same shape as `learnedThinkingCaps.ts` (thinking_budget), generalized from a
 * numeric budget to an ordinal reasoning_effort scale: on a 4xx whose body
 * enumerates the accepted values, `base.ts`'s executor calls
 * `recordLearnedReasoningEffort`, which stores the accepted set in a module-level
 * Map keyed "provider:model" (lowercased). Subsequent requests for the same
 * provider+model read the set via `getLearnedReasoningEffort` (consulted by
 * `sanitizeReasoningEffortForProvider` in `executors/base/reasoningEffort.ts`)
 * so the 4xx→retry round-trip is paid at most once per process per provider+model.
 *
 * `clampToLearned` implements nearest-tier clamping: smallest accepted >= demand,
 * falling back to the greatest accepted when demand exceeds every accepted value.
 * (#11295 — unified with the static "declared" clamp in
 * `executors/base/reasoningEffort.ts`, which already used nearest-tier semantics.
 * Before #11295, this learned clamp was downgrade-only — greatest accepted <=
 * demand — so the SAME accepted set {low,high,max} produced medium→low here but
 * medium→high via the declared path: identical inputs, opposite outputs,
 * depending only on whether the model had a static registry entry. #11274's
 * DeepSeek native mapping is the precedent for nearest-tier. This also fixes a
 * standalone bug: a request BELOW the learned floor (e.g. none/minimal on a
 * model that only ever advertised {low,high,max}) used to return null — no
 * clamp — so the too-low value passed straight through to the upstream, which
 * 400'd again on every subsequent request without ever learning a lower floor.
 * Nearest-tier naturally fixes this too: the smallest accepted value is always
 * >= any demand below the floor, so it is returned instead of null.
 *
 * In-memory only (same operator-accepted tradeoff as the thinking-budget cache):
 * restart resets, the first request after a restart may re-learn at the cost of
 * one upstream 4xx.
 */

export const REASONING_EFFORT_ORDER: readonly string[] = [
  "none",
  "minimal",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "ultra",
];

// key: `${provider}:${model}` lowercased → accepted set.
const learnedCaps = new Map<string, Set<string>>();

function buildKey(provider: string | null | undefined, model: string | null | undefined): string {
  const p = typeof provider === "string" ? provider.trim().toLowerCase() : "";
  const m = typeof model === "string" ? model.trim().toLowerCase() : "";
  if (!p || !m) return "";
  return `${p}:${m}`;
}

function rankOf(value: string): number {
  return REASONING_EFFORT_ORDER.indexOf(value);
}

function isSubset(a: Set<string>, b: Set<string>): boolean {
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

/**
 * Return the learned accepted set for provider+model, or null when nothing has
 * been learned yet (no upstream 4xx recorded). Keyed case-insensitively.
 */
export function getLearnedReasoningEffort(
  provider: string | null | undefined,
  model: string | null | undefined
): Set<string> | null {
  const key = buildKey(provider, model);
  if (!key) return null;
  const v = learnedCaps.get(key);
  return v ? new Set(v) : null;
}

/**
 * Model-scoped lookup bridging the key-space gap between executors and the
 * catalog: executors record under their CONNECTION id
 * (`openai-compatible-chat-<uuid>:<model>`, cf. compatibleProviderId.ts),
 * while the catalog loops on provider ids (`opencode`, …) — an exact
 * `${provider}:${model}` lookup would always miss. Scans by model segment
 * instead. Multiple connections teaching different sets for the same model
 * name intersect (most restrictive proven set wins — conservative across
 * connections sharing one catalog entry).
 */
export function getLearnedReasoningEffortForModel(
  model: string | null | undefined
): Set<string> | null {
  const m = typeof model === "string" ? model.trim().toLowerCase() : "";
  if (!m || learnedCaps.size === 0) return null;
  let result: Set<string> | null = null;
  for (const [key, value] of learnedCaps) {
    const colon = key.indexOf(":");
    if (colon === -1 || key.slice(colon + 1) !== m) continue;
    result = result ? new Set([...result].filter((v) => value.has(v))) : new Set(value);
  }
  return result && result.size > 0 ? result : null;
}

/**
 * Record that `acceptedValues` is the enum the upstream advertised for
 * provider+model, and store the accepted set. Returns the stored set, or null
 * when `acceptedValues` contained no token from `REASONING_EFFORT_ORDER`.
 *
 * Monotonically non-expanding: if existing ⊆ newSet, keep existing (never
 * re-expand); if newSet ⊂ existing, replace (more restrictive); if neither
 * subset, keep existing.
 */
export function recordLearnedReasoningEffort(
  provider: string | null | undefined,
  model: string | null | undefined,
  acceptedValues: string[]
): Set<string> | null {
  const key = buildKey(provider, model);
  if (!key) return null;

  const newSet = new Set<string>();
  for (const raw of acceptedValues) {
    const lowered = typeof raw === "string" ? raw.trim().toLowerCase() : "";
    if (lowered && REASONING_EFFORT_ORDER.includes(lowered)) newSet.add(lowered);
  }
  if (newSet.size === 0) {
    // OBS2/M5: a 4xx advertised an enum we cannot map — say so, never learn silently.
    console.warn(
      `[learnedReasoningEffortCaps] unrecognized reasoning_effort enum for ${key}: ${acceptedValues.join(", ")} — nothing learned`
    );
    return null;
  }

  const existing = learnedCaps.get(key);
  if (existing !== undefined) {
    // Defensive copies: never hand out the live cached Set.
    if (isSubset(existing, newSet)) return new Set(existing);
    if (isSubset(newSet, existing)) {
      learnedCaps.set(key, newSet);
      return new Set(newSet);
    }
    return new Set(existing);
  }
  learnedCaps.set(key, newSet);
  return new Set(newSet);
}

/**
 * Return the nearest-tier accepted value for effortStr: the smallest accepted
 * value with rank >= effortStr's rank, or — when effortStr's rank exceeds every
 * accepted value (demand above the learned ceiling) — the greatest accepted
 * value. Returns null only when effortStr is already accepted (no clamp
 * needed), empty, or not a recognized member of REASONING_EFFORT_ORDER.
 *
 * Mirrors the declared-capability clamp in `executors/base/reasoningEffort.ts`
 * (#11295): both now use nearest-tier semantics so the same accepted set
 * produces the same mapping regardless of whether the model has a static
 * registry entry or was only learned reactively from an upstream 4xx.
 */
export function clampToLearned(effortStr: string, accepted: Set<string>): string | null {
  if (!effortStr || accepted.has(effortStr)) return null;
  const rank = rankOf(effortStr);
  if (rank === -1) return null;

  let nearestAbove: string | null = null;
  let nearestAboveRank = Infinity;
  let highest: string | null = null;
  let highestRank = -1;
  for (const v of accepted) {
    const r = rankOf(v);
    if (r < 0) continue;
    if (r >= rank && r < nearestAboveRank) {
      nearestAboveRank = r;
      nearestAbove = v;
    }
    if (r > highestRank) {
      highestRank = r;
      highest = v;
    }
  }
  return nearestAbove ?? highest;
}

// Matches prose shapes: OVH's "@ai-sdk/openai-compatible" deserializer
// ("expected one of `a`, `b`"), generic ("Supported types are a, b, and c"),
// and "please use a, b, or c".
const LIST_INTRO = /(?:expected one of|supported (?:types|values) are|please use)[:\s]*([^.]+)/i;

/**
 * Extract the upstream-advertised accepted reasoning_effort values from a 4xx
 * error body. Returns only tokens present in REASONING_EFFORT_ORDER (unknown
 * tokens are dropped defensively) in the order they appeared, or null when the
 * text names no recognized enum member.
 */
export function parseReasoningEffortEnum(errText: unknown): string[] | null {
  if (typeof errText !== "string" || !errText) return null;
  const match = LIST_INTRO.exec(errText);
  if (!match) return null;
  const tokens = match[1]
    .split(/,|\||\b(?:and|or)\b|&/i)
    .map((t) =>
      t
        .replace(/`/g, "")
        .replace(/\([^)]*\)/g, "")
        .trim()
        .toLowerCase()
        .replace(/^[^a-z]+|[^a-z]+$/g, "")
    )
    .filter((t) => t.length > 0 && REASONING_EFFORT_ORDER.includes(t));
  return tokens.length > 0 ? tokens : null;
}

/** Test-only: clear the learned-cap Map between tests. */
export function __test_resetLearnedReasoningEffortCaps(): void {
  learnedCaps.clear();
}
