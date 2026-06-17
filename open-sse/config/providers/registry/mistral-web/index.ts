import type { RegistryEntry } from "../../shared.ts";

export const mistral_webProvider: RegistryEntry = {
  id: "mistral-web",
  alias: "mw",
  format: "openai",
  executor: "mistral-web",
  baseUrl: "https://chat.mistral.ai/api/completions",
  authType: "apikey",
  authHeader: "cookie",
  passthroughModels: true,
  models: [
    { id: "mistral-large-latest", name: "Mistral Large" },
    { id: "mistral-medium-latest", name: "Mistral Medium" },
    { id: "mistral-small-latest", name: "Mistral Small" },
    { id: "codestral-latest", name: "Codestral" },
  ],
};
