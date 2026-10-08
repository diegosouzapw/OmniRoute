import type { RegistryEntry } from "../../shared.ts";

export const uncloseaiProvider: RegistryEntry = {
  id: "uncloseai",
  alias: "unc",
  format: "openai",
  executor: "default",
  baseUrl: "https://hermes.ai.unturf.com/v1/chat/completions",
  modelsUrl: "https://hermes.ai.unturf.com/v1/models",
  authType: "optional",
  authHeader: "bearer",
  models: [
    // 2026-09-15 refresh — upstream rotated its roster: /v1/models now serves
    // exactly one model, and every previously catalogued id (adamo1139/
    // Hermes-3-Llama-3.1-8B-FP8-Dynamic, qwen3.6:27b, gemma4:31b) returns
    // 404 "model does not exist" on /v1/chat/completions. The live id below
    // was confirmed with a real completion (vllm backend, max_model_len 65536).
    {
      id: "Lorbus/Qwen3.6-27B-int4-AutoRound",
      name: "Qwen3.6 27B int4 AutoRound (🆓 Free)",
      contextLength: 65536,
    },
  ],
};
