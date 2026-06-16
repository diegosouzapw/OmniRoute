import type { RegistryEntry } from "../../shared.ts";

export const liquidProvider: RegistryEntry = {
  id: "liquid",
  alias: "liquid",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.liquid.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "liquid-lfm-40b", name: "Liquid LFM 40B" }],
};
