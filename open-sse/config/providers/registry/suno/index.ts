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
    { id: "chirp-v3-5", name: "Chirp V3.5" },
    { id: "chirp-v4", name: "Chirp V4" },
  ],
};
