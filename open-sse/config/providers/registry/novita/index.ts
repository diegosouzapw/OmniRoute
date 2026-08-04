import type { RegistryEntry } from "../../shared.ts";

export const novitaProvider: RegistryEntry = {
  id: "novita",
  alias: "novita",
  format: "openai",
  executor: "default",
  // #5455: OpenAI-compatible endpoint. The legacy /v3 base + the `ai-ai/…` model id both
  // 404 (verified live); /openai/v1 + the `meta-llama/…` id return a clean completion.
  baseUrl: "https://api.novita.ai/openai/v1/chat/completions",
  modelsUrl: "https://api.novita.ai/openai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "meta-llama/llama-3.1-8b-instruct", name: "Llama 3.1 8B Instruct" }],
};
