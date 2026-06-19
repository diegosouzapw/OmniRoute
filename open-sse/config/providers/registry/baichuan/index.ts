import type { RegistryEntry } from "../../shared.ts";

export const baichuanProvider: RegistryEntry = {
  id: "baichuan",
  alias: "baichuan",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.baichuan-ai.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "Baichuan4", name: "Baichuan 4" }],
};
