import { getComboForecastUsageRows, type ComboForecastUsageRow } from "@/lib/db/comboForecast";
import { getCombos, getComboById } from "@/lib/db/combos";
import { getPricingForModel } from "@/lib/db/settings";
import { getQuotaSnapshots } from "@/lib/db/quotaSnapshots";
import { computeCostFromPricing, normalizeModelName } from "@/lib/usage/costCalculator";
import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo.ts";
import type {
  ComboRecord,
  ComboForecastHorizon,
  ComboForecastMetrics,
  ComboForecastQuotaRisk,
  ComboForecastResponse,
  ComboForecastRiskLevel,
  ComboForecastTarget,
  QuotaSnapshotRow,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

type JsonRecord = Record<string, unknown>;

type ResolvedComboTargetView = {
  stepId: string;
  executionKey: string;
  modelStr: string;
  provider: string;
  connectionId: string | null;
  label: string | null;
};

type CostedUsageRow = ComboForecastUsageRow & {
  costUsd: number;
  pricingCovered: boolean;
};

type QuotaSnapshotView = {
  connectionId?: string;
  remainingPercentage?: number | null;
  isExhausted?: number;
  createdAt?: string;
};

const RANGE_MS: Record<UtilizationTimeRange, number> = {
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

const HORIZON_MS: Record<ComboForecastHorizon, number> = {
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function roundNumber(value: number, digits = 2): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(digits));
}

function getRangeStartIso(range: UtilizationTimeRange, now = Date.now()): string {
  return new Date(now - RANGE_MS[range]).toISOString();
}

function daysFromMs(ms: number): number {
  return ms / (24 * 60 * 60 * 1000);
}

function modelWithoutProvider(model: string): string {
  return normalizeModelName(model || "");
}

async function resolvePricing(provider: string, model: string): Promise<JsonRecord | null> {
  const exact = await getPricingForModel(provider, model);
  if (exact) return toRecord(exact);
  const normalized = modelWithoutProvider(model);
  if (normalized && normalized !== model) {
    const fallback = await getPricingForModel(provider, normalized);
    if (fallback) return toRecord(fallback);
  }
  return null;
}

async function attachCosts(rows: ComboForecastUsageRow[]): Promise<CostedUsageRow[]> {
  const pricingCache = new Map<string, JsonRecord | null>();

  const getPricing = async (provider: string, model: string) => {
    const cacheKey = `${provider}\n${model}`;
    if (!pricingCache.has(cacheKey)) {
      pricingCache.set(cacheKey, await resolvePricing(provider, model));
    }
    return pricingCache.get(cacheKey) ?? null;
  };

  const costed: CostedUsageRow[] = [];
  for (const row of rows) {
    const pricing = await getPricing(row.provider, row.model);
    const costUsd = computeCostFromPricing(
      pricing,
      {
        input: row.inputTokens,
        output: row.outputTokens,
        cacheRead: row.cacheReadTokens,
        cacheCreation: row.cacheCreationTokens,
        reasoning: row.reasoningTokens,
      },
      { provider: row.provider, model: row.model, serviceTier: "standard" }
    );
    costed.push({ ...row, costUsd, pricingCovered: Boolean(pricing) });
  }
  return costed;
}

function latestRemaining(snapshot: QuotaSnapshotRow): number | null {
  const view = snapshot as unknown as QuotaSnapshotView;
  return typeof view.remainingPercentage === "number" ? view.remainingPercentage : null;
}

function snapshotTime(snapshot: QuotaSnapshotRow): string {
  return String((snapshot as unknown as QuotaSnapshotView).createdAt ?? "");
}

function buildQuotaForecast(
  snapshots: QuotaSnapshotRow[],
  rangeDays: number,
  horizonDays: number
): ComboForecastTarget["quota"] {
  if (snapshots.length === 0) {
    return {
      scope: "none",
      remainingPct: null,
      depletionPctPerDay: null,
      projectedRemainingPct: null,
      timeToExhaustDays: null,
      risk: "unknown",
    };
  }

  const ordered = [...snapshots].sort((left, right) =>
    snapshotTime(left).localeCompare(snapshotTime(right))
  );
  const first = ordered.find((entry) => latestRemaining(entry) !== null);
  const last = [...ordered].reverse().find((entry) => latestRemaining(entry) !== null);
  const firstRemaining = first ? latestRemaining(first) : null;
  const lastRemaining = last ? latestRemaining(last) : null;
  const latest = ordered[ordered.length - 1] as unknown as QuotaSnapshotView | undefined;
  const exhausted = latest?.isExhausted === 1;

  if (lastRemaining === null) {
    return {
      scope: "provider",
      remainingPct: null,
      depletionPctPerDay: null,
      projectedRemainingPct: null,
      timeToExhaustDays: null,
      risk: exhausted ? "critical" : "unknown",
    };
  }

  const rawDepletion = firstRemaining === null ? 0 : (firstRemaining - lastRemaining) / rangeDays;
  const depletionPctPerDay = Math.max(0, rawDepletion);
  const projectedRemainingPct = Math.max(0, lastRemaining - depletionPctPerDay * horizonDays);
  const timeToExhaustDays = depletionPctPerDay > 0 ? lastRemaining / depletionPctPerDay : null;

  let risk: ComboForecastRiskLevel = "low";
  if (exhausted || projectedRemainingPct <= 0) risk = "critical";
  else if (
    (timeToExhaustDays !== null && timeToExhaustDays <= horizonDays) ||
    projectedRemainingPct < 10
  ) {
    risk = "high";
  } else if (projectedRemainingPct < 25 || depletionPctPerDay >= 5) {
    risk = "medium";
  }

  return {
    scope: "provider",
    remainingPct: roundNumber(lastRemaining, 1),
    depletionPctPerDay: roundNumber(depletionPctPerDay, 2),
    projectedRemainingPct: roundNumber(projectedRemainingPct, 1),
    timeToExhaustDays: timeToExhaustDays === null ? null : roundNumber(timeToExhaustDays, 1),
    risk,
  };
}

function rankRisk(level: ComboForecastRiskLevel): number {
  return { critical: 4, high: 3, medium: 2, low: 1, unknown: 0 }[level];
}

function getConfidence(
  requests: number,
  pricingCoveragePct: number
): ComboForecastMetrics["confidence"] {
  if (requests <= 0) return "no_data";
  if (requests >= 100 && pricingCoveragePct >= 80) return "high";
  if (requests >= 20 && pricingCoveragePct >= 50) return "medium";
  return "low";
}

function summarizeQuotaRisk(targets: ComboForecastTarget[]): ComboForecastQuotaRisk {
  const knownTargets = targets.filter((target) => target.quota.risk !== "unknown");
  if (knownTargets.length === 0) {
    return {
      level: "unknown",
      projectedWorstRemainingPct: null,
      timeToExhaustDays: null,
      worstTargetExecutionKey: null,
    };
  }

  const worst = knownTargets.reduce((currentWorst, target) => {
    const currentRank = rankRisk(currentWorst.quota.risk);
    const nextRank = rankRisk(target.quota.risk);
    if (nextRank !== currentRank) return nextRank > currentRank ? target : currentWorst;
    const currentRemaining = currentWorst.quota.projectedRemainingPct ?? 101;
    const nextRemaining = target.quota.projectedRemainingPct ?? 101;
    return nextRemaining < currentRemaining ? target : currentWorst;
  }, knownTargets[0]);

  return {
    level: worst.quota.risk,
    projectedWorstRemainingPct: worst.quota.projectedRemainingPct,
    timeToExhaustDays: worst.quota.timeToExhaustDays,
    worstTargetExecutionKey: worst.executionKey,
  };
}

function quotaCoverage(
  targets: ComboForecastTarget[]
): ComboForecastMetrics["dataQuality"]["quotaCoverage"] {
  if (targets.length === 0) return "none";
  const withConnection = targets.filter((target) => target.quota.scope === "connection").length;
  const withProvider = targets.filter((target) => target.quota.scope === "provider").length;
  const covered = withConnection + withProvider;
  if (covered === 0) return "none";
  if (withConnection === targets.length) return "connection";
  if (withProvider === targets.length) return "provider";
  return "partial";
}

function groupRowsByExecutionKey(rows: CostedUsageRow[]): Map<string, CostedUsageRow[]> {
  const grouped = new Map<string, CostedUsageRow[]>();
  for (const row of rows) {
    const key = row.executionKey || row.stepId || `${row.provider}/${row.model}`;
    const bucket = grouped.get(key) ?? [];
    bucket.push(row);
    grouped.set(key, bucket);
  }
  return grouped;
}

async function buildComboForecast(
  combo: ComboRecord,
  allCombos: ComboRecord[],
  rows: CostedUsageRow[],
  rangeDays: number,
  horizonDays: number,
  projectionFactor: number,
  since: string
): Promise<ComboForecastMetrics | null> {
  const comboId = typeof combo.id === "string" ? combo.id : "";
  const comboName = typeof combo.name === "string" ? combo.name : "";
  if (!comboId || !comboName) return null;

  const targets = resolveNestedComboTargets(combo, allCombos) as ResolvedComboTargetView[];
  const rowsByTarget = groupRowsByExecutionKey(rows);
  const totalRequests = rows.reduce((sum, row) => sum + row.requests, 0);
  const totalCostUsd = rows.reduce((sum, row) => sum + row.costUsd, 0);
  const totalTokens = rows.reduce((sum, row) => sum + row.totalTokens, 0);
  const pricedRequests = rows.reduce(
    (sum, row) => sum + (row.pricingCovered ? row.requests : 0),
    0
  );
  const pricingCoveragePct = totalRequests > 0 ? (pricedRequests / totalRequests) * 100 : 0;

  const targetForecasts: ComboForecastTarget[] = [];
  for (const target of targets) {
    const targetRows =
      rowsByTarget.get(target.executionKey) || rowsByTarget.get(target.stepId) || [];
    const targetRequests = targetRows.reduce((sum, row) => sum + row.requests, 0);
    const targetCost = targetRows.reduce((sum, row) => sum + row.costUsd, 0);
    const targetTokens = targetRows.reduce((sum, row) => sum + row.totalTokens, 0);

    let quotaSnapshots: QuotaSnapshotRow[] = [];
    let scope: ComboForecastTarget["quota"]["scope"] = "none";
    if (target.connectionId) {
      quotaSnapshots = getQuotaSnapshots({
        provider: target.provider,
        connectionId: target.connectionId,
        since,
      });
      if (quotaSnapshots.length > 0) scope = "connection";
    }
    if (quotaSnapshots.length === 0) {
      quotaSnapshots = getQuotaSnapshots({ provider: target.provider, since });
      if (quotaSnapshots.length > 0) scope = "provider";
    }
    const quota = buildQuotaForecast(quotaSnapshots, rangeDays, horizonDays);
    quota.scope = scope;

    targetForecasts.push({
      executionKey: target.executionKey,
      stepId: target.stepId,
      provider: target.provider,
      model: target.modelStr,
      connectionId: target.connectionId,
      label: target.label,
      trafficShare: totalRequests > 0 ? roundNumber(targetRequests / totalRequests, 4) : 0,
      history: {
        requests: targetRequests,
        costUsd: roundNumber(targetCost, 6),
        totalTokens: targetTokens,
      },
      forecast: {
        projectedRequests: Math.round(targetRequests * projectionFactor),
        projectedCostUsd: roundNumber(targetCost * projectionFactor, 6),
        projectedTokens: Math.round(targetTokens * projectionFactor),
      },
      quota,
    });
  }

  const notes: string[] = [];
  if (totalRequests === 0) {
    notes.push("No historical combo traffic in the selected range; forecast is unavailable.");
  }
  if (pricingCoveragePct < 100 && totalRequests > 0) {
    notes.push("Some target models have no pricing data; cost forecast may be underreported.");
  }
  notes.push("Call logs do not include service tier; standard pricing is assumed.");

  return {
    comboId,
    comboName,
    strategy:
      typeof combo.strategy === "string" && combo.strategy.trim().length > 0
        ? combo.strategy
        : "priority",
    confidence: getConfidence(totalRequests, pricingCoveragePct),
    history: {
      requests: totalRequests,
      inputTokens: rows.reduce((sum, row) => sum + row.inputTokens, 0),
      outputTokens: rows.reduce((sum, row) => sum + row.outputTokens, 0),
      cacheReadTokens: rows.reduce((sum, row) => sum + row.cacheReadTokens, 0),
      cacheCreationTokens: rows.reduce((sum, row) => sum + row.cacheCreationTokens, 0),
      reasoningTokens: rows.reduce((sum, row) => sum + row.reasoningTokens, 0),
      totalTokens,
      costUsd: roundNumber(totalCostUsd, 6),
      avgDailyCostUsd: roundNumber(totalCostUsd / rangeDays, 6),
    },
    forecast: {
      projectedRequests: Math.round(totalRequests * projectionFactor),
      projectedTokens: Math.round(totalTokens * projectionFactor),
      projectedCostUsd: roundNumber(totalCostUsd * projectionFactor, 6),
    },
    quotaRisk: summarizeQuotaRisk(targetForecasts),
    targets: targetForecasts,
    dataQuality: {
      pricingCoveragePct: roundNumber(pricingCoveragePct, 1),
      quotaCoverage: quotaCoverage(targetForecasts),
      notes,
    },
  };
}

export async function buildComboForecastResponse(opts: {
  range: UtilizationTimeRange;
  horizon: ComboForecastHorizon;
  comboId?: string;
  now?: number;
  combos?: ComboRecord[];
}): Promise<ComboForecastResponse> {
  const now = opts.now ?? Date.now();
  const since = getRangeStartIso(opts.range, now);
  const allCombos = opts.combos ?? ((await getCombos()) as ComboRecord[]);
  const rangeDays = daysFromMs(RANGE_MS[opts.range]);
  const horizonDays = daysFromMs(HORIZON_MS[opts.horizon]);
  const projectionFactor = HORIZON_MS[opts.horizon] / RANGE_MS[opts.range];

  let combos: ComboRecord[] = [];
  if (opts.comboId) {
    const combo =
      allCombos.find((entry) => entry.id === opts.comboId) ||
      ((await getComboById(opts.comboId)) as ComboRecord | null);
    combos = combo ? [combo] : [];
  } else {
    combos = allCombos;
  }

  if (combos.length === 0) {
    return {
      timeRange: opts.range,
      horizon: opts.horizon,
      asOf: new Date(now).toISOString(),
      method: "linear_history",
      combos: [],
    };
  }

  const comboNames = new Set(
    combos
      .map((combo) => (typeof combo.name === "string" ? combo.name : null))
      .filter((name): name is string => Boolean(name))
  );
  const onlyComboName = comboNames.size === 1 ? Array.from(comboNames)[0] : undefined;
  const usageRows = await attachCosts(
    getComboForecastUsageRows({ since, comboName: onlyComboName })
  );
  const rowsByCombo = new Map<string, CostedUsageRow[]>();
  for (const row of usageRows) {
    if (!comboNames.has(row.comboName)) continue;
    const bucket = rowsByCombo.get(row.comboName) ?? [];
    bucket.push(row);
    rowsByCombo.set(row.comboName, bucket);
  }

  const forecasts = await Promise.all(
    combos.map((combo) =>
      buildComboForecast(
        combo,
        allCombos,
        rowsByCombo.get(String(combo.name)) ?? [],
        rangeDays,
        horizonDays,
        projectionFactor,
        since
      )
    )
  );

  return {
    timeRange: opts.range,
    horizon: opts.horizon,
    asOf: new Date(now).toISOString(),
    method: "linear_history",
    combos: forecasts.filter((entry): entry is ComboForecastMetrics => entry !== null),
  };
}
