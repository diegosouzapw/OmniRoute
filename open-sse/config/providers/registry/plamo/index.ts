import type { RegistryEntry } from "../../shared.ts";

export const plamoProvider: RegistryEntry = {
  id: "plamo",
  alias: "plamo",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.platform.preferredai.jp/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "plamo-3.0-prime",
      name: "PLaMo 3.0 Prime",
      contextLength: 262144,
      maxOutputTokens: 20000,
    },
  ],
};
