import { buildComboHealthAutopilotReport } from "@/lib/monitoring/comboHealthAutopilot";
import { getCombos } from "@/lib/db/combos";
import { getProviderConnections } from "@/lib/db/providers";
import { buildComboForecastResponse } from "@/lib/usage/comboForecast";
import { buildComboHealthResponse } from "@/lib/usage/comboHealth";
import {
  inspectTargetResilience,
  type ProviderConnectionView,
} from "@/lib/usage/resilienceExplain";
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  type ProviderCandidate,
  type ScoringFactors,
  type ScoringWeights,
  validateWeights,
} from "@omniroute/open-sse/services/autoCombo/scoring.ts";
import { getModePack } from "@omniroute/open-sse/services/autoCombo/modePacks.ts";
import { getTaskFitness } from "@omniroute/open-sse/services/autoCombo/taskFitness.ts";
import type {
  ComboAutopilotCombo,
  ComboAutopilotReport,
  ComboForecastResponse,
  ComboForecastHorizon,
  ComboForecastRiskLevel,
  ComboForecastTarget,
  ComboHealthMetrics,
  ComboHealthResponse,
  ComboRecord,
  ComboScoringInspectorCombo,
  ComboScoringInspectorFactor,
  ComboScoringInspectorFactorKey,
  ComboScoringInspectorResponse,
  ComboScoringInspectorSource,
  ComboScoringInspectorTarget,
  ComboScoringInspectorWeightSource,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

export interface ComboScoringInspectorOptions {
  range: UtilizationTimeRange;
  horizon: ComboForecastHorizon;
  comboId?: string;
  taskType?: string;
  now?: number;
  combos?: ComboRecord[];
  healthResponse?: ComboHealthResponse;
  forecastResponse?: ComboForecastResponse;
  autopilotReport?: ComboAutopilotReport;
  skipAutopilot?: boolean;
}

type TargetHealth = NonNullable<ComboHealthMetrics["targetHealth"]>[number];

type CandidateContext = {
  target: TargetHealth;
  forecastTarget?: ComboForecastTarget;
  autopilotIssueCount: number;
  sources: Partial<Record<ComboScoringInspectorFactorKey, ComboScoringInspectorSource>>;
  notes: Partial<Record<ComboScoringInspectorFactorKey, string>>;
};

type InspectorWeights = {
  weights: ScoringWeights;
  source: ComboScoringInspectorWeightSource;
  modePack: string | null;
  warning?: string;
};

const FACTOR_KEYS: ComboScoringInspectorFactorKey[] = [
  "quota",
  "health",
  "costInv",
  "latencyInv",
  "taskFit",
  "stability",
  "tierPriority",
  "tierAffinity",
  "specificityMatch",
  "contextAffinity",
  "resetWindowAffinity",
];

function roundNumber(value: number, digits = 4): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(digits));
}

function normalizeTaskType(taskType: string | undefined): string {
  return typeof taskType === "string" && taskType.trim().length > 0 ? taskType.trim() : "default";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Resolves the auto-strategy config object a combo's weights should be read from,
 * honoring the same precedence the runtime auto-combo strategy uses: a dedicated
 * `autoConfig`, then a nested `config.auto`, then the raw `config`, then an empty
 * fallback so callers can probe optional fields without further null-checks.
 */
function resolveInspectorAutoConfig(combo: ComboRecord | undefined): Record<string, unknown> {
  if (isRecord(combo?.autoConfig)) return combo.autoConfig;
  if (isRecord(combo?.config)) {
    if (isRecord(combo.config.auto)) return combo.config.auto;
    return combo.config;
  }
  return {};
}

/** Extracts the mode-pack name referenced by the config, if any. */
function resolveModePackName(config: Record<string, unknown>): string | null {
  return typeof config.modePack === "string" ? config.modePack : null;
}

/** Resolves an explicit, validated `weights` object from the config, if present. */
function resolveExplicitWeights(config: Record<string, unknown>): ScoringWeights | undefined {
  const explicitWeights = isRecord(config.weights) ? (config.weights as ScoringWeights) : undefined;
  return explicitWeights && validateWeights(explicitWeights) ? explicitWeights : undefined;
}

function resolveInspectorWeights(combo: ComboRecord | undefined): InspectorWeights {
  const config = resolveInspectorAutoConfig(combo);

  const modePack = resolveModePackName(config);
  const resolvedModePack = modePack ? getModePack(modePack) : undefined;
  if (resolvedModePack) {
    return { weights: resolvedModePack, source: "mode_pack", modePack };
  }

  const explicitWeights = resolveExplicitWeights(config);
  if (explicitWeights) {
    return { weights: explicitWeights, source: "explicit", modePack: null };
  }

  return {
    weights: DEFAULT_WEIGHTS,
    source: "default",
    modePack: null,
    warning:
      modePack || isRecord(config.weights)
        ? "Configured auto weights are invalid or unavailable; default weights were used."
        : undefined,
  };
}

async function resolveConfiguredCombos(
  options: ComboScoringInspectorOptions
): Promise<ComboRecord[]> {
  // #7087: `options.combos`, when supplied, must always win — regardless of the
  // health/forecast/autopilot short-circuit below. The dashboard integration
  // (comboHealthDashboard.ts::buildComboHealthDashboardResponse) always calls this
  // with `combos` AND `healthResponse`/`forecastResponse`/`autopilotReport` set
  // together (it already fetched everything once upstream to avoid redundant work),
  // which used to hit the short-circuit FIRST and silently discard the caller's
  // `combos` — so `combosById`/`combosByName` (used by resolveInspectorWeights() to
  // report the combo's real configured modePack/weights) came back empty and every
  // combo's weightSource fell back to "default" through that call path.
  if (options.combos) return options.combos;
  const alreadyHaveHealthSignals =
    options.healthResponse &&
    options.forecastResponse &&
    (options.skipAutopilot || options.autopilotReport);
  if (alreadyHaveHealthSignals) return [];
  return (await getCombos()) as ComboRecord[];
}

function buildEmptyAutopilotReport(options: ComboScoringInspectorOptions): ComboAutopilotReport {
  return {
    status: "healthy",
    checkedAt: new Date(options.now ?? Date.now()).toISOString(),
    timeRange: options.range,
    horizon: options.horizon,
    summary: {
      comboCount: 0,
      healthyCount: 0,
      degradedCount: 0,
      downCount: 0,
      issueCount: 0,
      actionableCount: 0,
    },
    combos: [],
  };
}

function forecastRiskAffinity(risk: ComboForecastRiskLevel | null | undefined): number {
  switch (risk) {
    case "low":
      return 0.8;
    case "medium":
      return 0.5;
    case "high":
      return 0.2;
    case "critical":
      return 0;
    case "unknown":
    default:
      return 0.5;
  }
}

function projectedCostPer1MTokens(forecastTarget: ComboForecastTarget | undefined): number | null {
  if (!forecastTarget || forecastTarget.forecast.projectedTokens <= 0) return null;
  return (
    (forecastTarget.forecast.projectedCostUsd / forecastTarget.forecast.projectedTokens) * 1_000_000
  );
}

function quotaRemaining(target: TargetHealth, forecastTarget: ComboForecastTarget | undefined) {
  if (typeof target.quotaRemainingPct === "number") {
    return {
      value: target.quotaRemainingPct,
      source: "combo_health" as const,
      note: "Current target quota from combo health snapshots.",
    };
  }
  if (typeof forecastTarget?.quota.projectedRemainingPct === "number") {
    return {
      value: forecastTarget.quota.projectedRemainingPct,
      source: "combo_forecast" as const,
      note: "Projected quota fallback from combo forecast.",
    };
  }
  return {
    value: 100,
    source: "default" as const,
    note: "No target quota signal; optimistic default used.",
  };
}

function circuitState(provider: string): ProviderCandidate["circuitBreakerState"] {
  const state = String(getCircuitBreaker(provider).getStatus().state);
  if (state === "OPEN" || state === "HALF_OPEN") return state;
  return "CLOSED";
}

function buildCandidate(
  target: TargetHealth,
  forecastTarget: ComboForecastTarget | undefined
): { candidate: ProviderCandidate; context: CandidateContext } {
  const sources: CandidateContext["sources"] = {};
  const notes: CandidateContext["notes"] = {};
  const quota = quotaRemaining(target, forecastTarget);
  sources.quota = quota.source;
  notes.quota = quota.note;

  const cost = projectedCostPer1MTokens(forecastTarget);
  sources.costInv = cost === null ? "default" : "combo_forecast";
  notes.costInv =
    cost === null
      ? "No forecast token/cost signal; neutral cost default used."
      : "Cost per 1M tokens derived from combo forecast.";

  const latency = target.avgLatencyMs > 0 ? target.avgLatencyMs : 1_500;
  sources.latencyInv = target.avgLatencyMs > 0 ? "combo_health" : "default";
  notes.latencyInv =
    target.avgLatencyMs > 0
      ? "Latency from target health history/runtime metrics."
      : "No latency signal; 1500ms default used.";

  const successRate = target.requests > 0 ? Math.max(0, Math.min(100, target.successRate)) : 90;
  sources.stability = target.requests > 0 ? "combo_health" : "default";
  notes.stability =
    target.requests > 0
      ? "Stability proxy derived from success rate and latency."
      : "No target request history; neutral stability default used.";
  sources.health = "runtime";
  notes.health = "Provider circuit breaker state at inspection time.";
  sources.taskFit = "default";
  notes.taskFit = "Static model/task fitness heuristic.";
  sources.tierPriority = "default";
  notes.tierPriority = "Account tier not available in combo health; standard tier assumed.";
  sources.tierAffinity = "default";
  sources.specificityMatch = "default";
  sources.contextAffinity = "default";
  notes.contextAffinity = "Read-only inspector is not session-bound; neutral affinity used.";
  sources.resetWindowAffinity = forecastTarget ? "combo_forecast" : "default";
  notes.resetWindowAffinity = forecastTarget
    ? "Reset-window affinity proxied from forecast quota risk."
    : "No forecast risk for this target; neutral reset affinity used.";

  return {
    candidate: {
      provider: target.provider,
      model: target.model,
      quotaRemaining: quota.value,
      quotaTotal: 100,
      circuitBreakerState: circuitState(target.provider),
      costPer1MTokens: cost ?? 1,
      p95LatencyMs: Math.max(1, latency),
      latencyStdDev: Math.max(10, latency * (1 - successRate / 100) + 10),
      errorRate: 1 - successRate / 100,
      accountTier: "standard",
      contextAffinity: 0.5,
      resetWindowAffinity: forecastRiskAffinity(forecastTarget?.quota.risk),
    },
    context: {
      target,
      forecastTarget,
      autopilotIssueCount: 0,
      sources,
      notes,
    },
  };
}

function factorBreakdown(
  factors: ScoringFactors,
  weights: ScoringWeights,
  context: CandidateContext
): ComboScoringInspectorFactor[] {
  return FACTOR_KEYS.map((key) => ({
    key,
    value: roundNumber(factors[key]),
    weight: roundNumber(weights[key]),
    contribution: roundNumber(factors[key] * weights[key]),
    source: context.sources[key] ?? "default",
    note: context.notes[key],
  })).sort((left, right) => Math.abs(right.contribution) - Math.abs(left.contribution));
}

function targetForecastMap(targets: ComboForecastTarget[]): Map<string, ComboForecastTarget> {
  const map = new Map<string, ComboForecastTarget>();
  for (const target of targets) {
    map.set(target.executionKey, target);
    if (target.stepId) map.set(target.stepId, target);
  }
  return map;
}

function autopilotIssueCounts(combo: ComboAutopilotCombo | undefined): Map<string, number> {
  const counts = new Map<string, number>();
  if (!combo) return counts;
  for (const issue of combo.issues) {
    const key = issue.target.executionKey;
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

async function buildInspectorCombo(
  combo: ComboHealthMetrics,
  forecastTargets: Map<string, ComboForecastTarget>,
  autopilotCombo: ComboAutopilotCombo | undefined,
  taskType: string,
  inspectorWeights: InspectorWeights
): Promise<ComboScoringInspectorCombo> {
  const warnings: string[] = [];
  const { weights } = inspectorWeights;
  if (inspectorWeights.warning) warnings.push(inspectorWeights.warning);
  const targets = combo.targetHealth ?? [];
  if (combo.strategy !== "auto") {
    warnings.push(
      "Combo strategy is not auto; this is an explanatory recompute, not the runtime strategy."
    );
  }
  if (targets.length === 0) {
    warnings.push("Combo has no inspectable execution targets.");
  }

  const issueCounts = autopilotIssueCounts(autopilotCombo);
  const contexts = targets.map((target) =>
    buildCandidate(
      target,
      forecastTargets.get(target.executionKey) || forecastTargets.get(target.stepId)
    )
  );
  const pool = contexts.map((entry) => entry.candidate);

  const scored = contexts
    .map((entry) => {
      const factors = calculateFactors(entry.candidate, pool, taskType, getTaskFitness);
      const score = calculateScore(factors, weights);
      const issueCount = issueCounts.get(entry.context.target.executionKey) ?? 0;
      entry.context.autopilotIssueCount = issueCount;
      return { entry, factors, score };
    })
    .sort((left, right) => right.score - left.score);

  const connectionsByProvider = new Map<string, ProviderConnectionView[]>();
  await Promise.allSettled(
    [...new Set(scored.map((item) => item.entry.context.target.provider).filter(Boolean))].map(
      async (provider) => {
        try {
          connectionsByProvider.set(
            provider,
            (await getProviderConnections({ provider, isActive: true })) as ProviderConnectionView[]
          );
        } catch {
          warnings.push(
            `Provider connection prefetch failed for ${provider}; resilience details will use fallback inspection.`
          );
        }
      }
    )
  );

  const inspectorTargets: ComboScoringInspectorTarget[] = await Promise.all(
    scored.map(async (item, index) => {
      const target = item.entry.context.target;
      const resilience = await inspectTargetResilience({
        provider: target.provider,
        model: target.model,
        connectionId: target.connectionId,
        providerConnections: connectionsByProvider.get(target.provider),
      });
      return {
        executionKey: target.executionKey,
        stepId: target.stepId,
        provider: target.provider,
        model: target.model,
        connectionId: target.connectionId,
        label: target.label,
        rank: index + 1,
        score: roundNumber(item.score),
        factors: factorBreakdown(item.factors, weights, item.entry.context),
        signals: {
          quotaRemainingPct: target.quotaRemainingPct,
          projectedQuotaRemainingPct:
            item.entry.context.forecastTarget?.quota.projectedRemainingPct ?? null,
          successRate: target.requests > 0 ? target.successRate : null,
          avgLatencyMs: target.avgLatencyMs > 0 ? target.avgLatencyMs : null,
          forecastRisk: item.entry.context.forecastTarget?.quota.risk ?? null,
          autopilotIssueCount: item.entry.context.autopilotIssueCount,
          resilience,
        },
      };
    })
  );

  return {
    comboId: combo.comboId,
    comboName: combo.comboName,
    strategy: combo.strategy,
    taskType,
    weights: weights as Record<ComboScoringInspectorFactorKey, number>,
    weightSource: inspectorWeights.source,
    modePack: inspectorWeights.modePack,
    selectedExecutionKey: inspectorTargets[0]?.executionKey ?? null,
    targets: inspectorTargets,
    warnings,
  };
}

export async function buildComboScoringInspectorResponse(
  options: ComboScoringInspectorOptions
): Promise<ComboScoringInspectorResponse> {
  const taskType = normalizeTaskType(options.taskType);
  const configuredCombos = await resolveConfiguredCombos(options);
  const [health, forecast] = await Promise.all([
    options.healthResponse ??
      buildComboHealthResponse({
        range: options.range,
        comboId: options.comboId,
        now: options.now,
        combos: configuredCombos,
      }),
    options.forecastResponse ??
      buildComboForecastResponse({
        range: options.range,
        horizon: options.horizon,
        comboId: options.comboId,
        now: options.now,
        combos: configuredCombos,
      }),
  ]);
  const autopilot =
    options.autopilotReport ??
    (options.skipAutopilot
      ? buildEmptyAutopilotReport(options)
      : await buildComboHealthAutopilotReport({
          range: options.range,
          horizon: options.horizon,
          comboId: options.comboId,
          includeHealthy: true,
          includeActions: false,
          now: options.now,
          combos: configuredCombos,
          healthResponse: health,
          forecastResponse: forecast,
        }));

  const forecastByComboId = new Map(forecast.combos.map((combo) => [combo.comboId, combo]));
  const autopilotByComboId = new Map(autopilot.combos.map((combo) => [combo.comboId, combo]));
  const combosById = new Map(
    configuredCombos.flatMap((combo) => (combo.id ? [[combo.id, combo]] : []))
  );
  const combosByName = new Map(
    configuredCombos.flatMap((combo) => (combo.name ? [[combo.name, combo]] : []))
  );

  return {
    asOf: new Date(options.now ?? Date.now()).toISOString(),
    timeRange: options.range,
    horizon: options.horizon,
    method: "read_only_recompute",
    combos: await Promise.all(
      health.combos.map((combo) =>
        buildInspectorCombo(
          combo,
          targetForecastMap(forecastByComboId.get(combo.comboId)?.targets ?? []),
          autopilotByComboId.get(combo.comboId),
          taskType,
          resolveInspectorWeights(
            combosById.get(combo.comboId) ?? combosByName.get(combo.comboName)
          )
        )
      )
    ),
  };
}
