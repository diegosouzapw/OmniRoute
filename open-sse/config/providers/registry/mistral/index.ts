import type { RegistryEntry } from "../../shared.ts";

export const mistralProvider: RegistryEntry = {
  id: "mistral",
  alias: "mistral",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.mistral.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "mistral-large-latest", name: "Mistral Large 3" },
    { id: "mistral-medium-3-5", name: "Mistral Medium 3.5" },
    { id: "mistral-small-latest", name: "Mistral Small 4" },
    { id: "devstral-latest", name: "Devstral 2" },
    { id: "codestral-latest", name: "Codestral" },
  ],
};
