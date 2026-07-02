import type { RegistryEntry } from "../../shared.ts";

export const sunoProvider: RegistryEntry = {
  id: "suno",
  alias: "suno",
  format: "openai",
  executor: "default",
  baseUrl: "https://studio-api.suno.ai/api/generate/v2/",
  authType: "cookie",
  authHeader: "cookie",
  models: [
    // Sweep 2026-06-19: Suno's internal codenames for v5 / v5.5.
    { id: "chirp-fenix", name: "Chirp V5.5" },
    { id: "chirp-crow", name: "Chirp V5" },
    { id: "chirp-v4", name: "Chirp V4" },
    { id: "chirp-v3-5", name: "Chirp V3.5" },
  ],
};
