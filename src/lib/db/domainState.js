/**
 * Domain State Persistence — Phase 5 Foundation
 *
 * CRUD operations for persisting domain layer state in SQLite.
 * Replaces in-memory Map() storage with durable persistence.
 *
 * Tables: domain_fallback_chains, domain_budgets, domain_cost_history,
 *         domain_lockout_state, domain_circuit_breakers
 *
 * @module lib/db/domainState
 */

import { getDbInstance, isBuildPhase, isCloud } from "./core.js";

// ──────────────── Fallback Chains ────────────────

/**
 * Save a fallback chain for a model.
 * @param {string} model
 * @param {Array<{provider: string, priority: number, enabled: boolean}>} chain
 */
export function saveFallbackChain(model, chain) {
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO domain_fallback_chains (model, chain) VALUES (?, ?)").run(
    model,
    JSON.stringify(chain)
  );
}

/**
 * Load a fallback chain for a model.
 * @param {string} model
 * @returns {Array<{provider: string, priority: number, enabled: boolean}> | null}
 */
export function loadFallbackChain(model) {
  const db = getDbInstance();
  const row = db.prepare("SELECT chain FROM domain_fallback_chains WHERE model = ?").get(model);
  return row ? JSON.parse(row.chain) : null;
}

/**
 * Load all fallback chains.
 * @returns {Record<string, Array<{provider: string, priority: number, enabled: boolean}>>}
 */
export function loadAllFallbackChains() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT model, chain FROM domain_fallback_chains").all();
  const result = {};
  for (const row of rows) {
    result[row.model] = JSON.parse(row.chain);
  }
  return result;
}

/**
 * Delete a fallback chain.
 * @param {string} model
 * @returns {boolean}
 */
export function deleteFallbackChain(model) {
  const db = getDbInstance();
  const info = db.prepare("DELETE FROM domain_fallback_chains WHERE model = ?").run(model);
  return info.changes > 0;
}

/**
 * Delete all fallback chains.
 */
export function deleteAllFallbackChains() {
  const db = getDbInstance();
  db.prepare("DELETE FROM domain_fallback_chains").run();
}

// ──────────────── Budgets ────────────────

/**
 * Save a budget config for an API key.
 * @param {string} apiKeyId
 * @param {{ dailyLimitUsd: number, monthlyLimitUsd?: number, warningThreshold?: number }} config
 */
export function saveBudget(apiKeyId, config) {
  const db = getDbInstance();
  db.prepare(
    `INSERT OR REPLACE INTO domain_budgets (api_key_id, daily_limit_usd, monthly_limit_usd, warning_threshold)
     VALUES (?, ?, ?, ?)`
  ).run(
    apiKeyId,
    config.dailyLimitUsd,
    config.monthlyLimitUsd || 0,
    config.warningThreshold ?? 0.8
  );
}

/**
 * Load a budget config.
 * @param {string} apiKeyId
 * @returns {{ dailyLimitUsd: number, monthlyLimitUsd: number, warningThreshold: number } | null}
 */
export function loadBudget(apiKeyId) {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM domain_budgets WHERE api_key_id = ?").get(apiKeyId);
  if (!row) return null;
  return {
    dailyLimitUsd: row.daily_limit_usd,
    monthlyLimitUsd: row.monthly_limit_usd,
    warningThreshold: row.warning_threshold,
  };
}

/**
 * Delete a budget config.
 * @param {string} apiKeyId
 */
export function deleteBudget(apiKeyId) {
  const db = getDbInstance();
  db.prepare("DELETE FROM domain_budgets WHERE api_key_id = ?").run(apiKeyId);
}

// ──────────────── Cost History ────────────────

/**
 * Record a cost entry.
 * @param {string} apiKeyId
 * @param {number} cost
 * @param {number} [timestamp]
 */
export function saveCostEntry(apiKeyId, cost, timestamp = Date.now()) {
  const db = getDbInstance();
  db.prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)").run(
    apiKeyId,
    cost,
    timestamp
  );
}

/**
 * Load cost entries for an API key within a time window.
 * @param {string} apiKeyId
 * @param {number} sinceTimestamp
 * @returns {Array<{cost: number, timestamp: number}>}
 */
export function loadCostEntries(apiKeyId, sinceTimestamp) {
  const db = getDbInstance();
  return db
    .prepare(
      "SELECT cost, timestamp FROM domain_cost_history WHERE api_key_id = ? AND timestamp >= ? ORDER BY timestamp"
    )
    .all(apiKeyId, sinceTimestamp);
}

/**
 * Delete old cost entries (cleanup).
 * @param {number} olderThanTimestamp
 * @returns {number} deleted count
 */
export function cleanOldCostEntries(olderThanTimestamp) {
  const db = getDbInstance();
  const info = db
    .prepare("DELETE FROM domain_cost_history WHERE timestamp < ?")
    .run(olderThanTimestamp);
  return info.changes;
}

/**
 * Delete all cost data for an API key.
 * @param {string} apiKeyId
 */
export function deleteCostEntries(apiKeyId) {
  const db = getDbInstance();
  db.prepare("DELETE FROM domain_cost_history WHERE api_key_id = ?").run(apiKeyId);
}

/**
 * Delete all cost data.
 */
export function deleteAllCostData() {
  const db = getDbInstance();
  db.prepare("DELETE FROM domain_cost_history").run();
  db.prepare("DELETE FROM domain_budgets").run();
}

// ──────────────── Lockout State ────────────────

/**
 * Save lockout state for an identifier.
 * @param {string} identifier
 * @param {{ attempts: number[], lockedUntil: number|null }} state
 */
export function saveLockoutState(identifier, state) {
  const db = getDbInstance();
  db.prepare(
    `INSERT OR REPLACE INTO domain_lockout_state (identifier, attempts, locked_until)
     VALUES (?, ?, ?)`
  ).run(identifier, JSON.stringify(state.attempts), state.lockedUntil);
}

/**
 * Load lockout state for an identifier.
 * @param {string} identifier
 * @returns {{ attempts: number[], lockedUntil: number|null } | null}
 */
export function loadLockoutState(identifier) {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM domain_lockout_state WHERE identifier = ?").get(identifier);
  if (!row) return null;
  return {
    attempts: JSON.parse(row.attempts),
    lockedUntil: row.locked_until,
  };
}

/**
 * Delete lockout state for an identifier.
 * @param {string} identifier
 */
export function deleteLockoutState(identifier) {
  const db = getDbInstance();
  db.prepare("DELETE FROM domain_lockout_state WHERE identifier = ?").run(identifier);
}

/**
 * Get all locked identifiers.
 * @returns {Array<{identifier: string, lockedUntil: number}>}
 */
export function loadAllLockedIdentifiers() {
  const db = getDbInstance();
  const now = Date.now();
  return db
    .prepare(
      "SELECT identifier, locked_until FROM domain_lockout_state WHERE locked_until IS NOT NULL AND locked_until > ?"
    )
    .all(now)
    .map((row) => ({
      identifier: row.identifier,
      lockedUntil: row.locked_until,
    }));
}

// ──────────────── Circuit Breakers ────────────────

/**
 * Save circuit breaker state.
 * @param {string} name
 * @param {{ state: string, failureCount: number, lastFailureTime: number|null, options?: object }} cbState
 */
export function saveCircuitBreakerState(name, cbState) {
  const db = getDbInstance();
  db.prepare(
    `INSERT OR REPLACE INTO domain_circuit_breakers (name, state, failure_count, last_failure_time, options)
     VALUES (?, ?, ?, ?, ?)`
  ).run(
    name,
    cbState.state,
    cbState.failureCount,
    cbState.lastFailureTime,
    cbState.options ? JSON.stringify(cbState.options) : null
  );
}

/**
 * Load circuit breaker state.
 * @param {string} name
 * @returns {{ state: string, failureCount: number, lastFailureTime: number|null, options?: object } | null}
 */
export function loadCircuitBreakerState(name) {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM domain_circuit_breakers WHERE name = ?").get(name);
  if (!row) return null;
  return {
    state: row.state,
    failureCount: row.failure_count,
    lastFailureTime: row.last_failure_time,
    options: row.options ? JSON.parse(row.options) : null,
  };
}

/**
 * Load all circuit breaker states.
 * @returns {Array<{name: string, state: string, failureCount: number, lastFailureTime: number|null}>}
 */
export function loadAllCircuitBreakerStates() {
  const db = getDbInstance();
  return db
    .prepare("SELECT name, state, failure_count, last_failure_time FROM domain_circuit_breakers")
    .all()
    .map((row) => ({
      name: row.name,
      state: row.state,
      failureCount: row.failure_count,
      lastFailureTime: row.last_failure_time,
    }));
}

/**
 * Delete a circuit breaker state.
 * @param {string} name
 */
export function deleteCircuitBreakerState(name) {
  const db = getDbInstance();
  db.prepare("DELETE FROM domain_circuit_breakers WHERE name = ?").run(name);
}

/**
 * Delete all circuit breaker states.
 */
export function deleteAllCircuitBreakerStates() {
  const db = getDbInstance();
  db.prepare("DELETE FROM domain_circuit_breakers").run();
}
