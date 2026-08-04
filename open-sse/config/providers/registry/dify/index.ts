import type { RegistryEntry } from "../../shared.ts";

export const difyProvider: RegistryEntry = {
  id: "dify",
  alias: "dify",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.dify.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "auto", name: "Auto" }],
};
