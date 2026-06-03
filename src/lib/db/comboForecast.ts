import { getDbInstance } from "./core";

export type ComboForecastUsageRow = {
  comboName: string;
  executionKey: string | null;
  stepId: string | null;
  provider: string;
  model: string;
  requestedModel: string | null;
  connectionId: string | null;
  requests: number;
  successCount: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
  avgLatencyMs: number;
  lastUsedAt: string | null;
};

type ComboForecastUsageSqlRow = {
  comboName: string | null;
  executionKey: string | null;
  stepId: string | null;
  provider: string | null;
  model: string | null;
  requestedModel: string | null;
  connectionId: string | null;
  requests: number | null;
  successCount: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cacheReadTokens: number | null;
  cacheCreationTokens: number | null;
  reasoningTokens: number | null;
  totalTokens: number | null;
  avgLatencyMs: number | null;
  lastUsedAt: string | null;
};

function toNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toString(value: unknown, fallback = "unknown"): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

export function getComboForecastUsageRows(opts: {
  since: string;
  until?: string;
  comboName?: string;
}): ComboForecastUsageRow[] {
  const db = getDbInstance();
  const conditions = ["combo_name IS NOT NULL", "combo_name != ''", "timestamp >= @since"];
  const params: Record<string, unknown> = { since: opts.since };

  if (opts.until) {
    conditions.push("timestamp <= @until");
    params.until = opts.until;
  }

  if (opts.comboName) {
    conditions.push("combo_name = @comboName");
    params.comboName = opts.comboName;
  }

  const rows = db
    .prepare(
      `SELECT
         combo_name as comboName,
         COALESCE(NULLIF(combo_execution_key, ''), NULLIF(combo_step_id, '')) as executionKey,
         combo_step_id as stepId,
         provider,
         model,
         requested_model as requestedModel,
         connection_id as connectionId,
         COUNT(*) as requests,
         SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) as successCount,
         COALESCE(SUM(tokens_in), 0) as inputTokens,
         COALESCE(SUM(tokens_out), 0) as outputTokens,
         COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
         COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
         COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
         COALESCE(SUM(tokens_in), 0) + COALESCE(SUM(tokens_out), 0) as totalTokens,
         COALESCE(AVG(duration), 0) as avgLatencyMs,
         MAX(timestamp) as lastUsedAt
       FROM call_logs
       WHERE ${conditions.join(" AND ")}
       GROUP BY combo_name, executionKey, combo_step_id, provider, model, requested_model, connection_id
       ORDER BY combo_name ASC, requests DESC`
    )
    .all(params) as ComboForecastUsageSqlRow[];

  return rows.map((row) => ({
    comboName: toString(row.comboName),
    executionKey:
      typeof row.executionKey === "string" && row.executionKey ? row.executionKey : null,
    stepId: typeof row.stepId === "string" && row.stepId ? row.stepId : null,
    provider: toString(row.provider),
    model: toString(row.model),
    requestedModel:
      typeof row.requestedModel === "string" && row.requestedModel ? row.requestedModel : null,
    connectionId:
      typeof row.connectionId === "string" && row.connectionId ? row.connectionId : null,
    requests: toNumber(row.requests),
    successCount: toNumber(row.successCount),
    inputTokens: toNumber(row.inputTokens),
    outputTokens: toNumber(row.outputTokens),
    cacheReadTokens: toNumber(row.cacheReadTokens),
    cacheCreationTokens: toNumber(row.cacheCreationTokens),
    reasoningTokens: toNumber(row.reasoningTokens),
    totalTokens: toNumber(row.totalTokens),
    avgLatencyMs: toNumber(row.avgLatencyMs),
    lastUsedAt: typeof row.lastUsedAt === "string" ? row.lastUsedAt : null,
  }));
}
