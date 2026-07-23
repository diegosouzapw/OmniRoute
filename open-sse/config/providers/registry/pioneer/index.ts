import type { RegistryEntry } from "../../shared.ts";

/**
 * Pioneer AI by Fastino Labs — OpenAI-compatible chat completions.
 *
 * Endpoint: https://api.pioneer.ai/v1/chat/completions
 * Auth: X-API-Key header with a pio_sk_... key (Bearer also accepted upstream).
 *
 * Only models with supports_on_demand_inference=true work directly with a bare
 * pio_sk_ key. Gated/enterprise models (Claude/GPT/Gemini etc.) require a prior
 * fine-tuning job and are called via the resulting job id, not the base model id.
 *
 * Source of truth for models: GET https://api.pioneer.ai/base-models
 *   ?supports_inference=true&task_type=decoder
 *   filter: supports_on_demand_inference=true
 */
export const pioneerProvider: RegistryEntry = {
  id: "pioneer",
  alias: "pn",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.pioneer.ai/v1/chat/completions",
  authType: "apikey",
  // Pioneer standardises on X-API-Key (preferred over Bearer).
  // The default executor resolves "x-api-key" to the X-API-Key header.
  authHeader: "x-api-key",
  models: [
    // === Open-tier serverless inference ===
    // These models support on-demand inference with any pio_sk_ key.
    { id: "Qwen/Qwen3-32B", name: "Qwen3 32B" },
    { id: "Qwen/Qwen3.6-27B", name: "Qwen3.6 27B" },
    { id: "Qwen/Qwen3.5-9B", name: "Qwen3.5 9B" },
    { id: "Qwen/Qwen3-8B", name: "Qwen3 8B" },
    { id: "Qwen/Qwen3-4B-Base", name: "Qwen3 4B Base" },
    { id: "Qwen/Qwen3-1.7B-Base", name: "Qwen3 1.7B Base" },
    { id: "meta-llama/Llama-3.1-8B-Instruct", name: "Llama 3.1 8B Instruct" },
    { id: "meta-llama/Llama-3.2-1B-Instruct", name: "Llama 3.2 1B Instruct" },
    { id: "google/gemma-3-4b-pt", name: "Gemma 3 4B (Pretrained)" },
    { id: "HuggingFaceTB/SmolLM3-3B-Base", name: "SmolLM3 3B Base" },
  ],
};
