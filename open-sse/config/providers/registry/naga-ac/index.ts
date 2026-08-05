import type { RegistryEntry } from "../../shared.ts";

// Naga.ac — OpenAI-compatible aggregator gateway with free models.
// See https://docs.naga.ac for API reference.
// Free models accept an optional API key; authenticated users get higher rate limits.
export const naga_acProvider: RegistryEntry = {
  id: "naga-ac",
  alias: "naga",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.naga.ac/v1/chat/completions",
  modelsUrl: "https://api.naga.ac/v1/models",
  authType: "optional",
  authHeader: "bearer",
  passthroughModels: true,
  models: [],
};