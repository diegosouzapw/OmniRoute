import type { RegistryEntry } from "../../shared.ts";

export const freemodel_devProvider: RegistryEntry = {
  id: "freemodel-dev",
  alias: "fmd",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.freemodel.dev/v1/chat/completions",
  modelsUrl: "https://api.freemodel.dev/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "gpt-5.5", name: "GPT-5.5", contextLength: 400000 },
    { id: "gpt-5.4", name: "GPT-5.4", contextLength: 400000 },
    { id: "gpt-5.4-mini", name: "GPT-5.4 Mini" },
    { id: "gpt-5.3-codex", name: "GPT-5.3 Codex" },
  ],
};
