/**
 * scoresAs — resolve a catalog id to the id whose QUALITY scores it inherits (#11489).
 *
 * Dispatch already treats `<model>-<effort>` ids as variants of a base model
 * (`splitClaudeEffortSuffix`, `splitCodexReasoningSuffix` run on the incoming
 * request model). Auto-combo's task fitness did not: it scored every catalog id
 * by exact string match, so a variant like `gpt-5.6-sol-xhigh` missed every DB
 * layer and landed on the wildcard 0.5 while its base model was scored properly.
 *
 * This module is the single seam that closes that gap. Three tiers, in order:
 *
 *   1. `explicit`      — the registry entry declares `scoresAs`. For relations
 *                        suffix-stripping cannot express: forward vendor aliases
 *                        (`gpt-5.6` IS an alias of `gpt-5.6-sol`, per OpenAI's
 *                        model reference) and cross-provider spellings of the
 *                        same model (`claude-4.6-opus-high` → `claude-opus-4-6`).
 *   2. `effort-suffix` — a trailing reasoning-effort token stripped by one of the
 *                        EXISTING dispatch splitters. No new regex is introduced
 *                        here; a fourth pattern would be a fourth place to get
 *                        the same fact wrong (cf. the #8603 shadowing defect).
 *   3. `free-suffix`   — a trailing `-free` tier marker, so a free-tier variant
 *                        picks up the benchmark of its paid counterpart (#4517,
 *                        previously a standalone arena_elo-only special case in
 *                        `taskFitness.ts`, now folded in and extended to
 *                        `user_override` too).
 *
 * Tiers 2 and 3 are CATALOG-ANCHORED: a stripped base is accepted only when it
 * is itself a routable catalog id. Without that guard, 57 of the catalog's 201
 * strippable effort ids resolve to a base that does not exist — `qwen3.7-max`
 * would inherit from a phantom `qwen3.7` (`-max` is part of the model name
 * here, not an effort), `grok-4.6-fast-high` from a phantom `grok-4.6-fast`,
 * and `extra-high` from `extra`. Resolution never guesses: anything the three
 * tiers cannot justify comes back unresolved.
 *
 * One hop only — a `scoresAs` target is not itself re-resolved.
 */
import { findRegistryModelById, findRegistryScoresAs } from "../../config/providerModels.ts";
import { splitClaudeEffortSuffix } from "../../config/providerModels.ts";
import { splitCodexReasoningSuffix } from "../../executors/codex/reasoningSuffix.ts";

/** How a base id was reached; `null` means "not resolved — score the id as given". */
export type ScoresAsVia = "explicit" | "effort-suffix" | "free-suffix" | null;

export interface ScoresAsResolution {
  /** The id whose quality scores apply. Equals the input when `via` is `null`. */
  base: string;
  via: ScoresAsVia;
}

/** Suffix marking a free-tier variant of a paid model (e.g. `mimo-v2.5-free`). */
const FREE_SUFFIX = "-free";

/** Dispatch-time effort splitters, reused verbatim. Order is not significant:
 *  both are catalog-anchored below, so a wrong strip is rejected either way. */
const EFFORT_SPLITTERS = [splitClaudeEffortSuffix, splitCodexReasoningSuffix] as const;

export function resolveScoresAs(modelId: string): ScoresAsResolution {
  const unresolved: ScoresAsResolution = { base: modelId, via: null };
  if (typeof modelId !== "string" || modelId.length === 0) return unresolved;

  // 1. Explicit registry declaration. One hop: the target must itself be a
  //    catalog id, and its own `scoresAs` (if any) is deliberately not followed.
  const declared = findRegistryScoresAs(modelId);
  if (declared && declared !== modelId && findRegistryModelById(declared)) {
    return { base: declared, via: "explicit" };
  }

  // 2. Reasoning-effort suffix, catalog-anchored.
  for (const split of EFFORT_SPLITTERS) {
    const base = split(modelId).baseModel;
    if (base && base !== modelId && findRegistryModelById(base)) {
      return { base, via: "effort-suffix" };
    }
  }

  // 3. Free-tier suffix, catalog-anchored.
  if (modelId.endsWith(FREE_SUFFIX)) {
    const base = modelId.slice(0, -FREE_SUFFIX.length);
    if (base.length > 0 && findRegistryModelById(base)) {
      return { base, via: "free-suffix" };
    }
  }

  return unresolved;
}
