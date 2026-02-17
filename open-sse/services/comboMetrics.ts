/**
 * In-memory combo metrics tracker
 * Tracks per-combo and per-model request counts, latency, success/failure rates
 * Provides API for reading metrics from the dashboard
 */

// In-memory store
const metrics = new Map();

/**
 * Record a combo request result
 * @param {string} comboName
 * @param {string} modelStr - The model that handled the request (or null if all failed)
 * @param {Object} options
 * @param {boolean} options.success
 * @param {number} options.latencyMs
 * @param {number} options.fallbackCount - How many fallbacks occurred
 * @param {string} [options.strategy] - "priority" or "weighted"
 */
export function recordComboRequest(
  comboName,
  modelStr,
  { success, latencyMs, fallbackCount = 0, strategy = "priority" }
) {
  if (!metrics.has(comboName)) {
    metrics.set(comboName, {
      totalRequests: 0,
      totalSuccesses: 0,
      totalFailures: 0,
      totalFallbacks: 0,
      totalLatencyMs: 0,
      strategy,
      lastUsedAt: null,
      byModel: {},
    });
  }

  const combo = metrics.get(comboName);
  combo.totalRequests++;
  combo.totalLatencyMs += latencyMs;
  combo.totalFallbacks += fallbackCount;
  combo.lastUsedAt = new Date().toISOString();
  combo.strategy = strategy;

  if (success) {
    combo.totalSuccesses++;
  } else {
    combo.totalFailures++;
  }

  // Per-model tracking
  if (modelStr) {
    if (!combo.byModel[modelStr]) {
      combo.byModel[modelStr] = {
        requests: 0,
        successes: 0,
        failures: 0,
        totalLatencyMs: 0,
        lastStatus: null,
        lastUsedAt: null,
      };
    }
    const modelMetric = combo.byModel[modelStr];
    modelMetric.requests++;
    modelMetric.totalLatencyMs += latencyMs;
    modelMetric.lastUsedAt = new Date().toISOString();

    if (success) {
      modelMetric.successes++;
      modelMetric.lastStatus = "ok";
    } else {
      modelMetric.failures++;
      modelMetric.lastStatus = "error";
    }
  }
}

/**
 * Get metrics for a specific combo
 * @param {string} comboName
 * @returns {Object|null}
 */
export function getComboMetrics(comboName) {
  const combo = metrics.get(comboName);
  if (!combo) return null;

  return {
    ...combo,
    avgLatencyMs:
      combo.totalRequests > 0 ? Math.round(combo.totalLatencyMs / combo.totalRequests) : 0,
    successRate:
      combo.totalRequests > 0 ? Math.round((combo.totalSuccesses / combo.totalRequests) * 100) : 0,
    fallbackRate:
      combo.totalRequests > 0 ? Math.round((combo.totalFallbacks / combo.totalRequests) * 100) : 0,
    byModel: Object.fromEntries(
      Object.entries(combo.byModel).map(([model, m]) => [
        model,
        {
          // @ts-ignore
          ...m,
          // @ts-ignore
          avgLatencyMs: m.requests > 0 ? Math.round(m.totalLatencyMs / m.requests) : 0,
          // @ts-ignore
          successRate: m.requests > 0 ? Math.round((m.successes / m.requests) * 100) : 0,
        },
      ])
    ),
  };
}

/**
 * Get metrics for all combos
 * @returns {Object} Map of comboName → metrics
 */
export function getAllComboMetrics() {
  const result = {};
  for (const [name] of metrics) {
    result[name] = getComboMetrics(name);
  }
  return result;
}

/**
 * Reset metrics for a specific combo
 */
export function resetComboMetrics(comboName) {
  metrics.delete(comboName);
}

/**
 * Reset all combo metrics
 */
export function resetAllComboMetrics() {
  metrics.clear();
}
