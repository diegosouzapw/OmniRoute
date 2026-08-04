import type { RegistryEntry } from "../../shared.ts";

export const ideogramProvider: RegistryEntry = {
  id: "ideogram",
  alias: "ideo",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.ideogram.ai",
  authType: "apikey",
  authHeader: "Api-Key",
  models: [
    { id: "V_3", name: "Ideogram V3" },
    { id: "V_2A", name: "Ideogram V2A" },
  ],
};
