import type { RegistryEntry } from "../../shared.ts";

export const sarvamProvider: RegistryEntry = {
  id: "sarvam",
  alias: "sarvam",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.sarvam.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "sarvam-105b", name: "Sarvam 105B", contextLength: 131072 },
    { id: "sarvam-30b", name: "Sarvam 30B", contextLength: 65536 },
  ],
};
