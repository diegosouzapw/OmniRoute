import type { RegistryEntry } from "../../shared.ts";

export const sumopodProvider: RegistryEntry = {
  id: "sumopod",
  alias: "sumopod",
  format: "openai",
  executor: "default",
  baseUrl: "https://ai.sumopod.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://ai.sumopod.com/v1/models",
  defaultContextLength: 128000,
  models: [],
  passthroughModels: true,
};
