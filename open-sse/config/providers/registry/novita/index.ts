import type { RegistryEntry } from "../../shared.ts";

export const novitaProvider: RegistryEntry = {
  id: "novita",
  alias: "novita",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.novita.ai/v3/chat/completions",
  modelsUrl: "https://api.novita.ai/v3/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "ai-ai/llama-3.1-8b-instruct", name: "Llama 3.1 8B" }],
};
