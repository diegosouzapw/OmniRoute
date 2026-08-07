import type { RegistryEntry } from "../../shared.ts";

export const unorouterProvider: RegistryEntry = {
  id: "unorouter",
  alias: "unorouter",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.unorouter.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [{ id: "auto", name: "Auto (Best Available)" }],
  passthroughModels: true,
};
