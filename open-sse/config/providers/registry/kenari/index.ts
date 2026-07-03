import type { RegistryEntry } from "../../shared.ts";

export const kenariProvider: RegistryEntry = {
  id: "kenari",
  alias: "kenari",
  format: "openai",
  executor: "default",
  baseUrl: "https://kenari.id/v1/chat/completions",
  modelsUrl: "https://kenari.id/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  models: [],
};
