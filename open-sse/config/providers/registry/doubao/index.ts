import type { RegistryEntry } from "../../shared.ts";

export const doubaoProvider: RegistryEntry = {
  id: "doubao",
  alias: "doubao",
  format: "openai",
  executor: "default",
  baseUrl: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "doubao-pro-32k", name: "Doubao Pro 32K" }],
};
