import type { RegistryEntry } from "../../shared.ts";

export const baiProvider: RegistryEntry = {
  id: "bai",
  alias: "bai",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.b.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://api.b.ai/v1/models",
  models: [],
  passthroughModels: true,
};
