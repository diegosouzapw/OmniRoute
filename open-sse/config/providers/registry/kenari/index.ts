import type { RegistryEntry } from "../../shared.ts";

export const kenariProvider: RegistryEntry = {
  id: "kenari",
  alias: "kenari",
  format: "openai",
  executor: "default",
  baseUrl: "https://kenari.id/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://kenari.id/v1/models",
  models: [],
  passthroughModels: true,
};
