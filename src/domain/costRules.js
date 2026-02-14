/**
 * Cost Rules — Domain Layer (T-19)
 *
 * Business rules for cost management: budget thresholds,
 * quota checking, and cost summaries per API key.
 *
 * @module domain/costRules
 */

// @ts-check

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

/** @type {Map<string, BudgetConfig>} API key ID → budget config */
const budgets = new Map();

/** @type {Map<string, CostEntry[]>} API key ID → cost entries */
const costHistory = new Map();

/**
 * Set budget for an API key.
 *
 * @param {string} apiKeyId
 * @param {BudgetConfig} config
 */
export function setBudget(apiKeyId, config) {
  budgets.set(apiKeyId, {
    dailyLimitUsd: config.dailyLimitUsd,
    monthlyLimitUsd: config.monthlyLimitUsd || 0,
    warningThreshold: config.warningThreshold ?? 0.8,
  });
}

/**
 * Get budget config for an API key.
 *
 * @param {string} apiKeyId
 * @returns {BudgetConfig | null}
 */
export function getBudget(apiKeyId) {
  return budgets.get(apiKeyId) || null;
}

/**
 * Record a cost for an API key.
 *
 * @param {string} apiKeyId
 * @param {number} cost - Cost in USD
 */
export function recordCost(apiKeyId, cost) {
  if (!costHistory.has(apiKeyId)) {
    costHistory.set(apiKeyId, []);
  }
  costHistory.get(apiKeyId).push({ cost, timestamp: Date.now() });
}

/**
 * Check if an API key has remaining budget.
 *
 * @param {string} apiKeyId
 * @param {number} [additionalCost=0] - Projected cost to check
 * @returns {{ allowed: boolean, reason?: string, dailyUsed: number, dailyLimit: number, warningReached: boolean }}
 */
export function checkBudget(apiKeyId, additionalCost = 0) {
  const budget = budgets.get(apiKeyId);
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
  const entries = costHistory.get(apiKeyId) || [];
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const startMs = todayStart.getTime();

  return entries
    .filter((e) => e.timestamp >= startMs)
    .reduce((sum, e) => sum + e.cost, 0);
}

/**
 * Get cost summary for an API key.
 *
 * @param {string} apiKeyId
 * @returns {{ dailyTotal: number, monthlyTotal: number, totalEntries: number, budget: BudgetConfig | null }}
 */
export function getCostSummary(apiKeyId) {
  const entries = costHistory.get(apiKeyId) || [];
  const now = new Date();

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const dailyTotal = entries
    .filter((e) => e.timestamp >= todayStart.getTime())
    .reduce((sum, e) => sum + e.cost, 0);

  const monthlyTotal = entries
    .filter((e) => e.timestamp >= monthStart.getTime())
    .reduce((sum, e) => sum + e.cost, 0);

  return {
    dailyTotal,
    monthlyTotal,
    totalEntries: entries.length,
    budget: budgets.get(apiKeyId) || null,
  };
}

/**
 * Clear all cost data (for testing).
 */
export function resetCostData() {
  budgets.clear();
  costHistory.clear();
}
