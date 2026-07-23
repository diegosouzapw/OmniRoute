import type { RegistryEntry } from "../../shared.ts";

export const poeProvider: RegistryEntry = {
  id: "poe",
  alias: "poe",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.poe.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // Poe is a passthrough gateway — the live /v1/models catalog is the real
    // source of truth. These are seed entries for offline fallback only.
    { id: "GPT-4o", name: "GPT-4o" },
    { id: "Claude-Sonnet-4", name: "Claude Sonnet 4" },
    { id: "Gemini-2.5-Pro", name: "Gemini 2.5 Pro" },
  ],
};
