import { isLocalStreamLifecycleError } from "@/shared/utils/circuitBreaker.ts";
import {
  markLocalRateLimitError,
  LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
} from "../../services/rateLimitManager/errors.ts";

/**
 * Rethrow a hierarchical-admission failure. Aborts, stream-lifecycle errors and coded
 * semaphore errors pass through unchanged (SEMAPHORE_QUEUE_FULL is a 429 admission signal
 * the combo cascade reads); only a bare time-budget timeout becomes the LEGACY queue 503.
 */
export function rethrowAdmissionError(error: unknown): never {
  const err = error as { name?: unknown; code?: unknown } | null;
  if (err?.name === "AbortError" || err?.code === "ABORT_ERR") throw error;
  if (isLocalStreamLifecycleError(error)) throw error;
  if (err?.code === undefined) {
    throw markLocalRateLimitError(error as Error, LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE);
  }
  throw error;
}

/** What is left of a queue-wait budget that started at `startedAt`. */
export function remainingQueueBudgetMs(budgetMs: number, startedAt: number): number {
  return Math.max(0, budgetMs - (Date.now() - startedAt));
}
