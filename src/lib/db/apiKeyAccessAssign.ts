/**
 * db/apiKeyAccessAssign.ts — Atomic add/remove of allowed models and combos on an API key.
 *
 * Keeps concurrency safe via an in-process async lock per key ID and writes through
 * updateApiKeyPermissions so all existing invariants, normalizations and cache invalidations run.
 *
 * Concurrency & Lost Update Note:
 * Calls to `assignApiKeyAccess` are serialized per key ID using `withKeyAccessLock` (an in-process
 * promise chain map) to ensure concurrent add/remove assignments on the same key do not overwrite
 * each other.
 *
 * Direct PATCH /api/keys/[id] requests completely overwrite permissions without acquiring this lock.
 * Running the read-merge-write inside a single synchronous DB transaction alongside the PATCH path
 * is not possible without refactoring updateApiKeyPermissions in src/lib/db/apiKeys.ts (which is
 * frozen at its file size cap). Callers doing incremental model/combo assignments should use this
 * endpoint rather than interleaved read-modify-PATCH requests.
 */

import { getApiKeyById, updateApiKeyPermissions, ApiKeyPolicyInvariantError } from "./apiKeys";
import type { ModelAccessMode } from "./apiKeys/modelAccessMode";
import type { ApiKeyAccessAssignInput } from "@/shared/validation/schemas/keys";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import { normalizeComboAccessName } from "@/shared/utils/apiKeyPolicy";

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

export class KeyAllowsAllCombosError extends Error {
  readonly code = "key_allows_all_combos";
  constructor(
    message = "API key allows all combos. Specify switchToRestricted: true to switch to restricted access."
  ) {
    super(message);
    this.name = "KeyAllowsAllCombosError";
  }
}

export class EmptyRestrictedAccessListError extends Error {
  readonly code = "EMPTY_RESTRICTED_ACCESS_LIST";
  constructor(message: string) {
    super(message);
    this.name = "EmptyRestrictedAccessListError";
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
 * Deduplicate models while keeping order: existing items first, then newly added items.
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

/**
 * Deduplicate combos comparing normalized combo names (foo == combo/foo)
 * while preserving order: existing then newly added.
 * Removals match on normalized names and are applied after additions.
 */
function computeUpdatedComboList(
  existing: readonly string[],
  toAdd: readonly string[] = [],
  toRemove: readonly string[] = []
): string[] {
  const seenNorm = new Set<string>();
  const merged: string[] = [];

  for (const item of existing) {
    const norm = normalizeComboAccessName(item) ?? item;
    if (!seenNorm.has(norm)) {
      seenNorm.add(norm);
      merged.push(item);
    }
  }

  for (const item of toAdd) {
    const norm = normalizeComboAccessName(item) ?? item;
    if (!seenNorm.has(norm)) {
      seenNorm.add(norm);
      merged.push(item);
    }
  }

  if (toRemove.length > 0) {
    const removeNormSet = new Set(toRemove.map((item) => normalizeComboAccessName(item) ?? item));
    return merged.filter((item) => {
      const norm = normalizeComboAccessName(item) ?? item;
      return !removeNormSet.has(norm);
    });
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

/** The access fields of a key: read from the stored key, and planned for the assignment. */
interface KeyAccessFields {
  modelAccessMode: ModelAccessMode;
  allowedModels: string[];
  allowedCombos: string[];
}

/**
 * Next model access for the key. A restricted key merges the additions and removals. An "all"
 * key changes only when models are added, and then only with switchToRestricted.
 */
function planModelAccess(
  key: KeyAccessFields,
  options: ApiKeyAccessAssignInput
): Pick<KeyAccessFields, "modelAccessMode" | "allowedModels"> {
  const addModels = options.add?.models ?? [];
  const removeModels = options.remove?.models ?? [];

  if (key.modelAccessMode !== "all") {
    return {
      modelAccessMode: "restricted",
      allowedModels: computeUpdatedList(key.allowedModels || [], addModels, removeModels),
    };
  }

  if (addModels.length === 0) {
    // Removing from an "all" key is a no-op: mode stays "all", models list stays empty
    return { modelAccessMode: key.modelAccessMode, allowedModels: key.allowedModels || [] };
  }

  if (!options.switchToRestricted) {
    throw new KeyAllowsAllModelsError();
  }
  // When switching to restricted from all, allowedModels is exactly the added models
  // (with any requested removals applied).
  const allowedModels = computeUpdatedList([], addModels, removeModels);
  if (allowedModels.length === 0) {
    throw new EmptyRestrictedAccessListError(
      "Switching to restricted models cannot result in an empty allowlist"
    );
  }
  return { modelAccessMode: "restricted", allowedModels };
}

/**
 * Next allowed combos for the key. combo/* means allow-all combos: such a key changes only when
 * combos are added, and then only with switchToRestricted.
 */
function planComboAccess(key: KeyAccessFields, options: ApiKeyAccessAssignInput): string[] {
  const addCombos = options.add?.combos ?? [];
  const removeCombos = options.remove?.combos ?? [];
  const isAllCombosKey = (key.allowedCombos ?? []).includes(ALL_COMBOS_ACCESS_RULE);

  if (!isAllCombosKey) {
    return computeUpdatedComboList(key.allowedCombos || [], addCombos, removeCombos);
  }

  if (addCombos.length === 0) {
    // Removing from an allow-all combos key is a no-op: preserve existing combo/*
    return key.allowedCombos || [ALL_COMBOS_ACCESS_RULE];
  }

  if (!options.switchToRestricted) {
    throw new KeyAllowsAllCombosError();
  }
  // When switching to restricted from all combos, drop combo/* and apply list
  const allowedCombos = computeUpdatedComboList([], addCombos, removeCombos);
  if (allowedCombos.length === 0) {
    throw new EmptyRestrictedAccessListError(
      "Switching to restricted combos cannot result in an empty allowlist"
    );
  }
  return allowedCombos;
}

/** Caps validation matching updateKeyPermissionsSchema. */
function assertWithinAccessCaps(plan: KeyAccessFields): void {
  if (plan.allowedModels.length > MAX_ALLOWED_MODELS) {
    throw new KeyAccessCapExceededError(
      `Allowed models list exceeds maximum limit of ${MAX_ALLOWED_MODELS}`
    );
  }

  if (plan.allowedCombos.length > MAX_ALLOWED_COMBOS) {
    throw new KeyAccessCapExceededError(
      `Allowed combos list exceeds maximum limit of ${MAX_ALLOWED_COMBOS}`
    );
  }
}

/**
 * Resolve the access the key will have after the assignment. Throws when the key allows all
 * models or combos without switchToRestricted, when the switch leaves an empty list, or when a
 * resulting list exceeds its cap.
 */
function planKeyAccess(key: KeyAccessFields, options: ApiKeyAccessAssignInput): KeyAccessFields {
  const { modelAccessMode, allowedModels } = planModelAccess(key, options);
  const allowedCombos = planComboAccess(key, options);
  const plan = { modelAccessMode, allowedModels, allowedCombos };
  assertWithinAccessCaps(plan);
  return plan;
}

function hasAccessChanged(key: KeyAccessFields, plan: KeyAccessFields): boolean {
  const modeChanged = plan.modelAccessMode !== key.modelAccessMode;
  const modelsChanged = !arraysEqual(key.allowedModels || [], plan.allowedModels);
  const combosChanged = !arraysEqual(key.allowedCombos || [], plan.allowedCombos);
  return modeChanged || modelsChanged || combosChanged;
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

    const plan = planKeyAccess(key, options);
    const changed = hasAccessChanged(key, plan);

    if (changed) {
      const updated = await updateApiKeyPermissions(id, {
        modelAccessMode: plan.modelAccessMode,
        allowedModels: plan.allowedModels,
        allowedCombos: plan.allowedCombos,
      });

      if (!updated) {
        return null;
      }
    }

    return {
      id: key.id,
      modelAccessMode: plan.modelAccessMode,
      allowedModels: plan.allowedModels,
      allowedCombos: plan.allowedCombos,
      changed,
    };
  });
}
