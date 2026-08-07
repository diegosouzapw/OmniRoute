/**
 * db/adaptiveLearning.ts — Publish long-term quality learning into the fitness
 * resolution chain (PR1).
 *
 * Flushes model_learning rows that crossed MIN_SAMPLES into model_intelligence
 * with source='adaptive_learning' (weighted just below user_override, above the
 * arena_elo / models.dev static layers) and a rolling TTL. `confidence` is stored
 * as a forward-looking gate and does not affect routing yet.
 */

import {
  listReadyModelLearning,
  MIN_SAMPLES,
  sampleCountToConfidence,
  type ModelLearningRow,
} from "./modelLearning";
import { bulkUpsertModelIntelligence, deleteExpiredIntelligence } from "./modelIntelligence";

export const ADAPTIVE_LEARNING_SOURCE = "adaptive_learning";
export const DEFAULT_TTL_DAYS = 7;
export const FLUSH_INTERVAL_MS = 5 * 60 * 1000;

export interface FlushAdaptiveLearningOptions {
  minSamples?: number;
  ttlDays?: number;
}

function toIntelligenceEntry(row: ModelLearningRow, ttlDays: number) {
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000).toISOString();
  return {
    model: row.modelStr.toLowerCase(),
    source: ADAPTIVE_LEARNING_SOURCE,
    category: row.taskType,
    score: row.learnedScore,
    eloRaw: null,
    // confidence: forward-looking gate, stored but not consulted by resolution.
    confidence: row.confidence > 0 ? String(row.confidence) : null,
    expiresAt,
  };
}

/**
 * Publish ready model_learning rows (sample_count >= minSamples) to
 * model_intelligence, then purge expired adaptive_learning rows. Returns the
 * number of rows published.
 */
export function flushAdaptiveLearning(options: FlushAdaptiveLearningOptions = {}): number {
  const minSamples = options.minSamples ?? MIN_SAMPLES;
  const ttlDays = options.ttlDays ?? DEFAULT_TTL_DAYS;
  const ready = listReadyModelLearning(minSamples);
  const published = bulkUpsertModelIntelligence(
    ready.map((row) => toIntelligenceEntry(row, ttlDays))
  );
  try {
    deleteExpiredIntelligence(ADAPTIVE_LEARNING_SOURCE);
  } catch {
    // non-fatal — publication already succeeded
  }
  return published;
}

let _flusherTimer: NodeJS.Timeout | null = null;

/**
 * Start the periodic flush loop (default every 5 minutes). Idempotent. Uses
 * unref() so it never keeps the process alive on its own.
 */
export function startAdaptiveLearningFlusher(options: FlushAdaptiveLearningOptions = {}): void {
  if (_flusherTimer) return;
  _flusherTimer = setInterval(() => {
    try {
      const published = flushAdaptiveLearning(options);
      if (published > 0) {
        console.log(`[AdaptiveLearning] Published ${published} model learning row(s)`);
      }
    } catch (err) {
      console.warn("[AdaptiveLearning] Flush failed (non-fatal)", { err });
    }
  }, FLUSH_INTERVAL_MS);
  _flusherTimer.unref?.();
}
