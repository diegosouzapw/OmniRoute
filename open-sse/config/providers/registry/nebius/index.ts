import type { RegistryEntry } from "../../shared.ts";

export const nebiusProvider: RegistryEntry = {
  id: "nebius",
  alias: "nebius",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.tokenfactory.nebius.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "meta-llama/Llama-3.3-70B-Instruct", name: "Llama 3.3 70B Instruct" }],
};
