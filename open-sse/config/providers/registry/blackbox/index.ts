import type { RegistryEntry } from "../../shared.ts";

export const blackboxProvider: RegistryEntry = {
  id: "blackbox",
  alias: "bb",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.blackbox.ai/v1/chat/completions",
  modelsUrl: "https://api.blackbox.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
    { id: "claude-sonnet-4", name: "Claude Sonnet 4" },
    { id: "deepseek-v3", name: "DeepSeek V3" },
    { id: "blackboxai", name: "Blackbox AI" },
    { id: "blackboxai-pro", name: "Blackbox AI Pro" },
  ],
};
