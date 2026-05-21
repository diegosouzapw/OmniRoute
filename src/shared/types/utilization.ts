export interface QuotaSnapshotRow {
  id: number;
  provider: string;
  connection_id: string;
  window_key: string;
  remaining_percentage: number | null;
  is_exhausted: number;
  next_reset_at: string | null;
  window_duration_ms: number | null;
  raw_data: string | null;
  created_at: string;
}

export interface ProviderUtilizationPoint {
  timestamp: string;
  provider: string;
  remainingPct: number;
  isExhausted: boolean;
  windowKey: string;
}

export interface ProviderUtilizationResponse {
  timeRange: "1h" | "24h" | "7d" | "30d";
  bucketSizeMinutes: number;
  providers: string[];
  data: ProviderUtilizationPoint[];
}

export interface ComboHealthMetrics {
  comboId: string;
  comboName: string;
  strategy: string;
  models: string[];
  targetHealth?: Array<{
    executionKey: string;
    stepId: string;
    model: string;
    provider: string;
    connectionId: string | null;
    label: string | null;
    requests: number;
    successRate: number;
    avgLatencyMs: number;
    lastStatus: "ok" | "error" | null;
    lastUsedAt: string | null;
    quotaRemainingPct: number | null;
    quotaIsExhausted: boolean | null;
    quotaTrend: "improving" | "stable" | "declining" | null;
    quotaScope: "connection" | "provider" | "none";
  }>;
  quotaHealth: {
    providers: Array<{
      provider: string;
      remainingPct: number;
      isExhausted: boolean;
      trend: "improving" | "stable" | "declining";
    }>;
    worstRemainingPct: number;
  };
  usageSkew: {
    modelDistribution: Array<{
      model: string;
      requestShare: number;
      tokenShare: number;
    }>;
    giniCoefficient: number;
  };
  performance: {
    avgLatencyMs: number;
    successRate: number;
    totalRequests: number;
  };
}

export interface ComboHealthResponse {
  timeRange: "1h" | "24h" | "7d" | "30d";
  combos: ComboHealthMetrics[];
}

export interface ComboRecord {
  id?: string;
  name?: string;
  strategy?: string;
  models?: unknown[];
}

export type UtilizationTimeRange = "1h" | "24h" | "7d" | "30d";

export type ComboForecastHorizon = "24h" | "7d" | "30d";
export type ComboForecastConfidence = "high" | "medium" | "low" | "no_data";
export type ComboForecastRiskLevel = "low" | "medium" | "high" | "critical" | "unknown";

export interface ComboForecastHistorySummary {
  requests: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
  costUsd: number;
  avgDailyCostUsd: number;
}

export interface ComboForecastProjection {
  projectedRequests: number;
  projectedTokens: number;
  projectedCostUsd: number;
}

export interface ComboForecastQuotaRisk {
  level: ComboForecastRiskLevel;
  projectedWorstRemainingPct: number | null;
  timeToExhaustDays: number | null;
  worstTargetExecutionKey: string | null;
}

export interface ComboForecastTarget {
  executionKey: string;
  stepId: string | null;
  provider: string;
  model: string;
  connectionId: string | null;
  label: string | null;
  trafficShare: number;
  history: {
    requests: number;
    costUsd: number;
    totalTokens: number;
  };
  forecast: {
    projectedRequests: number;
    projectedCostUsd: number;
    projectedTokens: number;
  };
  quota: {
    scope: "connection" | "provider" | "none";
    remainingPct: number | null;
    depletionPctPerDay: number | null;
    projectedRemainingPct: number | null;
    timeToExhaustDays: number | null;
    risk: ComboForecastRiskLevel;
  };
}

export interface ComboForecastMetrics {
  comboId: string;
  comboName: string;
  strategy: string;
  confidence: ComboForecastConfidence;
  history: ComboForecastHistorySummary;
  forecast: ComboForecastProjection;
  quotaRisk: ComboForecastQuotaRisk;
  targets: ComboForecastTarget[];
  dataQuality: {
    pricingCoveragePct: number;
    quotaCoverage: "connection" | "provider" | "partial" | "none";
    notes: string[];
  };
}

export interface ComboForecastResponse {
  timeRange: UtilizationTimeRange;
  horizon: ComboForecastHorizon;
  asOf: string;
  method: "linear_history";
  combos: ComboForecastMetrics[];
}

export type ComboAutopilotSeverity = "info" | "warning" | "critical";
export type ComboAutopilotStatus = "healthy" | "warning" | "critical";
export type ComboAutopilotState = "healthy" | "degraded" | "down";

export type ComboAutopilotIssueKind =
  | "combo_no_targets"
  | "combo_no_recent_traffic"
  | "combo_low_success_rate"
  | "target_low_success_rate"
  | "target_last_error"
  | "target_quota_exhausted"
  | "target_low_quota"
  | "forecast_quota_risk"
  | "usage_skew_high"
  | "provider_health_issue"
  | "data_quality_gap";

export type ComboAutopilotActionType =
  | "open_combo_editor"
  | "run_combo_test"
  | "open_provider_health_autopilot"
  | "review_quota_limits"
  | "review_pricing";

export interface ComboAutopilotTargetRef {
  comboId: string;
  comboName: string;
  provider?: string;
  connectionId?: string | null;
  executionKey?: string;
  model?: string;
}

export interface ComboAutopilotAction {
  type: ComboAutopilotActionType;
  mode: "manual";
  label: string;
  href?: string;
  target: ComboAutopilotTargetRef;
}

export interface ComboAutopilotIssue {
  id: string;
  severity: ComboAutopilotSeverity;
  kind: ComboAutopilotIssueKind;
  title: string;
  recommendation: string;
  evidence: Record<string, unknown>;
  target: ComboAutopilotTargetRef;
  actions: ComboAutopilotAction[];
}

export interface ComboAutopilotCombo {
  comboId: string;
  comboName: string;
  strategy: string;
  state: ComboAutopilotState;
  score: number;
  signals: {
    totalRequests: number;
    successRate: number;
    avgLatencyMs: number;
    worstQuotaRemainingPct: number | null;
    forecastRisk: ComboForecastRiskLevel;
    forecastConfidence: ComboForecastConfidence;
    usageSkew: number;
    targetCount: number;
    providerIssueCount: number;
    dataQualityNotes: string[];
  };
  issues: ComboAutopilotIssue[];
}

export interface ComboAutopilotReport {
  status: ComboAutopilotStatus;
  checkedAt: string;
  timeRange: UtilizationTimeRange;
  horizon: ComboForecastHorizon;
  summary: {
    comboCount: number;
    healthyCount: number;
    degradedCount: number;
    downCount: number;
    issueCount: number;
    actionableCount: number;
  };
  combos: ComboAutopilotCombo[];
}

export type ComboScoringInspectorFactorKey =
  | "quota"
  | "health"
  | "costInv"
  | "latencyInv"
  | "taskFit"
  | "stability"
  | "tierPriority"
  | "tierAffinity"
  | "specificityMatch"
  | "contextAffinity"
  | "resetWindowAffinity";

export type ComboScoringInspectorSource =
  | "combo_health"
  | "combo_forecast"
  | "combo_autopilot"
  | "runtime"
  | "default";

export interface ComboScoringInspectorFactor {
  key: ComboScoringInspectorFactorKey;
  value: number;
  weight: number;
  contribution: number;
  source: ComboScoringInspectorSource;
  note?: string;
}

export interface ComboScoringInspectorTarget {
  executionKey: string;
  stepId: string | null;
  provider: string;
  model: string;
  connectionId: string | null;
  label: string | null;
  rank: number;
  score: number;
  factors: ComboScoringInspectorFactor[];
  signals: {
    quotaRemainingPct: number | null;
    projectedQuotaRemainingPct: number | null;
    successRate: number | null;
    avgLatencyMs: number | null;
    forecastRisk: ComboForecastRiskLevel | null;
    autopilotIssueCount: number;
  };
}

export interface ComboScoringInspectorCombo {
  comboId: string;
  comboName: string;
  strategy: string;
  taskType: string;
  weights: Record<ComboScoringInspectorFactorKey, number>;
  selectedExecutionKey: string | null;
  targets: ComboScoringInspectorTarget[];
  warnings: string[];
}

export interface ComboScoringInspectorResponse {
  asOf: string;
  timeRange: UtilizationTimeRange;
  horizon: ComboForecastHorizon;
  method: "read_only_recompute";
  combos: ComboScoringInspectorCombo[];
}

export interface ComboHealthDashboardResponse {
  health: ComboHealthResponse;
  forecast: ComboForecastResponse | null;
  autopilot: ComboAutopilotReport | null;
  scoring: ComboScoringInspectorResponse | null;
  errors: Partial<Record<"forecast" | "autopilot" | "scoring", string>>;
}

export const BUCKET_SIZES: Record<UtilizationTimeRange, number> = {
  "1h": 1,
  "24h": 10,
  "7d": 60,
  "30d": 360,
};
