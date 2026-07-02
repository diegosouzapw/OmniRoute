import type { RegistryEntry } from "../../shared.ts";

export const chutesProvider: RegistryEntry = {
  id: "chutes",
  alias: "chutes",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.chutesai.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "Qwen2.5-72B-Instruct", name: "Qwen2.5 72B" }],
};
