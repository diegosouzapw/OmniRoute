import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Routeway — OpenAI-compatible aggregator (api.routeway.ai).
 *
 * Cloudflare fronts the API and rejects
 * non-browser User-Agents with error 1010, so a browser-style UA is pinned
 * (verified needed 2026-07-20). The public /models catalog has 236 models with
 * an `available`/pricing shape; free models carry the `:free` suffix.
 */
export const routewayProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "routeway",
  baseUrl: "https://api.routeway.ai/v1/chat/completions",
  modelsUrl: "https://api.routeway.ai/v1/models",
  passthroughModels: true,
  extraHeaders: { "User-Agent": "Mozilla/5.0 OmniRoute/1.0" },
  models: [
    { id: "llama-3.3-70b-instruct:free", name: "Llama 3.3 70B Instruct (free)", contextLength: 131072, toolCalling: true },
    { id: "nemotron-3-nano-30b-a3b:free", name: "Nemotron 3 Nano 30B (free)", contextLength: 256000, toolCalling: true },
    { id: "nemotron-nano-9b-v2:free", name: "Nemotron Nano 9B v2 (free)", contextLength: 128000, toolCalling: true },
    { id: "step-3.7-flash:free", name: "Step 3.7 Flash (free)", contextLength: 256000, toolCalling: true, supportsVision: true },
    { id: "step-3.5-flash:free", name: "Step 3.5 Flash (free)", contextLength: 65536, toolCalling: true },
    { id: "laguna-m.1:free", name: "Laguna M.1 (free)", contextLength: 131072, toolCalling: true },
    { id: "laguna-xs.2:free", name: "Laguna XS.2 (free)", contextLength: 131072, toolCalling: true },
    { id: "llama-3.2-3b-instruct:free", name: "Llama 3.2 3B Instruct (free)", contextLength: 16000, toolCalling: true },
  ],
});
