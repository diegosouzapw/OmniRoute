import { getExecutor } from "@omniroute/open-sse/executors/index";
import type { ExecuteInput, ProviderCredentials } from "@omniroute/open-sse/executors/base";
import type {
  ChatTurn,
  ModelCallResult,
  ModelClient,
} from "@omniroute/open-sse/services/compression/eval/types";
import { calculateCost } from "@/lib/usage/costCalculator";

/**
 * Cost-aware judge ModelClient for the compression playground's fidelity verify.
 * Hard Rule #18 — NOT unit-tested (touches the real executor); the cost math is calculateCost
 * (already covered) and the cap logic is judgeFidelityBatch (unit-tested with a stub). Computes
 * usdCost from FULL usage (prompt + completion tokens) via the canonical pricing engine, so the
 * USD cap actually engages and totalUsd is real.
 */
export function createPricedJudgeClient(
  provider: string,
  credentials: ProviderCredentials
): ModelClient {
  const executor = getExecutor(provider);
  return {
    async complete(model: string, messages: ChatTurn[]): Promise<ModelCallResult> {
      const input: ExecuteInput = {
        model,
        body: { model, messages, stream: false },
        stream: false,
        credentials,
      };
      const raw = (await executor.execute(input)) as { response: Response };
      const json = (await raw.response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        usage?: { prompt_tokens?: number; completion_tokens?: number };
      };
      const text = json.choices?.[0]?.message?.content ?? "";
      const usdCost = await calculateCost(provider, model, {
        prompt_tokens: json.usage?.prompt_tokens,
        completion_tokens: json.usage?.completion_tokens,
      });
      return usdCost > 0 ? { text, usdCost } : { text };
    },
  };
}
