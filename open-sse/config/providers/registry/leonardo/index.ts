import type { RegistryEntry } from "../../shared.ts";

export const leonardoProvider: RegistryEntry = {
  id: "leonardo",
  alias: "leo",
  format: "openai",
  executor: "default",
  baseUrl: "https://cloud.leonardo.ai/api/rest/v1",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "phoenix", name: "Phoenix" },
    { id: "sdxl", name: "SDXL" },
  ],
};
