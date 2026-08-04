import type { RegistryEntry } from "../../shared.ts";

export const deepseekProvider: RegistryEntry = {
  id: "deepseek",
  alias: "ds",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.deepseek.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsReasoning: true },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsReasoning: true },
  ],
};
