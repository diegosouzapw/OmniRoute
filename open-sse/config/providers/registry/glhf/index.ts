import type { RegistryEntry } from "../../shared.ts";

export const glhfProvider: RegistryEntry = {
  id: "glhf",
  alias: "glhf",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.laf.run/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "deepseek-7b-chat", name: "DeepSeek 7B Chat" }],
};
