import type { RegistryEntry } from "../../shared.ts";

export const nlpcloudProvider: RegistryEntry = {
  id: "nlpcloud",
  alias: "nlpc",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.nlpcloud.io/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "llama-3-8b-instruct", name: "Llama 3 8B" }],
};
