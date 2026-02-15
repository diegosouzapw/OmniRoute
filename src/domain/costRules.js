/**
 * Cost Rules — Domain Layer (T-19)
 *
 * Business rules for cost management: budget thresholds,
 * quota checking, and cost summaries per API key.
 *
 * State is persisted in SQLite via domainState.js.
 *
 * @module domain/costRules
 */

// @ts-check

import {
  saveBudget,
  loadBudget,
  saveCostEntry,
  loadCostEntries,
  deleteAllCostData,
  deleteBudget as dbDeleteBudget,
  deleteCostEntries,
} from "../lib/db/domainState.js";

/**
 * @typedef {Object} BudgetConfig
 * @property {number} dailyLimitUsd - Max daily spend in USD
 * @property {number} [monthlyLimitUsd] - Max monthly spend in USD
 * @property {number} [warningThreshold=0.8] - Alert when usage reaches this fraction
 */

/**
 * @typedef {Object} CostEntry
 * @property {number} cost - Cost in USD
 * @property {number} timestamp - Unix timestamp
 */

/** @type {Map<string, BudgetConfig>} In-memory cache for budgets */
const budgets = new Map();

/** @type {boolean} */
let _budgetsLoaded = false;

/**
 * Set budget for an API key.
 *
 * @param {string} apiKeyId
 * @param {BudgetConfig} config
 */
export function setBudget(apiKeyId, config) {
  const normalized = {
    dailyLimitUsd: config.dailyLimitUsd,
    monthlyLimitUsd: config.monthlyLimitUsd || 0,
    warningThreshold: config.warningThreshold ?? 0.8,
  };
  budgets.set(apiKeyId, normalized);
  try {
    saveBudget(apiKeyId, normalized);
  } catch {
    // Non-critical: in-memory still works
  }
}

/**
 * Get budget config for an API key.
 *
 * @param {string} apiKeyId
 * @returns {BudgetConfig | null}
 */
export function getBudget(apiKeyId) {
  // Check in-memory cache first
  if (budgets.has(apiKeyId)) {
    return budgets.get(apiKeyId);
  }
  // Try loading from DB
  try {
    const fromDb = loadBudget(apiKeyId);
    if (fromDb) {
      budgets.set(apiKeyId, fromDb);
      return fromDb;
    }
  } catch {
    // DB may not be ready
  }
  return null;
}

/**
 * Record a cost for an API key.
 *
 * @param {string} apiKeyId
 * @param {number} cost - Cost in USD
 */
export function recordCost(apiKeyId, cost) {
  const timestamp = Date.now();
  try {
    saveCostEntry(apiKeyId, cost, timestamp);
  } catch {
    // Non-critical
  }
}

/**
 * Check if an API key has remaining budget.
 *
 * @param {string} apiKeyId
 * @param {number} [additionalCost=0] - Projected cost to check
 * @returns {{ allowed: boolean, reason?: string, dailyUsed: number, dailyLimit: number, warningReached: boolean }}
 */
export function checkBudget(apiKeyId, additionalCost = 0) {
  const budget = getBudget(apiKeyId);
  if (!budget) {
    return { allowed: true, dailyUsed: 0, dailyLimit: 0, warningReached: false };
  }

  const dailyUsed = getDailyTotal(apiKeyId);
  const projectedTotal = dailyUsed + additionalCost;
  const warningReached = projectedTotal >= budget.dailyLimitUsd * budget.warningThreshold;

  if (projectedTotal > budget.dailyLimitUsd) {
    return {
      allowed: false,
      reason: `Daily budget exceeded: $${projectedTotal.toFixed(4)} / $${budget.dailyLimitUsd.toFixed(2)}`,
      dailyUsed,
      dailyLimit: budget.dailyLimitUsd,
      warningReached: true,
    };
  }

  return {
    allowed: true,
    dailyUsed,
    dailyLimit: budget.dailyLimitUsd,
    warningReached,
  };
}

/**
 * Get daily total cost for an API key.
 *
 * @param {string} apiKeyId
 * @returns {number} Total cost today in USD
 */
export function getDailyTotal(apiKeyId) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const startMs = todayStart.getTime();

  try {
    const entries = loadCostEntries(apiKeyId, startMs);
    return entries.reduce((sum, e) => sum + e.cost, 0);
  } catch {
    return 0;
  }
}

/**
 * Get cost summary for an API key.
 *
 * @param {string} apiKeyId
 * @returns {{ dailyTotal: number, monthlyTotal: number, totalEntries: number, budget: BudgetConfig | null }}
 */
export function getCostSummary(apiKeyId) {
  const now = new Date();

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const dailyEntries = loadCostEntries(apiKeyId, todayStart.getTime());
    const monthlyEntries = loadCostEntries(apiKeyId, monthStart.getTime());

    const dailyTotal = dailyEntries.reduce((sum, e) => sum + e.cost, 0);
    const monthlyTotal = monthlyEntries.reduce((sum, e) => sum + e.cost, 0);

    return {
      dailyTotal,
      monthlyTotal,
      totalEntries: monthlyEntries.length,
      budget: getBudget(apiKeyId),
    };
  } catch {
    return {
      dailyTotal: 0,
      monthlyTotal: 0,
      totalEntries: 0,
      budget: getBudget(apiKeyId),
    };
  }
}

/**
 * Clear all cost data (for testing).
 */
export function resetCostData() {
  budgets.clear();
  _budgetsLoaded = false;
  try {
    deleteAllCostData();
  } catch {
    // Non-critical
  }
}
