import type { RegistryEntry } from "../../shared.ts";

export const chenzkProvider: RegistryEntry = {
  id: "chenzk",
  alias: "chenzk",
  format: "openai",
  executor: "default",
  baseUrl: "https://chenzk.top/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://chenzk.top/v1/models",
  defaultContextLength: 128000,
  models: [],
  passthroughModels: true,
};
