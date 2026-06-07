/**
 * spendRecorder.ts — Fire-and-forget wrapper for POST-response consumption.
 *
 * Schedules `recordConsumption` on the next event-loop tick via `setImmediate`
 * so it never adds latency to the client response path.
 *
 * Errors from `recordConsumption` are caught and logged via pino (if a logger
 * is provided) but NEVER propagated — per B29, drift is acceptable and will
 * self-correct through the global saturation signal on the next request.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F7).
 */

import { recordConsumption } from "./enforce";
import type { RecordConsumptionInput } from "./types";

// Minimal pino-compatible logger surface (only warn is needed)
interface MinimalLogger {
  warn?: (data: unknown, msg?: string) => void;
}

/**
 * Schedule `recordConsumption` for the next event-loop tick.
 *
 * @param input  Consumption data to record.
 * @param log    Optional pino logger; if omitted, errors are silently discarded.
 */
export function scheduleRecordConsumption(
  input: RecordConsumptionInput,
  log?: MinimalLogger | null
): void {
  setImmediate(() => {
    recordConsumption(input).catch((err: unknown) => {
      if (log?.warn) {
        log.warn(
          { err: err instanceof Error ? err.message : String(err) },
          "[quotaShare] recordConsumption failed (drift expected)"
        );
      }
    });
  });
}
