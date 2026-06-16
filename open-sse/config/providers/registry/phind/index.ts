import type { RegistryEntry } from "../../shared.ts";

export const phindProvider: RegistryEntry = {
  id: "phind",
  alias: "ph",
  format: "openai",
  executor: "phind",
  baseUrl: "https://www.phind.com/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "phind-model", name: "Phind Model (Auto)" },
    { id: "gpt-4o", name: "GPT-4o (via Phind)" },
    { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet (via Phind)" },
  ],
};
