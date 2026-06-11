import type { RegistryEntry } from "../../shared.ts";

export const chipotleProvider: RegistryEntry = {
  id: "chipotle",
  alias: "pepper",
  format: "openai",
  executor: "chipotle",
  baseUrl: "https://amelia.chipotle.com",
  baseUrls: ["https://amelia.chipotle.com"],
  authType: "none",
  authHeader: "none",
  models: [{ id: "pepper-1", name: "Pepper (Chipotle AI 🌯)" }],
  passthroughModels: true,
};
