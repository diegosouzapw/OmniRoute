import { getComboById, getCombos } from "@/lib/db/combos";
import { getDbInstance } from "@/lib/db/core";
import { getQuotaSnapshots } from "@/lib/db/quotaSnapshots";
import { getComboMetrics } from "@omniroute/open-sse/services/comboMetrics.ts";
import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo.ts";
import type {
  ComboRecord,
  ComboHealthMetrics,
  ComboHealthResponse,
  QuotaSnapshotRow,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

type ModelUsageRow = {
  model: string | null;
  requests: number | null;
  totalTokens: number | null;
};

type PerformanceRow = {
  totalRequests: number | null;
  successCount: number | null;
  avgLatencyMs: number | null;
};

type QuotaSnapshotView = {
  connectionId?: string;
  remainingPercentage?: number | null;
  isExhausted?: number;
  createdAt?: string;
};

type ProviderHealth = {
  provider: string;
  remainingPct: number;
  isExhausted: boolean;
  trend: "improving" | "stable" | "declining";
};

type ResolvedComboTargetView = {
  stepId: string;
  executionKey: string;
  modelStr: string;
  provider: string;
  connectionId: string | null;
  label: string | null;
};

type RuntimeTargetMetricView = {
  requests?: number;
  successRate?: number;
  avgLatencyMs?: number;
  lastStatus?: "ok" | "error" | null;
  lastUsedAt?: string | null;
};

type HistoricalTargetAggregateRow = {
  executionKey: string | null;
  stepId: string | null;
  requests: number | null;
  successCount: number | null;
  avgLatencyMs: number | null;
  lastStatusCode: number | null;
  lastUsedAt: string | null;
};

type HistoricalTargetMetricView = {
  stepId: string | null;
  requests: number;
  successRate: number;
  avgLatencyMs: number;
  lastStatus: "ok" | "error" | null;
  lastUsedAt: string | null;
};

const RANGE_MS: Record<UtilizationTimeRange, number> = {
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

function getRangeStartIso(range: UtilizationTimeRange, now = Date.now()): string {
  return new Date(now - RANGE_MS[range]).toISOString();
}

function roundNumber(value: number, digits = 2): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(digits));
}

function toSafeNumber(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function calculateGini(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((accumulator, value) => accumulator + value, 0);
  if (sum === 0) return 0;

  let weightedSum = 0;
  for (let index = 0; index < count; index += 1) {
    weightedSum += (index + 1) * sorted[index];
  }

  return (2 * weightedSum) / (count * sum) - (count + 1) / count;
}

function buildProviderHealth(provider: string, snapshots: QuotaSnapshotRow[]): ProviderHealth {
  if (snapshots.length === 0) {
    return {
      provider,
      remainingPct: 0,
      isExhausted: false,
      trend: "stable",
    };
  }

  const histories = new Map<string, QuotaSnapshotRow[]>();
  for (const snapshot of snapshots) {
    const snapshotView = snapshot as unknown as QuotaSnapshotView;
    const connectionId = snapshotView.connectionId || "unknown";
    const existing = histories.get(connectionId) ?? [];
    existing.push(snapshot);
    histories.set(connectionId, existing);
  }

  const firstValues: number[] = [];
  const lastValues: number[] = [];
  let isExhausted = false;

  for (const history of histories.values()) {
    const ordered = [...history].sort((left, right) => {
      const leftView = left as unknown as QuotaSnapshotView;
      const rightView = right as unknown as QuotaSnapshotView;
      return (leftView.createdAt || "").localeCompare(rightView.createdAt || "");
    });
    const firstSnapshot = ordered.find((entry) => {
      const entryView = entry as unknown as QuotaSnapshotView;
      return entryView.remainingPercentage !== null && entryView.remainingPercentage !== undefined;
    });
    const lastSnapshot = [...ordered].reverse().find((entry) => {
      const entryView = entry as unknown as QuotaSnapshotView;
      return entryView.remainingPercentage !== null && entryView.remainingPercentage !== undefined;
    });
    const firstSnapshotView = firstSnapshot as unknown as QuotaSnapshotView | undefined;
    const lastSnapshotView = lastSnapshot as unknown as QuotaSnapshotView | undefined;

    if (
      firstSnapshotView?.remainingPercentage !== null &&
      firstSnapshotView?.remainingPercentage !== undefined
    ) {
      firstValues.push(firstSnapshotView.remainingPercentage);
    }

    if (
      lastSnapshotView?.remainingPercentage !== null &&
      lastSnapshotView?.remainingPercentage !== undefined
    ) {
      lastValues.push(lastSnapshotView.remainingPercentage);
    }

    const latestEntry = ordered[ordered.length - 1] as unknown as QuotaSnapshotView | undefined;
    isExhausted = isExhausted || latestEntry?.isExhausted === 1;
  }

  const firstAverage =
    firstValues.length > 0
      ? firstValues.reduce((accumulator, value) => accumulator + value, 0) / firstValues.length
      : 0;
  const lastAverage =
    lastValues.length > 0
      ? lastValues.reduce((accumulator, value) => accumulator + value, 0) / lastValues.length
      : 0;
  const delta = lastAverage - firstAverage;

  let trend: ProviderHealth["trend"] = "stable";
  if (delta >= 5) trend = "improving";
  if (delta <= -5) trend = "declining";

  return {
    provider,
    remainingPct: roundNumber(lastAverage),
    isExhausted,
    trend,
  };
}

function buildConnectionHealth(
  provider: string,
  connectionId: string,
  snapshots: QuotaSnapshotRow[]
): ProviderHealth | null {
  if (snapshots.length === 0) return null;

  const ordered = [...snapshots].sort((left, right) => {
    const leftView = left as unknown as QuotaSnapshotView;
    const rightView = right as unknown as QuotaSnapshotView;
    return (leftView.createdAt || "").localeCompare(rightView.createdAt || "");
  });
  const firstSnapshot = ordered.find((entry) => {
    const snapshotView = entry as unknown as QuotaSnapshotView;
    return (
      snapshotView.remainingPercentage !== null && snapshotView.remainingPercentage !== undefined
    );
  });
  const lastSnapshot = [...ordered].reverse().find((entry) => {
    const snapshotView = entry as unknown as QuotaSnapshotView;
    return (
      snapshotView.remainingPercentage !== null && snapshotView.remainingPercentage !== undefined
    );
  });

  const firstRemaining =
    (firstSnapshot as unknown as QuotaSnapshotView | undefined)?.remainingPercentage ?? 0;
  const lastRemaining =
    (lastSnapshot as unknown as QuotaSnapshotView | undefined)?.remainingPercentage ?? 0;
  const delta = lastRemaining - firstRemaining;

  let trend: ProviderHealth["trend"] = "stable";
  if (delta >= 5) trend = "improving";
  if (delta <= -5) trend = "declining";

  return {
    provider: `${provider}:${connectionId}`,
    remainingPct: roundNumber(lastRemaining),
    isExhausted:
      (ordered[ordered.length - 1] as unknown as QuotaSnapshotView | undefined)?.isExhausted === 1,
    trend,
  };
}

function buildUsageSkew(
  comboName: string,
  comboModels: string[],
  since: string
): ComboHealthMetrics["usageSkew"] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT
         model,
         COUNT(*) as requests,
         SUM(COALESCE(tokens_in, 0) + COALESCE(tokens_out, 0)) as totalTokens
       FROM call_logs
       WHERE combo_name = ?
         AND timestamp >= ?
       GROUP BY model`
    )
    .all(comboName, since) as ModelUsageRow[];

  const usageByModel = new Map<string, { requests: number; tokens: number }>();
  for (const model of comboModels) {
    usageByModel.set(model, { requests: 0, tokens: 0 });
  }

  for (const row of rows) {
    const model =
      typeof row.model === "string" && row.model.trim().length > 0 ? row.model : "unknown";
    usageByModel.set(model, {
      requests: toSafeNumber(row.requests),
      tokens: toSafeNumber(row.totalTokens),
    });
  }

  const modelDistributionEntries = Array.from(usageByModel.entries());
  const totalRequests = modelDistributionEntries.reduce(
    (accumulator, [, usage]) => accumulator + usage.requests,
    0
  );
  const totalTokens = modelDistributionEntries.reduce(
    (accumulator, [, usage]) => accumulator + usage.tokens,
    0
  );

  return {
    modelDistribution: modelDistributionEntries.map(([model, usage]) => ({
      model,
      requestShare: totalRequests > 0 ? roundNumber(usage.requests / totalRequests, 4) : 0,
      tokenShare: totalTokens > 0 ? roundNumber(usage.tokens / totalTokens, 4) : 0,
    })),
    giniCoefficient: roundNumber(
      calculateGini(modelDistributionEntries.map(([, usage]) => usage.requests)),
      4
    ),
  };
}

function buildPerformance(comboName: string, since: string): ComboHealthMetrics["performance"] {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT
         COUNT(*) as totalRequests,
         SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) as successCount,
         AVG(duration) as avgLatencyMs
       FROM call_logs
       WHERE combo_name = ?
         AND timestamp >= ?`
    )
    .get(comboName, since) as PerformanceRow | undefined;

  const totalRequests = toSafeNumber(row?.totalRequests);
  const successCount = toSafeNumber(row?.successCount);
  const avgLatencyMs = toSafeNumber(row?.avgLatencyMs);

  return {
    avgLatencyMs: roundNumber(avgLatencyMs),
    successRate: totalRequests > 0 ? roundNumber(successCount / totalRequests, 4) : 0,
    totalRequests,
  };
}

function buildQuotaHealth(providers: string[], since: string): ComboHealthMetrics["quotaHealth"] {
  const providerHealth = providers.map((provider) =>
    buildProviderHealth(provider, getQuotaSnapshots({ provider, since }))
  );

  const worstRemainingPct =
    providerHealth.length > 0
      ? providerHealth.reduce(
          (lowest, entry) => Math.min(lowest, entry.remainingPct),
          providerHealth[0].remainingPct
        )
      : 0;

  return {
    providers: providerHealth,
    worstRemainingPct: roundNumber(worstRemainingPct),
  };
}

function getHistoricalTargetMetrics(
  comboName: string,
  since: string
): Map<string, HistoricalTargetMetricView> {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `WITH target_logs AS (
         SELECT
           id,
           COALESCE(NULLIF(combo_execution_key, ''), NULLIF(combo_step_id, '')) AS executionKey,
           NULLIF(combo_step_id, '') AS stepId,
           status,
           duration,
           timestamp
         FROM call_logs
         WHERE combo_name = ?
           AND timestamp >= ?
           AND COALESCE(NULLIF(combo_execution_key, ''), NULLIF(combo_step_id, '')) IS NOT NULL
       ),
       aggregate_metrics AS (
         SELECT
           executionKey,
           MAX(stepId) AS stepId,
           COUNT(*) AS requests,
           SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) AS successCount,
           AVG(duration) AS avgLatencyMs,
           MAX(timestamp) AS lastUsedAt
         FROM target_logs
         GROUP BY executionKey
       ),
       latest_metrics AS (
         SELECT executionKey, stepId, status AS lastStatusCode
         FROM (
           SELECT
             executionKey,
             stepId,
             status,
             ROW_NUMBER() OVER (
               PARTITION BY executionKey
               ORDER BY timestamp DESC, id DESC
             ) AS rowRank
           FROM target_logs
         )
         WHERE rowRank = 1
       )
       SELECT
         aggregate_metrics.executionKey,
         COALESCE(latest_metrics.stepId, aggregate_metrics.stepId) AS stepId,
         aggregate_metrics.requests,
         aggregate_metrics.successCount,
         aggregate_metrics.avgLatencyMs,
         latest_metrics.lastStatusCode,
         aggregate_metrics.lastUsedAt
       FROM aggregate_metrics
       LEFT JOIN latest_metrics ON latest_metrics.executionKey = aggregate_metrics.executionKey
       ORDER BY aggregate_metrics.executionKey ASC`
    )
    .all(comboName, since) as HistoricalTargetAggregateRow[];

  const metrics = new Map<string, HistoricalTargetMetricView>();
  for (const row of rows) {
    const executionKey = toNonEmptyString(row.executionKey);
    if (!executionKey) continue;

    const requests = toSafeNumber(row.requests);
    const successCount = toSafeNumber(row.successCount);
    const statusCode = toSafeNumber(row.lastStatusCode);
    metrics.set(executionKey, {
      stepId: toNonEmptyString(row.stepId),
      requests,
      successRate: requests > 0 ? Math.round((successCount / requests) * 100) : 0,
      avgLatencyMs: Math.round(toSafeNumber(row.avgLatencyMs)),
      lastStatus: statusCode > 0 ? (statusCode < 400 ? "ok" : "error") : null,
      lastUsedAt: toNonEmptyString(row.lastUsedAt),
    });
  }

  return metrics;
}

function buildTargetHealth(
  comboName: string,
  targets: ResolvedComboTargetView[],
  since: string
): NonNullable<ComboHealthMetrics["targetHealth"]> {
  const comboMetrics = getComboMetrics(comboName);
  const historicalMetrics = getHistoricalTargetMetrics(comboName, since);

  return targets.map((target) => {
    const historicalMetric =
      historicalMetrics.get(target.executionKey) || historicalMetrics.get(target.stepId) || null;
    const runtimeMetric =
      historicalMetric === null
        ? ((comboMetrics?.byTarget?.[target.executionKey] ||
            comboMetrics?.byTarget?.[target.stepId] ||
            null) as RuntimeTargetMetricView | null)
        : null;

    let quotaRemainingPct: number | null = null;
    let quotaIsExhausted: boolean | null = null;
    let quotaTrend: "improving" | "stable" | "declining" | null = null;
    let quotaScope: "connection" | "provider" | "none" = "none";

    if (target.connectionId) {
      const connectionHealth = buildConnectionHealth(
        target.provider,
        target.connectionId,
        getQuotaSnapshots({
          provider: target.provider,
          connectionId: target.connectionId,
          since,
        })
      );
      if (connectionHealth) {
        quotaRemainingPct = connectionHealth.remainingPct;
        quotaIsExhausted = connectionHealth.isExhausted;
        quotaTrend = connectionHealth.trend;
        quotaScope = "connection";
      }
    }

    if (quotaScope === "none") {
      const providerSnapshots = getQuotaSnapshots({ provider: target.provider, since });
      const providerHealth = buildProviderHealth(target.provider, providerSnapshots);
      if (providerSnapshots.length > 0) {
        quotaRemainingPct = providerHealth.remainingPct;
        quotaIsExhausted = providerHealth.isExhausted;
        quotaTrend = providerHealth.trend;
        quotaScope = "provider";
      }
    }

    return {
      executionKey: target.executionKey,
      stepId: target.stepId,
      model: target.modelStr,
      provider: target.provider,
      connectionId: target.connectionId,
      label: target.label,
      requests: toSafeNumber(historicalMetric?.requests ?? runtimeMetric?.requests),
      successRate: toSafeNumber(historicalMetric?.successRate ?? runtimeMetric?.successRate),
      avgLatencyMs: toSafeNumber(historicalMetric?.avgLatencyMs ?? runtimeMetric?.avgLatencyMs),
      lastStatus: historicalMetric?.lastStatus ?? runtimeMetric?.lastStatus ?? null,
      lastUsedAt: historicalMetric?.lastUsedAt ?? runtimeMetric?.lastUsedAt ?? null,
      quotaRemainingPct,
      quotaIsExhausted,
      quotaTrend,
      quotaScope,
    };
  });
}

function buildComboHealth(
  combo: ComboRecord,
  since: string,
  allCombos: ComboRecord[]
): ComboHealthMetrics | null {
  const comboId = typeof combo.id === "string" ? combo.id : "";
  const comboName = typeof combo.name === "string" ? combo.name : "";
  if (!comboId || !comboName) return null;

  const targets = resolveNestedComboTargets(combo, allCombos) as ResolvedComboTargetView[];
  const models = targets.map((target) => target.modelStr);
  const providers = Array.from(new Set(targets.map((target) => target.provider)));

  return {
    comboId,
    comboName,
    strategy:
      typeof combo.strategy === "string" && combo.strategy.trim().length > 0
        ? combo.strategy
        : "priority",
    models,
    targetHealth: buildTargetHealth(comboName, targets, since),
    quotaHealth: buildQuotaHealth(providers, since),
    usageSkew: buildUsageSkew(comboName, models, since),
    performance: buildPerformance(comboName, since),
  };
}

export async function buildComboHealthResponse(opts: {
  range: UtilizationTimeRange;
  comboId?: string;
  now?: number;
  combos?: ComboRecord[];
}): Promise<ComboHealthResponse> {
  const since = getRangeStartIso(opts.range, opts.now);
  const allCombos = opts.combos ?? ((await getCombos()) as ComboRecord[]);
  let combos: ComboRecord[] = [];

  if (opts.comboId) {
    const combo =
      allCombos.find((entry) => entry.id === opts.comboId) ||
      ((await getComboById(opts.comboId)) as ComboRecord | null);
    combos = combo ? [combo] : [];
  } else {
    combos = allCombos;
  }

  return {
    timeRange: opts.range,
    combos: combos
      .map((combo) => buildComboHealth(combo, since, allCombos))
      .filter((combo): combo is ComboHealthMetrics => combo !== null),
  };
}
