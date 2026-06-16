import type { RegistryEntry } from "../../shared.ts";

export const kimiProvider: RegistryEntry = {
  id: "kimi",
  alias: "kimi",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.moonshot.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "kimi-k2.6", name: "Kimi K2.6" },
    { id: "kimi-k2.5", name: "Kimi K2.5" },
  ],
};
