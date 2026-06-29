import type { RegistryEntry } from "../../shared.ts";

export const dgridProvider: RegistryEntry = {
  id: "dgrid",
  alias: "dgrid",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.dgrid.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://api.dgrid.ai/v1/models",
  defaultContextLength: 128000,
  models: [{ id: "dgridai/free", name: "DGrid Free Models Router" }],
  passthroughModels: true,
};
