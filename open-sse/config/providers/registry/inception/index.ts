import type { RegistryEntry } from "../../shared.ts";

export const inceptionProvider: RegistryEntry = {
  id: "inception",
  alias: "inception",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.inceptionlabs.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "mercury-2",
      name: "Mercury 2",
      contextLength: 128000,
      maxOutputTokens: 50000,
    },
  ],
};
