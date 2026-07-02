import { createCostMeter } from "./costMeter.ts";
import { buildJudgePrompt, parseJudgeVerdict } from "./judge.ts";
import type { JudgeVerdict, ModelClient } from "./types.ts";

export interface FidelityItem {
  id: string;
  original: string;
  compressed: string;
}

export interface FidelityVerdict {
  id: string;
  verdict: JudgeVerdict | null;
  usdCost: number;
  skippedCapped: boolean;
}

export interface FidelityBatchResult {
  results: FidelityVerdict[];
  totalUsd: number;
  capped: boolean;
}

/**
 * Run a USD-capped fidelity judge over a batch of (original, compressed) pairs.
 *
 * Iterates items in order; stops adding new LLM calls once the accumulated cost
 * exceeds `costCapUsd`. Remaining items receive `skippedCapped: true` and
 * `verdict: null` so callers can distinguish "not judged" from "unparseable".
 *
 * Hard Rule #18: NOT unit-tested for real LLM calls; VPS-validated via the
 * /api/compression/compare/verify route.
 */
export async function judgeFidelityBatch(
  client: ModelClient,
  judgeModel: string,
  items: FidelityItem[],
  costCapUsd: number
): Promise<FidelityBatchResult> {
  const meter = createCostMeter(costCapUsd);
  const results: FidelityVerdict[] = [];
  let capped = false;

  for (const item of items) {
    if (capped || meter.exceeded) {
      results.push({ id: item.id, verdict: null, usdCost: 0, skippedCapped: true });
      continue;
    }
    try {
      const prompt = buildJudgePrompt(item.original, item.compressed);
      const { text, usdCost } = await client.complete(judgeModel, prompt);
      meter.add(usdCost ?? 0);
      results.push({ id: item.id, verdict: parseJudgeVerdict(text), usdCost: usdCost ?? 0, skippedCapped: false });
    } catch {
      results.push({ id: item.id, verdict: "unparseable", usdCost: 0, skippedCapped: false });
    }
    if (meter.exceeded) capped = true;
  }

  return { results, totalUsd: meter.spent, capped };
}
