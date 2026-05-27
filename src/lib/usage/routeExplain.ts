import { getComboByName } from "@/lib/db/combos";
import { buildComboScoringInspectorResponse } from "@/lib/usage/comboScoringInspector";
import { inspectTargetResilience } from "@/lib/usage/resilienceExplain";
import type {
  ComboScoringInspectorFactor,
  ComboScoringInspectorTarget,
  ResilienceExplanation,
} from "@/shared/types/utilization";
import { getCallLogById, getCallLogs } from "./callLogs";

type JsonRecord = Record<string, unknown>;

type ExplainLog = {
  id: string;
  timestamp?: string | null;
  method?: string | null;
  path?: string | null;
  status?: number | null;
  model?: string | null;
  requestedModel?: string | null;
  provider?: string | null;
  account?: string | null;
  connectionId?: string | null;
  duration?: number | null;
  tokens?: {
    in?: number | null;
    out?: number | null;
    cacheRead?: number | null;
    cacheWrite?: number | null;
    reasoning?: number | null;
    compressed?: number | null;
  };
  cacheSource?: string | null;
  requestType?: string | null;
  sourceFormat?: string | null;
  targetFormat?: string | null;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  comboName?: string | null;
  comboStepId?: string | null;
  comboExecutionKey?: string | null;
  error?: unknown;
  hasPipelineDetails?: boolean;
  detailState?: string | null;
};

type ExplanationFactor = {
  name: string;
  value: string;
  status: "positive" | "warning" | "negative" | "neutral";
  weight: number;
  contribution: number;
  details: string;
};

type ExplainTarget = {
  id: string;
  timestamp: string | null;
  status: number;
  provider: string | null;
  model: string | null;
  comboStepId: string | null;
  comboExecutionKey: string | null;
  durationMs: number;
  outcome: "selected" | "related";
  reason: string;
};

type TargetStats = {
  sampleSize: number;
  successRate: number;
  avgLatencyMs: number;
  lastStatus: "ok" | "error" | null;
  lastUsedAt: string | null;
};

type DecisionReplayAlignment =
  | "matches_recomputed_top_target"
  | "differs_from_recomputed_top_target"
  | "runtime_target_missing_from_recompute"
  | "not_combo_routed";

type DecisionReplayCandidate = {
  executionKey: string;
  stepId: string | null;
  provider: string;
  model: string;
  connectionId: string | null;
  label: string | null;
  rank: number;
  score: number;
  isRuntimeSelected: boolean;
  wouldSelectNow: boolean;
  factors: ComboScoringInspectorFactor[];
  signals: ComboScoringInspectorTarget["signals"];
};

type DecisionReplay = {
  runtime: {
    source: "call_logs";
    exact: true;
    selectedCallLogId: string;
    comboName: string | null;
    comboStepId: string | null;
    comboExecutionKey: string | null;
    provider: string | null;
    model: string | null;
    connectionId: string | null;
    status: number;
    timestamp: string | null;
    durationMs: number;
  };
  recompute: null | {
    source: "comboScoringInspector";
    method: "read_only_recompute";
    exactRuntimeReplay: false;
    asOf: string;
    timeRange: "24h";
    horizon: "7d";
    comboId: string;
    comboName: string;
    strategy: string;
    taskType: "default";
    recomputedSelectedExecutionKey: string | null;
    runtimeSelectedRank: number | null;
    runtimeSelectedScore: number | null;
    alignment: DecisionReplayAlignment;
    candidates: DecisionReplayCandidate[];
    warnings: string[];
  };
  warnings: string[];
};

export type RouteExplainabilityResponse = {
  requestId: string;
  generatedAt: string;
  routeType: "combo" | "direct";
  confidence: "high" | "medium" | "low";
  summary: string;
  comboUsed: string | null;
  providerSelected: string | null;
  modelUsed: string | null;
  score: number;
  costActual: number;
  latencyActual: number;
  decision: {
    comboUsed: string | null;
    providerSelected: string | null;
    modelUsed: string | null;
    status: number;
    score: number;
    factors: ExplanationFactor[];
    fallbacksTriggered: ExplainTarget[];
    costActual: number;
    latencyActual: number;
  };
  request: {
    id: string;
    timestamp: string | null;
    method: string | null;
    path: string | null;
    requestedModel: string | null;
    requestType: string | null;
    sourceFormat: string | null;
    targetFormat: string | null;
    cacheSource: string | null;
    apiKeyName: string | null;
  };
  selectedTarget: {
    provider: string | null;
    model: string | null;
    account: string | null;
    connectionId: string | null;
    comboStepId: string | null;
    comboExecutionKey: string | null;
    durationMs: number;
    status: number;
    tokensIn: number;
    tokensOut: number;
  };
  targetStats: TargetStats;
  fallbacksTriggered: ExplainTarget[];
  relatedTargets: ExplainTarget[];
  evidence: Array<{ label: string; value: string; tone: ExplanationFactor["status"] }>;
  recommendations: string[];
  limitations: string[];
  decisionReplay: DecisionReplay;
  resilience: ResilienceExplanation | null;
};

function asExplainLog(value: unknown): ExplainLog | null {
  if (!value || typeof value !== "object") return null;
  const record = value as JsonRecord;
  return typeof record.id === "string" ? (record as ExplainLog) : null;
}

function toNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 400;
}

function getErrorText(error: unknown): string | null {
  if (typeof error === "string" && error.trim().length > 0) return error.trim();
  if (error && typeof error === "object") {
    try {
      return JSON.stringify(error).slice(0, 240);
    } catch {
      return null;
    }
  }
  return null;
}

function calculateScore(log: ExplainLog, targetStats: TargetStats): number {
  const statusScore = isSuccessStatus(toNumber(log.status)) ? 0.4 : 0;
  const latency = toNumber(log.duration);
  const latencyScore = latency > 0 ? Math.max(0, 0.25 - Math.min(latency, 15000) / 60000) : 0.1;
  const statsScore = targetStats.sampleSize > 0 ? (targetStats.successRate / 100) * 0.25 : 0.1;
  const cacheScore = log.cacheSource === "semantic" ? 0.1 : 0.05;
  return Number(Math.min(1, statusScore + latencyScore + statsScore + cacheScore).toFixed(3));
}

function summarizeTokens(log: ExplainLog): string {
  const input = toNumber(log.tokens?.in);
  const output = toNumber(log.tokens?.out);
  const compressed = toNumber(log.tokens?.compressed);
  const parts = [`${input.toLocaleString()} in`, `${output.toLocaleString()} out`];
  if (compressed > 0) parts.push(`${compressed.toLocaleString()} compressed`);
  return parts.join(" · ");
}

function buildRelatedTarget(log: ExplainLog, selectedId: string): ExplainTarget {
  const status = toNumber(log.status);
  return {
    id: log.id,
    timestamp: log.timestamp ?? null,
    status,
    provider: log.provider ?? null,
    model: log.model ?? null,
    comboStepId: log.comboStepId ?? null,
    comboExecutionKey: log.comboExecutionKey ?? null,
    durationMs: toNumber(log.duration),
    outcome: log.id === selectedId ? "selected" : "related",
    reason:
      log.id === selectedId
        ? "Selected target for this persisted request log."
        : isSuccessStatus(status)
          ? "Nearby successful target for the same combo."
          : "Nearby failed target for the same combo; likely fallback evidence if timestamps match.",
  };
}

function buildTargetStats(selected: ExplainLog, relatedLogs: ExplainLog[]): TargetStats {
  const executionKey =
    toStringOrNull(selected.comboExecutionKey) || toStringOrNull(selected.comboStepId);
  const comparable = relatedLogs.filter((entry) => {
    const entryKey = toStringOrNull(entry.comboExecutionKey) || toStringOrNull(entry.comboStepId);
    if (executionKey) return entryKey === executionKey;
    return entry.provider === selected.provider && entry.model === selected.model;
  });

  const sample = comparable.length > 0 ? comparable : [selected];
  const successCount = sample.filter((entry) => isSuccessStatus(toNumber(entry.status))).length;
  const totalLatency = sample.reduce((sum, entry) => sum + toNumber(entry.duration), 0);
  const latest = [...sample].sort((left, right) => {
    return String(right.timestamp || "").localeCompare(String(left.timestamp || ""));
  })[0];

  return {
    sampleSize: sample.length,
    successRate: sample.length > 0 ? Math.round((successCount / sample.length) * 100) : 0,
    avgLatencyMs: sample.length > 0 ? Math.round(totalLatency / sample.length) : 0,
    lastStatus: latest ? (isSuccessStatus(toNumber(latest.status)) ? "ok" : "error") : null,
    lastUsedAt: latest?.timestamp ?? null,
  };
}

function buildFactors(log: ExplainLog, targetStats: TargetStats): ExplanationFactor[] {
  const status = toNumber(log.status);
  const factors: ExplanationFactor[] = [];

  factors.push({
    name: log.comboName ? "Combo routing" : "Direct routing",
    value: log.comboName || "Direct provider request",
    status: log.comboName ? "positive" : "neutral",
    weight: 0.25,
    contribution: log.comboName ? 0.25 : 0.15,
    details: log.comboName
      ? `Request matched combo ${log.comboName}${log.comboStepId ? ` at step ${log.comboStepId}` : ""}.`
      : "No combo metadata was persisted, so OmniRoute treated this as direct routing.",
  });

  factors.push({
    name: "Provider target",
    value: [log.provider, log.model].filter(Boolean).join(" / ") || "unknown",
    status: log.provider && log.model ? "positive" : "warning",
    weight: 0.2,
    contribution: log.provider && log.model ? 0.2 : 0.08,
    details: `Selected provider ${log.provider || "unknown"} with resolved model ${log.model || "unknown"}.`,
  });

  factors.push({
    name: "Runtime health",
    value: targetStats.sampleSize > 0 ? `${targetStats.successRate}% recent success` : "No history",
    status:
      targetStats.sampleSize === 0
        ? "neutral"
        : targetStats.successRate >= 90
          ? "positive"
          : targetStats.successRate >= 60
            ? "warning"
            : "negative",
    weight: 0.2,
    contribution: Number(((targetStats.successRate / 100) * 0.2).toFixed(3)),
    details: `${targetStats.sampleSize} comparable recent log entries, average latency ${targetStats.avgLatencyMs}ms.`,
  });

  factors.push({
    name: "Request outcome",
    value: status > 0 ? `HTTP ${status}` : "Unknown status",
    status: isSuccessStatus(status) ? "positive" : "negative",
    weight: 0.2,
    contribution: isSuccessStatus(status) ? 0.2 : 0,
    details: isSuccessStatus(status)
      ? "The selected target completed successfully."
      : getErrorText(log.error) ||
        "The selected target failed or did not return a successful status.",
  });

  factors.push({
    name: "Latency",
    value: `${toNumber(log.duration).toLocaleString()}ms`,
    status:
      toNumber(log.duration) <= 5000
        ? "positive"
        : toNumber(log.duration) <= 15000
          ? "warning"
          : "negative",
    weight: 0.1,
    contribution:
      toNumber(log.duration) <= 5000 ? 0.1 : toNumber(log.duration) <= 15000 ? 0.05 : 0.02,
    details: "Measured end-to-end duration for the persisted call log.",
  });

  factors.push({
    name: "Cache and tokens",
    value: `${log.cacheSource || "upstream"} · ${summarizeTokens(log)}`,
    status:
      log.cacheSource === "semantic" || toNumber(log.tokens?.compressed) > 0
        ? "positive"
        : "neutral",
    weight: 0.05,
    contribution:
      log.cacheSource === "semantic" || toNumber(log.tokens?.compressed) > 0 ? 0.05 : 0.025,
    details: "Shows whether OmniRoute cache or compression affected cost/latency for this route.",
  });

  return factors;
}

function buildEvidence(
  log: ExplainLog,
  targetStats: TargetStats
): RouteExplainabilityResponse["evidence"] {
  return [
    { label: "Requested model", value: log.requestedModel || "n/a", tone: "neutral" },
    {
      label: "Resolved model",
      value: log.model || "n/a",
      tone: log.model ? "positive" : "warning",
    },
    {
      label: "Provider",
      value: log.provider || "n/a",
      tone: log.provider ? "positive" : "warning",
    },
    {
      label: "Combo",
      value: log.comboName || "Direct",
      tone: log.comboName ? "positive" : "neutral",
    },
    {
      label: "Recent target success",
      value: `${targetStats.successRate}% over ${targetStats.sampleSize} samples`,
      tone:
        targetStats.successRate >= 90
          ? "positive"
          : targetStats.successRate >= 60
            ? "warning"
            : "negative",
    },
    {
      label: "Formats",
      value: `${log.sourceFormat || "unknown"} → ${log.targetFormat || "unknown"}`,
      tone: "neutral",
    },
  ];
}

function buildRecommendations(log: ExplainLog, targetStats: TargetStats): string[] {
  const recommendations: string[] = [];
  const status = toNumber(log.status);

  if (!isSuccessStatus(status)) {
    recommendations.push(
      "Inspect the provider error and consider moving this target later in the combo until it recovers."
    );
  }
  if (targetStats.sampleSize >= 3 && targetStats.successRate < 80) {
    recommendations.push(
      "Recent success rate is low; review account cooldowns, model lockouts, or provider circuit breaker state."
    );
  }
  if (toNumber(log.duration) > 15000) {
    recommendations.push(
      "Latency is high; compare this target with a faster provider in Combo Health before increasing traffic."
    );
  }
  if (!log.comboName) {
    recommendations.push(
      "Use a combo when you want fallback visibility and multi-provider route explanations."
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      "Route looks healthy. Keep monitoring target success rate and quota pressure in Combo Health."
    );
  }

  return recommendations;
}

function buildLimitations(log: ExplainLog, relatedTargets: ExplainTarget[]): string[] {
  const limitations: string[] = [];
  if (!log.hasPipelineDetails) {
    limitations.push("Detailed request pipeline payloads were not persisted for this log entry.");
  }
  if (!log.comboName) {
    limitations.push("Direct requests do not include combo fallback ordering metadata.");
  }
  if (relatedTargets.length <= 1) {
    limitations.push(
      "No shared request correlation id is available yet; fallback evidence is inferred from the persisted call log metadata."
    );
  }
  return limitations;
}

function buildDecisionReplayRuntime(log: ExplainLog): DecisionReplay["runtime"] {
  return {
    source: "call_logs",
    exact: true,
    selectedCallLogId: log.id,
    comboName: log.comboName ?? null,
    comboStepId: log.comboStepId ?? null,
    comboExecutionKey: log.comboExecutionKey ?? null,
    provider: log.provider ?? null,
    model: log.model ?? null,
    connectionId: log.connectionId ?? null,
    status: toNumber(log.status),
    timestamp: log.timestamp ?? null,
    durationMs: toNumber(log.duration),
  };
}

function comboIdFromRecord(combo: unknown): string | null {
  if (!combo || typeof combo !== "object") return null;
  const record = combo as JsonRecord;
  return toStringOrNull(record.id);
}

function targetMatchesRuntime(target: ComboScoringInspectorTarget, log: ExplainLog): boolean {
  const runtimeExecutionKey = toStringOrNull(log.comboExecutionKey);
  if (runtimeExecutionKey && target.executionKey === runtimeExecutionKey) return true;

  const runtimeStepId = toStringOrNull(log.comboStepId);
  if (runtimeStepId && target.stepId === runtimeStepId) return true;

  if (target.provider !== log.provider || target.model !== log.model) return false;
  if (target.connectionId && log.connectionId && target.connectionId !== log.connectionId) {
    return false;
  }
  return true;
}

function buildReplayCandidates(
  targets: ComboScoringInspectorTarget[],
  runtimeTarget: ComboScoringInspectorTarget | undefined
): DecisionReplayCandidate[] {
  const selectedExecutionKey = targets[0]?.executionKey ?? null;
  const limited = targets.slice(0, 10);
  if (
    runtimeTarget &&
    !limited.some((target) => target.executionKey === runtimeTarget.executionKey)
  ) {
    limited.push(runtimeTarget);
  }

  return limited.map((target) => ({
    executionKey: target.executionKey,
    stepId: target.stepId,
    provider: target.provider,
    model: target.model,
    connectionId: target.connectionId,
    label: target.label,
    rank: target.rank,
    score: target.score,
    isRuntimeSelected: runtimeTarget?.executionKey === target.executionKey,
    wouldSelectNow: selectedExecutionKey === target.executionKey,
    factors: target.factors,
    signals: target.signals,
  }));
}

function buildReplayWarnings(log: ExplainLog, comboWarnings: string[]): string[] {
  const warnings = [
    "Runtime fields are exact only for metadata persisted in the selected call log row.",
    "Read-only recompute is not a historical routing snapshot; it uses current combo, health, quota, and scoring state.",
  ];

  if (log.comboName) {
    warnings.push(
      "No shared request correlation id is available yet; fallback ordering is inferred from persisted combo log metadata."
    );
  }

  return Array.from(new Set([...warnings, ...comboWarnings]));
}

async function buildDecisionReplay(log: ExplainLog): Promise<DecisionReplay> {
  const runtime = buildDecisionReplayRuntime(log);
  const warnings = buildReplayWarnings(log, []);

  if (!log.comboName) {
    return {
      runtime,
      recompute: null,
      warnings: [...warnings, "Direct routing has no combo candidate ranking to recompute."],
    };
  }

  const combo = await getComboByName(log.comboName);
  const comboId = comboIdFromRecord(combo);
  if (!comboId) {
    return {
      runtime,
      recompute: null,
      warnings: [
        ...warnings,
        "Combo definition could not be found; runtime target is shown without recomputed candidates.",
      ],
    };
  }

  const inspector = await buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    comboId,
    taskType: "default",
  });
  const inspectorCombo = inspector.combos[0] ?? null;
  if (!inspectorCombo) {
    return {
      runtime,
      recompute: null,
      warnings: [
        ...warnings,
        "Scoring inspector returned no combo data; runtime target is shown without recomputed candidates.",
      ],
    };
  }

  const runtimeTarget = inspectorCombo.targets.find((target) => targetMatchesRuntime(target, log));
  const topTarget = inspectorCombo.targets[0] ?? null;
  const alignment: DecisionReplayAlignment = runtimeTarget
    ? topTarget?.executionKey === runtimeTarget.executionKey
      ? "matches_recomputed_top_target"
      : "differs_from_recomputed_top_target"
    : "runtime_target_missing_from_recompute";
  const recomputeWarnings = buildReplayWarnings(log, inspectorCombo.warnings);
  if (alignment === "differs_from_recomputed_top_target") {
    recomputeWarnings.push(
      "Persisted runtime target differs from the target the inspector would rank first now."
    );
  } else if (alignment === "runtime_target_missing_from_recompute") {
    recomputeWarnings.push(
      "Persisted runtime target could not be matched to current combo targets; combo configuration may have changed."
    );
  }

  return {
    runtime,
    recompute: {
      source: "comboScoringInspector",
      method: inspector.method,
      exactRuntimeReplay: false,
      asOf: inspector.asOf,
      timeRange: "24h",
      horizon: "7d",
      comboId: inspectorCombo.comboId,
      comboName: inspectorCombo.comboName,
      strategy: inspectorCombo.strategy,
      taskType: "default",
      recomputedSelectedExecutionKey: inspectorCombo.selectedExecutionKey,
      runtimeSelectedRank: runtimeTarget?.rank ?? null,
      runtimeSelectedScore: runtimeTarget?.score ?? null,
      alignment,
      candidates: buildReplayCandidates(inspectorCombo.targets, runtimeTarget),
      warnings: recomputeWarnings,
    },
    warnings: recomputeWarnings,
  };
}

async function buildSelectedResilience(log: ExplainLog): Promise<ResilienceExplanation | null> {
  if (!log.provider || !log.model) return null;
  return inspectTargetResilience({
    provider: log.provider,
    model: log.model,
    connectionId: log.connectionId ?? null,
  });
}

async function getRelatedLogs(log: ExplainLog): Promise<ExplainLog[]> {
  const selectedTime = log.timestamp ? new Date(log.timestamp).getTime() : 0;
  const windowMs = 15 * 60 * 1000;
  const filter: JsonRecord = { limit: 200 };
  if (Number.isFinite(selectedTime) && selectedTime > 0) {
    filter.since = new Date(selectedTime - windowMs).toISOString();
    filter.until = new Date(selectedTime + windowMs).toISOString();
  }
  if (log.comboName) {
    filter.combo = "1";
    filter.search = log.comboName;
  } else if (log.provider) {
    filter.provider = log.provider;
  }

  const rawLogs = await getCallLogs(filter);
  const logs = rawLogs.map(asExplainLog).filter((entry): entry is ExplainLog => entry !== null);

  return logs.filter((entry) => {
    if (entry.id === log.id) return true;
    if (log.comboName && entry.comboName !== log.comboName) return false;
    if (!log.comboName && entry.provider !== log.provider) return false;
    if (!selectedTime || !entry.timestamp) return true;
    const entryTime = new Date(entry.timestamp).getTime();
    return Number.isFinite(entryTime) && Math.abs(entryTime - selectedTime) <= windowMs;
  });
}

export async function explainRouteByRequestId(
  requestId: string
): Promise<RouteExplainabilityResponse | null> {
  const log = asExplainLog(await getCallLogById(requestId));
  if (!log) return null;

  const relatedLogs = await getRelatedLogs(log);
  const targetStats = buildTargetStats(log, relatedLogs);
  const relatedTargets = relatedLogs
    .map((entry) => buildRelatedTarget(entry, log.id))
    .sort((left, right) =>
      String(left.timestamp || "").localeCompare(String(right.timestamp || ""))
    );
  const fallbacksTriggered = relatedTargets.filter(
    (target) => target.outcome !== "selected" && target.status >= 400
  );
  const factors = buildFactors(log, targetStats);
  const score = calculateScore(log, targetStats);
  const [decisionReplay, resilience] = await Promise.all([
    buildDecisionReplay(log),
    buildSelectedResilience(log),
  ]);
  const routeType = log.comboName ? "combo" : "direct";
  const confidence = log.hasPipelineDetails
    ? "high"
    : log.comboName || relatedTargets.length > 1
      ? "medium"
      : "low";
  const summary = log.comboName
    ? `Request ${log.id} was routed through combo ${log.comboName} to ${log.provider || "unknown"}/${log.model || "unknown"}.`
    : `Request ${log.id} was routed directly to ${log.provider || "unknown"}/${log.model || "unknown"}.`;

  return {
    requestId: log.id,
    generatedAt: new Date().toISOString(),
    routeType,
    confidence,
    summary,
    comboUsed: log.comboName ?? null,
    providerSelected: log.provider ?? null,
    modelUsed: log.model ?? null,
    score,
    costActual: 0,
    latencyActual: toNumber(log.duration),
    decision: {
      comboUsed: log.comboName ?? null,
      providerSelected: log.provider ?? null,
      modelUsed: log.model ?? null,
      status: toNumber(log.status),
      score,
      factors,
      fallbacksTriggered,
      costActual: 0,
      latencyActual: toNumber(log.duration),
    },
    request: {
      id: log.id,
      timestamp: log.timestamp ?? null,
      method: log.method ?? null,
      path: log.path ?? null,
      requestedModel: log.requestedModel ?? null,
      requestType: log.requestType ?? null,
      sourceFormat: log.sourceFormat ?? null,
      targetFormat: log.targetFormat ?? null,
      cacheSource: log.cacheSource ?? null,
      apiKeyName: log.apiKeyName ?? null,
    },
    selectedTarget: {
      provider: log.provider ?? null,
      model: log.model ?? null,
      account: log.account ?? null,
      connectionId: log.connectionId ?? null,
      comboStepId: log.comboStepId ?? null,
      comboExecutionKey: log.comboExecutionKey ?? null,
      durationMs: toNumber(log.duration),
      status: toNumber(log.status),
      tokensIn: toNumber(log.tokens?.in),
      tokensOut: toNumber(log.tokens?.out),
    },
    targetStats,
    fallbacksTriggered,
    relatedTargets,
    evidence: buildEvidence(log, targetStats),
    recommendations: buildRecommendations(log, targetStats),
    limitations: buildLimitations(log, relatedTargets),
    decisionReplay,
    resilience,
  };
}
