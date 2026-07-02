import type { RegistryEntry } from "../../shared.ts";

export const nous_researchProvider: RegistryEntry = {
  id: "nous-research",
  alias: "nous",
  format: "openai",
  executor: "default",
  baseUrl: "https://inference-api.nousresearch.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "Hermes-4-405B", name: "Hermes 4 7B (Nous Research)" },
    { id: "Hermes-4-70B", name: "Hermes 4 70B (Nous Research)" },
  ],
};
