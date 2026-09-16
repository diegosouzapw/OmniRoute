/**
 * usage/costLedgerRecorder.ts — wire the per-request cost ledger into the
 * existing cost-recording call sites (RIC-741 / M3 D2).
 *
 * The chat core already computes `estimatedCost` via `calculateCost` and
 * records it against the key via `recordCost`. To make every call traceable to
 * provider/model/token/unit-price/amount, this module captures the full
 * breakdown at the same point and appends it to the ledger. It is a pure
 * additive best-effort side-effect: never throws, never blocks the response.
 *
 * KISS: no new pipeline — the existing `calculateCost` resolution is reused;
 * this module only snapshots the inputs that were already in hand.
 *
 * @module usage/costLedgerRecorder
 */

import { recordLedgerEntrySafe } from "@/lib/db/costLedger";
import { getPricingForModel } from "@/lib/db/settings/pricing";
import { getLoggedInputTokens, getLoggedOutputTokens, getReasoningTokens } from "./tokenAccounting";

export interface CostLedgerRecorderInput {
  apiKeyId: string | null | undefined;
  provider: string | null | undefined;
  model: string | null | undefined;
  tokens: unknown;
  amountUsd: number;
  serviceTier?: string | null;
  success?: boolean;
  timestamp?: string;
  requestId?: string | null;
}

/**
 * Record a completed call into the cost ledger, resolving unit prices from the
 * same pricing source `calculateCost` uses (best-effort, no pricing row → 0).
 * Fire-and-forget: safe to call without awaiting; never throws.
 */
export async function recordLedgerFromCost(
  input: CostLedgerRecorderInput
): Promise<void> {
  if (!input?.apiKeyId) return;
  try {
    let unitPriceInput = 0;
    let unitPriceOutput = 0;
    if (input.provider && input.model) {
      const pricing = await getPricingForModel(input.provider, input.model);
      if (pricing) {
        unitPriceInput = toNumber(pricing.input);
        unitPriceOutput = toNumber(pricing.output);
      }
    }

    recordLedgerEntrySafe({
      apiKeyId: input.apiKeyId,
      provider: input.provider || "unknown",
      model: input.model || "unknown",
      tokensInput: getLoggedInputTokens(input.tokens),
      tokensOutput: getLoggedOutputTokens(input.tokens),
      tokensReasoning: getReasoningTokens(input.tokens),
      unitPriceInput,
      unitPriceOutput,
      amountUsd: Math.max(0, Number.isFinite(input.amountUsd) ? input.amountUsd : 0),
      serviceTier: input.serviceTier || "standard",
      success: input.success !== false,
      timestamp: input.timestamp || new Date().toISOString(),
      requestId: input.requestId ?? null,
    });
  } catch {
    // Best-effort only.
  }
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}
