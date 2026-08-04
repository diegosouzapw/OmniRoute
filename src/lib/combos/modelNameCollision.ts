/**
 * Combo-name / model-id collision detection (#8530).
 *
 * #6940 (closed by the maintainer) documents a combo named identically to a
 * bare model id — e.g. combo `gpt-5.5` fanning out to
 * `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5` — as THE supported
 * mechanism for per-model provider fallback on bare Responses model ids
 * (reusing the #3227/#3233 combo-before-rewrite precedence, which is
 * regression-tested in `tests/unit/responses-combo-resolution-3227.test.ts`
 * and `tests/unit/combo-name-codex-responses-rewrite.test.ts`).
 *
 * So a colliding name is NOT rejected — it is a supported, intentional
 * pattern. This module only makes the collision *observable*: callers use it
 * to attach a non-blocking warning to the create/rename response and to the
 * boot-time scan, instead of silently shadowing the model with zero signal.
 */
import { PROVIDER_MODELS } from "@/shared/constants/models";

export interface ComboModelCollision {
  providerId: string;
  modelId: string;
}

let cachedIndex: Map<string, ComboModelCollision> | null = null;

/**
 * Bare model id -> first provider that registers it. Built once from the
 * (lazily-generated, then cached) provider registry and memoized for the
 * process lifetime — the registry is static compiled-in config, not
 * runtime/DB state, so it never needs invalidation.
 */
function getModelIdIndex(): Map<string, ComboModelCollision> {
  if (cachedIndex) return cachedIndex;
  const index = new Map<string, ComboModelCollision>();
  for (const [providerId, models] of Object.entries(PROVIDER_MODELS)) {
    for (const model of models) {
      if (!index.has(model.id)) {
        index.set(model.id, { providerId, modelId: model.id });
      }
    }
  }
  cachedIndex = index;
  return index;
}

/** Test-only: force the memoized registry index to rebuild on next call. */
export function __resetModelNameCollisionCacheForTest(): void {
  cachedIndex = null;
}

/**
 * Returns the provider that registers `name` as a bare model id, or `null`
 * when `name` does not collide with any known real model id.
 */
export function findCollidingModel(name: string): ComboModelCollision | null {
  if (!name) return null;
  return getModelIdIndex().get(name) ?? null;
}

/** Machine-readable warning payload attached to POST/PUT combo responses. */
export function buildComboNameCollisionWarning(
  name: string
): { code: "COMBO_NAME_SHADOWS_MODEL"; modelId: string; providerId: string } | null {
  const collision = findCollidingModel(name);
  if (!collision) return null;
  return {
    code: "COMBO_NAME_SHADOWS_MODEL",
    modelId: collision.modelId,
    providerId: collision.providerId,
  };
}

/** Shape of the minimal combo record the boot-time scan needs. */
export interface ComboLike {
  name?: unknown;
}

/**
 * Boot-time scan (see `src/instrumentation-node.ts`): enumerates existing
 * combos whose name shadows a real model id, for a startup log — never a
 * hard failure, since the shadowing pattern is intentional per #6940.
 */
export function scanCombosForModelCollisions(
  combos: readonly ComboLike[]
): Array<{ comboName: string; providerId: string; modelId: string }> {
  const results: Array<{ comboName: string; providerId: string; modelId: string }> = [];
  for (const combo of combos) {
    if (typeof combo.name !== "string" || combo.name.length === 0) continue;
    const collision = findCollidingModel(combo.name);
    if (collision) {
      results.push({ comboName: combo.name, ...collision });
    }
  }
  return results;
}
