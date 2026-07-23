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

/**
 * Build the per-request consumption cost payload shared by the streaming and
 * non-streaming POST-hooks. Coerces token fields defensively (string/NaN safe)
 * and clamps a negative/zero cost to 0 so a bad pricing lookup never records
 * negative USD.
 */
export function buildConsumptionCost(
  usage: unknown,
  estimatedCost: number
): { tokens: number; usd: number; requests: number } {
  const u = usage && typeof usage === "object" ? (usage as Record<string, unknown>) : null;
  const tokens = u
    ? (Number(u.prompt_tokens ?? 0) || 0) + (Number(u.completion_tokens ?? 0) || 0)
    : 0;
  return {
    tokens,
    usd: estimatedCost > 0 ? estimatedCost : 0,
    requests: 1,
  };
}

/** Cost resolver injected for testability (matches `calculateCost`). */
type CostResolver = (
  provider: string,
  model: string,
  usage: Record<string, number | undefined> | null | undefined,
  options: { serviceTier?: string }
) => Promise<number>;

/**
 * Record shared-quota consumption for a completed STREAMING response.
 *
 * Unlike the non-streaming path, the streaming completion previously recorded
 * `usd: 0` (the cost was resolved asynchronously only for `recordCost`), so
 * USD-unit pools (e.g. DeepSeek `usd/monthly`) never accrued on streaming
 * traffic. This resolves the real cost via the injected `calculateCost` and
 * schedules a single consumption record. Fire-and-forget / fail-open: never
 * throws to the caller, and still records `requests: 1` when usage is absent.
 */
export async function recordStreamingConsumption(
  params: {
    apiKeyId?: string | null;
    connectionId?: string | null;
    provider?: string | null;
    model: string;
    streamUsage: unknown;
    streamStatus: number;
    serviceTier?: string;
  },
  deps: {
    calculateCost: CostResolver;
    schedule?: (input: RecordConsumptionInput, log?: MinimalLogger | null) => void;
    log?: MinimalLogger | null;
  }
): Promise<void> {
  const { apiKeyId, connectionId, provider, model, streamUsage, streamStatus, serviceTier } =
    params;
  if (!apiKeyId || !connectionId || streamStatus !== 200) return;

  const schedule = deps.schedule ?? scheduleRecordConsumption;
  const resolvedProvider = provider ?? "unknown";

  let estimatedCost = 0;
  if (streamUsage && typeof streamUsage === "object") {
    try {
      estimatedCost = await deps.calculateCost(
        resolvedProvider,
        model,
        streamUsage as Record<string, number | undefined>,
        { serviceTier }
      );
    } catch {
      estimatedCost = 0;
    }
  }

  schedule(
    {
      apiKeyId,
      connectionId,
      provider: resolvedProvider,
      // Per-(key,model) cap accounting on streaming traffic — same resolved model id.
      model: model || undefined,
      cost: buildConsumptionCost(streamUsage, estimatedCost),
    },
    deps.log
  );
}
