/**
 * db/apiKeyAccessAssign.ts — Atomic add/remove of allowed models and combos on an API key.
 *
 * Keeps concurrency safe via an in-process async lock per key ID and writes through
 * updateApiKeyPermissions so all existing invariants, normalizations and cache invalidations run.
 */

import { getApiKeyById, updateApiKeyPermissions, ApiKeyPolicyInvariantError } from "./apiKeys";
import type { ModelAccessMode } from "./apiKeys/modelAccessMode";
import type { ApiKeyAccessAssignInput } from "@/shared/validation/schemas/keys";

export { ApiKeyPolicyInvariantError };

export class KeyAllowsAllModelsError extends Error {
  readonly code = "key_allows_all_models";
  constructor(
    message = "API key allows all models. Specify switchToRestricted: true to switch to restricted access."
  ) {
    super(message);
    this.name = "KeyAllowsAllModelsError";
  }
}

export class KeyAccessCapExceededError extends Error {
  readonly code = "KEY_ACCESS_CAP_EXCEEDED";
  constructor(message: string) {
    super(message);
    this.name = "KeyAccessCapExceededError";
  }
}

export interface KeyAccessAssignResult {
  id: string;
  modelAccessMode: ModelAccessMode;
  allowedModels: string[];
  allowedCombos: string[];
  changed: boolean;
}

const MAX_ALLOWED_MODELS = 1000;
const MAX_ALLOWED_COMBOS = 500;

// Promise chain map for in-process async locking per key ID.
// Entries are removed as soon as the lock goes idle.
const keyLocks = new Map<string, Promise<unknown>>();

export async function withKeyAccessLock<T>(keyId: string, fn: () => Promise<T>): Promise<T> {
  const previous = keyLocks.get(keyId) ?? Promise.resolve();

  let release!: () => void;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });

  const chained = previous.then(
    () => {},
    () => {}
  );
  keyLocks.set(keyId, current);

  await chained;
  try {
    return await fn();
  } finally {
    release();
    if (keyLocks.get(keyId) === current) {
      keyLocks.delete(keyId);
    }
  }
}

/**
 * Deduplicate items while keeping order: existing items first, then newly added items.
 * Removals are applied after additions.
 */
function computeUpdatedList(
  existing: readonly string[],
  toAdd: readonly string[] = [],
  toRemove: readonly string[] = []
): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const item of existing) {
    if (!seen.has(item)) {
      seen.add(item);
      merged.push(item);
    }
  }

  for (const item of toAdd) {
    if (!seen.has(item)) {
      seen.add(item);
      merged.push(item);
    }
  }

  if (toRemove.length > 0) {
    const removeSet = new Set(toRemove);
    return merged.filter((item) => !removeSet.has(item));
  }

  return merged;
}

function arraysEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Atomically assign (add/remove) models and combos to an API key.
 * Serialized per key id using withKeyAccessLock.
 */
export async function assignApiKeyAccess(
  id: string,
  options: ApiKeyAccessAssignInput
): Promise<KeyAccessAssignResult | null> {
  return withKeyAccessLock(id, async () => {
    const key = await getApiKeyById(id);
    if (!key) {
      return null;
    }

    const currentMode = key.modelAccessMode;
    const addModels = options.add?.models ?? [];
    const removeModels = options.remove?.models ?? [];
    const addCombos = options.add?.combos ?? [];
    const removeCombos = options.remove?.combos ?? [];

    let nextModelAccessMode: ModelAccessMode = currentMode;
    let nextAllowedModels: string[];

    if (currentMode === "all") {
      if (addModels.length > 0) {
        if (!options.switchToRestricted) {
          throw new KeyAllowsAllModelsError();
        }
        nextModelAccessMode = "restricted";
        // When switching to restricted from all, allowedModels is exactly the added models
        // (with any requested removals applied).
        nextAllowedModels = computeUpdatedList([], addModels, removeModels);
      } else {
        // Removing from an "all" key is a no-op: mode stays "all", models list stays empty
        nextAllowedModels = key.allowedModels || [];
      }
    } else {
      nextModelAccessMode = "restricted";
      nextAllowedModels = computeUpdatedList(key.allowedModels || [], addModels, removeModels);
    }

    // Combos are always an allow-list
    const nextAllowedCombos = computeUpdatedList(key.allowedCombos || [], addCombos, removeCombos);

    // Caps validation matching updateKeyPermissionsSchema
    if (nextAllowedModels.length > MAX_ALLOWED_MODELS) {
      throw new KeyAccessCapExceededError(
        `Allowed models list exceeds maximum limit of ${MAX_ALLOWED_MODELS}`
      );
    }

    if (nextAllowedCombos.length > MAX_ALLOWED_COMBOS) {
      throw new KeyAccessCapExceededError(
        `Allowed combos list exceeds maximum limit of ${MAX_ALLOWED_COMBOS}`
      );
    }

    const modeChanged = nextModelAccessMode !== currentMode;
    const modelsChanged = !arraysEqual(key.allowedModels || [], nextAllowedModels);
    const combosChanged = !arraysEqual(key.allowedCombos || [], nextAllowedCombos);
    const changed = modeChanged || modelsChanged || combosChanged;

    if (changed) {
      const updated = await updateApiKeyPermissions(id, {
        modelAccessMode: nextModelAccessMode,
        allowedModels: nextAllowedModels,
        allowedCombos: nextAllowedCombos,
      });

      if (!updated) {
        return null;
      }
    }

    return {
      id: key.id,
      modelAccessMode: nextModelAccessMode,
      allowedModels: nextAllowedModels,
      allowedCombos: nextAllowedCombos,
      changed,
    };
  });
}
