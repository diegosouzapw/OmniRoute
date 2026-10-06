import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Poolside — first-party OpenAI-compatible inference host (inference.poolside.ai).
 *
 * Keys are self-service (`sky_…`, platform.poolside.ai). The catalog endpoint is
 * authenticated: without a key `/v1/models` answers 401 with the body
 * `No Authorization header provided`, which is what an earlier generic probe read
 * back as "invalid key" and led to the entry being dropped (#2723, #3054).
 * With a key it answers 200 and returns exactly the two Preview models below
 * (authenticated probe 2026-08-07, #9085).
 *
 * The IDs here are the ones the live catalog returns — `poolside/laguna-xs-2.1`,
 * not the `laguna-xs.2` form carried by third-party listings and by the
 * aggregator catalogs in this repo (routeway, cline), whose IDs are namespaced by
 * the aggregator and do not address this host. Both models are text-only, report
 * `tools` and `reasoning`, and are free during Preview. `passthroughModels` stays
 * on so live discovery keeps admitting models the Preview adds later; upstream
 * publishes no rate-limit headers.
 */
export const poolsideProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "poolside",
  alias: "poolside",
  baseUrl: "https://inference.poolside.ai/v1/chat/completions",
  modelsUrl: "https://inference.poolside.ai/v1/models",
  models: [
    {
      id: "poolside/laguna-xs-2.1",
      name: "Laguna XS 2.1",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 262144,
      maxOutputTokens: 32768,
    },
    {
      id: "poolside/laguna-s-2.1",
      name: "Laguna S 2.1",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 262144,
      maxOutputTokens: 32768,
    },
  ],
  passthroughModels: true,
});
