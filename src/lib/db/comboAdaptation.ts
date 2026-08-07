/**
 * db/comboAdaptation.ts — Persisted per-model adaptation state for Auto-Combo.
 *
 * Tracks request/success/failure counters, a smoothed learned score, and an
 * exponential-backoff cooldown so a model that repeatedly 502s/timeouts gets
 * excluded from auto-routing for progressively longer windows, while a healthy
 * model stays eligible. Keyed on (combo_id, model_str) — cooldown/warm/score
 * all operate per routed model, not per provider.
 *
 * Two axes, deliberately kept apart (PR1):
 *   - HEALTH  (infra): 502 / timeout / 429 / connection reset → failures,
 *     consecutive_failures, cooldown ladder.
 *   - QUALITY (model property): empty responses, missing tool calls, retries →
 *     quality_failures / empty_responses / tool_call_* / first_pass_* counters.
 *     Quality failures never touch the cooldown ladder. The same signals feed
 *     the long-term (model_str, task_type) table in modelLearning.ts.
 *
 * Row shape (combo_adaptation_state, rebuilt in migration 134, extended 135):
 *   id, combo_id, model_str, learned_score, request_count, success_count,
 *   failures, consecutive_failures, avg_latency_ms, last_success, last_failure,
 *   cooldown_until, updated_at,
 *   quality_failures, empty_responses, tool_calls, tool_call_successes,
 *   total_tokens, first_pass_successes, first_pass_total
 *
 * Backoff ladder (consecutive failures):
 *   3 → 5 min, 6 → 15 min, 9 → 60 min (saturating). Any success resets the
 *   consecutive counter and clears the cooldown.
 */

import { getDbInstance } from "./core";
import { recordModelLearningOutcome } from "./modelLearning";

export interface ComboAdaptationRow {
  id: number;
  comboId: string;
  modelStr: string;
  learnedScore: number;
  requestCount: number;
  successCount: number;
  failures: number;
  consecutiveFailures: number;
  avgLatencyMs: number | null;
  lastSuccess: string | null;
  lastFailure: string | null;
  cooldownUntil: string | null;
  updatedAt: string | null;
  qualityFailures: number;
  emptyResponses: number;
  toolCalls: number;
  toolCallSuccesses: number;
  totalTokens: number;
  firstPassSuccesses: number;
  firstPassTotal: number;
}

export interface ComboAdaptationOutcome {
  success: boolean;
  latencyMs: number;
  /** Auto-branch computed task type; non-auto strategies omit it → "default". */
  taskType?: string;
  /** True when the request carried tool definitions. */
  hasTools?: boolean;
  /** True when the successful response included a tool call. */
  toolCallSucceeded?: boolean;
  /** True for a 200-but-empty / quality-rejected response. */
  isEmptyResponse?: boolean;
  /** Emitted output tokens (usage.completion_tokens), when observable. */
  tokensOut?: number;
  /** True when the failure was a QUALITY failure, not infra. */
  qualityFailure?: boolean;
  /** True when the request succeeded on its first attempt (fallbackCount === 0). */
  firstPass?: boolean;
}

const MINUTES = 60 * 1000;
const HOURS = 60 * MINUTES;

const BACKOFF_LADDER: ReadonlyArray<{ threshold: number; durationMs: number }> = [
  { threshold: 9, durationMs: 1 * HOURS },
  { threshold: 6, durationMs: 15 * MINUTES },
  { threshold: 3, durationMs: 5 * MINUTES },
];

export function cooldownDurationMsFor(consecutiveFailures: number): number {
  for (const rung of BACKOFF_LADDER) {
    if (consecutiveFailures >= rung.threshold) return rung.durationMs;
  }
  return 0;
}

const LEARNED_SCORE_ALPHA = 0.2;

function nextLearnedScore(previous: number, success: boolean): number {
  const prev = Number.isFinite(previous) ? Math.max(0, Math.min(1, previous)) : 0.5;
  const target = success ? 1 : 0;
  return prev + LEARNED_SCORE_ALPHA * (target - prev);
}

const QUALITY_SELECT = `id, learned_score, request_count, success_count, failures,
        consecutive_failures, avg_latency_ms, quality_failures,
        empty_responses, tool_calls, tool_call_successes, total_tokens,
        first_pass_successes, first_pass_total`;

export function recordComboAdaptationOutcome(
  comboId: string,
  modelStr: string,
  outcome: ComboAdaptationOutcome
): void {
  const now = new Date().toISOString();
  const db = getDbInstance();
  const existing = db
    .prepare(
      `SELECT ${QUALITY_SELECT} FROM combo_adaptation_state WHERE combo_id = ? AND model_str = ?`
    )
    .get(comboId, modelStr) as
    | {
        id: number;
        learned_score: number;
        request_count: number;
        success_count: number;
        failures: number;
        consecutive_failures: number;
        avg_latency_ms: number | null;
        quality_failures: number;
        empty_responses: number;
        tool_calls: number;
        tool_call_successes: number;
        total_tokens: number;
        first_pass_successes: number;
        first_pass_total: number;
      }
    | undefined;

  // ── HEALTH axis ──────────────────────────────────────────────────────────
  const isQualityFailure = !outcome.success && outcome.qualityFailure === true;
  const isInfraFailure = !outcome.success && !isQualityFailure;

  const requestCount = (existing?.request_count ?? 0) + 1;
  const successCount = (existing?.success_count ?? 0) + (outcome.success ? 1 : 0);
  const failures = (existing?.failures ?? 0) + (isInfraFailure ? 1 : 0);
  const consecutiveFailures = outcome.success
    ? 0
    : isInfraFailure
      ? (existing?.consecutive_failures ?? 0) + 1
      : (existing?.consecutive_failures ?? 0);

  const prevLatency =
    Number.isFinite(existing?.avg_latency_ms) && (existing?.avg_latency_ms ?? 0) > 0
      ? (existing?.avg_latency_ms as number)
      : null;
  const prevCount = existing?.request_count ?? 0;
  const avgLatencyMs =
    prevLatency === null
      ? outcome.latencyMs
      : (prevLatency * prevCount + outcome.latencyMs) / (prevCount + 1);

  const learnedScore = nextLearnedScore(existing?.learned_score ?? 0.5, outcome.success);

  // Quality failures never extend the cooldown ladder; successes clear it.
  let cooldownUntil = existing?.cooldownUntil ?? null;
  if (outcome.success) {
    cooldownUntil = null;
  } else if (isInfraFailure) {
    cooldownUntil = new Date(Date.now() + cooldownDurationMsFor(consecutiveFailures)).toISOString();
  }

  // ── QUALITY axis ─────────────────────────────────────────────────────────
  const qualityFailures = (existing?.quality_failures ?? 0) + (isQualityFailure ? 1 : 0);
  const emptyResponses =
    (existing?.empty_responses ?? 0) + (outcome.isEmptyResponse === true ? 1 : 0);
  const toolCalls = (existing?.tool_calls ?? 0) + (outcome.hasTools === true ? 1 : 0);
  const toolCallSuccesses =
    (existing?.tool_call_successes ?? 0) + (outcome.toolCallSucceeded === true ? 1 : 0);
  const totalTokens =
    (existing?.total_tokens ?? 0) + (typeof outcome.tokensOut === "number" ? outcome.tokensOut : 0);
  const firstPassSuccesses =
    (existing?.first_pass_successes ?? 0) + (outcome.success && outcome.firstPass === true ? 1 : 0);
  const firstPassTotal = (existing?.first_pass_total ?? 0) + (outcome.success ? 1 : 0);

  db.prepare(
    `INSERT INTO combo_adaptation_state
       (combo_id, model_str, learned_score, request_count, success_count, failures,
        consecutive_failures, avg_latency_ms, last_success, last_failure,
        cooldown_until, updated_at, quality_failures, empty_responses,
        tool_calls, tool_call_successes, total_tokens,
        first_pass_successes, first_pass_total)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(combo_id, model_str) DO UPDATE SET
       learned_score = excluded.learned_score,
       request_count = excluded.request_count,
       success_count = excluded.success_count,
       failures = excluded.failures,
       consecutive_failures = excluded.consecutive_failures,
       avg_latency_ms = excluded.avg_latency_ms,
       last_success = excluded.last_success,
       last_failure = excluded.last_failure,
       cooldown_until = excluded.cooldown_until,
       updated_at = excluded.updated_at,
       quality_failures = excluded.quality_failures,
       empty_responses = excluded.empty_responses,
       tool_calls = excluded.tool_calls,
       tool_call_successes = excluded.tool_call_successes,
       total_tokens = excluded.total_tokens,
       first_pass_successes = excluded.first_pass_successes,
       first_pass_total = excluded.first_pass_total`
  ).run(
    comboId,
    modelStr,
    learnedScore,
    requestCount,
    successCount,
    failures,
    consecutiveFailures,
    avgLatencyMs,
    outcome.success ? now : null,
    isInfraFailure ? now : null,
    cooldownUntil,
    now,
    qualityFailures,
    emptyResponses,
    toolCalls,
    toolCallSuccesses,
    totalTokens,
    firstPassSuccesses,
    firstPassTotal
  );

  // Long-term quality learning (per model × task type), best-effort.
  try {
    recordModelLearningOutcome(modelStr, {
      taskType: outcome.taskType,
      success: outcome.success,
      qualityFailure: outcome.qualityFailure,
      isEmptyResponse: outcome.isEmptyResponse,
      hasTools: outcome.hasTools,
      toolCallSucceeded: outcome.toolCallSucceeded,
      tokensOut: outcome.tokensOut,
      firstPass: outcome.firstPass,
    });
  } catch {
    // non-fatal — the operational row above is already persisted
  }
}

const ROW_SELECT = `id, combo_id AS comboId, model_str AS modelStr,
        learned_score AS learnedScore, request_count AS requestCount,
        success_count AS successCount, failures,
        consecutive_failures AS consecutiveFailures,
        avg_latency_ms AS avgLatencyMs, last_success AS lastSuccess,
        last_failure AS lastFailure, cooldown_until AS cooldownUntil,
        updated_at AS updatedAt, quality_failures AS qualityFailures,
        empty_responses AS emptyResponses, tool_calls AS toolCalls,
        tool_call_successes AS toolCallSuccesses, total_tokens AS totalTokens,
        first_pass_successes AS firstPassSuccesses,
        first_pass_total AS firstPassTotal`;

export function getComboAdaptationState(
  comboId: string,
  modelStr: string
): ComboAdaptationRow | null {
  const row = getDbInstance()
    .prepare(
      `SELECT ${ROW_SELECT} FROM combo_adaptation_state WHERE combo_id = ? AND model_str = ?`
    )
    .get(comboId, modelStr) as ComboAdaptationRow | undefined;
  return row ?? null;
}

/**
 * All per-model adaptation rows for a combo, indexed by model string.
 * Used by the auto-scoring path to read cooldown/learned-score/excluded state.
 */
export function getComboAdaptationByModel(comboId: string): Map<string, ComboAdaptationRow> {
  const rows = getDbInstance()
    .prepare(`SELECT ${ROW_SELECT} FROM combo_adaptation_state WHERE combo_id = ?`)
    .all(comboId) as ComboAdaptationRow[];
  return new Map(rows.map((row) => [row.modelStr, row]));
}
