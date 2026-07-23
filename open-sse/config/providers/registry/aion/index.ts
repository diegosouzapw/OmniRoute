import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Aion Labs — OpenAI-compatible aggregator (api.aionlabs.ai).
 *
 * Free key from aionlabs.ai (no card). The
 * public /models catalog (5 models, verified 2026-07-20) carries context and
 * pricing; free tier is 20k tokens/day.
 */
export const aionProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "aion",
  baseUrl: "https://api.aionlabs.ai/v1/chat/completions",
  modelsUrl: "https://api.aionlabs.ai/v1/models",
  passthroughModels: true,
  models: [
    { id: "aion-labs/aion-3.0", name: "Aion 3.0", contextLength: 131072 },
    { id: "aion-labs/aion-3.0-mini", name: "Aion 3.0 Mini", contextLength: 131072 },
    { id: "aion-labs/aion-2.5", name: "Aion 2.5", contextLength: 131072 },
    { id: "aion-labs/aion-2.0", name: "Aion 2.0", contextLength: 131072 },
    { id: "aion-labs/aion-rp-llama-3.1-8b", name: "Aion RP Llama 3.1 8B", contextLength: 32768 },
  ],
});
