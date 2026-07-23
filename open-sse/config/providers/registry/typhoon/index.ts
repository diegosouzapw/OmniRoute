import type { RegistryEntry } from "../../shared.ts";

export const typhoonProvider: RegistryEntry = {
  id: "typhoon",
  alias: "typhoon",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.opentyphoon.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "typhoon-v2.5-30b-a3b-instruct",
      name: "Typhoon v2.5 30B A3B Instruct",
      contextLength: 131072,
    },
  ],
};
