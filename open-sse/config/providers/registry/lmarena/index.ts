import type { RegistryEntry } from "../../shared.ts";

export const lmarenaProvider: RegistryEntry = {
  id: "lmarena",
  alias: "lmar",
  format: "openai",
  executor: "lmarena",
  baseUrl: "https://arena.ai",
  models: [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
  ],
  defaultModel: "gpt-4o",
  auth: "cookie",
};
