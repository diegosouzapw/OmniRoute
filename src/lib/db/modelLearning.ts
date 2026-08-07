/**
 * db/modelLearning.ts — Long-term per-model per-task-type quality learning (PR1).
 *
 * Where combo_adaptation_state tracks operational short-term state (cooldown,
 * warm, per-combo), model_learning aggregates the QUALITY axis over time, keyed
 * on (model_str, task_type). The flush layer (adaptiveLearning.ts) publishes
 * rows that cross MIN_SAMPLES into model_intelligence as source='adaptive_learning'.
 *
 * Row shape (table created in migration 136):
 *   model_str, task_type, learned_score, sample_count, success_count,
 *   quality_failures, empty_responses, tool_calls, tool_call_successes,
 *   total_tokens, first_pass_successes, first_pass_total, confidence, last_updated
 *
 * Quality target per event (EMA alpha 0.2, clamped to [0,1]):
 *   success + tool-call success → 1.00
 *   success, first-pass         → 0.85
 *   success, after retry        → 0.70
 *   quality failure (empty 200) → 0.00
 *   infra failure (502/timeout) → NOT recorded here (health axis, cooldown only)
 */

import { getDbInstance } from "./core";

export interface ModelLearningRow {
  modelStr: string;
  taskType: string;
  learnedScore: number;
  sampleCount: number;
  successCount: number;
  qualityFailures: number;
  emptyResponses: number;
  toolCalls: number;
  toolCallSuccesses: number;
  totalTokens: number;
  firstPassSuccesses: number;
  firstPassTotal: number;
  confidence: number;
  lastUpdated: string | null;
}

export interface ModelLearningSignals {
  taskType?: string;
  success: boolean;
  /** 200-but-empty / quality-rejected response. Quality failure, NOT infra. */
  qualityFailure?: boolean;
  isEmptyResponse?: boolean;
  hasTools?: boolean;
  toolCallSucceeded?: boolean;
  tokensOut?: number;
  /** True when the request succeeded on its first attempt (fallbackCount === 0). */
  firstPass?: boolean;
}

export const MIN_SAMPLES = 20;
export const LEARNING_ALPHA = 0.2;

/** 20 → 0.5, 50 → 0.8, 100+ → 1.0 (linear between rungs). Stored, not yet consulted. */
export function sampleCountToConfidence(sampleCount: number): number {
  if (sampleCount >= 100) return 1.0;
  if (sampleCount >= 50) return 0.8 + 0.2 * ((sampleCount - 50) / 50);
  if (sampleCount >= 20) return 0.5 + 0.3 * ((sampleCount - 20) / 30);
  return 0;
}

function qualityTarget(signals: ModelLearningSignals): number | null {
  if (signals.success) {
    if (signals.toolCallSucceeded === true) return 1.0;
    if (signals.firstPass === false) return 0.7;
    return 0.85;
  }
  if (signals.qualityFailure === true) return 0.0;
  // Infra failure (502/timeout/429) — health axis only, never feeds quality.
  return null;
}

function ema(previous: number | null | undefined, target: number): number {
  const prev = Number.isFinite(previous as number)
    ? Math.max(0, Math.min(1, previous as number))
    : 0.5;
  const clamped = Math.max(0, Math.min(1, target));
  return prev + LEARNING_ALPHA * (clamped - prev);
}

export function normalizeTaskType(taskType: string | undefined): string {
  const t = typeof taskType === "string" ? taskType.trim().toLowerCase() : "";
  return t.length > 0 ? t : "default";
}

/**
 * Record one request outcome into the (model_str, task_type) learning row.
 * Only quality-relevant events mutate learned_score; infra failures are ignored.
 */
export function recordModelLearningOutcome(modelStr: string, signals: ModelLearningSignals): void {
  const taskType = normalizeTaskType(signals.taskType);
  // Infra failures (502/timeout/429) are the HEALTH axis — they never feed the
  // quality learning table, so they neither create nor pollute a row.
  if (qualityTarget(signals) === null) return;
  const now = new Date().toISOString();
  const db = getDbInstance();
  const existing = db
    .prepare(
      `SELECT learned_score, sample_count, success_count, quality_failures,
              empty_responses, tool_calls, tool_call_successes, total_tokens,
              first_pass_successes, first_pass_total
         FROM model_learning
        WHERE model_str = ? AND task_type = ?`
    )
    .get(modelStr, taskType) as
    | {
        learned_score: number;
        sample_count: number;
        success_count: number;
        quality_failures: number;
        empty_responses: number;
        tool_calls: number;
        tool_call_successes: number;
        total_tokens: number;
        first_pass_successes: number;
        first_pass_total: number;
      }
    | undefined;

  const sampleCount = (existing?.sample_count ?? 0) + 1;
  const target = qualityTarget(signals);
  const learnedScore =
    target === null ? (existing?.learned_score ?? 0.5) : ema(existing?.learned_score, target);
  const confidence = sampleCountToConfidence(sampleCount);

  db.prepare(
    `INSERT INTO model_learning
       (model_str, task_type, learned_score, sample_count, success_count,
        quality_failures, empty_responses, tool_calls, tool_call_successes,
        total_tokens, first_pass_successes, first_pass_total, confidence, last_updated)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(model_str, task_type) DO UPDATE SET
       learned_score = excluded.learned_score,
       sample_count = excluded.sample_count,
       success_count = excluded.success_count,
       quality_failures = excluded.quality_failures,
       empty_responses = excluded.empty_responses,
       tool_calls = excluded.tool_calls,
       tool_call_successes = excluded.tool_call_successes,
       total_tokens = excluded.total_tokens,
       first_pass_successes = excluded.first_pass_successes,
       first_pass_total = excluded.first_pass_total,
       confidence = excluded.confidence,
       last_updated = excluded.last_updated`
  ).run(
    modelStr,
    taskType,
    learnedScore,
    sampleCount,
    (existing?.success_count ?? 0) + (signals.success ? 1 : 0),
    (existing?.quality_failures ?? 0) + (signals.qualityFailure === true ? 1 : 0),
    (existing?.empty_responses ?? 0) + (signals.isEmptyResponse === true ? 1 : 0),
    (existing?.tool_calls ?? 0) + (signals.hasTools === true ? 1 : 0),
    (existing?.tool_call_successes ?? 0) + (signals.toolCallSucceeded === true ? 1 : 0),
    (existing?.total_tokens ?? 0) + (typeof signals.tokensOut === "number" ? signals.tokensOut : 0),
    (existing?.first_pass_successes ?? 0) + (signals.success && signals.firstPass === true ? 1 : 0),
    (existing?.first_pass_total ?? 0) + (signals.success ? 1 : 0),
    confidence,
    now
  );
}

export function getModelLearning(modelStr: string, taskType: string): ModelLearningRow | null {
  const row = getDbInstance()
    .prepare(
      `SELECT model_str AS modelStr, task_type AS taskType,
              learned_score AS learnedScore, sample_count AS sampleCount,
              success_count AS successCount, quality_failures AS qualityFailures,
              empty_responses AS emptyResponses, tool_calls AS toolCalls,
              tool_call_successes AS toolCallSuccesses,
              total_tokens AS totalTokens,
              first_pass_successes AS firstPassSuccesses,
              first_pass_total AS firstPassTotal,
              confidence, last_updated AS lastUpdated
         FROM model_learning
        WHERE model_str = ? AND task_type = ?`
    )
    .get(modelStr, normalizeTaskType(taskType)) as ModelLearningRow | undefined;
  return row ?? null;
}

/** Rows whose accumulated sample count is ready for publication (>= minSamples). */
export function listReadyModelLearning(minSamples: number = MIN_SAMPLES): ModelLearningRow[] {
  return getDbInstance()
    .prepare(
      `SELECT model_str AS modelStr, task_type AS taskType,
              learned_score AS learnedScore, sample_count AS sampleCount,
              success_count AS successCount, quality_failures AS qualityFailures,
              empty_responses AS emptyResponses, tool_calls AS toolCalls,
              tool_call_successes AS toolCallSuccesses,
              total_tokens AS totalTokens,
              first_pass_successes AS firstPassSuccesses,
              first_pass_total AS firstPassTotal,
              confidence, last_updated AS lastUpdated
         FROM model_learning
        WHERE sample_count >= ?
        ORDER BY last_updated ASC`
    )
    .all(minSamples) as ModelLearningRow[];
}
