/**
 * accountFallback/exactModelLock.ts — exact-model (non-family-scoped) lockout key + entry math.
 *
 * Extracted from services/accountFallback.ts (file-size gate, #8630): pure helpers for the
 * opt-in "exact model" lockout scope introduced for Antigravity — a confirmed exhaustion on
 * one specific model (e.g. one Claude model) must not lock the whole quota family (Gemini or
 * other Claude models on the same account). Pure w.r.t. module state — accountFallback.ts
 * still owns the modelLockouts/modelFailureState maps, canonical-provider resolution, and the
 * cleanup timer; it calls into these with its own map instances.
 */

import type { ModelLockoutEntry, ModelFailureState } from "../accountFallback.ts";

/** Build the "exact" scoped lockout key — a distinct namespace from the quota-family key. */
export function buildExactModelLockKey(
  canonicalProvider: string,
  connectionId: string,
  model: string
): string {
  return `${canonicalProvider}:${connectionId}:exact:${model.trim().toLowerCase()}`;
}

/** Dedupe the 3 lockout key shapes callers must check: quota-family, #8050 not_found, exact. */
export function collectModelLockKeys(
  familyKey: string,
  notFoundKey: string,
  exactKey: string
): string[] {
  return Array.from(new Set([familyKey, notFoundKey, exactKey]));
}

/**
 * DI factory for `getModelLockKeys` — accountFallback.ts's own `getModelLockKey` (quota-family
 * scoping) and `getCanonicalLockProvider` (alias resolution) are private, so this closes over
 * them here rather than duplicating that logic in the leaf.
 */
export function createGetModelLockKeys(
  getModelLockKey: (
    provider: string,
    connectionId: string,
    model: string,
    reason?: string | null,
    status?: number | null
  ) => string,
  getCanonicalLockProvider: (provider: string) => string
) {
  return function getModelLockKeys(provider: string, connectionId: string, model: string) {
    return collectModelLockKeys(
      getModelLockKey(provider, connectionId, model),
      getModelLockKey(provider, connectionId, model, "not_found", 404),
      buildExactModelLockKey(getCanonicalLockProvider(provider), connectionId, model)
    );
  };
}

/**
 * Compute the next ModelLockoutEntry for an exact-model lock, merging with any existing entry
 * the same way lockModel() does (extend failureCount on a shorter re-lock instead of shrinking
 * the remaining cooldown). Returns null when the caller should leave state untouched.
 */
export function computeExactModelLockEntry(
  existing: ModelLockoutEntry | undefined,
  reason: string,
  cooldownMs: number,
  metadata: Partial<ModelLockoutEntry>
): ModelLockoutEntry | null {
  const now = Date.now();
  const newUntil = now + cooldownMs;
  if (existing && existing.until > newUntil) {
    if (!metadata.failureCount || metadata.failureCount <= existing.failureCount) return null;
    return {
      ...existing,
      failureCount: metadata.failureCount,
      lastFailureAt: metadata.lastFailureAt ?? existing.lastFailureAt,
      resetAfterMs: metadata.resetAfterMs ?? existing.resetAfterMs,
    };
  }
  return {
    reason,
    until: newUntil,
    lockedAt: now,
    failureCount: metadata.failureCount ?? existing?.failureCount ?? 1,
    lastFailureAt: metadata.lastFailureAt ?? now,
    resetAfterMs: metadata.resetAfterMs ?? existing?.resetAfterMs ?? 0,
  };
}

/**
 * Delete every one of the 3 lockout key shapes from both maps — a success on any one
 * of them must clear the lock regardless of which reason originally wrote it.
 */
export function clearMultiKeyLock(
  modelLockouts: Map<string, ModelLockoutEntry>,
  modelFailureState: Map<string, ModelFailureState>,
  keys: string[]
): boolean {
  let cleared = false;
  for (const key of keys) {
    cleared = modelLockouts.delete(key) || cleared;
    cleared = modelFailureState.delete(key) || cleared;
  }
  return cleared;
}

/** True when any of the 3 lockout key shapes is currently active (post-cleanup). */
export function isAnyKeyLocked(
  modelLockouts: Map<string, ModelLockoutEntry>,
  cleanup: (key: string) => void,
  keys: string[]
): boolean {
  return keys.some((key) => {
    cleanup(key);
    return modelLockouts.has(key);
  });
}

/** The active entry with the most remaining time across the 3 lockout key shapes. */
export function findLatestLockEntry(
  modelLockouts: Map<string, ModelLockoutEntry>,
  cleanup: (key: string) => void,
  keys: string[]
): ModelLockoutEntry | undefined {
  return keys
    .map((key) => {
      cleanup(key);
      return modelLockouts.get(key);
    })
    .filter((value): value is ModelLockoutEntry => Boolean(value))
    .sort((a, b) => b.until - a.until)[0];
}

/**
 * DI factory for the exported `lockExactModel` — accountFallback.ts owns the
 * modelLockouts map + cleanup timer/key private functions and closes over them here so
 * the full lock-only-this-exact-tuple implementation lives in this leaf, not the god-file.
 */
export function createLockExactModel(
  modelLockouts: Map<string, ModelLockoutEntry>,
  ensureCleanupTimer: () => void,
  cleanupModelLockKey: (key: string) => void,
  getCanonicalLockProvider: (provider: string) => string
) {
  return function lockExactModel(
    provider: string,
    connectionId: string,
    model: string | null | undefined,
    reason: string,
    cooldownMs: number,
    metadata: Partial<ModelLockoutEntry> = {}
  ): void {
    if (!model) return;
    ensureCleanupTimer();
    const key = buildExactModelLockKey(getCanonicalLockProvider(provider), connectionId, model);
    cleanupModelLockKey(key);
    const next = computeExactModelLockEntry(modelLockouts.get(key), reason, cooldownMs, metadata);
    if (next) modelLockouts.set(key, next);
  };
}
