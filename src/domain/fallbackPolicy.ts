/**
 * Fallback Policy — Domain Layer (T-19)
 *
 * Declarative fallback chain for model routing.
 * When a primary provider is unavailable, the policy engine
 * resolves to alternative providers in priority order.
 *
 * State is persisted in SQLite via domainState.js.
 *
 * @module domain/fallbackPolicy
 */

// @ts-check

import {
  saveFallbackChain,
  loadFallbackChain,
  loadAllFallbackChains,
  deleteFallbackChain,
  deleteAllFallbackChains,
} from "../lib/db/domainState";

/**
 * @typedef {Object} FallbackEntry
 * @property {string} provider - Provider ID
 * @property {number} [priority=0] - Lower = higher priority
 * @property {boolean} [enabled=true] - Whether this fallback is active
 */

/** @type {Map<string, FallbackEntry[]>} In-memory cache backed by SQLite */
const fallbackChains = new Map();

/** @type {boolean} Whether we've loaded from DB yet */
let _loaded = false;

/**
 * Ensure in-memory cache is hydrated from SQLite.
 */
function ensureLoaded() {
  if (_loaded) return;
  try {
    const all = loadAllFallbackChains();
    for (const [model, chain] of Object.entries(all)) {
      fallbackChains.set(model, chain);
    }
  } catch {
    // DB may not be ready yet (build phase), that's ok
  }
  _loaded = true;
}

/**
 * Register a fallback chain for a model.
 *
 * @param {string} model - Model identifier (e.g. "gpt-4o")
 * @param {FallbackEntry[]} chain - Ordered list of fallback providers
 */
export function registerFallback(model, chain) {
  ensureLoaded();
  const sorted = [...chain]
    .map((e) => ({
      provider: e.provider,
      priority: e.priority ?? 0,
      enabled: e.enabled ?? true,
    }))
    .sort((a, b) => a.priority - b.priority);

  fallbackChains.set(model, sorted);
  try {
    saveFallbackChain(model, sorted);
  } catch {
    // Non-critical: in-memory still works
  }
}

/**
 * Resolve the fallback chain for a model.
 * Returns only enabled providers, sorted by priority.
 *
 * @param {string} model
 * @param {string[]} [excludeProviders=[]] - Providers to skip (e.g. already tried)
 * @returns {FallbackEntry[]} Ordered list of fallback providers
 */
export function resolveFallbackChain(model, excludeProviders = []) {
  ensureLoaded();
  const chain = fallbackChains.get(model);
  if (!chain) return [];

  const excludeSet = new Set(excludeProviders);
  return chain.filter((e) => e.enabled && !excludeSet.has(e.provider));
}

/**
 * Get the next provider in the fallback chain.
 *
 * @param {string} model
 * @param {string[]} [excludeProviders=[]]
 * @returns {string | null} Next provider ID or null if chain exhausted
 */
export function getNextFallback(model, excludeProviders = []) {
  const chain = resolveFallbackChain(model, excludeProviders);
  return chain.length > 0 ? chain[0].provider : null;
}

/**
 * Check if a model has any fallback providers configured.
 *
 * @param {string} model
 * @returns {boolean}
 */
export function hasFallback(model) {
  ensureLoaded();
  const chain = fallbackChains.get(model);
  return !!chain && chain.some((e) => e.enabled);
}

/**
 * Remove a fallback chain for a model.
 *
 * @param {string} model
 * @returns {boolean} true if removed
 */
export function removeFallback(model) {
  ensureLoaded();
  const removed = fallbackChains.delete(model);
  if (removed) {
    try {
      deleteFallbackChain(model);
    } catch {
      // Non-critical
    }
  }
  return removed;
}

/**
 * Get all registered fallback chains (for dashboard).
 *
 * @returns {Record<string, FallbackEntry[]>}
 */
export function getAllFallbackChains() {
  ensureLoaded();
  /** @type {Record<string, FallbackEntry[]>} */
  const result = {};
  for (const [model, chain] of fallbackChains.entries()) {
    result[model] = chain;
  }
  return result;
}

/**
 * Reset all fallback chains (for testing).
 */
export function resetAllFallbacks() {
  fallbackChains.clear();
  _loaded = false;
  try {
    deleteAllFallbackChains();
  } catch {
    // Non-critical
  }
}
