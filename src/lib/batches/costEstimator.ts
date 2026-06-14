import type { CostEstimate } from "./types";
import type { SupportedBatchEndpoint } from "@/shared/constants/batchEndpoints";
import { DEFAULT_PRICING } from "@/shared/constants/pricing";

/**
 * NOTE on pricing import shape:
 *
 * `src/shared/constants/pricing.ts` exports `DEFAULT_PRICING` — a nested object:
 *   DEFAULT_PRICING[providerAlias][modelId] = { input, output, cached, reasoning, cache_creation }
 *
 * All rates are in USD per 1 million tokens.
 *
 * `getPrice()` below iterates over all providers to find an entry matching the
 * model id (exact or case-insensitive). This is intentional: callers of
 * `estimateBatchCost` only know the model id, not the provider alias.
 */
type PricingEntry = { input: number; output: number };

function getPrice(
  model: string
): { input: number; output: number; src: CostEstimate["pricingSource"] } | null {
  const table = DEFAULT_PRICING as Record<string, Record<string, unknown>>;

  // Pass 1: exact match across all providers
  for (const providerModels of Object.values(table)) {
    if (typeof providerModels !== "object" || providerModels === null) continue;
    const entry = (providerModels as Record<string, unknown>)[model];
    if (
      entry &&
      typeof entry === "object" &&
      typeof (entry as PricingEntry).input === "number" &&
      typeof (entry as PricingEntry).output === "number"
    ) {
      const e = entry as PricingEntry;
      return { input: e.input, output: e.output, src: "exact-match" };
    }
  }

  // Pass 2: case-insensitive alias match
  const lower = model.toLowerCase();
  for (const providerModels of Object.values(table)) {
    if (typeof providerModels !== "object" || providerModels === null) continue;
    for (const [key, val] of Object.entries(providerModels as Record<string, unknown>)) {
      if (
        key.toLowerCase() === lower &&
        val &&
        typeof val === "object" &&
        typeof (val as PricingEntry).input === "number" &&
        typeof (val as PricingEntry).output === "number"
      ) {
        const e = val as PricingEntry;
        return { input: e.input, output: e.output, src: "alias-match" };
      }
    }
  }

  return null;
}

const BATCH_DISCOUNT = 0.5;
const DEFAULT_OUTPUT_TOKENS = 256;
const CHARS_PER_TOKEN = 4; // heuristic: ~4 UTF-8 chars per token

/**
 * Estimate the cost of submitting a JSONL batch.
 *
 * - Input tokens: heuristic `Math.ceil(bodyStr.length / 4)` per request.
 * - Output tokens: `min(max_tokens || 256, 1024)` per request.
 * - Batch discount: -50% on both input and output (OpenAI / Anthropic batch APIs).
 * - Prices from `DEFAULT_PRICING` in `src/shared/constants/pricing.ts`.
 * - If model is not in the table, costs are 0 and a warning is added.
 *
 * Always label results as "estimated (~)" in the UI.
 */
export function estimateBatchCost(input: {
  jsonl: string;
  model: string;
  endpoint: SupportedBatchEndpoint;
}): CostEstimate {
  const lines = input.jsonl.split(/\r?\n/).filter((l) => l.trim().length > 0);
  let inputTokens = 0;
  let outputTokens = 0;

  for (const line of lines) {
    try {
      const parsed = JSON.parse(line) as Record<string, unknown>;
      // Support both OpenAI shape (body) and Anthropic shape (params)
      const bodyObj = (parsed.body ?? parsed.params ?? {}) as Record<string, unknown>;
      const bodyStr = JSON.stringify(bodyObj);
      inputTokens += Math.ceil(bodyStr.length / CHARS_PER_TOKEN);

      const rawMaxTokens = (bodyObj as Record<string, unknown>).max_tokens;
      const maxTokens =
        typeof rawMaxTokens === "number" && rawMaxTokens > 0 ? rawMaxTokens : DEFAULT_OUTPUT_TOKENS;
      outputTokens += Math.min(maxTokens, 1024);
    } catch {
      // Skip malformed lines — validateJsonl will flag these separately
    }
  }

  const price = getPrice(input.model);
  const warnings: string[] = [];
  let pricingSource: CostEstimate["pricingSource"] = "fallback";
  let inputRate = 0;
  let outputRate = 0;

  if (price) {
    inputRate = price.input;
    outputRate = price.output;
    pricingSource = price.src;
  } else {
    warnings.push(`model "${input.model}" not found in pricing table — cost shown as $0 (fallback)`);
  }

  // Rates are per 1 million tokens
  const syncCostUsd = (inputTokens * inputRate + outputTokens * outputRate) / 1_000_000;
  const batchCostUsd = syncCostUsd * BATCH_DISCOUNT;

  return {
    model: input.model,
    totalRequests: lines.length,
    estimatedInputTokens: inputTokens,
    estimatedOutputTokens: outputTokens,
    syncCostUsd,
    batchCostUsd,
    savingsUsd: syncCostUsd - batchCostUsd,
    pricingSource,
    warnings,
  };
}
