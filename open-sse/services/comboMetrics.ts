/**
 * In-memory combo metrics tracker
 * Tracks per-combo, per-model, and per-target request counts, latency, success/failure rates.
 * Provides API for reading metrics from the dashboard.
 */

import { recordProviderUsage } from "./autoCombo/providerDiversity";

interface ModelMetrics {
  requests: number;
  successes: number;
  failures: number;
  totalLatencyMs: number;
  lastStatus: "ok" | "error" | null;
  lastUsedAt: string | null;
}

interface ComboTargetMetrics extends ModelMetrics {
  executionKey: string;
  stepId: string | null;
  model: string;
  provider: string | null;
  providerId: string | null;
  connectionId: string | null;
  label: string | null;
}

interface ComboMetricsEntry {
  totalRequests: number;
  totalSuccesses: number;
  totalFailures: number;
  totalFallbacks: number;
  totalLatencyMs: number;
  strategy: string;
  lastUsedAt: string | null;
  intentCounts: Record<string, number>;
  byModel: Record<string, ModelMetrics>;
  byTarget: Record<string, ComboTargetMetrics>;
}

interface ComboShadowMetricsEntry {
  totalRequests: number;
  totalSuccesses: number;
  totalFailures: number;
  totalLatencyMs: number;
  lastUsedAt: string | null;
  byModel: Record<string, ModelMetrics>;
  byTarget: Record<string, ComboTargetMetrics>;
}

interface ModelMetricsView extends ModelMetrics {
  avgLatencyMs: number;
  successRate: number;
}

interface ComboTargetMetricsView extends ComboTargetMetrics {
  avgLatencyMs: number;
  successRate: number;
}

interface ComboMetricsView extends ComboMetricsEntry {
  productionTraffic: boolean;
  avgLatencyMs: number;
  successRate: number;
  fallbackRate: number;
  byModel: Record<string, ModelMetricsView>;
  byTarget: Record<string, ComboTargetMetricsView>;
  shadow: ComboShadowMetricsView;
}

interface ComboShadowMetricsView extends ComboShadowMetricsEntry {
  avgLatencyMs: number;
  successRate: number;
  byModel: Record<string, ModelMetricsView>;
  byTarget: Record<string, ComboTargetMetricsView>;
}

export interface ComboRequestTargetMeta {
  executionKey?: string | null;
  stepId?: string | null;
  provider?: string | null;
  providerId?: string | null;
  connectionId?: string | null;
  label?: string | null;
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function inferProvider(modelStr: string | null): string | null {
  const model = toNonEmptyString(modelStr);
  if (!model) return null;
  const [provider] = model.split("/");
  return toNonEmptyString(provider);
}

function createModelMetrics(): ModelMetrics {
  return {
    requests: 0,
    successes: 0,
    failures: 0,
    totalLatencyMs: 0,
    lastStatus: null,
    lastUsedAt: null,
  };
}

function createComboEntry(strategy: string): ComboMetricsEntry {
  return {
    totalRequests: 0,
    totalSuccesses: 0,
    totalFailures: 0,
    totalFallbacks: 0,
    totalLatencyMs: 0,
    strategy,
    lastUsedAt: null,
    intentCounts: {},
    byModel: {},
    byTarget: {},
  };
}

function createShadowEntry(): ComboShadowMetricsEntry {
  return {
    totalRequests: 0,
    totalSuccesses: 0,
    totalFailures: 0,
    totalLatencyMs: 0,
    lastUsedAt: null,
    byModel: {},
    byTarget: {},
  };
}

function applyMetricOutcome(
  metric: ModelMetrics,
  success: boolean,
  latencyMs: number,
  usedAt: string
): void {
  metric.requests++;
  metric.totalLatencyMs += latencyMs;
  metric.lastUsedAt = usedAt;

  if (success) {
    metric.successes++;
    metric.lastStatus = "ok";
    return;
  }

  metric.failures++;
  metric.lastStatus = "error";
}

function buildTargetMetric(
  modelStr: string,
  target: ComboRequestTargetMeta
): ComboTargetMetrics | null {
  const executionKey = toNonEmptyString(target.executionKey) || toNonEmptyString(modelStr);
  const model = toNonEmptyString(modelStr);
  if (!executionKey || !model) return null;

  return {
    executionKey,
    stepId: toNonEmptyString(target.stepId),
    model,
    provider: toNonEmptyString(target.provider) || inferProvider(model),
    providerId: toNonEmptyString(target.providerId),
    connectionId:
      target.connectionId === null ? null : (toNonEmptyString(target.connectionId) ?? null),
    label: target.label === null ? null : (toNonEmptyString(target.label) ?? null),
    ...createModelMetrics(),
  };
}

function toMetricView<T extends ModelMetrics>(
  metric: T
): T & {
  avgLatencyMs: number;
  successRate: number;
} {
  return {
    ...metric,
    avgLatencyMs: metric.requests > 0 ? Math.round(metric.totalLatencyMs / metric.requests) : 0,
    successRate: metric.requests > 0 ? Math.round((metric.successes / metric.requests) * 100) : 0,
  };
}

// In-memory store
const metrics = new Map<string, ComboMetricsEntry>();
const shadowMetrics = new Map<string, ComboShadowMetricsEntry>();
const MAX_METRICS_ENTRIES = 500;
const METRICS_TTL_MS = 60 * 60 * 1000; // 1 hour

function evictOldestMetric(
  targetMap: Map<string, { lastUsedAt: string | null }>,
  options: { deletePairedShadow?: boolean } = {}
): void {
  let oldest: string | null = null;
  let oldestTime = Infinity;
  for (const [name, entry] of targetMap) {
    const t = entry.lastUsedAt ? new Date(entry.lastUsedAt).getTime() : Date.now();
    if (t < oldestTime) { oldestTime = t; oldest = name; }
  }
  if (oldest) {
    targetMap.delete(oldest);
    if (options.deletePairedShadow) {
      shadowMetrics.delete(oldest);
    }
  }
}

const _metricsCleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [name, entry] of metrics) {
    const lastUsed = entry.lastUsedAt ? new Date(entry.lastUsedAt).getTime() : now;
    if (now - lastUsed > METRICS_TTL_MS) {
      metrics.delete(name);
      shadowMetrics.delete(name);
    }
  }
  for (const [name, entry] of shadowMetrics) {
    const lastUsed = entry.lastUsedAt ? new Date(entry.lastUsedAt).getTime() : now;
    if (now - lastUsed > METRICS_TTL_MS) {
      metrics.delete(name);
      shadowMetrics.delete(name);
    }
  }
}, 5 * 60 * 1000); // every 5 minutes
_metricsCleanupTimer.unref?.(); // Don't prevent process exit

/**
 * Record a combo request result.
 * @param {string} comboName
 * @param {string} modelStr - The model that handled the request (or null if all failed)
 * @param {Object} options
 * @param {boolean} options.success
 * @param {number} options.latencyMs
 * @param {number} options.fallbackCount - How many fallbacks occurred
 * @param {string} [options.strategy] - Routing strategy name
 * @param {Object} [options.target] - Step/execution metadata for structured combos
 */
export function recordComboRequest(
  comboName: string,
  modelStr: string | null,
  {
    success,
    latencyMs,
    fallbackCount = 0,
    strategy = "priority",
    target,
  }: {
    success: boolean;
    latencyMs: number;
    fallbackCount?: number;
    strategy?: string;
    target?: ComboRequestTargetMeta | null;
  }
): void {
  if (!metrics.has(comboName) && metrics.size >= MAX_METRICS_ENTRIES) {
    evictOldestMetric(metrics, { deletePairedShadow: true });
  }
  if (!metrics.has(comboName)) {
    metrics.set(comboName, createComboEntry(strategy));
  }

  const combo = metrics.get(comboName);
  if (!combo) return;

  const usedAt = new Date().toISOString();
  combo.totalRequests++;
  combo.totalLatencyMs += latencyMs;
  combo.totalFallbacks += fallbackCount;
  combo.lastUsedAt = usedAt;
  combo.strategy = strategy;

  if (success) {
    combo.totalSuccesses++;
    // Feed the provider-diversity report (/api/analytics/diversity): record the
    // provider that actually served this request. recordComboRequest is the
    // single chokepoint every combo strategy funnels through, so one call here
    // covers priority / round-robin / weighted / auto / etc.
    const usedProvider = toNonEmptyString(target?.provider);
    if (usedProvider) recordProviderUsage(usedProvider);
  } else {
    combo.totalFailures++;
  }

  if (!modelStr) return;

  if (!combo.byModel[modelStr]) {
    combo.byModel[modelStr] = createModelMetrics();
  }
  applyMetricOutcome(combo.byModel[modelStr], success, latencyMs, usedAt);

  const targetMetric = buildTargetMetric(modelStr, target || {});
  if (!targetMetric) return;

  if (!combo.byTarget[targetMetric.executionKey]) {
    combo.byTarget[targetMetric.executionKey] = targetMetric;
  }

  const existingTargetMetric = combo.byTarget[targetMetric.executionKey];
  existingTargetMetric.stepId = targetMetric.stepId || existingTargetMetric.stepId;
  existingTargetMetric.provider = targetMetric.provider || existingTargetMetric.provider;
  existingTargetMetric.providerId = targetMetric.providerId || existingTargetMetric.providerId;
  existingTargetMetric.connectionId =
    target?.connectionId === null
      ? null
      : (targetMetric.connectionId ?? existingTargetMetric.connectionId);
  existingTargetMetric.label =
    target?.label === null ? null : (targetMetric.label ?? existingTargetMetric.label);

  applyMetricOutcome(existingTargetMetric, success, latencyMs, usedAt);
}

/**
 * Record a shadow/dark-launch combo request result in isolated metrics.
 * Shadow metrics are deliberately not mixed into production counters because
 * least-used and P2C strategies read production metrics for routing decisions.
 */
export function recordComboShadowRequest(
  comboName: string,
  modelStr: string | null,
  {
    success,
    latencyMs,
    target,
  }: {
    success: boolean;
    latencyMs: number;
    target?: ComboRequestTargetMeta | null;
  }
): void {
  if (!shadowMetrics.has(comboName) && shadowMetrics.size >= MAX_METRICS_ENTRIES) {
    evictOldestMetric(shadowMetrics);
  }
  if (!shadowMetrics.has(comboName)) {
    shadowMetrics.set(comboName, createShadowEntry());
  }

  const combo = shadowMetrics.get(comboName);
  if (!combo) return;

  const usedAt = new Date().toISOString();
  combo.totalRequests++;
  combo.totalLatencyMs += latencyMs;
  combo.lastUsedAt = usedAt;

  if (success) combo.totalSuccesses++;
  else combo.totalFailures++;

  if (!modelStr) return;

  if (!combo.byModel[modelStr]) {
    combo.byModel[modelStr] = createModelMetrics();
  }
  applyMetricOutcome(combo.byModel[modelStr], success, latencyMs, usedAt);

  const targetMetric = buildTargetMetric(modelStr, target || {});
  if (!targetMetric) return;

  if (!combo.byTarget[targetMetric.executionKey]) {
    combo.byTarget[targetMetric.executionKey] = targetMetric;
  }

  const existingTargetMetric = combo.byTarget[targetMetric.executionKey];
  existingTargetMetric.stepId = targetMetric.stepId || existingTargetMetric.stepId;
  existingTargetMetric.provider = targetMetric.provider || existingTargetMetric.provider;
  existingTargetMetric.providerId = targetMetric.providerId || existingTargetMetric.providerId;
  existingTargetMetric.connectionId =
    target?.connectionId === null
      ? null
      : (targetMetric.connectionId ?? existingTargetMetric.connectionId);
  existingTargetMetric.label =
    target?.label === null ? null : (targetMetric.label ?? existingTargetMetric.label);

  applyMetricOutcome(existingTargetMetric, success, latencyMs, usedAt);
}

function getComboShadowMetrics(comboName: string): ComboShadowMetricsView {
  const combo = shadowMetrics.get(comboName) || createShadowEntry();
  return {
    ...combo,
    avgLatencyMs:
      combo.totalRequests > 0 ? Math.round(combo.totalLatencyMs / combo.totalRequests) : 0,
    successRate:
      combo.totalRequests > 0 ? Math.round((combo.totalSuccesses / combo.totalRequests) * 100) : 0,
    byModel: Object.fromEntries(
      Object.entries(combo.byModel).map(([model, metric]) => [model, toMetricView(metric)])
    ),
    byTarget: Object.fromEntries(
      Object.entries(combo.byTarget).map(([executionKey, metric]) => [
        executionKey,
        toMetricView(metric),
      ])
    ),
  };
}

/**
 * Get metrics for a specific combo.
 * @param {string} comboName
 * @returns {Object|null}
 */
export function getComboMetrics(comboName: string): ComboMetricsView | null {
  const productionCombo = metrics.get(comboName);
  const combo =
    productionCombo || (shadowMetrics.has(comboName) ? createComboEntry("priority") : null);
  if (!combo) return null;

  return {
    ...combo,
    productionTraffic: !!productionCombo && productionCombo.totalRequests > 0,
    avgLatencyMs:
      combo.totalRequests > 0 ? Math.round(combo.totalLatencyMs / combo.totalRequests) : 0,
    successRate:
      combo.totalRequests > 0 ? Math.round((combo.totalSuccesses / combo.totalRequests) * 100) : 0,
    fallbackRate:
      combo.totalRequests > 0 ? Math.round((combo.totalFallbacks / combo.totalRequests) * 100) : 0,
    intentCounts: { ...combo.intentCounts },
    byModel: Object.fromEntries(
      Object.entries(combo.byModel).map(([model, metric]) => [model, toMetricView(metric)])
    ),
    byTarget: Object.fromEntries(
      Object.entries(combo.byTarget).map(([executionKey, metric]) => [
        executionKey,
        toMetricView(metric),
      ])
    ),
    shadow: getComboShadowMetrics(comboName),
  };
}

/**
 * Get metrics for all combos.
 * @returns {Object} Map of comboName → metrics
 */
export function getAllComboMetrics(): Record<string, ComboMetricsView | null> {
  const result: Record<string, ComboMetricsView | null> = {};
  for (const name of new Set([...metrics.keys(), ...shadowMetrics.keys()])) {
    result[name] = getComboMetrics(name);
  }
  return result;
}

/**
 * Record detected prompt intent for a combo (used by multilingual routing analytics).
 */
export function recordComboIntent(comboName: string, intent: string): void {
  if (!metrics.has(comboName) && metrics.size >= MAX_METRICS_ENTRIES) {
    evictOldestMetric(metrics, { deletePairedShadow: true });
  }
  if (!metrics.has(comboName)) {
    metrics.set(comboName, createComboEntry("priority"));
  }

  const combo = metrics.get(comboName);
  if (!combo) return;
  const key = String(intent || "unknown");
  combo.intentCounts[key] = (combo.intentCounts[key] || 0) + 1;
}

/**
 * Reset metrics for a specific combo.
 */
export function resetComboMetrics(comboName: string): void {
  metrics.delete(comboName);
  shadowMetrics.delete(comboName);
}

/**
 * Reset all combo metrics.
 */
export function resetAllComboMetrics(): void {
  clearInterval(_metricsCleanupTimer);
  metrics.clear();
  shadowMetrics.clear();
}
