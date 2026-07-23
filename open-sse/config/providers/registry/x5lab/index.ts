import type { RegistryEntry } from "../../shared.ts";

export const x5labProvider: RegistryEntry = {
  id: "x5lab",
  alias: "x5lab",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.x5lab.dev/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://api.x5lab.dev/v1/models",
  defaultContextLength: 128000,
  models: [],
  passthroughModels: true,
};
