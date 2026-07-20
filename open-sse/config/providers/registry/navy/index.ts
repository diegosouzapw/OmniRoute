import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * NavyAI — OpenAI-compatible aggregator (api.navy).
 *
 * Free plan is ONE shared pool of 150K tokens/day at 20 RPM, drained by a
 * per-model `token_multiplier` that the upstream /v1/models exposes: a 1x model
 * spends the full 150K, while `grok-4` (10x) is capped at ~15K real tokens/day.
 * That is why the free catalog registers a single shared `navy` pool instead of
 * a budget per model — see freeModelCatalog.data.ts.
 *
 * Upstream rejects requests without an explicit User-Agent, so one is pinned
 * here (same reason routeway needs it).
 */
export const navyProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "navy",
  baseUrl: "https://api.navy/v1/chat/completions",
  modelsUrl: "https://api.navy/v1/models",
  passthroughModels: true,
  extraHeaders: { "User-Agent": "OmniRoute/1.0" },
  models: [
    { id: "llama-3.3-70b-instruct", name: "Llama 3.3 70B Instruct", contextLength: 131072, toolCalling: true },
    { id: "gemma-4-31b-it", name: "Gemma 4 31B IT", contextLength: 262144, toolCalling: true, supportsVision: true, supportsReasoning: true },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", contextLength: 1048576, toolCalling: true, supportsReasoning: true },
    { id: "deepseek-chat", name: "DeepSeek Chat", contextLength: 131072, toolCalling: true },
    { id: "mistral-small-latest", name: "Mistral Small", contextLength: 262144, toolCalling: true, supportsVision: true, supportsReasoning: true },
    { id: "llama-4-scout", name: "Llama 4 Scout", contextLength: 10000000, toolCalling: true, supportsVision: true },
  ],
});
